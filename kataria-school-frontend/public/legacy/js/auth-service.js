/**
 * Authentication Service Module
 * Handles JWT token management and session persistence with Supabase
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

class AuthService {
    constructor() {
        this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                autoRefreshToken: true,
                persistSession: true,
                detectSessionInUrl: true
            }
        });
        
        this.currentUser = null;
        this.userRole = null;
        this.sessionCheckInterval = null;
        
        // Initialize auth state listener
        this.initializeAuthListener();
        
        // Check for existing session on initialization
        this.checkExistingSession();
    }
    
    /**
     * Initialize auth state change listener
     */
    initializeAuthListener() {
        this.supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event);
            
            switch(event) {
                case 'SIGNED_IN':
                    await this.handleSignIn(session);
                    break;
                case 'SIGNED_OUT':
                    this.handleSignOut();
                    break;
                case 'TOKEN_REFRESHED':
                    console.log('Token refreshed successfully');
                    break;
                case 'USER_UPDATED':
                    await this.updateUserData(session);
                    break;
            }
        });
    }
    
    /**
     * Check for existing session on page load
     */
    async checkExistingSession() {
        try {
            const { data: { session }, error } = await this.supabase.auth.getSession();
            
            if (error) throw error;
            
            if (session) {
                await this.handleSignIn(session);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error checking existing session:', error);
            return false;
        }
    }
    
    /**
     * Handle sign in event
     */
    async handleSignIn(session) {
        if (!session) return;
        
        this.currentUser = session.user;
        
        // Fetch user role from teachers table
        await this.fetchUserRole();
        
        // Store session data in localStorage for persistence
        this.storeSessionData(session);
        
        // Start session monitoring
        this.startSessionMonitoring();
        
        // Emit custom event for other parts of the app
        window.dispatchEvent(new CustomEvent('authStateChange', {
            detail: { 
                isAuthenticated: true, 
                user: this.currentUser,
                role: this.userRole 
            }
        }));
    }
    
    /**
     * Handle sign out event
     */
    handleSignOut() {
        this.currentUser = null;
        this.userRole = null;
        
        // Clear stored session data
        this.clearSessionData();
        
        // Stop session monitoring
        this.stopSessionMonitoring();
        
        // Emit custom event
        window.dispatchEvent(new CustomEvent('authStateChange', {
            detail: { isAuthenticated: false }
        }));
    }
    
    /**
     * Fetch user role from database
     */
    async fetchUserRole() {
        if (!this.currentUser) return null;
        
        try {
            const { data, error } = await this.supabase
                .from('teachers')
                .select('role')
                .eq('id', this.currentUser.id)
                .single();
            
            if (error) throw error;
            
            this.userRole = data.role;
            return this.userRole;
        } catch (error) {
            console.error('Error fetching user role:', error);
            return null;
        }
    }
    
    /**
     * Sign in with email and password
     */
    async signIn(email, password, rememberMe = false) {
        try {
            // Set session persistence based on rememberMe
            const persistSession = rememberMe;
            
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                sessionStorage.setItem('rememberMe', 'false');
            }
            
            return { success: true, data };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Sign up new user (principal only)
     */
    async signUp(email, password, userData) {
        try {
            // Verify current user is principal
            if (this.userRole !== 'principal') {
                throw new Error('Only principals can create new users');
            }
            
            const { data, error } = await this.supabase.auth.signUp({
                email,
                password,
                options: {
                    data: userData,
                    emailRedirectTo: `${window.location.origin}/confirm-email`
                }
            });
            
            if (error) throw error;
            
            // Create teacher record
            const { error: teacherError } = await this.supabase
                .from('teachers')
                .insert([{
                    id: data.user.id,
                    ...userData
                }]);
            
            if (teacherError) throw teacherError;
            
            return { success: true, data };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Sign out current user
     */
    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            // Redirect to login page
            window.location.href = '/login.html';
            
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Update user data
     */
    async updateUserData(session) {
        if (!session) return;
        
        this.currentUser = session.user;
        await this.fetchUserRole();
    }
    
    /**
     * Reset password
     */
    async resetPassword(email) {
        try {
            const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`
            });
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Reset password error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Update password
     */
    async updatePassword(newPassword) {
        try {
            const { error } = await this.supabase.auth.updateUser({
                password: newPassword
            });
            
            if (error) throw error;
            
            return { success: true };
        } catch (error) {
            console.error('Update password error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Refresh session token
     */
    async refreshSession() {
        try {
            const { data, error } = await this.supabase.auth.refreshSession();
            
            if (error) throw error;
            
            console.log('Session refreshed successfully');
            return { success: true, data };
        } catch (error) {
            console.error('Refresh session error:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Store session data in localStorage
     */
    storeSessionData(session) {
        const storage = localStorage.getItem('rememberMe') === 'true' 
            ? localStorage 
            : sessionStorage;
        
        storage.setItem('supabase.auth.token', JSON.stringify(session));
    }
    
    /**
     * Clear session data from storage
     */
    clearSessionData() {
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.removeItem('supabase.auth.token');
        localStorage.removeItem('rememberMe');
        sessionStorage.removeItem('rememberMe');
    }
    
    /**
     * Start monitoring session validity
     */
    startSessionMonitoring() {
        // Check session every 5 minutes
        this.sessionCheckInterval = setInterval(async () => {
            const { data: { session }, error } = await this.supabase.auth.getSession();
            
            if (!session || error) {
                console.log('Session expired or invalid');
                await this.signOut();
            }
        }, 5 * 60 * 1000); // 5 minutes
    }
    
    /**
     * Stop monitoring session
     */
    stopSessionMonitoring() {
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
            this.sessionCheckInterval = null;
        }
    }
    
    /**
     * Get current access token
     */
    async getAccessToken() {
        const { data: { session }, error } = await this.supabase.auth.getSession();
        
        if (error || !session) return null;
        
        return session.access_token;
    }
    
    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }
    
    /**
     * Get user role
     */
    getUserRole() {
        return this.userRole;
    }
    
    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    /**
     * Check if user is principal
     */
    isPrincipal() {
        return this.userRole === 'principal';
    }
    
    /**
     * Check if user is teacher
     */
    isTeacher() {
        return this.userRole === 'teacher';
    }
    
    /**
     * Authorize access based on roles
     */
    authorize(allowedRoles = []) {
        if (!this.isAuthenticated()) {
            window.location.href = '/login.html';
            return false;
        }
        
        if (allowedRoles.length === 0) {
            return true;
        }
        
        if (!allowedRoles.includes(this.userRole)) {
            window.location.href = '/unauthorized.html';
            return false;
        }
        
        return true;
    }
}

// Export singleton instance
const authService = new AuthService();
export default authService;

// Also attach to window for non-module usage
window.AuthService = authService;

/**
 * Simple Authentication Module
 * Handles user authentication and authorization for the Home Page Manager
 */

class AuthManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }
    
    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    /**
     * Get current user from localStorage
     */
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('currentUser');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error parsing currentUser from localStorage:', error);
            return null;
        }
    }
    
    /**
     * Set current user in localStorage
     */
    setCurrentUser(user) {
        try {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
        } catch (error) {
            console.error('Error setting currentUser in localStorage:', error);
        }
    }
    
    /**
     * Clear current user from localStorage
     */
    clearCurrentUser() {
        try {
            localStorage.removeItem('currentUser');
            this.currentUser = null;
        } catch (error) {
            console.error('Error clearing currentUser from localStorage:', error);
        }
    }
    
    /**
     * Check if user is a teacher
     */
    isTeacher() {
        return this.currentUser && this.currentUser.role === 'teacher';
    }
    
    /**
     * Check if user is a principal
     */
    isPrincipal() {
        return this.currentUser && this.currentUser.role === 'principal';
    }
    
    /**
     * Check if user has access to Home Page Manager
     */
    canAccessHomePageManager() {
        return this.isTeacher() || this.isPrincipal();
    }
    
    /**
     * Redirect to login if not authenticated
     */
    requireAuth() {
        console.log('Checking authentication');
        if (!this.isAuthenticated()) {
            console.log('User not authenticated, redirecting to login');
            if (typeof window !== 'undefined') {
                window.location.href = '/login.html';
            }
            return false;
        }
        console.log('User is authenticated');
        return true;
    }
    
    /**
     * Redirect to unauthorized page if user doesn't have access
     */
    requireHomePageManagerAccess() {
        console.log('Checking home page manager access');
        const canAccess = this.canAccessHomePageManager();
        console.log('Can access home page manager:', canAccess);
        if (!canAccess) {
            console.log('User not authorized for home page manager, redirecting to unauthorized');
            if (typeof window !== 'undefined') {
                window.location.href = '/unauthorized.html';
            }
            return false;
        }
        console.log('User is authorized for home page manager');
        return true;
    }
}

// Export singleton instance
const authManager = new AuthManager();
export default authManager;
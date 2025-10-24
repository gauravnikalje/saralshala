import { supabase } from './lib/supabaseClient.js';

window.auth = function() {
    return {
        user: null,
        email: '',
        password: '',
        error: '',
        async init() {
            const { data: { session } } = await supabase.auth.getSession();
            this.user = session?.user ?? null;

            supabase.auth.onAuthStateChange((_event, session) => {
                this.user = session?.user ?? null;
                if (this.user) {
                    window.location.pathname = '/dashboard.html';
                }
            });
        },
        async login() {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: this.email,
                password: this.password,
            });

            if (error) {
                this.error = error.message;
            } else {
                this.user = data.user;
                this.error = '';
            }
        },
        async logout() {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
            } else {
                window.location.pathname = '/';
            }
        }
    };
};


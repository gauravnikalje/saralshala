// Configuration for Supabase connection
// Replace these with your actual Supabase project credentials

window.SUPABASE_URL = 'https://your-project-id.supabase.co';
window.SUPABASE_ANON_KEY = 'your-anon-key-here';

// For testing purposes, you can use these mock credentials
// Remember to replace them with your actual Supabase project details
window.MOCK_MODE = true; // Set to false when using real Supabase

console.log('Supabase configuration loaded');
console.log('Mock Mode:', window.MOCK_MODE ? 'ON' : 'OFF');

# Testing Guide for School Admin System

## Quick Start

### 1. Start the Test Server
```bash
npm start
# OR
node server.js
```

### 2. Open your browser and navigate to:
- **Main application**: http://localhost:3000
- **Enhanced login page**: http://localhost:3000/login.html
- **Forgot password**: http://localhost:3000/forgot-password.html
- **Reset password**: http://localhost:3000/reset-password.html

## Test Scenarios

### 🔐 Authentication Testing

#### Login Page (`/login.html`)
1. **Role Selection**: Try switching between Teacher and Principal roles
2. **Demo Login**: Use these credentials:
   - Email: `principal@school.com`
   - Password: `admin123`
3. **Validation**: Try submitting without filling fields
4. **Wrong Credentials**: Try with incorrect credentials

#### Forgot Password (`/forgot-password.html`)
1. Enter any email address to see the reset flow
2. Check the success message and UI transitions
3. Test form validation with empty fields

#### Reset Password (`/reset-password.html`)
1. Test password strength indicator
2. Try different password combinations
3. Test password confirmation matching
4. Check password requirement validation

### 🎨 UI/UX Testing

#### Visual Elements
- [ ] Animated gradients and transitions
- [ ] Responsive design on different screen sizes
- [ ] Loading states and spinners
- [ ] Error and success message displays
- [ ] Form validation feedback

#### Interactions
- [ ] Button hover effects and animations
- [ ] Form field focus states
- [ ] Role selection toggles
- [ ] Password strength meter
- [ ] Remember me checkbox functionality

## Current Features Available for Testing

### ✅ Completed Features
1. **Enhanced Login Interface**
   - Role-based login (Teacher/Principal)
   - Beautiful animated UI
   - Form validation
   - Loading states

2. **Password Reset Flow**
   - Forgot password request
   - Password strength validation
   - Reset confirmation

3. **Authentication Service**
   - Session management (mock mode)
   - JWT token handling (mock mode)
   - Role-based access control

### ⚠️ Mock Mode Notice
Currently running in **mock mode** for testing without Supabase setup. 
To connect to real Supabase:

1. Update `config.js` with your Supabase credentials
2. Set `window.MOCK_MODE = false`
3. Ensure your Supabase project has the required tables and policies

## Browser Testing

### Recommended Browsers
- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)

### Mobile Testing
The interface is responsive and can be tested on:
- Mobile browsers
- Developer tools device simulation
- Different screen sizes

## Troubleshooting

### Common Issues
1. **Server won't start**: Check if port 3000 is available
2. **Pages not loading**: Ensure you're accessing the correct URLs
3. **Styles not applying**: Check browser console for errors

### Getting Help
If you encounter issues:
1. Check the browser console for errors
2. Review the server logs in terminal
3. Ensure all files are properly saved

## Next Steps

After testing the authentication features, you can:
1. Set up actual Supabase connection
2. Test with real user data
3. Move on to the next task (Dashboard Implementation)

---

**Happy Testing! 🚀**

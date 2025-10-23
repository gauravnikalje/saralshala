# School Admin System - Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying the School Admin System to production environments.

## Prerequisites

### System Requirements
- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher
- **Web Server**: Apache, Nginx, or similar
- **Database**: Supabase (PostgreSQL)
- **SMS Service**: Twilio or compatible SMS provider

### Environment Variables
Create a `.env` file in the project root with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# SMS Configuration (Optional)
SMS_API_KEY=your_sms_api_key
SMS_ACCOUNT_SID=your_account_sid
SMS_FROM_NUMBER=your_from_number

# Server Configuration
PORT=3000
NODE_ENV=production
```

## Deployment Options

### 1. Vercel Deployment (Recommended)

#### Step 1: Prepare for Vercel
1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Create `vercel.json` configuration:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### Step 2: Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SMS_API_KEY
vercel env add SMS_ACCOUNT_SID
vercel env add SMS_FROM_NUMBER
```

### 2. Heroku Deployment

#### Step 1: Prepare for Heroku
1. Create `Procfile`:
```
web: node server.js
```

2. Update `package.json`:
```json
{
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

#### Step 2: Deploy to Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-school-admin-app

# Set environment variables
heroku config:set SUPABASE_URL=your_supabase_url
heroku config:set SUPABASE_ANON_KEY=your_supabase_anon_key
heroku config:set SMS_API_KEY=your_sms_api_key
heroku config:set SMS_ACCOUNT_SID=your_account_sid
heroku config:set SMS_FROM_NUMBER=your_from_number

# Deploy
git push heroku main
```

### 3. Traditional Server Deployment

#### Step 1: Server Setup
1. Install Node.js and npm on your server
2. Clone the repository:
```bash
git clone <your-repo-url>
cd school-admin-system
```

3. Install dependencies:
```bash
npm install
```

#### Step 2: Configure Web Server (Nginx)
Create `/etc/nginx/sites-available/school-admin`:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Step 3: Start Application
```bash
# Using PM2 for process management
npm install -g pm2
pm2 start server.js --name school-admin
pm2 startup
pm2 save
```

## Database Setup

### Supabase Configuration
1. Create a new Supabase project
2. Run the migration scripts:
```bash
# Navigate to supabase directory
cd supabase

# Apply migrations
supabase db push
```

3. Configure Row Level Security (RLS) policies
4. Set up authentication providers
5. Configure email templates

### Database Schema
The system includes the following main tables:
- `teachers` - Teacher information
- `classes` - Class/Subject information
- `students` - Student information
- `timetable` - Class schedules
- `attendance_records` - Attendance data
- `notices` - School notices
- `seen_notices` - Notice read status
- `grades` - Student grades

## SMS Configuration

### Twilio Setup
1. Create a Twilio account
2. Get your Account SID and Auth Token
3. Purchase a phone number
4. Configure webhook URLs (if needed)

### SMS Service Configuration
1. Access the SMS Configuration page in the admin panel
2. Enter your Twilio credentials
3. Test the SMS functionality
4. Configure message templates

## Security Considerations

### Environment Security
- Never commit `.env` files to version control
- Use strong, unique passwords for all accounts
- Enable two-factor authentication where possible
- Regularly update dependencies

### Application Security
- All API endpoints require authentication
- Row Level Security (RLS) is enabled on all tables
- Input validation on all forms
- HTTPS is required for production

### Data Protection
- Student data is encrypted in transit
- Regular backups of the database
- Access logs are maintained
- GDPR compliance considerations

## Monitoring and Maintenance

### Health Checks
- Monitor application uptime
- Check database connectivity
- Verify SMS service status
- Monitor error rates

### Logging
- Application logs are stored in the console
- Error tracking with detailed stack traces
- Performance monitoring
- User activity logs

### Backup Strategy
- Daily database backups
- Configuration file backups
- Regular testing of restore procedures
- Offsite backup storage

## Performance Optimization

### Caching
- Service Worker for offline caching
- Static file caching
- API response caching
- Browser caching headers

### CDN Configuration
- Static assets served from CDN
- Image optimization
- Gzip compression
- Minification of CSS/JS

### Database Optimization
- Proper indexing on frequently queried columns
- Query optimization
- Connection pooling
- Regular database maintenance

## Troubleshooting

### Common Issues

#### Application Won't Start
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check environment variables
- Review server logs

#### Database Connection Issues
- Verify Supabase credentials
- Check network connectivity
- Review RLS policies
- Test with simple queries

#### SMS Not Working
- Verify SMS service credentials
- Check phone number format
- Review SMS service logs
- Test with simple message

#### Offline Functionality Issues
- Check Service Worker registration
- Verify cache strategies
- Test offline scenarios
- Review browser console

### Debug Mode
Enable debug mode by setting:
```env
DEBUG=true
NODE_ENV=development
```

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Session management
- Database connection pooling
- CDN implementation

### Vertical Scaling
- Server resource monitoring
- Database performance tuning
- Memory optimization
- CPU usage monitoring

## Support and Maintenance

### Regular Updates
- Security patches
- Feature updates
- Bug fixes
- Performance improvements

### Monitoring
- Uptime monitoring
- Error tracking
- Performance metrics
- User analytics

### Documentation
- API documentation
- User guides
- Admin documentation
- Troubleshooting guides

## Contact Information

For technical support or questions:
- Email: support@schooladmin.com
- Documentation: https://docs.schooladmin.com
- Issue Tracker: https://github.com/your-repo/issues

---

**Note**: This deployment guide is comprehensive but should be adapted based on your specific infrastructure and requirements. Always test in a staging environment before deploying to production.


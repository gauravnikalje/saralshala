# School Admin System

A comprehensive school administration system built with modern web technologies, featuring user authentication, attendance management, grade tracking, and real-time notifications.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**
  - Secure login system with JWT tokens
  - Role-based access control (Principal, Teacher)
  - Session management and timeout handling
  - Password reset functionality

- **Student Management**
  - Complete student database
  - Student profile management
  - Class and subject assignment
  - Bulk student operations

- **Attendance System**
  - Real-time attendance marking
  - Attendance statistics and reports
  - Bulk attendance upload
  - SMS notifications for absences

- **Grade Management**
  - Grade entry and tracking
  - Grade statistics and analytics
  - Bulk grade upload
  - Grade history and trends

- **Communication**
  - School notices and announcements
  - Teacher-student communication
  - SMS integration for alerts
  - Email notifications

### Advanced Features
- **SMS Gateway Integration**
  - Automatic absence alerts to parents
  - Bulk SMS notifications
  - SMS statistics and tracking
  - Configurable message templates

- **Offline Support**
  - Service Worker implementation
  - Offline data caching
  - Background sync
  - Offline page display

- **Real-time Updates**
  - Live attendance tracking
  - Real-time notifications
  - Dynamic content updates
  - WebSocket integration (planned)

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Tailwind CSS
- **JavaScript (ES6+)** - Modern JavaScript features
- **Alpine.js** - Lightweight reactive framework
- **Service Worker** - Offline functionality

### Backend
- **Node.js** - Server runtime
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **JWT** - Authentication tokens

### External Services
- **Twilio** - SMS service provider
- **Supabase Auth** - Authentication service
- **CDN** - Content delivery

## 📁 Project Structure

```
school-admin-system/
├── js/
│   ├── auth-service.js      # Authentication logic
│   └── sms-service.js       # SMS functionality
├── lib/
│   └── supabaseClient.js    # Supabase configuration
├── supabase/
│   ├── functions/
│   │   └── create-user/      # User creation function
│   └── migrations/           # Database migrations
├── server.js                 # Main server file
├── sw.js                     # Service Worker
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14.0.0 or higher
- npm 6.0.0 or higher
- Supabase account
- Twilio account (optional, for SMS features)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd school-admin-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SMS_API_KEY=your_sms_api_key (optional)
SMS_ACCOUNT_SID=your_account_sid (optional)
SMS_FROM_NUMBER=your_from_number (optional)
```

4. **Set up the database**
```bash
cd supabase
supabase db push
```

5. **Start the development server**
```bash
npm start
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 📱 Usage

### For Principals
1. **Login** with principal credentials
2. **Manage Staff** - Add/edit teacher accounts
3. **Monitor Classes** - View real-time class status
4. **Configure SMS** - Set up SMS notifications
5. **View Reports** - Access comprehensive reports

### For Teachers
1. **Login** with teacher credentials
2. **Mark Attendance** - Record student attendance
3. **Enter Grades** - Input student grades
4. **View Notices** - Read school announcements
5. **Manage Profile** - Update personal information

## 🔧 Configuration

### SMS Configuration
1. Access the SMS Configuration page from the principal dashboard
2. Enter your Twilio credentials
3. Test the SMS functionality
4. Configure message templates

### Database Configuration
1. Set up Supabase project
2. Run migration scripts
3. Configure Row Level Security (RLS)
4. Set up authentication providers

## 🧪 Testing

### Running Tests
1. Navigate to the test suite: `http://localhost:3000/test-suite.html`
2. Click "Run All Tests" to execute the complete test suite
3. Review test results and logs

### Test Categories
- **Authentication Tests** - Login, session management, role-based access
- **Attendance Tests** - Marking attendance, statistics, bulk operations
- **SMS Tests** - SMS configuration, sending alerts, statistics
- **Offline Tests** - Service worker, caching, background sync

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Traditional Server
```bash
# Using PM2
npm install -g pm2
pm2 start server.js --name school-admin
pm2 startup
pm2 save
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🔒 Security

### Authentication
- JWT-based authentication
- Secure session management
- Password hashing with bcrypt
- Role-based access control

### Data Protection
- Row Level Security (RLS) on all tables
- Input validation and sanitization
- HTTPS enforcement
- Regular security updates

### Privacy
- GDPR compliance considerations
- Data encryption in transit
- Secure data storage
- Access logging and monitoring

## 📊 Performance

### Optimization Features
- Service Worker caching
- Static file optimization
- Database query optimization
- CDN integration

### Monitoring
- Application performance tracking
- Error monitoring and logging
- User activity analytics
- System health checks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation
- [User Guide](docs/USER_GUIDE.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](DEPLOYMENT.md)

### Getting Help
- Check the [Issues](https://github.com/your-repo/issues) page
- Review the [FAQ](docs/FAQ.md)
- Contact support: support@schooladmin.com

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Core authentication system
- Attendance management
- Grade tracking
- SMS integration
- Offline support
- Comprehensive testing suite

## 🎯 Roadmap

### Upcoming Features
- Mobile app (React Native)
- Advanced analytics dashboard
- Parent portal
- Video conferencing integration
- Advanced reporting tools
- Multi-language support

---

**Built with ❤️ for educational institutions worldwide**


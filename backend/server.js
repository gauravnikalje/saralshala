const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'School Admin API is running...' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test routes (no database dependency)
app.use('/api/test', require('./routes/testRoutes'));

// API Routes (will be implemented after database setup)
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/students', require('./routes/studentRoutes'));
// app.use('/api/teachers', require('./routes/teacherRoutes'));
// app.use('/api/classes', require('./routes/classRoutes'));
// app.use('/api/attendance', require('./routes/attendanceRoutes'));
// app.use('/api/grades', require('./routes/gradeRoutes'));
// app.use('/api/enquiry', require('./routes/enquiryRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - fix the route pattern
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 School Admin API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test/test`);
});

module.exports = app;

const express = require('express');
const router = express.Router();

// Test route that doesn't require database
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend API is working!', 
    timestamp: new Date().toISOString(),
    status: 'OK'
  });
});

module.exports = router;

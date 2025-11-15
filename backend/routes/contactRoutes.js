const express = require('express');
const { ContactService } = require('../services/contactService');
const { validateContactData } = require('../middleware/validation');
const { contactRateLimit } = require('../middleware/rateLimit');

const router = express.Router();
const contactService = new ContactService();

// Submit contact form
router.post('/submit',
    contactRateLimit,
    (req, res, next) => {
        // Debug middleware to check body parsing
        console.log('Request body:', req.body);
        console.log('Content-Type:', req.headers['content-type']);
        if (!req.body) {
            console.log('Body is undefined! Trying raw body...');
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    req.body = JSON.parse(body);
                    console.log('Parsed body:', req.body);
                    next();
                } catch (err) {
                    console.error('Failed to parse JSON:', err);
                    res.status(400).json({ error: 'Invalid JSON' });
                }
            });
        } else {
            next();
        }
    },
    validateContactData,
    async (req, res) => {
        try {
            const contactData = req.body;
            console.log('Contact data received:', contactData);

            // Get client IP address
            const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;

            // Enhanced contact data with metadata
            const enrichedData = {
                ...contactData,
                ipAddress: clientIP,
                timestamp: new Date().toISOString(),
                submissionId: `CONTACT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            };

            // Save to Excel file
            const result = await contactService.saveContactData(enrichedData);

            if (result.success) {
                res.json({
                    success: true,
                    message: 'Contact form submitted successfully',
                    data: {
                        submissionId: result.submissionId,
                        timestamp: enrichedData.timestamp
                    }
                });
            } else {
                throw new Error(result.error);
            }

        } catch (error) {
            console.error('Contact form submission error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error. Please try again later.',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }
);

// Get contact submissions (admin only)
router.get('/submissions',
    async (req, res) => {
        try {
            // TODO: Add authentication middleware for admin access
            const limit = parseInt(req.query.limit) || 100;
            const offset = parseInt(req.query.offset) || 0;

            const submissions = await contactService.getContactSubmissions(limit, offset);

            res.json({
                success: true,
                data: submissions,
                pagination: {
                    limit,
                    offset,
                    total: submissions.length
                }
            });

        } catch (error) {
            console.error('Error fetching contact submissions:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch contact submissions',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }
);

// Health check for contact service
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'Contact Service',
        timestamp: new Date().toISOString(),
        features: [
            'Excel file operations',
            'Data validation',
            'Rate limiting',
            'Error handling'
        ]
    });
});

module.exports = router;
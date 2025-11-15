const { body, validationResult } = require('express-validator');

// Validation rules for contact form data
const contactValidationRules = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes')
        .escape(),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail()
        .isLength({ max: 100 })
        .withMessage('Email must not exceed 100 characters'),

    body('phone')
        .trim()
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be exactly 10 digits')
        .escape(),

    body('message')
        .trim()
        .isLength({ min: 2, max: 500 })
        .withMessage('Message must be between 2 and 500 characters')
        .escape(),

    body('timestamp')
        .optional()
        .isISO8601()
        .withMessage('Invalid timestamp format'),

    body('userAgent')
        .optional()
        .isLength({ max: 500 })
        .withMessage('User agent must not exceed 500 characters')
        .escape(),

    body('ipAddress')
        .optional()
        .isLength({ max: 50 })
        .withMessage('IP address must not exceed 50 characters')
        .escape(),

    body('referralSource')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Referral source must not exceed 200 characters')
        .escape()
];

// Middleware to validate contact form data
const validateContactData = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg
            }))
        });
    }

    // Additional custom validations
    const { name, email, phone, message } = req.body;

    // Sanitize and validate name
    if (name) {
        const nameWords = name.trim().split(/\s+/);
        if (nameWords.length < 1 || nameWords.some(word => word.length < 2)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid full name'
            });
        }
    }

    // Sanitize and validate message content
    if (message) {
        const cleanedMessage = message.replace(/[^\w\s]/gi, '').trim();
        if (cleanedMessage.split(/\s+/).length < 1) {
            return res.status(400).json({
                success: false,
                message: 'Message must contain at least 1 meaningful word'
            });
        }

        // Check for spam indicators
        const spamPatterns = [
            /(.)\1{4,}/i, // Repeated characters
            /http[s]?:\/\//i, // URLs
            /\$\d+/, // Money mentions
            /click here/i, // Spam phrases
            /free money/i,
            /urgent/i
        ];

        if (spamPatterns.some(pattern => pattern.test(message))) {
            return res.status(400).json({
                success: false,
                message: 'Message appears to contain spam content'
            });
        }
    }

    // Phone number additional validation
    if (phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        if (/^(\d)\1{9}$/.test(cleanPhone)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid phone number'
            });
        }

        if (/0123|1234|2345|3456|4567|5678|6789/.test(cleanPhone)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid phone number'
            });
        }
    }

    next();
};

module.exports = {
    contactValidationRules,
    validateContactData
};
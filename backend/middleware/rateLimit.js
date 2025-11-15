const rateLimit = require('express-rate-limit');

// Default rate limiting configuration
const createRateLimiter = (options = {}) => {
    const defaultOptions = {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: {
            success: false,
            message: 'Too many requests, please try again later.'
        },
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        handler: (req, res) => {
            res.status(429).json({
                success: false,
                message: 'Too many requests from this IP, please try again later.',
                retryAfter: Math.round(options.windowMs / 1000) || 900
            });
        }
    };

    const finalOptions = { ...defaultOptions, ...options };
    return rateLimit(finalOptions);
};

// Specific rate limiters for different endpoints
const contactRateLimit = createRateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutes (reduced from 15)
    max: 15, // Increased limit from 5 to 15 requests per windowMs
    message: {
        success: false,
        message: 'Too many contact form submissions, please try again later.',
        retryAfter: 300
    },
    keyGenerator: (req) => {
        // Use IP address for rate limiting
        return req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
    },
    skip: (req) => {
        // Allow bypass for localhost and development
        const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
        return ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';
    }
});

const generalApiRateLimit = createRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per 15 minutes
    message: {
        success: false,
        message: 'Too many API requests, please try again later.'
    }
});

// Strict rate limiter for suspicious activity
const strictRateLimit = createRateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // very strict limit
    message: {
        success: false,
        message: 'Access temporarily restricted due to suspicious activity.'
    }
});

// Export rate limiter functions
module.exports = {
    rateLimit,
    createRateLimiter,
    contactRateLimit,
    generalApiRateLimit,
    strictRateLimit
};
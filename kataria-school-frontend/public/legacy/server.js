const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
// Correct the path to point to the backend directory
const smsService = require('../backend/sms/smsService');

const port = 3001;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let filePath = parsedUrl.pathname;
    
    // Handle API routes first
    if (filePath.startsWith('/api/')) {
        await handleApiRequest(req, res, parsedUrl);
        return;
    }
    
    // Default to index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Security: prevent directory traversal
    if (filePath.includes('..')) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }
    
    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';
    
    // Check if file exists
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head>
                        <title>404 - Not Found</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; margin-top: 100px; }
                            h1 { color: #e74c3c; }
                            p { color: #7f8c8d; }
                            a { color: #3498db; text-decoration: none; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - Page Not Found</h1>
                        <p>The requested file <code>${filePath}</code> could not be found.</p>
                        <p><a href="/">Go back to home</a></p>
                    </body>
                </html>
            `);
            return;
        }
        
        // File exists, serve it
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Internal Server Error');
                return;
            }
            
            // Set appropriate headers
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            });
            
            res.end(data);
        });
    });
});

server.listen(port, () => {
    console.log(`🚀 School Admin Test Server running at http://localhost:${port}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`\n🎯 Available pages to test:`);
    console.log(`   • Main page: http://localhost:${port}/`);
    console.log(`   • Enhanced login: http://localhost:${port}/login.html`);
    console.log(`   • Forgot password: http://localhost:${port}/forgot-password.html`);
    console.log(`   • Reset password: http://localhost:${port}/reset-password.html`);
    console.log(`   • Teacher dashboard: http://localhost:${port}/dashboard.html`);
    console.log(`   • Principal dashboard: http://localhost:${port}/principal-dashboard.html`);
    console.log(`   • Teacher profile: http://localhost:${port}/teacher-profile.html`);
    console.log(`\n⚠️  Note: Authentication features are in mock mode for testing`);
    console.log(`   Principal credentials: principal@school.com / admin123`);
    console.log(`   Teacher credentials: sarah.johnson@school.com / sarah123`);
});

// API Request Handler
async function handleApiRequest(req, res, parsedUrl) {
    const apiPath = parsedUrl.pathname;
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // SMS API endpoints
    if (apiPath === '/api/sms/send') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    const result = await smsService.sendSMS(data.to, data.message);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, data: result }));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: error.message }));
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        }
        return;
    }
    
    if (apiPath === '/api/sms/absence-alert') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    const result = await smsService.sendAbsenceAlert(
                        data.student, 
                        data.parentPhoneNumber, 
                        data.className, 
                        data.date
                    );
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, data: result }));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: error.message }));
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        }
        return;
    }
    
    if (apiPath === '/api/sms/bulk-absence-alerts') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', async () => {
                try {
                    const data = JSON.parse(body);
                    const results = await smsService.sendBulkAbsenceAlerts(
                        data.absentStudents, 
                        data.className, 
                        data.date
                    );
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, data: results }));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: error.message }));
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
        }
        return;
    }
    
    // API endpoint not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'API endpoint not found' }));
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\\n👋 Shutting down server...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

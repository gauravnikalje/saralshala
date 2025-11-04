const http = require('http');

// Test the SMS API endpoints
async function testSMSAPI() {
    console.log('Testing SMS API endpoints...');
    
    // Test sending a simple SMS
    console.log('\n1. Testing /api/sms/send endpoint...');
    const smsData = {
        to: '+1234567890',
        message: 'Test message from School Admin System API'
    };
    
    const smsOptions = {
        hostname: 'localhost',
        port: 3002,
        path: '/api/sms/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const smsResult = await makeRequest(smsOptions, JSON.stringify(smsData));
        console.log('SMS API result:', smsResult);
    } catch (error) {
        console.error('SMS API test failed:', error.message);
    }
    
    // Test sending an absence alert
    console.log('\n2. Testing /api/sms/absence-alert endpoint...');
    const absenceData = {
        student: {
            name: 'John Doe',
            rollNumber: '10A-001'
        },
        parentPhoneNumber: '+1234567890',
        className: 'Class 10A',
        date: '2025-10-23'
    };
    
    const absenceOptions = {
        hostname: 'localhost',
        port: 3002,
        path: '/api/sms/absence-alert',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const absenceResult = await makeRequest(absenceOptions, JSON.stringify(absenceData));
        console.log('Absence alert API result:', absenceResult);
    } catch (error) {
        console.error('Absence alert API test failed:', error.message);
    }
    
    // Test sending bulk absence alerts
    console.log('\n3. Testing /api/sms/bulk-absence-alerts endpoint...');
    const bulkData = {
        absentStudents: [
            {
                id: 1,
                name: 'John Doe',
                rollNumber: '10A-001',
                parentPhoneNumber: '+1234567890'
            },
            {
                id: 2,
                name: 'Jane Smith',
                rollNumber: '10A-002',
                parentPhoneNumber: '+1234567891'
            }
        ],
        className: 'Class 10A',
        date: '2025-10-23'
    };
    
    const bulkOptions = {
        hostname: 'localhost',
        port: 3002,
        path: '/api/sms/bulk-absence-alerts',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const bulkResult = await makeRequest(bulkOptions, JSON.stringify(bulkData));
        console.log('Bulk absence alerts API result:', bulkResult);
    } catch (error) {
        console.error('Bulk absence alerts API test failed:', error.message);
    }
    
    console.log('\nAll API tests completed!');
}

// Helper function to make HTTP requests
function makeRequest(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    resolve(parsedData);
                } catch (error) {
                    reject(error);
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (data) {
            req.write(data);
        }
        
        req.end();
    });
}

// Run the tests
testSMSAPI();
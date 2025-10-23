const smsService = require('./smsService');

async function testSMS() {
    console.log('Testing SMS Service...');
    
    try {
        // Test sending a simple SMS
        console.log('\n1. Testing simple SMS sending...');
        const result1 = await smsService.sendSMS('+1234567890', 'Test message from School Admin System');
        console.log('Simple SMS result:', result1);
        
        // Test sending an absence alert
        console.log('\n2. Testing absence alert...');
        const student = {
            name: 'John Doe',
            rollNumber: '10A-001'
        };
        try {
            const result2 = await smsService.sendAbsenceAlert(student, '+1234567890', 'Class 10A', '2025-10-23');
            console.log('Absence alert result:', result2);
        } catch (error) {
            console.log('Absence alert failed (simulated):', error.message);
        }
        
        // Test sending bulk absence alerts
        console.log('\n3. Testing bulk absence alerts...');
        const absentStudents = [
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
        ];
        const results = await smsService.sendBulkAbsenceAlerts(absentStudents, 'Class 10A', '2025-10-23');
        console.log('Bulk absence alerts results:', results);
        
        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

// Run the test
testSMS();
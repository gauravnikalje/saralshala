// SMS Service for sending absence alerts to parents
// This is a mock implementation that can be easily replaced with real SMS providers

class SMSService {
    constructor() {
        this.isEnabled = localStorage.getItem('smsEnabled') === 'true';
        this.apiKey = localStorage.getItem('smsApiKey') || 'demo-key';
        this.senderId = localStorage.getItem('smsSenderId') || 'SCHOOL';
        this.provider = localStorage.getItem('smsProvider') || 'demo';
        
        // Supported SMS providers
        this.providers = {
            'demo': {
                name: 'Demo SMS (Testing)',
                endpoint: 'https://demo-sms-api.example.com/send',
                mock: true
            },
            'textlocal': {
                name: 'TextLocal India',
                endpoint: 'https://api.textlocal.in/send/',
                mock: false
            },
            'twilio': {
                name: 'Twilio',
                endpoint: 'https://api.twilio.com/2010-04-01/Accounts/',
                mock: false
            }
        };
    }

    /**
     * Configure SMS settings
     */
    configure(settings) {
        if (settings.enabled !== undefined) {
            this.isEnabled = settings.enabled;
            localStorage.setItem('smsEnabled', settings.enabled.toString());
        }
        
        if (settings.apiKey) {
            this.apiKey = settings.apiKey;
            localStorage.setItem('smsApiKey', settings.apiKey);
        }
        
        if (settings.senderId) {
            this.senderId = settings.senderId;
            localStorage.setItem('smsSenderId', settings.senderId);
        }
        
        if (settings.provider) {
            this.provider = settings.provider;
            localStorage.setItem('smsProvider', settings.provider);
        }
        
        console.log('SMS Service configured:', {
            enabled: this.isEnabled,
            provider: this.provider,
            senderId: this.senderId
        });
    }

    /**
     * Send SMS to a single recipient
     */
    async sendSMS(phoneNumber, message) {
        if (!this.isEnabled) {
            console.log('SMS service is disabled');
            return { success: false, error: 'SMS service is disabled' };
        }

        if (!phoneNumber || !message) {
            console.error('Phone number and message are required');
            return { success: false, error: 'Phone number and message are required' };
        }

        // Clean phone number (remove spaces, dashes, etc.)
        const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');
        
        try {
            const providerConfig = this.providers[this.provider];
            
            if (providerConfig.mock) {
                return await this.sendMockSMS(cleanPhone, message);
            } else {
                return await this.sendRealSMS(cleanPhone, message, providerConfig);
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send mock SMS (for testing)
     */
    async sendMockSMS(phoneNumber, message) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log(`📱 MOCK SMS SENT:`);
        console.log(`To: ${phoneNumber}`);
        console.log(`Message: ${message}`);
        console.log(`Provider: ${this.provider}`);
        console.log(`Sender ID: ${this.senderId}`);
        
        // Store SMS log for testing
        const smsLog = JSON.parse(localStorage.getItem('smsLog') || '[]');
        smsLog.push({
            timestamp: new Date().toISOString(),
            phoneNumber,
            message,
            provider: this.provider,
            senderId: this.senderId,
            status: 'sent'
        });
        localStorage.setItem('smsLog', JSON.stringify(smsLog));
        
        return {
            success: true,
            messageId: 'mock_' + Date.now(),
            provider: this.provider,
            cost: 0.05 // Mock cost
        };
    }

    /**
     * Send real SMS using actual provider
     */
    async sendRealSMS(phoneNumber, message, providerConfig) {
        // This would be implemented based on the specific SMS provider
        // For now, return mock response
        console.warn('Real SMS providers not implemented yet. Using mock SMS.');
        return await this.sendMockSMS(phoneNumber, message);
    }

    /**
     * Send absence alert to parent
     */
    async sendAbsenceAlert(student, classInfo, date) {
        if (!student.guardianPhone) {
            console.warn(`No guardian phone number for student: ${student.name}`);
            return { success: false, error: 'No guardian phone number' };
        }

        const message = this.formatAbsenceMessage(student, classInfo, date);
        return await this.sendSMS(student.guardianPhone, message);
    }

    /**
     * Send bulk absence alerts
     */
    async sendBulkAbsenceAlerts(absentStudents, classInfo, date) {
        const results = [];
        
        for (const student of absentStudents) {
            try {
                const result = await this.sendAbsenceAlert(student, classInfo, date);
                results.push({
                    student: student.name,
                    rollNumber: student.rollNumber,
                    phone: student.guardianPhone,
                    ...result
                });
                
                // Add delay between SMS to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                results.push({
                    student: student.name,
                    rollNumber: student.rollNumber,
                    phone: student.guardianPhone,
                    success: false,
                    error: error.message
                });
            }
        }
        
        return results;
    }

    /**
     * Format absence message in both English and Marathi
     */
    formatAbsenceMessage(student, classInfo, date) {
        const formattedDate = new Date(date).toLocaleDateString('en-IN');
        
        // Bilingual message (English + Marathi)
        const message = `Dear Parent/पालक,

Your child ${student.name} (Roll No: ${student.rollNumber}) was absent from ${classInfo.subject} class on ${formattedDate}.

आपले मूल ${student.name} (रोल नं: ${student.rollNumber}) यांची ${formattedDate} रोजी ${classInfo.subject} वर्गात अनुपस्थिती होती.

Please contact school if child was present.
कृपया शाळेशी संपर्क साधा.

- ${classInfo.schoolName || 'School Administration'}`;

        return message;
    }

    /**
     * Get SMS statistics
     */
    getStatistics() {
        const smsLog = JSON.parse(localStorage.getItem('smsLog') || '[]');
        
        const today = new Date().toDateString();
        const todayMessages = smsLog.filter(sms => 
            new Date(sms.timestamp).toDateString() === today
        );
        
        return {
            totalSent: smsLog.length,
            sentToday: todayMessages.length,
            lastSent: smsLog.length > 0 ? smsLog[smsLog.length - 1].timestamp : null,
            provider: this.provider,
            enabled: this.isEnabled
        };
    }

    /**
     * Get SMS log for admin
     */
    getSMSLog(limit = 50) {
        const smsLog = JSON.parse(localStorage.getItem('smsLog') || '[]');
        return smsLog.slice(-limit).reverse();
    }

    /**
     * Clear SMS log
     */
    clearSMSLog() {
        localStorage.setItem('smsLog', '[]');
        console.log('SMS log cleared');
    }

    /**
     * Test SMS configuration
     */
    async testSMS(testPhoneNumber) {
        const testMessage = `Test message from ${this.senderId}. SMS service is working correctly. Time: ${new Date().toLocaleString()}`;
        
        return await this.sendSMS(testPhoneNumber, testMessage);
    }
}

// Export singleton instance
const smsService = new SMSService();

// Also attach to window for global access
window.SMSService = smsService;

export default smsService;
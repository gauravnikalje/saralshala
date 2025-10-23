/**
 * SMS Service Module
 * Integrates with Twilio API to send SMS messages
 */

// In a real implementation, we would use the actual Twilio SDK
// For this demo, we'll simulate the functionality

class SMSService {
    constructor() {
        // In a real implementation, these would come from environment variables
        this.accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
        this.authToken = process.env.TWILIO_AUTH_TOKEN || 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
        this.twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+1234567890';
        
        // Simulate Twilio client
        this.client = {
            messages: {
                create: this.simulateSendSMS.bind(this)
            }
        };
    }

    /**
     * Send SMS message
     * @param {string} to - Recipient phone number
     * @param {string} message - Message content
     * @returns {Promise<Object>} - Result of SMS sending
     */
    async sendSMS(to, message) {
        try {
            // Validate phone number format
            if (!this.isValidPhoneNumber(to)) {
                throw new Error('Invalid phone number format');
            }

            // Validate message content
            if (!message || message.trim().length === 0) {
                throw new Error('Message content is required');
            }

            // In a real implementation, we would use:
            // const result = await this.client.messages.create({
            //     body: message,
            //     from: this.twilioPhoneNumber,
            //     to: to
            // });

            // For simulation, we'll just return a success response
            const result = await this.client.messages.create({
                to: to,
                from: this.twilioPhoneNumber,
                body: message
            });

            console.log(`SMS sent successfully to ${to}: ${message}`);
            return {
                success: true,
                sid: 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Simulated SID
                status: 'sent',
                to: to,
                from: this.twilioPhoneNumber,
                body: message,
                dateCreated: new Date().toISOString()
            };
        } catch (error) {
            console.error(`Failed to send SMS to ${to}:`, error.message);
            throw error;
        }
    }

    /**
     * Send absence alert to parent
     * @param {Object} student - Student information
     * @param {string} parentPhoneNumber - Parent's phone number
     * @param {string} className - Class name
     * @param {string} date - Date of absence
     * @returns {Promise<Object>} - Result of SMS sending
     */
    async sendAbsenceAlert(student, parentPhoneNumber, className, date) {
        try {
            const message = `Dear Parent, this is to inform you that ${student.name} (Roll No: ${student.rollNumber}) was absent from ${className} on ${date}. Please contact the school if you are unaware of this absence.`;
            
            return await this.sendSMS(parentPhoneNumber, message);
        } catch (error) {
            console.error('Failed to send absence alert:', error.message);
            throw error;
        }
    }

    /**
     * Send bulk absence alerts
     * @param {Array} absentStudents - Array of absent students with parent phone numbers
     * @param {string} className - Class name
     * @param {string} date - Date of absence
     * @returns {Promise<Array>} - Results of all SMS sending attempts
     */
    async sendBulkAbsenceAlerts(absentStudents, className, date) {
        const results = [];
        
        for (const student of absentStudents) {
            try {
                const result = await this.sendAbsenceAlert(
                    student, 
                    student.parentPhoneNumber, 
                    className, 
                    date
                );
                results.push({
                    studentId: student.id,
                    success: true,
                    result: result
                });
            } catch (error) {
                results.push({
                    studentId: student.id,
                    success: false,
                    error: error.message
                });
            }
        }
        
        return results;
    }

    /**
     * Validate phone number format
     * @param {string} phoneNumber - Phone number to validate
     * @returns {boolean} - Whether the phone number is valid
     */
    isValidPhoneNumber(phoneNumber) {
        // Simple validation - in reality, you'd use a more robust validation library
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phoneNumber);
    }

    /**
     * Simulate sending SMS (for demonstration purposes)
     * @param {Object} options - SMS options
     * @returns {Promise<Object>} - Simulated result
     */
    async simulateSendSMS(options) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Simulate possible failure
        if (Math.random() < 0.1) { // 10% chance of failure
            throw new Error('Simulated SMS sending failure');
        }
        
        return {
            sid: 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            dateCreated: new Date().toISOString(),
            dateUpdated: new Date().toISOString(),
            dateSent: new Date().toISOString(),
            accountSid: this.accountSid,
            to: options.to,
            from: options.from,
            body: options.body,
            status: 'sent',
            numSegments: '1',
            numMedia: '0',
            direction: 'outbound-api',
            apiVersion: '2010-04-01',
            price: '-0.00750',
            priceUnit: 'USD',
            errorCode: null,
            errorMessage: null
        };
    }
}

// Export singleton instance
const smsService = new SMSService();
module.exports = smsService;
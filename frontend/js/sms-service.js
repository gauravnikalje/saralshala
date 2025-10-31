/**
 * SMS Service Module
 * Handles SMS notifications for absence alerts and other school communications
 */

class SMSService {
    constructor() {
        this.apiKey = window.SMS_API_KEY || 'YOUR_SMS_API_KEY';
        this.apiUrl = window.SMS_API_URL || 'https://api.twilio.com/2010-04-01/Accounts';
        this.accountSid = window.SMS_ACCOUNT_SID || 'YOUR_ACCOUNT_SID';
        this.fromNumber = window.SMS_FROM_NUMBER || '+1234567890';
        this.isEnabled = this.apiKey !== 'YOUR_SMS_API_KEY';
    }

    /**
     * Send SMS notification for student absence
     * @param {Object} student - Student information
     * @param {Object} attendance - Attendance record
     * @param {Object} classInfo - Class information
     * @returns {Promise<Object>} - Result of SMS sending
     */
    async sendAbsenceAlert(student, attendance, classInfo) {
        if (!this.isEnabled) {
            console.warn('SMS service is not configured. Please set SMS_API_KEY in environment variables.');
            return { success: false, error: 'SMS service not configured' };
        }

        try {
            const message = this.formatAbsenceMessage(student, attendance, classInfo);
            const result = await this.sendSMS(student.parent_phone_number, message);
            
            // Log the SMS activity
            await this.logSMSActivity({
                type: 'absence_alert',
                studentId: student.id,
                studentName: student.name,
                parentPhone: student.parent_phone_number,
                message: message,
                status: result.success ? 'sent' : 'failed',
                timestamp: new Date().toISOString()
            });

            return result;
        } catch (error) {
            console.error('Error sending absence alert SMS:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send bulk SMS notifications
     * @param {Array} recipients - Array of phone numbers
     * @param {String} message - Message to send
     * @returns {Promise<Object>} - Result of bulk SMS sending
     */
    async sendBulkSMS(recipients, message) {
        if (!this.isEnabled) {
            return { success: false, error: 'SMS service not configured' };
        }

        const results = [];
        const batchSize = 5; // Process in batches to avoid rate limits

        for (let i = 0; i < recipients.length; i += batchSize) {
            const batch = recipients.slice(i, i + batchSize);
            const batchPromises = batch.map(phone => this.sendSMS(phone, message));
            
            try {
                const batchResults = await Promise.allSettled(batchPromises);
                results.push(...batchResults.map(result => 
                    result.status === 'fulfilled' ? result.value : { success: false, error: result.reason }
                ));
            } catch (error) {
                console.error('Error in batch SMS sending:', error);
                results.push({ success: false, error: error.message });
            }

            // Add delay between batches to respect rate limits
            if (i + batchSize < recipients.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        const successCount = results.filter(r => r.success).length;
        return {
            success: successCount > 0,
            totalSent: successCount,
            totalFailed: results.length - successCount,
            results: results
        };
    }

    /**
     * Send SMS using Twilio API
     * @param {String} to - Recipient phone number
     * @param {String} message - Message content
     * @returns {Promise<Object>} - Result of SMS sending
     */
    async sendSMS(to, message) {
        try {
            const response = await fetch(`${this.apiUrl}/${this.accountSid}/Messages.json`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`${this.accountSid}:${this.apiKey}`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    From: this.fromNumber,
                    To: to,
                    Body: message
                })
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    messageId: data.sid,
                    status: data.status,
                    to: to
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Failed to send SMS',
                    code: data.code
                };
            }
        } catch (error) {
            console.error('SMS API error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Format absence alert message
     * @param {Object} student - Student information
     * @param {Object} attendance - Attendance record
     * @param {Object} classInfo - Class information
     * @returns {String} - Formatted message
     */
    formatAbsenceMessage(student, attendance, classInfo) {
        const date = new Date(attendance.date).toLocaleDateString();
        const time = attendance.period ? `Period ${attendance.period}` : 'Today';
        
        return `Dear Parent/Guardian,

Your child ${student.name} (Roll No: ${student.roll_number}) was marked ${attendance.status} for ${classInfo.subject} class on ${date} (${time}).

Class: ${classInfo.name}
Teacher: ${attendance.teacher_name || 'N/A'}

Please contact the school if you have any concerns.

Thank you,
School Administration`;
    }

    /**
     * Log SMS activity for tracking
     * @param {Object} activity - SMS activity data
     */
    async logSMSActivity(activity) {
        try {
            const smsLog = JSON.parse(localStorage.getItem('sms_activity_log') || '[]');
            smsLog.push(activity);
            
            // Keep only last 1000 entries to prevent storage bloat
            if (smsLog.length > 1000) {
                smsLog.splice(0, smsLog.length - 1000);
            }
            
            localStorage.setItem('sms_activity_log', JSON.stringify(smsLog));
        } catch (error) {
            console.error('Error logging SMS activity:', error);
        }
    }

    /**
     * Get SMS activity log
     * @param {String} type - Filter by activity type
     * @param {Number} limit - Limit number of results
     * @returns {Array} - SMS activity log
     */
    getSMSActivityLog(type = null, limit = 100) {
        try {
            const smsLog = JSON.parse(localStorage.getItem('sms_activity_log') || '[]');
            let filteredLog = smsLog;
            
            if (type) {
                filteredLog = smsLog.filter(activity => activity.type === type);
            }
            
            return filteredLog.slice(-limit);
        } catch (error) {
            console.error('Error retrieving SMS activity log:', error);
            return [];
        }
    }

    /**
     * Test SMS configuration
     * @param {String} testPhone - Test phone number
     * @returns {Promise<Object>} - Test result
     */
    async testSMSConfiguration(testPhone) {
        if (!this.isEnabled) {
            return {
                success: false,
                error: 'SMS service not configured. Please set SMS_API_KEY, SMS_ACCOUNT_SID, and SMS_FROM_NUMBER.'
            };
        }

        const testMessage = 'This is a test message from School Admin System. SMS service is working correctly.';
        
        try {
            const result = await this.sendSMS(testPhone, testMessage);
            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get SMS statistics
     * @returns {Object} - SMS statistics
     */
    getSMSStatistics() {
        const smsLog = this.getSMSActivityLog();
        const today = new Date().toDateString();
        
        const todayLog = smsLog.filter(activity => 
            new Date(activity.timestamp).toDateString() === today
        );
        
        const sentToday = todayLog.filter(activity => activity.status === 'sent').length;
        const failedToday = todayLog.filter(activity => activity.status === 'failed').length;
        
        return {
            totalSMS: smsLog.length,
            sentToday: sentToday,
            failedToday: failedToday,
            successRate: smsLog.length > 0 ? 
                (smsLog.filter(a => a.status === 'sent').length / smsLog.length * 100).toFixed(2) : 0
        };
    }
}

// Export singleton instance
const smsService = new SMSService();
export default smsService;

// Also attach to window for non-module usage
window.SMSService = smsService;


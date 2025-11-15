// backend/services/googleSheetsService.js
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

class GoogleSheetsService {
    constructor() {
        this.initialized = false;
        this.sheets = null;
        this.auth = null;
    }

    async initialize() {
        try {
            // Load service account credentials
            const serviceAccountPath = path.join(__dirname, '../config/service-account.json');

            if (!fs.existsSync(serviceAccountPath)) {
                throw new Error('Service account file not found');
            }

            const credentials = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

            // Initialize authentication
            this.auth = new google.auth.GoogleAuth({
                credentials,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            // Initialize sheets API
            this.sheets = google.sheets({ version: 'v4', auth: this.auth });
            this.initialized = true;

            console.log('✅ Google Sheets service initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Google Sheets service:', error);
            throw error;
        }
    }

    async saveContactData(contactData) {
        if (!this.initialized) {
            await this.initialize();
        }

        try {
            const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
            const range = 'Contact Submissions!A:I';

            // Prepare data row
            const values = [
                [
                    contactData.timestamp || new Date().toISOString(),
                    contactData.name || '',
                    contactData.email || '',
                    contactData.phone || '',
                    contactData.message || '',
                    contactData.ipAddress || '',
                    contactData.userAgent || '',
                    contactData.referralSource || '',
                    contactData.submissionId || this.generateSubmissionId()
                ]
            ];

            // Append data to Google Sheets
            const response = await this.sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: {
                    values: values
                }
            });

            console.log('✅ Contact data saved to Google Sheets:', response.status);

            return {
                success: true,
                message: 'Data saved to Google Sheets successfully',
                storedIn: 'google_sheets',
                response: response.status
            };

        } catch (error) {
            console.error('❌ Failed to save to Google Sheets:', error);

            // Fallback to local storage
            try {
                const fallbackResult = await this.fallbackToLocalStorage(contactData);
                return {
                    success: true,
                    message: 'Data saved to local backup due to Google Sheets error',
                    storedIn: 'local_backup',
                    error: error.message,
                    fallback: fallbackResult
                };
            } catch (fallbackError) {
                console.error('❌ Both Google Sheets and local backup failed:', fallbackError);

                // Don't fail the user's submission, but log the error
                return {
                    success: false,
                    message: 'Failed to save contact data',
                    error: error.message
                };
            }
        }
    }

    async fallbackToLocalStorage(contactData) {
        const fs = require('fs').promises;
        const path = require('path');

        try {
            // Create backup directory if it doesn't exist
            const backupDir = path.join(__dirname, '../backups');
            await fs.mkdir(backupDir, { recursive: true });

            // Append to backup file
            const backupFile = path.join(backupDir, 'contact-backup.txt');
            const logEntry = {
                timestamp: new Date().toISOString(),
                data: contactData,
                type: 'google_sheets_fallback'
            };

            await fs.appendFile(backupFile, JSON.stringify(logEntry) + '\n');

            console.log('✅ Contact data backed up locally');
            return true;

        } catch (error) {
            console.error('❌ Local backup failed:', error);
            throw error;
        }
    }

    generateSubmissionId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `CONTACT_${timestamp}_${random}`;
    }

    // Test connection to Google Sheets
    async testConnection() {
        try {
            if (!this.initialized) {
                await this.initialize();
            }

            const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

            // Test read operation
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId,
                range: 'Contact Submissions!A1:B1'
            });

            console.log('✅ Google Sheets connection test successful');
            return { success: true, data: response.data };

        } catch (error) {
            console.error('❌ Google Sheets connection test failed:', error);
            throw error;
        }
    }
}

module.exports = new GoogleSheetsService();
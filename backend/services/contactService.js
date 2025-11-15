const XLSX = require('xlsx');
const fs = require('fs').promises;
const path = require('path');

class ContactService {
    constructor() {
        this.dataDirectory = path.join(__dirname, '../../data');
        this.excelFileName = 'contact_submissions.xlsx';
        this.excelFilePath = path.join(this.dataDirectory, this.excelFileName);
        this.ensureDataDirectory();
    }

    // Ensure data directory exists
    async ensureDataDirectory() {
        try {
            await fs.access(this.dataDirectory);
        } catch (error) {
            // Directory doesn't exist, create it
            await fs.mkdir(this.dataDirectory, { recursive: true });
            console.log('Created data directory:', this.dataDirectory);
        }
    }

    // Initialize Excel file with headers if it doesn't exist
    async initializeExcelFile() {
        try {
            await fs.access(this.excelFilePath);
        } catch (error) {
            // File doesn't exist, create it with headers
            const headers = [
                'Submission ID',
                'Timestamp',
                'Name',
                'Email',
                'Phone',
                'Message',
                'IP Address',
                'User Agent',
                'Referral Source',
                'Submission Date'
            ];

            const worksheet = XLSX.utils.aoa_to_sheet([headers]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Submissions');

            await XLSX.writeFile(workbook, this.excelFilePath);
            console.log('Created new Excel file:', this.excelFilePath);
        }
    }

    // Read existing data from Excel file
    async readExcelData() {
        try {
            await this.initializeExcelFile();
            const workbook = XLSX.readFile(this.excelFilePath);
            const worksheet = workbook.Sheets['Contact Submissions'];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            return data;
        } catch (error) {
            console.error('Error reading Excel file:', error);
            throw new Error('Failed to read contact submissions');
        }
    }

    // Write data to Excel file
    async writeExcelData(data) {
        try {
            const worksheet = XLSX.utils.aoa_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Submissions');

            // Add some formatting
            const range = XLSX.utils.decode_range(worksheet['!ref']);
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                    if (!worksheet[cellAddress]) continue;

                    // Header row formatting
                    if (R === 0) {
                        worksheet[cellAddress].s = {
                            font: { bold: true, color: { rgb: 'FFFFFF' } },
                            fill: { fgColor: { rgb: '3B82F6' } }
                        };
                    }
                }
            }

            await XLSX.writeFile(workbook, this.excelFilePath);
            return true;
        } catch (error) {
            console.error('Error writing Excel file:', error);
            throw new Error('Failed to save contact submission');
        }
    }

    // Save contact data - Use Google Sheets if configured, fallback to Excel
    async saveContactData(contactData) {
        try {
            // Check if Google Sheets is configured
            if (this.isGoogleSheetsConfigured()) {
                console.log('📊 Saving contact data to Google Sheets...');

                // Use Google Sheets service
                const googleSheetsService = require('./googleSheetsService');
                const result = await googleSheetsService.saveContactData(contactData);

                return {
                    success: true,
                    submissionId: contactData.submissionId,
                    storedIn: result.storedIn,
                    message: result.message,
                    savedAt: new Date().toISOString()
                };
            } else {
                console.log('📄 Google Sheets not configured, saving to Excel...');

                // Fallback to existing Excel functionality
                return await this.saveToExcel(contactData);
            }

        } catch (error) {
            console.error('Error saving contact data:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Check if Google Sheets is properly configured
    isGoogleSheetsConfigured() {
        return !!(process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
            process.env.GOOGLE_PRIVATE_KEY);
    }

    // Original Excel save functionality as fallback
    async saveToExcel(contactData) {
        // Sanitize and validate data
        const sanitizedData = {
            'Submission ID': contactData.submissionId,
            'Timestamp': contactData.timestamp,
            'Name': this.sanitizeText(contactData.name),
            'Email': this.sanitizeText(contactData.email).toLowerCase(),
            'Phone': this.sanitizeText(contactData.phone),
            'Message': this.sanitizeText(contactData.message),
            'IP Address': contactData.ipAddress || 'Unknown',
            'User Agent': this.sanitizeText(contactData.userAgent || 'Unknown'),
            'Referral Source': this.sanitizeText(contactData.referralSource || 'Direct'),
            'Submission Date': new Date().toLocaleDateString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
        };

        // Read existing data
        const existingData = await this.readExcelData();

        // Convert to array format and add new row
        const newRow = Object.values(sanitizedData);

        // Ensure we have proper headers
        if (existingData.length === 0) {
            existingData.push(Object.keys(sanitizedData));
        }

        existingData.push(newRow);

        // Write back to file
        await this.writeExcelData(existingData);

        console.log('✅ Contact data saved to Excel successfully:', contactData.submissionId);
        return {
            success: true,
            submissionId: contactData.submissionId,
            storedIn: 'excel',
            savedAt: new Date().toISOString()
        };
    }

    // Get contact submissions with pagination
    async getContactSubmissions(limit = 100, offset = 0) {
        try {
            const existingData = await this.readExcelData();

            // Skip header row and apply pagination
            const dataRows = existingData.slice(1);
            const paginatedData = dataRows.slice(offset, offset + limit);

            // Convert back to object format
            if (existingData.length > 0) {
                const headers = existingData[0];
                return paginatedData.map(row => {
                    const submission = {};
                    headers.forEach((header, index) => {
                        submission[header] = row[index] || '';
                    });
                    return submission;
                });
            }

            return [];
        } catch (error) {
            console.error('Error retrieving contact submissions:', error);
            throw new Error('Failed to retrieve contact submissions');
        }
    }

    // Sanitize text input
    sanitizeText(text) {
        if (!text || typeof text !== 'string') return '';

        return text
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .substring(0, 1000); // Limit length
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate phone number
    validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length === 10 && /^[0-9]{10}$/.test(cleanPhone);
    }

    // Validate data completeness
    validateContactData(data) {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (!data.email || !this.validateEmail(data.email)) {
            errors.push('Valid email address is required');
        }

        if (!data.phone || !this.validatePhone(data.phone)) {
            errors.push('Valid 10-digit phone number is required');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Get file statistics
    async getFileStats() {
        try {
            const stats = await fs.stat(this.excelFilePath);
            const data = await this.readExcelData();

            return {
                fileSize: stats.size,
                totalSubmissions: Math.max(0, data.length - 1), // Exclude header
                lastModified: stats.mtime,
                filePath: this.excelFilePath
            };
        } catch (error) {
            return {
                fileSize: 0,
                totalSubmissions: 0,
                lastModified: null,
                filePath: this.excelFilePath,
                error: error.message
            };
        }
    }
}

module.exports = { ContactService };
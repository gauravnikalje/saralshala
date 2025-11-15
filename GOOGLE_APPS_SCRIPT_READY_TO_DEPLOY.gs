/**
 * CORRECTED Google Apps Script for Contact Form Submission
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Open or create a new project
 * 3. Copy this entire code
 * 4. Paste it into the Apps Script editor
 * 5. Deploy as Web app (see below for deployment settings)
 * 
 * DEPLOYMENT SETTINGS:
 * - Type: Web app
 * - Execute as: Your Google account
 * - Who has access: Anyone
 * 
 * IMPORTANT: Make sure your Google Sheet has:
 * - A sheet named exactly: "SKK-Contact-INFO"
 * - 10 columns: A, B, C, D, E, F, G, H, I, J
 */

// Handle preflight OPTIONS request from browser
function doOptions(e) {
  var response = ContentService.createTextOutput();
  response.addHeader('Access-Control-Allow-Origin', '*');
  response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.addHeader('Access-Control-Max-Age', '86400');
  return response;
}

// Main function to handle POST requests
function doPost(e) {
  try {
    // ✅ FIXED: Was "getActiveSpreasheet()" - now "getActiveSpreadsheet()"
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SKK-Contact-INFO");
    
    // Parse incoming data - supports both JSON and form-urlencoded
    var data;
    
    if (e.postData) {
      // Try to parse as JSON first
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // Fallback to form-urlencoded parsing (for no-cors mode)
        var params = new URLSearchParams(e.postData.contents);
        data = {
          name: params.get('name'),
          email: params.get('email'),
          phone: params.get('phone'),
          message: params.get('message'),
          userAgent: params.get('userAgent'),
          referrer: params.get('referrer'),
          source: params.get('source')
        };
      }
    }

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
      throw new Error('Missing required fields: name, email, phone, or message');
    }

    // Prepare data
    var nextRow = sheet.getLastRow() + 1;
    var now = new Date();
    var submissionTime = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    var submissionDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");

    // Write data to sheet columns A through J
    sheet.getRange(nextRow, 1).setValue(nextRow - 1);                    // Column A: Submission ID
    sheet.getRange(nextRow, 2).setValue(submissionTime);                 // Column B: Timestamp (YYYY-MM-DD HH:MM:SS)
    sheet.getRange(nextRow, 3).setValue(data.name);                      // Column C: Name
    sheet.getRange(nextRow, 4).setValue(data.email);                     // Column D: Email
    sheet.getRange(nextRow, 5).setValue(data.phone);                     // Column E: Phone
    sheet.getRange(nextRow, 6).setValue(data.message);                   // Column F: Message
    sheet.getRange(nextRow, 7).setValue(data.userAgent || 'N/A');        // Column G: User Agent
    sheet.getRange(nextRow, 8).setValue(data.referrer || 'Direct');      // Column H: Referrer
    sheet.getRange(nextRow, 9).setValue(data.source || 'Direct');        // Column I: Source (UTM parameter)
    sheet.getRange(nextRow, 10).setValue(submissionDate);                // Column J: Submission Date (YYYY-MM-DD)

    // Log success for debugging
    Logger.log('Form submission successful. Row: ' + nextRow);

    // ✅ FIXED: Added proper CORS headers and JSON response
    var successResponse = {
      result: "success",
      row: nextRow,
      message: "Form submitted successfully",
      timestamp: submissionTime
    };

    var response = ContentService.createTextOutput(JSON.stringify(successResponse));
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;

  } catch (error) {
    // Log error for debugging
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Stack: ' + error.stack);

    // ✅ FIXED: Added proper CORS headers to error response
    var errorResponse = {
      result: "error",
      error: error.toString(),
      message: "Failed to submit form",
      details: error.message
    };

    var response = ContentService.createTextOutput(JSON.stringify(errorResponse));
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }
}

// Debug function - test if script is deployed correctly
function doGet(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();
  var sheetNames = sheets.map(function(sheet) { return sheet.getName(); });

  var debugInfo = {
    status: "Google Apps Script is deployed and running",
    message: "Use POST method to submit form data",
    spreadsheet_name: spreadsheet.getName(),
    available_sheets: sheetNames,
    instructions: "POST form-urlencoded data to this URL with fields: name, email, phone, message"
  };

  var response = ContentService.createTextOutput(JSON.stringify(debugInfo));
  response.setMimeType(ContentService.MimeType.JSON);
  response.addHeader('Access-Control-Allow-Origin', '*');
  return response;
}

/**
 * TROUBLESHOOTING CHECKLIST:
 * 
 * 1. Sheet name error?
 *    - Check your Google Sheet has a tab named exactly: "SKK-Contact-INFO"
 *    - If different, change line with getSheetByName()
 * 
 * 2. Still getting 401 errors?
 *    - Redeploy the script
 *    - New deployment URL needed in React component
 * 
 * 3. Data not appearing?
 *    - Check columns A-J exist in your sheet
 *    - Check form is being submitted (see browser console)
 * 
 * 4. Need to test?
 *    - Copy your deployment URL
 *    - Open it in browser (should show debug info from doGet)
 * 
 * 5. Want to see logs?
 *    - In Apps Script editor, click "Execution log" at bottom
 *    - Shows all Logger.log() messages
 */


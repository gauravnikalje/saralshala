// This handles the "preflight" OPTIONS request from the browser
function doOptions(e) {
  var response = ContentService.createTextOutput();
  response.addHeader('Access-Control-Allow-Origin', '*');
  response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.addHeader('Access-Control-Max-Age', '86400');
  return response;
}

// This handles your POST data
function doPost(e) {
  try {
    // IMPORTANT: Make sure this name matches exactly (fixed typo: Spreasheet -> Spreadsheet)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SKK-Contact-INFO");
    
    // Parse the incoming data
    var data;
    if (e.postData) {
      // Try to parse as JSON first
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, parse as form data
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

    var nextRow = sheet.getLastRow() + 1;
    var now = new Date();
    var submissionDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
    var submissionTime = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    // Map data to your columns (adjust column numbers if your sheet layout is different)
    sheet.getRange(nextRow, 1).setValue(nextRow - 1);                    // Column A: Submission ID
    sheet.getRange(nextRow, 2).setValue(submissionTime);                 // Column B: Timestamp
    sheet.getRange(nextRow, 3).setValue(data.name);                      // Column C: Name
    sheet.getRange(nextRow, 4).setValue(data.email);                     // Column D: Email
    sheet.getRange(nextRow, 5).setValue(data.phone);                     // Column E: Phone
    sheet.getRange(nextRow, 6).setValue(data.message);                   // Column F: Message
    sheet.getRange(nextRow, 7).setValue(data.userAgent || 'N/A');        // Column G: User Agent
    sheet.getRange(nextRow, 8).setValue(data.referrer || 'Direct');      // Column H: Referrer
    sheet.getRange(nextRow, 9).setValue(data.source || 'Direct');        // Column I: Source
    sheet.getRange(nextRow, 10).setValue(submissionDate);                // Column J: Submission Date

    // Return success response
    var successPayload = JSON.stringify({
      result: "success",
      row: nextRow,
      message: "Form submitted successfully"
    });

    var response = ContentService.createTextOutput(successPayload);
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;

  } catch (error) {
    // Log the error for debugging
    Logger.log('Error in doPost: ' + error.toString());

    // Return error response
    var errorPayload = JSON.stringify({
      result: "error",
      error: error.toString(),
      message: "Failed to submit form"
    });

    var response = ContentService.createTextOutput(errorPayload);
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }
}

// Debug function to test if deployment is working
function doGet(e) {
  var response = ContentService.createTextOutput(JSON.stringify({
    status: "Google Apps Script is running",
    message: "Use POST method to submit form data"
  }));
  response.setMimeType(ContentService.MimeType.JSON);
  response.addHeader('Access-Control-Allow-Origin', '*');
  return response;
}


/**
 * FINAL PRODUCTION VERSION 8 - Google Apps Script
 * This version has enhanced error handling and logging
 * 
 * SETUP CHECKLIST:
 * ✓ Google Sheet must have a sheet named: "SKK-Contact-INFO" (EXACT NAME!)
 * ✓ Deploy as: Web app
 * ✓ Execute as: Your Google account email
 * ✓ Who has access: Anyone
 */

// Handle preflight OPTIONS request
function doOptions(e) {
  var response = ContentService.createTextOutput();
  response.addHeader('Access-Control-Allow-Origin', '*');
  response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.addHeader('Access-Control-Max-Age', '86400');
  Logger.log('OPTIONS request received');
  return response;
}

// GET for debugging
function doGet(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = spreadsheet.getSheets();
    var sheetNames = sheets.map(function(sheet) { return sheet.getName(); });

    var response = ContentService.createTextOutput(JSON.stringify({
      status: "Google Apps Script is running (V8)",
      timestamp: new Date().toString(),
      spreadsheet: spreadsheet.getName(),
      sheets: sheetNames,
      expected_sheet: "SKK-Contact-INFO",
      sheet_found: sheetNames.indexOf("SKK-Contact-INFO") !== -1
    }));
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    Logger.log('GET Error: ' + error.toString());
    var response = ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: error.toString()
    }));
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// Main POST handler
function doPost(e) {
  Logger.log('===== POST Request Received =====');
  Logger.log('Timestamp: ' + new Date().toString());
  Logger.log('Content type: ' + e.postData.type);
  
  try {
    // Get spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Spreadsheet name: ' + spreadsheet.getName());
    
    // Get all sheets
    var allSheets = spreadsheet.getSheets();
    var sheetNames = allSheets.map(function(s) { return s.getName(); });
    Logger.log('Available sheets: ' + sheetNames.join(', '));
    
    // Get the correct sheet
    var sheet = spreadsheet.getSheetByName("SKK-Contact-INFO");
    
    if (!sheet) {
      var errorMsg = 'Sheet "SKK-Contact-INFO" not found. Available sheets: ' + sheetNames.join(', ');
      Logger.log('ERROR: ' + errorMsg);
      throw new Error(errorMsg);
    }
    
    Logger.log('Sheet found: SKK-Contact-INFO');

    // Parse data
    var data;
    Logger.log('Raw post data: ' + e.postData.contents.substring(0, 100) + '...');
    
    try {
      // Try JSON first
      data = JSON.parse(e.postData.contents);
      Logger.log('Parsed as JSON');
    } catch (jsonErr) {
      // Try form-urlencoded
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
      Logger.log('Parsed as form-urlencoded');
    }

    Logger.log('Data received - Name: ' + data.name + ', Email: ' + data.email);

    // Validate
    if (!data.name || !data.email || !data.phone || !data.message) {
      throw new Error('Missing fields - Name: ' + data.name + ', Email: ' + data.email + ', Phone: ' + data.phone + ', Message: ' + data.message);
    }

    // Write to sheet
    var nextRow = sheet.getLastRow() + 1;
    var now = new Date();
    var submissionTime = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    var submissionDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");

    Logger.log('Writing to row: ' + nextRow);
    
    sheet.getRange(nextRow, 1).setValue(nextRow - 1);
    sheet.getRange(nextRow, 2).setValue(submissionTime);
    sheet.getRange(nextRow, 3).setValue(data.name);
    sheet.getRange(nextRow, 4).setValue(data.email);
    sheet.getRange(nextRow, 5).setValue(data.phone);
    sheet.getRange(nextRow, 6).setValue(data.message);
    sheet.getRange(nextRow, 7).setValue(data.userAgent || 'N/A');
    sheet.getRange(nextRow, 8).setValue(data.referrer || 'Direct');
    sheet.getRange(nextRow, 9).setValue(data.source || 'Direct');
    sheet.getRange(nextRow, 10).setValue(submissionDate);

    Logger.log('Data written successfully to row ' + nextRow);

    var successResponse = {
      result: "success",
      message: "Form submitted successfully",
      row: nextRow,
      timestamp: submissionTime
    };

    Logger.log('Sending success response');
    var response = ContentService.createTextOutput(JSON.stringify(successResponse));
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;

  } catch (error) {
    Logger.log('===== ERROR =====');
    Logger.log('Error message: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);

    var errorResponse = {
      result: "error",
      error: error.toString(),
      message: "Failed to process form submission"
    };

    Logger.log('Sending error response');
    var response = ContentService.createTextOutput(JSON.stringify(errorResponse));
    response.setMimeType(ContentService.MimeType.JSON);
    response.addHeader('Access-Control-Allow-Origin', '*');
    response.addHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.addHeader('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }
}


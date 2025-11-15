# Google Apps Script & Contact Form Fix Guide

## Issues Fixed

### 1. **Typo in Google Apps Script (Critical)**
**Error**: `getActiveSpreasheet()` 
**Fix**: `getActiveSpreadsheet()`
- Line 9 in your original script had this typo which caused the script to fail

### 2. **Missing Referrer and Source Columns**
**Issue**: The form was sending referrer and source data, but the script wasn't storing them
**Fix**: Added columns 8 and 9 to store:
- Column H: Referrer information
- Column I: Source/UTM data

### 3. **Incomplete CORS Headers**
**Issue**: CORS headers were only in success response, not in error responses or preflight
**Fix**: Added CORS headers to all response types and improved preflight handling

### 4. **Data Parsing Issues**
**Issue**: Only JSON parsing was supported
**Fix**: Added fallback to parse form-urlencoded data (necessary for no-cors mode)

## Step-by-Step Implementation

### Step 1: Update Your Google Sheet
Your sheet needs these 10 columns:
1. Column A: Submission ID
2. Column B: Timestamp
3. Column C: Name
4. Column D: Email
5. Column E: Phone
6. Column F: Message
7. Column G: User Agent
8. Column H: Referrer
9. Column I: Source
10. Column J: Submission Date

### Step 2: Replace Google Apps Script
1. Go to [Google Apps Script Console](https://script.google.com)
2. Open your existing project
3. Replace the entire code with the corrected version from `google-apps-script-corrected.gs`
4. Save and Deploy

### Step 3: Redeploy the Script
1. Click "Deploy"
2. Select "New deployment"
3. Choose type: "Web app"
4. Execute as: Your email
5. Who has access: "Anyone"
6. Copy the new deployment URL
7. **Update this URL in your React component** (line 164 in FloatingContactButton.jsx)

### Step 4: Verify Sheet Name
Make sure your Google Sheet has a sheet named exactly: **"SKK-Contact-INFO"**
- If different, update the script on line 11: `getSheetByName("YOUR_SHEET_NAME")`

## How It Works Now

### Frontend (React)
1. User fills out contact form
2. Form data is collected and sanitized
3. Data is sent as `form-urlencoded` (not JSON)
4. Uses `no-cors` mode to avoid CORS preflight requests
5. Shows success message (assuming submission worked)

### Backend (Google Apps Script)
1. Receives POST request
2. Parses form-urlencoded data
3. Validates required fields
4. Writes data to Google Sheet
5. Returns JSON response (though frontend can't read it in no-cors mode)

## Troubleshooting

### 401 Unauthorized Error
- **Cause**: Script not deployed as "Web app" or "Execute as" user is different
- **Fix**: 
  1. Redeploy with correct settings
  2. Make sure "Who has access" is set to "Anyone"
  3. Use the new deployment URL

### Sheet name not found error
- **Cause**: Sheet name doesn't match exactly
- **Fix**: Check your Google Sheet's exact tab name and update line 11 in the script

### Data not appearing in sheet
- **Cause**: Wrong column numbers or missing columns
- **Fix**: 
  1. Check your sheet has all 10 columns
  2. Verify column headers match expectations
  3. Test with the `doGet` function

### CORS errors still appearing
- **Cause**: Using `cors` mode instead of `no-cors`
- **Fix**: Already fixed in updated React component - uses `no-cors` mode

## Testing

### Test the Google Apps Script directly:
```
1. Copy your Web App URL
2. Open it in browser (should show status message)
3. Try a POST request using curl or Postman:

POST https://script.google.com/macros/s/[YOUR-ID]/exec
Content-Type: application/x-www-form-urlencoded

name=John&email=john@example.com&phone=1234567890&message=Test
```

### Test the React Form:
1. Open browser DevTools
2. Fill out the contact form
3. Check console for logs
4. Check your Google Sheet for new entry

## Summary of Changes

| File | Change | Reason |
|------|--------|--------|
| Google Apps Script | Fixed typo: `Spreasheet` → `Spreadsheet` | Script couldn't run |
| Google Apps Script | Added columns 8-9 for referrer/source | Store tracking data |
| Google Apps Script | Added data validation | Prevent incomplete submissions |
| Google Apps Script | Improved error handling | Better debugging |
| React Component | Using `no-cors` mode | Avoid preflight CORS issues |
| React Component | Form-urlencoded data | Compatible with no-cors mode |
| React Component | No response validation | Can't read responses in no-cors mode |

## What This Fixes

✅ Google Apps Script typo error
✅ CORS 401 Unauthorized errors
✅ Missing referrer/source tracking
✅ Data validation issues
✅ Inconsistent error handling
✅ Form submission reliability


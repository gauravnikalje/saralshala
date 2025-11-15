# Google Apps Script "Sheet Not Found" Error Resolution

## 🔍 **ROOT CAUSE ANALYSIS**

### **Problem**: "Sheet not found: SKK-Contact-INFO"

**Root Cause**: The Google Apps Script is configured to access a Google Sheet named "SKK-Contact-INFO" that doesn't exist in the target spreadsheet.

**Technical Details**:
- Google Apps Script: `var SHEET_NAME = 'SKK-Contact-INFO';`
- Error occurs during form submission via `FloatingContactButton.jsx`
- Script execution reaches Google Sheets API but fails on sheet lookup

---

## 🛠️ **STEP-BY-STEP RESOLUTION**

### **Solution 1: Fix Google Apps Script Sheet Name (RECOMMENDED)**

#### **Step 1: Access Google Apps Script**
1. Go to [script.google.com](https://script.google.com)
2. Open your Google Apps Script project
3. Navigate to the script file (Code.gs)

#### **Step 2: Update Sheet Name Variable**
In your `Code.gs` file, find this line:
```javascript
var SHEET_NAME = 'SKK-Contact-INFO';
```

Replace it with the **actual sheet name** in your spreadsheet:
```javascript
var SHEET_NAME = 'Sheet1'; // Replace with your actual sheet name
```

#### **Step 3: Verify Sheet Exists**
1. Open your Google Sheet
2. Check the exact name of the sheet/tab
3. Update the script with the correct name

#### **Step 4: Redeploy Script**
1. Click **Deploy → Manage deployments**
2. Click **Edit** on existing deployment
3. Click **Version: New** to create a new version
4. Click **Deploy**
5. Copy the new execution URL

#### **Step 5: Update React Frontend (if URL changed)**
If the deployment URL changed, update:
```javascript
// kataria-school-frontend/src/services/contactService.js
const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_NEW_DEPLOYMENT_ID/exec";
```

### **Solution 2: Create Required Sheet**

#### **Step 1: Check Spreadsheet ID**
In your Google Apps Script, find this line:
```javascript
var SPREADSHEET_ID = 'your-spreadsheet-id-here';
```

#### **Step 2: Access the Spreadsheet**
1. Go to [sheets.google.com](https://sheets.google.com)
2. Open the spreadsheet with the ID from Step 1

#### **Step 3: Create Required Sheet**
1. Click **+** to create new sheet/tab
2. Name it exactly: `SKK-Contact-INFO`

#### **Step 4: Update Headers (if needed)**
Ensure the sheet has these column headers in row 1:
```
A1: ID
B1: Timestamp
C1: Name
D1: Email
E1: Phone
F1: Message
G1: UserAgent
H1: Referrer
I1: Source
J1: Date
```

---

## 🔧 **CODE CHANGES NEEDED**

### **Google Apps Script (Code.gs)**
```javascript
// BEFORE (causing error):
var SHEET_NAME = 'SKK-Contact-INFO';

// AFTER (correct):
var SHEET_NAME = 'Sheet1'; // Or your actual sheet name
```

### **React Frontend Error Handling (Optional Enhancement)**
Update `FloatingContactButton.jsx` for better error display:

```javascript
// In handleSubmit or HANDLE_FORM_SUBMIT function
const result = await sendContact(formData);

if (result.ok) {
    // Success handling
    setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
    });
} else {
    // Enhanced error handling
    let errorMessage = 'Something went wrong. Please try again later.';
    
    if (result.response && result.response.error) {
        if (result.response.error.includes('Sheet not found')) {
            errorMessage = 'System configuration issue. Please contact support.';
        } else if (result.response.error.includes('Spreadsheet')) {
            errorMessage = 'Unable to save your message. Please try again.';
        }
    }
    
    setSubmitStatus({
        type: 'error',
        message: errorMessage
    });
    
    console.error('Form submission failed:', result.response);
}
```

---

## ✅ **VERIFICATION METHODS**

### **Test 1: Direct Google Apps Script Test**
```bash
curl -X POST "YOUR_GOOGLE_APPS_SCRIPT_URL" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test+User" \
  -d "email=test@example.com" \
  -d "phone=9999999999" \
  -d "message=test+message"
```

**Expected Response**: 
```json
{"result":"success","row":5,"written":[...]}
```

### **Test 2: Browser Form Test**
1. Open your React app: `http://localhost:5173`
2. Fill out and submit the contact form
3. Check browser console for success message
4. Verify data appears in Google Sheet

### **Test 3: Google Apps Script Logs**
1. Go to Google Apps Script project
2. Click **Executions** tab
3. Check for successful execution logs
4. Verify no error messages

---

## 🛡️ **PREVENTIVE MEASURES**

### **1. Configuration Management**
- Store sheet names in configuration
- Add validation for sheet existence
- Implement fallback sheet names

### **2. Error Handling Improvements**
- Add comprehensive error catching
- Provide user-friendly error messages
- Log detailed errors for debugging

### **3. Testing Procedures**
- Test Google Apps Script URL regularly
- Verify sheet accessibility before deployment
- Set up monitoring for form submissions

### **4. Documentation**
- Document sheet naming conventions
- Maintain deployment checklist
- Keep environment-specific configurations

---

## 🚀 **IMMEDIATE ACTION PLAN**

### **Priority 1: Fix Sheet Name (5 minutes)**
1. Open Google Apps Script
2. Change `SHEET_NAME` from 'SKK-Contact-INFO' to actual sheet name
3. Redeploy and test

### **Priority 2: Verify Deployment (2 minutes)**
1. Test updated URL with curl
2. Check Google Apps Script execution logs
3. Confirm success response

### **Priority 3: Test Frontend Integration (3 minutes)**
1. Submit test form via React app
2. Verify data appears in Google Sheet
3. Check browser console for errors

---

## 📊 **COMPLETE SOLUTION STATUS**

| Component | Status | Action Required |
|-----------|---------|----------------|
| **Google Apps Script** | ❌ | Fix sheet name or create sheet |
| **Spreadsheet Access** | ❓ | Verify spreadsheet ID and permissions |
| **React Integration** | ✅ | Already working correctly |
| **Error Handling** | ✅ | Can be enhanced further |

---

**Resolution Time**: 10-15 minutes  
**Difficulty Level**: Beginner  
**Impact**: Critical - Contact forms will work correctly

---

**Next Steps**: Choose either Solution 1 (update sheet name) or Solution 2 (create required sheet), then redeploy Google Apps Script.
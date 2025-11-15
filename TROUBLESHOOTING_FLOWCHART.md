# Troubleshooting Flowchart - Decision Tree

## Start Here: What Error Are You Seeing?

```
┌─────────────────────────────────────────┐
│  Do you see an error in the console?    │
└─────────────────────────────────────────┘
              ↙           ↓           ↘
        YES (RED)     MAYBE         NO
           ↓          (YELLOW)       ↓
           ↓             ↓      ✅ GOOD!
           ↓             ↓      Form working
        Continue     Continue     perfectly
```

---

## Error Type 1: Red "401 Unauthorized" Error

```
❌ POST https://script.google.com/...
❌ 401 (Unauthorized)
```

### Decision Tree

```
         [401 Error]
              ↓
    ┌─────────────────────────┐
    │ Did you update the URL  │
    │ in React (line 164)?    │
    └─────────────────────────┘
         ↙           ↘
       NO            YES
        ↓             ↓
    → FIX #1      → FIX #2
    Update URL    Check Script
```

### FIX #1: Update React URL
```
1. Copy your Google Apps Script deployment URL
2. Open FloatingContactButton.jsx (line 164)
3. Replace the URL between quotes
4. Save file
5. Refresh browser (Ctrl+R)

❓ Where do I find the URL?
→ Go to Google Apps Script > Click Deploy > 
  Look for Web app URL
```

### FIX #2: Check Google Apps Script
```
1. Go to Google Apps Script editor
2. Look for "getActiveSpreadsheet" (line 11)
   ✅ CORRECT: getActiveSpreadsheet
   ❌ WRONG: getActiveSpreasheet (typo!)
3. If typo found:
   a. Replace all code with GOOGLE_APPS_SCRIPT_READY_TO_DEPLOY.gs
   b. Save (Ctrl+S)
   c. Click Deploy > New Deployment
   d. Copy new URL
   e. Update React (see FIX #1)
4. Test form again
```

---

## Error Type 2: Yellow "CORS Policy" Error

```
❌ Access to fetch at 'https://script.google.com/...'
❌ No 'Access-Control-Allow-Origin' header
```

### Decision Tree

```
    [CORS Error]
        ↓
┌─────────────────────────┐
│ Line 164 has no-cors    │
│ mode set?               │
└─────────────────────────┘
     ↙           ↘
   NO            YES
    ↓             ↓
→ FIX #3      → FIX #4
Update Code   Redeploy
```

### FIX #3: Update React Code (Lines 164-171)
```javascript
// WRONG:
const response = await fetch(url, {
  method: 'POST',
  mode: 'cors',  ← WRONG
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// CORRECT:
const response = await fetch(url, {
  method: 'POST',
  mode: 'no-cors',  ← RIGHT
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(data).toString()
});
```

### FIX #4: Redeploy Google Apps Script
```
1. Go to Google Apps Script editor
2. Click "Deploy" button
3. Select your current deployment
4. Check settings:
   ✅ Type: Web app
   ✅ Execute as: Your email
   ✅ Who has access: Anyone
5. Click "Update"
6. Copy new URL
7. Update React (FIX #1)
8. Hard refresh browser (Ctrl+Shift+R)
```

---

## Error Type 3: ERR_CONNECTION_REFUSED (for Rankers)

```
⚠️ rankersService.js:12 GET http://localhost:5000/api/rankers
⚠️ net::ERR_CONNECTION_REFUSED
```

### Decision Tree

```
    [ERR_CONNECTION_REFUSED]
            ↓
┌─────────────────────┐
│ Is this blocking   │
│ the page?          │
└─────────────────────┘
     ↙           ↘
   NO            YES
    ↓             ↓
✅ OK!        → FIX #5
This is     Update fallback
normal

Yellow warning
shows instead
```

### FIX #5: (Optional - Usually Not Needed)
```
This error is NORMAL if you don't have a backend server.
The app already handles it with fallback data.

If you want to remove the warning:
1. Start a backend server on localhost:5000
2. Or: Ignore it - the app works fine with fallback

NO CODE CHANGES NEEDED - This is expected behavior!
```

---

## Error Type 4: Data Not Appearing in Sheet

```
✅ Form shows success message
❌ But no new row in Google Sheet
```

### Decision Tree

```
    [No Data in Sheet]
          ↓
   ┌─────────┴─────────┐
   ↓                   ↓
Sheet name        Google Apps
wrong?            Script error?
   ↓                   ↓
→ FIX #6           → FIX #7
```

### FIX #6: Check Sheet Name
```
1. Open your Google Sheet
2. Look at the tab at bottom
3. Should be exactly: "SKK-Contact-INFO"
   ✅ Correct capitalization
   ✅ Exact spelling
   ❌ NOT "Contact Info"
   ❌ NOT "contact-info"
   ❌ NOT "Contact_Info"

If different:
   Option A: Rename the sheet to "SKK-Contact-INFO"
   Option B: Update line 11 in Google Apps Script:
   
   getSheetByName("YOUR_ACTUAL_SHEET_NAME")
   
Then redeploy the script
```

### FIX #7: Check Google Apps Script Logs
```
1. Go to Google Apps Script editor
2. Click "Execution log" at bottom
3. Look for errors (red text)
4. Common errors:
   ❌ "Cannot find method getSheetByName"
      → Sheet name wrong (see FIX #6)
   
   ❌ "Permission denied"
      → Sheet not accessible, check sharing
   
   ❌ "TypeError: Cannot read property..."
      → Column mapping wrong, 10 columns needed

5. Fix based on error message
6. Redeploy and test again
```

---

## Error Type 5: Form Fields Not Submitting

```
✅ Can click submit button
❌ Nothing happens
```

### Decision Tree

```
   [Form Won't Submit]
         ↓
┌─────────────────┐
│ Check browser  │
│ console for    │
│ errors (F12)   │
└─────────────────┘
     ↓      ↓      ↓
    401  CORS  Other
     ↓      ↓      ↓
  FIX #1  FIX #3  FIX #8
```

### FIX #8: Check Form Validation
```
Make sure all fields are filled:
✅ Name: Not empty
✅ Email: Contains @
✅ Phone: 10 digits
✅ Message: Not empty

If any empty:
- Fill them and try again
- Validation prevents empty submissions

Still not working?
- Check console (F12) for JavaScript errors
- Look for red text in console
- If found, report the full error message
```

---

## Error Type 6: "Sheet name not found" Error

```
❌ Error: getSheetByName("SKK-Contact-INFO") returned null
```

### Immediate Fix
```
Step 1: Open your Google Sheet
Step 2: Check the sheet tab name (bottom left)
Step 3: Compare with "SKK-Contact-INFO"

If different:
   Option A: Rename sheet in Google Sheet
      → Right-click tab > Rename > Type "SKK-Contact-INFO"
   
   Option B: Update Google Apps Script line 11
      getSheetByName("THE_NAME_YOU_SEE")
      
Then redeploy
```

---

## Quick Reference: Most Common Fixes

| Error | Solution | Time |
|-------|----------|------|
| 401 Unauthorized | Update URL in React + Redeploy | 5 min |
| CORS Policy Error | Use no-cors mode (already fixed) | 1 min |
| Sheet name error | Verify/rename sheet to "SKK-Contact-INFO" | 2 min |
| No data in sheet | Check sheet name and columns A-J exist | 3 min |
| Connection refused | Normal if no backend - ignore | 0 min |
| Form won't submit | Fill all fields and check console | 2 min |

---

## Testing Path: Verify Everything Works

```
START
  ↓
[Open React App]
  ↓
[Click Contact Form Button]
  ↓ YES         ↓ NO → Contact form
Form opens?    doesn't appear
  ↓            (CSS issue - not part of this fix)
  ↓
[Fill all fields]
  Name: Test User
  Email: test@example.com
  Phone: 1234567890
  Message: Testing
  ↓
[Click Submit Button]
  ↓
[Success message?]
  ↓ YES         ↓ NO → See Error
Green success    Type 1, 2, or 5
message appears
  ↓
[Check Google Sheet]
  ↓
[New row?]
  ↓ YES         ↓ NO → See Error
Data appears!    Type 4
Success!
  ↓
✅ ALL WORKING!
```

---

## Emergency: Reset Everything

If you're stuck:

```
1. Delete existing Google Apps Script code
2. Copy-paste from: GOOGLE_APPS_SCRIPT_READY_TO_DEPLOY.gs
3. Save and deploy as NEW deployment
4. Update React URL (line 164)
5. Clear browser cache (Ctrl+Shift+Delete)
6. Hard refresh page (Ctrl+Shift+R)
7. Test form again

This usually solves 90% of issues!
```

---

## Still Not Working?

```
Checklist:
☐ Google Apps Script has "getActiveSpreadsheet" (no typo)
☐ Sheet name is exactly "SKK-Contact-INFO"
☐ Columns A-J exist in sheet
☐ React has correct URL (line 164)
☐ React has "no-cors" mode (line 166)
☐ React has "application/x-www-form-urlencoded" (line 168)
☐ Form has all fields filled (Name, Email, Phone, Message)
☐ No red errors in browser console (F12)
☐ Deployment says "Web app" and "Who has access: Anyone"

If all checked and still broken:
→ Do the "Emergency: Reset Everything" above
```

---

## Need Help?

All errors are documented in:
- `GOOGLE_APPS_SCRIPT_FIX_GUIDE.md` - Detailed guide
- `ERRORS_FIXED_SUMMARY.md` - All errors explained
- `BEFORE_AFTER_COMPARISON.md` - Visual examples
- `IMPLEMENTATION_SUMMARY.md` - Complete overview

Check these files for detailed explanations!


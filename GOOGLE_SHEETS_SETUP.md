# Google Sheets Setup for Lead Capture

This guide will help you set up Google Sheets integration for storing lead data from your Sona Networks chatbot.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Rename it to "Sona Networks Leads" or similar
4. Add the following column headers in row 1:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Company`
   - D1: `Email`
   - E1: `Phone`
   - F1: `Products Interest`
   - G1: `Budget`
   - H1: `Requirements`
   - I1: `Source`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to `Extensions` > `Apps Script`
2. Delete the default code and paste the following:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Parse the POST data
    const data = e.parameter;

    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.company || "",
      data.email || "",
      data.phone || "",
      data.products_interest || "",
      data.budget || "",
      data.requirements || "",
      data.source || "Website Chatbot",
    ];

    // Add the data to the sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the script (Ctrl+S or Cmd+S)
4. Name it "Lead Capture Script"

## Step 3: Deploy the Script

1. Click on `Deploy` > `New deployment`
2. Click the gear icon next to "Type" and select `Web app`
3. Fill in the details:
   - **Description**: "Lead Capture API"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click `Deploy`
5. **Important**: Copy the Web app URL - you'll need this for your environment configuration

## Step 4: Configure Your Environment

1. In your project, create a `.env` file (if you don't have one) or update your existing environment configuration
2. Add the Google Sheets URL:

```bash
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual script ID from the URL you copied in Step 3.

## Step 5: Test the Integration

1. Start your development server
2. Open the chatbot
3. Ask about "pricing" or "quote"
4. Complete the lead capture form
5. Check your Google Sheet to see if the data was saved

## Troubleshooting

### Data Not Appearing in Sheet

- Check that you deployed the script with "Anyone" access
- Verify the URL in your environment configuration
- Check the browser console for any error messages

### Script Execution Errors

- Make sure the script has the correct permissions
- Try re-deploying the script
- Check that the sheet has the correct column headers

### Fallback Behavior

If Google Sheets is not configured or fails, the chatbot will:

- Save leads to localStorage as backup
- Show a fallback message to contact directly
- Continue to function normally

## Data Privacy

- The script only stores the data you explicitly send
- No sensitive information is logged in Apps Script
- Consider adding data retention policies as needed

## Advanced Features (Optional)

### Email Notifications

Add this to your script to get email notifications for new leads:

```javascript
// Add this to the end of the doPost function, before the return statement
MailApp.sendEmail({
  to: "your-email@sona-networks.com",
  subject: "New Lead from Website Chatbot",
  body: `New lead received:\n\nName: ${data.name}\nCompany: ${
    data.company
  }\nContact: ${data.email || data.phone}\nInterested in: ${
    data.products_interest
  }`,
});
```

### Data Validation

Add validation rules to your Google Sheet columns for better data quality.

# ToolbarComment

This library interacts with the Comment Tab in pdf-editor, `currently focusing on stamps`.

## Table of Contents

-   [**Methods**](#methods)
    -   [`ToolbarComment.selectStamp(stampName)`](#toolbarcommentselectstampstampname)
-   [**Example**](#example)

## Methods

### ToolbarComment.selectStamp(stampName)

Selects a stamp by its label. If no stampName is provided, it clicks the stamp button to set the default stamp. If a stampName is provided, it selects the corresponding stamp type.

```javascript
/**
 * Selects a stamp by its label.
 * @param {"Approved Date" | "Received Date" | "Reviewed Date" | "Revised Date" | "Expired"
 *        | "Approved" | "Complete" | "Confidential" | "Draft" | "Final" | "For Comment"
 *        | "For Public Release" | "Information Only" | "Not Approved" | "Not For Public Release"
 *        | "Preliminary Results" | "Revised" | "Void" | "Initial" | "Sign Here" | "Witness"} [stampName]
 */
ToolbarComment.selectStamp(stampName);
```

## Example

```javascript
const { ToolbarComment } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/test.pdf");

// Select the default stamp (clicks the stamp button)
ToolbarComment.selectStamp();

// Select various stamps by their labels
ToolbarComment.selectStamp("Approved Date"); // Select the 'Approved Date' stamp
ToolbarComment.selectStamp("Received Date"); // Select the 'Received Date' stamp
ToolbarComment.selectStamp("Reviewed Date"); // Select the 'Reviewed Date' stamp
ToolbarComment.selectStamp("Revised Date"); // Select the 'Revised Date' stamp
ToolbarComment.selectStamp("Expired"); // Select the 'Expired' stamp
ToolbarComment.selectStamp("Approved"); // Select the 'Approved' stamp
ToolbarComment.selectStamp("Complete"); // Select the 'Complete' stamp
ToolbarComment.selectStamp("Confidential"); // Select the 'Confidential' stamp
ToolbarComment.selectStamp("Draft"); // Select the 'Draft' stamp
ToolbarComment.selectStamp("Final"); // Select the 'Final' stamp
ToolbarComment.selectStamp("For Comment"); // Select the 'For Comment' stamp
ToolbarComment.selectStamp("For Public Release"); // Select the 'For Public Release' stamp
ToolbarComment.selectStamp("Information Only"); // Select the 'Information Only' stamp
ToolbarComment.selectStamp("Not Approved"); // Select the 'Not Approved' stamp
ToolbarComment.selectStamp("Not For Public Release"); // Select the 'Not For Public Release' stamp
ToolbarComment.selectStamp("Preliminary Results"); // Select the 'Preliminary Results' stamp
ToolbarComment.selectStamp("Revised"); // Select the 'Revised' stamp
ToolbarComment.selectStamp("Void"); // Select the 'Void' stamp
ToolbarComment.selectStamp("Initial"); // Select the 'Initial' stamp
ToolbarComment.selectStamp("Sign Here"); // Select the 'Sign Here' stamp
ToolbarComment.selectStamp("Witness"); // Select the 'Witness' stamp

// Close the testing session
Tester.close();
```

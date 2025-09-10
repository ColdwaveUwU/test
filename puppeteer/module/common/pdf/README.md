# Pdf

Pdf is a library that allows you to work with pdf files and can be included in test scripts as follows:

## How to Include

```javascript
const { Pdf } = require("lib");
```

## Test Example

```javascript
// Importing the FileMenu library
const { FileMenu } = require("lib");
// Importing the Pdf library
const { Pdf } = require("lib");
// Creating a test file
Tester.createFile("docx");
// Downloading a Pdf file
FileMenu.downloadAs("pdf");
// Get text from pdf file
Pdf.getText((path.join(downloadDir, "new.pdf"));
// Closing the test file
Tester.close();
```

## Functionality

You can consider the detailed functionality in the [**Pdf Functionality.**](/puppeteer/module/common/pdf/FUNCTIONALITY.md)

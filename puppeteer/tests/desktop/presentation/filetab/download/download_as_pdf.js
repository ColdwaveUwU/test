// Test verifies downloading document in PDF format and validates that the correct format is downloaded
const { FileMenu } = require("lib");

const requestedFormat = "pdf";
const expectedExtension = "pdf";

Tester.createFile("pptx");
Tester.input("PDFDownloadTest");

const downloadResult = FileMenu.downloadAs(requestedFormat);

// Validate extension
if (downloadResult.extension === expectedExtension) {
    console.log(
        `Successfully downloaded file with extension '.${downloadResult.extension}' when requesting '.${requestedFormat}'.`
    );
} else {
    throw new Error(`Expected file extension '.${expectedExtension}', but received '.${downloadResult.extension}'`);
}

Tester.close();

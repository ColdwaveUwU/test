// Test verifies downloading document in PDF/A format and validates that the correct format is downloaded
const { FileMenu } = require("lib");

const requestedFormat = "pdfa";
const expectedExtension = "pdf";

Tester.createFile("pptx");
Tester.input("PDFADownloadTest");

const downloadResult = FileMenu.downloadAs(requestedFormat);

// Validate extension (PDF/A typically returns "pdf" extension)
if (downloadResult.extension === expectedExtension) {
    console.log(
        `Successfully downloaded file with extension '.${downloadResult.extension}' when requesting '.${requestedFormat}'.`
    );
} else {
    throw new Error(`Expected file extension '.${expectedExtension}', but received '.${downloadResult.extension}'`);
}

Tester.close();

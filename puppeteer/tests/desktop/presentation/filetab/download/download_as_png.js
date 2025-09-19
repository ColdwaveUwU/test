// Test verifies downloading document in PNG format and validates that the correct format is downloaded
const { FileMenu } = require("lib");

const requestedFormat = "png";
const expectedExtension = "zip";

Tester.createFile("pptx");
Tester.input("PNGDownloadTest");

const downloadResult = FileMenu.downloadAs(requestedFormat);

// Validate extension (PNG download returns ZIP archive containing images)
if (downloadResult.extension === expectedExtension) {
    console.log(
        `Successfully downloaded file with extension '.${downloadResult.extension}' when requesting '.${requestedFormat}'.`
    );
} else {
    throw new Error(`Expected file extension '.${expectedExtension}', but received '.${downloadResult.extension}'`);
}

Tester.close();

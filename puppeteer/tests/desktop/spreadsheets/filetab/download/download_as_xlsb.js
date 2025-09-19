// Test verifies downloading document in XLSB format and validates that the correct format is downloaded
const { FileMenu } = require("lib");

const requestedFormat = "xlsb";
const expectedExtension = "xlsb";

Tester.createFile("xlsx");
Tester.input("XLSBDownloadTest");

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

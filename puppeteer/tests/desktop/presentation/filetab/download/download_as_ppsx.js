// Test verifies downloading document in PPSX format and validates that the correct format is downloaded
const { FileMenu } = require("lib");

const requestedFormat = "ppsx";
const expectedExtension = "ppsx";

Tester.createFile("pptx");
Tester.input("PPSXDownloadTest");

const downloadResult = FileMenu.downloadAs(requestedFormat);

if (downloadResult.extension === expectedExtension) {
    console.log(
        `Successfully downloaded file with extension '.${downloadResult.extension}' when requesting '.${requestedFormat}'.`
    );
} else {
    throw new Error(`Expected file extension '.${expectedExtension}', but received '.${downloadResult.extension}'`);
}

Tester.close();

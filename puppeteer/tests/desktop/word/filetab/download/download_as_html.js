// Test verifies downloading document in HTML format and validates that the correct format is downloaded
const { FileMenu } = require("lib");

const requestedFormat = "html";
const expectedExtension = "html";

Tester.createFile("docx");
Tester.input("HTMLDownloadTest");

const downloadResult = FileMenu.downloadAs(requestedFormat);

if (downloadResult.extension === expectedExtension) {
    console.log(
        `Successfully downloaded file with extension '.${downloadResult.extension}' when requesting '.${requestedFormat}'.`
    );
} else {
    throw new Error(`Expected file extension '.${expectedExtension}', but received '.${downloadResult.extension}'`);
}

Tester.close();

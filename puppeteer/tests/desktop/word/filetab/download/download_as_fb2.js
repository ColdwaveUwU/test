// Test verifies downloading document in FB2 format and validates that the correct format is downloaded
const { FileMenu } = require("lib");

const requestedFormat = "fb2";
const expectedExtension = "fb2";

Tester.createFile("docx");
Tester.input("FB2DownloadTest");

const downloadResult = FileMenu.downloadAs(requestedFormat);

if (downloadResult.extension === expectedExtension) {
    console.log(
        `Successfully downloaded file with extension '.${downloadResult.extension}' when requesting '.${requestedFormat}'.`
    );
} else {
    throw new Error(`Expected file extension '.${expectedExtension}', but received '.${downloadResult.extension}'`);
}

Tester.close();

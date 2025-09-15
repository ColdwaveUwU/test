// Test: Layout → Page Color → No Fill
// Description: Sets page background to No Fill and verifies in settings XML

const { PageColor, Color, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Apply No Fill (transparent) page color
PageColor.setPageColor({ type: Color.Type.Auto });

FileMenu.downloadAs("docx");

Verification.openFile();
// Verify there is no background element in the main document
Verification.check("word/document.xml", "boolean(//w:background)", false);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

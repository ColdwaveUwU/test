// Test: Insert → Drop Cap → In margin
// Description: Applies Drop Cap "In margin" and verifies framePr with dropCap="margin" in XML

const { DropCap, TestData, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Insert sample text
Tester.input(TestData.LOREM_IPSUM());
Tester.waitAutosave();

// Apply Drop Cap "In margin"
DropCap.setDropCap("In margin");
Tester.waitAutosave();

FileMenu.downloadAs("docx");

Verification.openFile();
// Verify framePr exists and dropCap attribute is "margin"
Verification.check("word/document.xml", "boolean(//*[local-name()='framePr'])", true);
Verification.check("word/document.xml", "//*[local-name()='framePr']/@w:dropCap", "margin");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
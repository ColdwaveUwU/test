// Test: Insert → Drop Cap → In text
// Description: Applies Drop Cap "In text" and verifies framePr with dropCap="drop" in XML

const { DropCap, TestData, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Insert sample text
Tester.input(TestData.LOREM_IPSUM());
Tester.waitAutosave();

// Apply Drop Cap "In text"
DropCap.setDropCap("In text");
Tester.waitAutosave();

FileMenu.downloadAs("docx");

Verification.openFile();
// Verify framePr exists and dropCap attribute is "drop"
Verification.check("word/document.xml", "boolean(//*[local-name()='framePr'])", true);
Verification.check("word/document.xml", "//*[local-name()='framePr']/@w:dropCap", "drop");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();


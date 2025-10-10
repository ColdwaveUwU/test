// Test: Insert → Drop Cap → None
// Description: Applies Drop Cap "In text" then removes it via "None" and verifies no framePr in XML

const { DropCap, TestData, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Insert sample text
Tester.input(TestData.LOREM_IPSUM());
Tester.waitAutosave();

// First apply Drop Cap "In text" to have something to remove
DropCap.setDropCap("In text");
Tester.waitAutosave();

// Remove Drop Cap by selecting "None"
DropCap.setDropCap("None");
Tester.waitAutosave();

FileMenu.downloadAs("docx");

Verification.openFile();
// Verify that framePr (drop cap frame properties) is not present
Verification.check("word/document.xml", "boolean(//*[local-name()='framePr'])", false);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
// Test: Layout → Page Color → Theme/Standard color
// Description: Sets a theme color and verifies presence of w:background

const { PageColor, Color, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Pick a standard color index (e.g., red)
PageColor.setPageColor({ type: Color.Type.Standard, index: 0 });

FileMenu.downloadAs("docx");

Verification.openFile();
// Check that background element exists after applying color
Verification.check("word/document.xml", "boolean(//w:background)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

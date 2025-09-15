// Test: Layout → Page Color → Theme color with shade
// Description: Sets a theme color with subIndex (shade) and verifies background

const { PageColor, Color, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Theme color: index 2, shade 3 (arbitrary valid values)
PageColor.setPageColor({ type: Color.Type.Theme, index: 2, subIndex: 3 });

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:background)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

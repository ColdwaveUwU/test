// Test: Layout → Page Color → More colors (CustomClick)
// Description: Opens More colors, selects color via picker clicks, verifies background exists

const { PageColor, Color, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Click inside picker to choose some color
PageColor.setPageColor({ type: Color.Type.CustomClick, x: 30, y: 10, hue: 40 });

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:background)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

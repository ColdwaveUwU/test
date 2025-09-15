// Test: Layout → Page Color → More colors (HEX)
// Description: Opens More colors, sets HEX, verifies background exists

const { PageColor, Color, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Custom HEX color
PageColor.setPageColor({ type: Color.Type.Custom, hex: "00AAFF" });

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:background)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

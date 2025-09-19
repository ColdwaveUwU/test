// Test: Layout → Colors → New Office theme
// Description: Selects "New Office" theme from Colors and verifies via background after page color set

const { ColorsLayout, PageColor, Color, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Select theme "New Office"
ColorsLayout.setColorTheme("New Office");

// Apply a non-white standard page color to ensure <w:background> appears in XML
PageColor.setPageColor({ type: Color.Type.Standard, index: 5 });

FileMenu.downloadAs("docx");

Verification.openFile();
// 1) Ensure the theme is New Office via clrScheme name in theme1.xml
Verification.check(
    "word/theme/theme1.xml",
    "boolean(contains(//*[local-name()='clrScheme']/@name, 'New Office'))",
    true
);
// 2) Ensure background element exists and color attribute is set (not empty)
Verification.check("word/document.xml", "boolean(//w:background)", true);
Verification.check("word/document.xml", "boolean(string(//w:background/@w:color) != '')", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

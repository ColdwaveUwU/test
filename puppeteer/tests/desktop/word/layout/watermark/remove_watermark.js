// Test: Layout → Watermark → Remove watermark
// Description: Removes an applied watermark and verifies absence in header XML

const { Watermark, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// First add a text watermark to ensure there is something to remove
Watermark.setWatermarkSettings({
    watermarkType: "Text watermark",
    language: "English",
    text: "TEMP",
});

// Use dropdown to select Remove watermark
Watermark.setWatermark("Remove watermark");

FileMenu.downloadAs("docx");

Verification.openFile();
// Ensure watermark text not present in first header after removal
Verification.check("word/header1.xml", "boolean(contains(., 'TEMP'))", false);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

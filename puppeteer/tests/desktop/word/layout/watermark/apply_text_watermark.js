// Test: Layout → Watermark → Custom watermark (text)
// Description: Applies a text watermark via Watermark dialog and verifies its presence in header XML

const { Watermark, FileMenu, Verification } = require("lib");

// Create a new Word document
Tester.createFile("docx");

// Apply text watermark settings
const watermarkSettings = {
    watermarkType: "Text watermark",
    language: "English",
    text: "CONFIDENTIAL",
    font: "Arial",
    fontSize: "72",
    layout: "Diagonal",
};
Watermark.setWatermarkSettings(watermarkSettings);

// Download the document for XML verification
FileMenu.downloadAs("docx");

// Verify watermark text appears in header XML
Verification.openFile();
Verification.check("word/header1.xml", "boolean(contains(., 'CONFIDENTIAL'))", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();

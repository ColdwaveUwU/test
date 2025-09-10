// Include the Watermark library
const { Watermark } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Open Watermark settings window
Watermark.openWatermarkSettingsWindow();

// Specify text watermark settings
const textWatermarkSettings = {
    watermarkType: "Text watermark",
    language: "Italiano",
    text: "ORIGINALE",
    font: "Verdana",
    fontSize: "58",
    fontColor: { type: Color.Type.Standard, index: 5 },
    bold: true,
    italic: true,
    underline: true,
    strikethrough: true,
    semitransparent: false,
    layout: "Horizontal",
};

// Apply text watermark settings
Watermark.applySettings(textWatermarkSettings);

// Click OK button in Watermark settings window
Watermark.clickOkButton();

// Specify image watermark settings
const imageWatermarkSettings = {
    watermarkType: "Image watermark",
    image: { type: "From file", source: "images/png/testFile.png" },
    scale: "200%",
};

// Set image watermark settings
Watermark.setWatermarkSettings(imageWatermarkSettings);

// Close the test example
Tester.close();

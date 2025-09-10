// Include the ParagraphSettings library
const { ParagraphSettings } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");
// Open Advanced settings window
ParagraphSettings.showAdvancedSettings();

// Specify settings for "Indents & spacing" tab
const indentsSettings = {
    alignment: "Right",
    outlineLevel: "Level 3",
    leftIndent: { upArrow: true, arrowClickCount: 4 },
    rightIndent: { value: "0.6" },
    specialIndent: { type: "First line", inputSettings: { value: "1.2" } },
    beforeSpacing: { value: "0.4" },
    afterSpacing: { value: "0.18" },
    lineSpacing: { type: "Exactly", inputSettings: { value: "0.3" } },
    dontAddInterval: true,
    textDirection: "Right-to-left",
};

// Apply settings for "Indents & spacing" tab
ParagraphSettings.applySettings("IndentsSettings", indentsSettings);

// Specify settings for "Line & page breaks" tab
const lineSettings = {
    pageBreakBefore: true,
    orphanControl: false,
    suppressLineNumbers: true,
    keepLinesTogether: true,
    keepWithNext: true,
};

// Apply settings for "Line & page breaks" tab
ParagraphSettings.applySettings("LineSettings", lineSettings);

// Specify settings for "Borders & Fill" tab
const bordersSettings = {
    borderSize: "1.5 pt",
    borderColor: { type: Color.Type.Standard, index: 6 },
    borderType: "Outer",
    backgroundColor: { type: Color.Type.Standard, index: 5 },
};

// Apply settings for "Borders & Fill" tab
ParagraphSettings.applySettings("BordersSettings", bordersSettings);

// Specify settings for "Font" tab
const fontSettings = {
    strikethrough: true,
    doubleStrikethrough: true,
    superscript: true,
    subscript: true,
    smallCaps: true,
    allCaps: true,
    spacing: { value: "0.04" },
    position: { value: "0.03" },
    ligatures: "Contextual and discretionary",
};

// Apply settings for "Font" tab
ParagraphSettings.applySettings("FontSettings", fontSettings);

// Specify default tab
const tabsSettingsDefault = { defaultTab: { value: "0.85" } };

// Apply default tab
ParagraphSettings.applySettings("TabsSettings", tabsSettingsDefault);

// Specify settings for first tab
const specifyTab1 = {
    specifyTab: {
        tabPositionSettings: { value: "0.65" },
        alignmentType: "Right",
        leader: 2,
    },
};

// Add first tab
ParagraphSettings.applySettings("TabsSettings", specifyTab1);

// Specify settings for second tab
const specifyTab2 = {
    specifyTab: {
        tabPositionSettings: { value: "0.75" },
        alignmentType: "Center",
        leader: 3,
    },
};

// Add second tab
ParagraphSettings.applySettings("TabsSettings", specifyTab2);

// Specify settings for third tab
const specifyTab3 = {
    specifyTab: {
        tabPositionSettings: { value: "0.85" },
        alignmentType: "Left",
        leader: 4,
    },
};

// Add third tab
ParagraphSettings.applySettings("TabsSettings", specifyTab3);

// Remove second tab
ParagraphSettings.applySettings("TabsSettings", { removeTab: 2 });

// Remove all tabs
ParagraphSettings.applySettings("TabsSettings", { removeAllTabs: true });

// Specify settings for "Paddings" tab
const paddingsSettings = {
    topPadding: { upArrow: true, arrowClickCount: 3 },
    leftPadding: { value: "0.4" },
    bottomPadding: { value: "0.5" },
    rightPadding: { value: "0.6" },
};

// Apply settings for "Paddings" tab
ParagraphSettings.applySettings("PaddingsSettings", paddingsSettings);

// Click OK button in Advanced settings window
ParagraphSettings.clickOkButton();

// Close the test example
Tester.close();

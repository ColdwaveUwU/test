let editorFonts = null;
Tester.onAscEvent("asc_onInitEditorFonts", (fonts) => {
    console.log("asc_onInitEditorFonts triggered");
    editorFonts = fonts;
});

Tester.createFile("docx");

const fontsList = [
    "Andale Mono",
    "Arial",
    "Arial Black",
    "Asana",
    "Asana Math",
    "Carlito",
    "Comic Sans MS",
    "Courier New",
    "DejaVu Sans",
    "DejaVu Sans Condensed",
    "DejaVu Sans Light",
    "DejaVu Sans Mono",
    "DejaVu Serif",
    "DejaVu Serif Condensed",
    "Georgia",
    "Impact",
    "Liberation Mono",
    "Liberation Sans",
    "Liberation Sans Narrow",
    "Liberation Serif",
    "OpenSymbol",
    "TakaoExGothic",
    "TakaoGothic",
    "TakaoPGothic",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana",
    "Webdings",
];

const editorFontNames = new Set(editorFonts[0].map((font) => font.name));
const missingFonts = fontsList.filter((font) => !editorFontNames.has(font));
if (missingFonts.length > 0) {
    throw new Error(`Missing fonts: ${missingFonts.join(", ")}`);
}
Tester.close();

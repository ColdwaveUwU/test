// Create a new xlsx file for testing
const { SheetPreview } = require("lib");
Tester.createFile("xlsx");
SheetPreview.setPageBreakPreview();
// Set normal view
SheetPreview.setNormalView();
// Set page break preview
Tester.close();

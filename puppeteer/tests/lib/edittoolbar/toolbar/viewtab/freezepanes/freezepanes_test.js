// Create a new xlsx file for testing
const { FreezePanes } = require("lib");

Tester.createFile("xlsx");
// Freeze all panes
FreezePanes.FreezePanes();
// Freeze top row
FreezePanes.FreezeTopRow();
// Freeze first column
FreezePanes.FreezeFirstColumn();
// Show frozen panes shadow
FreezePanes.ShowFrozenPanesShadow(true);
// Hide frozen panes shadow
FreezePanes.ShowFrozenPanesShadow(false);

Tester.close();

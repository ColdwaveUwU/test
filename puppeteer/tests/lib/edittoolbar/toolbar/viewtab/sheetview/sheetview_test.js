// Create a new xlsx file for testing
const { SheetView } = require("lib");
Tester.createFile("xlsx");
// Open view manager
SheetView.viewManager();
// Close view manager
SheetView.closeViewManager();
// Create a new view
SheetView.createView();
// Select default sheet view
SheetView.selectDefault();
// Select the view named 'View1'
SheetView.selectView("View1");
// Duplicate the view
SheetView.duplicateView();
// Select the view named 'View1'
SheetView.selectView("View1");
// Rename the view to 'TestView'
SheetView.renameView("TestView");
// Delete the view named 'TestView'
SheetView.deleteView("TestView");
// Select the default view
SheetView.selectDefault();
Tester.close();

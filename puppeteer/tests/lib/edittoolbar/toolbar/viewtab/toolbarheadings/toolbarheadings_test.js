const { ToolbarHeadings } = require("lib");
// create testfile
Tester.createFile("docx")
// set expand
ToolbarHeadings.setExpand();
// set collapse
ToolbarHeadings.setCollapse();
// set expandLvl
ToolbarHeadings.setExpandLvl("4");
// set font size
ToolbarHeadings.setFontSize("Small");
// set wrap
ToolbarHeadings.setWrap();
// close test file
Tester.close()
const { ToolMenuHeadings, TableOfContents } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add text for Level 1 heading
TableOfContents.addText("Level 1");

// Input test data for Level 1
Tester.input("Heading 1\n");
// Add text for Level 2 heading
TableOfContents.addText("Level 2");
// Input test data for Level 2
Tester.input("Heading 2\n");
// Add text for Level 3 heading
TableOfContents.addText("Level 3");
// Input test data for Level 3
Tester.input("Heading 3\n");

// Open headings menu
ToolMenuHeadings.openMenu();

// Close headings menu
ToolMenuHeadings.closeMenu();
// Test expand all headings
ToolMenuHeadings.setExpand();
// Test collapse all headings
ToolMenuHeadings.setCollapse();
// Test expand to level 2
ToolMenuHeadings.setExpandLvl("2");

// Test setting font size to Small
ToolMenuHeadings.setFontSize("Small");

// Test wrap long headings toggle
ToolMenuHeadings.setWrap();

// Test wrap long headings toggle again (turn off)
ToolMenuHeadings.setWrap();

// Close the test
Tester.close();

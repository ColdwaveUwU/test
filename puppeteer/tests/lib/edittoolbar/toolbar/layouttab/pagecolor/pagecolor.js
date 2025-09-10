// Include the PageColor library
const { PageColor } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select page color
PageColor.setPageColor({ type: Color.Type.Standard, index: 5 });

// Close the test example
Tester.close();

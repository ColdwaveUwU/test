// import PageSize lib
const { PageSize } = require("lib");
// create docx file 
Tester.createFile("docx");
// set b5 page size
PageSize.setSize("B5");
// set custom page size in modal window
PageSize.setCustomSize({ preset: "Custom", width: 20, height: 10 });
// close test
Tester.close();

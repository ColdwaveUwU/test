const { PageHeaderFooter } = require("lib");
// create test file
Tester.createFile("docx");
PageHeaderFooter.editHeader("test Header"); //add header
PageHeaderFooter.editFooter("test Footer"); //add footer
PageHeaderFooter.removeHeader(); // remove header
PageHeaderFooter.removeFooter(); // remove footer
PageHeaderFooter.insertPagesNumber(); // click Insert number of pages
// PageHeaderFooter.insertPageNumber({top: "2"});
// PageHeaderFooter.insertPageNumber({bottom: "2"}); - fix
// PageHeaderFooter.insertPagesNumber();

// close test file
Tester.close();
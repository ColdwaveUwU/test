const { PageBreakInsert } = require("lib");

// create test file
Tester.createFile("docx");

// insert page break
PageBreakInsert.insertPageBreak();

// insert page break with option
// pageBreak: true - add page break
// columnBreak: true - add column break
// section: {nextPage: true, contPage: true, evenPage: true, oddPage: true}
// - add other settings
PageBreakInsert.insertPageBreakWithOptions({
    pageBreak: true,
    columnBreak: true,
    section: { nextPage: true, contPage: true, evenPage: true, oddPage: true },
});

// close test file
Tester.close();

// import status bar lib
const { StatusBar } = require("lib");
// open test file
Tester.openFile("pdf/demo.pdf");
// get page counts
const pagesCount = StatusBar.getCountPages();
console.log(`PagesCount: ${pagesCount}`);
// goto 3 page
StatusBar.goToPage(3);
// get current page number
const currentPageNumber = StatusBar.getCurrentPage();
console.log(`CurrentPageNumber: ${currentPageNumber}`);
if (currentPageNumber !== 3) {
    throw new Error("Incorrect page number");
}
// close test
Tester.close();

const { SmartArt } = require("lib");
// create test file
Tester.createFile("docx");
// add smart art from list art
SmartArt.clickListArt(1);
// add smart piramid art
SmartArt.clickPyramidArt(2);
// add other smart art
SmartArt.clickOtherArt(1);
const smartarts = SmartArt.getSmartArts();
// output first smartart from smartart list
console.log(smartarts[0]);
Tester.close();

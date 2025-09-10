//  background color Dropdown field in PDF-form
const { Dropdown, Color, FileMenu, Verification } = require("lib");
// Open the PDF file for testing
Tester.createFile("pdf");

//Insert dropdown into pdf file
Dropdown.insertDropdown();

// set background color
// Dropdown.setColor({
//     backgroundColor: {
//         type: Color.Type.CustomClick,
//         x: 150,
//         y: 55,
//         hue: 100,
//     },
// });
Dropdown.setColor({
    backgroundColor: {
        type: Color.Type.Custom,
        r: 150,
        g: 55,
        b: 100,
        hex: 0,
    },
});
FileMenu.downloadAs("pdf");
// Getting verification results
Verification.openFile();
// Verification.check("word/document.xml", "//w:shd[1]/@w:color", "2cb8b8");
Verification.check("word/document.xml", "//w:shd[1]/@w:color", "963764");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// close test
Tester.close();

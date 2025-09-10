const { Hyperlink } = require("lib");
// create test file
Tester.createFile("docx");
// add external link with display and screenTip text
Hyperlink.addExternalLink({ link: "https://www.onlyoffice.com/ru/", display: "test", screenTip: "test" });
// add internal link (Beginning of document) with display and screenTip text
Hyperlink.placeInDoc({ display: "test", screenTip: "test" });
// close test file
Tester.close();

// Test of adding a duplicate slide with validation

const { TestData, SlideShowManager, FileMenu, Verification } = require("lib");
Tester.createFile("pptx");

Tester.keyPress("Tab");
Tester.keyPress("Enter");

Tester.input(TestData.ONE_WORD_TEXT());
SlideShowManager.duplicateSlide();

FileMenu.downloadAs("pptx");
Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]", "SimpleTestText");
Verification.check("ppt/slides/slide2.xml", "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]", "SimpleTestText");

console.log(Verification.isSuccess());
Tester.close();

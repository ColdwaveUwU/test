const { SlideView, FileMenu, TestData, Verification } = require("lib");

Tester.createFile("pptx");
Tester.keyPress("Tab");
Tester.keyPress("Enter");
Tester.input("Hello, World!");

SlideView.setSlideMasterView();
SlideView.setNormalView();

Tester.keyPress("Escape");
Tester.keyPress("Tab");
Tester.keyPress("Enter");
Tester.input(TestData.ONE_WORD_TEXT());

FileMenu.downloadAs("pptx");
Verification.openFile();

Verification.check("ppt/slides/slide1.xml", "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]", "Hello, World!");

Verification.check("ppt/slides/slide1.xml", "//p:sp[2]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]", "SimpleTestText");

console.log(Verification.isSuccess());
Tester.close();

//Test to verify the "Change Slide Layout" option on the Home tab.
const { FileMenu, SlideShowManager, Verification } = require("lib");
Tester.createFile("pptx");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Vertical Title and Text");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Title Slide");

SlideShowManager.addSlide("Title and Vertical Text");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Title and Content");

SlideShowManager.addSlide("Picture with Caption");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Section Header");

SlideShowManager.addSlide("Content with Caption");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Two Content");

SlideShowManager.addSlide("Title Only");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Comparison");

SlideShowManager.addSlide("Comparison");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Title Only");

SlideShowManager.addSlide("Two Content");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Blank");

SlideShowManager.addSlide("Section Header");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Content with Caption");

SlideShowManager.addSlide("Title and Content");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Picture with Caption");

SlideShowManager.addSlide("Title Slide");
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Title and Vertical Text");

SlideShowManager.addSlide();
Tester.keyPress("Tab");
Tester.input("Hello World!");
SlideShowManager.changeSlideLayout("Vertical Title and Text");

FileMenu.downloadAs("ppsx");
FileMenu.downloadAs("pdf");
FileMenu.downloadAs("odp");
FileMenu.downloadAs("potx");
FileMenu.downloadAs("otp");
FileMenu.downloadAs("jpg");
FileMenu.downloadAs("png");

FileMenu.downloadAs("pptx");
Verification.openFile();

for (let i = 2; i <= 12; i++) {
    const filePath = `ppt/slides/slide${i}.xml`;
    const xpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]";

    await Verification.check(filePath, xpath, "Hello World!");
}

console.log(Verification.isSuccess());

Tester.close();

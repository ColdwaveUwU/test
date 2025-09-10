//Test to verify the "Add Slide" option on the Home tab
const { FileMenu, SlideShowManager, Verification } = require("lib");
Tester.createFile("pptx");

SlideShowManager.addSlide();

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Title Slide");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Title and Content");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Section Header");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Two Content");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Comparison");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Title Only");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Blank");

SlideShowManager.addSlide("Content with Caption");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Picture with Caption");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Title and Vertical Text");

Tester.keyPress("Tab");
Tester.input("Hello World!");

SlideShowManager.addSlide("Vertical Title and Text");

Tester.keyPress("Tab");
Tester.input("Hello World!");

FileMenu.downloadAs("ppsx");
FileMenu.downloadAs("pdf");
FileMenu.downloadAs("odp");
FileMenu.downloadAs("potx");
FileMenu.downloadAs("otp");
FileMenu.downloadAs("jpg");
FileMenu.downloadAs("png");

FileMenu.downloadAs("pptx");
Verification.openFile();

const slideNumbers = [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13];

async function runChecks() {
    try {
        await slideNumbers.forEach(async (slideNumber) => {
            const filePath = `ppt/slides/slide${slideNumber}.xml`;
            const xpath =
                slideNumber === 13
                    ? "//p:sp[p:nvSpPr/p:cNvPr/@name='Vertical Title 1']/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]"
                    : "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]";

            await Verification.check(filePath, xpath, "Hello World!");
        });

        console.log(await Verification.isSuccess());
    } catch (error) {
        console.error("Test execution failed:", error);
    }
}

await runChecks();

Tester.close();

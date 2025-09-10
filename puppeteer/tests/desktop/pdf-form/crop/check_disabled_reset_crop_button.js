const { Image } = require("lib");
Tester.createFile("pdf");

Image.fromUrl("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");
Image.crop();
const isActive = Tester.checkSelector("#image-button-crop .btn-group.active");
if (!isActive) {
    throw new Error("The 'active' class is missing");
}

Tester.keyPress("Escape");
Tester.clickMouseInsideMain(0, 0);

const isDisabled = Tester.checkSelector("#image-button-reset-crop .disabled");
if (!isDisabled) {
    throw new Error("The 'disabled' class is present");
}

Tester.close();

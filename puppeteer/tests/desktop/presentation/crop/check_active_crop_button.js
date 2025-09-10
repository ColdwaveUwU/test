const { Image } = require("lib");
Tester.createFile("pptx");

Image.fromUrl("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");
Image.crop();
const isActive = Tester.checkSelector("#image-button-crop .btn-group.active");
if (!isActive) {
    throw new Error("The 'active' class is missing");
}

Image.cropRecentlyShape(1);
Image.clickResetCrop();

const isNotActive = Tester.checkSelector("#image-button-crop .btn-group.active");
if (isNotActive) {
    throw new Error("The 'active' class is present");
}

Tester.close();

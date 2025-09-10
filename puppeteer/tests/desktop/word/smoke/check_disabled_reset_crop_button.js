//https://bugzilla.onlyoffice.com/show_bug.cgi?id=71990
const { Image } = require("lib");
Tester.createFile("docx");

Image.fromUrl("https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13");
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

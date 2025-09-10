const { Image } = require("lib");
Tester.createFile("xlsx");
Image.fromUrl("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");

for (let i = 0; i < 10; i++) {
    Image.cropRecentlyShape(i);
}
Image.clickResetCrop();
Image.fill();
Image.clickResetCrop();
Image.fit();
Image.clickResetCrop();

Tester.close();

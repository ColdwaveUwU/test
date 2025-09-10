const { Image } = require("lib");
Tester.createFile("pptx");
Image.fromUrl("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");
Image.cropRecentlyShape(2);
Image.clickResetCrop();
Image.fill();
Image.clickResetCrop();
Image.fit();
Image.clickResetCrop();

Tester.close();

//https://bugzilla.onlyoffice.com/show_bug.cgi?id=71988
const { Image } = require("lib");
Tester.createFile("docx");
Image.fromUrl("https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13");
Image.cropRecentlyShape(1);
Image.clickResetCrop();
Image.fill();
Image.clickResetCrop();
Image.fit();
Image.clickResetCrop();

Tester.close();

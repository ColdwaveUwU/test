const { Image } = require("lib");
Tester.createFile("docx");
Image.fromFile("png/testFile.png");
Image.fromStorage();
Image.fromUrl("https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13");
Tester.close();

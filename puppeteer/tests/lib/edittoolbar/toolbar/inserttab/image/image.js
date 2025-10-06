const { Image } = require("lib");
Tester.createFile("docx");
Image.fromUrl("https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13");
// // get image size
// const imageSize = Image.getImageSize();
// // outputs the size of the image
// console.log(imageSize.width, imageSize.height);
// // click actual size button
// Image.clickActualSize();
// // fit to margin
// Image.fitToMargin();
// // rotate right
// Image.rotateRight();
// // rotate left
// Image.rotateLeft();
// // flip to horizontal image
// Image.fliph();
// // flip to vertical image
// Image.flipv();
// // fill image
// Image.fill();
// // fit image
// Image.fit();
// // crop image
// Image.crop();

// crop with use shape figure
Image.cropRecentlyShape(1);
Image.cropBasicShape(1);
Image.cropFigureShape(1);
Image.cropMathShape(1);
Image.cropChartShape(1);
Image.cropSRShape(1);
Image.cropCalloutShape(1);
Image.cropButtonShape(1);
Image.cropRectangleShape(1);

// // wrap in line image
// Image.wrapInLine();
// // wrap square
// Image.wrapSquare();
// // wrap tight
// Image.wrapTight();
// // wrap through
// Image.wrapThrough();
// // wrap top and bottom
// Image.wrapTnB();
// // wrap in front
// Image.wrapInFront();
// // wrap behind
// Image.wrapBehind();
// // replace from url
// Image.replaceFromUrl("https://klike.net/uploads/posts/2023-02/1675324301_3-44.jpg");
// // replace from file
// Image.replaceFromFile("png/testFile.png");
// // replace from storage
// Image.replaceFromStorage();
// // close test example
Tester.close();

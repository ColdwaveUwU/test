# Image

This library implements interaction with Image in the Insert tab.

## Table of Contents

-   [**InsertImage Methods**](#insertimage-methods)
    -   [Image.fromFile(fileName)](#imagefromfilefilename)
    -   [Image.fromUrl(url)](#imagefromurlurl)
    -   [Image.fromStorage()](#imagefromstorage)
-   [**Basic Image Settings Methods**](#basic-image-settings-methods)
    -   [Image.getImageSize()](#imagegetimagesize)
    -   [Image.clickActualSize()](#imageclickactualsize)
    -   [Image.fitToMargin()](#imagefittomargin)
    -   [Image.rotateRight()](#imagerotateright)
    -   [Image.rotateLeft()](#imagerotateleft)
    -   [Image.fliph()](#imagefliph)
    -   [Image.flipv()](#imageflipv)
    -   [Image.fill()](#imagefill)
    -   [Image.fit()](#imagefit)
    -   [Image.crop()](#imagecrop)
    -   [Image.cropRecentlyShape(id)](#imagecroprecentlyshapeid)
    -   [Image.cropBasicShape(id)](#imagecropbasicshapeid)
    -   [Image.cropFigureShape(id)](#imagecropfigureshapeid)
    -   [Image.cropMathShape(id)](#imagecropmathshapeid)
    -   [Image.cropChartShape(id)](#imagecropchartshapeid)
    -   [Image.cropSRShape(id)](#imagecropsrshapeid)
    -   [Image.cropCalloutShape(id)](#imagecropcalloutshapeid)
    -   [Image.cropButtonShape(id)](#imagecropbuttonshapeid)
    -   [Image.cropRectangleShape(id)](#imagecroprectangleshapeid)
    -   [Image.wrapInLine()](#imagewrapinline)
    -   [Image.wrapSquare()](#imagewrapsquare)
    -   [Image.wrapTight()](#imagewraptight)
    -   [Image.wrapThrough()](#imagewrapthrough)
    -   [Image.wrapTnB()](#imagewraptnb)
    -   [Image.wrapInFront()](#imagewrapinfront)
    -   [Image.wrapBehind()](#imagewrapbehind)
    -   [Image.replaceFromFile(fileName)](#imagereplacefromfilefilename)
    -   [Image.replaceFromUrl(url)](#imagereplacefromurlurl)
    -   [Image.replaceFromStorage()](#imagereplacefromstorage)
-   [**Example**](#example)

## Methods

### InsertImage Methods

#### `Image.fromFile(fileName)`

```javascript
/**
 * Insert Image from file.
 * @param {string} fileName
 */
Image.fromFile(fileName);
```

#### `Image.fromUrl(url)`

```javascript
/**
 * Insert Image from URL.
 * @param {string} url
 */
Image.fromUrl(url);
```

#### `Image.fromStorage()`

```javascript
/**
 * Insert Image from Storage.
 */
Image.fromStorage();
```

## Basic Image Settings Methods

#### `Image.getImageSize()`

```javascript
/**
 * Get the size of the image.
 * @returns {width: number, height: number} (Object) The size of the image.
 */
Image.getImageSize();
```

```javascript
// Usage example
const imageSize = Image.getImageSize();
// outputs the size of the image
console.log(imageSize.width, imageSize.height);
```

#### `Image.clickActualSize()`

```javascript
/**
 * Click the actual size button.
 */
Image.clickActualSize();
```

#### `Image.fitToMargin()`

```javascript
/**
 * Fit the image to the margin.
 */
Image.fitToMargin();
```

#### `Image.rotateRight()`

```javascript
/**
 * Rotate the image to the right.
 */
Image.rotateRight();
```

#### `Image.rotateLeft()`

```javascript
/**
 * Rotate the image to the left.
 */
Image.rotateLeft();
```

#### `Image.fliph()`

```javascript
/**
 * Flip the image horizontally.
 */
Image.fliph();
```

#### `Image.flipv()`

```javascript
/**
 * Flip the image vertically.
 */
Image.flipv();
```

#### `Image.fill()`

```javascript
/**
 * Crop the image to fill.
 */
Image.fill();
```

#### `Image.fit()`

```javascript
/**
 * Fit the image.
 */
Image.fit();
```

#### `Image.crop()`

```javascript
/**
 * Crop the image.
 */
Image.crop();
```

#### `Image.cropRecentlyShape(id)`

```javascript
/**
 * Crop the image to a recently used shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropRecentlyShape(id);
```

#### `Image.cropBasicShape(id)`

```javascript
/**
 * Crop the image to a basic shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropBasicShape(id);
```

#### `Image.cropFigureShape(id)`

```javascript
/**
 * Crop the image to a figure shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropFigureShape(id);
```

#### `Image.cropMathShape(id)`

```javascript
/**
 * Crop the image to a math shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropMathShape(id);
```

#### `Image.cropChartShape(id)`

```javascript
/**
 * Crop the image to a chart shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropChartShape(id);
```

#### `Image.cropSRShape(id)`

```javascript
/**
 * Crop the image to an Stars & ribbons shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropSRShape(id);
```

#### `Image.cropCalloutShape(id)`

```javascript
/**
 * Crop the image to a callout shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropCalloutShape(id);
```

#### `Image.cropButtonShape(id)`

```javascript
/**
 * Crop the image to a button shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropButtonShape(id);
```

#### `Image.cropRectangleShape(id)`

```javascript
/**
 * Crop the image to a rectangle shape.
 * @param {number} id - The ID of the shape.
 */
Image.cropRectangleShape(id);
```

#### `Image.wrapInLine()`

```javascript
/**
 * Set wrapping style to inline.
 */
Image.wrapInLine();
```

#### `Image.wrapSquare()`

```javascript
/**
 * Set wrapping style to square.
 */
Image.wrapSquare();
```

#### `Image.wrapTight()`

```javascript
/**
 * Set wrapping style to tight.
 */
Image.wrapTight();
```

#### `Image.wrapThrough()`

```javascript
/**
 * Set wrapping style to through.
 */
Image.wrapThrough();
```

#### `Image.wrapTnB()`

```javascript
/**
 * Set wrapping style to top and bottom.
 */
Image.wrapTnB();
```

#### `Image.wrapInFront()`

```javascript
/**
 * Set wrapping style to in front.
 */
Image.wrapInFront();
```

#### `Image.wrapBehind()`

```javascript
/**
 * Set wrapping style to behind.
 */
Image.wrapBehind();
```

#### `Image.replaceFromFile(fileName)`

```javascript
/**
 * Replace the image from a file.
 * @param {string} filename - The file name of the image.
 */
Image.replaceFromFile(fileName);
```

#### `Image.replaceFromUrl(url)`

```javascript
/**
 * Replace the image from a URL.
 * @param {string} url - The URL of the image.
 */
Image.replaceFromUrl(url);
```

#### `Image.replaceFromStorage()`

```javascript
/**
 * Replace the image from storage.
 */
Image.replaceFromStorage();
```

## Example

```javascript
const { Image } = require("lib");
Tester.createFile("docx");
Image.fromUrl(
    "https://www.wallpapers13.com/wp-content/uploads/2016/02/Leopard_art_abstract_3d-wallpaper-hd-3840x2400.jpg"
);
// get image size
const imageSize = Image.getImageSize();
// outputs the size of the image
console.log(imageSize.width, imageSize.height);
// click actual size button
Image.clickActualSize();
// fit to margin
Image.fitToMargin();
// rotate right
Image.rotateRight();
// rotate left
Image.rotateLeft();
// flip to horizontal image
Image.fliph();
// flip to vertical image
Image.flipv();
// fill image
Image.fill();
// fit image
Image.fit();
// crop image
Image.crop();
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
// wrap in line image
Image.wrapInLine();
// wrap square
Image.wrapSquare();
// wrap tight
Image.wrapTight();
// wrap through
Image.wrapThrough();
// wrap top and bottom
Image.wrapTnB();
// wrap in front
Image.wrapInFront();
// wrap behind
Image.wrapBehind();
// replace from url
Image.replaceFromUrl(
    "https://www.wallpapers13.com/wp-content/uploads/2016/02/Leopard_art_abstract_3d-wallpaper-hd-3840x2400.jpg"
);
// replace from file
Image.replaceFromFile("test.png");
// replace from storage
Image.replaceFromStorage();
// close test example
Tester.close();
```

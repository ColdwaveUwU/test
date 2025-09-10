# SendBackward

This library implements interaction with the Send Backward menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`SendBackward.sendBackward(sendBackwardType)`](#sendBackwardsendBackwardsendBackwardType)
-   [**Example**](#example)

## Methods

### SendBackward.sendBackward(sendBackwardType)

```javascript
/**
 * Click the default send backward button or select option from menu.
 * @param {"Send to background" | "Send backward"} [sendBackwardType]
 */
SendBackward.sendBackward(sendBackwardType);
```

## Example

```javascript
// Include the SendBackward library
const { SendBackward } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape();

// Click on default Send Backward button
SendBackward.sendBackward();

// Select "Send backward" option from the list
SendBackward.sendBackward("Send backward");

// Close the test example
Tester.close();
```

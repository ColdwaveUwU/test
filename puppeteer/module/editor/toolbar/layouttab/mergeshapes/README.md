# MergeShapes

This library implements interaction with the MergeShapes menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`MergeShapes.setMergeShapes(mergeType)`](#mergeShapessetMergeShapesmergeType)
-   [**Example**](#example)

## Methods

### MergeShapes.setMergeShapes(mergeType)

```javascript
/**
 * Select merge type from dropdown menu
 * @param {"Union" | "Combine" | "Fragment" | "Intersect" | "Subtract"} [mergeType]
 */
MergeShapes.setMergeShapes(mergeType);
```

## Example

```javascript
// Include the MergeShapes library
const { MergeShapes } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set coordinates for the first shape
const firstShapeCoordinates = { startX: -300, startY: -100, endX: -200, endY: 0 };

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape(firstShapeCoordinates);

// Set coordinates for the second shape
const secondShapeCoordinates = { startX: -230, startY: -100, endX: -130, endY: 0 };

// Select basic shape with id 3
Shape.clickBasicShape(3);

// Rendering the selected shape in the editor
Shape.drawShape(secondShapeCoordinates);

// Select both added shapes
Shape.selectShapes(firstShapeCoordinates, secondShapeCoordinates);

// Select "Combine" option from the list
MergeShapes.setMergeShapes("Combine");

// Close the test example
Tester.close();
```

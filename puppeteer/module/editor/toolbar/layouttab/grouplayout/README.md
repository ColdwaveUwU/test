# GroupLayout

This library implements interaction with the Group menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`GroupLayout.setGroup(groupType)`](#groupLayoutsetGroupgroupType)
-   [**Example**](#example)

## Methods

### GroupLayout.setGroup(groupType)

```javascript
/**
 * Select group type from dropdown menu
 * @param {"Group" | "Ungroup"} [groupType]
 */
GroupLayout.setGroup(groupType);
```

## Example

```javascript
// Include the GroupLayout library
const { GroupLayout } = require("lib");

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


Shape.selectShapes(firstShapeCoordinates, secondShapeCoordinates);

// Select "Group" option from the list
GroupLayout.setGroup("Group");

// Close the test example
Tester.close();
```

# Shape

Library for interacting with shapes in the Insert section

## Table of Contents

-   [**How to include**](#how-to-include)
-   [**Test Example**](#test-example)
-   [**Types**](#types)
    -   [ShapeObject](#shapeobject)
    -   [Coordinates](#coordinates)
-   [**Methods**](#methods)
    -   [Shape.openShapeList()](#shapeopenshapelist)
    -   [Shape.getShapesList()](#shapegetshapeslist)
    -   [Shape.clickRecentlyShape(id)](#shapeclickrecentlyshapeid)
    -   [Shape.clickBasicShape(id)](#shapeclickbasicshapeid)
    -   [Shape.clickFiguredShape(id)](#shapeclickfiguredshapeid)
    -   [Shape.clickMathShape(id)](#shapeclickmathshapeid)
    -   [Shape.clickChartShape(id)](#shapeclickchartshapeid)
    -   [Shape.clickSRShape(id)](#shapeclicksrshapeid)
    -   [Shape.clickCalloutShape(id)](#shapeclickcalloutshapeid)
    -   [Shape.clickButtonShape(id)](#shapeclickbuttonshapeid)
    -   [Shape.clickRectangleShape(id)](#shapeclickrectangleshapeid)
    -   [Shape.clickLineShape(id)](#shapeclicklineshapeid)
    -   [Shape.drawShape(coord)](#shapedrawshapecoord)
    -   [Shape.selectShapeByCoordinates(coordinates)](#shapeselectShapeByCoordinatescoordinates)
    -   [Shape.selectShapes(firstShapeCoordinates, secondShapeCoordinates)](#shapeselectshapesfirstshapecoordinates-secondshapecoordinates)

## How to include

```javascript
const { Shape } = require("lib");
```

## Test Example

```javascript
const { Shape } = require("lib");
Tester.createFile("docx");
// recently shape selection with id 2
Shape.clickRecentlyShape(2);
// rendering the selected shape in the editor
Shape.drawShape();
const shapes = Shape.getShapesList();
console.log(shapes[0].description);
Tester.close();
```

## Types

### ShapeObject

```javascript
/**
 * @typedef ShapeObject
 * @property {string} description
 * @property {number} count
 * @property {number} index
 */
```

### Coordinates

```javascript
/**
 * @typedef {Object} Coordinates
 * @property {number} [startX] - def 0
 * @property {number} [startY] - def 0
 * @property {number} [endX] - def 0
 * @property {number} [endY] - def 0
 */
```

## Methods

### `Shape.openShapeList()`

```javascript
/**
 * Open Shape List
 */
Shape.openShapeList();
```

### `Shape.getShapesList()`

```javascript
/**
 * Returns a list of shapes
 * @returns {Array<ShapeObject>}
 */
const shapes = Shape.getShapesList();
// Outputs a Array ShapeObject containing information
// about the shape layouts
console.log(shapes[0].description);
```

This method returns an array of [**ShapeObject**](#shapeobject) objects.

### `Shape.clickRecentlyShape(id)`

```javascript
/**
 * Selects the "Recently used" shape in the section
 * @param {number} id
 */
Shape.clickRecentlyShape(id);
```

### `Shape.clickBasicShape(id)`

```javascript
/**
 * Selects the "Basic shapes" shape in the section
 * @param {number} id
 */
Shape.clickBasicShape(id);
```

### `Shape.clickFiguredShape(id)`

```javascript
/**
 * Selects the "Figured arrows" shape in the section
 * @param {number} id
 */
Shape.clickFiguredShape(id);
```

### `Shape.clickMathShape(id)`

```javascript
/**
 * Selects the "Math" shape in the section
 * @param {number} id
 */
Shape.clickMathShape(id);
```

### `Shape.clickChartShape(id)`

```javascript
/**
 * Selects the "Charts" shape in the section
 * @param {number} id
 */
Shape.clickChartShape(id);
```

### `Shape.clickSRShape(id)`

```javascript
/**
 * Selects the "Stars & ribbons" shape in the section
 * @param {number} id
 */
Shape.clickSRShape(id);
```

### `Shape.clickCalloutShape(id)`

```javascript
/**
 * Selects the "Callouts" shape in the section
 * @param {number} id
 */
Shape.clickCalloutShape(id);
```

### `Shape.clickButtonShape(id)`

```javascript
/**
 * Selects the "Buttons" shape in the section
 * @param {number} id
 */
Shape.clickButtonShape(id);
```

### `Shape.clickRectangleShape(id)`

```javascript
/**
 * Selects the "Rectangles" shape in the section
 * @param {number} id
 */
Shape.clickRectangleShape(id);
```

### `Shape.clickLineShape(id)`

```javascript
/**
 * Selects the "Lines" shape in the section
 * @param {number} id
 */
Shape.clickLineShape(id);
```

### `Shape.drawShape(coord)`

```javascript
/**
 * Draws a shape on the page by coordinates,
 * if coordinates are not specified,
 * the standard size of the shape will be displayed
 * @param {Coordinates} [coord]
 */
Shape.drawShape((coord = {}));
```

This method uses the [**Coordinates**](#coordinates) object as a parameter.

### `Shape.selectShapeByCoordinates(coordinates)`

```javascript
/**
 * Selects a shape on canvas by coordinates
 * @param {Coordinates} coordinates
 */
Shape.selectShapeByCoordinates(coordinates);
```

This method uses the [**Coordinates**](#coordinates) object as a parameter.

### `Shape.selectShapes(firstShapeCoordinates, secondShapeCoordinates)`

```javascript
/**
 * Selects two shapes on canvas by coordinates with pressing Control key
 * @param {Coordinates} firstShapeCoordinates
 * @param {Coordinates} secondShapeCoordinates
 */
Shape.selectShapes(firstShapeCoordinates, secondShapeCoordinates);
```

This method uses the [**Coordinates**](#coordinates) object as a parameter.

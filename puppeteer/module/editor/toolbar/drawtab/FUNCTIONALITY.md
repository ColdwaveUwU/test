# Draw Functionality

Description of the [**Draw**](/puppeteer/module/common/draw/README.md) library methods.

## Functionality

### `clickDraw()`

```javascript
/**
 * Click draw button.
 * @returns {Promise<void>}
 */
async clickDraw()
```

### `clickSelect()`

```javascript
/**
 * Click select button.
 * @return {Promise<void>}
 */
async clickSelect()
```

### `selectBrushSize(elementSelector, size)`

The size can be equal = "0.25 mm", "0.5 mm", "1 mm", "2 mm", "3.5 mm" for pen or "2 mm", "4 mm", "6 mm", "8 mm", "10 mm" for highlighter.

```javascript
/**
 * Set brush size
 * @param {String} elementSelector
 * @param {String} size
 * @return {Promise<void>}
 */
async selectBrushSize(elementSelector, size)
```

### `drawFunction(drawOption, color, size)`

This method use [**Color**](/puppeteer/module/common/color/README.md).

```javascript
/**
 * Method drawing by pen or highlighter.
 * @param {String} drawOption
 * @param {Color} color
 * @param {String} size
 * @return {Promise<void>}
 */
async drawFunction(drawOption, color, size)
```

### `penOne(color, startX, startY, endX, endY, size)`

```javascript
/**
 * Drawing with penOne.
 * @param {Color} color
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @param {Number} size
 * @return {Promise<void>}
 */
async penOne(color, startX, startY, endX, endY, size)
```

### `penTwo(color, startX, startY, endX, endY, size)`

```javascript
/**
 * Drawing with penTwo.
 * @param {Color} color
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @param {Number} size
 * @return {Promise<void>}
*/
async penTwo(color, startX, startY, endX, endY, size)
```

### `highlighter(color, startX, startY, endX, endY, size) `

```javascript
/**
 * Drawing with highlighter.
 * @param {Color} color
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @param {Number} size
 * @return {Promise<void>}
 */
async highlighter(color, startX, startY, endX, endY, size)
```

### `eraser(startX, startY, endX, endY)`

```javascript
/**
 * Use eraser.
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} endX
 * @param {Number} endY
 * @return {Promise<void>}
 */
async eraser(startX, startY, endX, endY)
```

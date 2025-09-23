# Functionality ViewToolbarComment

Description of the [**ViewToolbarComment**](/puppeteer/module/viewtoolbar/viewtoolbarcomment/README.md) library methods.

### `clickComment`

```javascript
/**
 * Clicks the comment tab in the toolbar.
 * @return {Promise<void>}
 */
ViewToolbarComment.clickComment();
```

This function clicks the "Comment" tab in the toolbar.

### `addComment`

```javascript
/**
 * Adds a comment to the document.
 * @param {string | number} text - The text of the comment.
 * @return {Promise<void>}
 */
ViewToolbarComment.addComment(text);
```

This function adds a comment to the document. You can specify the text of the comment as a parameter.

### `penOne`

```javascript
/**
 * Draws with the first type of pen.
 * @param {Color} color - The color to use for drawing.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} endX - The ending X coordinate.
 * @param {number} endY - The ending Y coordinate.
 * @param {number} size - The size of the pen stroke.
 * @return {Promise<void>}
 */
ViewToolbarComment.penOne(color, startX, startY, endX, endY, size);
```

This function draws using the first type of pen. You can specify the color, starting and ending coordinates, and the size of the pen stroke.

### `penTwo`

```javascript
/**
 * Draws with the second type of pen.
 * @param {Color} color - The color to use for drawing.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} endX - The ending X coordinate.
 * @param {number} endY - The ending Y coordinate.
 * @param {number} size - The size of the pen stroke.
 * @return {Promise<void>}
 */
ViewToolbarComment.penTwo(color, startX, startY, endX, endY, size);
```

This function draws using the second type of pen. You can specify the color, starting and ending coordinates, and the size of the pen stroke.

### `highlighter`

```javascript
/**
 * Highlights a portion of the document.
 * @param {Color} color - The color to use for highlighting.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} endX - The ending X coordinate.
 * @param {number} endY - The ending Y coordinate.
 * @param {number} size - The size of the highlighter stroke.
 * @return {Promise<void>}
 */
ViewToolbarComment.highlighter(color, startX, startY, endX, endY, size);
```

This function highlights a portion of the document. You can specify the color, starting and ending coordinates, and the size of the highlighter stroke.

### `eraser`

```javascript
/**
 * Erases a portion of the document.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 * @param {number} endX - The ending X coordinate.
 * @param {number} endY - The ending Y coordinate.
 * @return {Promise<void>}
 */
ViewToolbarComment.eraser(startX, startY, endX, endY);
```

This function erases a portion of the document. You can specify the starting and ending coordinates to erase.

### `clickHighlight`

```javascript
/**
 * Clicks the highlight tool in the toolbar.
 * @param {Color | undefined} color - The color to use for highlighting (optional).
 * @return {Promise<void>}
 */
ViewToolbarComment.clickHighlight(color);
```

This function clicks the "Highlight" tool in the toolbar. You can optionally specify a color for highlighting.

### `clickStrikeout`

```javascript
/**
 * Clicks the strikeout tool in the toolbar.
 * @param {Color | undefined} color - The color to use for strikeout (optional).
 * @return {Promise<void>}
 */
ViewToolbarComment.clickStrikeout(color);
```

This function clicks the "Strikeout" tool in the toolbar. You can optionally specify a color for strikeout.

### `clickUnderline`

```javascript
/**
 * Clicks the underline tool in the toolbar.
 * @param {Color | undefined} color - The color to use for underline (optional).
 * @return {Promise<void>}
 */
ViewToolbarComment.clickUnderline(color);
```

This function clicks the "Underline" tool in the toolbar. You can optionally specify a color for underline.

### `clickShowComments`

```javascript
/**
 * @param {boolean} [checkboxStatus] - default is true
 */
ViewToolbarComment.clickShowComments(checkboxStatus);
```

This function clicks the "Show Comments" option in the toolbar.

### `clickTextComment`

```javascript
/**
 * Click text comment button or select comment type
 * @param {"Insert text comment" | "Insert text callout"} [type]
 */
ViewToolbarComment.clickTextComment(type);
```

This function clicks the "Text Comment" button. If a type is defined, it selects and sets the corresponding text comment.

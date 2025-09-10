# Functionality ViewToolbarHome

Description of the [**ViewToolbarHome**](/puppeteer/module/viewtoolbar/viewtoolbarhome/README.md) library methods.

### `clickHome`

```javascript
/**
 * Clicks the Home tab in the toolbar.
 * @return {Promise<void>}
 */
ViewToolbarHome.clickHome();
```

This function clicks the "Home" tab in the toolbar.

### `setPage`

```javascript
/**
 * Sets the page number in the toolbar.
 * @param {number} number - The page number to set.
 * @return {Promise<void>}
 */
ViewToolbarHome.setPage(number);
```

This function sets the page number in the toolbar. You can specify the page number as a parameter.

### `setFirstPage`

```javascript
/**
 * Sets the toolbar to display the first page of the document.
 * @return {Promise<void>}
 */
ViewToolbarHome.setFirstPage();
```

This function sets the toolbar to display the first page of the document.

### `setLastPage`

```javascript
/**
 * Sets the toolbar to display the last page of the document.
 * @return {Promise<void>}
 */
ViewToolbarHome.setLastPage();
```

This function sets the toolbar to display the last page of the document.

### `setPrevPage`

```javascript
/**
 * Sets the toolbar to display the previous page of the document.
 * @return {Promise<void>}
 */
ViewToolbarHome.setPrevPage();
```

This function sets the toolbar to display the previous page of the document.

### `setNextPage`

```javascript
/**
 * Sets the toolbar to display the next page of the document.
 * @return {Promise<void>}
 */
ViewToolbarHome.setNextPage();
```

This function sets the toolbar to display the next page of the document.

### `clickRotate`

```javascript
/**
 * Clicks the rotate button in the toolbar to rotate the document.
 * @return {Promise<void>}
 */
ViewToolbarHome.clickRotate();
```

This function clicks the rotate button in the toolbar to rotate the document.

### `setZoomByClick`

```javascript
/**
 * Sets the zoom level by clicking a specific size in the toolbar.
 * @param {string} size - The size to set the zoom level to (e.g., "125%").
 * @return {Promise<void>}
 */
ViewToolbarHome.setZoomByClick(size);
```

This function sets the zoom level by clicking a specific size in the toolbar. You can specify the desired zoom size as a parameter.

### `setZoomInput`

```javascript
/**
 * Sets the zoom level using the input field in the toolbar.
 * @param {string} size - The size to set the zoom level to (e.g., "125%").
 * @return {Promise<void>}
 */
ViewToolbarHome.setZoomInput(size);
```

This function sets the zoom level using the input field in the toolbar. You can specify the desired zoom size as a parameter.

### `clickFitPage`

```javascript
/**
 * Clicks the "Fit Page" button in the toolbar to fit the page within the view.
 * @return {Promise<void>}
 */
ViewToolbarHome.clickFitPage();
```

This function clicks the "Fit Page" button in the toolbar to fit the page within the view.

### `clickWidthPage`

```javascript
/**
 * Clicks the "Width Page" button in the toolbar to adjust the view to the width of the page.
 * @return {Promise<void>}
 */
ViewToolbarHome.clickWidthPage();
```

This function clicks the "Width Page" button in the toolbar to adjust the view to the width of the page.

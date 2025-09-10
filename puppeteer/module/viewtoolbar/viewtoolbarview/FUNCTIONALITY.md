# Functionality ViewToolbarView

Description of the [**ViewToolbarView**](/puppeteer/module/viewtoolbar/viewtoolbarview/FUNCTIONALITY.md) library methods.

### `clickView`

```javascript
/**
 * Clicks the View tab in the view toolbar.
 * @return {Promise<void>}
 */
ViewToolbarView.clickView();
```

This function clicks the "View" tab in the view toolbar.

### `clickHeading`

```javascript
/**
 * Clicks the heading button in the view toolbar to navigate headings.
 * @return {Promise<void>}
 */
ViewToolbarView.clickHeading();
```

This function clicks the "Heading" button in the view toolbar to navigate headings within the document.

### `setZoomByClick`

```javascript
/**
 * Sets the zoom level by clicking a specific size in the view toolbar.
 * @param {string} size - The size to set the zoom level to (e.g., "125%").
 * @return {Promise<void>}
 */
ViewToolbarView.setZoomByClick(size);
```

This function sets the zoom level by clicking a specific size in the view toolbar. You can specify the desired zoom size as a parameter.

### `setZoomInput`

```javascript
/**
 * Sets the zoom level using the input field in the view toolbar.
 * @param {string} size - The size to set the zoom level to (e.g., "125%").
 * @return {Promise<void>}
 */
ViewToolbarView.setZoomInput(size);
```

This function sets the zoom level using the input field in the view toolbar. You can specify the desired zoom size as a parameter.

### `clickFitPage`

```javascript
/**
 * Clicks the "Fit Page" button in the view toolbar to fit the page within the view.
 * @return {Promise<void>}
 */
ViewToolbarView.clickFitPage();
```

This function clicks the "Fit Page" button in the view toolbar to fit the page within the view.

### `clickWidthPage`

```javascript
/**
 * Clicks the "Width Page" button in the view toolbar to adjust the view to the width of the page.
 * @return {Promise<void>}
 */
ViewToolbarView.clickWidthPage();
```

This function clicks the "Width Page" button in the view toolbar to adjust the view to the width of the page.

### `setInterfaceTheme`

```javascript
/**
 * Sets the interface theme (e.g., Light, Dark) in the view toolbar.
 * @param {string} theme - The theme to set (e.g., "Light", "Dark").
 * @return {Promise<void>}
 */
ViewToolbarView.setInterfaceTheme(theme);
```

This function sets the interface theme (e.g., Light, Dark) in the view toolbar. You can specify the desired theme as a parameter.

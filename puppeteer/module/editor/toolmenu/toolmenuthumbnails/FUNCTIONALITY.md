# Functionality

Description of the [**ToolMenuThumbnails**](/puppeteer/module/toolmenu/toolmenuthumbnails/README.md) library methods.

### `ToolMenuThumbnails.setThumbnailsOption(options)`

```javascript
/**
 * Sets thumbnails options
 * This method is not supported for the slide editor.
 * @param {{size: number | undefined, highlight: boolean | undefined}} options
 */
ToolMenuThumbnails.setThumbnailsOption((options = { size: 1, highlight: true }));
```

### `ToolMenuThumbnails.clickThumbnailsMenu()`

```javascript
/**
 * Click in thumbnails list area
 */
ToolMenuThumbnails.clickThumbnailsMenu();
```

### ToolMenuThumbnails.goToThumbnail(thumbNumber)

```javascript
/**
 * Go to thumbnail by index
 * @param {number} thumbNumber
 */
ToolMenuThumbnails.goToThumbnail(thumbNumber);
```

### ToolMenuThumbnails.getCurrentThumbnailNumber()

```javascript
/**
 * Get current thumbnail number
 * @returns {number}
 */
ToolMenuThumbnails.getCurrentThumbnailNumber();
```

### ToolMenuThumbnails.getCountThumbnails()

```javascript
/**
 * Get count thumbnails
 * @returns {number}
 */
ToolMenuThumbnails.getCountThumbnails();
```

# Hyperlink

This library interacts with hyperlinks. The library interacts with the elements in the Insert tab.

## Table of Contents

-   [**Objects**](#objects)
    -   [`InternalLink`](#internallink)
    -   [`ExternalLink`](#externallink)
-   [**Methods**](#methods)
    -   [`Hyperlink.clickHyperlink()`](#hyperlinkclickhyperlink)
    -   [`Hyperlink.addExternalLink(linkSetting)`](#hyperlinkaddexternallinklinksetting)
    -   [`Hyperlink.placeInDoc()`](#hyperlinkplaceindoc)
-   [**Example**](#example)

## Objects

### InternalLink

```javascript
/**
 * @typedef {Object} InternalLink
 * @property {string} [linkTo] - The target location within the document.
 * @property {string} [display] - The display text for the hyperlink.
 * @property {string} [screenTip] - The screen tip (tooltip) for the hyperlink.
 */
```

### ExternalLink

```javascript
/**
 * @typedef {Object} ExternalLink
 * @property {string} link - url link
 * @property {string} [display] - display text
 * @property {string} [screenTip] - screenTip text
 */
```

## Methods

### `Hyperlink.clickHyperlink()`

```javascript
/**
 * click hyperlink button
 */
Hyperlink.clickHyperlink();
```

### `Hyperlink.addExternalLink(linkSetting)`

```javascript
/**
 * Adds an external hyperlink
 * @param {ExternalLink} linkSetting
 */
Hyperlink.addExternalLink(linkSetting);
```

### `Hyperlink.placeInDoc(linkSetting)`

```javascript
/**
 * Adds internal hyperlink
 * @param {InternalLink} [linkSetting] - The settings for the internal link.
 */
Hyperlink.placeInDoc(linkSetting);
```

## Example

```javascript
const { Hyperlink } = require("lib");
// create test file
Tester.createFile("docx");
// add external link with display and screenTip text
Hyperlink.addExternalLink({ link: "https://www.onlyoffice.com/ru/", display: "test", screenTip: "test" });
// add internal link (Beginning of document) with display and screenTip text
Hyperlink.placeInDoc({ display: "test", screenTip: "test" });
// close test file
Tester.close();
```

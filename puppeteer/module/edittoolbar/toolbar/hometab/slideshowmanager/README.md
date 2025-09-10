# SlideShowManager

A library for interacting with slideshow manager. Interacts with the elements located on the Home tab od presentation editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`SlideShowManager.addSlide(type);`](#slideshowmanageraddslidetype)
    -   [`SlideShowManager.duplicateSlide();`](#slideshowmanagerduplicateslide)
    -   [`SlideShowManager.changeSlideLayout(type);`](#slideshowmanagerchangeslidelayouttype)
-   [**Example**](#example)

## Methods

### `SlideShowManager.addSlide(type);`

```javascript
/**
 * Click the default Add slide button or select slide type to add from the list.
 * If no type is provided, the default button will be clicked.
 * @param {
 * "Title Slide" |
 * "Title and Content" |
 * "Section Header" |
 * "Two Content" |
 * "Comparison" |
 * "Title Only" |
 * "Blank" |
 * "Content with Caption" |
 * "Picture with Caption" |
 * "Title and Vertical Text" |
 * "Vertical Title and Text" |
 * "Duplicate slide"} [type]
 */
SlideShowManager.addSlide(type);
```

### `SlideShowManager.duplicateSlide();`

```javascript
/**
 * Click on Duplicate slide button
 */
SlideShowManager.duplicateSlide();
```

### `SlideShowManager.changeSlideLayout(type);`

```javascript
/**
 * Select slide layout from list
 * @param {string} type
 */
SlideShowManager.changeSlideLayout(type);
```

## Example

```javascript
// Include the SlideShowManager library
const { SlideShowManager } = require("lib");

// Open the file new.docx
Tester.createFile("pptx");

// Click on Add slide button
SlideShowManager.addSlide();

// Add slide with "Comparison" layout
SlideShowManager.addSlide("Comparison");

// Duplicate slide
SlideShowManager.duplicateSlide();

// Change slide layout to "Title only"
SlideShowManager.changeSlideLayout("Title Only");

// Close the test example
Tester.close();
```

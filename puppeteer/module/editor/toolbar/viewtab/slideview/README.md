# SlideView

Library for interacting with slide view options in the View tab of a presentation editor.

## Table of Contents

-   [**Methods**](#methods)

    -   [`SlideView.setNormalView()`](#slideviewsetnormalview)
    -   [`SlideView.setSlideMasterView()`](#slideviewsetslidemasterview)

-   [**Example**](#example)

## Methods

### SlideView\.setNormalView()

```javascript
/**
 * Set the view to normal
 */
SlideView.setNormalView();
```

### SlideView\.setSlideMasterView()

```javascript
/**
 * Set the view to slide master
 */
SlideView.setSlideMasterView();
```

## Example

```javascript
const SlideView = require("lib");

Tester.createFile("pptx");

// switch to slide master view
SlideView.setSlideMasterView();

// switch back to normal view
SlideView.setNormalView();

Tester.close();
```

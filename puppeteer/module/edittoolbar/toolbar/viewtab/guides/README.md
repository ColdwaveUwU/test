# Guides

Library for interacting with the guides menu in the View tab.

## Table of Contents

-   [**Methods**](#methods)

    -   [`Guides.setGuides(optionValue)`](#guidessetguidesoptionvalue)
    -   [`Guides.ShowGuides(condition)`](#guidesshowguidescondition)
    -   [`Guides.AddVerticalGuide()`](#guidesaddverticalguide)
    -   [`Guides.AddHorizontalGuide()`](#guidesaddhorizontalguide)
    -   [`Guides.SmartGuides(condition)`](#guidessmartguidescondition)
    -   [`Guides.ClearGuides()`](#guidesclearguides)

-   [**Example**](#example)

## Methods

### Guides.setGuides(optionValue)

```javascript
/**
 * Click the default guides button or click the guides button with options.
 * @param {"Show guides" | "Add vertical guide" | "Add horizontal guide" | "Smart guides" | "Clear guides"} optionValue
 */
Guides.setGuides("Smart guides");
```

### Guides.ShowGuides(condition)

```javascript
/**
 * Set the guides to show or hide.
 * @param {boolean} condition
 */
Guides.ShowGuides(true);
```

### Guides.AddVerticalGuide()

```javascript
/**
 * Add vertical guide
 */
Guides.AddVerticalGuide();
```

### Guides.AddHorizontalGuide()

```javascript
/**
 * Add horizontal guide
 */
Guides.AddHorizontalGuide();
```

### Guides.SmartGuides(condition)

```javascript
/**
 * Toggle smart guides
 * @param {boolean} condition
 */
Guides.SmartGuides(false);
```

### Guides.ClearGuides()

```javascript
/**
 * Clear all guides
 */
Guides.ClearGuides();
```

## Example

```javascript
const { Guides } = require("lib");

Tester.createFile("docx");

// show guides if not already visible
Guides.ShowGuides(true);

// add a vertical guide
Guides.AddVerticalGuide();

// add a horizontal guide
Guides.AddHorizontalGuide();

// disable smart guides if enabled
Guides.SmartGuides(false);

// clear all guides
Guides.ClearGuides();

Tester.close();
```

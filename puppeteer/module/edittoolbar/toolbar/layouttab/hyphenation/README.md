# Hyphenation

This library implements interaction with the Hyphenation settings.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Hyphenation.setHyphenation(optionValue)`](#hyphenationsethyphenationoptionvalue)
    -   [`Hyphenation.openHyphenationWindow()`](#hyphenationopenhyphenationwindow)
    -   [`Hyphenation.setAutomaticallyHyphenate(condition)`](#hyphenationsetautomaticallyhyphenatecondition)
    -   [`Hyphenation.setHyphenateWordsInCaps(condition)`](#hyphenationsethyphenatewordsincapscondition)
    -   [`Hyphenation.setHyphenationZone(hyphenationZoneSettings)`](#hyphenationsethyphenationzonehyphenationzonesettings)
    -   [`Hyphenation.setLimitConsecutiveHyphens(limitHyphensSettings)`](#hyphenationsetlimitconsecutivehyphenslimithyphenssettings)
    -   [`Hyphenation.applySettings(hyphenationSettings)`](#hyphenationapplysettingshyphenationsettings)
    -   [`Hyphenation.clickOkButton()`](#Hyphenationclickokbutton)
    -   [`Hyphenation.setHyphenationSettings(hyphenationSettings)`](#hyphenationsethyphenationsettingshyphenationsettings)
-   [**Example**](#example)

## Methods

### Hyphenation.setHyphenation(optionValue)

```javascript
/**
 * Select hyphenation option from dropdown menu
 * @param {"None" | "Automatic" | "Hyphenation options"} [optionValue]
 */
Hyphenation.setHyphenation(optionValue);
```

### Hyphenation.openHyphenationWindow()

```javascript
/**
 * Open Hyphenation window
 */
Hyphenation.openHyphenationWindow();
```

### Hyphenation.setAutomaticallyHyphenate(condition)

```javascript
/**
 * Set "Automatically hyphenate document" checkbox
 * @param {boolean} [condition]
 */
Hyphenation.setAutomaticallyHyphenate(condition);
```

### Hyphenation.setHyphenateWordsInCaps(condition)

```javascript
/**
 * Set "Hyphenate words in CAPS" checkbox
 * @param {boolean} [condition]
 */
Hyphenation.setHyphenateWordsInCaps(condition);
```

### Hyphenation.setHyphenationZone(hyphenationZoneSettings)

```javascript
/**
 * Set hyphenation zone
 * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} hyphenationZoneSettings
 */
Hyphenation.setHyphenationZone(hyphenationZoneSettings);
```

### Hyphenation.setLimitConsecutiveHyphens(limitHyphensSettings)

```javascript
/**
 * Set consecutive hyphens limit
 * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} limitHyphensSettings
 */
Hyphenation.setLimitConsecutiveHyphens(limitHyphensSettings);
```

### Hyphenation.applySettings(hyphenationSettings)

```javascript
/**
 * Apply settings in Hyphenation window
 * @param {Object} hyphenationSettings
 */
Hyphenation.applySettings(hyphenationSettings);
```

### Hyphenation.clickOkButton()

```javascript
/**
 * Click OK button in Hyphenation window
 */
Hyphenation.clickOkButton();
```

### Hyphenation.setHyphenationSettings(hyphenationSettings)

```javascript
/**
 * Open Hyphenation window, apply settings and click OK button
 * @param {Object} hyphenationSettings
 */
Hyphenation.setHyphenationSettings(hyphenationSettings);
```

## Example

```javascript
// Include the Hyphenation library
const { Hyphenation } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select hyphenation "Automatic"
Hyphenation.setHyphenation("Automatic");

// Open "Hyphenation" window
Hyphenation.openHyphenationWindow();

// Specify hyphenation options
const hyphenationOptions = {
    automaticallyHyphenate: false,
    hyphenateWordsInCaps: false,
    hyphenationZone: { value: "0.65" },
    limitConsecutiveHyphens: { value: "3" },
};

// Apply hyphenation options
Hyphenation.applySettings(hyphenationOptions);

// Click OK button in "Hyphenation" window
Hyphenation.clickOkButton();

// Wait for saving previously applied options
Tester.waitAutosave();

// Specify hyphenation options
const hyphenationOptions2 = {
    automaticallyHyphenate: true,
    hyphenationZone: { value: "0.8" },
    limitConsecutiveHyphens: { value: "2" },
};

// Set hyphenation options
Hyphenation.setHyphenationSettings(hyphenationOptions2);

// Close the test example
Tester.close();
```

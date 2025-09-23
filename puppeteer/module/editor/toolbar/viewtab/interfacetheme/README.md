# InterfaceTheme

Library for interacting with the interface theme tab in the view settings.

## Table of Contents

-   [**Methods**](#methods)

    -   [`InterfaceTheme.setInterfaceTheme(optionValue)`](#interfacethemesetinterfacethemeoptionvalue)
    -   [`InterfaceTheme.clickDarkDocument()`](#interfacethemeclickdarkdocument)

-   [**Example**](#example)

## Methods

### InterfaceTheme.setInterfaceTheme(optionValue)

```javascript
/**
 * Set the interface theme
 * @param { "Same as system" | "Light" | "Classic Light" | "Dark" | "Contrast Dark" | "Gray" | "Modern Dark" | "Modern Light" } optionValue
 */
InterfaceTheme.setInterfaceTheme("Dark");
```

### InterfaceTheme.clickDarkDocument()

```javascript
/**
 * Click dark Document only for CDE
 */
InterfaceTheme.clickDarkDocument();
```

## Example

```javascript
const { InterfaceTheme } = require("lib");

Tester.createFile("docx");

// set interface theme to Modern Dark
InterfaceTheme.setInterfaceTheme("Modern Dark");

// click 'Dark Document' button (CDE only)
InterfaceTheme.clickDarkDocument();

Tester.close();
```

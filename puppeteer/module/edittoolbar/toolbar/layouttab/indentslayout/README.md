# IndentsLayout

This library implements interaction with indents and spacing on Layout tab.

## Table of Contents

-   [**Methods**](#methods)
    -   [`IndentsLayout.setLeftIndent(leftIndentSettings)`](#indentslayoutsetleftindentleftindentsettings)
    -   [`IndentsLayout.setRightIndent(rightIndentSettings)`](#indentslayoutsetrightindentrightindentsettings)
    -   [`IndentsLayout.setSpaceBefore(spaceBeforeSettings)`](#indentslayoutsetspacebeforespacebeforesettings)
    -   [`IndentsLayout.setSpaceAfter(spaceAfterSettings)`](#indentslayoutsetspaceafterspaceaftersettings)
-   [**Example**](#example)

## Methods

### IndentsLayout.setLeftIndent(leftIndentSettings)

```javascript
/**
 * Set left indent
 * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [leftIndentSettings]
 */
IndentsLayout.setLeftIndent(leftIndentSettings);
```

### IndentsLayout.setRightIndent(rightIndentSettings)

```javascript
/**
 * Set right indent
 * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [rightIndentSettings]
 */
IndentsLayout.setRightIndent(rightIndentSettings);
```

### IndentsLayout.setSpaceBefore(spaceBeforeSettings)

```javascript
/**
 * Set space before
 * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [spaceBeforeSettings]
 */
IndentsLayout.setSpaceBefore(spaceBeforeSettings);
```

### IndentsLayout.setSpaceAfter(spaceAfterSettings)

```javascript
/**
 * Set space after
 * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [spaceAfterSettings]
 */
IndentsLayout.setSpaceAfter(spaceAfterSettings);
```

## Example

```javascript
// Include the IndentsLayout library
const { IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set left indent
IndentsLayout.setLeftIndent({ value: "1.5" });

// Set right indent
IndentsLayout.setRightIndent({ value: "1" });

// Set space before
IndentsLayout.setSpaceBefore({ value: "0.05" });

// Set space after
IndentsLayout.setSpaceAfter({ value: "0.07" });

// Close the test example
Tester.close();
```

# Number Format

This library implements interaction with the Number format.

## Table of Contents

-   [**Methods**](#methods)
    -   [NumberFormat.setSettings(format, triggerSelector)](#numberformatsetsettingsformat-triggerselector)
-   [**Category Objects**](#category-objects)
    -   [General](#general)
    -   [Number](#number)
    -   [Scientific](#scientific)
    -   [Accounting](#accounting)
    -   [Currency](#currency)
    -   [Date](#date)
    -   [Time](#time)
    -   [Percentage](#percentage)
    -   [Fraction](#fraction)
    -   [Text](#text)
    -   [Custom](#custom)

## Methods

### NumberFormat.setSettings(format, triggerSelector)

Changes the Number Format settings.

-   **format**(object) - object with settings for categories of number formats.
    -   **category**(object) - category object.
    -   **linked**(boolean optional) - sets the **Linked to source** checkbox.
-   **triggerSelector**(string) - selector of the element that calls the number format window.

## Category Objects

The number format includes categories: "General", "Number", "Scientific","Accounting", "Currency", "Date", "Time", "Percentage", "Fraction", "Text", "Custom".

### General

```javascript
const generalCategory = { type: "General" };
```

### Number

```javascript
const numberCategory = {
    type: "Number",
    decimal: 5,
    separator: true,
    formatIndex: 1,
};
```

-   **decimal**(number optional) - sets the **Decimal** parameter.
-   **separator**(boolean optional) - sets the **Use 1000 separator** checkbox.
-   **formatIndex**(number optional) - sets the **Format** parameter.
    -   formatIndex = 0: -1234.12.
    -   formatIndex = 1: <span style="color:red">1234.12</span>.
    -   formatIndex = 2: (1234.12).
    -   formatIndex = 3: <span style="color:red">(1234.12)</span>.

### Scientific

```javascript
const scientificCategory = {
    type: "Scientific",
    decimal: 3,
};
```

-   **decimal**(number optional) - sets the **Decimal** parameter.

### Accounting

```javascript
const accountingCategory = {
    type: "Accounting",
    decimal: 2
    symbols: "$ English (New Zealand)"
    formatIndex: 2
}
```

-   **decimal**(number optional) - sets the **Decimal** parameter.
-   **symbols**(string optional) - sets the **Symbols** parameter.
-   **formatIndex**(number optional) - sets the **Format** parameter.
    -   formatIndex = 0: -1234.12.
    -   formatIndex = 1: <span style="color:red">1234.12</span>.
    -   formatIndex = 2: (1234.12).
    -   formatIndex = 3: <span style="color:red">(1234.12)</span>.

### Currency

```javascript
const currencyCategory = {
    type: "Currency",
    decimal: 2
    symbols: "$ English (New Zealand)"
    formatIndex: 2
}
```

Similar to [**Accounting**](#accounting).

### Date

```javascript
const dateCategory = {
    type: "Date",
    format: "4/15/06",
};
```

-   **format**(string optional) - sets **Format** parameter.

### Time

```javascript
const timeCategory = {
    type: "Time",
    format: "48:57.6",
};
```

Similar to [**Date**](#date).

### Percentage

```javascript
const percentageCategory = {
    type: "Percentage",
    decimal: 5,
};
```

Similar to [**Scientific**](#scientific).

### Fraction

```javascript
const fractionCategory = {
    type: "Fraction",
    format: "Up to two digits (12/25)",
};
```

Similar to [**Date**](#date).

### Text

```javascript
const textCategory = {
    type: "Text",
};
```

### Custom

```javascript
const customCategory = {
    type: "Custom",
    format: "#,##0",
};
```

-   **format**(string optional) - the field entered in the input form **Format**.

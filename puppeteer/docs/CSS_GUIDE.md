# Guide to CSS Selectors

CSS (Cascading Style Sheets) selectors are used to select the HTML elements that you want to style. In this guide, we will focus on three types of selectors: selectors by ID, class, and pseudo-class nth-child.

## Table of Contents

-   [**Selectors by Identifier**](#selectors-by-identifier-id)
-   [**Selectors by Class**](#selectors-by-class)
-   [**Nested Elements and Combined Selectors**](#nested-elements-and-combined-selectors)
-   [**Pseudo-class nth-child**](#pseudo-class-nth-child)
-   [**Attribute Selectors**](#attribute-selectors)

## Selectors by Identifier (ID)

The ID selector is used to select a single unique element on the page. Identifiers must be unique, meaning they must be used only once per page. Selectors by identifier are defined using a hash (`#`) followed by the identifier name.

### Example

HTML:

```html
<div id="header">This is the header</div>
<div id="footer">This is the footer</div>
```

JavaScript:

```javascript
Tester.click("#header"); // Click on the div with ID 'header'
Tester.click("#footer"); // Click on the div with ID 'footer'
```

## Selectors by Class

Class selectors are used to select one or more elements based on a class attribute. Unlike IDs, classes are not unique and can be used on multiple elements. Class selectors are defined using a dot (`.`) followed by the class name.

### Example

HTML:

```html
<div class="box">Box 1</div>
<div class="box small-box">Box 2</div>
```

JavaScript:

```javascript
Tester.click(".box"); // Clicks on the first element with the class 'box'
Tester.click(".box.small-box"); // Clicks on the element with both classes 'box' and 'small-box'
```

If it is not possible to accurately determine the desired class, you may need to calculate the location of the element relative to its neighbors. More details below.

## Nested Elements and Combined Selectors

Sometimes you need to select elements that are inside other elements. To do this, you use nesting selectors such as descendant selectors (separated by a space) and child selectors (separated by `>`).

### Descendant Selectors

Descendant selectors allow you to select all elements that are descendants of a specific parent element. This type of selector is defined using a space between the element names.

#### Example

HTML:

```html
<div class="container">
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
    <div class="sub-container">
        <p>Paragraph 3</p>
    </div>
</div>
```

JavaScript:

```javascript
Tester.click(".container .sub-container"); // Selects the <div class="sub-container"> element relative to .container
```

### Child Element Selectors

Child element selectors allow you to select elements that are direct children of a specific parent element. This type of selector is defined using the > character between the element names.

#### Example

HTML:

```html
<div class="wrapper">
    <p>Paragraph 1</p>
    <div class="inner-wrapper">
        <p>Paragraph 2</p>
    </div>
</div>
```

JavaScript:

```javascript
Tester.click(".wrapper > p"); // Selects <p>Paragraph 1</p> because it is a direct child of .wrapper
```

## Pseudo-class nth-child

The pseudo-class nth-child is used to select elements based on their position within their parent element.

### Syntax

```css
element:nth-child(n) {
    /* CSS properties */
}
```

Here, n can be a number, a keyword, or a formula. Common values include:

-   2 (selects the second element)
-   odd (selects elements with odd indices)
-   even (selects elements with even indices)
-   2n (selects every second element)
-   2n+1 (selects every odd element starting from the first)

### Example

HTML:

```html
<ul>
    <li>Element 1</li>
    <li>Element 2</li>
    <li>Element 3</li>
    <li>Element 4</li>
</ul>
```

JavaScript:

```javascript
Tester.click("ul li:nth-child(2)"); // Clicks on the 2nd <li> element
Tester.click("ul li:nth-child(3)"); // Clicks on the 3rd <li> element
```

## Attribute Selectors

Attribute selectors allow you to select elements based on the presence or value of certain attributes.

### 1. Simple Attribute Selector

This selector selects all elements that have the specified attribute, regardless of its value.

#### Example

HTML:

```html
<li class="ribtab canedit active">
    <a data-title="Home">Home</a>
    <a data-title="Insert">Insert</a>
</li>
```

JavaScript:

```javascript
Tester.click('li a[data-title="Home"]'); // Clicks on the <a> element with the attribute data-title="Home"
Tester.click('li a[data-title="Insert"]'); // Clicks on the <a> element with the attribute data-title="Insert"
```

### 2. Attribute Selector with Exact Value

This selector selects elements for which the attribute has a specific value.

#### Example

HTML:

```html
<input type="text" value="Text 1" /> <input type="text" value="Text 2" />
```

JavaScript:

```javascript
Tester.click("input[value='Text 2']"); // Clicks on the <input> element with the value attribute equal to 'Text 2'
```

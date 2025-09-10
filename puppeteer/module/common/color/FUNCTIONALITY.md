# Color Functionality

Description of the [**Color**](/puppeteer/module/common/color/README.md) library methods.

## Functionality

### `selectColor(selector, color)`

```javascript
/**
* Selects a color based on the provided color settings.
* @param {string} selector - The CSS selector to locate the color picker element.
* @param {BaseColorProp | ThemeColorProp | EyeDropperColorProp | CustomColorProp | CustomClickColorProp} color - The color properties used to select the color.
*/
async selectColor(selector, color)
```

#### Proporties

```javascript
/**
 * @typedef {Object} BaseColorProp
 * @property {number} type - The type of color setting
 * @property {number} [index] - The color index
 */

/**
 * @typedef {BaseColorProp} ThemeColorProp
 * @property {number} subIndex - The color sub-index (shade)
 */

/**
 * @typedef {BaseColorProp} EyeDropperColorProp
 * @property {number} x - The X coordinate of the color, used for advanced color settings
 * @property {number} y - The Y coordinate of the color, used for advanced color settings
 */

/**
 * @typedef {BaseColorProp} CustomColorProp
 * @property {number} [hex] - The hexadecimal color value
 * @property {number} [r] - The red component of the color
 * @property {number} [g] - The green component of the color
 * @property {number} [b] - The blue component of the color
 */

/**
 * @typedef {EyeDropperColorProp} CustomClickColorProp
 * @property {number} hue - The hue adjustment coordinate, used in a vertical column
 */
```

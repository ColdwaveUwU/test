# AlternativeTextSettings

A library for interacting with alternative text settings in the right menu panel (advanced chart settings). This module provides methods to set and apply alternative text title and description.

## Table of Contents

-   [**Methods**](#methods)
    -   [`AlternativeTextSettings.setAltText(settings)`](#alternativetextsettingssetalttextsettings)
    -   [`AlternativeTextSettings.applySettings(settings)`](#alternativetextsettingsapplysettingssettings)

## Methods

### `AlternativeTextSettings.setAltText(settings)`

```javascript
/**
 * Sets the alternative text for the chart (advanced).
 * @param {Object} settings - Alt text settings
 * @property {string} [title] - Alternative text title
 * @property {string} [description] - Alternative description
 */
AlternativeTextSettings.setAltText({ title, description });
```

### `AlternativeTextSettings.applySettings(settings)`

```javascript
/**
 * Applies the alternative text settings
 * @param {{title: string, description: string}} settings - The settings to apply.
 */
AlternativeTextSettings.applySettings({ title, description });
```

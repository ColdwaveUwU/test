# PluginManager

This library implements interaction with the PluginManager settings window.

## Table of Contents

-   [**Methods**](#methods)
    -   [`PluginManager.openPluginManager()`](#pluginmanageropenpluginmanager)
    -   [`PluginManager.searchPlugin(name)`](#pluginmanagersearchpluginname)
    -   [`PluginManager.clickInstallButton()`](#pluginmanagerclickinstallbutton)
    -   [`PluginManager.closePluginManager()`](#pluginmanagerclosepluginmanager)
    -   [`PluginManager.installPlugin(name)`](#pluginmanagerinstallpluginname)
-   [**Examples**](#examples)

## Methods

### PluginManager.openPluginManager()

```javascript
/**
 * Opens the plugin manager
 */
PluginManager.openPluginManager();
```

### PluginManager.searchPlugin(name)

```javascript
/**
 * Searches for a plugin by name
 * @param name Plugin name
 */
PluginManager.searchPlugin(name);
```

### PluginManager.clickInstallButton()

```javascript
/**
 * Clicks the Install button
 */
PluginManager.clickInstallButton();
```

### PluginManager.closePluginManager()

```javascript
/**
 * Closes the plugin manager
 */
PluginManager.closePluginManager();
```

### PluginManager.installPlugin(name)

```javascript
/**
 * Installs a plugin
 * @param name Plugin name
 */
PluginManager.installPlugin(name);
```

## Examples

```javascript
// Include the PluginManager library
const { PluginManager } = require("lib");

// Create a new DOCX file
Tester.createFile("docx");

// Open the plugin manager
PluginManager.openPluginManager();  

// Search for the plugin
PluginManager.searchPlugin("YouTube");

// Click the Install button
PluginManager.clickInstallButton();

// Close the plugin manager
PluginManager.closePluginManager();

// Install Highlight code plugin
PluginManager.installPlugin("Highlight code");

// Close the test example
Tester.close();
```

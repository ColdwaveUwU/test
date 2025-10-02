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

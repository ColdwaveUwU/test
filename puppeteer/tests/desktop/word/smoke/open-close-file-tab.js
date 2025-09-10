const { ViewToolbarFile } = require("lib");
Tester.createFile("docx");

ViewToolbarFile.clickFile();
if (!ViewToolbarFile.isActive())
    throw new Error(`Error with open File Tab.`);

ViewToolbarFile.clickCloseMenu();
if (ViewToolbarFile.isActive())
    throw new Error(`Error with close File Tab.`);

Tester.close();

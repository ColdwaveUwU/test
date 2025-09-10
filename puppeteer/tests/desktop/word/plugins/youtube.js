const { YoutubePlugin } = require("lib");
Tester.createFile("docx");
YoutubePlugin.addVideo("https://www.youtube.com/watch?v=0XtCoeTWIO8");
Tester.waitAutosave();
Tester.close();

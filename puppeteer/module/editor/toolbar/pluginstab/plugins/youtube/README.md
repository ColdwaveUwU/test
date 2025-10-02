# YoutubePlugin

This library allows you to add videos using the Youtube plugin.

## How to Include

```javascript
const { YoutubePlugin } = require("lib");
```

## Functions

### `addVideo(url)`

```javascript
/**
 * Adds Youtube videos to the editor
 * @param {string} url - video url.
 */
YoutubePlugin.addVideo(url);
```

## Example Usage

```javascript
// Include the YoutubePlugin library
const { YoutubePlugin } = require("lib");
// Creating a Document File
Tester.createFile("docx");
// Adding YouTube videos
YoutubePlugin.addVideo("https://www.youtube.com/watch?v=0XtCoeTWIO8");
// Waiting for file auto-save
Tester.waitAutosave();
// Close the document
Tester.close();
```

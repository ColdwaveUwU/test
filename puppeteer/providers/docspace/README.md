# DocSpace Provider

**DocSpace Provider** is an addon provider for connecting to the DocSpace editor.

## How to Include

To use DocSpace-Provider, add the following entry to your `config.json`:

```json
"provider": "docspace.js"
```

## Example Configuration

The following is an example of configuration using **config_chrome_win.json**.

### config_chrome_win.json

```json
{
    "testOptions": {
        "url": "https://kim.teamlab.info/example",
        "urlParam": "action={\"debug\":true}",
        "debugMode": true,
        "messageType": ["error", "log"],
        "cacheEnabled": true
    },
    "puppeteerOptions": {
        "browser": "chrome",
        "headless": false,
        "puppeteerDelay": 0,
        "userDelay": 0,
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe"
    },
    "reportOptions": {
        "ignoreBrowserErrors": ["Failed to load resource: the server responded with a status of 404 ()"],
        "ignoreExternalScriptsErrors": ["Checking file for encryption is not supported on Windows"]
    },
    "provider": "docspace.js"
}
```

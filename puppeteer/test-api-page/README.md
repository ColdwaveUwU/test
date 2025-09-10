# Installation

First, install the required dependencies:

```bash
npm install
```

# Usage

You can start the script in two ways:

## 1. Using `config.json`

If the `config.json` file contains a `startUrl`, simply run:

```bash
node run.js
```

## 2. Providing the Start URL as an Argument

If you want to specify the start URL dynamically, pass it as an argument:

```bash
node run.js https://api.onlyoffice.com/
```

# Configuration

Modify the `config.json` file to adjust script behavior:

```json
{
    {
    "startUrl": "https://api.onlyoffice.com/",
    "pageCount": 3,
    "domainFilter": [
        "analytics.google.com",
        "www.google-analytics.com",
        "www.youtube.com",
        "git.onlyoffice.com"
    ],
    "puppeteerLaunchOptions": {
        "headless": false,
        "args": [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-features=site-per-process"
        ],
        "lifeCycleEvent": "domcontentloaded",
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe"
    }
}
}
```

-   `startUrl`: The starting point of the script
-   `pageCount`: Maximum number of concurrent pages
-   `puppeteerLaunchOptions`: Options for Puppeteer launch
    -   `headless`: Puppeteer headless mode (true or 'shell')
    -   `args`: Additional command line arguments to pass to the browser instance.
    -   `lifeCycleEvent`: The event that the page will wait for during loading. ('load', 'domcontentloaded', 'networkidle0', 'networkidle2').
    -   `executablePath`: Path to browser.
-   `domainFilter`: List of domains to ignore

> [!TIP] 
> For MacOS set `"executablePath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`

# Logs

## Create json log file

To create the formatting of the txt report into JSON, use it after running the program.

```javascript
node .\formatLogs.js
```

## Report files

-   **logs.txt** or **logs.json**: Stores general network activity logs.
-   **error.txt** or **error.json**: Stores errors and failed requests.

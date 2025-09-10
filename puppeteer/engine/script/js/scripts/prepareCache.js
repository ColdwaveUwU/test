const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const cacheDir = path.join(__dirname, "..", "..", "browser", "cache");

/**
 * Configuration object for the cache downloader.
 * For information about each parameter, see [README](../../../README.md ).
 * @typedef {Object} Config
 * @property {Object} testOptions
 * @property {string} testOptions.url
 * @property {string} [testOptions.urlParam]
 * @property {boolean} [testOptions.debugMode=false]
 * @property {string[]} [testOptions.messageType=[]]
 * @property {boolean} [testOptions.cacheEnabled=true]
 * @property {Object} puppeteerOptions
 * @property {string} puppeteerOptions.browser
 * @property {boolean} [puppeteerOptions.headless=true]
 * @property {number} [puppeteerOptions.puppeteerDelay=0]
 * @property {number} [puppeteerOptions.userDelay=0]
 * @property {string} [puppeteerOptions.executablePath]
 * @property {Object} reportOptions
 * @property {string[]} [reportOptions.ignoreBrowserErrors=[]]
 * @property {string[]} [reportOptions.ignoreExternalScriptsErrors=[]]
 */

/**
 * Class representing a Cache Downloader.
 */
class CacheDownloader {
    /**
     * Create a CacheDownloader.
     * @param {Config} config - The configuration object.
     * @param {number} browserCount - The number of browsers to launch.
     */
    constructor(config, browserCount) {
        this.config = config;
        this.browserCount = browserCount;
        this.browsers = [];
    }

    /**
     * Loads the cache by launching browsers, navigating to URLs, and closing pages.
     */
    async loadCache() {
        const browserCount = this.browserCount;
        this.browsers = await this.launchBrowsers(browserCount);
        console.log("Loading pages and navigating...");
        await Promise.all(this.browsers.map((browser) => this.createTargetPages(browser)));
    }

    /**
     * Launches a specified number of browsers.
     * @param {number} browserCount - The number of browsers to launch.
     * @returns {Promise<puppeteer.Browser[]>}
     */
    async launchBrowsers(browserCount) {
        return Promise.all(
            Array.from({ length: browserCount }, async (_, index) => {
                const browserCacheDir = path.join(cacheDir, `cache${index}`);
                const browser = await puppeteer.launch({
                    headless: "new",
                    args: ["--disable-infobars", `--disk-cache-dir=${browserCacheDir}`],
                });
                return browser;
            })
        );
    }

    /**
     * Opening pages and navigating to URLs.
     * @param {puppeteer.Browser} browser - The browser to process.
     * @returns {Promise<puppeteer.Page>}
     */
    async createTargetPages(browser) {
        const hrefs = ["docx", "pdf", "xlsx", "pptx"].map(
            (ext) => `${this.config.testOptions.url}/editor?fileExt=${ext}`
        );
        await Promise.all(hrefs.map((href) => this.processHref(browser, href)));
    }

    /**
     * Opening a new page, navigating to the URL, and handling console messages.
     * @param {puppeteer.Browser} browser - The browser to open the new page in.
     * @param {string} href - The href to navigate to.
     * @param {Function} fixedEncodeURI - A function to encode URLs.
     * @returns {Promise<void>}
     */
    async processHref(browser, href) {
        const fixedEncodeURI = (str) => encodeURI(str).replace(/%7B/g, "{").replace(/%7D/g, "}").replaceAll("%22", '"');
        const newPage = await browser.newPage();
        newPage.setDefaultTimeout(0);
        await newPage.goto(href, { waitUntil: "domcontentloaded" });
        const pageUrl = newPage.url() + "&" + fixedEncodeURI('action={"debug":true}');
        await newPage.goto(pageUrl, { waitUntil: "domcontentloaded" });
        await new Promise((resolve) => {
            const consoleLogHandler = (message) => {
                if (message.text().includes("[speed]: onDocumentContentReady")) {
                    newPage.off("console", consoleLogHandler);
                    resolve();
                }
            };
            newPage.on("console", consoleLogHandler);
        });
        await newPage.close();
    }

    /**
     * Closes all open pages and browsers.
     */
    async close() {
        await Promise.all(
            this.browsers.map(async (browser) => {
                await browser.close();
            })
        );
    }
}

const configPath = process.argv[2];

/**
 * Reads the config file, initializes CacheDownloader, loads cache, and closes CacheDownloader.
 * @param {string} configPath - The path to the config file.
 */
fs.readFile(configPath, "utf8", async (err, data) => {
    if (err) {
        console.error(`Error reading config file: ${err}`);
        return;
    }
    try {
        /**
         * @type {Config}
         */
        const config = JSON.parse(data);
        const browserCount = process.argv[3];
        console.log("Loading cache...");
        const downloader = new CacheDownloader(config, browserCount);
        await downloader.loadCache();
        console.log("Cache loading completed.");
        await downloader.close();
    } catch (error) {
        console.error(`Error when parsing JSON or initializing CacheDownloader: ${error}`);
    }
});

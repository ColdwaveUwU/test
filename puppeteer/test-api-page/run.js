const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, "config.json"), "utf-8"));
const args = process.argv.slice(2);
const startUrl = args[0] || config.startUrl;
const visitedUrls = new Set();
const PAGE_COUNT = config.pageCount || 5;
const LIFE_CYCLE_EVENT = config.puppeteerLaunchOptions.lifeCycleEvent || "networkidle0";
const logFilePath = path.resolve(__dirname, "logs.txt");
const errorLogFilePath = path.resolve(__dirname, "error.txt");

/**
 * Strips the fragment (hash) from a given URL.
 * @param {string} url - The URL to be stripped of the fragment.
 * @returns {string} - The URL without the fragment.
 */
const getNoFragUrl = (url) => {
    const hrefUrl = new URL(url);
    return hrefUrl.href.split("#")[0];
};

/**
 * Creates a write stream for logging.
 * @param {string} filePath - Path to the log file.
 * @returns {fs.WriteStream} - A writable stream.
 */
const createLogStream = (filePath) => {
    return fs.createWriteStream(filePath, { flags: "a" });
};

/**
 * Updates logs with a new entry for a specific URL.
 * @param {string} url - The URL to log.
 * @param {Object} newLog - The log entry object containing log data.
 */
const updateLogsForUrl = (url, newLog) => {
    const logEntry = {
        url: url,
        data: newLog,
    };

    const outputStream =
        newLog.type === "requestfailed" || newLog.type === "error" || newLog?.status === 404
            ? createLogStream(errorLogFilePath)
            : createLogStream(logFilePath);

    outputStream.write(`${JSON.stringify(logEntry)}\n`);
    outputStream.end();
};

(async () => {
    fs.writeFileSync(logFilePath, "", "utf8");
    fs.writeFileSync(errorLogFilePath, "", "utf8");

    const browser = await puppeteer.launch(config.puppeteerLaunchOptions);
    const baseDomain = new URL(startUrl).hostname;

    /**
     * Parses a page and retrieves all links to other pages.
     * @param {string} currentUrl - The URL of the current page.
     * @param {string} baseDomain - The base domain for validation.
     * @returns {Promise<string[]>} - A list of links (URLs) found on the page.
     */
    const parsePage = async (currentUrl, baseDomain) => {
        const noFragUrl = getNoFragUrl(currentUrl);

        if (visitedUrls.has(noFragUrl)) {
            return [];
        }

        visitedUrls.add(noFragUrl);
        console.log(`Visiting: ${currentUrl}`);

        const page = await browser.newPage();
        const client = await page.createCDPSession();
        await client.send("Page.setDownloadBehavior", { behavior: "deny" });
        page.setDefaultTimeout(0);

        const domainFilter = new Set(config.domainFilter || []);

        /**
         * Logs network events (response, request failed, etc.) for a page.
         * @param {string} eventType - The type of network event.
         * @param {Object} data - The data associated with the event.
         */
        const logPageNetworkEvent = (eventType, data) => {
            const urlString = eventType === "console" ? data.location()?.url : data.url?.();
            let url = null;

            if (urlString) {
                try {
                    url = new URL(urlString);
                } catch {}
            }

            const logEntry = {
                type: eventType,
                resourseUrl: url?.href ?? "Unknown",
            };

            if (url && domainFilter.has(url.hostname)) {
                return;
            }

            switch (eventType) {
                case "response":
                    logEntry.status = data.status();
                    break;
                case "requestfailed":
                    logEntry.failure = data.failure()?.errorText;
                    break;
                case "console":
                    Object.assign(logEntry, {
                        text: data.text(),
                        consoleType: data.type(),
                    });
                    break;
            }

            updateLogsForUrl(currentUrl, logEntry);
        };

        page.on("response", (response) => logPageNetworkEvent("response", response));
        page.on("requestfailed", (request) => logPageNetworkEvent("requestfailed", request));
        page.on("requestfinished", (request) => logPageNetworkEvent("requestfinished", request));
        page.on("console", (msg) => logPageNetworkEvent("console", msg));
        page.on("frameattached", async (frame) => {
            try {
                await frame.waitForNavigation({ waitUntil: LIFE_CYCLE_EVENT }).catch(() => {});
            } catch (err) {
                throw new Error(`Error when frameattached on page: ${err.stack}`);
            }
        });

        try {
            if (currentUrl.includes(baseDomain)) {
                await page.goto(currentUrl, { waitUntil: LIFE_CYCLE_EVENT });
            } else {
                await page.goto(currentUrl, { waitUntil: "domcontentloaded" });
            }

            const currentPageUrl = new URL(currentUrl);
            if (currentPageUrl.hostname !== baseDomain) {
                console.log(`Skipping ${currentUrl}, as it doesn't match the base domain.`);
                visitedUrls.add(currentUrl);
                await page.close();
                return [];
            }

            const hrefs = await page.evaluate(() => {
                return Array.from(document.querySelectorAll("a[href]"))
                    .map((a) => ({ href: a.href }))
                    .filter((item) => item.href.startsWith("http"));
            });

            const filteredHrefs = hrefs
                .map((item) => {
                    const noFragUrl = getNoFragUrl(item.href);

                    if (!visitedUrls.has(noFragUrl)) {
                        return item.href.includes("#") ? noFragUrl : item.href;
                    }

                    return null;
                })
                .filter(Boolean);

            await page.close();
            return filteredHrefs;
        } catch (error) {
            console.error(`Error visiting ${currentUrl}:`, error);
            updateLogsForUrl(currentUrl, {
                type: "error",
                message: error.message,
            });
            await page.close();
            return [];
        }
    };

    /**
     * Manages the traversal of the page queue, ensuring tabs are not overrun.
     * @param {string} startUrl - The initial URL to start traversal from.
     * @param {string} baseDomain - The base domain to validate during traversal.
     */
    const manageTabQueueTraversal = async (startUrl, baseDomain) => {
        const queue = [startUrl];
        const activeTabs = new Set();

        while (queue.length > 0 || activeTabs.size > 0) {
            while (activeTabs.size < PAGE_COUNT && queue.length > 0) {
                const currentUrl = queue.shift();
                const promise = parsePage(currentUrl, baseDomain)
                    .then((childUrls) => {
                        for (const childUrl of childUrls) {
                            if (!visitedUrls.has(childUrl)) {
                                queue.push(childUrl);
                            }
                        }
                    })
                    .finally(() => activeTabs.delete(promise));

                activeTabs.add(promise);
            }

            if (activeTabs.size > 0) {
                await Promise.race(activeTabs);
            }
        }
    };

    await manageTabQueueTraversal(startUrl, baseDomain);
    await browser.close();
})();

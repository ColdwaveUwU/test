const puppeteer = require("%%PUPPETEER%%");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { execFile } = require("child_process");
const { Collab } = require("%%COLLAB%%");
const { Checkbox } = require("%%ELEMENTS%%");
const profilePath = "%%PROFILE_PATH%%";
const cacheDir = "%%CACHEDIR%%";
const code = require("./code");
globalThis.Params = "%%TESTER_PARAMS%%";
globalThis.resourceServerUrl = "%%URL%%";
globalThis.workDirectory = "%%WORK_DIR%%";
globalThis.errorCodes = path.join(globalThis.workDirectory, "engine", "errorCodes", "errorCodes.json");
globalThis.logDirectory = path.join(__dirname, "log");
globalThis.downloadDir = path.join(__dirname, "download");
globalThis.scriptsDirectory = path.join(__dirname, "scripts");
globalThis.externalScriptLogDir = path.join(__dirname, "externallog");
globalThis.engineScriptsPath = path.join(workDirectory, "engine", "script");

const utilsPath = path.join(engineScriptsPath, "js");
const { createProxy, writeLog, formatTimestamp, finalizeProgram, getErrorCode, AscEventListener } = require(utilsPath);

/**
 * @typedef {Object} ResultObject
 * @property {string} filename
 * @property {string} documentType
 */
/**
 * Main module for performing testing tasks.
 */
class TesterImp {
    /**
     * @param {JSON} config
     */
    constructor(config, providerAddonClass, isCollab = false) {
        const options = {
            chrome: [
                "--disable-infobars",
                "--window-size=" +
                    config.puppeteerOptions.defaultViewport.width +
                    "," +
                    config.puppeteerOptions.defaultViewport.height,
                "--disk-cache-dir=" + cacheDir,
                "--lang=en-US",
                "--no-sandbox",
            ],
            firefox: [
                "--width",
                "" + config.puppeteerOptions.defaultViewport.width,
                "--height",
                "" + config.puppeteerOptions.defaultViewport.height,
            ],
        };
        const args = options[config.puppeteerOptions.browser] ?? [];

        this.userDelay = config.testOptions.userDelay * 10;
        this.browserOptions = {
            args,
            timeout: 0,
            ...config.puppeteerOptions,
        };
        if (config.puppeteerOptions.browser === "firefox") {
            this.browserOptions.userDataDir = profilePath;
        }

        this.fileName = "";
        this.isCollab = isCollab;
        this.tokenizedFileName = "";
        this.fileExtension = "";
        this.editorType = "";
        this.browser = config.puppeteerOptions.browser;
        this.browserClient = null;
        this.page = null;
        this.frame = "";
        this.url = config.testOptions.url;
        this.disableTooltips = config.testOptions.disableTooltips;
        this.cacheEnabled = config.testOptions.cacheEnabled;

        this.urlDebug = [];
        this.urlParam = config.testOptions.urlParam;
        this.consoleLogHandlers = [];
        this.messageType = config.testOptions.messageType;
        this.logEvents = config.testOptions.logEvents || false;
        this.config = config;
        this.events = {};
        this.collab = null;

        this.macrosArrayObject = {};
        this.providerAddonClass = providerAddonClass;
        this.providerAddon = providerAddonClass ? new providerAddonClass(this) : null;

        this.ascEventListeners = [];
    }

    #errorType = null;
    #pageTimeout = 60000;
    #editorLongActionsCount = 0;
    /**
     *
     * @returns {string}
     */
    getFileName() {
        return this.fileName;
    }

    setFileName(fileName) {
        this.fileName = fileName;
    }
    /**
     *
     * @returns {string}
     */
    getFileExtension() {
        return this.fileExtension;
    }
    /**
     *
     * @param {string} extension
     */
    setFileExtension(extension) {
        this.fileExtension = extension;
    }

    /**
     * Retrieves the current page
     * @returns {Puppeteer.Page} The current page
     */
    getPage() {
        return this.page;
    }

    getFrame() {
        return this.frame;
    }

    getBrowser() {
        return this.browser;
    }

    getBrowserClient() {
        return this.browserClient;
    }

    /**
     * Sets new page
     * @param {Puppeteer.Page} page
     */
    setPage(page) {
        this.page = page;
    }

    /**
     * Sets editor type
     * @param {"word" | "cell" | "slide" | "pdf"} editorType
     */
    setEditorType(editorType) {
        if (editorType !== undefined && editorType !== this.editorType) {
            this.editorType = editorType;
        }
    }

    getEditorType() {
        return this.editorType;
    }

    /**
     * Sets start url
     * @param {string} url
     */
    setUrl(url) {
        this.url = url;
    }

    /**
     * Function to add browser console listening.
     * @param {Object} logOption
     * @param {String} logOption.filter - Type of message in the console ("error", etc.).
     * @param {Function} logOption.handler - A function that will process message data.
     * @return {Promise<void>}
     * @throws {Error}
     */
    attachConsoleLog(logOption) {
        const { filter, handler } = logOption;

        if (!filter || !handler) {
            throw new Error("Set filter and logHandler parameters");
        }

        this.consoleLogHandlers.push({ filter, handler });
    }

    /**
     * Function for setting parameters in url address.
     * @param {string} newUrl - new Url.
     * @return {void}
     */
    setUrlParams(newUrl) {
        this.urlDebug = Array.isArray(newUrl) ? newUrl : [newUrl];
    }

    /**
     * Function for converting additional parameters to URI.
     * @returns {Promise<void>}
     */
    async checkDebugUrl(page) {
        try {
            let urlDebug = Array.isArray(this.urlParam) ? this.urlParam : [this.urlParam];

            if (urlDebug.length === 0) {
                throw new Error("Set debug parameters");
            }

            const currentUrl = page.url();
            const hasQuery = currentUrl.includes("?");
            const baseUrl = hasQuery ? currentUrl.split("?")[0] : currentUrl;
            const currentParams = hasQuery ? currentUrl.split("?")[1] : "";

            const filteredUrl = urlDebug.filter((param) => !currentParams.includes(param));

            const fixedEncodeURI = (str) => encodeURI(str).replace(/%7B/g, "{").replace(/%7D/g, "}");

            if (filteredUrl.length !== 0) {
                const resUrl = filteredUrl.join("&");
                const encodedUrl = fixedEncodeURI(resUrl);
                const newUrl = hasQuery ? `${baseUrl}?${currentParams}&${encodedUrl}` : `${baseUrl}?${encodedUrl}`;

                if (!currentUrl.includes(encodedUrl)) {
                    await page.goto(newUrl);
                }
            }
        } catch (error) {
            throw new Error(`Error with checkDebugUrl: ${error.message}`);
        }
    }

    /**
     * Function for pasting messages from the clipboard.
     * @param {string} selector
     * @param {string | undefined} input - if not defined your clipboard will be used
     * @param {string} type - one of MIME type
     * @returns {Promise<void>}
     */
    async clipboardCopyPasteEvent(type, input) {
        try {
            this.sendCDPCommand(this.page, "Browser.setPermission", {
                permission: { name: "clipboard-write" },
                setting: "granted",
            });
            this.sendCDPCommand(this.page, "Browser.setPermission", {
                permission: { name: "clipboard-read" },
                setting: "granted",
            });
            await this.click("#editor_sdk");
            await this.frame.evaluate(
                async (type, input) => {
                    if (input) {
                        const blob = new Blob([input], { type });
                        const data = [new ClipboardItem({ [type]: blob })];
                        await navigator.clipboard.write(data);
                    }
                    const clipboardContents = await navigator.clipboard.read();
                    const clipboardBlob = await clipboardContents[0].getType(type);
                    const blobContent = {
                        type: clipboardBlob.type,
                        text: await clipboardBlob.text(),
                    };
                    const el = document.querySelector("#area_id");
                    const dataTransfer = new DataTransfer();
                    dataTransfer.setData(blobContent.type, blobContent.text);
                    const event = new ClipboardEvent("paste", {
                        clipboardData: dataTransfer,
                        bubbles: true,
                    });
                    el.dispatchEvent(event);
                },
                type,
                input
            );
        } catch (error) {
            throw new Error(`Error clipboardCopyPaste: ${error.message}
            Your clipboard may be empty or you have not specified the input parameter.
            Try Tester.clipboardCopyPasteEvent("text/html", inputText); or copy something to the clipboard`);
        }
    }

    changeCurrentFrame(frame) {
        this.frame = frame;
    }

    /**
     * Function to search for a frame on a page.
     * @param {string} frameName
     * @returns {Promise<Puppeteer.Frame>}
     * @throws {Error}
     */
    async findFrameByName(frameName = "frameEditor") {
        try {
            let currentFrame = this.page.frames().find((frame) => frame.name() === frameName);
            if (!currentFrame) {
                try {
                    currentFrame = await this.page.waitForFrame(
                        async (frame) => {
                            return frame.name() === frameName;
                        },
                        { timeout: this.#pageTimeout }
                    );
                } catch {
                    throw new Error("Invalid frame name or frame not exist");
                }
            }
            return currentFrame;
        } catch (error) {
            throw new Error(`Error findFrameByName: ${error.message}`);
        }
    }

    /**
     * Sets up event handlers for a page to capture console messages, page errors, and dialogs.
     * @param {import('puppeteer').Page} page - The Puppeteer page instance to attach event listeners to.
     * @param {AscEventListener} ascEventListener - The ASC event listener to handle console messages.
     */
    async #setupPageEventHandlers(page, ascEventListener) {
        const messageTypes = Array.isArray(this.messageType) ? this.messageType : [this.messageType];
        const logFilePath = path.join(logDirectory, "browser_log", `page_${performance.now()}.txt`);
        const ignoreAll = this.config?.reportOptions?.ignoreBrowserErrors.includes("ignoreAll");

        const logToFile = async (message) => {
            fs.appendFile(logFilePath, message + "\n", (err) => {
                if (err) {
                    console.error("Error writing to log file:", err);
                }
            });
        };

        page.on("console", async (message) => {
            const messageType = message.type();
            const messageArgs = message.args();

            const argValues = await Promise.all(
                messageArgs.map(async (arg) => {
                    try {
                        return await arg.jsonValue();
                    } catch {
                        return String(arg);
                    }
                })
            );

            const messageText =
                argValues
                    .map((value) => {
                        if (typeof value === "object") {
                            return JSON.stringify(value, null, 2);
                        }
                        return String(value);
                    })
                    .join(" ") || message.text();

            const duration = Math.round(performance.now() - globalThis.initialTime);
            const timestamp = formatTimestamp(duration);

            let consoleMessage = `${timestamp} [browser ${messageType}]: ${messageText}`;

            const isImportant = messageType === "error" || messageType === "warning";
            const isIgnored = this.config?.reportOptions?.ignoreBrowserErrors.some((err) =>
                messageText.toLowerCase().includes(err.toLowerCase())
            );

            if (isImportant) {
                this.#errorType = ignoreAll || isIgnored ? "" : "BrowserError";

                if (!ignoreAll && this.#errorType) {
                    const location = message.location()?.url;
                    if (location) {
                        consoleMessage += ` location: ${location}`;
                    }
                } else {
                    return;
                }
            }

            ascEventListener.handleConsoleMessage(consoleMessage);
            if (this.consoleLogHandlers.length > 0) {
                for (const { filter, handler } of this.consoleLogHandlers) {
                    if (!messageTypes.includes(messageType)) continue;
                    if (!this.logEvents && messageText.includes("[logEvent]")) continue;

                    if (messageType === "log" && messageText.startsWith(filter)) {
                        const filtered = messageText.replace(filter, "");
                        handler(`${timestamp} [browser ${messageType}]: ${filtered}`);
                    } else {
                        handler(consoleMessage);
                    }
                }
            } else {
                if (!this.logEvents && consoleMessage.includes("[logEvent]")) {
                    return;
                }

                if (!messageTypes.includes(messageType)) {
                    return;
                }

                logToFile(consoleMessage);
            }
        });

        page.on("pageerror", async (error) => {
            if (!ignoreAll && !this.config?.reportOptions?.ignoreBrowserErrors.includes(error.message)) {
                const pageError = { message: `[pageerror]: ${error.stack}`, name: "BrowserError" };
                logToFile(pageError.message);
                console.error(pageError.message);
                this.#errorType = getErrorCode(pageError);
            }
        });

        page.on("dialog", async (dialog) => {
            let consoleMessage = `[dialog]: [${dialog.type()}]: ${dialog.message()}`;
            fs.appendFile(logFilePath, consoleMessage + "\n", (err) => {
                if (err) {
                    console.error("Error:", err);
                }
            });
            await dialog.dismiss();
        });
    }

    #setupTargetHandlers() {
        this.browser.on("targetcreated", async (target) => {
            const page = await target.page();
            if (!page) {
                return;
            }

            const client = await page.target().createCDPSession();
            await client.send("Network.enable");

            client.on("Network.webSocketCreated", ({ url }) => {
                const match = url.match(/\/doc\/([^/]+)/);
                if (match) {
                    const documentId = match[1];
                    console.log("[document_id]:", documentId);
                }
            });

            await page.evaluateOnNewDocument(() => {
                window.AscUserTest = window.AscUserTest || {};
                window.AscUserTest.logEvents = window.AscUserTest.logEvents ?? true;
            });

            const ascEventListener = new AscEventListener();
            this.ascEventListeners.push({ listener: ascEventListener, page });

            page.setDefaultTimeout(this.#pageTimeout);
            await this.#setupPageEventHandlers(page, ascEventListener);

            this.onAscEvent("asc_onStartAction", () => {
                this.#editorLongActionsCount += 1;
            });

            this.onAscEvent("asc_onEndAction", () => {
                if (this.#editorLongActionsCount > 0) {
                    this.#editorLongActionsCount -= 1;
                }
            });

            this.onAscEvent("asc_onError", (ascError) => {
                const errorCodes = require(globalThis.errorCodes);
                const timestamp = formatTimestamp(Math.round(performance.now()) - globalThis.initialTime);

                const getKeyByValue = (obj, value) => Object.keys(obj).find((key) => obj[key] === value) || "Unknown";

                const onErrorMessage = {
                    name: "AscOnError",
                    code: [],
                    message: "",
                };

                const hasValidArgs = Array.isArray(ascError) && ascError.length >= 2;
                if (!hasValidArgs) {
                    onErrorMessage.message = `${timestamp} [${
                        onErrorMessage.name
                    }]: triggered with no or insufficient arguments: ${JSON.stringify(ascError)}`;
                } else {
                    const [errorCodeVal, levelVal] = ascError;
                    const errorCodeKey = getKeyByValue(errorCodes.ID, errorCodeVal);
                    const levelKey = getKeyByValue(errorCodes.Level, levelVal);

                    const idPart = `Error ID = "${errorCodeKey}" (code: ${errorCodeVal})`;
                    const levelPart = `Level = "${levelKey}" (code: ${levelVal})`;
                    onErrorMessage.message = `${timestamp} [${onErrorMessage.name}]: ${idPart}, ${levelPart}`;

                    if (levelKey === "NoCritical") {
                        this.#errorType = "asc_onErrorWarning";
                        return;
                    }
                }

                console.error(onErrorMessage.message);
                onErrorMessage.code = getErrorCode(onErrorMessage);
                finalizeProgram(onErrorMessage.code);
            });
        });

        this.browser.on("targetchanged", async (target) => {
            const page = await target.page();
            if (!this.providerAddon && page) {
                this.checkDebugUrl(page);
            }
        });

        this.browser.on("disconnected", () => {
            if (this.#errorType) {
                const error = { name: this.#errorType };
                const errorCode = getErrorCode(error);
                finalizeProgram(errorCode);
            }
        });
    }

    /**
     * Puppeteer object initialization function
     * @returns {Promise<void>}
     * @throws {Error}
     */
    async launch() {
        try {
            this.browser = await puppeteer.launch(this.browserOptions);
            this.#setupTargetHandlers();

            this.browserClient = await this.sendCDPCommand(this.browser, "Browser.setDownloadBehavior", {
                behavior: "allowAndName",
                downloadPath: downloadDir,
                eventsEnabled: true,
            });

            this.page = await this.browser.newPage();
            await this.page.goto(this.url);

            if (!this.cacheEnabled) {
                await this.sendCDPCommand(this.page, "Network.clearBrowserCache");
            }
        } catch (error) {
            throw new Error(`Error launch: ${error.message}`);
        }
    }

    /**
     * Switches to a page at the specified index and sets the frame.
     * @param {number} index - Index of the target page.
     * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
     * @throws {Error} If the index is out of bounds.
     */
    async switchPage(index, targetFrameName = "frameEditor") {
        const pages = await this.browser.pages();
        if (index < 0 || index >= pages.length) {
            throw new Error("Invalid page index");
        }

        this.page = pages[index];

        if (index === 0) {
            this.frame = this.page.mainFrame();
            return;
        }

        try {
            this.frame = await this.findFrameByName(targetFrameName);
        } catch {
            this.frame = this.page.mainFrame();
        }
    }

    /**
     * Switches to the first created page and sets the frame.
     * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
     */
    async switchToMainPage(targetFrameName = "frameEditor") {
        await this.switchPage(0, targetFrameName);
    }

    /**
     * Switches to the next page in the list.
     * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
     * @throws {Error} If there is no next page.
     */
    async switchToNextPage(targetFrameName = "frameEditor") {
        const pages = await this.browser.pages();
        const currentIndex = pages.findIndex((p) => p === this.page);
        if (currentIndex === -1 || currentIndex >= pages.length - 1) {
            throw new Error("No next page available");
        }

        await this.switchPage(currentIndex + 1, targetFrameName);
    }

    /**
     * Switches to the previous page in the list.
     * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
     * @throws {Error} If there is no previous page.
     */
    async switchToPreviousPage(targetFrameName = "frameEditor") {
        const pages = await this.browser.pages();
        const currentIndex = pages.findIndex((p) => p === this.page);
        if (currentIndex <= 0) {
            throw new Error("No previous page available");
        }

        await this.switchPage(currentIndex - 1, targetFrameName);
    }

    /**
     * Closes the current page and switches to the previous one if available.
     * If no previous page exists, clears the current page reference.
     * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
     */
    async closePage(targetFrameName = "frameEditor") {
        const pages = await this.browser.pages();
        const currentIndex = pages.findIndex((p) => p === this.page);

        this.removeAllAscEventListeners();
        await this.page.close();
        if (currentIndex >= 0 && pages.length > 1) {
            const nextIndex = Math.max(currentIndex - 1, 0);
            await this.switchPage(nextIndex, targetFrameName);
        } else {
            this.page = null;
            this.frame = null;
        }
    }

    /**
     * Retrieves all currently open browser pages.
     * @returns {Promise<import("puppeteer").Page[]>} Array of Puppeteer Page instances.
     */
    async getPages() {
        return await this.browser.pages();
    }

    /**
     * Sets up event listeners to handle file downloads and renaming.
     * @throws {Error} Logs any errors that occur during event handling.
     */
    handleFileDownload() {
        return new Promise((resolve, reject) => {
            const downloadWillBeginEvent = "Browser.downloadWillBegin";
            const downloadProgressEvent = "Browser.downloadProgress";

            const cleanup = () => {
                this.browserClient.off(downloadWillBeginEvent, onDownloadWillBegin);
                this.browserClient.off(downloadProgressEvent, onDownloadProgress);
            };

            const onDownloadProgress = (progressEvent) => {
                if (progressEvent.guid === fileGuid) {
                    if (progressEvent.state === "completed") {
                        try {
                            const oldFilePath = path.join(downloadDir, fileGuid);
                            const newFilePath = path.join(downloadDir, this.fileName);

                            if (fs.existsSync(oldFilePath)) {
                                fs.renameSync(oldFilePath, newFilePath);
                                resolve(newFilePath);
                            } else {
                                reject(new Error(`File not found: ${oldFilePath}`));
                            }
                        } catch (err) {
                            reject(new Error(`Error renaming file: ${err.message}`));
                        } finally {
                            cleanup();
                        }
                    } else if (progressEvent.state === "canceled" || progressEvent.state === "failed") {
                        reject(new Error(`Download failed or canceled for file: ${fileGuid}`));
                        cleanup();
                    }
                }
            };

            const onDownloadWillBegin = (event) => {
                try {
                    fileGuid = event.guid;
                    this.fileName = event.suggestedFilename;
                    this.browserClient.on(downloadProgressEvent, onDownloadProgress);
                } catch (error) {
                    reject(new Error(`Error in ${downloadWillBeginEvent} handler: ${error.message}`));
                    cleanup();
                }
            };

            let fileGuid = "";
            this.browserClient.on(downloadWillBeginEvent, onDownloadWillBegin);
        });
    }

    /**
     * Get editor type by extension
     * @param {string} fileExtension - file extension
     * @returns {"word" | "slide" | "cell" | "pdf" | null}
     */
    getEditorTypeByExtension(fileExtension) {
        const documentTypeMap = {
            word: [
                "doc",
                "docm",
                "docx",
                "dot",
                "dotm",
                "dotx",
                "epub",
                "fb2",
                "fodt",
                "htm",
                "html",
                "mht",
                "mhtml",
                "odt",
                "ott",
                "rtf",
                "stw",
                "sxw",
                "txt",
                "wps",
                "wpt",
                "xml",
            ],
            cell: [
                "csv",
                "et",
                "ett",
                "fods",
                "ods",
                "ots",
                "sxc",
                "xls",
                "xlsb",
                "xlsm",
                "xlsx",
                "xlt",
                "xltm",
                "xltx",
                "xml",
            ],
            slide: [
                "dps",
                "dpt",
                "fodp",
                "odp",
                "otp",
                "pot",
                "potm",
                "potx",
                "pps",
                "ppsm",
                "ppsx",
                "ppt",
                "pptm",
                "pptx",
                "sxi",
            ],
            pdf: ["djvu", "docxf", "oform", "oxps", "pdf", "xps"],
        };

        for (const [type, extensions] of Object.entries(documentTypeMap)) {
            if (extensions.includes(fileExtension.toLowerCase())) {
                return type;
            }
        }
        return null;
    }

    /**
     * Editor loading wait function.
     * @param {string} frameName
     * @param {Frame} [frame]
     * @returns {Promise<void>}
     * @throws {Error}
     */
    async waitEditor(frameName = "frameEditor", frame = null) {
        try {
            this.frame = frame || (await this.findFrameByName(frameName));
            const waitForDisableTooltips = this.frame.waitForFunction(
                (disableTooltips) => {
                    if (!disableTooltips) {
                        return true;
                    }

                    const tooltipManager = window?.Common?.UI?.TooltipManager;
                    if (tooltipManager) {
                        const originalTooltip = tooltipManager.addTips;
                        tooltipManager.addTips = (arr) => {
                            for (let step in arr) {
                                Common.localStorage.setItem(arr[step].name, 1);
                            }
                            originalTooltip(arr);
                        };
                        return true;
                    }
                },
                {},
                this.disableTooltips && !this.urlParam.includes("type=mobile")
            );

            await Promise.all([
                waitForDisableTooltips,
                this.waitForAscEvent("asc_onDocumentContentReady"),
                this.sleep(1000), //todo to fix click on file tab
            ]);

            await this.frame.waitForFunction(() => {
                return !!window?.Asc?.editor?.asc_getDocumentName();
            });

            const { fileName, fileExtension } = await this.frame.evaluate(() => {
                const fileName = window.Asc.editor.asc_getDocumentName();
                const getFileExtension = (name) => {
                    const lastDotIndex = name.lastIndexOf(".");
                    return lastDotIndex !== -1 ? name.slice(lastDotIndex + 1).toLowerCase() : "";
                };
                return { fileName, fileExtension: getFileExtension(fileName) };
            });

            this.fileName = fileName;
            this.fileExtension = fileExtension;
            const documentType = this.getEditorTypeByExtension(fileExtension);
            this.setEditorType(documentType);
        } catch (error) {
            throw new Error(`Error waitEditor: ${error.message}`);
        }
    }

    /**
     * Returns the ASC event listener associated with the current page.
     * @returns {AscEventListener|undefined} The ASC event listener or undefined if not found.
     */
    getAscEventListenerForCurrentPage() {
        return this.ascEventListeners.find((item) => item.page === this.page)?.listener;
    }

    /**
     * Registers a callback to be executed every time the ASC event is triggered.
     * @param {string} eventName - The name of the ASC event to listen for.
     * @param {Function} callback - The callback function to execute when the event occurs.
     */
    onAscEvent(eventName, callback) {
        const listener = this.getAscEventListenerForCurrentPage();
        listener?.on(eventName, callback);
    }

    /**
     * Registers a callback to be executed only once when the ASC-event is triggered.
     * @param {string} eventName - The name of the ASC event to listen for.
     * @param {Function} callback - The callback function to execute when the event occurs.
     */
    onceAscEvent(eventName, callback) {
        const listener = this.getAscEventListenerForCurrentPage();
        listener?.once(eventName, callback);
    }

    /**
     * Waits for the ASC-event to occur within the given timeout.
     * @param {string} eventName - The name of the ASC event to wait for.
     * @param {number} [timeoutMs=this.#pageTimeout] - Timeout in milliseconds (optional).
     * @returns {Promise<any>} A promise that resolves with the event data when the event occurs.
     * @throws {Error} If no listener is found for the current page.
     */
    waitForAscEvent(eventName, timeoutMs = this.#pageTimeout) {
        const listener = this.getAscEventListenerForCurrentPage();
        if (!listener) {
            throw new Error("AscEventListener not found for current page");
        }
        return listener.waitForEvent(eventName, timeoutMs);
    }

    /**
     * Retrieves the last received data for the ASC-event.
     * @param {string} eventName - The name of the ASC event.
     * @returns {any} The data associated with the specified ASC event, or undefined if not available.
     */
    getAscEventData(eventName) {
        const listener = this.getAscEventListenerForCurrentPage();
        return listener?.getEventData(eventName);
    }

    /**
     * Removes all registered callbacks for the ASC-event.
     * @param {string} eventName - The name of the ASC event.
     */
    removeAllAscEventListeners(eventName) {
        const listener = this.getAscEventListenerForCurrentPage();
        listener?.removeAllListeners(eventName);
    }

    /**
     * Function for sending CDP requests
     * @param {*} target - browser or page
     * @param {String} method - CDP method
     * @param {Object} protocolCMD - CDP protocol settings.
     * @param {*} protocolCMD.any
     * @returns {Promise<CDPSession>}
     */
    async sendCDPCommand(target, method, protocolCMD) {
        const client = await target.target().createCDPSession();
        await client.send(method, protocolCMD);
        return client;
    }

    /**
     * Opens a file using the provider addon if available, or manually uploads the file and navigates to the editor.
     * @param {string} fileName - The name of the file to open.
     * @param {string} [toFile="documents"] - The directory where the file is located.
     */
    async openFile(fileName, toFile = "documents") {
        const files = path.join(workDirectory, "files");
        const pathToFile = path.join(files, toFile, fileName);
        if (this.providerAddon && typeof this.providerAddon.openFile === "function") {
            return await this.providerAddon.openFile(pathToFile);
        }

        const requestUrl = `${this.url}/upload`;
        const resultJson = await this.uploadTestFile(pathToFile, requestUrl);
        const newPageUrl = `${this.url}/editor?fileName=${resultJson.filename}`;

        await this.navigateToEditor(newPageUrl);
    }

    /**
     * Creates a new file using the provider addon if available, or manually navigates to the editor to create the file.
     * @param {string} fileType - The type of file to create (e.g., "document", "spreadsheet").
     */
    async createFile(fileType) {
        if (this.providerAddon && typeof this.providerAddon.createFile === "function") {
            return await this.providerAddon.createFile(fileType);
        }

        this.fileExtension = this.getFileExtensionByInput(fileType);
        if (!this.fileExtension) {
            throw new Error(`Unsupported input: ${fileType}`);
        }

        const url = `${this.url}/editor?fileExt=${this.fileExtension}`;
        await this.navigateToEditor(url);
    }

    /**
     * Uploads a test file to the server and logs the upload time.
     * @param {string} filePath - The local path of the file to upload.
     * @param {string} requestUrl - API URL.
     * @returns {Promise<string>} - A promise that resolves to the server's response text.
     */
    async uploadTestFile(filePath, requestUrl) {
        const responsePromise = this.page.waitForResponse((response) => response.url() === requestUrl, {
            timeout: 0,
        });

        const errorMessageSelector = ".error-message";
        const startTime = Date.now();

        console.log(`[TestJS Time] Starting file upload: ${new Date().toLocaleString()}`);

        const fileUploadForm = "#fileupload";
        await this.uploadFile(filePath, fileUploadForm);

        const errorPromise = this.page
            .waitForFunction(
                (errorMessageSelector) => {
                    return !(document.querySelector(errorMessageSelector)?.style.display === "none");
                },
                { timeout: 0 },
                errorMessageSelector
            )
            .then(() => {
                throw new Error("Error during file upload.");
            });

        const httpResponse = await Promise.race([responsePromise, errorPromise]);

        const uploadDuration = Date.now() - startTime;
        console.log(`[TestJS Time] File upload completed: ${new Date().toLocaleString()}`);
        console.log(`[TestJS Time] Upload duration: ${uploadDuration} ms`);

        return await httpResponse.json();
    }

    /**
     * Navigates to the editor page with the specified URL.
     * @param {string} url - The URL to navigate to.
     */
    async navigateToEditor(url) {
        const page = await this.getPage();
        await page.goto(url);
        await page.setCacheEnabled(this.cacheEnabled);
        await this.waitEditor();
    }

    /**
     * Gets the file extension corresponding to the provided input type.
     * @param {string} input - The type of file (e.g., "document", "pdf").
     */
    getFileExtensionByInput(input) {
        const keywordToExtension = {
            document: "docx",
            pdf: "pdf",
            spreadsheet: "xlsx",
            presentation: "pptx",
            openspreadsheet: "ods",
            opendocument: "odt",
            openpresentation: "odp",
            formdocument: "docxf",
        };

        const supportedExtensions = Object.values(keywordToExtension);

        const normalizedInput = input.toLowerCase();

        if (supportedExtensions.includes(normalizedInput)) {
            return normalizedInput;
        }

        if (keywordToExtension[normalizedInput]) {
            return keywordToExtension[normalizedInput];
        }

        return null;
    }

    /**
     * Sets the delay before the user action
     * @param {Function} actionFunction
     * @param {number} delay
     * @param  {...any} args
     */
    async useDelay(actionFunction, delay = 0, ...args) {
        const delayTime = delay || this.userDelay;
        const actionTimeout = this.#pageTimeout;

        const waitLongAction = new Promise(async (resolve) => {
            while (this.#editorLongActionsCount !== 0) {
                await new Promise((r) => setTimeout(r, 50));
            }
            resolve();
        });

        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                reject(
                    new Error(
                        `Timeout waiting for editorLongActionsCount to become 0. Current value: ${
                            this.#editorLongActionsCount
                        }`
                    )
                );
            }, actionTimeout);
        });

        try {
            await Promise.race([waitLongAction, timeoutPromise]);
            clearTimeout(timeoutId);
            await actionFunction(...args);
            await new Promise((resolve) => setTimeout(resolve, delayTime));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sets the delay for runned script.
     * @param {number} delay in milliseconds
     * @returns {Promise<void>}
     */
    sleep(delay) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }

    /**
     * Clicks on one or more elements identified by CSS selectors.
     * @param {string|string[]} buttonSelectors - CSS selector(s) for the element(s) to click
     * @param {string} [target="frame"] - Target context: "frame", "page", or "none"
     * @param {number} [timeout=5000] - Timeout in milliseconds for waiting for the element to become enabled
     * @param {number} [delay=0] - Delay in milliseconds before the click action
     * @throws {Error} Throws an error if the element is not found, not visible, or disabled
     * @returns {Promise<void>}
     */
    async click(buttonSelectors, target = "frame", delay = 0, timeout = 5000) {
        try {
            const selectors =
                typeof buttonSelectors === "string" || Array.isArray(buttonSelectors)
                    ? Array.isArray(buttonSelectors)
                        ? buttonSelectors
                        : [buttonSelectors]
                    : [];

            const context = target === "none" || target === "page" ? this.page : this.frame;
            for (const selector of selectors) {
                try {
                    await this.useDelay(context.locator(selector).click.bind(context.locator(selector)), delay);
                } catch {
                    throw new Error(`Error in click for selector ${selector}: ${error.message}`);
                }
            }
        } catch (error) {
            throw new Error(`Error in click function with selectors ${buttonSelectors}: ${error.message}`);
        }
    }

    /**
     * Hover over an element specified by a CSS selector.
     * @param {string} selector
     * @param {string} [target]
     * @param {number} delay
     */
    async hoverElement(selector, target = "frame", delay = 0) {
        try {
            const context = target === "none" || target === "page" ? this.page : this.frame;
            await this.useDelay(context.locator(selector).hover.bind(context.locator(selector)), delay);
        } catch (error) {
            throw new Error(`Error in hoverElement for selector ${selector}: ${error.message}`);
        }
    }

    /**
     * Text input function.
     * @param {string} text - input text
     * @param {boolean} pressEscBefore - keypress Escape button after input
     * @param {number} delay - simulate user delay
     * @returns {Promise<void>}
     * @throws {Error}
     */
    async input(text, isHideHints = false, delay = 0) {
        try {
            await this.useDelay(this.page.keyboard.type.bind(this.page.keyboard), delay, text);
            if (isHideHints) {
                await this.sleep(1000);
                await this.keyPress("Escape");
            }
        } catch (error) {
            throw new Error(`Error input: ${error.message}`);
        }
    }

    /** Interacts with paragraph lock in Strict mode. */
    async lockParagraph() {
        await this.input("A");
        await this.sleep(1000);
        await this.keyPress("Backspace");
    }

    /**
     * Waits until the specified element becomes the active (focused) element within the frame.
     * @param {string} selector - A CSS selector string representing the element to wait for focus on.
     * @returns {Promise<void>} A promise that resolves once the element is focused.
     * @throws {Error} If the wait times out or an error occurs while checking for focus.
     */
    async waitForElementFocus(selector) {
        try {
            await this.frame.waitForFunction(
                (sel) => document.activeElement === document.querySelector(sel),
                { timeout: 5000 },
                selector
            );
        } catch (error) {
            throw new Error(
                `Error in waitForElementFocus: Failed to wait for focus on "${selector}". ${error.message}`
            );
        }
    }

    /**
     * Sets focus on the element matching the provided selector and waits until the element becomes active.
     * @param {string} selector - The CSS selector of the element to focus.
     * @returns {Promise<void>} A promise that resolves once the element is focused and active.
     * @throws {Error} If the focus operation fails.
     */
    async focusElement(selector) {
        try {
            await Promise.all([this.frame.focus(selector), this.waitForElementFocus(selector)]);
        } catch (error) {
            throw new Error(`Failed to focus element with selector "${selector}": ${error.message}`);
        }
    }

    /**
     * Shortcut for keyDown and keyUp.
     * @param {string} key - The name of the key to release
     * @param {string} [focusElementSelector="#area_id"] - Optional CSS selector of the element to focus before dispatching the event.
     * @param {number} [delay=0] - Optional delay in milliseconds
     */
    async keyPress(key, focusElementSelector = "#area_id", delay = 100) {
        try {
            if (focusElementSelector) {
                await this.focusElement(focusElementSelector);
            }
            await this.useDelay(this.page.keyboard.press.bind(this.page.keyboard), delay, key);
        } catch (error) {
            throw new Error(`Error keyPress: ${error.message}`);
        }
    }

    /**
     * Dispatches a keydown event on the currently active element,
     * optionally ensuring a specific element is focused before dispatch.
     * @param {string} key - The name of the key to release
     * @param {string} [focusElementSelector="#area_id"] - Optional CSS selector of the element to focus before dispatching the event.
     * @param {number} [delay=0] - Optional delay in milliseconds
     */
    async keyDown(key, focusElementSelector = "#area_id", delay = 0) {
        try {
            if (focusElementSelector) {
                await this.focusElement(focusElementSelector);
            }
            await this.useDelay(this.page.keyboard.down.bind(this.page.keyboard), delay, key);
        } catch (error) {
            throw new Error(`Error keyDown: ${error.message}`);
        }
    }

    /**
     * Dispatches a keyup event on the currently active element,
     * optionally ensuring a specific element is focused before dispatch.
     * @param {string} key - The name of the key to release
     * @param {string} [focusElementSelector="#area_id"] - Optional CSS selector of the element to focus before dispatching the event.
     * @param {number} [delay=0] - Optional delay in milliseconds
     */
    async keyUp(key, focusElementSelector = "#area_id", delay = 0) {
        try {
            if (focusElementSelector) {
                await this.focusElement(focusElementSelector);
            }
            await this.useDelay(this.page.keyboard.up.bind(this.page.keyboard), delay, key);
        } catch (error) {
            throw new Error(`Error keyUp: ${error.message}`);
        }
    }

    /**
     * Click at specific coordinates within an element.
     * @param {string} selector - CSS selector of the target element.
     * @param {number} x - X coordinate relative to the top-left corner of the element.
     * @param {number} y - Y coordinate relative to the top-left corner of the element.
     * @param {number} [delay=0] - Optional delay in milliseconds before the click action.
     * @throws {Error} Throws an error if the element is not found or cannot be clicked.
     */
    async mouseClickInsideElement(selector, x, y, delay = 0) {
        try {
            const isAvailable = await this.checkSelector(selector);
            if (!isAvailable) {
                throw new Error(`Element with selector "${selector}" is not available.`);
            }

            const elementHandle = await this.frame.$(selector);
            if (!elementHandle) {
                throw new Error(`Element with selector "${selector}" not found.`);
            }

            const boxModel = await elementHandle.boxModel();
            if (!boxModel) {
                throw new Error(`Element with selector "${selector}" has no box model.`);
            }

            await this.useDelay(() => elementHandle.click({ offset: { x, y } }), delay);
        } catch (error) {
            throw new Error(`Error in mouseClickInsideElement: ${error.message}`);
        }
    }

    /**
     * Checks if an element matching the specified selector exists in the given context.
     * This method evaluates in the browser context and returns a boolean.
     *
     * @param {string} selector - CSS selector to find the element.
     * @param {("frame"|"page")} [context="frame"] - Context to search in: "frame" (default) or "page".
     * @returns {Promise<boolean>} Resolves with true if the element exists, false otherwise.
     * @throws {Error} If the context is invalid or evaluation fails.
     */
    async checkSelector(selector, context = "frame") {
        try {
            const target = context === "page" ? this.page : context === "frame" ? this.frame : null;

            if (!target) {
                throw new Error(`Invalid context: "${context}". Allowed values are "frame" or "page".`);
            }

            return await target.evaluate((sel) => {
                return document.querySelector(sel) !== null;
            }, selector);
        } catch (error) {
            throw new Error(`Failed to check selector "${selector}" in context "${context}": ${error.message}`);
        }
    }

    async waitSelector(selector, context = "frame", timeout = 5000) {
        const target = context === "page" ? this.page : this.frame;

        try {
            await target.waitForFunction(
                (sel) => {
                    return document.querySelector(sel);
                },
                { timeout: timeout, polling: 100 },
                selector
            );
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Calls select() on an element
     * @param {string} selector
     */
    async selectText(selector) {
        await this.frame.evaluate((selector) => {
            if (document.querySelector(selector)?.select) {
                document.querySelector(selector).select();
            }
        }, selector);
    }

    /**
     * @param {String} fileName
     * @param {String} selectorFileChooser
     * @throws {Error}
     * @returns {Promise<void>}
     */
    async uploadFile(filePath, selectorFileChooser) {
        try {
            const fileInput = await this.page.$(selectorFileChooser);
            if (!fileInput) {
                throw new Error(`File input element not found with selector: ${selectorFileChooser}`);
            }

            await fileInput.uploadFile(filePath);
        } catch (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }
    }

    /**
     * @param {string} inputText
     * @param {string} inputFormSelector
     * @param {number} [delay]
     * @param {Frame | Page} [context] - frame or page
     * @throws {Error}
     * @returns {Promise<void>}
     */
    async inputToForm(inputText, inputFormSelector, delay = 0, context = this.frame) {
        try {
            if (typeof inputText !== "string") {
                inputText = String(inputText);
            }
            await this.useDelay(
                context.locator(inputFormSelector).fill.bind(context.locator(inputFormSelector)),
                delay,
                inputText
            );
        } catch (error) {
            throw new Error(`Error inputToForm: ${error.message}`);
        }
    }

    /**
     * Function to get text from a DOM element.
     * @param {string} selector
     * @param {"textContent" | "value"} [textKey]
     * @returns {string}
     */
    async getTextElement(selector, textKey = "textContent") {
        const element = await this.frame.$(selector);
        const text = await this.frame.evaluate((element, textKey) => element[textKey], element, textKey);
        return text;
    }
    /**
     * Changes the value of an element using buttons (Example: + and - buttons).
     * @param {String} elementSelector
     * @param {Number} countClick
     * @return {Promise<void>}
     */
    async setOptionByClick(elementSelector, countClick) {
        let buttonSelector = elementSelector + " .updown-picker-button";
        if (countClick > 0) {
            buttonSelector += "-up";
            for (let i = 0; i < countClick; i++) {
                await this.click(buttonSelector);
            }
        } else if (countClick < 0) {
            buttonSelector += "-down";
            for (let i = countClick; i !== 0; i++) {
                await this.click(buttonSelector);
            }
        }
    }
    /**
     * Draw function inside element.
     * @param {string} selector
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} delay
     * @returns {Promise<void>}
     */
    async mouseDrawingLine(selector, startX, startY, endX, endY, delay = 0) {
        try {
            const canvasSelector = selector;
            const canvas = await this.frame.$(canvasSelector);

            if (!canvas) {
                throw new Error("Canvas element not found.");
            }

            const canvasBoundingBox = await canvas.boundingBox();

            if (!canvasBoundingBox) {
                throw new Error("Canvas element not visible.");
            }

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            const page = this.frame.page();
            const mouseDownX = canvasBoundingBox.x + startX + canvasBoundingBox.width / 2;
            const mouseDownY = canvasBoundingBox.y + startY + canvasBoundingBox.height / 2;
            await this.useDelay(page.mouse.move.bind(page.mouse), delay, mouseDownX, mouseDownY);
            await this.useDelay(page.mouse.down.bind(page.mouse), delay);

            const mouseX = canvasBoundingBox.x + startX + deltaX + canvasBoundingBox.width / 2;
            const mouseY = canvasBoundingBox.y + startY + deltaY + canvasBoundingBox.height / 2;

            await this.useDelay(page.mouse.move.bind(page.mouse), delay, mouseX, mouseY);

            const mouseUpX = canvasBoundingBox.x + endX + canvasBoundingBox.width / 2;
            const mouseUpY = canvasBoundingBox.y + endY + canvasBoundingBox.height / 2;
            await this.useDelay(page.mouse.move.bind(page.mouse), delay, mouseUpX, mouseUpY);
            await this.useDelay(page.mouse.up.bind(page.mouse), delay);
        } catch (error) {
            throw new Error(`Error mouseDrawingLine: ${error.message}`);
        }
    }

    /**
     * Mouse click inside main canvas.
     * @param {Number} x
     * @param {Number} y
     * @param {number} delay
     * @returns {Promise<void>}
     * @throws {Error}
     */
    async clickMouseInsideMain(x, y, delay = 0) {
        try {
            const canvasSelector = "#editor_sdk";
            const canvas = await this.frame.$(canvasSelector);

            if (!canvas) {
                throw new Error("Canvas element not found.");
            }

            const canvasBoundingBox = await canvas.boundingBox();
            if (!canvasBoundingBox) {
                throw new Error("Canvas element not visible.");
            }

            const page = this.frame.page();
            const mouseDownX = canvasBoundingBox.x + x + canvasBoundingBox.width / 2;
            const mouseDownY = canvasBoundingBox.y + y + canvasBoundingBox.height / 2;
            await this.useDelay(page.mouse.click.bind(page.mouse), delay, mouseDownX, mouseDownY);
        } catch (error) {
            throw new Error(`Error clickMouseInsideMain: ${error.message}`);
        }
    }

    /**
     * Reload target page
     * @param {boolean} [isEditorPage]
     */
    async reloadPage(isEditorPage = true) {
        if (isEditorPage) {
            await this.waitAutosave();
            await this.page.reload();
            await this.waitEditor();
        } else {
            await this.page.reload();
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async waitAutosave() {
        try {
            await this.frame.waitForFunction(
                () => {
                    const labelAction =
                        document.querySelector("#label-action") || document.querySelector("#status-label-action");
                    return labelAction && labelAction.textContent.includes("All changes saved");
                },
                {
                    timeout: 30000,
                }
            );
        } catch (error) {
            throw new Error(`Error waitAutosave: ${error.message}`);
        }
    }

    async waitUpdates() {
        try {
            await this.frame.waitForFunction(
                () => {
                    const labelAction =
                        document.querySelector("#label-action") || document.querySelector("#status-label-action");
                    return labelAction && labelAction.textContent.includes("You have updates");
                },
                {
                    timeout: 30000,
                }
            );
        } catch (error) {
            throw new Error(`Error waitAutosave: ${error.message}`);
        }
    }

    /**
     * Opens a dropdown.
     * @param {string} selector
     * @param {number} delay
     * @returns {Promise<void>}
     */
    async selectDropdown(selector, dropdownMenuSelector = "ul.dropdown-menu", delay = 0) {
        try {
            await this.useDelay(
                this.frame.waitForFunction.bind(this.frame),
                delay,
                (selector, dropdownMenuSelector) => {
                    const dropdownSelector = document.querySelector(`${selector} .dropdown-toggle`)
                        ? `${selector} .dropdown-toggle`
                        : `${selector} .dropdown-manual`;

                    const menuSelector =
                        dropdownSelector === `${selector} .dropdown-manual`
                            ? dropdownMenuSelector
                            : `${selector} ${dropdownMenuSelector}`;
                    let isVisiableDropdown = document.querySelector(menuSelector).checkVisibility();

                    while (!isVisiableDropdown) {
                        document.querySelector(dropdownSelector).click();
                        isVisiableDropdown = document.querySelector(menuSelector).checkVisibility();
                    }
                    return isVisiableDropdown;
                },
                {},
                selector,
                dropdownMenuSelector
            );
        } catch (error) {
            throw new Error(`Error selectDropdown: ${error.message}`);
        }
    }

    /**
     * Selecting an element by text inside.
     * @param {String} text
     * @param {String} selector
     * @param {String} frameName
     * @param {number} delay
     * @returns {Promise<HTMLElement>}
     */
    async selectByText(text, selector, frameName = "frameEditor", delay = 0) {
        try {
            const clickElement = async (elementText, sel, delay) => {
                const elements = Array.from(document.querySelectorAll(sel));
                const element = elements.find((element) => element.textContent.trim() === elementText);
                if (element && element.checkVisibility()) {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    return element;
                }
            };
            const page = frameName === "none" ? this.page : this.frame;
            await page.waitForFunction(clickElement, { timeout: 5000 }, text, selector, delay);
            const element = await page.evaluateHandle(clickElement, text, selector, delay);
            await this.useDelay(element.click.bind(element), delay);
        } catch (error) {
            throw new Error(`Error in selectByText: ${error.message}`);
        }
    }

    /**
     * @callback userFunction
     */
    /**
     * Adding a user to simulate collaborative editing.
     * @param {userFunction} userFunction - async function
     */
    async attachUser(userFunction) {
        if (typeof userFunction !== "function") {
            throw new Error("Invalid user function provided");
        }

        const originalPage = this.page;
        const pageUrl = this.page.url();

        try {
            this.page = await this.browser.newPage();
            await this.page.goto(pageUrl);
            await this.waitEditor();
            await userFunction();
            await this.page.close();
        } catch (error) {
            throw new Error(`Error attachUser: ${error.message}`);
        } finally {
            this.page = originalPage;
        }
    }

    /**
     * Co-editing launch feature.
     * @returns {Collab}
     */
    startCollaboration() {
        this.collab = new Collab(this.config);
        return this.collab;
    }

    /**
     * @param {string} event - event name
     * @param {Function} callback
     */
    attachEvent(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    /**
     * @param {String} event
     * @param {Object} data
     * @param {*} data.any
     */
    dispatchEvent(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((elem) => {
                elem(data);
            });
        }
    }
    /**
     * @typedef {Object} ProcessOption
     * @property {string} processPath
     * @property {string | undefined} command - file launch commands
     * @property {Array} args
     */
    /**
     * Executes external scripts inside the Tester
     * @param {ProcessOption} processOption
     * @returns
     */
    async runExternal(processOption, tag = "[External Script]") {
        const externalStdoutFilePath = path.join(externalScriptLogDir, "stdout.txt");
        const externalErrorFilePath = path.join(externalScriptLogDir, "error.txt");
        const isAbsolute = path.isAbsolute(processOption.processPath);
        const fullProcessPath = isAbsolute
            ? processOption.processPath
            : path.join(workDirectory, processOption.processPath);

        const command = processOption.command ? `${processOption.command} ${fullProcessPath}` : fullProcessPath;

        const args = processOption.args || [];

        return new Promise((resolve) => {
            const childProcess = execFile(command, args, { shell: true }, (error, stdout, stderr) => {
                if (error) {
                    fs.appendFileSync(externalErrorFilePath, `${tag}[error]: ${error}\n`);
                }
                if (stdout) {
                    fs.appendFileSync(externalStdoutFilePath, `${tag}[stdout]: ${stdout}\n`);
                }
                if (stderr) {
                    fs.appendFileSync(externalErrorFilePath, `${tag}[error]: ${stderr}\n`);
                }
            });

            childProcess.on("close", async (code) => {
                const filePath = code === 1 ? externalErrorFilePath : externalStdoutFilePath;
                fs.appendFileSync(filePath, `${tag}[Code]: ${code}\n`);

                resolve();
            });
        });
    }

    /**
     * @typedef {Object} Macros
     * @property {string} name
     * @property {function(): undefined} value
     */
    /**
     * Adds macros to the Tester.
     * @param {Macros|Macros[]} macros - The macros or an array of macros to add.
     * @returns {Promise<void>}
     */
    async addMacros(macros) {
        const macrosArray = Array.isArray(macros) ? macros : [macros];

        macrosArray.forEach((currentMacros, index) => {
            if (!currentMacros.hasOwnProperty("name")) {
                currentMacros.name = `Macros ${index + 1}`;
            }
        });

        this.createMacrosObject(macrosArray);
        await this.addMacrosToEditor();
    }

    /**
     * Creates a macros object from the provided array of macros.
     * @param {Macros[]} macrosArray - The array of macros to format.
     */
    createMacrosObject(macrosArray) {
        const formattedMacrosArray = macrosArray.map((macros, index) => ({
            ...macros,
            value: `(${macros.value.toString()})();`,
            guid: `${index}`,
        }));

        const macrosForm = {
            macrosArray: formattedMacrosArray,
            current: formattedMacrosArray.length - 1,
        };

        this.macrosArrayObject = macrosForm;
    }

    /**
     * Adds macros to the editor.
     * @return {Promise<void>}
     */
    async addMacrosToEditor() {
        const macrosString = JSON.stringify(this.macrosArrayObject);
        await this.frame.evaluate((macrosString) => {
            const editor = Asc.editor;
            editor.pluginMethod_SetMacros(macrosString);
        }, macrosString);
    }

    /**
     * Executes a macro with the given name.
     * @param {string} macroName - The name of the macro to execute.
     * @return {Promise<void>}
     */
    async executeMacros(macroName) {
        const { guid } = this.macrosArrayObject.macrosArray.find((macro) => macro.name === macroName);

        if (guid) {
            await this.frame.evaluate((guid) => {
                const editor = Asc.editor;
                editor.asc_runMacros(guid);
            }, guid);
        }
    }

    /**
     * Parses items from a given list
     * @param {string} listSelector - Selector for the list container
     * @param {string} itemSelector - Selector for individual items
     * @param {string} descriptionSelector - Selector for the item description
     * @param {string|null} idSelector - Selector for element containing the ID (if null, uses main element's ID)
     * @returns {Promise<Array<Item>>}
     */
    async parseItems(listSelector, itemSelector, descriptionSelector, idSelector = null) {
        try {
            return await this.frame.evaluate(
                ({ listSelector, itemSelector, descriptionSelector, idSelector }) => {
                    return Array.from(document.querySelectorAll(listSelector)).map((element, index) => {
                        let description = "";
                        let id = "";

                        if (descriptionSelector) {
                            if (descriptionSelector === "[aria-label]") {
                                description = element.getAttribute("aria-label") || "";
                            } else {
                                description = element.querySelector(descriptionSelector)?.textContent || "";
                            }
                        } else {
                            description = element.textContent || "";
                        }

                        if (idSelector) {
                            const idElement = element.querySelector(idSelector);
                            id = idElement?.id ? `#${idElement.id}` : "";
                        } else {
                            id = element.id ? `#${element.id}` : "";
                        }
                        const className = element.className
                            ? `.${element.className.split(" ").join(".")}:nth-child(${index + 1})`
                            : `:nth-child(${index + 1})`;

                        const count = itemSelector ? element.querySelectorAll(itemSelector).length : 1;

                        return { description, count, index: index + 1, id, className };
                    });
                },
                { listSelector, itemSelector, descriptionSelector, idSelector }
            );
        } catch (error) {
            throw new Error(`parseItems: Failed to parse items from selector "${listSelector}". ${error.message}`, {
                cause: error,
            });
        }
    }

    async setOption(settingSelector, optionName, descriptionSelector = null) {
        try {
            await this.click(settingSelector);
            const listSelector = `${settingSelector} ul li`;
            const itemSelector = "a";
            let settings;

            if (descriptionSelector) {
                settings = await this.parseItems(listSelector, itemSelector, descriptionSelector);
            } else {
                settings = await this.parseItems(listSelector, itemSelector, itemSelector);
            }
            const targetOption = settings.find((item) => item.description === optionName);

            if (targetOption?.id) {
                await this.click(targetOption.id);
            } else {
                throw new Error(
                    `Error in Tester.setOption: Option ${optionName} with selector ${settingSelector} not found.`
                );
            }
        } catch (error) {
            throw new Error(`Failed to set option for ${settingSelector}: ${error}`);
        }
    }

    /**
     * Clicks an item based on its description and index
     * @param {string} description - The description of the item group
     * @param {number} id - The index of the item to click
     * @param {string} listSelector - Selector for the list container
     * @param {string} itemSelector - Selector for individual items
     * @param {string} descriptionSelector - Selector for the item description
     * @param {boolean} [isDropdown=false] - flag if element is dropdown
     */
    async clickItem(description, id, listSelector, itemSelector, descriptionSelector, isDropdown = false) {
        const items = await this.parseItems(listSelector, itemSelector, descriptionSelector);
        const item = items.find((i) => i.description === description);

        if (item) {
            if (!(id >= item.count)) {
                const targetGroupSelector = `${listSelector}:nth-child(${item.index})`;
                const targetItemSelector = `${targetGroupSelector} ${itemSelector}:nth-child(${id + 1})`;
                if (isDropdown) {
                    await this.click(targetGroupSelector);
                }
                await this.click(targetItemSelector);
            } else {
                throw new Error(
                    `Invalid id: ${id} for item with description "${description}". Maximum id is ${item.count - 1}`
                );
            }
        } else {
            throw new Error(`Item with description "${description}" not found`);
        }
    }

    /**
     * @returns {Promise<void>}
     */
    async close() {
        try {
            if (Object.keys(this.macrosArrayObject).length > 0) {
                await this.frame.evaluate(() => {
                    const editor = Asc.editor;
                    editor.pluginMethod_SetMacros("");
                });
            }

            if (this.collab) {
                await this.collab.close();
            }

            await this.closePage();

            if (this.browser) {
                const browserProcess = this.browser.process();
                try {
                    await this.browser.close();
                } catch (error) {
                    console.warn(`browser.close() failed: ${error.message}`);
                }

                if (browserProcess && browserProcess.pid) {
                    try {
                        process.kill(browserProcess.pid, 0);
                        console.warn(`Process ${browserProcess.pid} still alive, sending SIGKILL`);
                        process.kill(browserProcess.pid, "SIGKILL");
                    } catch (err) {
                        if (err.code !== "ESRCH") {
                            console.error(`Failed to kill process ${browserProcess.pid}: ${err.message}`);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error during close:", error);
            throw error;
        }
    }

    /**
     * Selects and deletes text.
     * @returns {Promise<void>}
     */
    async deleteText() {
        await this.keyDown("Control");
        await this.keyPress("A");
        await this.keyUp("Control");
        await this.keyPress("Backspace");
    }

    /**
     *  Gets selected text.
     * @returns {Promise<string>}
     */
    async getAllText() {
        await this.keyDown("Control");
        await this.keyPress("A");
        await this.keyUp("Control");

        const selectedText = await this.frame.evaluate(async () => {
            return window.Asc.editor.pluginMethod_GetSelectedText();
        });

        await this.keyPress("ArrowRight"); //Clear selection

        return selectedText;
    }

    /**
     * Verifies the provided input text against the currently selected text.
     * @param {string} text - The input text to be verified.
     * @returns {Promise<{ isMatch: boolean, inputText: string, selectedText: string }>}
     */
    async verifyInput(text) {
        try {
            if (typeof text !== "string") {
                throw new Error("Error: function argument is not a string.");
            }

            const selectedText = await this.getAllText();
            const trimmedText = text.trim();
            const trimmedSelectedText = selectedText.trim();

            const isMatch = trimmedSelectedText === trimmedText;

            return { isMatch, inputText: trimmedText, selectedText: trimmedSelectedText };
        } catch (error) {
            throw new Error(`Error in verifyInput: ${error.message}`);
        }
    }
}

const TEST_CONFIG = "%%CONFIG%%";
globalThis.testFileName = "%%FILE_NAME%%";
globalThis.initialTime = new Date("%%INIT_TIME%%").getDate();

async function readConfig(configPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(configPath, "utf8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const config = JSON.parse(data);
                    resolve(config);
                } catch (parseErr) {
                    reject(parseErr);
                }
            }
        });
    });
}

/**
 * Loads a provider addon and its configuration.
 * @param {string} addonName - The name of the addon file to load.
 * @returns {Promise<{CustomProviderAddonClass: Object|null, providerConfig: Object|null}>}
 * An object containing the loaded addon class and its configuration.
 * If the addonName is not provided or loading fails, returns an object with both properties set to null.
 */
async function loadProviderAddon(addonName) {
    if (addonName) {
        const addonPath = path.resolve(path.join(workDirectory, "providers", "index.js"));
        const addonFileUrl = url.pathToFileURL(addonPath).href;
        const module = await import(addonFileUrl);

        const providerAddonObj = module.default[addonName];
        const { provider, config } = providerAddonObj;
        return { CustomProviderAddonClass: provider, providerConfig: config };
    }
    return { CustomProviderAddonClass: null, providerConfig: null };
}

function deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
        if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

/**
 * Test script launch function.
 */
async function run() {
    try {
        const { provider } = TEST_CONFIG || {};
        const { CustomProviderAddonClass, providerConfig } = provider ? await loadProviderAddon(provider) : {};
        const mergedConfig = providerConfig ? deepMerge(TEST_CONFIG, providerConfig) : TEST_CONFIG;
        const regularTester = new TesterImp(mergedConfig, CustomProviderAddonClass);
        const proxyTester = createProxy(regularTester);
        globalThis.Tester = proxyTester;
        globalThis.RegularTester = regularTester;
        globalThis.TesterImp = TesterImp;
        console.log("Tester config:", Tester.config);
        await Tester.launch();
        await code.run(Tester);
        const duration = Math.round(performance.now() - globalThis.initialTime);
        const timestamp = formatTimestamp(duration);
        const endTime = Math.round(performance.now());
        const executionTime = endTime - globalThis.initialTime;
        await writeLog(`${timestamp} [end] [script] ${globalThis.testFileName} Duration ${executionTime}`);
    } catch (error) {
        const duration = Math.round(performance.now() - globalThis.initialTime);
        const timestamp = formatTimestamp(duration);
        const endTime = Math.round(performance.now());
        const executionTime = endTime - globalThis.initialTime;
        await writeLog(
            `${timestamp} [error] [script] ${globalThis.testFileName} Duration ${executionTime}.\n Error: ${error.stack}`
        );
        throw new Error(error.stack);
    }
}

async function runWithTimeout(timeoutMs = 300000) {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Script exceeded ${timeoutMs} timeout`)), timeoutMs);
    });

    try {
        return await Promise.race([run(), timeoutPromise]);
    } finally {
        clearTimeout(timer);
    }
}

runWithTimeout(300000).catch((err) => {
    console.error("Test failed with timeout:", err);
    process.exit(1);
});

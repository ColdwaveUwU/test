const CollaborationTab = require("../collaborationtab");
const selectors = require("./selectors.json");

class VersionHistory extends CollaborationTab {
    constructor(tester) {
        super(tester);
        this.currentIndex = 0;
    }

    #versionHistoryObj = null;
    /**
     * @enum
     */
    static VERSION_HISTORY_SELECTORS = selectors;

    static OPTION_ALIASES = {
        hide: "Hide detailed changes",
        highlight: "Highlight deleted",
    };

    async #waitVersionHistoryResponse() {
        const targetUrl = `${this.tester.url}/historyObj`;
        const responsePromise = new Promise((resolve) => {
            const handler = async (response) => {
                if (response.url().includes(targetUrl)) {
                    try {
                        const data = await response.json();
                        this.tester.page.off("response", handler);
                        resolve(data);
                    } catch (err) {
                        this.tester.page.off("response", handler);
                        resolve(null);
                    }
                }
            };

            this.tester.page.on("response", handler);
        });
        this.#versionHistoryObj = await responsePromise;
    }

    getVersionHistoryObj() {
        if (!this.providerAddon) {
            return this.#versionHistoryObj;
        } else {
            throw new Error("The versionHistoryObj is not in the provider");
        }
    }

    /**
     * Wait for frame history.
     */
    async #waitFrameHistory() {
        return new Promise((resolve) => {
            this.tester.page.once("frameattached", async (frame) => {
                try {
                    await frame.waitForNavigation({ waitUntil: "networkidle0" });
                    this.tester.changeCurrentFrame(frame);
                    resolve(frame);
                } catch (error) {
                    throw new Error(`Error while waiting for frame history: ${error}`);
                }
            });
        });
    }

    /**
     * Set options for version history.
     * @param {"Hide" | "Highlight"} [option] - Option to set.
     */
    async setOptions(option) {
        try {
            const selectedOption = VersionHistory.OPTION_ALIASES[option.toLowerCase()];
            await this.tester.click(selectors.HISTORY_DROPDOWN);
            await this.tester.selectByText(selectedOption, selectors.HISTORY_DROPDOWN_ITEM);
        } catch (error) {
            throw new Error(`setOptions: Failed to set version history option: "${option}".${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Open the history panel.
     */
    async openHistory() {
        if (!this.providerAddon) {
            await Promise.all([this.tester.click(selectors.ELEMENT_SELECTOR), this.#waitVersionHistoryResponse()]);
        } else {
            await this.tester.click(selectors.ELEMENT_SELECTOR);
        }
    }

    /**
     * Close the history panel.
     */
    async close() {
        await this.tester.click(selectors.HISTORY_CLOSE_BUTTON);
        await this.#waitFrameHistory();
    }

    /**
     * Review or restore a history record.
     * @param {number} [index] - Optional index to select directly. If omitted, moves to the next record.
     * @param {boolean} [restore=false] - If true, clicks the restore button for the selected record.
     */
    async reviewRecord(index, restore = false) {
        if (!this.#versionHistoryObj || typeof this.#versionHistoryObj.countVersion !== "number") {
            throw new Error("History object is not loaded or 'countVersion' is missing.");
        }

        const countVersion = this.#versionHistoryObj.countVersion;

        if (countVersion <= 1) {
            console.log(`Version history has ${countVersion} record(s); review skipped.`);
            return;
        }

        if (typeof index === "number") {
            if (index < 0 || index >= countVersion) {
                throw new Error(`Invalid index: ${index}. Expected 0 to ${countVersion - 1}.`);
            }
            this.currentIndex = index;
        } else {
            this.currentIndex = (this.currentIndex + 1) % countVersion;
        }

        const items = await this.tester.parseItems(
            selectors.HISTORY_LIST_SELECTOR,
            selectors.HISTORY_ITEM_SELECTOR,
            selectors.HISTORY_ITEM_DESCRIPTION
        );

        const selectedItem = items[this.currentIndex];
        await this.tester.click(selectedItem.id);

        if (restore) {
            const restoreBtnSelector = `${selectedItem.id} ${selectors.RESTORE_BUTTON}`;
            const hasRestoreButton = await this.tester.checkSelector(restoreBtnSelector);
            if (!hasRestoreButton) {
                throw new Error(`Restore not available for version: ${selectedItem.description}`);
            }
            await this.tester.click(restoreBtnSelector);
        }
    }
}

module.exports = VersionHistory;

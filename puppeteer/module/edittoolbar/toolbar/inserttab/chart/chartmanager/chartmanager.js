const InsertTab = require("../../inserttab");
const { ChartSelectors } = require("../../../../../../constants");

class ChartManager extends InsertTab {
    constructor(tester) {
        super(tester, ChartSelectors.BUTTON.CHART);
    }

    #mainFrame = "";

    async #openChartList() {
        try {
            await this.clickTargetButton();
        } catch (error) {
            throw new Error(`Failed to open chart list: ${error}`);
        }
    }

    async #waitFrameChart() {
        return new Promise((resolve) => {
            this.tester.page.once("frameattached", async (frame) => {
                try {
                    await frame.waitForNavigation({ waitUntil: "networkidle0" });
                    await frame.evaluate(() => {
                        if (!window.actionsCount) {
                            window.actionsCount = 0;
                        }
                    });
                    this.tester.changeCurrentFrame(frame);
                    resolve(frame);
                } catch (error) {
                    throw new Error(`Error while waiting for frame chart: ${error}`);
                }
            });
        });
    }

    async getChartList() {
        try {
            const listSelector = `${ChartSelectors.LIST} .grouped-data`;
            const itemSelector = ".item";
            const descriptionSelector = ".group-description span";
            return await this.tester.parseItems(listSelector, itemSelector, descriptionSelector);
        } catch (error) {
            throw new Error(`Failed to get chart list: ${error}`);
        }
    }

    async createChart(description, id) {
        try {
            this.#mainFrame = this.tester.getFrame();
            const waitFrame = this.#waitFrameChart();
            await this.#openChartList();

            const listSelector = `${ChartSelectors.LIST} .grouped-data`;
            const itemSelector = ".item";
            const descriptionSelector = ".group-description span";

            await this.tester.clickItem(description, id, listSelector, itemSelector, descriptionSelector);
            await waitFrame;
        } catch (error) {
            throw new Error(`Failed to click chart with description "${description}" and id "${id}": ${error}`);
        }
    }

    async addChart() {
        try {
            this.tester.changeCurrentFrame(this.#mainFrame);
            await this.tester.click(ChartSelectors.BUTTON.OK);
        } catch (error) {
            throw new Error(`Failed to add chart: ${error}`);
        }
    }
}

module.exports = ChartManager;

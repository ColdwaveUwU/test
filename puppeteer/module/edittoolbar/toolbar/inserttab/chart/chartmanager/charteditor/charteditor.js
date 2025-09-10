const { ChartSelectors, ChartType } = require("../../../../../../../constants");

const LayoutSettings = require("./layoutsettings");
const { HorAxisSettings, VertAxisSettings } = require("./axissettings");
const CellSnappingSettings = require("./cellsnappingsettings");
const AltTextSettings = require("./alttextsettings");

class ChartEditor {
    #isOpen = false;

    constructor(tester) {
        this.tester = tester || RegularTester;
    }

    /**
     * Opens editing chart settings
     */
    async #openEditChart() {
        if (this.tester.checkSelector(ChartSelectors.SETTINGS_MENU)) {
            const currFrame = this.tester.getFrame();
            await currFrame.click(ChartSelectors.BUTTON.EDIT);
            this.#isOpen = true;
        }
    }

    async #selectTab(tabSelector) {
        const curFrame = this.tester.getFrame();
        await Promise.all([
            curFrame.waitForFunction(
                (selector) => {
                    return document.querySelector(selector);
                },
                {},
                `${tabSelector} button[aria-pressed="true"]`
            ),
            this.tester.click(tabSelector),
        ]);
    }

    async setSetting(tabName, settings) {
        await this.#openEditChart();

        const handlers = {
            Layout: new LayoutSettings(this.tester),
            VerticalAxis: new VertAxisSettings(this.tester),
            HorizontalAxis: new HorAxisSettings(this.tester),
            CellSnapping: new CellSnappingSettings(this.tester),
            AltText: new AltTextSettings(this.tester),
        };

        const tabSelectors = {
            Layout: ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.LAYOUT,
            VerticalAxis: ChartSelectors.EDIT_CHART.V_AXIS.V_AXIS,
            HorizontalAxis: ChartSelectors.EDIT_CHART.H_AXIS.H_AXIS,
            CellSnapping: ChartSelectors.EDIT_CHART.CELL_SNAPPING.CELL_SNAPPING,
            AltText: ChartSelectors.EDIT_CHART.ALT_TEXT.ALT_TEXT,
        };

        const handler = handlers[tabName];
        if (handler) {
            await this.#selectTab(tabSelectors[tabName]);
            await handler.applySettings(settings);
        } else {
            throw new Error(`Unknown tab: ${tabName}`);
        }
    }

    async addSettings() {
        if (this.#isOpen) {
            await this.tester.click(ChartSelectors.EDIT_CHART.OK_BUTTON);
            await this.tester.sleep(1000); //todo change to event
            this.#isOpen = false;
        }
    }
}

module.exports = ChartEditor;

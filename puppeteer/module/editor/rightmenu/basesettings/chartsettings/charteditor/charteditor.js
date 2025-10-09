const selectors = require("./selectors.json");
const {
    createErrorHandler,
    createExecuteAction,
    createExecuteObjectAction,
} = require("../../../../../../engine/script/js/utils");
const { ModalButton, Button } = require("../../../../../elements");
const BaseSettings = require("../../basesettings");
const ChartData = require("./chartdata/chartdata");
const NumberFormatEditor = require("../charteditor/numberformateditor/numberformateditor");
const Functions = require("../../../../toolbar/hometab/functions");

/**
 * @typedef {"main" | "chart"} FrameType Frame type to switch to ("chart" or "main")
 */

/**
 * @typedef {Object} EditorSettings
 * @property {import("./chartdata/chartdata").ChartDataSettings} [chartData] - The chart data settings
 * @property {import("./numberformateditor/numberformateditor").NumberFormatSettings} [numberFormat] - The number format settings
 * @property {import("../../../../../edittoolbar/toolbar/hometab/functions/functions").FunctionsSettings} [functions] - The functions settings
 * @property {number} [clickUndo] - The number of times to click the undo button
 * @property {number} [clickRedo] - The number of times to click the redo button
 */

class ChartEditor extends BaseSettings {
    constructor(tester) {
        super(tester);
        this.frames = {};
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
        this.executeModalAction = createExecuteObjectAction(this.handleError);
        this.chartData = new ChartData(tester);
        this.numberFormat = new NumberFormatEditor(tester);
        this.functions = new Functions(tester);
    }

    static SELECTORS = selectors;

    static SETTINGS_MAP = {
        chartData: "setChartData",
        numberFormat: "setNumberFormat",
        functions: "setFunctionsSettings",
        clickUndo: "clickUndoButton",
        clickRedo: "clickRedoButton",
    };

    /**
     * Get the chart editor modal window
     * @returns {ModalButton}
     */
    get chartEditorModal() {
        if (!this._chartEditorModalWindow) {
            const selectors = ChartEditor.SELECTORS;
            this._chartEditorModalWindow = new ModalButton(
                this.tester,
                selectors.TOOLBAR.EDIT_DATA,
                selectors.MODAL_WINDOWS.CHART_EDITOR.WINDOW,
                selectors.MODAL_WINDOWS.CHART_EDITOR.CLOSE_BUTTON
            );
        }
        return this._chartEditorModalWindow;
    }

    /**
     * Sets the editor settings
     * @param {EditorSettings} settings - The settings to set
     */
    async setEditorSettings(settings) {
        await this.openEditor();
        await this.setSettingsByMap(settings, ChartEditor.SETTINGS_MAP);
    }

    /**
     * Clicks the undo button
     * @param {number} clickCount - The number of times to click the undo button
     */
    async clickUndoButton(clickCount = 1) {
        const selector = ChartEditor.SELECTORS.TOOLBAR.UNDO_BUTTON;
        await this.openEditor();
        await this.#executeAction(Button, selector, "click", "clickUndoButton", "chart", [clickCount]);
    }

    /**
     * Clicks the redo button
     * @param {number} clickCount - The number of times to click the redo button
     */
    async clickRedoButton(clickCount = 1) {
        const selector = ChartEditor.SELECTORS.TOOLBAR.REDO_BUTTON;
        await this.openEditor();
        await this.#executeAction(Button, selector, "click", "clickRedoButton", "chart", [clickCount]);
    }

    /**
     * Sets functions settings
     * @param {import("../../../../../edittoolbar/toolbar/hometab/functions/functions").FunctionsSettings} settings - Functions settings
     */
    async setFunctionsSettings(settings) {
        await this.openEditor();
        await this.#changeFrame("chart");
        await this.functions.setSettings(settings);
    }

    /**
     * Opens editing chart settings
     */
    async openEditor() {
        await this.#executeModalAction(this.chartEditorModal, "openModal", "openEditor");
        await this.initializeFrame();
    }

    /**
     * Checks if the chart editor modal window is open
     * @returns {Promise<boolean>} True if the chart editor modal window is open, false otherwise
     */
    async isEditorOpen() {
        return await this.#executeModalAction(this.chartEditorModal, "isModalOpen", "isEditorOpen");
    }

    /**
     * Closes the chart editor modal window
     */
    async closeEditor() {
        await this.#executeModalAction(this.chartEditorModal, "closeModal", "closeEditor");
    }

    /**
     * Sets number format settings
     * @param {import("./numberformateditor/numberformateditor").NumberFormatSettings} settings - Number format settings
     */
    async setNumberFormat(settings) {
        await this.openEditor();
        await this.#changeFrame("chart");
        await this.numberFormat.setSettings(settings);
    }

    /**
     * Set chart data settings
     * @param {import("./chartdata").ChartDataSettings} settings - Chart data settings
     */
    async setChartData(settings) {
        await this.openEditor();
        await this.#changeFrame("chart");
        await this.chartData.setChartData(settings);
    }

    /**
     * Initialize frame handling for chart operations
     */
    async initializeFrame() {
        try {
            this.#mainFrame() || this.#mainFrame(this.tester.getFrame());
            this.#chartFrame() || (await this.#waitFrameChart());
            await this.resizeEditorWindow();
        } catch (error) {
            this.handleError("initializeFrame", error, "Failed to initialize frame");
        }
    }

    /**
     * Resizes the editor window
     */
    async resizeEditorWindow() {
        const selectors = ChartEditor.SELECTORS.MODAL_WINDOWS.CHART_EDITOR;
        const methodName = "resizeEditorWindow";
        await this.#executeModalAction(this.chartEditorModal, "moveWindow", methodName, [
            selectors.POSITION.LEFT,
            selectors.POSITION.TOP,
        ]);
        await this.#executeModalAction(this.chartEditorModal, "resizeWindow", methodName, [
            selectors.SIZE.WIDTH,
            selectors.SIZE.HEIGHT,
        ]);
    }

    /**
     * Universal method for executing modal actions with error handling
     * @param {string} action - Modal action to execute
     * @param {string} methodName - Name of the calling method for error handling
     * @param {Array} actionParams - Parameters to pass to the action method
     * @param {ModalButton} modalButton - Modal button to execute the action on
     * @param {FrameType} frame - Frame to execute the action on
     * @returns {Promise<any>} Result of the action
     */
    async #executeModalAction(modalButton, action, methodName, actionParams = [], frame = "main") {
        await this.#changeFrame(frame);
        return await this.executeModalAction(modalButton, action, methodName, actionParams);
    }

    /**
     * Universal method for executing actions on elements with error handling
     * @param {string} elementClass Element class to instantiate (Button, DropdownInput, etc.)
     * @param {string} selector Selector for the element
     * @param {string} action Action method to call on the element
     * @param {string} methodName Name of the calling method for error handling
     * @param {FrameType} frame - Frame to execute the action on
     * @param {Array} actionParams Parameters to pass to the action method
     * @param {Array} constructorParams Constructor parameters for the element
     * @returns {Promise<any>} Result of the action
     */
    async #executeAction(
        elementClass,
        selector,
        action,
        methodName,
        frame = "main",
        actionParams = [],
        constructorParams = []
    ) {
        this.#changeFrame(frame);
        return await this.executeAction(elementClass, selector, action, methodName, actionParams, constructorParams);
    }

    /**
     * Get or set main frame
     * @param {Frame} [frame] - Frame to set, if not provided returns current frame
     * @returns {Frame} Current main frame
     */
    #mainFrame(frame) {
        return frame !== undefined ? (this.frames.mainFrame = frame) : this.frames.mainFrame;
    }

    /**
     * Get or set chart frame
     * @param {Frame} [frame] - Frame to set, if not provided returns current frame
     * @returns {Frame} Current chart frame
     */
    #chartFrame(frame) {
        return frame !== undefined ? (this.frames.chartFrame = frame) : this.frames.chartFrame;
    }

    /**
     * Changes the current frame to the specified frame type
     * @param {FrameType} frameType - Frame type to switch to ("chart" or "main")
     */
    #changeFrame(frameType) {
        try {
            const frame = frameType.toLowerCase();
            if (!frameType || !["chart", "main"].includes(frame)) {
                throw new Error(`Invalid frame type: ${frameType} - should be "chart" or "main"`);
            }
            const targetFrame = frame === "chart" ? this.#chartFrame() : this.#mainFrame();
            if (targetFrame && this.tester.frame !== targetFrame) {
                this.tester.changeCurrentFrame(targetFrame);
            }
        } catch (error) {
            this.handleError("changeFrame", error);
        }
    }

    /**
     * Wait for chart frame to be attached and ready
     * @returns {Promise<Frame>} Chart frame instance
     */
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
                    this.#chartFrame(frame);
                    resolve(frame);
                } catch (error) {
                    this.handleError("waitFrameChart", error);
                }
            });
        });
    }
}

module.exports = ChartEditor;

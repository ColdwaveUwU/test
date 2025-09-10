const selectors = require("./selectors.json");
const { Button } = require("../../elements");
class AppTitle {
    constructor(tester) {
        this.tester = tester || RegularTester;
    }

    static SELECTORS = selectors;

    /**
     * Click undo button
     */
    async clickUndoButton() {
        const undoButtonSelector = AppTitle.SELECTORS.UNDO_BUTTON;
        const undoButton = new Button(this.tester, undoButtonSelector);
        try {
            await undoButton.click();
        } catch (error) {
            throw new Error(
                `clickUndoButton: Failed to click undo button with selector"${undoButtonSelector}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Click redo button
     */
    async clickRedoButton() {
        const redoButtonSelector = AppTitle.SELECTORS.REDO_BUTTON;
        const redoButton = new Button(this.tester, redoButtonSelector);
        try {
            await redoButton.click();
        } catch (error) {
            throw new Error(
                `clickRedoButton: Failed to click redo button with selector"${redoButtonSelector}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Click save button
     */
    async clickSaveButton() {
        const saveButtonSelector = AppTitle.SELECTORS.SAVE_BUTTON;
        const saveButton = new Button(this.tester, saveButtonSelector);
        try {
            await saveButton.click();
        } catch (error) {
            throw new Error(
                `clickSaveButton: Failed to click save button with selector"${saveButtonSelector}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    // /**
    //  * Click print button - todo
    //  */
    // async clickPrintButton() {
    //     const printButtonSelector = AppTitle.SELECTORS.PRINT_BUTTON;
    //     try {
    //         const waitDownloadPrintFile = this.tester.handleFileDownload();
    //         await this.tester.click(printButtonSelector);
    //         await waitDownloadPrintFile;
    //     } catch (error) {
    //         throw new Error(
    //             `clickPrintButton: Failed to click print button with selector"${printButtonSelector}". ${error.message}`,
    //             {
    //                 cause: error,
    //             }
    //         );
    //     }
    // }
}

module.exports = AppTitle;

const ViewTab = require("../viewtab");
const Plugin = require("../../plugins/plugin");
const selectors = require("./selectors.json");
const { Input, OptionsButton, ModalButton, Checkbox } = require("../../../../elements");
const { MoreButtons } = require("../../common");

class Macros extends ViewTab {
    constructor(tester) {
        super(tester);
        this.plugin = tester ? new Plugin(tester) : new Plugin();
        this.macrosModalButton = new ModalButton(
            this.tester,
            Macros.SELECTORS.TOOLBAR.MACROS_BUTTON,
            Macros.SELECTORS.MACROS_DIALOG.MACROS_WINDOW
        );
    }

    static SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        AI_BUTTON: ["Create from description", "Convert from VBA"],
    };

    /**
     * Sets the option for the AI button.
     * Before using this method, you must configure and enable the AI plugin in the “Plugins” tab
     * @param { "Create from description" | "Convert from VBA" } optionValue The value of the option to set.
     */
    async aiButton(optionValue) {
        const aiModalButton = new ModalButton(this.tester, "", Macros.SELECTORS.MACROS_DIALOG.MACROS_AI_DIALOG);
        this.#changeFrameToEditor();
        try {
            await Promise.all([this.#getAiButton().setOption(optionValue), aiModalButton.isModalOpen()]);
        } catch (error) {
            this.#handleError("aiButton", error);
        }
    }

    /**
     * Converts a VBA macro to a macro script.
     * Before using this method, you must configure and enable the AI plugin in the “Plugins” tab
     * @param {string} vbaCode The VBA code to convert.
     */
    async aiConvertFromVba(vbaCode) {
        try {
            const dialogSelectors = Macros.SELECTORS.MACROS_DIALOG;
            await this.aiButton("Convert from VBA");

            this.#changeFrameToEditorPlugin();
            const input = new Input(this.tester, dialogSelectors.MACROS_SCRIPT_INPUT_VBA, false, "");
            await input.set(vbaCode.trim(), 100, false);

            this.#changeFrameToEditor();
            await this.tester.click(dialogSelectors.CREATE_BUTTON);
        } catch (error) {
            this.#handleError("aiConvertFromVba", error);
        }
    }

    /**
     * Creates a macro from a description.
     * Before using this method, you must configure and enable the AI plugin in the “Plugins” tab
     * @param {string} description The description of the macro to create.
     */
    async aiCreateFromDescription(description) {
        try {
            const dialogSelectors = Macros.SELECTORS.MACROS_DIALOG;
            await this.aiButton("Create from description");

            const input = new Input(this.tester, dialogSelectors.AI_CREATE_FROM_DESCRIPTION_DIALOG_INPUT, false, "");
            await input.set(description.trim(), 100, true);
            await this.tester.click(dialogSelectors.CREATE_BUTTON);
        } catch (error) {
            this.#handleError("aiCreateFromDescription", error);
        }
    }

    /**
     * Opens the Macros dialog.
     */
    async openMacros() {
        try {
            const moreButtons = new MoreButtons(this.tester);
            await moreButtons.open();

            const promise = this.plugin.waitFramePlugin();
            this.plugin.frames.frameEditor = this.tester.frame;
            await this.macrosModalButton.openModal();
            await promise;
        } catch (error) {
            this.#handleError("openMacros", error);
        }
    }

    /**
     * Sets the autostart condition for a macro.
     * @param {boolean} condition The condition to set the autostart to.
     */
    async setMacrosAutostart(condition) {
        this.#changeFrameToEditor();
        const selector = Macros.SELECTORS.MACROS_DIALOG.MACROS_AUTOSTART_CHECKBOX;

        try {
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            this.#handleError("setMacrosAutostart", error);
        }
    }

    /**
     * Undoes the last action.
     */
    async undo() {
        this.#changeFrameToEditor();
        try {
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.UNDO_BUTTON);
        } catch (error) {
            this.#handleError("undo", error);
        }
    }

    /**
     * Redoes the last action.
     */
    async redo() {
        this.#changeFrameToEditor();
        try {
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.REDO_BUTTON);
        } catch (error) {
            this.#handleError("redo", error);
        }
    }

    /**
     * Debugs the current macro.
     */
    async debug() {
        this.#changeFrameToEditor();
        try {
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.DEBUG_BUTTON);
        } catch (error) {
            this.#handleError("debug", error);
        }
    }

    /**
     * Copies a macro by its name from the list of macros.
     * @param {string} name The name of the macro to copy.
     */
    async copyMacros(name = null) {
        if (name) {
            await this.selectMacrosByName(name);
        } else {
            this.#changeFrameToEditor();
        }

        try {
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.COPY_BUTTON);
        } catch (error) {
            this.#handleError("copyMacros", error);
        }
    }

    /**
     * Deletes a macro by its name from the list of macros.
     * @param {string} name The name of the macro to delete.
     */
    async deleteMacros(name = null) {
        if (name) {
            await this.selectMacrosByName(name);
        } else {
            this.#changeFrameToEditor();
        }

        try {
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.DELETE_MACRO_BUTTON);
        } catch (error) {
            this.#handleError("deleteMacros", error);
        }
    }

    /**
     * Deletes a custom function by its name from the list of custom functions. (For CSE)
     * @param {string} name The name of the custom function to delete.
     */
    async deleteCustomFunction(name = null) {
        await this.selectCustomFunction(name);
        try {
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.DELETE_MACRO_BUTTON);
        } catch (error) {
            this.#handleError("deleteCustomFunction", error);
        }
    }

    /**
     * Renames a macro by its name from the list of macros.
     * @param {string} oldName The old name of the macro to rename.
     * @param {string} newName The new name of the macro.
     */
    async renameMacros(oldName, newName) {
        await this.selectMacrosByName(oldName);
        try {
            await this.#renameDialog(newName);
        } catch (error) {
            this.#handleError("renameMacros", error);
        }
    }

    /**
     * Renames a custom function by its name from the list of custom functions. (For CSE)
     * @param {string} oldName The old name of the custom function to rename.
     * @param {string} newName The new name of the custom function.
     */
    async renameCustomFunction(oldName, newName) {
        await this.selectCustomFunction(oldName);
        try {
            await this.#renameDialog(newName);
        } catch (error) {
            this.#handleError("renameCustomFunction", error);
        }
    }

    /**
     * Selects a macro by its name from the list of macros.
     * @param {string} name The name of the macro to select.
     */
    async selectMacrosByName(name) {
        try {
            this.#changeFrameToEditor();
            await this.tester.selectByText(name, Macros.SELECTORS.MACROS_DIALOG.MACROS_LIST);
        } catch (error) {
            this.#handleError("selectMacrosByName", error);
        }
    }

    /**
     * Cancels the Macros dialog.
     */
    async cancelMacros() {
        try {
            this.#changeFrameToEditor();
            await this.macrosModalButton.closeModal(Macros.SELECTORS.MACROS_DIALOG.CANCEL_MACROS_BUTTON);
        } catch (error) {
            this.#handleError("cancelMacros", error);
        }
    }

    /**
     * Adds a new macro by clicking the add button.
     */
    async addMacros() {
        try {
            this.#changeFrameToEditor();
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.ADD_MACRO_BUTTON);
        } catch (error) {
            this.#handleError("addMacros", error);
        }
    }

    /**
     * Adds a custom function to the Macros dialog (For CSE).
     */
    async addCustomFunction() {
        try {
            this.#changeFrameToEditor();
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.ADD_CUSTOM_FUNCTION_BUTTON);
        } catch (error) {
            this.#handleError("addCustomFunction", error);
        }
    }

    /**
     * Selects a custom function by its name from the list of custom functions. (For CSE)
     * @param {string} name The name of the custom function to select.
     */
    async selectCustomFunction(name) {
        try {
            this.#changeFrameToEditor();
            await this.tester.selectByText(name, Macros.SELECTORS.MACROS_DIALOG.CUSTOM_FUNCTION_LIST);
        } catch (error) {
            this.#handleError("selectCustomFunction", error);
        }
    }

    /**
     * Saves the current macro by clicking the save button.
     */
    async saveMacros() {
        try {
            this.#changeFrameToEditor();
            await this.macrosModalButton.closeModal(Macros.SELECTORS.MACROS_DIALOG.OK_MACROS_BUTTON);
        } catch (error) {
            this.#handleError("saveMacros", error);
        }
    }

    /**
     * Runs the selected macro by clicking the run button.
     * @param {string} name The name of the macro to run.
     */
    async runMacros(name = null) {
        if (name) {
            await this.selectMacrosByName(name);
        } else {
            this.#changeFrameToEditor();
        }

        try {
            await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.RUN_MACRO_BUTTON);
        } catch (error) {
            this.#handleError("runMacros", error);
        }
    }

    /**
     * Inputs a script into the Macros dialog.
     * @param {string} script The script to be inputted into the Macros dialog.
     * @param {boolean} clearInput - clear input before entering text (default: true)
     */
    async inputScript(script, clearInput = true) {
        this.#changeFrameToEditorPlugin();
        try {
            const input = new Input(this.tester, Macros.SELECTORS.MACROS_DIALOG.MACROS_SCRIPT_INPUT, false, "");
            await input.set(script.trim(), 100, clearInput);
        } catch (error) {
            this.#handleError("inputScript", error);
        }
    }

    /**
     * Rename dialog for macros and custom functions.
     * @param {string} newName The new name of the macro.
     */
    async #renameDialog(newName) {
        await this.tester.click(Macros.SELECTORS.MACROS_DIALOG.RENAME_BUTTON);
        const input = new Input(this.tester, Macros.SELECTORS.MACROS_DIALOG.RENAME_MACRO_INPUT);
        await input.set(newName);
    }

    /**
     * Changes the current frame to the editor frame.
     */
    #changeFrameToEditor() {
        try {
            if (this.tester.frame !== this.plugin.frames.frameEditor) {
                this.tester.changeCurrentFrame(this.plugin.frames.frameEditor);
            }
        } catch (error) {
            this.#handleError("changeFrameToEditor", error);
        }
    }

    /**
     * Changes the current frame to the editor plugin frame.
     */
    #changeFrameToEditorPlugin() {
        try {
            if (this.tester.frame !== this.plugin.frames.frameEditorPlugin) {
                this.tester.changeCurrentFrame(this.plugin.frames.frameEditorPlugin);
            }
        } catch (error) {
            this.#handleError("changeFrameToEditorPlugin", error);
        }
    }

    /**
     * Returns OptionsButton instance for AI Button
     * @returns {OptionsButton} - OptionsButton instance for AI Button
     */
    #getAiButton() {
        const aiButtonSelectors = Macros.SELECTORS.MACROS_DIALOG.AI_BUTTON;
        return new OptionsButton(this.tester, aiButtonSelectors.ELEMENT_SELECTOR, aiButtonSelectors.DEFAULT_BUTTON, {
            elementsSelector: aiButtonSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            elementsValue: Macros.TYPES.AI_BUTTON,
        });
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`Macros.${methodName}: ${error.message}`, { cause: error });
    }
}

module.exports = Macros;

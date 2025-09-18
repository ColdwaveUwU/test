const LayoutTab = require("../layouttab");
const { Dropdown, Input, Checkbox } = require("../../../../elements");
const selectors = require("./selectors.json");

class PageColumns extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static PAGE_COLUMNS_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        PAGE_COLUMNS_TYPES: ["One", "Two", "Three", "Left", "Right", "Custom columns"],
    };

    /**
     * Select page columns option from dropdown menu
     * @param {"One" | "Two" | "Three" | "Left" | "Right" | "Custom columns"} [optionValue]
     */
    async setColumns(optionValue) {
        try {
            const columnsMenuSelectors = PageColumns.PAGE_COLUMNS_SELECTORS.PAGE_COLUMNS_MENU;
            const columnsDropdown = new Dropdown(this.tester, {
                selector: columnsMenuSelectors.MENU_SELECTOR,
                elementsValue: PageColumns.TYPES.PAGE_COLUMNS_TYPES,
                elementsSelector: columnsMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: columnsMenuSelectors.DESCRIPTION_SELECTOR,
            });

            await columnsDropdown.selectDropdownItem(optionValue);
        } catch (error) {
            throw new Error(`setColumns: Failed to set columns "${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Open custom columns window
     */
    async openCustomColumnsWindow() {
        const customColumnsWindowSelector = PageColumns.PAGE_COLUMNS_SELECTORS.CUSTOM_COLUMNS.WINDOW;
        try {
            await this.setColumns("Custom columns");
            await this.tester.checkSelector(customColumnsWindowSelector);
        } catch (error) {
            throw new Error(
                `openCustomColumnsWindow: Failed to open custom columns window "${customColumnsWindowSelector}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Set custom columns settings
     */
    async setCustomColumns() {
        try {
            await this.openCustomColumnsWindow();
        } catch (error) {
            throw new Error(`setCustomColumns: Failed to set custom columns. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set number of columns
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} columnsNumberSettings
     */
    async setNumberOfColumns(columnsNumberSettings) {
        const numberOfColumnsInputSelector = PageColumns.PAGE_COLUMNS_SELECTORS.CUSTOM_COLUMNS.NUMBER_OF_COLUMNS_INPUT;
        try {
            const numberOfColumnsInput = new Input(this.tester, numberOfColumnsInputSelector, false);

            await numberOfColumnsInput.setInputSettings(columnsNumberSettings);
        } catch (error) {
            throw new Error(
                `setNumberOfColumns: Failed to set number of columns ${numberOfColumnsInputSelector} with settings ${columnsNumberSettings}. ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Set "Equal column width" checkbox
     * @param {boolean} [condition]
     */
    async setEqualColumnWidth(condition) {
        const equalColumnWidthSelector = PageColumns.PAGE_COLUMNS_SELECTORS.CUSTOM_COLUMNS.EQUAL_COLUMN_WIDTH_CHECKBOX;
        try {
            const checkbox = new Checkbox(this.tester, equalColumnWidthSelector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `setEqualColumnWidth: Failed to set equal column width ${equalColumnWidthSelector} with settings ${condition}. ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Set "Column divider" checkbox
     * @param {boolean} [condition]
     */
    async setColumnDivider(condition) {
        const columnDividerSelector = PageColumns.PAGE_COLUMNS_SELECTORS.CUSTOM_COLUMNS.COLUMN_DIVIDER_CHECKBOX;
        try {
            const checkbox = new Checkbox(this.tester, columnDividerSelector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `setColumnDivider: Failed to set column divider ${columnDividerSelector} with settings ${condition}. ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Set column width and spacing
     * @param {number} columnNumber - The column number
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} width
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} spacing
     */
    async setColumn(columnNumber, width, spacing) {
        const customColumnsSelectors = PageColumns.PAGE_COLUMNS_SELECTORS.CUSTOM_COLUMNS;
        try {
            if (width) {
                const columnWidthInputSelector = `${customColumnsSelectors.COLUMN_WIDTH_INPUT}${columnNumber - 1}`;
                const columnWidthInput = new Input(this.tester, columnWidthInputSelector);
                try {
                    await columnWidthInput.setInputSettings(width);
                } catch (error) {
                    throw new Error(
                        `Failed to set input settings ${columnWidthInputSelector} with settings ${width}. ${error.message}`,
                        {
                            cause: error,
                        }
                    );
                }
            }

            if (spacing) {
                const columnSpacingInputSelector = `${customColumnsSelectors.COLUMN_SPACING_INPUT}${columnNumber - 1}`;
                const columnSpacingInput = new Input(this.tester, columnSpacingInputSelector);
                try {
                    await columnSpacingInput.setInputSettings(spacing);
                } catch (error) {
                    throw new Error(
                        `Failed to set input settings ${columnSpacingInputSelector} with settings ${spacing}. ${error.message}`,
                        {
                            cause: error,
                        }
                    );
                }
            }
        } catch (error) {
            throw new Error(
                `setColumn: Failed to set column columnNumber: ${columnNumber}, width: ${width}, spacing: ${spacing}. ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Set columns settings
     * @param {Array<{
     *     number: number,
     *     width: { upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string },
     *     spacing: { upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }
     * }>} columnsSettings
     */
    async setColumnsSettings(columnsSettings) {
        try {
            for (let i = 0; i < columnsSettings.length; i++) {
                await this.setColumn(columnsSettings[i].number, columnsSettings[i].width, columnsSettings[i].spacing);
            }
        } catch (error) {
            throw new Error(`setColumnsSettings: Failed to set column settings: ${columnsSettings}. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Apply settings in Columns window
     * @param {Object} customColumnsSettings
     */
    async applySettings(customColumnsSettings) {
        try {
            const settingsMap = {
                numberOfColumns: this.setNumberOfColumns.bind(this),
                equalColumnWidth: this.setEqualColumnWidth.bind(this),
                columnDivider: this.setColumnDivider.bind(this),
                columns: this.setColumnsSettings.bind(this),
            };

            for (const [key, method] of Object.entries(settingsMap)) {
                if (key in customColumnsSettings) {
                    await method(customColumnsSettings[key]);
                }
            }
        } catch (error) {
            throw new Error(`applySettings: Failed to apply settings: ${customColumnsSettings}. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click OK button in Columns window
     */
    async clickOkButton() {
        try {
            await this.tester.click(PageColumns.PAGE_COLUMNS_SELECTORS.CUSTOM_COLUMNS.OK_BUTTON);
        } catch (error) {
            throw new Error(`clickOkButton: Failed to click ok button. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = PageColumns;

const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Checkbox } = require("../../../../../elements");
/**
 * @typedef {Object} HorizontalAlignmentSettings
 * @property {"Left" | "Center" | "Right"} [align]- The alignment for the horizontal position
 * @property {"Character" | "Column" | "Left margin" | "Margin" | "Page" | "Right margin"} [relativeTo] - The relative to for the horizontal position
 */

/**
 * @typedef {Object} HorizontalPositionSettings
 * @property {number} value - The value for the horizontal position
 * @property {"Character" | "Column" | "Left margin" | "Margin" | "Page" | "Right margin"} toTheRightOf - The to the right of for the horizontal position
 */

/**
 * @typedef {Object} HorizontalRelativeSettings
 * @property {number} value - The value for the horizontal relative position
 * @property {"Left margin" | "Margin" | "Page" | "Right margin"} relativeTo - The relative to for the horizontal relative position
 */

/**
 * @typedef {Object} VerticalAlignmentSettings
 * @property {"Top" | "Center" | "Bottom"} align - The alignment for the vertical position
 * @property {"Line" | "Margin" | "Bottom margin" | "Paragraph" | "Page" | "Top margin"} relativeTo - The relative to for the vertical position
 */

/**
 * @typedef {Object} VerticalPositionSettings
 * @property {number} value - The value for the vertical position
 * @property {"Line" | "Margin" | "Bottom margin" | "Paragraph" | "Page" | "Top margin"} below - The below for the vertical position
 */

/**
 * @typedef {Object} VerticalRelativeSettings
 * @property {number} value - The value for the vertical relative position
 * @property {"Margin" | "Bottom margin" | "Page" | "Top margin"} relativeTo - The relative to for the vertical relative position
 */

/**
 * @typedef {Object} OptionsSettings
 * @property {boolean} moveObjectWithText - The move object with text checkbox
 * @property {boolean} allowOverlap - The allow overlap checkbox
 */

/**
 * @typedef {Object} ApplySettings
 * @property {Object} [horizontal] - Settings for horizontal positioning.
 * @property {HorizontalAlignmentSettings} [horizontal.alignment] - Horizontal alignment settings.
 * @property {HorizontalPositionSettings} [horizontal.position] - Horizontal position settings.
 * @property {HorizontalRelativeSettings} [horizontal.relative] - Horizontal relative position settings.
 * @property {Object} [vertical] - Settings for vertical positioning.
 * @property {VerticalAlignmentSettings} [vertical.alignment] - Vertical alignment settings.
 * @property {VerticalPositionSettings} [vertical.position] - Vertical position settings.
 * @property {VerticalRelativeSettings} [vertical.relative] - Vertical relative position settings.
 * @property {OptionsSettings} [options] - Additional options for positioning.
 */

class PositionSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    static POSITION_SELECTORS = selectors;

    /**
     * Set the alignment for the horizontal position
     * @param {HorizontalAlignmentSettings} settings - The settings to set
     */
    async setHorizontalAlignment(settings) {
        try {
            const { align, relativeTo } = settings;
            const selector = PositionSettings.POSITION_SELECTORS.HORIZONTAL.ALIGMENT;

            const checkbox = new Checkbox(this.tester, selector.CHECKBOX);
            await checkbox.set(true);

            if (align) {
                await this.tester.click(selector.DROPDOWN);
                await this.tester.selectByText(align, selector.DROPDOWN_ELEMENTS);
            }
            if (relativeTo) {
                await this.tester.click(selector.RELATIVE_DROPDOWN);
                await this.tester.selectByText(relativeTo, selector.RELATIVE_ELEMENTS);
            }
        } catch (error) {
            throw new Error(`setHorizontalAlignment: Failed to set horizontal alignment. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set the position for the horizontal position
     * @param {HorizontalPositionSettings} [settings] - The settings to set
     */
    async setHorizontalPosition(settings) {
        try {
            const { value, toTheRightOf, increment, decrement } = settings;
            const selector = PositionSettings.POSITION_SELECTORS.HORIZONTAL.POSTION;

            const checkbox = new Checkbox(this.tester, selector.CHECKBOX);
            await checkbox.set(true);

            if (value) {
                await this.tester.inputToForm(value, selector.FIELD);
            }
            if (toTheRightOf) {
                await this.tester.click(selector.DROPDOWN);
                await this.tester.selectByText(toTheRightOf, selector.DROPDOWN_ELEMENTS);
            }
            if (increment || decrement) {
                await this.#modifyValueByStep(selector.FIELD, settings);
            }
        } catch (error) {
            throw new Error(`setHorizontalPosition: Failed to set horizontal position. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set the relative position for the horizontal position
     * @param {HorizontalRelativeSettings} [settings] - The settings to set
     */
    async setHorizontalRelative(settings) {
        try {
            const { value, relativeTo, increment, decrement } = settings;
            const selector = PositionSettings.POSITION_SELECTORS.HORIZONTAL.RELATIVE;

            const checkbox = new Checkbox(this.tester, selector.CHECKBOX);
            await checkbox.set(true);

            if (value) {
                await this.tester.inputToForm(value, selector.FIELD);
            }
            if (relativeTo) {
                await this.tester.click(selector.DROPDOWN);
                await this.tester.selectByText(relativeTo, selector.DROPDOWN_ELEMENTS);
            }
            if (increment || decrement) {
                await this.#modifyValueByStep(selector.FIELD, settings);
            }
        } catch (error) {
            throw new Error(`setHorizontalRelative: Failed to set horizontal relative. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set the alignment for the vertical position
     * @param {VerticalAlignmentSettings} [settings] - The settings to set
     */
    async setVerticalAlignment(settings) {
        try {
            const { align, relativeTo } = settings;
            const selector = PositionSettings.POSITION_SELECTORS.VERTICAL.ALIGMENT;

            const checkbox = new Checkbox(this.tester, selector.CHECKBOX);
            await checkbox.set(true);

            if (align) {
                await this.tester.click(selector.DROPDOWN);
                await this.tester.selectByText(align, selector.DROPDOWN_ELEMENTS);
            }
            if (relativeTo) {
                await this.tester.click(selector.RELATIVE_DROPDOWN);
                await this.tester.selectByText(relativeTo, selector.RELATIVE_ELEMENTS);
            }
        } catch (error) {
            throw new Error(`setVerticalAlignment: Failed to set vertical alignment. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set the position for the vertical position
     * @param {VerticalPositionSettings} [settings] - The settings to set
     */
    async setVerticalPosition(settings) {
        try {
            const { value, below, increment, decrement } = settings;
            const selector = PositionSettings.POSITION_SELECTORS.VERTICAL.POSTION;

            const checkbox = new Checkbox(this.tester, selector.CHECKBOX);
            await checkbox.set(true);

            if (value) {
                await this.tester.inputToForm(value, selector.FIELD);
            }
            if (below) {
                await this.tester.click(selector.DROPDOWN);
                await this.tester.selectByText(below, selector.DROPDOWN_ELEMENTS);
            }
            if (increment || decrement) {
                await this.#modifyValueByStep(selector.FIELD, settings);
            }
        } catch (error) {
            throw new Error(`setVerticalPosition: Failed to set vertical position. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set the relative position for the vertical position
     * @param {VerticalRelativeSettings} [settings] - The settings to set
     */
    async setVerticalRelative(settings) {
        try {
            const { value, relativeTo, increment, decrement } = settings;
            const selector = PositionSettings.POSITION_SELECTORS.VERTICAL.RELATIVE;

            const checkbox = new Checkbox(this.tester, selector.CHECKBOX);
            await checkbox.set(true);

            if (value) {
                await this.tester.inputToForm(value, selector.FIELD);
            }
            if (relativeTo) {
                await this.tester.click(selector.DROPDOWN);
                await this.tester.selectByText(relativeTo, selector.DROPDOWN_ELEMENTS);
            }
            if (increment || decrement) {
                await this.#modifyValueByStep(selector.FIELD, settings);
            }
        } catch (error) {
            throw new Error(`setVerticalRelative: Failed to set vertical relative. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set the options for the position
     * @param {OptionsSettings} [settings] - The settings to set
     */
    async setOptions(settings) {
        try {
            const { moveObjectWithText, allowOverlap } = settings;
            const selector = PositionSettings.POSITION_SELECTORS.OPTIONS;

            if (moveObjectWithText) {
                const isEnabled = await this.#isCheckboxEnabled(selector.MOVE_IS_DISABLED);
                if (!isEnabled) {
                    throw new Error("Move object with text is not supported for this position type");
                }
                const checkbox = new Checkbox(this.tester, selector.MOVE_OBJ);
                await checkbox.set(true);
            }
            if (allowOverlap) {
                const checkbox = new Checkbox(this.tester, selector.ALLOW_OVERLAP);
                await checkbox.set(true);
            }
        } catch (error) {
            throw new Error(`setOptions: Failed to set options. ${error.message}`, { cause: error });
        }
    }

    /**
     * Check if the checkbox is enabled
     * @param {string} selector - The selector to check
     * @returns {Promise<boolean>} - True if the field is enabled, false otherwise
     */
    async #isCheckboxEnabled(selector) {
        return await this.tester.frame.evaluate((selector) => {
            const el = document.querySelector(selector);
            return el && !el.disabled;
        }, selector);
    }

    /**
     * Handle the increment and decrement
     * @param {{key: string, increment: number, decrement: number}} [settings] - The settings to handle
     */
    async #modifyValueByStep(fieldSelector, settings) {
        const { increment, decrement } = settings;
        const selectors = PositionSettings.POSITION_SELECTORS;
        const field = fieldSelector.replace("input", "");
        const incrementSelector = field + selectors.INCREMENT_BTN;
        const decrementSelector = field + selectors.DECREMENT_BTN;

        if (increment) {
            for (let i = 0; i < increment; i++) {
                await this.tester.click(incrementSelector);
            }
        }
        if (decrement) {
            for (let i = 0; i < decrement; i++) {
                await this.tester.click(decrementSelector);
            }
        }
    }

    /**
     * Apply the settings to the position
     * @param {ApplySettings} positionSettings - The position settings
     */
    async applySettings(positionSettings) {
        const HorizontalSettings = {
            alignment: this.setHorizontalAlignment.bind(this),
            position: this.setHorizontalPosition.bind(this),
            relative: this.setHorizontalRelative.bind(this),
        };

        const VerticalSettings = {
            alignment: this.setVerticalAlignment.bind(this),
            position: this.setVerticalPosition.bind(this),
            relative: this.setVerticalRelative.bind(this),
        };

        if (positionSettings.horizontal) {
            for (const [key, method] of Object.entries(HorizontalSettings)) {
                if (positionSettings.horizontal[key]) {
                    await method(positionSettings.horizontal[key]);
                }
            }
        }

        if (positionSettings.vertical) {
            for (const [key, method] of Object.entries(VerticalSettings)) {
                if (positionSettings.vertical[key]) {
                    await method(positionSettings.vertical[key]);
                }
            }
        }

        if (positionSettings.options) {
            await this.setOptions(positionSettings.options);
        }
    }
}

module.exports = PositionSettings;

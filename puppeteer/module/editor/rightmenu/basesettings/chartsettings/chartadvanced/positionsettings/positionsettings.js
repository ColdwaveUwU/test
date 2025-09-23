const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Button, Input, Dropdown, Checkbox } = require("../../../../../../elements");
const { createErrorHandler, createExecuteAction } = require("../../../../../../../engine/script/js/utils");

/**
 * @typedef {Object} HorizontalAlignmentSettings
 * @property {"Left" | "Center" | "Right"} [type] - The alignment for the horizontal position
 * @property {"Character" | "Column" | "Left margin" | "Margin" | "Page" | "Right margin"} [relativeTo] - The relative to for the horizontal position
 */

/**
 * @typedef {Object} HorizontalPositionSettings
 * @property {import("../../../../../elements/input/input").InputSettings} value - The value for the horizontal position
 * @property {"Character" | "Column" | "Left margin" | "Margin" | "Page" | "Right margin"} toTheRightOf - The to the right of for the horizontal position
 */

/**
 * @typedef {Object} HorizontalRelativeSettings
 * @property {import("../../../../../elements/input/input").InputSettings} value - The value for the horizontal relative position
 * @property {"Left margin" | "Margin" | "Page" | "Right margin"} relativeTo - The relative to for the horizontal relative position
 */

/**
 * @typedef {Object} VerticalAlignmentSettings
 * @property {"Top" | "Center" | "Bottom"} type - The alignment for the vertical position
 * @property {"Line" | "Margin" | "Bottom margin" | "Paragraph" | "Page" | "Top margin"} relativeTo - The relative to for the vertical position
 */

/**
 * @typedef {Object} VerticalPositionSettings
 * @property {import("../../../../../elements/input/input").InputSettings} value - The value for the vertical position
 * @property {"Line" | "Margin" | "Bottom margin" | "Paragraph" | "Page" | "Top margin"} below - The below for the vertical position
 */

/**
 * @typedef {Object} VerticalRelativeSettings
 * @property {import("../../../../../elements/input/input").InputSettings} value - The value for the vertical relative position
 * @property {"Margin" | "Bottom margin" | "Page" | "Top margin"} relativeTo - The relative to for the vertical relative position
 */

/**
 * @typedef {Object} OptionsSettings
 * @property {boolean} moveObjectWithText - The move object with text checkbox
 * @property {boolean} allowOverlap - The allow overlap checkbox
 */

/**
 * @typedef {Object} HorizontalSettings
 * @property {HorizontalAlignmentSettings} alignment - The alignment for the horizontal position
 * @property {HorizontalPositionSettings} position - The position for the horizontal position
 * @property {HorizontalRelativeSettings} relative - The relative position for the horizontal position
 */

/**
 * @typedef {Object} VerticalSettings
 * @property {VerticalAlignmentSettings} alignment - The alignment for the vertical position
 * @property {VerticalPositionSettings} position - The position for the vertical position
 * @property {VerticalRelativeSettings} relative - The relative position for the vertical position
 */

/**
 * @typedef {Object} PositionSettingsObject
 * @property {HorizontalSettings} [horizontal] - Settings for horizontal positioning.
 * @property {VerticalSettings} [vertical] - Settings for vertical positioning.
 * @property {OptionsSettings} [options] - Additional options for positioning.
 */

class PositionSettings extends BaseSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * @enum
     */
    static SETTINGS_MAP = {
        POSITION_SETTINGS: {
            options: "setOptions",
            horizontal: "setHorizontalSettings",
            vertical: "setVerticalSettings",
        },
        OPTIONS: {
            allowOverlap: "setAllowOverlap",
            moveObjectWithText: "setMoveObjectWithText",
        },
        HORIZONTAL: {
            alignment: "setHorizontalAlignment",
            position: "setHorizontalPosition",
            relative: "setHorizontalRelative",
        },
        VERTICAL: {
            alignment: "setVerticalAlignment",
            position: "setVerticalPosition",
            relative: "setVerticalRelative",
        },
    };

    constructor(tester) {
        super(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Sets the settings.
     * @param {PositionSettingsObject} settings
     */
    async setSettings(settings) {
        await this.#selectTab();
        await this.setSettingsByMap(settings, PositionSettings.SETTINGS_MAP.POSITION_SETTINGS);
    }

    /**
     * Sets the options settings.
     * @param {OptionsSettings} optionsSettings
     */
    async setOptions(optionsSettings) {
        await this.setSettingsByMap(optionsSettings, PositionSettings.SETTINGS_MAP.OPTIONS);
    }

    /**
     * Sets the horizontal settings.
     * @param {HorizontalSettings} horizontalSettings
     */
    async setHorizontalSettings(horizontalSettings) {
        await this.setSettingsByMap(horizontalSettings, PositionSettings.SETTINGS_MAP.HORIZONTAL);
    }

    /**
     * Sets the vertical settings.
     * @param {VerticalSettings} verticalSettings
     */
    async setVerticalSettings(verticalSettings) {
        await this.setSettingsByMap(verticalSettings, PositionSettings.SETTINGS_MAP.VERTICAL);
    }

    /**
     * Sets the allow overlap checkbox.
     * @param {boolean} allowOverlap - The allow overlap checkbox (true or false)
     */
    async setAllowOverlap(allowOverlap) {
        const selector = PositionSettings.SELECTORS.OPTIONS.ALLOW_OVERLAP;
        await this.executeAction(Checkbox, selector, "set", "setAllowOverlap", [allowOverlap]);
    }

    /**
     * Sets the move object with text checkbox.
     * @param {boolean} moveObjectWithText - The move object with text checkbox (true or false)
     */
    async setMoveObjectWithText(moveObjectWithText) {
        const selector = PositionSettings.SELECTORS.OPTIONS.MOVE_OBJECT_WITH_TEXT;
        await this.executeAction(Checkbox, selector, "set", "setMoveObjectWithText", [moveObjectWithText]);
    }

    /**
     * Sets vertical alignment settings.
     * @param {VerticalAlignmentSettings} alignmentSettings - The alignment settings
     */
    async setVerticalAlignment(alignmentSettings) {
        const selectors = PositionSettings.SELECTORS.VERTICAL.ALIGMENT;
        const methodName = "setVerticalAlignment";
        const { type, relativeTo } = alignmentSettings;
        await this.executeAction(Checkbox, selectors.CHECKBOX, "check", methodName);
        if (type) {
            await this.executeAction(Dropdown, selectors.DROPDOWN, "selectDropdownItem", methodName, [type]);
        }
        if (relativeTo) {
            const selector = selectors.RELATIVE_DROPDOWN;
            await this.executeAction(Dropdown, selector, "selectDropdownItem", methodName, [relativeTo]);
        }
    }

    /**
     * Sets vertical position settings.
     * @param {VerticalPositionSettings} positionSettings - The position settings
     */
    async setVerticalPosition(positionSettings) {
        const selectors = PositionSettings.SELECTORS.VERTICAL.POSTION;
        const methodName = "setVerticalPosition";
        const { value, below } = positionSettings;
        await this.executeAction(Checkbox, selectors.CHECKBOX, "check", methodName);
        if (below) {
            const selector = selectors.DROPDOWN;
            await this.executeAction(Dropdown, selector, "selectDropdownItem", methodName, [below]);
        }
        if (value) {
            await this.executeAction(Input, selectors.INPUT_FIELD, "setInputSettings", methodName, [value], [false]);
        }
    }

    /**
     * Sets vertical relative settings.
     * @param {VerticalRelativeSettings} relativeSettings - The relative settings
     */
    async setVerticalRelative(relativeSettings) {
        const selectors = PositionSettings.SELECTORS.VERTICAL.RELATIVE;
        const methodName = "setVerticalRelative";
        const { relativeTo, value } = relativeSettings;
        await this.executeAction(Checkbox, selectors.CHECKBOX, "check", methodName);
        if (relativeTo) {
            const selector = selectors.RELATIVE_TO_DROPDOWN;
            await this.executeAction(Dropdown, selector, "selectDropdownItem", methodName, [relativeTo]);
        }
        if (value) {
            await this.executeAction(Input, selectors.INPUT_FIELD, "setInputSettings", methodName, [value], [false]);
        }
    }

    /**
     * Sets horizontal alignment settings.
     * @param {HorizontalAlignmentSettings} alignmentSettings - The alignment settings
     */
    async setHorizontalAlignment(alignmentSettings) {
        const selectors = PositionSettings.SELECTORS.HORIZONTAL.ALIGMENT;
        const methodName = "setHorizontalAlignment";
        const { type, relativeTo } = alignmentSettings;
        await this.executeAction(Checkbox, selectors.CHECKBOX, "check", methodName);
        if (type) {
            await this.executeAction(Dropdown, selectors.DROPDOWN, "selectDropdownItem", methodName, [type]);
        }
        if (relativeTo) {
            const selector = selectors.RELATIVE_DROPDOWN;
            await this.executeAction(Dropdown, selector, "selectDropdownItem", methodName, [relativeTo]);
        }
    }

    /**
     * Sets horizontal position settings.
     * @param {HorizontalPositionSettings} positionSettings - The position settings
     */
    async setHorizontalPosition(positionSettings) {
        const selectors = PositionSettings.SELECTORS.HORIZONTAL.POSTION;
        const methodName = "setHorizontalPosition";
        const { value, toTheRightOf } = positionSettings;
        await this.executeAction(Checkbox, selectors.CHECKBOX, "check", methodName);

        if (toTheRightOf) {
            const selector = selectors.TO_THE_RIGHT_OF_DROPDOWN;
            await this.executeAction(Dropdown, selector, "selectDropdownItem", methodName, [toTheRightOf]);
        }
        if (value) {
            await this.executeAction(Input, selectors.INPUT_FIELD, "setInputSettings", methodName, [value], [false]);
        }
    }

    /**
     * Sets horizontal relative settings.
     * @param {HorizontalRelativeSettings} relativeSettings - The relative settings
     */
    async setHorizontalRelative(relativeSettings) {
        const selectors = PositionSettings.SELECTORS.HORIZONTAL.RELATIVE;
        const methodName = "setHorizontalRelative";
        const { relativeTo, value } = relativeSettings;
        await this.executeAction(Checkbox, selectors.CHECKBOX, "check", methodName);
        if (relativeTo) {
            const selector = selectors.RELATIVE_TO_DROPDOWN;
            await this.executeAction(Dropdown, selector, "selectDropdownItem", methodName, [relativeTo]);
        }
        if (value) {
            await this.executeAction(Input, selectors.INPUT_FIELD, "setInputSettings", methodName, [value], [false]);
        }
    }

    /**
     * Selects the tab.
     */
    async #selectTab() {
        await this.executeAction(Button, PositionSettings.SELECTORS.TAB_BUTTON, "click", "selectTab");
    }
}

module.exports = PositionSettings;

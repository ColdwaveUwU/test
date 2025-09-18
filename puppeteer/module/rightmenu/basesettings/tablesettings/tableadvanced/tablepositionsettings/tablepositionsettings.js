const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Dropdown, Input, Checkbox } = require("../../../../../elements");

/**
 * @typedef {Object} TablePositionSettingsObject
 * @property {HorizontalSettings} [horizontal]
 * @property {VerticalSettings} [vertical]
 * @property {OptionsSettings} [options]
 */

class TablePositionSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    static TABLE_POSITION_SELECTORS = selectors;

    /**
     * @typedef {Object} HorizontalSettings
     * @property {{type: string | undefined, relative: string | undefined}} alignment
     * @property {{value: import("../../../../../elements/input/input").InputSettings | undefined, rightOf: string | undefined}} position
     */

    /**
     * Sets the horizontal position settings.
     * @param {HorizontalSettings} settings
     */
    async #setHorizontalSettings(settings) {
        const horizontalSelectors = TablePositionSettings.TABLE_POSITION_SELECTORS.HORIZONTAL;

        const handlers = {
            alignment: async (alignmentSettings) => {
                const checkbox = new Checkbox(this.tester, horizontalSelectors.ALIGNMENT.CHECKBOX);
                await checkbox.set(true);

                if (alignmentSettings.type) {
                    const dropdown = new Dropdown(this.tester, {
                        selector: horizontalSelectors.ALIGNMENT.TYPE_DROPDOWN.SELECTOR,
                        elementsSelector: horizontalSelectors.ALIGNMENT.TYPE_DROPDOWN.ELEMENTS_SELECTOR,
                    });
                    await dropdown.selectDropdownItem(alignmentSettings.type);
                }

                if (alignmentSettings.relative) {
                    const dropdown = new Dropdown(this.tester, {
                        selector: horizontalSelectors.ALIGNMENT.RELATIVE_DROPDOWN.SELECTOR,
                        elementsSelector: horizontalSelectors.ALIGNMENT.RELATIVE_DROPDOWN.ELEMENTS_SELECTOR,
                    });
                    await dropdown.selectDropdownItem(alignmentSettings.relative);
                }
            },
            position: async (positionSettings) => {
                const checkbox = new Checkbox(this.tester, horizontalSelectors.POSITION.CHECKBOX);
                await checkbox.set(true);

                if (positionSettings.value) {
                    const input = new Input(this.tester, horizontalSelectors.POSITION.POSITION_INPUT, false);
                    await input.setInputSettings(positionSettings.value);
                }

                if (positionSettings.rightOf) {
                    const dropdown = new Dropdown(this.tester, {
                        selector: horizontalSelectors.POSITION.RIGHT_OF_DROPDOWN.SELECTOR,
                        elementsSelector: horizontalSelectors.POSITION.RIGHT_OF_DROPDOWN.ELEMENTS_SELECTOR,
                    });
                    await dropdown.selectDropdownItem(positionSettings.rightOf);
                }
            },
        };

        await this.applySettingsMap(settings, handlers, "Horizontal");
    }

    /**
     * @typedef {Object} VerticalSettings
     * @property {{type: string | undefined, relative: string | undefined}} alignment
     * @property {{value: import("../../../../../elements/input/input").InputSettings | undefined, below: string | undefined}} position
     */
    /**
     * Sets the vertical position settings.
     * @param {VerticalSettings} settings
     */
    async #setVerticalSettings(settings) {
        const s = TablePositionSettings.TABLE_POSITION_SELECTORS.VERTICAL;

        const handlers = {
            alignment: async (alignmentSettings) => {
                const checkbox = new Checkbox(this.tester, s.ALIGNMENT.CHECKBOX);
                await checkbox.set(true);

                if (alignmentSettings.type) {
                    const dropdown = new Dropdown(this.tester, {
                        selector: s.ALIGNMENT.TYPE_DROPDOWN.SELECTOR,
                        elementsSelector: s.ALIGNMENT.TYPE_DROPDOWN.ELEMENTS_SELECTOR,
                    });
                    await dropdown.selectDropdownItem(alignmentSettings.type);
                }

                if (alignmentSettings.relative) {
                    const dropdown = new Dropdown(this.tester, {
                        selector: s.ALIGNMENT.RELATIVE_DROPDOWN.SELECTOR,
                        elementsSelector: s.ALIGNMENT.RELATIVE_DROPDOWN.ELEMENTS_SELECTOR,
                    });
                    await dropdown.selectDropdownItem(alignmentSettings.relative);
                }
            },
            position: async (positionSettings) => {
                const checkbox = new Checkbox(this.tester, s.POSITION.CHECKBOX);
                await checkbox.set(true);

                if (positionSettings.value) {
                    const input = new Input(this.tester, s.POSITION.POSITION_INPUT, false);
                    await input.setInputSettings(positionSettings.value);
                }

                if (positionSettings.below) {
                    const dropdown = new Dropdown(this.tester, {
                        selector: s.POSITION.BELOW_DROPDOWN.SELECTOR,
                        elementsSelector: s.POSITION.BELOW_DROPDOWN.ELEMENTS_SELECTOR,
                    });
                    await dropdown.selectDropdownItem(positionSettings.below);
                }
            },
        };

        await this.applySettingsMap(settings, handlers, "Vertical");
    }

    /**
     * @typedef {Object} OptionsSettings
     * @property {boolean} [moveObject]
     * @property {boolean} [overlap]
     */
    /**
     * Sets the options settings.
     * @param {OptionsSettings} settings
     */
    async #setOptionsSettings(settings) {
        const s = TablePositionSettings.TABLE_POSITION_SELECTORS.OPTIONS;

        const handlers = {
            moveObject: async (value) => {
                const checkbox = new Checkbox(this.tester, s.MOVE_OBJECT_CHECKBOX);
                await checkbox.set(value);
            },
            overlap: async (value) => {
                const checkbox = new Checkbox(this.tester, s.OVERLAP_CHECKBOX);
                await checkbox.set(value);
            },
        };

        await this.applySettingsMap(settings, handlers, "Options");
    }

    /**
     * Applies table position settings.
     * @param {TablePositionSettingsObject} settings
     */
    async applySettings(settings) {
        const handlers = {
            horizontal: this.#setHorizontalSettings.bind(this),
            vertical: this.#setVerticalSettings.bind(this),
            options: this.#setOptionsSettings.bind(this),
        };

        await this.applySettingsMap(settings, handlers, "TablePosition");
    }
}

module.exports = TablePositionSettings;

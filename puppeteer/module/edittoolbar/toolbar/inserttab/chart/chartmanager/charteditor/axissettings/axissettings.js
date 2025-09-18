const InsertTab = require("../../../../inserttab");
const { NumberFormat } = require("../../../../../../../common");
const { Checkbox } = require("../../../../../../../elements");
class AxisSettings extends InsertTab {
    constructor(tester, selectors, types) {
        super(tester);
        this.selectors = selectors;
        this.types = types;
    }

    async #toggleCheckbox(selector, condition) {
        if (condition !== undefined) {
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        }
    }

    async #updateOptions(options) {
        for (const { selector, validValues, value, isInput } of options) {
            if (value === undefined) continue;
            if (validValues && !validValues.includes(value)) {
                console.error(`Invalid value for ${selector}: ${value}`);
                continue;
            }
            if (isInput) {
                await this.tester.inputToForm(value, selector);
            } else {
                await this.tester.setOption(selector, value);
            }
        }
    }

    async #changeDisplaySettings(displaySettings) {
        const { hideAxis, title, grid, unit } = displaySettings;

        await this.#toggleCheckbox(this.selectors.HIDE_AXIS, hideAxis);
        await this.#updateOptions([
            { selector: this.selectors.TITLE, validValues: this.types.TITLE, value: title },
            { selector: this.selectors.GRID, validValues: this.types.GRID, value: grid },
            { selector: this.selectors.DISPLAY_UNITS, validValues: this.types.DISPLAY_UNITS, value: unit },
        ]);

        if (displaySettings?.maxVal || displaySettings?.minVal) {
            await this.#updateMaxMinAxis(displaySettings);
        }
    }

    async #updateMaxMinAxis({ maxVal, minVal }) {
        const axisSettingsConfig = [
            {
                typeSelector: this.selectors.MAX_VAL.TYPE,
                valueSelector: this.selectors.MAX_VAL.VALUE,
                settings: maxVal,
            },
            {
                typeSelector: this.selectors.MIN_VAL.TYPE,
                valueSelector: this.selectors.MIN_VAL.VALUE,
                settings: minVal,
            },
        ];

        for (const { typeSelector, valueSelector, settings } of axisSettingsConfig) {
            if (settings) {
                const { type, value } = settings;
                await this.#updateOptions([
                    {
                        selector: typeSelector,
                        validValues: this.types.MIN_MAX_VAL.concat(this.types.AXIS_CROSSES),
                        value: type,
                    },
                    { selector: valueSelector, value, isInput: true },
                ]);
            }
        }
    }

    async #changeAxisSettings(axisSettings) {
        const { reverse, logScale, base, axisCross, axisPosition } = axisSettings;

        await this.#toggleCheckbox(this.selectors.REVERSE, reverse);

        if (logScale && base) {
            const [isBaseNotDisabled] = await this.#toggleCheckbox(this.selectors.LOG_SCALE, logScale);

            if (isBaseNotDisabled) {
                await this.tester.inputToForm(base, `${this.selectors.BASE} input`);
            }
        }

        if (axisCross) {
            const axisSettingsConfig = {
                typeSelector: this.selectors.AXIS_CROSS.TYPE,
                valueSelector: this.selectors.AXIS_CROSS.VALUE,
                settings: axisCross,
            };
            const { typeSelector, valueSelector, settings } = axisSettingsConfig;
            if (settings) {
                const { type, value } = settings;
                await this.#updateOptions([
                    {
                        selector: typeSelector,
                        validValues: this.types.MIN_MAX_VAL.concat(this.types.AXIS_CROSSES),
                        value: type,
                    },
                    { selector: valueSelector, value, isInput: true },
                ]);
            }
        }

        if (axisPosition) {
            await this.tester.setOption(this.selectors.AXIS_POSITION, axisPosition);
        }
    }

    async #changeTickSettings(tickSettings) {
        const { major, minor, interval } = tickSettings;
        await this.#updateOptions([
            { selector: this.selectors.MAJOR_TYPE, validValues: this.types.MAJOR_MINOR, value: major },
            { selector: this.selectors.MINOR_TYPE, validValues: this.types.MAJOR_MINOR, value: minor },
            { selector: this.selectors.INTERVAL, value: interval, isInput: true },
        ]);
    }

    async #changeLabelSettings(labelSettings) {
        const { position, distance, interval, format } = labelSettings;

        await this.#updateOptions([
            { selector: this.selectors.LABEL_POSITION, validValues: this.types.LABEL_POSITION, value: position },
            { selector: this.selectors.LABEL_DISTANCE, value: distance, isInput: true },
        ]);

        if (interval) {
            const { type, value } = interval;
            await this.#updateOptions([
                { selector: this.selectors.LABEL_INTERVAL_TYPE, validValues: this.types.LABEL_INTERVAL, value: type },
                { selector: this.selectors.LABEL_INTERVAL_VALUE, value, isInput: true },
            ]);
        }

        if (format) {
            const numberFormat = new NumberFormat(this.tester);
            await numberFormat.setSettings(format, this.selectors.LABEL_FORMAT_BUTTON);
        }
    }

    async applySettings(axisSettings) {
        const settingsMap = {
            display: this.#changeDisplaySettings.bind(this),
            axis: this.#changeAxisSettings.bind(this),
            tick: this.#changeTickSettings.bind(this),
            label: this.#changeLabelSettings.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (axisSettings[key]) {
                await method(axisSettings[key]);
            }
        }
    }
}

module.exports = AxisSettings;

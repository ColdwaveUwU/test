const ToolMenu = require("../toolmenu");

/**
 * @typedef {Object} HeadingOptions
 * @property {string} [expand]
 * @property {string} [collapse]
 * @property {string} [expandLvl]
 * @property {string} [fontSize]
 * @property {string} [wrap]
 */

/**
 * @typedef {Object} SubElement
 * @property {string} id - The ID of the sub-element.
 * @property {string} text - The text content of the sub-element.
 */

/**
 * @typedef {Object} ElementsGenId
 * @property {string} elementText - The text content of the element.
 * @property {string} elementId - The ID of the element.
 * @property {Array<SubElement>} subElements - Array of sub-elements with text and ID.
 */

class ToolMenuHeadings extends ToolMenu {
    constructor(tester) {
        super("#left-btn-navigation", tester);
    }

    /**
     * Finds the element ID based on the provided text.
     * @param {Array<ElementsGenId>} elements - Array of elements with text and ID.
     * @param {string} text - Text to find in the elements.
     * @returns {string|null} - The found element ID or null if not found.
     */
    #findElementId(elements, text) {
        for (const el of elements) {
            if (el.elementText.toLowerCase() === text.toLowerCase()) {
                return el.elementId;
            }

            for (const subEl of el.subElements) {
                if (subEl.text.toLowerCase() === text.toLowerCase()) {
                    return subEl.id;
                }
            }
        }
        return null;
    }
    /**
     * @typedef {Object} SubElement
     * @property {string} id - The ID of the sub-element.
     * @property {string} text - The text content of the sub-element.
     */

    /**
     * @typedef {Object} ElementsGenId
     * @property {string} elementText - The text content of the element.
     * @property {string} elementId - The ID of the element.
     * @property {Array<SubElement>} subElements - Array of sub-elements with text and ID.
     */

    /**
     * Gets the generated item IDs
     * @param {string} parentSelector - The selector of the parent element.
     * @param {string} elementSelector - The selector of the element.
     * @returns {Promise<Array<ElementsGenId>>} - A promise that resolves to an array of elements with text, ID, and sub-elements.
     */
    async #getElementsGenId(parentSelector, elementSelector) {
        const frame = this.tester.getFrame();
        const elements = await frame.evaluate(
            (parentSelector, elementSelector) => {
                return Array.from(document.querySelectorAll(parentSelector)).map((element) => {
                    const elementText = element.textContent;
                    const elementId = element.id;
                    const parentElement = document.getElementById(elementId).parentElement;
                    if (parentElement) {
                        const parentElementClassName = parentElement.className;
                        if (parentElementClassName) {
                            const subElements = Array.from(parentElement.querySelectorAll(elementSelector)).map(
                                (subEl) => {
                                    return {
                                        id: subEl.firstChild.id,
                                        text: subEl.textContent,
                                    };
                                }
                            );

                            return {
                                elementText,
                                elementId,
                                subElements,
                            };
                        }
                    }

                    return {
                        elementText,
                        elementId,
                        subElements: [],
                    };
                });
            },
            parentSelector,
            elementSelector
        );
        return elements;
    }

    /**
     * Sets the heading options based on provided settings.
     * @param {HeadingOptions} options
     */
    async #setHeadingsOption(options) {
        const optionSelector = "#navigation-btn-settings";
        const waitOpenSettingsPanel = this.tester.frame.waitForSelector(
            `${optionSelector} .dropdown-menu.shifted-right`,
            { visible: true }
        );

        const selectAndClick = async (elements, primaryLabel, secondaryLabel = null) => {
            const primaryId = this.#findElementId(elements, primaryLabel);
            if (primaryId) {
                await this.tester.selectDropdown(optionSelector);
                await waitOpenSettingsPanel;
                await this.tester.click(`#${primaryId}`);

                if (secondaryLabel) {
                    const secondaryId = this.#findElementId(elements, secondaryLabel);
                    if (secondaryId) {
                        await this.tester.click(`#${secondaryId}`);
                    }
                }
                return true;
            }
            return false;
        };

        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }

        const elements = await this.#getElementsGenId(
            `${optionSelector} .btn-group > .dropdown-menu > li > a`,
            "ul.dropdown-menu li"
        );

        const actions = {
            expand: async () => await selectAndClick(elements, "expand all"),
            collapse: async () => await selectAndClick(elements, "collapse all"),
            expandLvl: async () => await selectAndClick(elements, "expand to level", options.expandLvl),
            fontSize: async () => await selectAndClick(elements, "font size", options.fontSize),
            wrap: async () => await selectAndClick(elements, "wrap long headings"),
        };

        for (const [key, action] of Object.entries(actions)) {
            if (options[key]) {
                try {
                    await action();
                } catch (error) {
                    console.error(`Error executing action '${key}': ${error}`);
                }
            }
        }
    }

    /**
     * Click Expand all
     */
    async setExpand() {
        await this.#setHeadingsOption({ expand: true });
    }

    /**
     * Click Collapse all
     */
    async setCollapse() {
        await this.#setHeadingsOption({ collapse: true });
    }

    /**
     * Sets Expand to level
     * @param {"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"} lvl
     */
    async setExpandLvl(lvl) {
        await this.#setHeadingsOption({ expandLvl: lvl });
    }

    /**
     * Sets Font size
     * @param {"Small" | "Medium" | "Large"} size
     */
    async setFontSize(size) {
        await this.#setHeadingsOption({ fontSize: size });
    }

    /**
     * Click Wrap long headings
     */
    async setWrap() {
        await this.#setHeadingsOption({ wrap: true });
    }
}

module.exports = ToolMenuHeadings;

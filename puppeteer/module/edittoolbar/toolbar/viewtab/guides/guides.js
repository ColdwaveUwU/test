const ViewTab = require("../viewtab");
const selectors = require("./selectors.json");
const { OptionsButton } = require("../../../../elements");

class Guides extends ViewTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    static TYPES = {
        GUIDES: ["Show guides", "Add vertical guide", "Add horizontal guide", "Smart guides", "Clear guides"],
    };

    async #isChecked(name) {
        const items = await this.tester.parseItems(Guides.SELECTORS.GUIDES.DROPDOWN_ELEMENTS_SELECTOR, "a");

        const target = Array.from(items).find((el) => {
            const text = el?.description || "";
            return text.trim() === name;
        });

        return target.className.includes(".checked");
    }

    /**
     * Click the default guides button or click the guides button with options.
     * @param {"Show guides" | "Add vertical guide" | "Add horizontal guide" | "Smart guides" | "Clear guides"} [optionValue]
     */
    async setGuides(optionValue) {
        const guidesSelectors = Guides.SELECTORS.GUIDES;
        const guidesButton = new OptionsButton(
            this.tester,
            guidesSelectors.ELEMENT_SELECTOR,
            guidesSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: guidesSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: Guides.TYPES.GUIDES,
            }
        );
        try {
            await guidesButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`setGuides: Failed to set guides ${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set the guides to show or hide.
     * @param {boolean} condition - The condition to set the guides to.
     */
    async ShowGuides(condition) {
        const name = "Show guides";
        const isChecked = await this.#isChecked(name);
        if (isChecked !== condition) {
            await this.setGuides(name);
        }
    }

    /**
     * Add vertical guide
     */
    async AddVerticalGuide() {
        await this.setGuides("Add vertical guide");
    }

    /**
     * Add horizontal guide
     */
    async AddHorizontalGuide() {
        await this.setGuides("Add horizontal guide");
    }

    /**
     * Set the smart guides to show or hide.
     * @param {boolean} condition - The condition to set the smart guides to.
     */
    async SmartGuides(condition) {
        const name = "Smart guides";
        const isChecked = await this.#isChecked(name);
        if (isChecked !== condition) {
            await this.setGuides(name);
        }
    }

    /**
     * Clear guides
     */
    async ClearGuides() {
        await this.setGuides("Clear guides");
    }
}

module.exports = Guides;

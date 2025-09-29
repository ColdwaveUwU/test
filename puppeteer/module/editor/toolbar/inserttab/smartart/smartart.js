const { Dropdown } = require("../../../../elements");
const InsertTab = require("../inserttab");

const selectors = require("./selectors.json");
/**
 * @typedef {Object} SmartArtObject
 * @property {string} description
 * @property {number} count
 * @property {number} index
 */
class SmartArt extends InsertTab {
    constructor(tester) {
        super(tester, "#slot-btn-inssmartart");
    }

    static SELECTORS = selectors;

    get smartArtDropdown() {
        const smartArtDropdownSelectors = SmartArt.SELECTORS.SMART_ART_DROPDOWN;
        return new Dropdown(this.tester, {
            selector: smartArtDropdownSelectors.SELECTOR,
            elementsSelector: smartArtDropdownSelectors.ELEMENTS_SELECTOR,
            descriptionSelector: smartArtDropdownSelectors.DESCRIPTION_SELECTOR,
        });
    }

    /**
     * Open the SmartArt list layout
     * @throws {Error}
     */
    async openSmartArtList() {
        try {
            await this.smartArtDropdown.selectDropdown();
        } catch (error) {
            throw new Error(`Error in openSmartArtList: ${error.message}`, { cause: error });
        }
    }

    /**
     * Returns the SmartArt array
     * @throws {Error}
     * @returns {Promise<Array<SmartArtObject>>}
     */
    async getSmartArts() {
        try {
            const smartArts = await this.smartArtDropdown.getDropdownItems();
            return smartArts;
        } catch (error) {
            throw new Error(`Error in getSmartArts: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired smart art layout
     * @param {string} description
     * @param {string | number} index - nth-child index
     * @throws {Error}
     */
    async #clickSmartArt(description, index) {
        const loadedSelector = SmartArt.SELECTORS.SMART_ART_DROPDOWN.ELEMENTS_LOADED_SELECTOR;
        const dropdownSelector = SmartArt.SELECTORS.SMART_ART_DROPDOWN.SELECTOR;

        try {
            const waitListLoaded = this.tester.waitSelector(loadedSelector);
            const dropdownItems = await this.smartArtDropdown.getDropdownItems();

            const target = dropdownItems.find((item) => item.description === description);
            if (!target) {
                throw new Error(`Element with description "${description}" not found`);
            }

            const baseSelector = `${dropdownSelector} ${target.className}`;

            await Promise.all([this.tester.hoverElement(baseSelector), waitListLoaded]);

            const nthChildIndex = index + 1;
            const finalSelector = `${baseSelector} .item:nth-child(${nthChildIndex})`;
            await this.tester.click(finalSelector);
        } catch (error) {
            throw new Error(`Error in #clickSmartArt [${description}, ${index}]: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired ListArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickListArt(id) {
        try {
            await this.#clickSmartArt("List", id);
        } catch (error) {
            throw new Error(`Error in clickListArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired ProcessArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickProcessArt(id) {
        try {
            await this.#clickSmartArt("Process", id);
        } catch (error) {
            throw new Error(`Error in clickProcessArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired CycleArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickCycleArt(id) {
        try {
            await this.#clickSmartArt("Cycle", id);
        } catch (error) {
            throw new Error(`Error in clickCycleArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired HierarchyArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickHierarchyArt(id) {
        try {
            await this.#clickSmartArt("Hierarchy", id);
        } catch (error) {
            throw new Error(`Error in clickHierarchyArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired RelationshipArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickRelationshipArt(id) {
        try {
            await this.#clickSmartArt("Relationship", id);
        } catch (error) {
            throw new Error(`Error in clickRelationshipArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired MatrixArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickMatrixArt(id) {
        try {
            await this.#clickSmartArt("Matrix", id);
        } catch (error) {
            throw new Error(`Error in clickMatrixArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired PyramidArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickPyramidArt(id) {
        try {
            await this.#clickSmartArt("Pyramid", id);
        } catch (error) {
            throw new Error(`Error in clickPyramidArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired PictureArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickPictureArt(id) {
        try {
            await this.#clickSmartArt("Picture", id);
        } catch (error) {
            throw new Error(`Error in clickPictureArt: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired OtherArt layout id
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async clickOtherArt(id) {
        try {
            await this.#clickSmartArt("Other", id);
        } catch (error) {
            throw new Error(`Error in clickOtherArt: ${error.message}`, { cause: error });
        }
    }
}

module.exports = SmartArt;

const InsertTab = require("../inserttab");

/**
 * @typedef {Object} SmartArtObject
 * @property {string} description
 * @property {number} count
 * @property {number} index
 */
class SmartArt extends InsertTab {
    constructor(tester) {
        super(tester, "#slot-btn-inssmartart", true);
    }

    /**
     * Open the SmartArt list layout
     * @throws {Error}
     */
    async openSmartArtList() {
        try {
            await this.clickTargetButton();
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
            const listSelector = "#tlbtn-insertsmartart li.dropdown-submenu";
            const itemSelector = ".item";
            const descriptionSelector = "a";
            const smartArts = await this.tester.parseItems(listSelector, itemSelector, descriptionSelector);
            return smartArts;
        } catch (error) {
            throw new Error(`Error in getSmartArts: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click on the desired smart art layout
     * @param {string} description
     * @param {string | number} id - nth-child index
     * @throws {Error}
     */
    async #clickSmartArt(description, id) {
        try {
            const waitOpenSmartArtList = this.tester.frame.waitForSelector("#tlbtn-insertsmartart ul.shifted-right", {
                visible: true,
            });
            await this.openSmartArtList();
            await waitOpenSmartArtList;
            const listSelector = "#tlbtn-insertsmartart li.dropdown-submenu";
            const itemSelector = ".item";
            const descriptionSelector = "a";
            await this.tester.clickItem(
                description,
                id,
                listSelector,
                itemSelector,
                descriptionSelector,
                this.isDropdown
            );
        } catch (error) {
            throw new Error(`Error in #clickSmartArt [${description}, ${id}]: ${error.message}`, { cause: error });
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

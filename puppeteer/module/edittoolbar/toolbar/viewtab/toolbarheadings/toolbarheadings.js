const ViewTab = require("../viewtab");
const { ToolMenuHeadings } = require("../../../../toolmenu");

/**
 * @typedef {Object} HeadingOptions
 * @property {string} [expand]
 * @property {string} [collapse]
 * @property {string} [expandLvl]
 * @property {string} [fontSize]
 * @property {string} [wrap]
 */

class ToolbarHeadings extends ViewTab {
    constructor(tester) {
        super(tester, "#slot-btn-navigation");
        if (tester) {
            this.toolMenuHeadings = new ToolMenuHeadings(tester);
        } else {
            this.toolMenuHeadings = new ToolMenuHeadings();
        }
    }

    /**
     * click headings button
     */
    async clickHeadings() {
        await this.clickTargetButton();
    }

    /**
     * Click Expand all
     */
    async setExpand() {
        await this.toolMenuHeadings.setExpand();
    }

    /**
     * Click Collapse all
     */
    async setCollapse() {
        await this.toolMenuHeadings.setCollapse();
    }

    /**
     * Sets Expand to level
     * @param {"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"} lvl
     */
    async setExpandLvl(lvl) {
        await this.toolMenuHeadings.setExpandLvl(lvl);
    }

    /**
     * Sets Font size
     * @param {"Small" | "Medium" | "Large"} size
     */
    async setFontSize(size) {
        await this.toolMenuHeadings.setFontSize(size);
    }

    /**
     * Click Wrap long headings
     */
    async setWrap() {
        await this.toolMenuHeadings.setWrap();
    }
}

module.exports = ToolbarHeadings;

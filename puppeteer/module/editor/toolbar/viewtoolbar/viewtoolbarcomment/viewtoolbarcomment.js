const { Draw } = require("../../../../editor/toolbar/drawtab");
const { Color } = require("../../../../common");
const ViewToolbarStatic = require("../viewtoolbarstatic/viewtoolbarstatic");
const selectors = require("./selectors.json");
const { Checkbox } = require("../../../../elements");
class ViewToolbarComment {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
            this.viewToolbarStatic = new ViewToolbarStatic(tester);
            this.draw = new Draw(tester);
            this.Color = new Color(tester);
        } else {
            this.tester = RegularTester;
            this.viewToolbarStatic = new ViewToolbarStatic();
            this.draw = new Draw();
            this.color = new Color();
        }
    }

    /**
     * @enum
     */
    static VIEW_TOOLBAR_COMMENT_SELECTORS = selectors;
    /**
     * @enum
     */
    static TYPES = {
        TEXT_COMMENT: ["Insert text comment", "Insert text callout"],
    };

    async clickComment() {
        const selectors = ViewToolbarComment.VIEW_TOOLBAR_COMMENT_SELECTORS.COMMENT_TAB;
        const selector = await this.tester.checkSelector(selectors.ACTIVE_BUTTON);
        if (!selector) {
            await this.tester.click(selectors.BUTTON);
        }
    }
    /**
     * @param {string | number} text
     * @return {Promise<void>}
     */
    async addComment(text) {
        const selectors = ViewToolbarComment.VIEW_TOOLBAR_COMMENT_SELECTORS.ADD_COMMENT;

        await this.clickComment();
        await this.tester.click(selectors.BUTTON);
        if (text) {
            await this.tester.inputToForm(text, selectors.INPUT_COMMENT);
            await this.tester.click(selectors.ADD_BUTTON);
        } else {
            await this.tester.click(selectors.CLOSE_BUTTON);
        }
    }
    /**
     * @param {Color} color
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} size
     * @return {Promise<void>}
     */
    async penOne(color, startX, startY, endX, endY, size) {
        await this.clickComment();
        await this.draw.penOne(color, startX, startY, endX, endY, size);
    }
    /**
     * @param {Color} color
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} size
     * @return {Promise<void>}
     */
    async penTwo(color, startX, startY, endX, endY, size) {
        await this.clickComment();
        await this.draw.penTwo(color, startX, startY, endX, endY, size);
    }
    /**
     * @param {Color} color
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} size
     * @return {Promise<void>}
     */
    async highlighter(color, startX, startY, endX, endY, size) {
        await this.clickComment();
        await this.draw.highlighter(color, startX, startY, endX, endY, size);
    }
    /**
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} size
     * @return {Promise<void>}
     */
    async eraser(startX, startY, endX, endY) {
        await this.clickComment();
        await this.draw.eraser(startX, startY, endX, endY);
    }
    /**
     * @param {Color | undefined} color
     * @return {Promise<void>}
     */
    async clickHightlight(color) {
        const highlightSelector = "#id-toolbar-btn-highlight";
        await this.clickComment();
        await this.viewToolbarStatic.clickSelect();
        //todo select element
        await this.tester.mouseDrawingLine("#editor_sdk #id_viewer", 100, 100, -300, -300);
        if (color) {
            await this.tester.selectDropdown(highlightSelector);
            await this.color.selectColor(highlightSelector, color);
        } else {
            await this.tester.click(highlightSelector);
        }
    }
    /**
     * @param {Color | undefined} color
     * @return {Promise<void>}
     */
    async clickStrikeout(color) {
        const strikeoutSelector = "#id-toolbar-btn-highlight";
        await this.clickComment();
        await this.viewToolbarStatic.clickSelect();
        //todo select element
        await this.tester.mouseDrawingLine("#editor_sdk #id_viewer", 100, 100, -300, -300);
        if (color) {
            await this.tester.selectDropdown(strikeoutSelector);
            await this.color.selectColor(strikeoutSelector, color);
        } else {
            await this.tester.click(strikeoutSelector);
        }
    }
    /**
     * @param {Color | undefined} color
     * @return {Promise<void>}
     */
    async clickUnderline(color) {
        const underlineSelector = "#id-toolbar-btn-underline";
        await this.clickComment();
        await this.viewToolbarStatic.clickSelect();
        //todo select element
        await this.tester.mouseDrawingLine("#editor_sdk #id_viewer", 100, 100, -300, -300);
        if (color) {
            await this.tester.selectDropdown(underlineSelector);
            await this.color.selectColor(underlineSelector, color);
        } else {
            await this.tester.click(underlineSelector);
        }
    }
    /**
     * @param {boolean} [checkboxStatus] - default is true
     * @return {Promise<void>}
     */
    async clickShowComments(checkboxStatus = true) {
        await this.clickComment();
        const checkbox = new Checkbox(this.tester, ViewToolbarComment.VIEW_TOOLBAR_COMMENT_SELECTORS.SHOW_COMMENTS);
        await checkbox.set(checkboxStatus);
    }

    /**
     * Clicks the "Text Comment" button or selects a specific comment type.
     * @param {"Insert text comment" | "Insert text callout"} [type]
     */
    async clickTextComment(type) {
        try {
            await this.clickComment();

            const selectors = ViewToolbarComment.VIEW_TOOLBAR_COMMENT_SELECTORS.TEXT_COMMENT;

            if (!type) {
                await this.tester.click(selectors.DEFAULT_BUTTON);
                return;
            }

            await this.tester.selectDropdown(selectors.COMMENT_TYPE_DROPDOWN);
            const items = await this.tester.parseItems(selectors.COMMENT_TYPE.ITEM, selectors.COMMENT_TYPE.TEXT_VALUE);

            const types = ViewToolbarComment.TYPES.TEXT_COMMENT;
            const itemsMap = Object.fromEntries(
                items.slice(0, types.length).map((item, index) => [types[index], item.id])
            );

            if (!itemsMap[type]) {
                throw new Error(`Comment type "${type}" not found in available options.`);
            }

            await this.tester.click(itemsMap[type]);
        } catch (error) {
            throw new Error(`Failed to click text comment: ${error}`);
        }
    }
}
module.exports = ViewToolbarComment;

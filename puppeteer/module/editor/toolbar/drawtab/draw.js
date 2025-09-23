const { Color } = require("../../../common");

/**
 * Object with color settings.
 * @typedef {Object} Color
 * @property {number} type - Setting type
 * @property {number} [index] - color index
 * @property {number} [subIndex] - color subIndex(shade)
 * @property {number} [x] - The x coordinate of the color, used when adjusting the color using advanced settings.
 * @property {number} [y] - The y coordinate of the color, used when adjusting the color using advanced settings
 * @property {number} [hue] - Hue adjustment coordinates in a vertical column
 * @property {number} [hex] - hex color number
 * @property {number} [r] - r color number
 * @property {number} [g] - g color number
 * @property {number} [b] - b color number
 */

class Draw {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
            this.color = new Color(this.tester);
        } else {
            this.tester = RegularTester;
            this.color = new Color();
        }
        this.drawMethods = {
            pen_1: "#slot-btn-draw-pen-0",
            pen_2: "#slot-btn-draw-pen-1",
            highlighter: "#slot-btn-draw-pen-2",
        };
    }
    /**
     * Click draw button.
     * @returns {Promise<void>}
     */
    async clickDraw() {
        const drawSelector = 'li a[data-tab="draw"][data-title="Draw"]';
        const frame = this.tester.getFrame();
        const isActive = await frame.evaluate((drawSelector) => {
            const targetElement = document.querySelector(drawSelector);
            if (targetElement) {
                const parentDrawElement = document.querySelector(drawSelector).parentElement;
                const isActive = parentDrawElement.className.includes("active");
                return isActive && parentDrawElement;
            } else {
                const isNotIncludedDraw = true;
                return isNotIncludedDraw;
            }
        }, drawSelector);
        if (!isActive) {
            await this.tester.click(drawSelector);
        }
    }
    /**
     * Click select button.
     * @return {Promise<void>}
     */
    async clickSelect() {
        await this.clickDraw();
        await this.tester.click("#slot-btn-draw-select");
    }
    /**
     * Set brush size
     * @param {string} elementSelector
     * @param {string} size
     * @return {Promise<void>}
     */
    async selectBrushSize(elementSelector, size) {
        const valueSelector = elementSelector + " .updown-picker-value";
        let countClick = 0;
        let sizeOption = [];
        if (elementSelector !== this.drawMethods.highlighter) {
            sizeOption = ["0.25 mm", "0.5 mm", "1 mm", "2 mm", "3.5 mm"];
        } else {
            sizeOption = ["2 mm", "4 mm", "6 mm", "8 mm", "10 mm"];
        }
        const indexOption = sizeOption.indexOf(size);
        const element = await this.tester.getTextElement(valueSelector);
        const elementIndex = sizeOption.indexOf(element);
        if (indexOption === -1 || elementIndex === -1) {
            throw new Error("Unknown index.");
        }
        if (elementIndex !== indexOption) {
            countClick = indexOption - elementIndex;
            await this.tester.setOptionByClick(elementSelector, countClick);
        }
    }
    /**
     * Method drawing by pen or highlighter.
     * @param {string} drawOption
     * @param {Color} color
     * @param {string} size
     * @return {Promise<void>}
     */
    async drawFunction(drawOption, color, size) {
        await this.clickDraw();
        switch (drawOption) {
            case "pen_1":
                await this.tester.selectDropdown(this.drawMethods.pen_1);
                if (size) {
                    await this.selectBrushSize(this.drawMethods.pen_1, size);
                }
                await this.color.selectColor(this.drawMethods.pen_1, color);
                break;
            case "pen_2":
                await this.tester.selectDropdown(this.drawMethods.pen_2);
                if (size) {
                    await this.selectBrushSize(this.drawMethods.pen_2, size);
                }
                await this.color.selectColor(this.drawMethods.pen_2, color);
                break;
            case "highlighter":
                await this.tester.selectDropdown(this.drawMethods.highlighter);
                if (size) {
                    await this.selectBrushSize(this.drawMethods.highlighter, size);
                }
                await this.color.selectColor(this.drawMethods.highlighter, color);
                break;
            default:
                throw new Error("Invalid draw option");
        }
    }

    /**
     * Drawing with penOne.
     * @param {Color} color
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} size
     * @return {Promise<void>}
     */
    async penOne(color, startX, startY, endX, endY, size) {
        await this.drawFunction("pen_1", color, size);
        await this.tester.mouseDrawingLine("#editor_sdk #id_viewer", startX, startY, endX, endY);
    }
    /**
     * Drawing with penTwo.
     * @param {Color} color
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} size
     * @return {Promise<void>}
     */
    async penTwo(color, startX, startY, endX, endY, size) {
        await this.drawFunction("pen_2", color, size);
        await this.tester.mouseDrawingLine("#editor_sdk #id_viewer", startX, startY, endX, endY);
    }
    /**
     * Drawing with highlighter.
     * @param {Color} color
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @param {number} size
     * @return {Promise<void>}
     */
    async highlighter(color, startX, startY, endX, endY, size) {
        await this.drawFunction("highlighter", color, size);
        await this.tester.mouseDrawingLine("#editor_sdk #id_viewer", startX, startY, endX, endY);
    }
    /**
     * Use eraser.
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX
     * @param {number} endY
     * @return {Promise<void>}
     */
    async eraser(startX, startY, endX, endY) {
        await this.tester.click("#slot-btn-draw-eraser");
        await this.tester.mouseDrawingLine("#editor_sdk #id_viewer", startX, startY, endX, endY);
    }
}
module.exports = Draw;

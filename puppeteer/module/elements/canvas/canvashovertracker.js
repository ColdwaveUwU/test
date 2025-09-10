const UIElement = require("../uielement");

class CanvasHoverTracker extends UIElement {
    constructor(tester, canvasSelector, valueSelector) {
        super(tester, canvasSelector);
        this.tester = tester;
        this.valueSelector = valueSelector;
    }

    async getCanvasBox() {
        const canvasHandle = await this.tester.frame.$(this.selector);
        if (!canvasHandle) {
            throw new Error(`Canvas element not found for selector: ${this.selector}`);
        }

        const boundingBox = await canvasHandle.boundingBox();
        if (!boundingBox) {
            throw new Error("Unable to retrieve bounding box for canvas element");
        }

        return boundingBox;
    }

    async getValueText() {
        return await this.tester.frame.evaluate((selector) => {
            const element = document.querySelector(selector);
            return element?.textContent?.trim() || null;
        }, this.valueSelector);
    }

    async hasValueChanged(initialValue) {
        const currentValue = await this.getValueText();
        return currentValue && currentValue !== initialValue;
    }

    async calculateCellSize(canvasBox, initValue) {
        const { page } = this.tester;
        const startX = canvasBox.x + 1;
        const startY = canvasBox.y + 1;

        let cellWidth = 0;
        let cellHeight = 0;

        for (let step = 1; step < Math.min(canvasBox.width, canvasBox.height); step++) {
            await page.mouse.move(startX + step, startY);
            if (!cellWidth && (await this.hasValueChanged(initValue))) {
                cellWidth = step;
            }

            await page.mouse.move(startX, startY + step);
            if (!cellHeight && (await this.hasValueChanged(initValue))) {
                cellHeight = step;
            }

            if (cellWidth && cellHeight) {
                break;
            }
        }

        if (!cellWidth || !cellHeight) {
            throw new Error("Failed to determine table cell dimensions");
        }

        return { cellWidth, cellHeight, startX, startY };
    }

    async moveToCell(column, row, cellWidth, cellHeight, startX, startY) {
        if (column < 1 || row < 1) {
            throw new Error(`Invalid column (${column}) or row (${row}) index`);
        }

        const targetX = startX + (column - 1) * cellWidth + cellWidth / 2;
        const targetY = startY + (row - 1) * cellHeight + cellHeight / 2;

        await this.tester.page.mouse.move(targetX, targetY);
        return { targetX, targetY };
    }

    async hoverToValue(column, row, { initValue, targetValue }) {
        const canvasBox = await this.getCanvasBox();
        const { cellWidth, cellHeight, startX, startY } = await this.calculateCellSize(canvasBox, initValue);
        const { targetX, targetY } = await this.moveToCell(column, row, cellWidth, cellHeight, startX, startY);

        const actualValue = await this.getValueText();
        if (actualValue !== targetValue) {
            throw new Error(`Expected value "${targetValue}", but got "${actualValue}"`);
        }

        return { x: targetX, y: targetY };
    }

    async click(x, y) {
        if (typeof x !== "number" || typeof y !== "number") {
            throw new Error("Click coordinates must be numbers");
        }
        await this.tester.page.mouse.click(x, y);
    }
}

module.exports = CanvasHoverTracker;

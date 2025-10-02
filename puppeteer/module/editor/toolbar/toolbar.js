const { Color } = require("../../common");
const { MoreButton } = require("./common");
/**
 * Wraps the given Toolbar class to automatically invoke `openTargetTab`
 * before each method call in the class.
 * @param {typeof Toolbar} Toolbar - The class to be wrapped.
 * @returns {typeof Toolbar} - A new class that extends the provided Toolbar
 * and automatically calls `openTargetTab` before each method in the class.
 */
function wrapToolbarClass(Toolbar) {
    return class extends Toolbar {
        constructor(...args) {
            super(...args);

            const prototype = Object.getPrototypeOf(this);
            for (const key of Object.getOwnPropertyNames(prototype)) {
                const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
                if (typeof descriptor?.value === "function" && key !== "constructor") {
                    this[key] = this.wrapMethods(this[key]);
                }
            }
        }

        wrapMethods(originalMethod) {
            return async (...args) => {
                const moreButton = new MoreButton();
                await this.openTargetTab();
                await moreButton.open();
                return originalMethod.apply(this, args);
            };
        }
    };
}

class Toolbar {
    constructor(tester, tabTarget, targetButton) {
        this.tabTarget = tabTarget;
        this.targetButton = targetButton;
        this.tabSelector = "";
        this.tester = tester || RegularTester;
        this.color = new Color(this.tester);
    }

    /**
     * Checks if the selector is active
     * @param {string} selector
     */
    async checkActive(selector) {
        return await this.tester.checkSelector(selector);
    }

    /**
     * Opens the desired tab on the toolbar
     */
    async openTargetTab() {
        let tabSelector = `#toolbar .box-tabs li.active a[data-title=${this.tabTarget}]`;

        if (
            !(await this.checkActive(tabSelector)) &&
            (await this.tester.findFrameByName()) === this.tester.getFrame()
        ) {
            await this.clickTargetTab();
        }
        this.tabSelector = tabSelector;
    }

    async clickTargetTab() {
        if (this.tabTarget === "File") {
            await this.tester.sleep(1000); // todo fix open FIleTab after mask
        }
        const tabSelector = `#toolbar .box-tabs li a[data-title=${this.tabTarget}]`;
        await this.tester.click(tabSelector);
    }

    /**
     * Clicks the target button on the page
     */
    async clickTargetButton(targetButton = "") {
        try {
            const targetSelector = targetButton || this.targetButton;
            if (targetSelector) {
                const isCaptionElement = await this.tester.frame.evaluate((elementSelector) => {
                    const element = document.querySelector(elementSelector);
                    if (!element) {
                        throw new Error(`Element with selector ${elementSelector} not found`);
                    }

                    const innerBoxCaption = element.querySelector("div.inner-box-caption");
                    return innerBoxCaption && element.ariaPressed === "true";
                }, targetSelector);

                if (!isCaptionElement) {
                    await this.tester.click(targetSelector);
                }
            }
        } catch (e) {
            throw new Error(`Error in clickTargetButton: ${e}`);
        }
    }
}

module.exports = wrapToolbarClass(Toolbar);

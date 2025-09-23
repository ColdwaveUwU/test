const HomeTab = require("../hometab");
const selectors = require("./selectors.json");
class SlideShowManager extends HomeTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SLIDESHOW_MANAGER_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        SLIDE_LAYOUT_TYPES: [
            "Title Slide",
            "Title and Content",
            "Section Header",
            "Two Content",
            "Comparison",
            "Title Only",
            "Blank",
            "Content with Caption",
            "Picture with Caption",
            "Title and Vertical Text",
            "Vertical Title and Text",
            "Duplicate slide",
        ],
    };

    /**
     * Click the default Add slide button or select slide type to add from the list.
     * If no type is provided, the default button will be clicked.
     * @param {
     * "Title Slide" |
     * "Title and Content" |
     * "Section Header" |
     * "Two Content" |
     * "Comparison" |
     * "Title Only" |
     * "Blank" |
     * "Content with Caption" |
     * "Picture with Caption" |
     * "Title and Vertical Text" |
     * "Vertical Title and Text" |
     * "Duplicate slide"} [type]
     */
    async addSlide(type) {
        const addSlideSelectors = SlideShowManager.SLIDESHOW_MANAGER_SELECTORS.ADD_SLIDE;
        if (!type) {
            await this.tester.click(addSlideSelectors.DEFAULT_BUTTON);
        } else if (type === "Duplicate slide") {
            await this.tester.click(addSlideSelectors.OPEN_DROPDOWN_BUTTON);
            await this.tester.click(addSlideSelectors.DUPLICATE_SLIDE);
        } else {
            await this.tester.click(addSlideSelectors.OPEN_DROPDOWN_BUTTON);
            const itemId = SlideShowManager.TYPES.SLIDE_LAYOUT_TYPES.indexOf(type) + 1;

            await this.tester.click(`${addSlideSelectors.DROPDOWN_ELEMENTS_SELECTOR}:nth-of-type(${itemId})`);
        }
    }

    /**
     * Click Duplicate slide in Add Slide menu
     */
    async duplicateSlide() {
        await this.addSlide("Duplicate slide");
    }

    /**
     * Select layout type from the Change slide layout list.
     * @param {
     * "Title Slide" |
     * "Title and Content" |
     * "Section Header" |
     * "Two Content" |
     * "Comparison" |
     * "Title Only" |
     * "Blank" |
     * "Content with Caption" |
     * "Picture with Caption" |
     * "Title and Vertical Text" |
     * "Vertical Title and Text"} [optionValue]
     */
    async changeSlideLayout(type) {
        const changeSlideLayoutSelectors = SlideShowManager.SLIDESHOW_MANAGER_SELECTORS.CHANGE_SLIDE_LAYOUT;

        await this.tester.click(changeSlideLayoutSelectors.OPEN_DROPDOWN_BUTTON);
        const changeSlideItems = SlideShowManager.TYPES.SLIDE_LAYOUT_TYPES.slice(0, -1);
        const itemId = changeSlideItems.indexOf(type) + 1;

        await this.tester.click(`${changeSlideLayoutSelectors.DROPDOWN_ELEMENTS_SELECTOR}:nth-of-type(${itemId})`);
    }
}

module.exports = SlideShowManager;

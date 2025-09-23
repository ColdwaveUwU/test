const ViewTab = require("../viewtab");

class PageZoom extends ViewTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * Click fit to page
     */
    async clickFitToPage() {
        const ftpSelector = "span.slot-btn-ftp button";
        await this.tester.click(ftpSelector);
    }
    /**
     * Click fit to page
     */
    async clickFitToWidth() {
        const ftwSelector = "span.slot-btn-ftw button";
        await this.tester.click(ftwSelector);
    }

    /**
     * @param {string} size
     * @return {Promise<void>}
     */
    async setZoomInput(size) {
        const inputSelector = "span.slot-field-zoom input.form-control";
        await this.tester.click(inputSelector);
        await this.tester.inputToForm(size, inputSelector);
        await this.tester.keyPress("Enter");
    }

    /**
     * @param {string} size - value with %
     * @return {Promise<void>}
     */
    async setZoomByClick(size) {
        const zoomDropdownSelector = "span.slot-field-zoom";
        const zoomSelectTextSelector = 'section[data-tab="view"] .dropdown-menu.ps-container.oo li a';
        await this.tester.selectDropdown(zoomDropdownSelector);
        await this.tester.selectByText(size, zoomSelectTextSelector);
    }
}

module.exports = PageZoom;

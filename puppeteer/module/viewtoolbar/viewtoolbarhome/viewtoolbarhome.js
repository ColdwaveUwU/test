const { Input } = require("../../elements");
class ViewToolbarHome {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }
    /**
     * @return {Promise<void>}
     */
    async clickHome() {
        const homeSelectorActive = '#toolbar .ribtab.active a[data-tab="home"]';
        const homeSelector = '#toolbar .ribtab a[data-tab="home"]';
        const selector = await this.tester.checkSelector(homeSelectorActive);
        if (!selector) {
            await this.tester.click(homeSelector);
        }
    }
    /**
     * @param {number} number
     * @return {Promise<void>}
     */
    async setPage(number) {
        const inputSelector = "#slot-btn-pages input";
        await this.clickHome();
        await this.tester.inputToForm(number, inputSelector);
        await this.tester.keyPress("Enter");
    }
    /**
     * @return {Promise<void>}
     */
    async setFirstPage() {
        const firstPageSelector = "#id-toolbar-btn-first-page";
        await this.clickHome();
        await this.tester.click(firstPageSelector);
    }
    /**
     * @return {Promise<void>}
     */
    async setLastPage() {
        const lastPageSelector = "#id-toolbar-btn-last-page";
        await this.clickHome();
        await this.tester.click(lastPageSelector);
    }
    /**
     * @return {Promise<void>}
     */
    async setPrevPage() {
        const prevPageSelector = "#id-toolbar-btn-prev-page";
        await this.clickHome();
        await this.tester.click(prevPageSelector);
    }
    /**
     * @return {Promise<void>}
     */
    async setNextPage() {
        const nextPageSelector = "#id-toolbar-btn-next-page";
        await this.clickHome();
        await this.tester.click(nextPageSelector);
    }
    /**
     * @return {Promise<void>}
     */
    async clickRotate() {
        const rotateSelector = "#tlbtn-rotate";
        await this.clickHome();
        await this.tester.click(rotateSelector);
    }
    /**
     * @return {Promise<void>}
     */
    async setZoomByClick(size) {
        const zoomDropdownSelector = 'section[data-tab="home"] .btn-slot.slot-field-zoom';
        const zoomSelectTextSelector = 'section[data-tab="home"] .dropdown-menu.ps-container.oo li';
        await this.clickHome();
        await this.tester.selectDropdown(zoomDropdownSelector);
        await this.tester.selectByText(size, zoomSelectTextSelector);
    }

    async setZoomInput(size) {
        const inputSelector = 'section[data-tab="home"] .input-group-nr';
        await this.clickHome();
        const setZoomInputForm = new Input(this.tester, inputSelector);
        await setZoomInputForm.set(size);
    }

    /**
     * @return {Promise<void>}
     */
    async clickFitPage() {
        const fitPageSelector = "#tlbtn-btn-ftp-0";
        await this.clickHome();
        await this.tester.click(fitPageSelector);
    }
    /**
     * @return {Promise<void>}
     */
    async clickWidthPage() {
        const widthPageSelector = "#tlbtn-btn-ftw-0";
        await this.clickHome();
        await this.tester.click(widthPageSelector);
    }
}
module.exports = ViewToolbarHome;

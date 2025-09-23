const { Input } = require("../../../../elements");
class ViewToolbarView {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }
    async clickView() {
        const viewSelectorActive = '#toolbar .ribtab.active[data-layout-name="toolbar-view"]';
        const viewSelector = '#toolbar .ribtab[data-layout-name="toolbar-view"]';
        const selector = await this.tester.checkSelector(viewSelectorActive);
        if (!selector) {
            await this.tester.click(viewSelector);
        }
    }
    /**
     * @return {Promise<void>}
     */
    async clickHeading() {
        await this.clickView();
        await this.tester.click("#slot-btn-navigation");
    }
    /**
     * @param {string} number - value with %
     * @return {Promise<void>}
     */
    async setZoomByClick(size) {
        const zoomDropdownSelector = 'section[data-tab="view"] .btn-slot.slot-field-zoom';
        const zoomSelectTextSelector = 'section[data-tab="view"] .dropdown-menu.ps-container.oo li';
        await this.clickView();
        await this.tester.selectDropdown(zoomDropdownSelector);
        await this.tester.selectByText(size, zoomSelectTextSelector);
    }
    /**
     * @param {string} number
     * @return {Promise<void>}
     */
    async setZoomInput(size) {
        const inputSelector = 'section[data-tab="view"] .input-group-nr';
        await this.clickView();
        const setZoomInputForm = new Input(this.tester, inputSelector);
        await setZoomInputForm.set(size);
    }
    /**
     * @return {Promise<void>}
     */
    async clickFitPage() {
        await this.clickView();
        await this.tester.click('section[data-tab="view"] .slot-btn-ftp button');
    }
    /**
     * @return {Promise<void>}
     */
    async clickWidthPage() {
        await this.clickView();
        await this.tester.click('section[data-tab="view"] .slot-btn-ftw button');
    }
    /**
     * @param {string} theme - Light, Dark etc..
     * @return {Promise<void>}
     */
    async setInterfaceTheme(theme) {
        await this.clickView();
        await this.tester.selectDropdown("#slot-btn-interface-theme");
        await this.tester.selectByText(theme, "#slot-btn-interface-theme .dropdown-menu li a");
    }
}
module.exports = ViewToolbarView;

class ViewToolbarFile {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }
    /**
     * @return {bool}
     */
    async isActive() {
        const fileSelectorActive = '#toolbar .ribtab.active a[data-tab="file"]';
        return await this.tester.checkSelector(fileSelectorActive);
    }
    /**
     * @return {Promise<void>}
     */
    async clickFile() {
        const isActive = await this.isActive();
        if (!isActive) {
            const fileSelector = '#toolbar .ribtab a[data-tab="file"]';
            await this.tester.click(fileSelector);
        }
    }
    /**
     * @return {Promise<void>}
     */
    async clickCloseMenu() {
        const isActive = await this.isActive();
        if (isActive) {
            const closeMenuSelector = "#fm-btn-return";
            await this.tester.click(closeMenuSelector);
        }
    }
}
module.exports = ViewToolbarFile;

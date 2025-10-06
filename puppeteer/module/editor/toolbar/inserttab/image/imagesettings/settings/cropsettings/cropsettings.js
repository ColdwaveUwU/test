const { CropImageType, ImageSettingButtonID } = require("../../../../../../../../constants");
const { OptionsButton } = require("../../../../../../../elements");
const selectors = require("./selectors.json");
/**
 * Class representing the crop settings functionality.
 */
class CropSettings {
    /**
     * @param {TesterImp} tester - The tester class.
     * @param {BasicImageSettings} basicImageSettings - The basic image settings.
     */
    constructor(tester, basicImageSettings) {
        this.tester = tester || RegularTester;
        this.basicImageSettings = basicImageSettings;
    }

    static SELECTORS = selectors;

    #cropOptionsButton = null;

    #getCropOptionsButton() {
        if (!this.#cropOptionsButton) {
            const { SELECTOR, BUTTON, DROPDOWN } = CropSettings.SELECTORS;
            this.#cropOptionsButton = new OptionsButton(this.tester, SELECTOR, BUTTON, {
                selector: DROPDOWN.SELECTOR,
                elementsSelector: DROPDOWN.ELEMENTS,
            });
        }
        return this.#cropOptionsButton;
    }

    /**
     * Set the dropdown crop method.
     * @param {string} cropMethod - The crop method to set.
     * @throws Will throw an error if the crop method is not found.
     */
    async setDropdownCrop(cropMethod) {
        try {
            const cropOptionsButton = this.#getCropOptionsButton();
            await cropOptionsButton.setOption(cropMethod);
        } catch (error) {
            throw new Error(`setDropdownCrop: ${error.message}`, { cause: error });
        }
    }

    /**
     * Crop the image to a specific shape.
     * @param {string} shapeType - The type of shape.
     * @param {string} shapeId - The ID of the shape.
     */
    async cropToShape(shapeType, shapeId) {
        try {
            const cropOptionsButton = this.#getCropOptionsButton();
            await cropOptionsButton.setOption("Crop to shape");
            const shapeListSelector = `${ImageSettingButtonID.ShapeList} .grouped-data`;
            const itemSelector = ".item";
            const descriptionSelector = ".group-description span";
            await this.tester.clickItem(shapeType, shapeId, shapeListSelector, itemSelector, descriptionSelector);
        } catch (error) {
            throw new Error(`cropToShape: ${error.message}`, { cause: error });
        }
    }
}
module.exports = CropSettings;

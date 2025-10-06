const InsertTab = require("../../inserttab");
const { CropSettings, WrappingStyle, ImageReplacement } = require("./settings");
const { CropImageType, WrappingImageType, ImageSettingButtonID } = require("../../../../../../constants");
const { Dropdown, ModalButton, Input, StateButton, Button } = require("../../../../../elements");

/**
 * Class representing the basic image settings.
 * @extends InsertTab
 */
class BasicImageSettings extends InsertTab {
    /**
     * Create a BasicImageSettings instance.
     * @param {TesterImp} tester - The tester object.
     */
    constructor(tester) {
        super(tester);
        this.cropSettings = new CropSettings(tester, this);
        this.wrappingStyle = new WrappingStyle(tester, this);
        this.imageReplacement = new ImageReplacement(tester, this);
    }

    /**
     * Open the image settings.
     */
    async openSettings() {
        try {
            const settingsButton = new StateButton(this.tester, ImageSettingButtonID.OpenSettings);
            await settingsButton.setState(true);
        } catch (error) {
            throw new Error(`openSettings: ${error.message}`, { cause: error });
        }
    }

    /**
     * Get the image size.
     * @returns {Promise<{width: number, height: number}>} The image size.
     */
    async getImageSize() {
        try {
            await this.openSettings();
            const frame = await this.tester.getFrame();

            const size = await frame.evaluate(
                (widthSelector, heightSelector) => {
                    const getSizeFromSelector = (selector) => {
                        const textContent = document.querySelector(selector)?.textContent;
                        const match = textContent ? textContent.match(/[\d.]+/) : null;
                        return match ? parseFloat(match[0]) : 0;
                    };

                    const width = getSizeFromSelector(widthSelector);
                    const height = getSizeFromSelector(heightSelector);

                    return { width, height };
                },
                ImageSettingButtonID.ImageWidth,
                ImageSettingButtonID.ImageHeight
            );

            return size;
        } catch (error) {
            throw new Error(`getImageSize: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click a setting button.
     * @param {string} buttonSelector - The selector for the button.
     */
    async clickSetting(buttonSelector) {
        try {
            const settingButton = new Button(this.tester, buttonSelector);
            await this.openSettings();
            await settingButton.click();
        } catch (error) {
            throw new Error(`clickSetting: ${error.message}`, { cause: error });
        }
    }

    /**
     * Crop the image.
     * @param {string} cropType - The type of crop.
     * @param {string} [shapeType=null] - The type of shape (if cropping to a shape).
     * @param {string} [shapeId=null] - The ID of the shape (if cropping to a shape).
     */
    async crop(cropType, shapeType = null, shapeId = null) {
        try {
            await this.openSettings();
            if (cropType === CropImageType.Shape && shapeType && shapeId) {
                await this.cropSettings.cropToShape(shapeType, shapeId);
            } else {
                await this.cropSettings.setDropdownCrop(cropType);
            }
        } catch (error) {
            throw new Error(`crop: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click a wrapping style button.
     * @param {string} wrappingStyle - The name of the wrapping style.
     */
    async clickWrappingStyle(wrappingStyle) {
        try {
            await this.openSettings();
            await this.wrappingStyle.clickWrappingStyle(wrappingStyle);
        } catch (error) {
            throw new Error(`clickWrappingStyle: ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image.
     * @param {"File" | "Url" | "Storage"} sourceType - The type of source .
     * @param {string} [sourceValue=null] - The source value.
     */
    async replaceImage(sourceType, sourceValue = null) {
        try {
            await this.openSettings();
            await this.imageReplacement.replaceFile(sourceType, sourceValue);
        } catch (error) {
            throw new Error(`replaceImage: ${error.message}`, { cause: error });
        }
    }
}

module.exports = BasicImageSettings;

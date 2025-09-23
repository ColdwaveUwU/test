const path = require("path");
const InsertTab = require("../../inserttab");
const { ImageInsert } = require("../imageinsert");
const { CropImageType, WrappingImageType, ImageSettingButtonID } = require("../../../../../../constants");

/**
 * Class representing the image replacement functionality.
 */
class ImageReplacement {
    /**
     * @param {TesterImp} tester - The Tester class
     * @param {BasicImageSettings} basicImageSettings - The basic image settings.
     */
    constructor(tester, basicImageSettings) {
        this.tester = tester || RegularTester;
        this.basicImageSettings = basicImageSettings;
    }

    /**
     * Open the replace image menu.
     * @private
     */
    async #openReplaceMenu() {
        try {
            await this.tester.selectDropdown(ImageSettingButtonID.ReplaceImage);
        } catch (error) {
            throw new Error(`#openReplaceMenu: ${error.message}`, { cause: error });
        }
    }
    /**
     * Parse the available replace methods.
     * @returns {Promise<Array<{id: string, name: string}>>} The parsed replace methods.
     * @private
     */
    async #parseReplaceMethods() {
        try {
            const listSelector = `${ImageSettingButtonID.ReplaceImage} ul.dropdown-menu li a.menu-item`;
            const itemSelector = "a.menu-item";
            const replaceMethodElements = await this.tester.parseItems(listSelector, itemSelector);
            const replaceMethodTypes = Object.values(ImageInsert.LOAD_METHODS);

            return replaceMethodElements.map((element, index) => ({
                id: element.id,
                name: replaceMethodTypes[index],
            }));
        } catch (error) {
            throw new Error(`#parseReplaceMethods: ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image from a file.
     * @param {string} directoryPath - The path to the directory containing the file.
     * @param {string} buttonId - The button ID to click.
     * @private
     */
    async #replaceFromFile(directoryPath, buttonId) {
        try {
            const [fileChooser] = await Promise.all([
                this.tester.page.waitForFileChooser(),
                this.tester.click(buttonId),
            ]);
            await fileChooser.accept([directoryPath]);
        } catch (error) {
            throw new Error(`#replaceFromFile: ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image from a URL.
     * @param {string} url - The URL of the image.
     * @param {string} buttonId - The button ID to click.
     * @private
     */
    async #replaceFromUrl(url, buttonId) {
        try {
            const imageInsert = new ImageInsert(this.tester);
            await imageInsert.initSelectors();
            const { INSERT_METHODS } = imageInsert.currentSelectors;
            const inputFormIsLoaded = this.tester.checkSelector(INSERT_METHODS.FROM_URL.INPUT_FORM);
            await this.tester.click(buttonId);
            await inputFormIsLoaded;
            await this.tester.inputToForm(url, INSERT_METHODS.FROM_URL.INPUT_FORM);
            const loading = this.tester.page.waitForResponse((response) => response.ok());
            await this.tester.click('button[result="ok"]');
            await loading;
            if (await this.tester.checkSelector(`${INSERT_METHODS.FROM_URL.INPUT_FORM} .error`)) {
                console.log("Incorrect URL. The cancel button was pressed.");
                await this.tester.click('button[result="cancel"]');
            }
        } catch (error) {
            throw new Error(`#replaceFromUrl: ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image from storage.
     * @param {string} buttonId - The button ID to click.
     * @private
     */
    async #replaceFromStorage(buttonId) {
        try {
            await this.tester.click(buttonId);
        } catch (error) {
            throw new Error(`#replaceFromStorage: ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image file.
     * @param {"File" | "Url" | "Storage"} - The type of source ('File', 'Url', 'Storage').
     * @param {string} [sourceValue=null] - The source value.
     * @throws Will throw an error if the source type is invalid.
     */
    async replaceFile(sourceType, sourceValue = null) {
        try {
            await this.#openReplaceMenu();
            const replaceMethods = await this.#parseReplaceMethods();

            switch (sourceType) {
                case ImageInsert.LOAD_METHODS.FromFile:
                    const directoryPath = path.join(workDirectory, "files", "images", sourceValue);
                    const fromFileButtonId = replaceMethods.find(
                        (method) => method.name === ImageInsert.LOAD_METHODS.FromFile
                    ).id;
                    await this.#replaceFromFile(directoryPath, fromFileButtonId);
                    break;
                case ImageInsert.LOAD_METHODS.FromUrl:
                    const fromUrlButtonId = replaceMethods.find(
                        (method) => method.name === ImageInsert.LOAD_METHODS.FromUrl
                    ).id;
                    await this.#replaceFromUrl(sourceValue, fromUrlButtonId);
                    break;
                case ImageInsert.LOAD_METHODS.FromStorage:
                    const fromStorageButtonId = replaceMethods.find(
                        (method) => method.name === ImageInsert.LOAD_METHODS.FromStorage
                    ).id;
                    await this.#replaceFromStorage(fromStorageButtonId);
                    break;
                default:
                    throw new Error("Invalid source type specified. Use 'File', 'Url', or 'Storage'.");
            }
        } catch (error) {
            throw new Error(`replaceFile: ${error.message}`, { cause: error });
        }
    }
}

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

    /**
     * Set the dropdown crop method.
     * @param {string} cropMethod - The crop method to set.
     * @throws Will throw an error if the crop method is not found.
     */
    async setDropdownCrop(cropMethod) {
        try {
            const frame = await this.tester.getFrame();
            const cropSelector = ImageSettingButtonID.CropButton;
            await this.tester.selectDropdown(cropSelector);

            const cropMethods = await frame.evaluate((cropSelector) => {
                return Array.from(document.querySelectorAll(`${cropSelector} ul.dropdown-menu li a`)).map(
                    (element) => ({
                        id: `#${element.id}`,
                        text: element.textContent,
                    })
                );
            }, cropSelector);

            const foundCropMethod = cropMethods.find((method) => method.text === cropMethod);
            if (foundCropMethod) {
                await this.tester.click(foundCropMethod.id);
            } else {
                throw new Error(`Crop method with name "${cropMethod}" not found`);
            }
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
            await this.setDropdownCrop(CropImageType.Shape);
            const shapeListSelector = `${ImageSettingButtonID.ShapeList} .grouped-data`;
            const itemSelector = ".item";
            const descriptionSelector = ".group-description span";
            await this.tester.clickItem(shapeType, shapeId, shapeListSelector, itemSelector, descriptionSelector);
        } catch (error) {
            throw new Error(`cropToShape: ${error.message}`, { cause: error });
        }
    }
}

/**
 * Class representing the wrapping style functionality.
 */
class WrappingStyle {
    /**
     * Create a WrappingStyle instance.
     * @param {TesterImp} tester - The Tester class.
     * @param {BasicImageSettings} basicImageSettings - The basic image settings.
     */
    constructor(tester, basicImageSettings) {
        this.tester = tester || RegularTester;
        this.basicImageSettings = basicImageSettings;
    }

    /**
     * Open the wrapping style list.
     * @private
     */
    async #openWrappingList() {
        try {
            await this.tester.selectDropdown(ImageSettingButtonID.WrappingDropdown);
        } catch (error) {
            throw new Error(`#openWrappingList: ${error.message}`, { cause: error });
        }
    }

    /**
     * Parse the available wrapping styles.
     * @returns {Promise<Array<{id: string, name: string}>>} The parsed wrapping styles.
     * @private
     */
    async #parseWrappingStyles() {
        try {
            const listSelector = `${ImageSettingButtonID.WrappingDropdown} div.btn-group .dataview .item-icon-box`;
            const itemSelector = ".item-icon-box";
            const wrappingStyleElements = await this.tester.parseItems(listSelector, itemSelector);

            const wrappingImageTypes = Object.values(WrappingImageType);

            return wrappingStyleElements.map((element, index) => ({
                id: element.id,
                name: wrappingImageTypes[index],
            }));
        } catch (error) {
            throw new Error(`#parseWrappingStyles: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click the specified wrapping style.
     * @param {string} wrappingStyleName - The name of the wrapping style.
     * @throws Will throw an error if the wrapping style is not found.
     */
    async clickWrappingStyle(wrappingStyleName) {
        try {
            await this.#openWrappingList();
            const wrappingElements = await this.#parseWrappingStyles();
            const targetWrappingElement = wrappingElements.find((element) => element.name === wrappingStyleName);

            if (targetWrappingElement) {
                await this.tester.click(targetWrappingElement.id);
            } else {
                throw new Error(`Wrapping style with name "${wrappingStyleName}" not found`);
            }
        } catch (error) {
            throw new Error(`clickWrappingStyle: ${error.message}`, { cause: error });
        }
    }
}

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
            const settingButtonSelector = ImageSettingButtonID.OpenSettings;
            const isActiveButton = await this.tester.checkSelector(`${settingButtonSelector}[aria-pressed="true"]`);
            if (!isActiveButton) {
                await this.tester.click(settingButtonSelector);
            }
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
            await this.openSettings();
            await this.tester.click(buttonSelector);
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

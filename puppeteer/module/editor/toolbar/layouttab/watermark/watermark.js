const path = require("path");
const LayoutTab = require("../layouttab");
const { Button, Dropdown, DropdownInput, Input, Checkbox, ModalButton, StateButton } = require("../../../../elements");
const { Color, DocumentUploader } = require("../../../../common");
const selectors = require("./selectors.json");
const textPresets = require("./textpresets.json");

class Watermark extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static WATERMARK_SELECTORS = selectors;

    /**
     * @enum
     */
    static TEXT_PRESETS = textPresets;

    /**
     * @enum
     */
    static TYPES = {
        WATERMARK_MENU_TYPES: ["Custom watermark", "Remove watermark"],
        WATERMARK_LANGUAGES: [
            "العربية‏",
            "Deutsch",
            "English",
            "Español",
            "Français",
            "Italiano",
            "日本語",
            "Русский",
            "中文",
        ],
        FONT_SIZES: ["Auto", "36", "40", "44", "48", "54", "60", "66", "72", "80", "90", "96", "105", "120", "144"],
        IMAGE_UPLOAD_TYPES: ["From file", "From URL", "From storage"],
        SCALE_TYPES: ["Auto", "500%", "200%", "150%", "100%", "50%"],
    };

    #watermarkModalWindow = null;
    #waterMarkDropdown = null;

    #getWatermarkWindow(openSelector) {
        if (!this.#watermarkModalWindow && openSelector) {
            const { WINDOW, OK_BUTTON } = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW;
            this.#watermarkModalWindow = new ModalButton(this.tester, openSelector, WINDOW, OK_BUTTON);
        }
        return this.#watermarkModalWindow;
    }

    #getWatermarkDropdown() {
        if (!this.#waterMarkDropdown) {
            const watermarkMenuSelectors = Watermark.WATERMARK_SELECTORS.WATERMARK_MENU;
            this.#waterMarkDropdown = new Dropdown(this.tester, {
                selector: watermarkMenuSelectors.MENU_SELECTOR,
                elementsValue: Watermark.TYPES.WATERMARK_MENU_TYPES,
                elementsSelector: watermarkMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });
        }
        return this.#waterMarkDropdown;
    }

    /**
     * Select watermark option from dropdown menu
     * @param {"Custom watermark" | "Remove watermark"} [optionValue]
     */
    async setWatermark(optionValue) {
        try {
            const watermarkDropdown = this.#getWatermarkDropdown();
            await watermarkDropdown.selectDropdownItem(optionValue);
        } catch (error) {
            throw new Error(`setWatermark: Failed to select watermark option "${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Open Watermark settings window
     */
    async openWatermarkSettingsWindow() {
        const watermarkSettingsWindowSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.WINDOW;
        try {
            const watermarkDropdown = this.#getWatermarkDropdown();
            const { id } = await watermarkDropdown.getDropdownItem("description", "Custom watermark");

            const watermarkSettingsWindow = this.#getWatermarkWindow(id);
            await watermarkSettingsWindow.openModal();
        } catch (error) {
            throw new Error(
                `openWatermarkSettingsWindow: Failed to open watermark settings window "${watermarkSettingsWindowSelector}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Set watermark type
     * @param {"None" | "Text watermark" | "Image watermark"} [watermarkType]
     */
    async setWatermarkType(watermarkType) {
        const watermarkTypeSelectors = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.WATERMARK_TYPES;

        const selectorMap = {
            None: watermarkTypeSelectors.NONE,
            "Text watermark": watermarkTypeSelectors.TEXT_WATERMARK,
            "Image watermark": watermarkTypeSelectors.IMAGE_WATERMARK,
        };

        try {
            const selector = selectorMap[watermarkType];
            if (!selector) {
                throw new Error(`Unknown watermark type: "${watermarkType}"`);
            }

            const waterMarkRadioButton = new Checkbox(this.tester, selector);
            await waterMarkRadioButton.set(true);
        } catch (error) {
            throw new Error(`setWatermarkType: Failed to set watermark type "${watermarkType}". ${error.message}`);
        }
    }

    /**
     * Set language
     * @param {"العربية‏" | "Deutsch" | "English" | "Español" | "Français" |
     * "Italiano" | "日本語" | "Русский" | "中文"} [language]
     */
    async setLanguage(language) {
        const languageMenuSelectors = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.LANGUAGE_MENU;
        try {
            const languageDropdown = new Dropdown(this.tester, {
                selector: languageMenuSelectors.MENU_SELECTOR,
                elementsValue: Watermark.TYPES.WATERMARK_LANGUAGES,
                elementsSelector: languageMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: languageMenuSelectors.DESCRIPTION_SELECTOR,
            });

            await languageDropdown.selectDropdownItem(language);
        } catch (error) {
            throw new Error(`setLanguage: Failed to select language option "${language}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Get selected language of watermark
     */
    async getSelectedLanguage() {
        const languageMenuElementsSelector =
            Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.LANGUAGE_MENU.DROPDOWN_ELEMENTS_SELECTOR;
        const selectedLanguageSelector = `${languageMenuElementsSelector}.selected > a`;
        const selectedLanguage = await this.tester.getTextElement(selectedLanguageSelector);
        return selectedLanguage;
    }

    /**
     * Set text of watermark
     * Can select value from list or enter custom text
     * @param {string} [text]
     */
    async setText(text) {
        const textMenuSelectors = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.TEXT_MENU;
        const selectedLanguage = await this.getSelectedLanguage();
        const textPresets = Watermark.TEXT_PRESETS[selectedLanguage];

        try {
            const textDropdownInput = new DropdownInput(this.tester, {
                selector: textMenuSelectors.MENU_SELECTOR,
                elementsValue: textPresets,
                elementsSelector: textMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: textMenuSelectors.DESCRIPTION_SELECTOR,
            });

            await textDropdownInput.set(text);
        } catch (error) {
            throw new Error(`setText: Failed to set text option "${text}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Select a font from the list
     * @param {string} fontName
     */
    async setFont(fontName) {
        const fontMenuSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.FONT_MENU;
        try {
            const inputFont = new Input(this.tester, fontMenuSelector, false);
            await inputFont.set(fontName);
        } catch (error) {
            throw new Error(`setFont: Failed to set font "${fontName}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set font size
     * Can select value from list or enter custom text
     * @param {string} fontSize
     */
    async setFontSize(fontSize) {
        const fontSizeMenuSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.FONT_SIZE_MENU;
        const fontSizePresets = Watermark.TYPES.FONT_SIZES;

        try {
            const fontSizeDropdownInput = new DropdownInput(this.tester, {
                selector: fontSizeMenuSelector.MENU_SELECTOR,
                elementsValue: fontSizePresets,
                elementsSelector: fontSizeMenuSelector.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: fontSizeMenuSelector.DESCRIPTION_SELECTOR,
            });

            await fontSizeDropdownInput.set(fontSize);
        } catch (error) {
            throw new Error(`setFontSize: Failed to set font size "${fontSize}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set font color
     * @param {Color} fontColor
     */
    async setFontColor(fontColor) {
        const fontColorSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.FONT_COLOR;
        const colorLib = new Color(this.tester);

        try {
            await colorLib.selectColor(fontColorSelector, fontColor);
        } catch (error) {
            throw new Error(`setFontColor: Failed to set font color "${fontColor}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set bold
     */
    async setBold() {
        const boldSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.BOLD;

        try {
            const boldButton = new StateButton(this.tester, boldSelector);
            await boldButton.click();
        } catch (error) {
            throw new Error(`setBold: Failed to set bold ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set italic
     */
    async setItalic() {
        const italicSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.ITALIC;

        try {
            const italicButton = new StateButton(this.tester, italicSelector);
            await italicButton.click();
        } catch (error) {
            throw new Error(`setItalic: Failed to set italic ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set underline
     */
    async setUnderline() {
        const underlineSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.UNDERLINE;

        try {
            const underlineButton = new StateButton(this.tester, underlineSelector);
            await underlineButton.click();
        } catch (error) {
            throw new Error(`setUnderline: Failed to set underline ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set striketrough
     */
    async setStrikethrough() {
        const strikethroughSelector = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.STRIKETHROUGH;

        try {
            const strikethroughButton = new StateButton(this.tester, strikethroughSelector);
            await strikethroughButton.click();
        } catch (error) {
            throw new Error(`setStrikethrough: Failed to set strikethrough ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set "Semitransparent" checkbox
     * @param {boolean} [condition]
     */
    async setSemitransparent(condition) {
        const semitransparentSelector =
            Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.SEMITRANSPARENT_CHECKBOX;

        try {
            const checkbox = new Checkbox(this.tester, semitransparentSelector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(`setSemitransparent: Failed to set semitransparent ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set layout
     * @param {"Diagonal" | "Horizontal"} [layoutType]
     */
    async setLayout(layoutType) {
        const layoutTypeSelectors = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.LAYOUT;
        const selectorMap = {
            Diagonal: layoutTypeSelectors.DIAGONAL,
            Horizontal: layoutTypeSelectors.HORIZONTAL,
        };

        try {
            const selector = selectorMap[layoutType];
            if (!selector) {
                throw new Error(`Unknown watermark type: "${layoutType}"`);
            }

            const waterMarkRadioButton = new Checkbox(this.tester, selector);
            await waterMarkRadioButton.set(true);
        } catch (error) {
            throw new Error(`setLayout: Failed to set layout option "${layoutType}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set image upload
     * @param {"From file" | "From URL" | "From storage"} [uploadType]
     */
    async setImageUpload(uploadType) {
        const imageUploadSelectors = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.SELECT_IMAGE_MENU;

        try {
            const selectImageUploadDropdown = new Dropdown(this.tester, {
                selector: imageUploadSelectors.MENU_SELECTOR,
                elementsValue: Watermark.TYPES.IMAGE_UPLOAD_TYPES,
                elementsSelector: imageUploadSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });

            await selectImageUploadDropdown.selectDropdownItem(uploadType);
        } catch (error) {
            throw new Error(`setImageUpload: Failed to select image upload option "${uploadType}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Load image
     * @param {{ type: "From file" | "From URL" | "From storage", source: string }} [loadImageSettings] - The input settings.
     */
    async loadImage(loadImageSettings) {
        const documentUploader = new DocumentUploader(this.tester);
        try {
            switch (loadImageSettings.type) {
                case "From file":
                    const waitImageLoading = documentUploader.uploadFromFile(loadImageSettings.source);
                    await this.setImageUpload(loadImageSettings.type);
                    await waitImageLoading;
                    break;
                case "From URL":
                    await this.setImageUpload(loadImageSettings.type);
                    await documentUploader.uploadFromUrl(loadImageSettings.source);
                    break;
                case "From storage":
                    await this.setImageUpload(loadImageSettings.type);
                    await documentUploader.uploadFromStorage();
                    break;
                default:
                    throw new Error("Invalid source type specified. Use 'From file', 'From URL', or 'From storage'.");
            }
        } catch (error) {
            throw new Error(`loadImage: \n${error.message}`, { cause: error });
        }
    }

    /**
     * Set scale
     * @param {"Auto" | "500%" | "200%" | "150%" | "100%" | "50%"} [scale]
     */
    async setScale(scale) {
        const scaleSelectors = Watermark.WATERMARK_SELECTORS.WATERMARK_SETTINGS_WINDOW.SCALE_MENU;

        try {
            const selectScaleDropdown = new Dropdown(this.tester, {
                selector: scaleSelectors.MENU_SELECTOR,
                elementsValue: Watermark.TYPES.SCALE_TYPES,
                elementsSelector: scaleSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: scaleSelectors.DESCRIPTION_SELECTOR,
            });

            await selectScaleDropdown.selectDropdownItem(scale);
        } catch (error) {
            throw new Error(`setScale: Failed to select scale option "${scale}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Apply settings in Watermark settings window
     * @param {Object} watermarkSettings
     */
    async applySettings(watermarkSettings) {
        try {
            const settingsMap = {
                watermarkType: this.setWatermarkType.bind(this),
                language: this.setLanguage.bind(this),
                text: this.setText.bind(this),
                font: this.setFont.bind(this),
                fontSize: this.setFontSize.bind(this),
                fontColor: this.setFontColor.bind(this),
                bold: this.setBold.bind(this),
                italic: this.setItalic.bind(this),
                underline: this.setUnderline.bind(this),
                strikethrough: this.setStrikethrough.bind(this),
                semitransparent: this.setSemitransparent.bind(this),
                layout: this.setLayout.bind(this),
                image: this.loadImage.bind(this),
                scale: this.setScale.bind(this),
            };

            for (const [key, method] of Object.entries(settingsMap)) {
                if (key in watermarkSettings) {
                    await method(watermarkSettings[key]);
                }
            }
        } catch (error) {
            throw new Error(`applySettings: Failed to apply settings: ${watermarkSettings}. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click OK button in Watermark settings window
     */
    async clickOkButton() {
        try {
            const watermarkSettingsWindow = this.#getWatermarkWindow();
            await watermarkSettingsWindow.closeModal();
        } catch (error) {
            throw new Error(`clickOkButton: Failed to click ok button. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Open Watermark settings window, apply settings and click OK button
     * @param {Object} watermarkSettings
     */
    async setWatermarkSettings(watermarkSettings) {
        try {
            await this.openWatermarkSettingsWindow();
            await this.applySettings(watermarkSettings);
            await this.clickOkButton();
        } catch (error) {
            throw new Error(`setWatermarkSettings: Failed set settings". \n${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = Watermark;

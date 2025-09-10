const { ImageInsert } = require("./imageinsert");
const { BasicImageSettings } = require("./imagesettings");
const { CropImageType, ShapeType, ImageSettingButtonID, WrappingImageType } = require("../../../../../constants");

/**
 * Class representing image operations.
 */
class Image {
    /**
     * Create an Image instance.
     * @param {object} tester - The tester object.
     */
    constructor(tester) {
        this.tester = tester || RegularTester;
        this.insert = new ImageInsert(tester);
        this.basicSettings = new BasicImageSettings(tester);
    }

    /**
     * Insert an image from a file.
     * @param {string} fileName - The file name of the image.
     */
    async fromFile(fileName) {
        try {
            await this.insert.loadFile(ImageInsert.LOAD_METHODS.FromFile, fileName);
        } catch (error) {
            throw new Error(`fromFile: Failed to insert image from file. ${error.message}`, { cause: error });
        }
    }

    /**
     * Insert an image from a URL.
     * @param {string} url - The URL of the image.
     */
    async fromUrl(url) {
        try {
            await this.insert.loadFile(ImageInsert.LOAD_METHODS.FromUrl, url);
        } catch (error) {
            throw new Error(`fromUrl: Failed to insert image from URL. ${error.message}`, { cause: error });
        }
    }

    /**
     * Insert an image from storage.
     */
    async fromStorage() {
        try {
            if (!this.tester.providerAddon) {
                await this.insert.loadFile(ImageInsert.LOAD_METHODS.FromStorage);
            } else {
                throw new Error("Not supported with provider addon");
            }
        } catch (error) {
            throw new Error(`fromStorage: Failed to insert image from storage. ${error.message}`, { cause: error });
        }
    }

    /**
     * Get the size of the image.
     * @returns {Promise<{width: number, height: number}>} The size of the image.
     */
    async getImageSize() {
        try {
            return await this.basicSettings.getImageSize();
        } catch (error) {
            throw new Error(`getImageSize: Failed to get image size. ${error.message}`, { cause: error });
        }
    }
    /**
     * Click the actual size button.
     */
    async clickActualSize() {
        try {
            await this.basicSettings.clickSetting(ImageSettingButtonID.ActualSize);
        } catch (error) {
            throw new Error(`clickActualSize: Failed to click actual size button. ${error.message}`, { cause: error });
        }
    }

    /**
     * Fit the image to the margin.
     */
    async fitToMargin() {
        try {
            await this.basicSettings.clickSetting(ImageSettingButtonID.FitToMargin);
        } catch (error) {
            throw new Error(`fitToMargin: Failed to fit image to margin. ${error.message}`, { cause: error });
        }
    }

    /**
     * Rotate the image to the right.
     */
    async rotateRight() {
        try {
            await this.basicSettings.clickSetting(ImageSettingButtonID.RotateRight);
        } catch (error) {
            throw new Error(`rotateRight: Failed to rotate image to the right. ${error.message}`, { cause: error });
        }
    }

    /**
     * Rotate the image to the left.
     */
    async rotateLeft() {
        try {
            await this.basicSettings.clickSetting(ImageSettingButtonID.RotateLeft);
        } catch (error) {
            throw new Error(`rotateLeft: Failed to rotate image to the left. ${error.message}`, { cause: error });
        }
    }

    /**
     * Flip the image horizontally.
     */
    async fliph() {
        try {
            await this.basicSettings.clickSetting(ImageSettingButtonID.Fliph);
        } catch (error) {
            throw new Error(`fliph: Failed to flip image horizontally. ${error.message}`, { cause: error });
        }
    }

    /**
     * Flip the image vertically.
     */
    async flipv() {
        try {
            await this.basicSettings.clickSetting(ImageSettingButtonID.Flipv);
        } catch (error) {
            throw new Error(`flipv: Failed to flip image vertically. ${error.message}`, { cause: error });
        }
    }

    /**
     * reset crop the image.
     */
    async clickResetCrop() {
        try {
            await this.basicSettings.clickSetting(ImageSettingButtonID.ResetCrop);
        } catch (error) {
            throw new Error(`clickResetCrop: Failed to reset crop. ${error.message}`, { cause: error });
        }
    }

    /**
     * Crop the image to fill.
     */
    async fill() {
        try {
            await this.basicSettings.crop(CropImageType.Fill);
        } catch (error) {
            throw new Error(`fill: Failed to crop image to fill. ${error.message}`, { cause: error });
        }
    }

    /**
     * Fit the image.
     */
    async fit() {
        try {
            await this.basicSettings.crop(CropImageType.Fit);
        } catch (error) {
            throw new Error(`fit: Failed to fit image. ${error.message}`, { cause: error });
        }
    }

    /**
     * Crop the image.
     */
    async crop() {
        try {
            await this.basicSettings.crop(CropImageType.Crop);
        } catch (error) {
            throw new Error(`crop: Failed to crop image. ${error.message}`, { cause: error });
        }
    }

    /**
     * Crop the image to a recently used shape.
     * @param {number} id - The ID of the shape.
     */
    async cropRecentlyShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Recently, id);
        } catch (error) {
            throw new Error(`cropRecentlyShape: Failed to crop image to recently used shape. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Crop the image to a basic shape.
     * @param {number} id - The ID of the shape.
     */
    async cropBasicShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Basic, id);
        } catch (error) {
            throw new Error(`cropBasicShape: Failed to crop image to basic shape. ${error.message}`, { cause: error });
        }
    }

    /**
     * Crop the image to a figure shape.
     * @param {number} id - The ID of the shape.
     */
    async cropFigureShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Figure, id);
        } catch (error) {
            throw new Error(`cropFigureShape: Failed to crop image to figure shape. ${error.message}`, {
                cause: error,
            });
        }
    }
    /**
     * Crop the image to a math shape.
     * @param {number} id - The ID of the shape.
     */
    async cropMathShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Math, id);
        } catch (error) {
            throw new Error(`cropMathShape: Failed to crop image to math shape. ${error.message}`, { cause: error });
        }
    }

    /**
     * Crop the image to a chart shape.
     * @param {number} id - The ID of the shape.
     */
    async cropChartShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Chart, id);
        } catch (error) {
            throw new Error(`cropChartShape: Failed to crop image to chart shape. ${error.message}`, { cause: error });
        }
    }
    /**
     * Crop the image to an Stars & ribbons shape.
     * @param {number} id - The ID of the shape.
     */
    async cropSRShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.SR, id);
        } catch (error) {
            throw new Error(`cropSRShape: Failed to crop image to Stars & ribbons shape. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Crop the image to a callout shape.
     * @param {number} id - The ID of the shape.
     */
    async cropCalloutShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Callout, id);
        } catch (error) {
            throw new Error(`cropCalloutShape: Failed to crop image to callout shape. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Crop the image to a button shape.
     * @param {number} id - The ID of the shape.
     */
    async cropButtonShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Button, id);
        } catch (error) {
            throw new Error(`cropButtonShape: Failed to crop image to button shape. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Crop the image to a rectangle shape.
     * @param {number} id - The ID of the shape.
     */
    async cropRectangleShape(id) {
        try {
            await this.basicSettings.crop(CropImageType.Shape, ShapeType.Rectangle, id);
        } catch (error) {
            throw new Error(`cropRectangleShape: Failed to crop image to rectangle shape. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set wrapping style to inline.
     */
    async wrapInLine() {
        try {
            await this.basicSettings.clickWrappingStyle(WrappingImageType.InLine);
        } catch (error) {
            throw new Error(`wrapInLine: Failed to set wrapping style to inline. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set wrapping style to square.
     */
    async wrapSquare() {
        try {
            await this.basicSettings.clickWrappingStyle(WrappingImageType.Square);
        } catch (error) {
            throw new Error(`wrapSquare: Failed to set wrapping style to square. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set wrapping style to tight.
     */
    async wrapTight() {
        try {
            await this.basicSettings.clickWrappingStyle(WrappingImageType.Tight);
        } catch (error) {
            throw new Error(`wrapTight: Failed to set wrapping style to tight. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set wrapping style to through.
     */
    async wrapThrough() {
        try {
            await this.basicSettings.clickWrappingStyle(WrappingImageType.Through);
        } catch (error) {
            throw new Error(`wrapThrough: Failed to set wrapping style to through. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set wrapping style to top and bottom.
     */
    async wrapTnB() {
        try {
            await this.basicSettings.clickWrappingStyle(WrappingImageType.TnB);
        } catch (error) {
            throw new Error(`wrapTnB: Failed to set wrapping style to top and bottom. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set wrapping style to in front.
     */
    async wrapInFront() {
        try {
            await this.basicSettings.clickWrappingStyle(WrappingImageType.InFront);
        } catch (error) {
            throw new Error(`wrapInFront: Failed to set wrapping style to in front. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set wrapping style to behind.
     */
    async wrapBehind() {
        try {
            await this.basicSettings.clickWrappingStyle(WrappingImageType.Behind);
        } catch (error) {
            throw new Error(`wrapBehind: Failed to set wrapping style to behind. ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image from a file.
     * @param {string} filename - The file name of the image.
     */
    async replaceFromFile(filename) {
        try {
            await this.basicSettings.replaceImage(ImageInsert.LOAD_METHODS.FromFile, filename);
        } catch (error) {
            throw new Error(`replaceFromFile: Failed to replace image from file. ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image from a URL.
     * @param {string} url - The URL of the image.
     */
    async replaceFromUrl(url) {
        try {
            await this.basicSettings.replaceImage(ImageInsert.LOAD_METHODS.FromUrl, url);
        } catch (error) {
            throw new Error(`replaceFromUrl: Failed to replace image from URL. ${error.message}`, { cause: error });
        }
    }

    /**
     * Replace the image from storage.
     */
    async replaceFromStorage() {
        try {
            if (!this.tester.providerAddon) {
                await this.basicSettings.replaceImage(ImageInsert.LOAD_METHODS.FromStorage);
            } else {
                throw new Error("Not supported with provider addon");
            }
        } catch (error) {
            throw new Error(`replaceFromStorage: Failed to replace image from storage. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = Image;

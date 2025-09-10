const DocumentsCompare = require("../documentscompare");
const selectors = require("./selectors.json");

class CombineChanges extends DocumentsCompare {
    /**
     * @enum
     */
    static REVIEW_CHANGES_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        COMPARE_CHANGES: ["Document from file", "Document from URL", "Document from storage", "Comparison settings"],
    };

    constructor(tester) {
        super(tester, CombineChanges.REVIEW_CHANGES_SELECTORS, CombineChanges.TYPES.COMPARE_CHANGES);
    }

    async setSettings(optionValue) {
        try {
            await super.setSettings(optionValue);
        } catch (error) {
            throw new Error(`CombineChanges: ${error.message}`, { cause: error });
        }
    }

    async fromFile(filePath) {
        try {
            await super.fromFile(filePath);
        } catch (error) {
            throw new Error(`CombineChanges: ${error.message}`, { cause: error });
        }
    }

    async fromUrl(url) {
        try {
            await super.fromUrl(url);
        } catch (error) {
            throw new Error(`CombineChanges: ${error.message}`, { cause: error });
        }
    }

    async fromStorage() {
        try {
            await super.fromStorage();
        } catch (error) {
            throw new Error(`CombineChanges: ${error.message}`, { cause: error });
        }
    }
}

module.exports = CombineChanges;

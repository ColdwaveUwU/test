/**
 * Base class for handling settings interactions.
 */
class BaseSettings {
    /**
     * @param {Object} tester
     * @param {string} selector - Selector for the settings element.
     */
    constructor(tester = RegularTester, selector) {
        this.tester = tester;
        this.selector = selector;
    }

    /**
     * Validates that the provided settings object is a non-empty object.
     * Throws an error if the validation fails.
     * @param {Object} settings - The settings object to validate.
     * @throws {Error} If settings is not a non-empty object.
     */
    #validateSettings(settings) {
        if (!settings || typeof settings !== "object" || !Object.keys(settings).length) {
            throw new Error("Settings must be a non-empty object");
        }
    }

    /**
     * Applies a map of settings using provided handler functions.
     * @param {Object} settings - An object containing key-value pairs of settings to apply.
     * @param {Object.<string, function>} handlers - An object mapping setting keys to async handler functions.
     * @param {string} [contextName="settings"] - The context name used in error messages.
     * @throws {Error} If a setting key does not have a corresponding handler or if a handler fails.
     */
    async applySettingsMap(settings, handlers, contextName = "settings") {
        this.#validateSettings(settings);

        for (const [key, value] of Object.entries(settings)) {
            const handler = handlers[key];
            if (!handler) {
                const availableKeys = Object.keys(handlers).join(", ");
                throw new Error(`Unknown ${contextName} key: "${key}". Available keys: ${availableKeys}`);
            }

            try {
                await handler(value);
            } catch (err) {
                throw new Error(`Failed to apply ${contextName} "${key}": ${err.message}`);
            }
        }
    }

    /**
     * Opens the settings by clicking on the specified selector.
     */
    async open() {
        await this.tester.click(this.selector);
    }
}

module.exports = BaseSettings;

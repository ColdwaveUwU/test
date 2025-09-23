/**
 * Represents an asynchronous function to be executed by the User instance.
 * @callback UserFunction
 */

/**
 * @typedef {Object} userDetails
 * @property {string} name
 * @property {string} firstName
 * @property {string} lastName
 */

const modules = require("../../editor");
const { collectClasses } = require("../../../engine/script/js");

class User {
    /**
     * @param {userDetails} userDetails
     * @param {Object} config - Tester config
     */
    constructor(userDetails, config = RegularTester.config) {
        this.name = userDetails.name;
        this.firstName = userDetails.firstName;
        this.lastName = userDetails.lastName;
        this.Tester = new TesterImp(config, RegularTester.providerAddonClass, true);

        const classMap = collectClasses(modules);
        for (const name in classMap) {
            try {
                this[name] = new classMap[name](this.Tester);
            } catch (e) {
                throw new Error(`Failed to instantiate ${name}: ${e.message}`);
            }
        }
        this.userDetails = userDetails;
        this.resolveWait = [];
    }

    /**
     * Attach an event to the Tester instance.
     * @param {string} event - The event to attach.
     * @param {Function} action - The action to perform when the event is triggered.
     */
    attachEvent(event, action) {
        this.Tester.attachEvent(event, action);
    }

    /**
     * Dispatch an event using the Tester instance.
     * @param {string} event - The event to dispatch.
     * @param {Object} data - Data to be passed with the event.
     */
    dispatchEvent(event, data) {
        this.Tester.dispatchEvent(event, data);
    }
    /**
     * Creating a Browser.
     */
    async init() {
        if (this.Tester.providerAddon) {
            await this.Tester.launch();
            await this.Tester.providerAddon.connectToFile(RegularTester.page.url());
        } else {
            this.Tester.setUrl(RegularTester.page.url());
            await this.Tester.launch();
            await this.Tester.waitEditor();
        }
    }
    /**
     * Waiting for the do function to execute.
     */
    async wait() {
        await Promise.all(this.resolveWait);
        this.resolveWait = [];
    }

    /**
     * Execute a user-defined asynchronous function and add it to the list of promises to wait for.
     * @param {UserFunction} userFunction - The asynchronous function to be executed.
     * @returns {Promise<void>} A Promise that resolves when the user function completes.
     */
    async do(userFunction) {
        const promise = new Promise((resolve) => {
            userFunction.call(this).then(() => {
                resolve();
            });
        });
        this.resolveWait.push(promise);
    }

    /**
     * @param {UserFunction} userFunction - The asynchronous function to be executed.
     */
    async doSync(userFunction) {
        const promise = new Promise((resolve) => {
            userFunction.call(this).then(() => {
                resolve();
            });
        });
        await promise;
    }

    /**
     * Closing the user's created browser.
     */
    async close() {
        await this.Tester.browser.close();
    }
}

module.exports = User;

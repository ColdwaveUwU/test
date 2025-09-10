/**
 * @typedef {Object} userDetails
 * @property {string} name
 * @property {string} firstName
 * @property {string} lastName
 */

const { User } = require("./user");

class Collab {
    /**
     * @param {object} config - Tester config.
     */
    constructor(config) {
        this.config = config;

        /**
         * An array containing user instances participating in the collaboration.
         * @type {User[]}
         */
        this.users = [];
    }

    /**
     * Adds a new user to the collaborative environment.
     * @param {userDetails} userDetails - Details of the user to be added.
     * @returns {User} A promise that resolves to the added user instance.
     */
    async addUser(userDetails) {
        const user = new User(userDetails, this.config);
        await user.init();
        this.users.push(user);
        return user;
    }

    /**
     * Waits for specified users to complete their tasks.
     * @param {User[]} [usersArray=[]] - An array of user instances to wait for. If not provided, waits for all users.
     * @returns {Promise<void>} A promise that resolves when all specified users have completed their tasks.
     */
    async wait(usersArray = []) {
        const targetUsers = usersArray.length === 0 || !usersArray ? this.users : usersArray;

        return Promise.all(targetUsers.map(async (user) => await user.wait()));
    }

    /**
     * Closes users' browser windows.
     * @returns {Promise<void>} A promise that resolves when all users are closed.
     */
    async close() {
        await Promise.all(this.users.map(async (user) => await user.close()));
    }
}

module.exports = Collab;

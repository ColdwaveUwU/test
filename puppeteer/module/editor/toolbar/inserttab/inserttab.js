const Toolbar = require("../toolbar");

/**
 * @typedef {Object} Item
 * @property {string} description
 * @property {number} count
 * @property {number} index
 * @property {string} id
 */

class InsertTab extends Toolbar {
    constructor(tester, buttonSelector, isDropdown = false) {
        super(tester, "Insert", buttonSelector);
        this.isDropdown = isDropdown;
    }
}

module.exports = InsertTab;

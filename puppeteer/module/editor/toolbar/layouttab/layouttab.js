const Toolbar = require("../toolbar");

class LayoutTab extends Toolbar {
    constructor(tester, buttonSelector) {
        super(tester, "Layout", buttonSelector);
    }
}

module.exports = LayoutTab;

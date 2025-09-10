const Toolbar = require("../toolbar");

class CollaborationTab extends Toolbar {
    constructor(tester, buttonSelector) {
        super(tester, "Collaboration", buttonSelector);
    }
}

module.exports = CollaborationTab;

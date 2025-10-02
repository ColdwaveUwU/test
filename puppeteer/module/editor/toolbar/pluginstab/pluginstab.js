const Toolbar = require("../toolbar");

class PluginsTab extends Toolbar {
    constructor(tester, buttonSelector) {
        super(tester, "Plugins", buttonSelector);
    }
}

module.exports = PluginsTab;

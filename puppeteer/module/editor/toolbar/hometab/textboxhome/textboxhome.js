const { TextBoxActions } = require("../../common");
const HomeTab = require("../hometab");
const selectors = require("./selectors.json");

const TextBoxHome = TextBoxActions(HomeTab, selectors);
module.exports = TextBoxHome;

const TextBoxActions = require("../../../../common/textboxactions/textboxactions");
const HomeTab = require("../hometab");
const selectors = require("./selectors.json");

const TextBoxHome = TextBoxActions(HomeTab, selectors);
module.exports = TextBoxHome;
const TextBoxActions = require("../../../../common/textboxactions/textboxactions");
const InsertTab = require("../inserttab");
const selectors = require("./selectors.json");

const TextBoxInsert = TextBoxActions(InsertTab, selectors);
module.exports = TextBoxInsert;
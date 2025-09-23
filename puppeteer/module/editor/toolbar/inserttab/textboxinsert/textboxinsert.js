const { TextBoxActions } = require("../../common");
const InsertTab = require("../inserttab");
const selectors = require("./selectors.json");

const TextBoxInsert = TextBoxActions(InsertTab, selectors);
module.exports = TextBoxInsert;

const AppTitle = require("./apptitle");
const ModalWIndows = require("./modalwindows");
const RightMenu = require("./rightmenu");
const StatusBar = require("./statusbar");
const Toolbar = require("./toolbar");

const Toolmenu = require("./toolmenu");
module.exports = {
    AppTitle,
    StatusBar,
    ...Toolbar,
    ...ModalWIndows,
    ...RightMenu,
    ...Toolmenu,
};

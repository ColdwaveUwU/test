const EditPdf = require("./editpdf");
const Font = require("./font/font");
const TextForm = require("./textform");
const NumberFormatCell = require("./numberformatcell");
const SlideShowManager = require("./slideshowmanager");
const TextBoxHome = require("./textboxhome");
const Functions = require("./functions");
const Replace = require("./replace");

const HomeTab = {
    Font,
    TextForm,
    EditPdf,
    NumberFormatCell,
    SlideShowManager,
    Functions,
    Replace,
    TextBoxHome,
    HomeTab: require("./hometab"),
};

module.exports = HomeTab;

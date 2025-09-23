const HomeTab = require("./hometab");
const InsertTab = require("./inserttab");
const ViewTab = require("./viewtab");
const LayoutTab = require("./layouttab");
const CommentTab = require("./commentstab");
const FormTab = require("./formtab");
const CollaborationTab = require("./collaborationtab");
const Referencestab = require("./referencestab");
const FileMenu = require("./filetab");
const DrawTab = require("./drawtab");
const Toolbar = {
    ...HomeTab,
    ...InsertTab,
    ...ViewTab,
    ...LayoutTab,
    ...CommentTab,
    ...FormTab,
    ...CollaborationTab,
    ...Referencestab,
    ...FileMenu,
    ...DrawTab,
};

module.exports = Toolbar;

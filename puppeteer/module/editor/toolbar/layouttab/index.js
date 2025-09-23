const PageSize = require("./pagesize");
const PageOrientation = require("./pageorientation");
const PageColumns = require("./pagecolumns");
const PageBreakLayout = require("./pagebreaklayout");
const Hyphenation = require("./hyphenation");
const Watermark = require("./watermark");
const IndentsLayout = require("./indentslayout");
const Wrapping = require("./wrapping");
const BringForward = require("./bringforward");
const SendBackward = require("./sendbackward");
const AlignLayout = require("./alignlayout");
const GroupLayout = require("./grouplayout");
const MergeShapes = require("./mergeshapes");
const PageColor = require("./pagecolor");
const ColorsLayout = require("./colorslayout");

const LayoutTab = {
    Margins: require("./margins"),
    PageOrientation,
    PageColumns,
    PageSize,
    PageBreakLayout,
    LineNumbers: require("./linenumbers"),
    Hyphenation,
    Watermark,
    IndentsLayout,
    Wrapping,
    BringForward,
    SendBackward,
    AlignLayout,
    GroupLayout,
    MergeShapes,
    PageColor,
    ColorsLayout,
};
module.exports = LayoutTab;

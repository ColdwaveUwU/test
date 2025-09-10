const Bookmark = require("./bookmark");
const Caption = require("./caption");
const TableOfFigures = require("./tableoffigures");
const CrossReference = require("./crossreference");
const Footnote = require("./footnote");
const TableOfContents = require("./tableofcontents");

const ReferencesTab = {
    Bookmark,
    Caption,
    TableOfFigures,
    CrossReference,
    Footnote,
    TableOfContents,
};

module.exports = ReferencesTab;

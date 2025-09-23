const FormatSettings = require("./formatsettings");
const ParagraphSettings = require("./paragraphsettings");
const MailMergeSettings = require("./mailmergesettings");
const TableSettings = require("./tablesettings");
const ChartSettings = require("./chartsettings");
module.exports = { ...FormatSettings, ParagraphSettings, MailMergeSettings, TableSettings, ChartSettings };

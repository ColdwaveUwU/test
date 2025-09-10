const { CompareChanges, CombineChanges } = require("./documentscompare");
const CollaborationTab = {
    ReviewChanges: require("./reviewchanges"),
    CoEditing: require("./coediting"),
    AddComment: require("./addcomment"),
    ResolveComments: require("./resolvecomments"),
    DeleteComments: require("./deletecomments"),
    DisplayMode: require("./displaymode"),
    MailMerge: require("./mailmerge"),
    CompareChanges,
    CombineChanges,
    Chat: require("./chat"),
    VersionHistory: require("./versionhistory"),
};
module.exports = CollaborationTab;

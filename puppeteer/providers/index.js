const WopiProvider = require("./wopi");
const OwnCloudProviders = require("./owncloud");
const DocSpaceProvider = require("./docspace");
module.exports = {
    wopi: WopiProvider,
    ...OwnCloudProviders,
    docspace: DocSpaceProvider,
};

const { createProxy, collectClasses } = require("../engine/script/js");
const modules = require("../module/editor");
const classMap = collectClasses(modules);
const instances = {};
for (const name in classMap) {
    instances[name] = createProxy(new classMap[name]());
}

module.exports = instances;

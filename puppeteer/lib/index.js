const baseModules = require("../module");
const providers = require("../providers");
const { createProxy, collectClasses } = require("../engine/script/js");

const providerModules = providers[globalThis.providerName]?.modules ?? {};
const baseClassMap = collectClasses(baseModules);
const providerClassMapRaw = collectClasses(providerModules);

const classMap = { ...baseClassMap };

function getParentClassName(cls) {
    const parent = Object.getPrototypeOf(cls.prototype)?.constructor;
    if (parent && parent !== Object) {
        return parent.name;
    }
    return null;
}

for (const [provName, ProvClass] of Object.entries(providerClassMapRaw)) {
    const parentName = getParentClassName(ProvClass);

    if (parentName && baseClassMap[parentName]) {
        classMap[parentName] = ProvClass;
    } else {
        classMap[provName] = ProvClass;
    }
}

const instances = {};
for (const name in classMap) {
    instances[name] = createProxy(Object.assign(new classMap[name](), { className: name }));
}

module.exports = instances;

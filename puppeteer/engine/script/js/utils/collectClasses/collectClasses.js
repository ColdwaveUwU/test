/**
 * Recursively collects all function properties from an object and its nested objects.
 *
 * @param {Object} obj - The object to search for function properties.
 * @returns {Object} An object containing all found function properties, keyed by their names.
 */
function collectClasses(obj) {
    const result = {};
    for (const key in obj) {
        if (typeof obj[key] === "function") {
            result[key] = obj[key];
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
            Object.assign(result, collectClasses(obj[key]));
        }
    }
    return result;
}
module.exports = collectClasses;

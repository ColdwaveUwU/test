/**
 * Creates an error handler for a specific class to avoid repeating class name.
 * @param {string} className The name of the class.
 * @returns {Function} Error handler function that takes (methodName, error) parameters.
 */
function createErrorHandler(className) {
    /**
     * Handles errors for the specified class.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    return function (methodName, error) {
        throw new Error(`${className}.${methodName}: ${error.message}`, {
            cause: error,
        });
    };
}

module.exports = { createErrorHandler };

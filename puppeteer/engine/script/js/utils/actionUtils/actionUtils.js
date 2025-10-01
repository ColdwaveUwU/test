const { createErrorHandler } = require("../errorUtils");

/**
 * Universal method for executing actions on elements with error handling
 * @param {object} tester - The tester instance
 * @param {Function} handleError - Error handler function
 * @param {Function} elementClass - Element class to instantiate (Button, DropdownInput, etc.)
 * @param {string} selector - Selector for the element
 * @param {string} action - Action method to call on the element
 * @param {string} methodName - Name of the calling method for error handling
 * @param {Array} actionParams - Parameters to pass to the action method
 * @param {Array} constructorParams - Parameters to pass to the element constructor
 * @returns {Promise<any>} Result of the action execution
 */
async function executeAction(
    tester,
    handleError,
    elementClass,
    selector,
    action,
    methodName,
    actionParams = [],
    constructorParams = []
) {
    let elementClassName = "UndefinedElementClass";
    try {
        const element = new elementClass(tester, selector, ...constructorParams);
        elementClassName = element?.constructor?.name || elementClassName;

        if (typeof element[action] !== "function") {
            throw new Error(`Action '${action}' is not a function on ${elementClassName}`);
        }

        return await element[action](...actionParams);
    } catch (error) {
        if (!handleError) {
            handleError = createErrorHandler(elementClassName);
        }
        handleError(
            methodName,
            error,
            `Failed to execute action ${elementClassName}.${action} on selector: ${selector}`
        );
    }
}

/**
 * Universal method for executing actions on any object with error handling
 * @param {Function} handleError - Error handler function
 * @param {object} targetObject - Object instance to call method on
 * @param {string} action - Action method to call on the object
 * @param {string} methodName - Name of the calling method for error handling
 * @param {Array} actionParams - Parameters to pass to the action method
 * @returns {Promise<any>} Result of the action execution
 */
async function executeObjectAction(handleError, targetObject, action, methodName, actionParams = []) {
    const objectClassName = targetObject?.constructor?.name || "UndefinedObject";
    try {
        if (typeof targetObject[action] !== "function") {
            throw new Error(`Action '${action}' is not a function on ${objectClassName}`);
        }

        return await targetObject[action](...actionParams);
    } catch (error) {
        if (!handleError) {
            handleError = createErrorHandler(objectClassName);
        }
        handleError(methodName, error, `Failed to execute action ${objectClassName}.${action}`);
    }
}

/**
 * Creates a bound version of executeAction for a specific tester and error handler
 * @param {object} tester - The tester instance
 * @param {Function} handleError - Error handler function
 * @returns {Function} Bound executeAction function
 */
function createExecuteAction(tester, handleError) {
    return executeAction.bind(null, tester, handleError);
}

/**
 * Creates a bound version of executeObjectAction for a specific error handler
 * @param {Function} handleError - Error handler function
 * @returns {Function} Bound executeObjectAction function
 */
function createExecuteObjectAction(handleError) {
    return executeObjectAction.bind(null, handleError);
}

module.exports = {
    executeAction,
    executeObjectAction,
    createExecuteAction,
    createExecuteObjectAction,
};

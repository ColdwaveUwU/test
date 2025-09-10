const writeLog = require("../logUtils");
let commandStack = [];
let loggingQueue = Promise.resolve();
const methodDescriptions = require("../../../../descriptions/methodsDescription.json");

let errorCount = 0;
let exitCode = 0;
let errorMessages = [];

// ErrorCode Map
const errorCodeMap = {
    ScriptError: 1,
    BrowserError: 2,
    VerificationFailed: 3,
    AscOnError: 4,
    asc_onErrorWarning: 5,
};

/**
 * Get Error Code
 * @param {Error} error
 * @returns {number}
 */
function getErrorCode(error) {
    return errorCodeMap[error.name] || errorCodeMap.ScriptError;
}

/**
 * Creates string timestamp
 * @param {number} milliseconds
 * @returns {string}
 */
function formatTimestamp(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const ms = String(milliseconds % 1000).padStart(3, "0");

    return `[${minutes}:${seconds}.${ms}]`;
}

/**
 * Creates log message
 * @param {string} status
 * @param {string} type
 * @param {string} classAndMethod
 * @param {number | string} duration
 * @param {string} description
 * @param {string} resultText
 * @returns {string}
 */
function createLogMessage(status, type, classAndMethod, duration, description = "", resultText = "") {
    if (globalThis.initialTime === null) {
        globalThis.initialTime = performance.now();
    }

    const durationTime = Math.round(performance.now() - globalThis.initialTime);
    const timestamp = formatTimestamp(durationTime);
    const durationMessage = duration !== undefined ? ` Duration: ${duration}` : "";
    const descriptionMessage = status === "start" && description ? ` // ${description}` : "";
    const resultMessage = resultText ? ` ${resultText}` : "";
    const lineBreak = type === "command" && duration !== undefined ? "\n" : "";

    return `${timestamp} [${status}] [${type}] ${classAndMethod}${durationMessage}${descriptionMessage}${resultMessage}${lineBreak}`;
}

/**
 * Async logging of class methods
 * @param {Function} method
 * @param {Object} target - target class instance
 * @param {Array<any>} args
 * @param {string} propKey
 * @param {string} description
 * @returns {Promise<any>}
 */
async function logExecution(method, target, args, propKey, description) {
    const logType = commandStack.length === 0 ? "command" : "action";
    const start = performance.now();
    const className = target.constructor.name;
    const classAndMethod = `${className}.${propKey}`;

    commandStack.push({ logType, propKey });

    await queueLogMessage(createLogMessage("start", logType, classAndMethod, undefined, description));

    try {
        const result = await method.apply(target, args);

        const duration = Math.round(performance.now() - start);
        await queueLogMessage(createLogMessage("end", logType, classAndMethod, duration, description));
        return result;
    } catch (error) {
        const duration = Math.round(performance.now() - start);
        await queueLogMessage(createLogMessage("end", logType, classAndMethod, duration, description));
        errorCount++;
        const errorCode = getErrorCode(error);
        exitCode = Math.max(exitCode, errorCode);
        errorMessages.push(error);
        throw error;
    } finally {
        commandStack.pop();
    }
}

/**
 * Sync logging of class methods
 * @param {Function} method
 * @param {Object} target - target class instance
 * @param {Array<any>} args
 * @param {string} propKey
 * @param {string} description
 * @returns {any}
 */
function logExecutionSync(method, target, args, propKey, description) {
    const logType = commandStack.length === 0 ? "command" : "action";
    const start = performance.now();
    const className = target.constructor.name;
    const classAndMethod = `${className}.${propKey}`;

    commandStack.push({ logType, propKey });

    queueLogMessage(createLogMessage("start", logType, classAndMethod, undefined, description));

    try {
        const result = method.apply(target, args);
        const duration = Math.round(performance.now() - start);
        queueLogMessage(createLogMessage("end", logType, classAndMethod, duration, description));
        return result;
    } catch (error) {
        const duration = Math.round(performance.now() - start);
        queueLogMessage(createLogMessage("end", logType, classAndMethod, duration, description));
        errorCount++;
        const errorCode = getErrorCode(error);
        exitCode = Math.max(exitCode, errorCode);
        errorMessages.push(error);
        throw error;
    } finally {
        commandStack.pop();
    }
}

/**
 * Retrieves method description from the JSON based on class name and method name.
 * @param {string} className - the name of the class
 * @param {string} methodName - the name of the method to describe
 * @returns {string} - description of the method if available
 */
function getMethodDescription(className, methodName) {
    const classDescriptions = methodDescriptions[className];
    return classDescriptions ? classDescriptions[methodName] || "No description" : "No description.";
}

/**
 * Wraps methods of an instance of a class
 * @param {Function} method
 * @param {string} methodName
 * @param {Object} context
 * @returns {Function}
 */
function logInternalCalls(method, methodName, context) {
    const isAsync = method.constructor.name === "AsyncFunction";
    const className = context.constructor.name;
    const description = getMethodDescription(className, methodName);
    return (...args) => {
        return isAsync
            ? logExecution(method, context, args, methodName, description)
            : logExecutionSync(method, context, args, methodName, description);
    };
}

/**
 * Creates a proxy instance of the class
 * @param {Object} instance - class instance
 * @returns {Object}
 */
function createProxy(instance) {
    const prototype = Object.getPrototypeOf(instance);
    const methods = Object.getOwnPropertyNames(prototype).filter(
        (prop) => typeof instance[prop] === "function" && prop !== "constructor"
    );

    methods.forEach((methodName) => {
        const originalMethod = instance[methodName];
        instance[methodName] = logInternalCalls(originalMethod, methodName, instance);
    });

    return instance;
}

/**
 * Ensures sequential logging to maintain correct order.
 * @param {string} message
 */
function queueLogMessage(message) {
    loggingQueue = loggingQueue.then(() => writeLog(message)).catch(console.error);
    return loggingQueue;
}

function finalizeProgram(code = exitCode) {
    if (errorMessages.length > 0) {
        errorMessages.forEach((error) => {
            if (error instanceof Error) {
                console.error(error.stack);
            } else {
                console.error(`Error: ${error}`);
            }
        });
    }

    process.exit(code);
}

module.exports = { createProxy, formatTimestamp, finalizeProgram, getErrorCode, errorCodeMap };

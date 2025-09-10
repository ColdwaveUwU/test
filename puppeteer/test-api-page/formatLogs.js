const fs = require("fs");
const path = require("path");

const logFilePath = path.resolve(__dirname, "logs.txt");
const errorLogFilePath = path.resolve(__dirname, "error.txt");
const outputLogFilePath = path.resolve(__dirname, "logs.json");
const outputErrorLogFilePath = path.resolve(__dirname, "error.json");

/**
 * Creates an empty JSON file at the specified path if it doesn't exist.
 * @param {string} filePath - The path of the file to check and create if needed.
 * @returns {Promise<void>}
 */
const createEmptyJsonFileIfNotExists = async (filePath) => {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (err) {
        await fs.promises.writeFile(filePath, JSON.stringify({}), "utf8");
    }
};

/**
 * Formats the log data from the file into a grouped structure by URL.
 * @param {string} filePath - The path to the log file to process.
 * @returns {{url: {data: {type: string, resourseUrl: string, status: number}}}} - A grouped object where the key is the URL and the value is an array of log entries.
 */
const formatLogData = (filePath) => {
    const fileData = fs.readFileSync(filePath, "utf8");
    const groupedEntries = {};

    fileData.split("\n").forEach((line) => {
        if (line.trim() === "") return;

        try {
            const logJson = JSON.parse(line);

            if (!groupedEntries[logJson.url]) {
                groupedEntries[logJson.url] = [];
            }

            groupedEntries[logJson.url].push({
                data: logJson.data,
            });
        } catch (err) {
            console.error(`Error while parsing the string: ${line}`);
        }
    });
    return groupedEntries;
};

/**
 * Writes the formatted log data to a JSON file.
 * @param {Object} logData - The formatted log data to write.
 * @param {string} outputFilePath - The path to the output file where logs will be saved.
 * @returns {Promise<void>}
 */
const writeFormattedLogs = async (logData, outputFilePath) => {
    await fs.promises.writeFile(outputFilePath, JSON.stringify(logData, null, 2), "utf8");
};

/**
 * Main function that formats the logs and writes them to JSON files.
 * @returns {Promise<void>}
 */
const formatLogs = async () => {
    await Promise.all([
        createEmptyJsonFileIfNotExists(outputLogFilePath),
        createEmptyJsonFileIfNotExists(outputErrorLogFilePath),
    ]);

    const logEntries = formatLogData(logFilePath);
    const errorLogEntries = formatLogData(errorLogFilePath);

    await Promise.all([
        writeFormattedLogs(logEntries, outputLogFilePath),
        writeFormattedLogs(errorLogEntries, outputErrorLogFilePath),
    ]);

    console.log("The logs have been reformatted and saved into JSON files.");
};

formatLogs();

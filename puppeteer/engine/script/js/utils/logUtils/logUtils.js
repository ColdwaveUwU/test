const fs = require("fs").promises;
const path = require("path");

async function writeLog(message) {
    try {
        await fs.appendFile(path.join(globalThis.logDirectory, "log.txt"), message + "\n", { encoding: "utf8" });
    } catch (err) {
        console.error("Error writing to log file:", err);
        throw err;
    }
}

module.exports = writeLog;

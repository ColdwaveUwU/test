const JSZip = require("../../../engine/node_modules/jszip");
const fs = require("fs").promises;
const path = require("path");
const { DOMParser } = require("../../../engine/node_modules/@xmldom/xmldom");
const xpath = require("../../../engine/node_modules/xpath");

/**
 * Verification class to handle file verification using XML and XPath.
 */
class Verification {
    /**
     * @param {TesterImp} tester - Tester Class.
     */
    constructor(tester) {
        this.tester = tester || RegularTester;
    }

    #content = {};
    #zip = new JSZip();
    #checks = [];

    /**
     * Extracts XML namespaces from a given text.
     * @param {string} text - The XML content as a string.
     * @returns {Object} An object containing XML namespaces.
     * @private
     */
    #getNameSpaces(text) {
        const regex = new RegExp('xmlns:?([\\w]*)="([^\\"]*)"', "g");
        const xmlNamespaces = {};
        const defaultNS = "defns";
        let match;
        while ((match = regex.exec(text)) !== null) {
            xmlNamespaces[match[1] === "" ? defaultNS : match[1]] = match[2];
        }
        return xmlNamespaces;
    }

    /**
     * Extracts and parses the xml by path file from the archive.
     * @param {string} filePath - the path to the file inside the archive.
     * @throws Will throw an error if the file cannot be opened or read.
     */
    async #checkFile(filePath) {
        try {
            if (this.#content[filePath]) {
                return this.#content[filePath];
            }

            const xmlFile = this.#zip.file(filePath);
            if (!xmlFile) {
                console.error(filePath + " not found in the file");
            }

            const xmlContent = await xmlFile.async("string");

            this.#content[filePath] = {
                xml: new DOMParser().parseFromString(xmlContent, "text/xml"),
                namespaces: this.#getNameSpaces(xmlContent),
            };

            return this.#content[filePath];
        } catch (error) {
            console.error("Error opening file:", error.stack);
            throw error;
        }
    }

    /**
     * Applies the default namespace to all unqualified tags in the XPath expression.
     * @param {string} xpathExpression - The original XPath expression.
     * @param {Object} namespaces - The namespaces object.
     * @returns {string} The adjusted XPath expression.
     */
    #applyDefaultNamespace(xpathExpression, namespaces) {
        const defaultNS = namespaces["defns"];
        if (!defaultNS) {
            return xpathExpression;
        }

        const regex = /(^|\/)(\w+)(?!:)(?=(?:\[[^\]]*\]|\/|$))/g;

        return xpathExpression.replace(regex, (match, prefix, tagName) => {
            if (tagName.includes(":")) {
                return match;
            }
            return `${prefix}defns:${tagName}`;
        });
    }

    /**
     * Opens a file downloaded from the editor or by filepath.
     * @param {string} [filePath] - optional path to the archive file.
     * @throws Will throw an error if the file cannot be opened or read.
     */
    async openFile(filePath) {
        try {
            this.#content = {};
            const fileName = await this.tester.getFileName();
            const targetFilePath = filePath || path.join(downloadDir, fileName);

            const data = await fs.readFile(targetFilePath);
            await this.#zip.loadAsync(data);
        } catch (error) {
            console.error("Error opening file:", error.stack);
            throw error;
        }
    }

    /**
     * Checks if the given XPath expression in the XML document matches the expected value.
     * @param {string} pathToFile - The path to the file being checked.
     * @param {string} xpathExpression - The XPath expression to evaluate.
     * @param {string} expectedValue - The expected value to match against.
     */
    async check(pathToFile, xpathExpression, expectedValue) {
        try {
            let xmlContent = await this.#checkFile(pathToFile);

            const adjustedXPath = this.#applyDefaultNamespace(xpathExpression, xmlContent.namespaces);

            const select = xpath.useNamespaces(xmlContent.namespaces);
            const nodes = select(adjustedXPath, xmlContent.xml);

            if (xpathExpression.startsWith("boolean(") || xpathExpression.startsWith("count(")) {
                this.#checks.push({
                    filePath: pathToFile,
                    xpathExpression,
                    expectedValue,
                    result: nodes === expectedValue,
                    xpath_result: nodes,
                });
                return;
            }

            let xpath_result = "";
            const result = nodes.some((node) => {
                if (node.nodeValue) {
                    xpath_result = node.nodeValue.trim();
                    return xpath_result === expectedValue.trim();
                } else if (node.textContent) {
                    xpath_result = node.textContent;
                    return xpath_result === expectedValue.trim();
                }
                return false;
            });

            this.#checks.push({
                filePath: pathToFile,
                xpathExpression,
                expectedValue,
                result,
                xpath_result,
            });
        } catch (error) {
            console.error("[ver] Error in check method:", error.stack);
            this.#checks.push({ filePath: pathToFile, xpathExpression, expectedValue, result: false, error });
        }
    }

    /**
     * Determines if all checks have passed successfully.
     * @returns {boolean} True if all checks have passed, false otherwise.
     */
    isSuccess() {
        const getCheckMessage = (check) => `in file ${check.filePath}, xpath ${check.xpathExpression}`;
        let errorCount = 0;
        const logCheckResult = (check) => {
            if (check.result && !check.error) {
                console.log(`[ver] Successful check ${getCheckMessage(check)}`);
            } else if (check.error) {
                console.error(`[ver] Error ${getCheckMessage(check)}:`, check.error);
                ++errorCount;
            } else {
                console.error(
                    `[ver] Failed check ${getCheckMessage(check)}\nExpected: ${check.expectedValue}\nActual: ${
                        check.xpath_result
                    }`
                );
                ++errorCount;
            }
        };

        this.#checks.forEach(logCheckResult);

        if (!errorCount) {
            console.log("[ver] Verification passed.");
        } else {
            console.error("[ver] Verification failed.");
        }

        return this.#checks.every((check) => check.result && !check.error);
    }
}

module.exports = Verification;

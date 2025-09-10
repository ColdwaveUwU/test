class Connector {
    constructor(tester = RegularTester) {
        this.tester = tester;
    }

    static TARGETS = {
        CONNECTOR: "createdConnector",
        CONNECTOR_WINDOW: "createdConnectorWindow",
    };

    /**
     * Connects to the resource server and waits for the editor to be ready.
     * This method retrieves the configuration and API source, sends the configuration
     * to the resource server, and waits for the editor to load.
     */
    async connect() {
        try {
            const { config, apiSrc } = await this.tester.page.evaluate(() => {
                const config = { ...window.config, height: "700px", width: "700px" };
                const apiSrc =
                    Array.from(document.querySelectorAll("body script")).find((script) =>
                        script.src.includes("/web-apps/apps/api/documents/api.js")
                    )?.src || "";

                return { config, apiSrc };
            });

            const body = JSON.stringify({ config, apiSrc });
            const response = await fetch(`${globalThis.resourceServerUrl}/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });

            const result = await response.json();

            if (result.success) {
                await this.tester.page.goto(globalThis.resourceServerUrl, { waitUntil: "domcontentloaded" });
                await this.tester.waitEditor(undefined, false);
            } else {
                throw new Error(`Failed to update index.html: ${result.message}`);
            }
        } catch (error) {
            console.error("Error occurred while sending request:", error);
            throw error;
        }
    }

    /**
     * Calls connector methods inside browser.
     * @param {string} method
     * @param {Array<any>} [args]
     * @param {"createdConnector" | "createdConnectorWindow"} target
     */
    async #callConnectorAPI(method, args, target) {
        const serializedArgs = JSON.stringify(args, (_, value) => {
            if (typeof value === "function") {
                return { isFunction: true, source: value.toString() };
            }
            return value;
        });

        await this.tester.page.evaluate(
            (method, serializedArgs, target) => {
                const TARGETS = {
                    CONNECTOR: "createdConnector",
                    CONNECTOR_WINDOW: "createdConnectorWindow",
                };

                if (!window[TARGETS.CONNECTOR]) {
                    window[TARGETS.CONNECTOR] = window.docEditor.createConnector();
                }

                if (target === TARGETS.CONNECTOR_WINDOW && !window[TARGETS.CONNECTOR_WINDOW]) {
                    window[TARGETS.CONNECTOR_WINDOW] = window[TARGETS.CONNECTOR].createWindow();
                }

                const parsedArgs = JSON.parse(serializedArgs, (_, value) => {
                    if (value && typeof value === "object" && value.isFunction && value.source) {
                        const updatedSource = value.source
                            .replace("connectorWindow", "window[TARGETS.CONNECTOR_WINDOW]")
                            .replace("connector", "window[TARGETS.CONNECTOR]");
                        return eval(`(${updatedSource})`);
                    }
                    return value;
                });

                const targetObject =
                    target === TARGETS.CONNECTOR_WINDOW ? window[TARGETS.CONNECTOR_WINDOW] : window[TARGETS.CONNECTOR];

                targetObject[method](...parsedArgs);
            },
            method,
            serializedArgs,
            target
        );
    }

    /**
     * Calls methods from the editor connector.
     * @param {string} method
     * @param {...any} args
     */
    async callConnectorMethod(method, ...args) {
        await this.#callConnectorAPI(method, args, Connector.TARGETS.CONNECTOR);
    }

    /**
     * Calls methods from the editor connector window.
     * @param {string} method
     * @param {...any} args
     */
    async callConnectorWindowMethod(method, ...args) {
        await this.#callConnectorAPI(method, args, Connector.TARGETS.CONNECTOR_WINDOW);
    }
}

module.exports = Connector;

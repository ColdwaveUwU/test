/**
 * Class to listen for Asc_events logged via console messages.
 */
class AscEventListener {
    constructor() {
        /**
         * Map of completed events to their data and promise handlers.
         * @type {Map<string, {promise?: Promise<any>, resolve?: Function|null, reject?: Function|null, data?: any}>}
         */
        this.completedEvents = new Map();

        /**
         * Map of persistent event listeners.
         * @type {Map<string, Function[]>}
         */
        this.listeners = new Map();

        /**
         * Map of one-time event listeners.
         * @type {Map<string, Function[]>}
         */
        this.onceListeners = new Map();
    }

    /**
     * Parses a console message and records the event if it matches the pattern.
     * @param {string} consoleText - The console message text.
     * @returns {void}
     */
    handleConsoleMessage(consoleText) {
        const regex = /\[logEvent\]\s+(\S+)\s+(.+)/;
        const match = consoleText.match(regex);
        if (!match) {
            return;
        }

        const eventName = match[1];
        let eventData;
        try {
            eventData = JSON.parse(match[2]);
        } catch {
            eventData = match[2];
        }

        this.recordEvent(eventName, eventData);
    }

    /**
     * Records an event with its data, resolves any waiting promises,
     * and invokes event listeners.
     * @param {string} eventName - Name of the event.
     * @param {*} eventData - Data associated with the event.
     * @returns {void}
     */
    recordEvent(eventName, eventData) {
        const existing = this.completedEvents.get(eventName);
        if (existing?.resolve) {
            existing.resolve(eventData);
            this.completedEvents.set(eventName, {
                ...existing,
                data: eventData,
                resolve: null,
                reject: null,
            });
        } else {
            this.completedEvents.set(eventName, {
                promise: Promise.resolve(eventData),
                resolve: null,
                reject: null,
                data: eventData,
            });
        }

        if (this.listeners.has(eventName)) {
            for (const cb of this.listeners.get(eventName)) {
                try {
                    cb(eventData);
                } catch (e) {
                    console.error(`Error in listener for event ${eventName}:`, e);
                }
            }
        }

        if (this.onceListeners.has(eventName)) {
            for (const cb of this.onceListeners.get(eventName)) {
                try {
                    cb(eventData);
                } catch (e) {
                    console.error(`Error in once listener for event ${eventName}:`, e);
                }
            }
            this.onceListeners.delete(eventName);
        }
    }

    /**
     * Returns a promise that resolves when the specified event occurs or rejects after timeout.
     * @param {string} eventName - The event to wait for.
     * @param {number} [timeoutMs=10000] - Timeout in milliseconds.
     * @returns {Promise<any>} - Promise resolving with event data or rejecting on timeout.
     */
    waitForEvent(eventName, timeoutMs = 10000) {
        let timeoutId;
        let intervalId;

        const eventPromise = new Promise((resolve) => {
            intervalId = setInterval(() => {
                if (this.completedEvents.has(eventName)) {
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                    resolve(this.completedEvents.get(eventName).promise);
                }
            }, 50);
        });

        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                clearInterval(intervalId);
                reject(new Error(`Timeout waiting for event "${eventName}"`));
            }, timeoutMs);
        });

        return Promise.race([eventPromise, timeoutPromise]);
    }

    /**
     * Gets the data associated with a completed event.
     * @param {string} eventName - The event name.
     * @returns {*} The event data or null if not found.
     */
    getEventData(eventName) {
        const event = this.completedEvents.get(eventName);
        return event?.data ?? null;
    }

    /**
     * Adds a persistent listener callback for the specified event.
     * @param {string} eventName - The event name.
     * @param {Function} callback - The callback to invoke when event occurs.
     * @returns {void}
     */
    on(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }
        this.listeners.get(eventName).push(callback);
    }

    /**
     * Adds a one-time listener callback for the specified event.
     * The callback is removed after being called once.
     * @param {string} eventName - The event name.
     * @param {Function} callback - The callback to invoke once.
     * @returns {void}
     */
    once(eventName, callback) {
        if (!this.onceListeners.has(eventName)) {
            this.onceListeners.set(eventName, []);
        }
        this.onceListeners.get(eventName).push(callback);
    }

    /**
     * Removes all listeners for the specified event, or all listeners if no eventName is given.
     * @param {string} [eventName] - event name to remove listeners for.
     * @returns {void}
     */
    removeAllListeners(eventName) {
        if (eventName) {
            this.listeners.delete(eventName);
            this.onceListeners.delete(eventName);
        } else {
            this.listeners.clear();
            this.onceListeners.clear();
        }
    }
}

module.exports = AscEventListener;

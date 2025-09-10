/**
 * Abstract class representing a provider addon.
 *
 * This class is meant to be extended by other classes that implement the `openFile` and `createFile` methods.
 */
class ProviderAddon {
    /**
     * Abstract method to open a file.
     * This method should be implemented by subclasses. If not implemented, it throws an error.
     */
    async openFile() {
        throw new Error("Method 'openFile' should be implemented");
    }

    /**
     * Abstract method to create a file.
     * This method should be implemented by subclasses. If not implemented, it throws an error.
     */
    async createFile() {
        throw new Error("Method 'createFile' should be implemented");
    }

    /**
     * Abstract method to connect to file.
     * This method should be implemented by subclasses. If not implemented, it throws an error.
     */
    async connectToFile() {
        throw new Error("Method 'connectToFile' should be implemented");
    }
}

module.exports = ProviderAddon;

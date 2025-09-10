# Provider Addon

The **Provider Addon** is an abstract class designed to facilitate testing across various platforms such as WOPI, OwnCloud, and others. It provides a framework for interacting with different file providers during automated tests.

## Supported provider addons

-   [**Wopi**](../providers/wopi/)
-   [**DocSpace**](../providers/docspace)
-   [**OwnCloud**](../providers/owncloud/)

## Table of Contents

-   [**Provider Config**](#provider-config)
-   [**Example of Using Provider Addon**](#example-of-using-provider-addon)
-   [**Executing Tests with Provider Addon**](#executing-tests-with-provider-addon)

## Provider Config

The provider configuration defines the settings needed to connect and interact with a specific provider, such as WOPI or OwnCloud. This configuration is typically specified in a `config.json` file and can include options for testing, reporting, and more.

### Example: WOPI Config

```json
{
    "testOptions": {
        "url": "https://isa2.teamlab.info/example"
    },
    "reportOptions": {
        "ignoreBrowserErrors": ["Failed to load resource: the server responded with a status of 404 ()"]
    }
}
```

## Example of Using Provider Addon

To use the **Provider Addon**, you need to specify a provider configuration that contains the necessary settings for connecting to and interacting with your desired platform (e.g., WOPI, OwnCloud).
Here is an example of a main configuration with a specified provider (config_chrome_win.json):

```json
{
    "testOptions": {
        "url": "https://kim.teamlab.info/example",
        "urlParam": "action={\"debug\":true}",
        "debugMode": true,
        "messageType": ["error", "log"],
        "cacheEnabled": true
    },
    "puppeteerOptions": {
        "browser": "chrome",
        "headless": false,
        "puppeteerDelay": 0,
        "userDelay": 0,
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe"
    },
    "reportOptions": {
        "ignoreBrowserErrors": ["Failed to load resource: the server responded with a status of 404 ()"],
        "ignoreExternalScriptsErrors": ["Checking file for encryption is not supported on Windows"]
    },
    "provider": "wopi.json"
}
```

### Explanation:

-   **`provider`**: This key specifies the path or name of the addon (e.g., `wopiAddon.js`) that will be used to handle interactions with the provider platform.

## Executing Tests with Provider Addon

When executing tests, the **Provider Addon** mechanism loads the provider-specific configuration and merges it with the main configuration. The merged configuration is then used to instantiate the tester class, which runs the tests according to the specified options.

Here’s how to execute the tests with the **Provider Addon**:

1. **Prepare the Configuration**: Ensure you have a main configuration file (e.g., `config.json`) and, if applicable, a provider-specific configuration file within the provider's directory.

2. **Specify the Provider**: In your main configuration, include the `"provider"` key with the path to the desired addon. The addon should include any provider-specific settings that need to override the main configuration.

3. **Run the Script**: Execute the test script, which will read the configuration file, load the provider addon, and merge the configurations.

### Example Command to Execute a Test

```bash
python run.py example/download_example.js
```

### Merging Behavior:

-   If the main config and the provider config have the same keys, the provider config values will override the main config values.
-   This allows specific settings to be adjusted based on the provider while keeping general settings consistent.

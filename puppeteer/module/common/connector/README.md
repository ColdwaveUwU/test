# Connector

The library provides methods for interacting with the editor connector.

## Table of contents

-   [**How to include**](#how-to-include)
-   [**Methods**](#methods)
    -   [**Connector.connect()**](#connectorconnect)
    -   [**Connector.callConnectorMethod()**](#connectorcallconnectormethod)
    -   [**Connector.callConnectorWindowMethod()**](#connectorcallconnectorwindowmethod)
-   [**Accessing the Editor Connector Object in Library Callbacks**](#accessing-the-editor-connector-object-in-library-callbacks)

## How to Include

```javascript
const { Connector } = require("lib");
```

## Methods

### Connector.connect()

This method connects to the resource server, sends the configuration, and waits for the editor to be ready.

-   **Throws**: Error if the connection fails.

#### Example

```javascript
const { Connector } = require("lib");
Connector.connect();
```

### Connector.callConnectorMethod(methodName, ...args)

This method calls functions from the editor connector inside the browser.

-   **methodName**: (string) The name of the method to invoke on the connector.
-   **args**: (any) The parameters that are passed to the method.

This method internally calls the appropriate method on the editor's connector object.

#### Example

```javascript
const { Connector } = require("lib");
Connector.connect();
// Create parameters for the addToolbarMenuItem method
const addToolbarMenuItemParam = {
    tabs: [
        {
            text: "Connector",
            items: [
                {
                    id: "toolConnector1",
                    type: "button",
                    text: "Meaning",
                    hint: "Meaning",
                    lockInViewMode: true,
                    icons: "./icon.svg",
                    items: [
                        {
                            id: "toolC1",
                            text: "Text",
                            data: "Hello",
                            onClick: (data) => {
                                console.log(`[TOOLBARMENUCLICK]: ${data}`);
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

await connector.callConnectorMethod("addToolbarMenuItem", addToolbarMenuItemParam);
```

### Connector.callConnectorWindowMethod(methodName, ...args)

This method calls functions from the `connectorWindow` inside the browser.

-   **methodName**: (string) The name of the method to invoke on the connector window.
-   **args**: (any) The parameters that are passed to the method.

This method targets `connectorWindow`, not the main connector.

#### Example

```javascript
const { Connector } = require("lib");
Connector.connect();
// Create parameters for the connectorWindow.show() method
Connector.callConnectorWindowMethod("show", {
    url: "./window/panel.html",
    description: "Panel example!",
    isVisual: true,
    type: "panel",
    buttons: [],
    EditorsSupport: ["word", "slide", "cell"],
    icons: "./window/icon.svg",
});
```

## Accessing the Editor Connector Object in Library Callbacks

To interact with the editor connector inside the library, use the following objects:

-   `connector` – for the editor connector.
-   `connectorWindow` – for the `connectorWindow`.

### Example

```javascript
const { Connector } = require("lib");
Connector.connect();
connector.callConnectorMethod("attachEvent", "onContextMenuShow", (options) => {
    // editor connector
    connector.addContextMenuItem([
        {
            text: "mainItem",
            onClick: () => {
                console.log("[CONTEXTMENUCLICK] menuSubItem1");
            },
        },
    ]);
});
```

## Connector Resources

### Resource Path in `config.json`

When the `"resourcePath"` is specified with a relative path in the `config.json` file, it will be interpreted relative to the `puppeteer/` directory.

#### Example:

Given this configuration:

```json
...
"resourceServer": {
    "port": 3000,
    "resourcePath": "resources"
}
```

-   The server will look for the folder named `resources` inside the `puppeteer/` directory, specifically at `puppeteer/resources`.
-   Any files specified with relative paths (e.g., `"./window/panel.html"`) will be resolved relative to `puppeteer/resources`.

So, if you request a file like `"./window/panel.html"`, it will be served from `http://localhost:{resourceServer.port}/resources/window/panel.html`.

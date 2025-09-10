const { Connector } = require("lib");
Tester.openFile("docx/new2.docx");
Connector.connect();
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
Connector.callConnectorMethod("addToolbarMenuItem", addToolbarMenuItemParam);
Connector.callConnectorMethod("attachEvent", "onContextMenuShow", (options) => {
    connector.addContextMenuItem([
        {
            text: "mainItem",
            onClick: () => {
                console.log("[CONTEXTMENUCLICK] menuSubItem1");
            },
        },
    ]);
});
Connector.callConnectorMethod(
    "callCommand",
    () => {
        const oDocument = Api.GetDocument();
        const oParagraph = Api.CreateParagraph();
        oParagraph.AddText("Hello");
        oDocument.InsertContent([oParagraph]);
    },
    () => {
        console.log("[COMMAND] Callback command");
    }
);

Connector.callConnectorMethod(
    "callCommand",
    () => {
        const oDocument = Api.GetDocument();
        const oParagraph = Api.CreateParagraph();
        oParagraph.AddText("Hello");
        oDocument.InsertContent([oParagraph]);
    },
    () => {
        console.log("[COMMAND] Callback command");
    }
);

Connector.callConnectorMethod("executeMethod", "GetCurrentWord", [], (word) => {
    console.log(`[METHOD] GetCurrentWord: ${word}`);
});

Connector.callConnectorMethod("updateContextMenuItem", [
    {
        id: "onConvert",
        text: "Convert to Markdown or HTML",
    },
]);

Connector.callConnectorWindowMethod("attachEvent", "onWindowMessage", (message) => {
    console.log("panel message: " + message);
    connectorWindow.dispatchEvent("onMessageFromConnector", {
        prop: "value",
    });
});

Connector.callConnectorWindowMethod("show", {
    url: "./window/panel.html",
    description: "Panel example!",
    isVisual: true,
    type: "panel",
    buttons: [],
    EditorsSupport: ["word", "slide", "cell"],
    icons: "./window/icon.svg",
});

Connector.callConnectorWindowMethod("attachEvent", "onClose", () => {
    connectorWindow = null;
    console.log("Connector window is closed");
});
Connector.callConnectorWindowMethod("close");
Tester.close();

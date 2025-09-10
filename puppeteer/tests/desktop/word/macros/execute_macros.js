Tester.openFile("docx/new.docx");
Tester.addMacros([
    {
        name: "Macros 1",
        value: function () {
            var oDocument = Api.GetDocument();
            var oParagraph = Api.CreateParagraph();
            oParagraph.AddText("Hello world!");
            oDocument.InsertContent([oParagraph]);
        },
    },
    {
        value: function () {
            var oDocument = Api.GetDocument();
            var oParagraph = Api.CreateParagraph();
            oParagraph.AddText("12321!");
            oDocument.InsertContent([oParagraph]);
        },
    },
]);
Tester.executeMacros("Macros 1");
Tester.executeMacros("Macros 2");
Tester.close();

Tester.openFile("docx/url.docx");

Tester.addMacros([
    {
        name: "ReplaceLinksWithHyperlinks",
        value: function () {
            // Get the current document
            var oDocument = Api.GetDocument();

            // Get all paragraphs in the document
            var paragraphs = oDocument.GetAllParagraphs();

            // Regex pattern to match URLs in text
            var linkRegex = /(https?:\/\/[^\s]+)/g;

            // Loop through each paragraph in the document
            paragraphs.forEach(function (paragraph) {
                // Get the text of the current paragraph
                var paragraphText = paragraph.GetText().replace(/\r/g, "\n");
                var currentIndex = 0;
                var match;

                // Create a placeholder for the updated paragraph content
                var newContent = [];

                // Find all URLs in the paragraph text
                while ((match = linkRegex.exec(paragraphText)) !== null) {
                    // Add plain text before the URL
                    if (currentIndex < match.index) {
                        newContent.push(paragraphText.slice(currentIndex, match.index));
                    }

                    // Add the detected URL as a clickable hyperlink
                    newContent.push(Api.CreateHyperlink(match[0], match[0])); // Hyperlink

                    // Update the current index to continue after the URL
                    currentIndex = match.index + match[0].length;
                }

                // Add any remaining plain text after the last hyperlink
                if (currentIndex < paragraphText.length) {
                    newContent.push(paragraphText.slice(currentIndex));
                }

                // Clear the paragraph content and replace it with the updated content
                paragraph.RemoveAllElements();
                newContent.forEach(function (content) {
                    if (typeof content === "string") {
                        // Add plain text
                        paragraph.AddText(content);
                    } else {
                        // Add hyperlink element
                        paragraph.AddElement(content);
                    }
                });
            });
        },
    },
]);

Tester.executeMacros("ReplaceLinksWithHyperlinks");

Tester.close();

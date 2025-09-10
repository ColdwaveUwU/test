const { ToolMenuSearch, ToolMenuComments, ToolMenuChats, ToolMenuHeadings, ToolMenuThumbnails } = require("lib");
const { ViewToolbarComment } = require("lib");
Tester.openFile("pdf/headings.pdf");

ToolMenuComments.sortComments("az");
ToolMenuComments.sortComments("oldest");
ToolMenuSearch.findText("test", { sensitive: true, words: true });

ViewToolbarComment.addComment("testtesttesttest");
ToolMenuComments.addReplyComment("testtest", 1);
ToolMenuComments.addReplyComment("12312", 1);

Tester.clickMouseInsideMain(100, 100); // change target to create new comment
ViewToolbarComment.addComment("testtesttesttest");
ToolMenuComments.addReplyComment("sadasd", 2);
ToolMenuComments.editComment([{ index: 1, subIndex: [1, 2], text: "21321" }]);
ToolMenuComments.setResolve(1);
ToolMenuComments.deleteComment({ number: 1, replyNumber: 1 });
ToolMenuChats.sendMessage("asdasdasd");
ToolMenuHeadings.setExpand();
ToolMenuHeadings.setCollapse();
ToolMenuHeadings.setExpandLvl("4");
ToolMenuHeadings.setFontSize("Small");
ToolMenuHeadings.setWrap();
ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 6 });
Tester.close();

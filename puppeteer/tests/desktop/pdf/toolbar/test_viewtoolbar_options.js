const { ViewToolbarView, ViewToolbarHome, ViewToolbarComment, ViewToolbarStatic } = require("lib");
Tester.openFile("pdf/test.pdf");
ViewToolbarView.clickHeading();
ViewToolbarView.setZoomByClick("125%");
ViewToolbarView.setZoomInput(32);
ViewToolbarView.clickFitPage();
ViewToolbarView.clickWidthPage();
ViewToolbarView.setInterfaceTheme("Classic light");
ViewToolbarStatic.clickHand();
ViewToolbarStatic.clickSelect();
ViewToolbarHome.setPage(2);
ViewToolbarHome.setFirstPage();
ViewToolbarHome.setLastPage();
ViewToolbarHome.setPrevPage();
ViewToolbarHome.setNextPage();
ViewToolbarHome.setZoomByClick("175%");
ViewToolbarHome.setZoomInput(11);
ViewToolbarHome.clickFitPage();
ViewToolbarHome.clickWidthPage();
ViewToolbarComment.addComment("testtesttesttest");
ViewToolbarComment.penOne({ type: 5, x: 50, y: 100, hue: 45 }, 0, 0, 30, 30, "0.5 mm");
ViewToolbarComment.penOne({ index: 5 }, 0, 0, 100, 230, "3.5 mm");
ViewToolbarComment.penTwo({ type: 5, x: 28, y: 14, hue: 28 }, 0, 0, 203, 78, "1 mm");
ViewToolbarComment.penTwo({ index: 5 }, 0, 0, -100, -20);
ViewToolbarComment.clickHightlight({
    type: 5,
    x: 50,
    y: 100,
    hue: 45,
});
ViewToolbarComment.clickStrikeout({
    type: 5,
    x: 50,
    y: 100,
    hue: 45,
});
ViewToolbarComment.clickUnderline({
    type: 5,
    x: 50,
    y: 100,
    hue: 45,
});
ViewToolbarComment.clickUnderline({
    type: 5,
    x: 50,
    y: 100,
    hue: 45,
});
ViewToolbarComment.clickShowComments();
Tester.close();

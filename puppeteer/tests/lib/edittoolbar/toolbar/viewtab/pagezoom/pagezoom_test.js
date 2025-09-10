const { PageZoom } = require("lib");
Tester.createFile("docx");
// set zoom by click (select dropdown)
PageZoom.setZoomByClick("200%");
// set zoom by input
PageZoom.setZoomInput("100%");
// click fit to width
PageZoom.clickFitToWidth();
// click fit to page
PageZoom.clickFitToPage();
Tester.close()

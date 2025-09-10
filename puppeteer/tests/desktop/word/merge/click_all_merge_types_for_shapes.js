// Checks the click on all types of merge shapes
const { MergeShapes, Shape } = require("lib");
var typesMerge = ["Union", "Combine", "Fragment", "Intersect", "Subtract"];

Tester.createFile("docx");

const firstShapeCoordinates = { startX: -300, startY: -100, endX: -200, endY: 0 };
Shape.clickBasicShape(2);
Shape.drawShape(firstShapeCoordinates);
const secondShapeCoordinates = { startX: -230, startY: -100, endX: -130, endY: 0 };
Shape.clickBasicShape(3);
Shape.drawShape(secondShapeCoordinates);
Shape.selectShapes(firstShapeCoordinates, secondShapeCoordinates);

for (let i = 0; i < 5; i++) {
    MergeShapes.setMergeShapes(typesMerge[i]);
    Tester.keyDown("Control");
    Tester.keyPress("Z");
    Tester.keyUp("Control");
}

Tester.close();

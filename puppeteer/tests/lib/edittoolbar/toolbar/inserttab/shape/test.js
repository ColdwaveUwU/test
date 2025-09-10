const { Shape } = require("lib");
Tester.createFile("docx");
// recently shape selection with id 2
Shape.clickRecentlyShape(2);
// rendering the selected shape in the editor
Shape.drawShape();
const shapes = Shape.getShapesList();
console.log(shapes[0].description);
Tester.close();
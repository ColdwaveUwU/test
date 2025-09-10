const InsertTab = require("../inserttab");
const { ShapeType } = require("../../../../../constants");
/**
 * @typedef ShapeObject
 * @property {string} description
 * @property {number} count
 * @property {number} index
 */
/**
 * @typedef {Object} Coordinates
 * @property {number} [startX] - def 0
 * @property {number} [startY] - def 0
 * @property {number} [endX] - def 0
 * @property {number} [endY] - def 0
 */

class Shape extends InsertTab {
    constructor(tester) {
        super(tester, "#tlbtn-insertshape", false);
    }

    async openShapeList() {
        await this.clickTargetButton();
    }

    /**
     * Returns a list of shapes
     * @returns {Promise<Array<ShapeObject>>}
     */
    async getShapesList() {
        const listSelector = "#id-toolbar-menu-insertshape .grouped-data";
        const itemSelector = ".item";
        const descriptionSelector = ".group-description span";
        const shapes = await this.tester.parseItems(listSelector, itemSelector, descriptionSelector);
        return shapes;
    }

    async #clickShape(description, id) {
        await this.openShapeList();
        const listSelector = "#id-toolbar-menu-insertshape .grouped-data";
        const itemSelector = ".item";
        const descriptionSelector = ".group-description span";
        await this.tester.clickItem(description, id, listSelector, itemSelector, descriptionSelector);
    }

    /**
     * Selects the "Recently used" shape in the section
     * @param {number} id
     */
    async clickRecentlyShape(id) {
        await this.#clickShape(ShapeType.Recently, id);
    }

    /**
     * Selects the "Basic shapes" shape in the section
     * @param {number} id
     */
    async clickBasicShape(id) {
        await this.#clickShape(ShapeType.Basic, id);
    }

    /**
     * Selects the "Figured arrows" shape in the section
     * @param {number} id
     */
    async clickFiguredShape(id) {
        await this.#clickShape(ShapeType.Figure, id);
    }

    /**
     * Selects the "Math" shape in the section
     * @param {number} id
     */
    async clickMathShape(id) {
        await this.#clickShape(ShapeType.Math, id);
    }

    /**
     * Selects the "Charts" shape in the section
     * @param {number} id
     */
    async clickChartShape(id) {
        await this.#clickShape(ShapeType.Chart, id);
    }

    /**
     * Selects the "Stars & ribbons" shape in the section
     * @param {number} id
     */
    async clickSRShape(id) {
        await this.#clickShape(ShapeType.SR, id);
    }

    /**
     * Selects the "Callouts" shape in the section
     * @param {number} id
     */
    async clickCalloutShape(id) {
        await this.#clickShape(ShapeType.Callout, id);
    }

    /**
     * Selects the "Buttons" shape in the section
     * @param {number} id
     */
    async clickButtonShape(id) {
        await this.#clickShape(ShapeType.Button, id);
    }

    /**
     * Selects the "Rectangles" shape in the section
     * @param {number} id
     */
    async clickRectangleShape(id) {
        await this.#clickShape(ShapeType.Rectangle, id);
    }

    /**
     * Selects the "Lines" shape in the section
     * @param {number} id
     */
    async clickLineShape(id) {
        await this.#clickShape(ShapeType.Line, id);
    }

    /**
     * Draws a shape on the page by coordinates,
     * if coordinates are not specified,
     * the standard size of the shape will be displayed
     * @param {Coordinates} [coord]
     */
    async drawShape(coord = {}) {
        const coordinates = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            ...coord,
        };
        const { startX, startY, endX, endY } = coordinates;
        await this.tester.mouseDrawingLine("#id_viewer", startX, startY, endX, endY);
    }

    /**
     * Selects a shape on canvas by coordinates
     * @param {Coordinates} coordinates
     */
    async selectShapeByCoordinates(coordinates) {
        const shapeCenterX = coordinates.startX + (coordinates.endX - coordinates.startX) / 2;
        const shapeCenterY = coordinates.startY + (coordinates.endY - coordinates.startY) / 2;
        await this.tester.clickMouseInsideMain(shapeCenterX, shapeCenterY);
    }

    /**
     * Selects two shapes on canvas by coordinates with pressing Control key
     * @param {Coordinates} firstShapeCoordinates
     * @param {Coordinates} secondShapeCoordinates
     */
    async selectShapes(firstShapeCoordinates, secondShapeCoordinates) {
        await this.selectShapeByCoordinates(firstShapeCoordinates);
        await this.tester.keyDown("Control");
        await this.selectShapeByCoordinates(secondShapeCoordinates);
        await this.tester.keyUp("Control");
    }
}

module.exports = Shape;

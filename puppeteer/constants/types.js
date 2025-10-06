/**
 * @enum
 */
const ShapeType = {
    Recently: "Recently used",
    Basic: "Basic shapes",
    Figure: "Figured arrows",
    Math: "Math",
    Chart: "Charts",
    SR: "Stars & ribbons",
    Callout: "Callouts",
    Button: "Buttons",
    Rectangle: "Rectangles",
    Line: "Lines",
};

/**
 * @enum
 */
const CropImageType = {
    Crop: "Crop",
    Shape: "Crop to shape",
    Fill: "Fill",
    Fit: "Fit",
};

/**
 * @enum
 */
const WrappingImageType = {
    InLine: "In line with text",
    Square: "Square",
    Tight: "Tight",
    Through: "Through",
    TnB: "Top and bottom",
    InFront: "In front of Text",
    Behind: "Behind text",
};

/**
 * @enum
 */
const DocSpaceType = {
    UPLOAD: "Upload files",
};
/**
 * @enum
 */

const ChartType = {
    ChartType: {
        COLUMN: "Column",
        LINE: "Line",
        PIE: "Pie",
        BAR: "Bar",
        AREA: "Area",
        STOCK: "Stock",
        SCATTER: "Scatter",
        RADAR: "Radar",
        COMBO: "Combo",
    },
    EDIT_CHART: {
        LAYOUT: {
            TITLE: ["None", "Overlay", "No overlay"],
            LEGEND: ["None", "Bottom", "Top", "Right", "Left", "Left overlay", "Right overlay"],
            DATA_LABELS: { LABELS: ["None", "Center", "Inner bottom", "Inner top"] },
        },
        V_AXIS: {
            TITLE: ["None", "Rotated", "Horizontal"],
            GRID: ["None", "Major", "Minor", "Major and minor"],
            DISPLAY_UNITS: [
                "None",
                "Hundreds",
                "Thousands",
                "10 000",
                "100 000",
                "Millions",
                "10 000 000",
                "100 000 000",
                "Billions",
                "Trillions",
            ],
            MIN_MAX_VAL: ["Auto", "Fixed"],
            AXIS_CROSSES: ["Auto", "Value", "Minimum value", "Maximum value"],
            MAJOR_MINOR: ["None", "Cross", "In", "Out"],
        },
        H_AXIS: {
            TITLE: ["None", "No overlay"],
            GRID: ["None", "Major", "Minor", "Major and minor"],
            AXIS_CROSSES: ["Auto", "Value", "Minimum value", "Maximum value"],
            MAJOR_MINOR: ["None", "Cross", "In", "Out"],
            AXIS_POSITION: ["Between tick marks", "On tick marks"],
            LABEL_INTERVAL: ["Auto", "Manual"],
            LABEL_POSITION: ["None", "Low", "High", "Next to axis"],
        },
        CELL_SNAPPING: ["Move and size with cells", "Move but don't size with cells", "Don't move or size with cells"],
    },
};

module.exports = {
    ShapeType,
    CropImageType,
    WrappingImageType,
    DocSpaceType,
    ChartType,
};

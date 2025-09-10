// Import Chart module from the library
const { Chart } = require("lib");

// Create a new docx document
Tester.createFile("docx");

// Get a list of all available chart types
const chartList = Chart.getChartList();
console.log("Available Charts:", chartList); // Log the list of charts to the console

// Create a Column chart with ID 1
Chart.createChart("Column", 1);

// Define layout settings for the chart
const layoutSettings = {
    chartTitle: "Overlay", // Title position: "None", "Overlay", "No overlay"
    legend: "Left", // Legend position: "None", "Bottom", "Top", "Right", "Left"
    dataLabels: {
        labels: "Inner top", // Labels position: "None", "Center", "Inner bottom", "Inner top"
        separator: "test", // Text for labels separator
        series: true, // Show series name
        category: true, // Show category name
        value: true, // Show value of the data point
    },
};
// Set the Layout settings for the chart
Chart.setSettings("Layout", layoutSettings);

// Define settings for the Vertical Axis
const category = { type: "Number", decimal: 5, separator: true, formatIndex: 1 };
const format = { category, linked: false };
const label = { position: "High", format };
const maxVal = { type: "Fixed", value: "50" };
const minVal = { type: "Fixed", value: "30" };
const axisCross = { type: "Value", value: "25" };
const axis = { reverse: true, logScale: true, base: 5, axisCross };
const display = { hideAxis: true, title: "Rotated", grid: "Minor", unit: "Thousands", maxVal, minVal };
const tick = { major: "Cross", minor: "In" };
const vAxisSettings = { display, axis, tick, label };

// Set the Vertical Axis settings
Chart.setSettings("VerticalAxis", vAxisSettings);

// Set the Cell Snapping settings
Chart.setSettings("CellSnapping", "Don't move or size with cells");

// Apply the current settings
Chart.addSettings();

// Define Alternative Text settings
const altTextSettings = { title: "test", description: "test1" };

// Set the Alternative Text settings
Chart.setSettings("AltText", altTextSettings);

// Define settings for the Horizontal Axis
const horizontalAxisSettings = {
    display: { hideAxis: true, title: "No overlay", grid: "Major and minor" }, // Hide axis, title and gridlines
    axis: {
        axisCrosses: { type: "Minimum value", value: 5 }, // Axis crosses at minimum value with a specific position
        axisPosition: "On tick marks", // Position of the axis relative to tick marks
        reverse: true, // Values in reverse order
    },
    tick: {
        major: "Cross", // Major tick type: "None", "Cross", "In", "Out"
        minor: "In", // Minor tick type
        interval: 5, // Interval between marks
    },
    label: {
        position: "Low", // Label position: "None", "Low", "High", "Next to axis"
        distance: 5, // Distance of the labels from the axis
        interval: { type: "Manual", value: 5 }, // Interval between labels
        format, // Reference to previously defined format settings
    },
};

// Set the Horizontal Axis settings
Chart.setSettings("HorizontalAxis", horizontalAxisSettings);

// Apply the Horizontal Axis settings
Chart.addSettings();

Chart.changeType({ description: "Radar", id: 1 }, 2);

// Select data for the chart
Chart.selectData({ range: "Sheet1!$A$1:$D$7", legend: { series: { name: "Gold", remove: true } } });
Chart.selectData({ legend: { series: { name: "=Sheet1!$B$1", values: "Sheet1!$B$2:$B$7", add: true } } });
Chart.selectData({ legend: { series: { name: "Gold", position: 1 } } });
Chart.selectData({ category: { range: "Sheet1!$A$2:$A$6" } });
Chart.addSelectData();
Chart.addChart();

// Set the wrapping style in right menu settings
Chart.setWrappingStyle("Square");

// Set the chart type in right menu settings
Chart.setChartType({ description: "Column", id: 5 });

// Set the chart style in right menu settings
Chart.setChartStyle(6);

// Set the 3D rotation in right menu settings
Chart.set3DRotation({
    x: { left: 2, right: 4, input: 10, increment: 2, decrement: 4 },
    y: { up: 2, down: 4, input: 10, increment: 2, decrement: 4 },
    perspective: { narrow: 5, wide: 8, input: 3, increment: 2, decrement: 4 },
    depth: { depth: 150, increment: 2, decrement: 4 },
    height: { height: 100, increment: 2, decrement: 4 },
});

// Set the sizes in right menu settings
Chart.setSizes({
    width: { value: 2.3, increment: 2, decrement: 4 },
    height: { value: 3.4, increment: 2, decrement: 4 },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({ style: "Inline" }); // This style does not accept distance settings

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Square",
    distance: {
        top: { value: 10, increment: 2, decrement: 4 },
        bottom: { value: 10, increment: 2, decrement: 4 },
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Tight",
    distance: {
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Through",
    distance: {
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Topbottom",
    distance: {
        top: { value: 10, increment: 2, decrement: 4 },
        bottom: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({ style: "Infront" }); // This style does not accept distance settings

// Set the text wrapping in right menu settings
Chart.setTextWrapping({ style: "Behind" }); // This style does not accept distance settings

const chartPositionSettings = {
    horizontal: {
        alignment: {
            align: "Center",
            relativeTo: "Margin",
        },
        position: {
            value: 6,
            toTheRightOf: "Character",
            increment: 2,
            decrement: 4,
        },
        relative: {
            value: 5,
            relativeTo: "Margin",
            increment: 2,
            decrement: 4,
        },
    },
    vertical: {
        alignment: {
            align: "Top",
            relativeTo: "Paragraph",
        },
        position: {
            value: 0,
            below: "Paragraph",
            increment: 2,
            decrement: 4,
        },
        relative: {
            value: 0,
            relativeTo: "Page",
            increment: 2,
            decrement: 4,
        },
    },
    options: {
        allowOverlap: true,
        //moveObjectWithText: false
    },
};

// Set the position in right menu settings
Chart.setPosition(chartPositionSettings);

// Set the alternative text in right menu settings
Chart.setAltText({ title: "Test title", description: "Test description" });

// Close test example
Tester.close();

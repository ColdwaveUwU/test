const { Chart } = require("lib");

Tester.createFile("docx");
// Create a new .docx file and a Column chart
Chart.createChart({
    groupName: "Column",
    chartName: "Clustered column",
});

// Close the editor
Chart.closeEditor();

// Set the editor settings
Chart.setEditorSettings({
    chartData: {
        chartDataRange: "=Sheet1!$A$1:$C$8",
        addSeries: {
            name: "My Series",
            values: "Sheet1!$A$1:$A$7",
        },
        editSeries: {
            seriesName: "My Series",
            newSeriesName: "My Series 2",
            values: "Sheet1!$A$2:$A$5",
        },
        moveSeriesUp: {
            seriesName: "My Series 2",
            clickCount: 2,
        },
        moveSeriesDown: {
            seriesName: "My Series 2",
            clickCount: 2,
        },
        removeSeries: "My Series 2",
        switchRowsColumns: true,
    },
    clickUndo: 1,
    clickRedo: 1,
});

// Edit category
Chart.setEditorSettings({
    chartData: {
        chartDataRange: "=Sheet1!$A$1:$C$7",
        editCategory: {
            axisLabelsName: "CHN",
            labelRange: "=Sheet1!$A$1:$A$7",
        },
    },
});

// Close the test example
Tester.close();

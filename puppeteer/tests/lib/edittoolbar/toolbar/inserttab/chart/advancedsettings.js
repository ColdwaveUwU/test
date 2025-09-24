const { Chart } = require("lib");

Tester.createFile("docx");
Chart.createChart({
    groupName: "Column",
    chartName: "Clustered column",
});

Chart.setAdvancedSettings({
    textWrapping: {
        style: "Square",
        distance: {
            top: { upArrow: 2, downArrow: 2, value: 10 },
            bottom: { upArrow: 2, downArrow: 2, value: 10 },
            left: { upArrow: 2, downArrow: 2, value: 10 },
            right: { upArrow: 2, downArrow: 2, value: 10 },
        },
    },
    position: {
        horizontal: {
            alignment: { type: "Center", relativeTo: "Page" },
            position: { value: { upArrow: 2, downArrow: 2, value: 10 }, toTheRightOf: "Margin" },
            relative: { value: { upArrow: 2, downArrow: 2, value: 10 }, relativeTo: "Left margin" },
        },
        vertical: {
            alignment: { type: "Center", relativeTo: "Margin" },
            relative: { value: { upArrow: 2, downArrow: 2, value: 10 }, relativeTo: "Page" },
            position: { value: { upArrow: 2, downArrow: 2, value: 10 }, below: "Page" },
        },
        options: {
            allowOverlap: false,
            moveObjectWithText: true,
        },
    },
    altText: {
        title: "Chart Title",
        description: "Chart Description",
    },
    verticalAxis: {
        hideAxis: true,
        title: "Horizontal",
        gridlines: "Major and Minor",
        axisCrosses: { type: "Minimum Value", value: { upArrow: 2, downArrow: 2, value: 10 } },
        displayUnits: {
            valuesInReverseOrder: true,
            logarithmicScale: true,
            base: { upArrow: 2, downArrow: 2, value: 10 },
        },
        minimumValue: { type: "Fixed", value: { upArrow: 2, downArrow: 2, value: 10 } },
        maximumValue: { type: "Fixed", value: { upArrow: 2, downArrow: 2, value: 10 } },
        tickOptions: { majorType: "Cross", minorType: "In" },
        labelOptions: { position: "None" },
    },
    horizontalAxis: {
        hideAxis: true,
        title: "No Overlay",
        gridlines: "Major and Minor",
        axisCrosses: { type: "Minimum Value", value: { upArrow: 2, downArrow: 2, value: 10 } },
        axisPosition: "On Tick Marks",
        displayUnits: { valuesInReverseOrder: true },
        tickOptions: { majorType: "Cross", minorType: "In", interval: { upArrow: 2, downArrow: 2, value: 10 } },
        labelOptions: {
            position: "None",
            axisLabelDistance: { upArrow: 2, downArrow: 2, value: 10 },
            intervalBetweenType: "Manual",
            intervalBetweenValue: { upArrow: 2, downArrow: 2, value: 10 },
        },
    },
    layout: {
        chartTitle: "Overlay",
        legend: "Left",
        dataLabels: "Center",
        series: true,
        category: true,
        value: true,
        dataLabelsSeparator: "test",
    },
});

Tester.close();

const { Chart } = require("lib");

Tester.createFile("docx");
Chart.createChart({
    groupName: "Column",
    chartName: "Clustered column",
});

Chart.setSettings({
    wrappingStyle: "Square",
    changeChartType: {
        groupName: "Bar",
        chartName: "3-D Clustered bar",
    },
    size: {
        width: {
            upArrow: 2,
            downArrow: 2,
            value: 30,
        },
        height: {
            upArrow: 2,
            downArrow: 2,
            value: 30,
        },
    },
    defaultRotation: true,
    chartStyle: "Style 5",
    setXRotation: {
        upArrow: 2,
        downArrow: 2,
        value: 30,
    },
    setYRotation: {
        upArrow: 2,
        downArrow: 2,
        value: 20,
    },
    clickXRotationLeft: 2,
    clickXRotationRight: 2,
    clickYRotationUp: 2,
    clickYRotationDown: 2,
    rightAngle: false,
    autoScale: false,
    setPerspective: {
        upArrow: 2,
        downArrow: 2,
        value: 30,
    },
    clickPerspectiveNarrow: 2,
    clickPerspectiveWide: 2,
    depth: {
        upArrow: 2,
        downArrow: 2,
        value: 30,
    },
    height: {
        upArrow: 2,
        downArrow: 2,
        value: 30,
    },
});

Tester.close();

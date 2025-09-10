const { ChartSelectors, ChartType } = require("../../../../../../../../constants");
const InsertTab = require("../../../../inserttab");
class LayoutSettings extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    async applySettings(layoutSettings) {
        const { chartTitle, legend, dataLabels } = layoutSettings;

        try {
            ChartType.EDIT_CHART.LAYOUT.TITLE.includes(chartTitle)
                ? await this.tester.setOption(ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.CHART_TITLE, chartTitle)
                : console.error(`Chart title "${chartTitle}" not found`);

            ChartType.EDIT_CHART.LAYOUT.LEGEND.includes(legend)
                ? await this.tester.setOption(ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.LEGEND, legend)
                : console.error(`Legend "${legend}" not found`);

            if (dataLabels) {
                const { labels, separator, series, category, value } = dataLabels;

                if (!ChartType.EDIT_CHART.LAYOUT.DATA_LABELS.LABELS.includes(labels)) {
                    console.error(`Labels "${labels}" not found`);
                } else {
                    const [isSeparatorDisabled] = await this.tester.setOption(
                        ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.DATA_LABELS,
                        labels
                    );

                    if (labels !== "None" && !isSeparatorDisabled) {
                        if (separator) {
                            await this.tester.inputToForm(
                                separator,
                                ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.SEPARATOR
                            );
                        }

                        const checkboxes = [
                            { selector: ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.SERIES, condition: series },
                            { selector: ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.CATEGORY, condition: category },
                            { selector: ChartSelectors.EDIT_CHART.LAYOUT_SETTINGS.VALUE, condition: value },
                        ];

                        await Promise.all(checkboxes.map((checkbox) => this.tester.clickCheckbox(checkbox)));
                    }
                }
            }
        } catch (error) {
            throw new Error(`Failed to change layout: ${error}`);
        }
    }
}

module.exports = LayoutSettings;

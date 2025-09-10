const BaseSettings = require("../../../basesettings");
const { Dropdown, Input } = require("../../../../../elements");
const selectors = require("./selectors.json");

class TabsSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static TABS_SELECTORS = selectors;

    /**
     * Sets default tab
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} defaultTabSettings
     */
    async setDefaultTab(defaultTabSettings) {
        const defaultTabInput = new Input(this.tester, TabsSettings.TABS_SELECTORS.DEFAULT_TAB_INPUT);
        await defaultTabInput.setInputSettings(defaultTabSettings);
    }

    /**
     * Sets tab position
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} tabPositionSettings
     */
    async setTabPosition(tabPositionSettings) {
        const tabPositionInput = new Input(this.tester, TabsSettings.TABS_SELECTORS.TAB_POSITION_INPUT);
        await tabPositionInput.setInputSettings(tabPositionSettings);
    }

    /**
     * Sets alignment
     * @param {"Left" | "Center" | "Right"} type - The type of alignment
     */
    async setAlignment(type) {
        const alignmentMenuSelectors = TabsSettings.TABS_SELECTORS.ALIGNMENT_MENU;
        const alignmentDropdown = new Dropdown(this.tester, {
            selector: alignmentMenuSelectors.MENU_SELECTOR,
            elementsValue: ["Left", "Center", "Right"],
            elementsSelector: alignmentMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await alignmentDropdown.selectDropdownItem(type);
    }

    /**
     * Sets leader type by number
     * @param {number} number - The number of leader type in the list
     */
    async setLeader(number) {
        const leaderMenuSelectors = TabsSettings.TABS_SELECTORS.LEADER_MENU;
        const leaderDropdown = new Dropdown(this.tester, {
            selector: leaderMenuSelectors.MENU_SELECTOR,
            elementsSelector: leaderMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await leaderDropdown.selectDropdownItemByIndex(number - 1);
    }

    /** Specifies tab
     * @param {{ tabPositionSettings: { upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string },
     * alignmentType: "Left" | "Center" | "Right",
     * leader: number }} tabSettings
     */
    async specifyTab(tabSettings) {
        const { tabPositionSettings, alignmentType, leader } = tabSettings;
        if (tabPositionSettings) {
            await this.setTabPosition(tabPositionSettings);
        }
        if (alignmentType) {
            await this.setAlignment(alignmentType);
        }
        if (leader) {
            await this.setLeader(leader);
        }

        await this.tester.click(TabsSettings.TABS_SELECTORS.SPECIFY_TAB_BUTTON);
    }

    /** Removes tab
     * @param {number} number - The number of tab in the list
     */
    async removeTab(number) {
        const tabListSelector = TabsSettings.TABS_SELECTORS.SPECIFIED_TABS_LIST.TABS_LIST;
        const tabItemSelector = TabsSettings.TABS_SELECTORS.SPECIFIED_TABS_LIST.LIST_ITEM;
        const items = await this.tester.parseItems(tabListSelector, tabItemSelector);
        const tabItem = items[number - 1].id;
        await this.tester.click(tabItem);
        await this.tester.click(TabsSettings.TABS_SELECTORS.REMOVE_BUTTON);
    }

    /** Removes all tabs */
    async removeAllTabs() {
        await this.tester.click(TabsSettings.TABS_SELECTORS.REMOVE_ALL_BUTTON);
    }

    async applySettings(tabsSettings) {
        const settingsMap = {
            defaultTab: this.setDefaultTab.bind(this),
            specifyTab: this.specifyTab.bind(this),
            removeTab: this.removeTab.bind(this),
            removeAllTabs: this.removeAllTabs.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (tabsSettings[key]) {
                await method(tabsSettings[key]);
            }
        }
    }
}

module.exports = TabsSettings;

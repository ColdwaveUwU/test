/**
 * Represents an asynchronous function to be executed by the User instance.
 * @callback UserFunction
 */

/**
 * @typedef {Object} userDetails
 * @property {string} name
 * @property {string} firstName
 * @property {string} lastName
 */

const { Draw, Color, Pdf, FileMenu, TestData, Connector, AppTitle } = require("../../common");
const { Verification } = require("../../common/scripts");
const Toolbar = require("../../edittoolbar");
const RighMenu = require("../../rightmenu");
const {
    ToolMenuChats,
    ToolMenuComments,
    ToolMenuHeadings,
    ToolMenuSearch,
    ToolMenuThumbnails,
} = require("../../toolmenu");
const { ViewToolbarComment, ViewToolbarHome, ViewToolbarStatic, ViewToolbarView } = require("../../viewtoolbar");
const {
    Bookmark,
    Caption,
    TableOfFigures,
    CrossReference,
    Footnote,
    TableOfContents,
} = require("../../edittoolbar/toolbar/referencestab");
const { YoutubePlugin, HightLightCodePlugin } = require("../../plugins");
const { PageZoom, ToolbarHeadings } = require("../../edittoolbar/toolbar/viewtab");
const { Shape, Chart } = require("../../edittoolbar/toolbar/inserttab");
const StatusBar = require("../../statusbar");
class User {
    /**
     * @param {userDetails} userDetails
     * @param {Object} config - Tester config
     */
    constructor(userDetails, config = RegularTester.config) {
        this.Functions = new Toolbar.HomeTab.Functions(this.Tester);
        this.Replace = new Toolbar.HomeTab.Replace(this.Tester);
        this.HomeTab = new Toolbar.HomeTab.HomeTab(this.Tester);
        this.name = userDetails.name;
        this.firstName = userDetails.firstName;
        this.lastName = userDetails.lastName;
        this.Tester = new TesterImp(config, RegularTester.providerAddonClass, true);
        this.Draw = new Draw(this.Tester);
        this.Pdf = new Pdf(this.Tester);
        this.SlideShowManager = new Toolbar.HomeTab.SlideShowManager(this.Tester);
        this.TextBoxHome = new Toolbar.HomeTab.TextBoxHome(this.Tester);
        this.TestData = new TestData(this.Tester);
        this.Connector = new Connector(this.Tester);
        this.Font = new Toolbar.HomeTab.Font(this.Tester);
        this.TextForm = new Toolbar.HomeTab.TextForm(this.Tester);
        this.EditPdf = new Toolbar.HomeTab.EditPdf(this.Tester);
        this.Hyperlink = new Toolbar.InsertTab.Hyperlink(this.Tester);
        this.Image = new Toolbar.InsertTab.Image(this.Tester);
        this.PageBreakInsert = new Toolbar.InsertTab.PageBreakInsert(this.Tester);
        this.Table = new Toolbar.InsertTab.Table(this.Tester);
        this.BlankPagePdf = new Toolbar.InsertTab.BlankPagePdf(this.Tester);
        this.Margins = new Toolbar.LayoutTab.Margins(this.Tester);
        this.PageOrientation = new Toolbar.LayoutTab.PageOrientation(this.Tester);
        this.PageColumns = new Toolbar.LayoutTab.PageColumns(this.Tester);
        this.PageBreakLayout = new Toolbar.LayoutTab.PageBreakLayout(this.Tester);
        this.Watermark = new Toolbar.LayoutTab.Watermark(this.Tester);
        this.PageColor = new Toolbar.LayoutTab.PageColor(this.Tester);
        this.ColorsLayout = new Toolbar.LayoutTab.ColorsLayout(this.Tester);
        this.CoEditing = new Toolbar.CollaborationTab.CoEditing(this.Tester);
        this.AddComment = new Toolbar.CollaborationTab.AddComment(this.Tester);
        this.ResolveComments = new Toolbar.CollaborationTab.ResolveComments(this.Tester);
        this.DeleteComments = new Toolbar.CollaborationTab.DeleteComments(this.Tester);
        this.DisplayMode = new Toolbar.CollaborationTab.DisplayMode(this.Tester);
        this.MailMerge = new Toolbar.CollaborationTab.MailMerge(this.Tester);
        this.ReviewChanges = new Toolbar.CollaborationTab.ReviewChanges(this.Tester);
        this.Hyphenation = new Toolbar.LayoutTab.Hyphenation(this.Tester);
        this.IndentsLayout = new Toolbar.LayoutTab.IndentsLayout(this.Tester);
        this.Wrapping = new Toolbar.LayoutTab.Wrapping(this.Tester);
        this.BringForward = new Toolbar.LayoutTab.BringForward(this.Tester);
        this.SendBackward = new Toolbar.LayoutTab.SendBackward(this.Tester);
        this.AlignLayout = new Toolbar.LayoutTab.AlignLayout(this.Tester);
        this.GroupLayout = new Toolbar.LayoutTab.GroupLayout(this.Tester);
        this.MergeShapes = new Toolbar.LayoutTab.MergeShapes(this.Tester);
        this.CompareChanges = new Toolbar.CollaborationTab.CompareChanges(this.Tester);
        this.CombineChanges = new Toolbar.CollaborationTab.CombineChanges(this.Tester);
        this.Chat = new Toolbar.CollaborationTab.Chat(this.Tester);
        this.VersionHistory = new Toolbar.CollaborationTab.VersionHistory(this.Tester);
        this.Color = new Color(this.Tester);
        this.FileMenu = new FileMenu(this.Tester);
        this.ToolbarHeadings = new ToolbarHeadings(this.Tester);
        this.PageZoom = new PageZoom(this.Tester);
        this.ToolbarComment = new Toolbar.CommentTab.ToolbarComment(this.Tester);
        this.ToolMenuChats = new ToolMenuChats(this.Tester);
        this.ToolMenuComments = new ToolMenuComments(this.Tester);
        this.ToolMenuHeadings = new ToolMenuHeadings(this.Tester);
        this.ToolMenuSearch = new ToolMenuSearch(this.Tester);
        this.ToolMenuThumbnails = new ToolMenuThumbnails(this.Tester);
        this.ViewToolbarComment = new ViewToolbarComment(this.Tester);
        this.ViewToolbarHome = new ViewToolbarHome(this.Tester);
        this.ViewToolbarStatic = new ViewToolbarStatic(this.Tester);
        this.ViewToolbarView = new ViewToolbarView(this.Tester);
        this.YoutubePlugin = new YoutubePlugin(this.Tester);
        this.HightLightCodePlugin = new HightLightCodePlugin(this.Tester);
        this.Shape = new Shape(this.Tester);
        this.Chart = new Chart(this.Tester);
        this.TextBoxInsert = new Toolbar.InsertTab.TextBoxInsert(this.Tester);
        this.Checkbox = new Toolbar.FormTab.Checkbox(this.Tester);
        this.ComboBox = new Toolbar.FormTab.ComboBox(this.Tester);
        this.Dropdown = new Toolbar.FormTab.Dropdown(this.Tester);
        this.TextField = new Toolbar.FormTab.TextField(this.Tester);
        this.FreezePanes = new Toolbar.ViewTab.FreezePanes(this.Tester);
        this.Guides = new Toolbar.ViewTab.Guides(this.Tester);
        this.InterfaceTheme = new Toolbar.ViewTab.InterfaceTheme(this.Tester);
        this.SheetPreview = new Toolbar.ViewTab.SheetPreview(this.Tester);
        this.SheetView = new Toolbar.ViewTab.SheetView(this.Tester);
        this.SlideView = new Toolbar.ViewTab.SlideView(this.Tester);
        this.UIVisibility = new Toolbar.ViewTab.UIVisibility(this.Tester);
        this.Macros = new Toolbar.ViewTab.Macros(this.Tester);

        this.CheckboxSettings = new RighMenu.CheckboxSettings(this.Tester);
        this.ComboBoxSettings = new RighMenu.ComboBoxSettings(this.Tester);
        this.DropdownSettings = new RighMenu.DropdownSettings(this.Tester);
        this.TextFieldSettings = new RighMenu.TextFieldSettings(this.Tester);
        this.TableSettings = new RighMenu.TableSettings(this.Tester);
        this.AppTitle = new AppTitle(this.Tester);
        this.StatusBar = new StatusBar(this.Tester);
        this.Bookmark = new Bookmark(this.Tester);
        this.Caption = new Caption(this.Tester);
        this.TableOfFigures = new TableOfFigures(this.Tester);
        this.CrossReference = new CrossReference(this.Tester);
        this.Footnote = new Footnote(this.Tester);
        this.TableOfContents = new TableOfContents(this.Tester);

        this.Verification = new Verification(this.Tester);

        this.userDetails = userDetails;
        this.resolveWait = [];
    }

    /**
     * Attach an event to the Tester instance.
     * @param {string} event - The event to attach.
     * @param {Function} action - The action to perform when the event is triggered.
     */
    attachEvent(event, action) {
        this.Tester.attachEvent(event, action);
    }

    /**
     * Dispatch an event using the Tester instance.
     * @param {string} event - The event to dispatch.
     * @param {Object} data - Data to be passed with the event.
     */
    dispatchEvent(event, data) {
        this.Tester.dispatchEvent(event, data);
    }
    /**
     * Creating a Browser.
     */
    async init() {
        if (this.Tester.providerAddon) {
            await this.Tester.launch();
            await this.Tester.providerAddon.connectToFile(RegularTester.page.url());
        } else {
            this.Tester.setUrl(RegularTester.page.url());
            await this.Tester.launch();
            await this.Tester.waitEditor();
        }
    }
    /**
     * Waiting for the do function to execute.
     */
    async wait() {
        await Promise.all(this.resolveWait);
        this.resolveWait = [];
    }

    /**
     * Execute a user-defined asynchronous function and add it to the list of promises to wait for.
     * @param {UserFunction} userFunction - The asynchronous function to be executed.
     * @returns {Promise<void>} A Promise that resolves when the user function completes.
     */
    async do(userFunction) {
        const promise = new Promise((resolve) => {
            userFunction.call(this).then(() => {
                resolve();
            });
        });
        this.resolveWait.push(promise);
    }

    /**
     * @param {UserFunction} userFunction - The asynchronous function to be executed.
     */
    async doSync(userFunction) {
        const promise = new Promise((resolve) => {
            userFunction.call(this).then(() => {
                resolve();
            });
        });
        await promise;
    }

    /**
     * Closing the user's created browser.
     */
    async close() {
        await this.Tester.browser.close();
    }
}

module.exports = User;

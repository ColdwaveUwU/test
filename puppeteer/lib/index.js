const { createProxy } = require("../engine/script/js");
const { Draw, Color, Pdf, TestData, Connector, FileMenu, MoreButton, AppTitle } = require("../module/common");
const Toolbar = require("../module/edittoolbar");
const { Review } = require("../module/review");
const Toolmenu = require("../module/toolmenu");
const ViewToolbar = require("../module/viewtoolbar");
const Plugins = require("../module/plugins");
const { Verification } = require("../module/common/scripts");
const StatusBar = require("../module/statusbar");
const RightMenu = require("../module/rightmenu");

const drawInstance = createProxy(new Draw());
const colorInstance = createProxy(new Color());
const pdfInstance = createProxy(new Pdf());
const connectorInstance = createProxy(new Connector());
const testDataInstance = createProxy(new TestData());
const moreButtonInstance = createProxy(new MoreButton());

const fontInstance = createProxy(new Toolbar.HomeTab.Font());
const numberFormatCellInstance = createProxy(new Toolbar.HomeTab.NumberFormatCell());
const slideShowManagerInstance = createProxy(new Toolbar.HomeTab.SlideShowManager());
const textBoxHomeInstance = createProxy(new Toolbar.HomeTab.TextBoxHome());
const textFormInstance = createProxy(new Toolbar.HomeTab.TextForm());
const editPdfInstance = createProxy(new Toolbar.HomeTab.EditPdf());
const functionsInstance = createProxy(new Toolbar.HomeTab.Functions());
const replaceInstance = createProxy(new Toolbar.HomeTab.Replace());
const homeTabInstance = createProxy(new Toolbar.HomeTab.HomeTab());
const imageInstance = createProxy(new Toolbar.InsertTab.Image());
const tableInstance = createProxy(new Toolbar.InsertTab.Table());
const hyperlinkInstance = createProxy(new Toolbar.InsertTab.Hyperlink());
const pageBreakInsertInstance = createProxy(new Toolbar.InsertTab.PageBreakInsert());
const textBoxInsertInstance = createProxy(new Toolbar.InsertTab.TextBoxInsert());
const dropCapInstance = createProxy(new Toolbar.InsertTab.DropCap());
const pageHeaderFooterInstance = createProxy(new Toolbar.InsertTab.PageHeaderFooter());
const blankPagePdfInstance = createProxy(new Toolbar.InsertTab.BlankPagePdf());
const toolbarMarginsInstance = createProxy(new Toolbar.LayoutTab.Margins());
const toolbarPageOrientationInstance = createProxy(new Toolbar.LayoutTab.PageOrientation());
const pageSizeInstance = createProxy(new Toolbar.LayoutTab.PageSize());
const guidesInstance = createProxy(new Toolbar.ViewTab.Guides());
const freezePanesInstance = createProxy(new Toolbar.ViewTab.FreezePanes());
const toolbarPageColumnsInstance = createProxy(new Toolbar.LayoutTab.PageColumns());
const toolbarPageBreakLayoutInstance = createProxy(new Toolbar.LayoutTab.PageBreakLayout());
const toolbarLineNumbersInstance = createProxy(new Toolbar.LayoutTab.LineNumbers());
const toolbarHyphenationInstance = createProxy(new Toolbar.LayoutTab.Hyphenation());
const toolbarWatermarkInstance = createProxy(new Toolbar.LayoutTab.Watermark());
const toolbarIndentsLayoutInstance = createProxy(new Toolbar.LayoutTab.IndentsLayout());
const toolbarWrappingInstance = createProxy(new Toolbar.LayoutTab.Wrapping());
const toolbarBringForwardInstance = createProxy(new Toolbar.LayoutTab.BringForward());
const toolbarSendBackwardInstance = createProxy(new Toolbar.LayoutTab.SendBackward());
const toolbarAlignLayoutInstance = createProxy(new Toolbar.LayoutTab.AlignLayout());
const toolbarGroupLayoutInstance = createProxy(new Toolbar.LayoutTab.GroupLayout());
const toolbarMergeShapesInstance = createProxy(new Toolbar.LayoutTab.MergeShapes());
const toolbarPageColorInstance = createProxy(new Toolbar.LayoutTab.PageColor());
const toolbarColorsLayoutInstance = createProxy(new Toolbar.LayoutTab.ColorsLayout());
const toolbarHeadingsInstance = createProxy(new Toolbar.ViewTab.ToolbarHeadings());
const toolbarCommentInstance = createProxy(new Toolbar.CommentTab.ToolbarComment());
const pageZoomInstance = createProxy(new Toolbar.ViewTab.PageZoom());
const interfaceThemeInstance = createProxy(new Toolbar.ViewTab.InterfaceTheme());
const uivisibilityInstance = createProxy(new Toolbar.ViewTab.UIVisibility());
const slideViewInstance = createProxy(new Toolbar.ViewTab.SlideView());
const sheetPreviewInstance = createProxy(new Toolbar.ViewTab.SheetPreview());
const sheetViewInstance = createProxy(new Toolbar.ViewTab.SheetView());
const shapeInstance = createProxy(new Toolbar.InsertTab.Shape());
const smartTabInstance = createProxy(new Toolbar.InsertTab.SmartArt());
const chartInstance = createProxy(new Toolbar.InsertTab.Chart());
const toolMenuTextFieldInstance = createProxy(new Toolbar.FormTab.TextField());
const toolbarMenuComboBoxInstance = createProxy(new Toolbar.FormTab.ComboBox());
const toolbarMenuDropdownInstance = createProxy(new Toolbar.FormTab.Dropdown());
const toolbarMenuCheckboxInstance = createProxy(new Toolbar.FormTab.Checkbox());
const reviewChangesInstance = createProxy(new Toolbar.CollaborationTab.ReviewChanges());
const coEditingInstance = createProxy(new Toolbar.CollaborationTab.CoEditing());
const addCommentInstance = createProxy(new Toolbar.CollaborationTab.AddComment());
const resolveCommentsInstance = createProxy(new Toolbar.CollaborationTab.ResolveComments());
const deleteCommentsInstance = createProxy(new Toolbar.CollaborationTab.DeleteComments());
const displayModeInstance = createProxy(new Toolbar.CollaborationTab.DisplayMode());
const mailMergeInstance = createProxy(new Toolbar.CollaborationTab.MailMerge());
const compareChangesInstance = createProxy(new Toolbar.CollaborationTab.CompareChanges());
const combineChangesInstance = createProxy(new Toolbar.CollaborationTab.CombineChanges());
const chatInstance = createProxy(new Toolbar.CollaborationTab.Chat());
const versionHistoryInstance = createProxy(new Toolbar.CollaborationTab.VersionHistory());

const toolMenuChatsInstance = createProxy(new Toolmenu.ToolMenuChats());
const toolMenuCommentsInstance = createProxy(new Toolmenu.ToolMenuComments());
const toolMenuHeadingsInstance = createProxy(new Toolmenu.ToolMenuHeadings());
const toolMenuSearchInstance = createProxy(new Toolmenu.ToolMenuSearch());
const toolMenuThumbnailsInstance = createProxy(new Toolmenu.ToolMenuThumbnails());

const viewToolbarCommentInstance = createProxy(new ViewToolbar.ViewToolbarComment());
const viewToolbarFileInstance = createProxy(new ViewToolbar.ViewToolbarFile());
const viewToolbarHomeInstance = createProxy(new ViewToolbar.ViewToolbarHome());
const viewToolbarStaticInstance = createProxy(new ViewToolbar.ViewToolbarStatic());
const viewToolbarViewInstance = createProxy(new ViewToolbar.ViewToolbarView());
const viewToolbarDocumentModeInstance = createProxy(new ViewToolbar.ViewToolbarDocumentMode());

const youtubePluginInstance = createProxy(new Plugins.YoutubePlugin());
const hightLightCodePluginInstance = createProxy(new Plugins.HightLightCodePlugin());

const verificationInstance = createProxy(new Verification());
const reviewInstance = createProxy(new Review());
const fileMenuInstance = createProxy(new FileMenu());
const comboBoxSettingsInstance = createProxy(new RightMenu.ComboBoxSettings());
const paragraphSettingsInstance = createProxy(new RightMenu.ParagraphSettings());
const tableSettingsInstance = createProxy(new RightMenu.TableSettings());
const statusBarInstance = createProxy(new StatusBar());
const textFieldSettingsInstance = createProxy(new RightMenu.TextFieldSettings());
const dropdownSettingsInstance = createProxy(new RightMenu.DropdownSettings());
const checkboxSettingsInstance = createProxy(new RightMenu.CheckboxSettings());

const bookmarkInstance = createProxy(new Toolbar.Referencestab.Bookmark());
const captionInstance = createProxy(new Toolbar.Referencestab.Caption());
const tableOfFiguresInstance = createProxy(new Toolbar.Referencestab.TableOfFigures());
const crossReferenceInstance = createProxy(new Toolbar.Referencestab.CrossReference());
const footnoteInstance = createProxy(new Toolbar.Referencestab.Footnote());
const tableOfContentsInstance = createProxy(new Toolbar.Referencestab.TableOfContents());

const macrosInstance = createProxy(new Toolbar.ViewTab.Macros());
const appTitleInstance = createProxy(new AppTitle());

module.exports = {
    Replace: replaceInstance,
    Functions: functionsInstance,
    Macros: macrosInstance,
    Bookmark: bookmarkInstance,
    Caption: captionInstance,
    TableOfFigures: tableOfFiguresInstance,
    CrossReference: crossReferenceInstance,
    Footnote: footnoteInstance,
    TableOfContents: tableOfContentsInstance,
    Draw: drawInstance,
    Color: colorInstance,
    Pdf: pdfInstance,
    TestData: testDataInstance,
    MoreButton: moreButtonInstance,
    Font: fontInstance,
    NumberFormatCell: numberFormatCellInstance,
    SlideShowManager: slideShowManagerInstance,
    TextBoxHome: textBoxHomeInstance,
    TextForm: textFormInstance,
    Image: imageInstance,
    Table: tableInstance,
    PageBreakInsert: pageBreakInsertInstance,
    SmartArt: smartTabInstance,
    PageZoom: pageZoomInstance,
    InterfaceTheme: interfaceThemeInstance,
    UIVisibility: uivisibilityInstance,
    SlideView: slideViewInstance,
    SheetView: sheetViewInstance,
    SheetPreview: sheetPreviewInstance,
    Guides: guidesInstance,
    FreezePanes: freezePanesInstance,
    Shape: shapeInstance,
    Hyperlink: hyperlinkInstance,
    PageHeaderFooter: pageHeaderFooterInstance,
    BlankPagePdf: blankPagePdfInstance,
    ToolbarHeadings: toolbarHeadingsInstance,
    ToolbarComment: toolbarCommentInstance,
    ToolMenuChats: toolMenuChatsInstance,
    ToolMenuComments: toolMenuCommentsInstance,
    ToolMenuHeadings: toolMenuHeadingsInstance,
    ToolMenuSearch: toolMenuSearchInstance,
    ToolMenuThumbnails: toolMenuThumbnailsInstance,
    ViewToolbarComment: viewToolbarCommentInstance,
    ViewToolbarFile: viewToolbarFileInstance,
    ViewToolbarHome: viewToolbarHomeInstance,
    ViewToolbarStatic: viewToolbarStaticInstance,
    ViewToolbarView: viewToolbarViewInstance,
    ViewToolbarDocumentMode: viewToolbarDocumentModeInstance,
    ReviewChanges: reviewChangesInstance,
    CoEditing: coEditingInstance,
    AddComment: addCommentInstance,
    ResolveComments: resolveCommentsInstance,
    DeleteComments: deleteCommentsInstance,
    DisplayMode: displayModeInstance,
    MailMerge: mailMergeInstance,
    CombineChanges: combineChangesInstance,
    Chat: chatInstance,
    CompareChanges: compareChangesInstance,
    VersionHistory: versionHistoryInstance,
    YoutubePlugin: youtubePluginInstance,
    HightLightCodePlugin: hightLightCodePluginInstance,
    Verification: verificationInstance,
    Chart: chartInstance,
    TextBoxInsert: textBoxInsertInstance,
    Review: reviewInstance,
    Margins: toolbarMarginsInstance,
    PageOrientation: toolbarPageOrientationInstance,
    PageColumns: toolbarPageColumnsInstance,
    PageBreakLayout: toolbarPageBreakLayoutInstance,
    LineNumbers: toolbarLineNumbersInstance,
    Hyphenation: toolbarHyphenationInstance,
    Watermark: toolbarWatermarkInstance,
    IndentsLayout: toolbarIndentsLayoutInstance,
    Wrapping: toolbarWrappingInstance,
    BringForward: toolbarBringForwardInstance,
    SendBackward: toolbarSendBackwardInstance,
    AlignLayout: toolbarAlignLayoutInstance,
    GroupLayout: toolbarGroupLayoutInstance,
    MergeShapes: toolbarMergeShapesInstance,
    PageColor: toolbarPageColorInstance,
    ColorsLayout: toolbarColorsLayoutInstance,
    FileMenu: fileMenuInstance,
    Connector: connectorInstance,
    DropCap: dropCapInstance,
    EditPdf: editPdfInstance,
    PageSize: pageSizeInstance,
    TextField: toolMenuTextFieldInstance,
    TextFieldSettings: textFieldSettingsInstance,
    ComboBox: toolbarMenuComboBoxInstance,
    Checkbox: toolbarMenuCheckboxInstance,
    ComboBoxSettings: comboBoxSettingsInstance,
    ParagraphSettings: paragraphSettingsInstance,
    TableSettings: tableSettingsInstance,
    StatusBar: statusBarInstance,
    Dropdown: toolbarMenuDropdownInstance,
    DropdownSettings: dropdownSettingsInstance,
    CheckboxSettings: checkboxSettingsInstance,
    AppTitle: appTitleInstance,
    CompareChanges: compareChangesInstance,
    HomeTab: homeTabInstance,
};

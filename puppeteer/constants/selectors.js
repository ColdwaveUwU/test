/**
 * @enum {string}
 */
const ImageSettingButtonID = {
    OpenSettings: "#id-right-menu-image",
    ActualSize: "#image-button-original-size",
    FitToMargin: "#image-button-fit-margins",
    RotateRight: "#image-button-270",
    RotateLeft: "#image-button-90",
    Fliph: "#image-button-fliph",
    Flipv: "#image-button-flipv",
    WrappingDropdown: "#image-combo-wrap",
    ImageWidth: "#image-label-width",
    ImageHeight: "#image-label-height",
    ShapeList: "#id-img-change-shape-menu",
    CropButton: "#image-button-crop",
    ResetCrop: "#image-button-reset-crop",
};

/**
 * @enum {string}
 */
const ColorSettingID = {
    Hex: { SELECTOR: "div > ", TARGET_SELECTOR: "#extended-text-color" },
    Red: "#extended-spin-r",
    Green: "#extended-spin-g",
    Blue: "#extended-spin-b",
    Colorpicker: "#id-hsb-colorpicker",
};

const ModalDialogSelectors = {
    MODAL_WINDOW: ".extended-color-dlg",
    APPLY_BUTTON: ".extended-color-dlg [result='1']",
    CANCEL_BUTTON: ".extended-color-dlg [result='0']",
};

const ColorMenuType = {
    DEFAULT: ["Automatic", "Eyedropper", "More colors"],
    FILL: ["Eyedropper", "More colors", "Format cell fill"],
};

/**
 * @enum {string}
 */
const OwnCloudSelectors = {
    OCIS: {
        MAIN_CONTENT: "#web-content-main",
        USERNAME: "#oc-login-username",
        PASSWORD: "#oc-login-password",
        INPUT_FORM: "#files-file-upload-input",
        UPLOAD_MENU_BUTTON: "#upload-menu-btn",
        NEW_FILE_BUTTON: "#new-file-menu-btn",
        LOGIN_BUTTON: ".MuiButton-label",
        DOWNLOAD_SUCCESS: ".upload-info-success",
        FILE_SELECTOR: ".oc-resource-basename",
        CREATE_FILE: ".oc-modal-body-actions-confirm",
        FILE_EXTENSION: ".create-list-file-item-extension",
        FOLDER_NAME_SELECTOR: ".oc-resource-basename",
    },
    NCOC: {
        USERNAME: "#user",
        PASSWORD: "#password",
        LOGIN_BUTTON: "#submit",
        MAIN_CONTENT: "#app-content-files",
        FOLDER_NAME_SELECTOR: "#fileList span.innernametext",
        UPLOAD_MENU_BUTTON: "#controls .icon-add",
        FILE_MENU: ".newFileMenu",
        UPLOAD_PROGRESS_SELECTOR: "#uploadprogressbar",
        FILE_UPLOAD_START_SELECTOR: "#file_upload_start",
        CONTENT_TYPE_XML: "application/xml",
    },
};

/**
 * @enum {string}
 */
const DocSpaceSelectors = {
    LOGIN_FORM: "#login-form",
    LOGIN_USERNAME: "#login_username",
    LOGIN_PASSWORD: "#login_password",
    LOGIN_SUBMIT: "#login_submit",
    LOGIN_CHECKBOX: "#login_remember rect",
    DOC_CATALOG: "#document_catalog-personal",
    FOLDER: ".sc-gEvEer.iQRuyh",
    MAIN_MENU: ".section-wrapper-content > div:nth-child(2)",
    FILE_TYPE: ".p-menuitem-text",
    CREATE_BUTTON: '#modal-dialog button[type="submit"]',
};

/**
 * @enum
 */
const ChartSelectors = {
    LIST: "#id-toolbar-menu-insertchart",
    TYPE: {
        COLUMN: "#menu-chart-group-bar",
        LINE: "#menu-chart-group-line",
        PIE: "#menu-chart-group-pie",
        BAR: "#menu-chart-group-hbar",
        AREA: "#menu-chart-group-area",
        STOCK: "#menu-chart-group-stock",
        SCATTER: "#menu-chart-group-scatter",
        RADAR: "#menu-chart-group-radar",
        COMBO: "#menu-chart-group-combo",
    },
    SETTINGS_MENU: ".asc-window.modal",
    EDIT_CHART: {
        OK_BUTTON: '.advanced-settings-dlg button[result="ok"]',
        LAYOUT_SETTINGS: {
            LAYOUT: "#slot-category-id-chart-settings-dlg-layout",
            LEGEND: "#chart-dlg-combo-legend-pos",
            DATA_LABELS: "#chart-dlg-combo-data-labels",
            CHART_TITLE: "#chart-dlg-combo-chart-title",
            SEPARATOR: "#chart-dlg-txt-separator input",
            SERIES: "#chart-dlg-check-series",
            CATEGORY: "#chart-dlg-check-category",
            VALUE: "#chart-dlg-check-value",
        },
        V_AXIS: {
            V_AXIS: "#slot-category-id-chart-settings-dlg-vert",
            HIDE_AXIS: "#chart-dlg-chk-vert-hide-0",
            TITLE: "#chart-dlg-combo-vert-title-0",
            GRID: "#chart-dlg-combo-vert-grid-0",
            MIN_VAL: { TYPE: "#chart-dlg-combo-mintype-0", VALUE: "#chart-dlg-input-min-value-0" },
            MAX_VAL: { TYPE: "#chart-dlg-combo-maxtype-0", VALUE: "#chart-dlg-input-max-value-0" },
            AXIS_CROSS: { TYPE: "#chart-dlg-combo-v-crosstype-0", VALUE: "#chart-dlg-input-v-axis-crosses-0" },
            DISPLAY_UNITS: "#chart-dlg-combo-units-0",
            REVERSE: "#chart-dlg-check-v-reverse-0",
            LOG_SCALE: "#chart-dlg-check-v-logscale-0",
            BASE: "#chart-dlg-input-base-0",
            MAJOR_TYPE: "#chart-dlg-combo-v-major-type-0",
            MINOR_TYPE: "#chart-dlg-combo-v-minor-type-0",
            LABEL_POSITION: "#chart-dlg-combo-v-label-pos-0",
            LABEL_FORMAT_BUTTON: "#chart-dlg-btn-v-format-0",
        },
        H_AXIS: {
            H_AXIS: "#slot-category-id-chart-settings-dlg-hor",
            HIDE_AXIS: "#chart-dlg-chk-hor-hide-0",
            TITLE: "#chart-dlg-combo-hor-title-0",
            GRID: "#chart-dlg-combo-hor-grid-0",
            AXIS_CROSS: { TYPE: "#chart-dlg-combo-h-crosstype-0", VALUE: "#chart-dlg-input-h-axis-crosses-0" },
            AXIS_POSITION: "#chart-dlg-combo-axis-pos-0",
            REVERSE: "#chart-dlg-check-h-reverse-0",
            MAJOR_TYPE: "#chart-dlg-combo-h-major-type-0",
            MINOR_TYPE: "#chart-dlg-combo-h-minor-type-0",
            INTERVAL: "#chart-dlg-input-marks-interval-0 input",
            LABEL_POSITION: "#chart-dlg-combo-h-label-pos-0",
            LABEL_DISTANCE: "#chart-dlg-input-label-dist-0 input",
            LABEL_INTERVAL_TYPE: "#chart-dlg-combo-label-int-0",
            LABEL_INTERVAL_VALUE: "#chart-dlg-input-label-int-0 input",
            LABEL_FORMAT_BUTTON: "#chart-dlg-btn-h-format-0",
        },
        CELL_SNAPPING: {
            CELL_SNAPPING: "#slot-category-id-chart-settings-dlg-snap",
            CELL_OPTIONS: "#id-chart-settings-dlg-snap div.radiobox span",
        },
        ALT_TEXT: {
            ALT_TEXT: "#slot-category-id-chart-settings-dlg-alttext",
            TITLE: "#chart-advanced-alt-title input",
            DESCRIPTION: "#chart-advanced-alt-description",
        },
    },
    CHANGE_TYPE: {
        TYPE: {
            CHANGE_BUTTON: "#id-toolbar-rtn-edit-chart-type",
            DROPDOWN: "#chart-type-dlg-button-type button",
            LIST: "#chart-type-dlg-menu-type .grouped-data",
            ITEM: ".item",
            DESCRIPTION: ".group-description span",
        },
        STYLE: {
            LIST: "#chart-type-dlg-styles-list div.dataview",
            ITEM: ".item",
            ITEM_STYLE: (styleNumber) => {
                return `#chart-type-dlg-styles-list div.item[aria-label="Style ${styleNumber}"]`;
            },
        },
        OK_BUTTON: 'button[result="ok"]',
    },
    SELECT_DATA: {
        OPEN_BUTTON: "#id-toolbar-rtn-edit-chart-data",
        SERIES_LIST: "#chart-dlg-series-list div[role='list'] .item",
        CATEGORY_LIST: "#chart-dlg-category-list div[role='list'] .item",
        ITEM: ".item",
        SERIES_ITEM: "#chart-dlg-series-list .list-item",
        DESCRIPTION: ".list-item",
        RANGE_INPUT_FORM: "#chart-dlg-txt-range input",
        EDIT_SERIES: {
            EDIT_SERIES: "#chart-dlg-btn-edit",
            NAME: "#id-dlg-chart-range-range1 .input-field.input-field-btn input",
            VALUES: "#id-dlg-chart-range-range2 .input-field.input-field-btn input",
            OK_BUTTON: '.asc-window.modal.modal-dlg.notransform .btn.normal[result="ok"]',
        },
        DELETE_SERIES: "#chart-dlg-btn-delete",
        DOWN_BUTTON: "#chart-dlg-btn-down button",
        UP_BUTTON: "#chart-dlg-btn-up button",
        ADD_SERIES: "#chart-dlg-btn-add",
        SWITCH_RC: "#chart-dlg-btn-switch",
        CATEGORY_ITEM: "#chart-dlg-category-list .list-item",
        CATEGORY: {
            EDIT_CATEGORY: "#chart-dlg-btn-category-edit",
            NAME: "#id-dlg-chart-range-range1 .input-field.input-field-btn input",
        },
        OK_BUTTON: 'button[result="ok"]',
    },
    BUTTON: {
        CHART: "#tlbtn-insertchart",
        OK: "#id-btn-editor-apply",
        EDIT: "#id-toolbar-rtn-edit-chart",
    },
    CELL: {
        CANVAS: "#ws-canvas-graphic-overlay",
        CELL_NAME: "#ce-cell-name",
        FORMAT: "#slot-btn-format",
    },
};

/**
 * @enum
 */
const ViewToolbarDocumentModeSelectors = {
    EDITING_BUTTON: "#slot-btn-edit-mode",
    EDITING_MODE: {
        MODE_LIST: "#slot-btn-edit-mode ul li a",
        ITEM: "div",
        MODE_DESCRIPTION: "b",
    },
    REVIEW_MODE: {
        REVIEW_ITEM: "#id-review-popover .item",
    },
};

module.exports = {
    ImageSettingButtonID,
    ColorSettingID,
    OwnCloudSelectors,
    DocSpaceSelectors,
    ChartSelectors,
    ViewToolbarDocumentModeSelectors,
    ModalDialogSelectors,
    ColorMenuType,
};

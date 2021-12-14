// ------------------------- PROPERTIES -------------------------

/**
 * The current values per row that are provided during inline edit.
 * @name draftValues
 * @public
 * @type {string[]}
 */

/**
 * If present, you can load a subset of data and then display more when users scroll to the end of the table.
 * Use with the onloadmore event handler to retrieve more data.
 * @name enableInfiniteLoading
 * @public
 * @type {boolean}
 * @default false
 */

/**
 * Specifies an object containing information about cell level, row level, and table level errors.
 * When it's set, error messages are displayed on the table accordingly.
 * @name errors
 * @public
 * @type {object}
 */

/**
 * If present, the checkbox column for row selection is hidden.
 * @name hideCheckboxColumn
 * @public
 * @type {boolean}
 * @default false
 */

/**
 * If present, the table header is hidden.
 * @name hideTableHeader
 * @public
 * @type {boolean}
 * @default false
 */

/**
 * If present, a spinner is shown to indicate that more data is loading.
 * @name isLoading
 * @public
 * @type {boolean}
 * @default false
 */

/**
 * Associates each row with a unique ID.
 * @name keyField
 * @public
 * @type {string}
 * @required
 */

/**
 * Reserved for internal use.
 * Enables and configures advanced rendering modes.
 * @name renderConfig
 * @public
 * @type {RenderManagerConfig}
 */

/**
 * If present, column resizing is disabled.
 * @name resizeColumnDisabled
 * @public
 * @type {boolean}
 * @default false
 */

/**
 * If present, the row numbers are shown in the first column.
 * If a column is editable, the row number column will be automatically displayed.
 * @name showRowNumberColumn
 * @public
 * @type {boolean}
 * @default false
 */

/**
 * The column fieldName that controls the sorting order.
 * Sort the data using the onsort event handler.
 * @name sortedBy
 * @public
 * @type {string}
 */

/**
 * If present, the footer that displays the Save and Cancel buttons is hidden during inline editing.
 * @name suppressBottomBar
 * @public
 * @type {boolean}
 * @default false
 */

// ------------------------- EVENTS -------------------------

/**
 * The event fired when a header action is selected, such as text wrapping, text clipping, or a custom header action.
 *
 * @event
 * @name headeraction
 * @param {object} action The action definition described in the “Actions” table.
 * @param {object} columnDefinition The column definition specified in the columns property,
 * for example, the key-value pairs for label, fieldName, type, typeAttributes, and wrapText.
 * @public
 */
/**
 * The event fired when you scroll to the bottom of the table to load more data, until there are no more data to load.
 *
 * @event
 * @name loadmore
 * @param {boolean} enableInfiniteLoading Specifies whether infinite loading is available on the table.
 * @param {boolean} isLoading Specifies that data is loading and displays a spinner on the table.
 * @param {boolean} loadMoreOffset The number of pixels between the bottom of the table and the current scroll position,
 * used to trigger more data loading.
 * @public
 */
/**
 * The event fired when the a table column is resized.
 *
 * @event
 * @name resize
 * @param {object} columnsWidth The width of all columns, in pixels. For example,
 * a table with 5 columns of 205px width each at initial render returns [205, 205, 205, 205, 205].
 * @param {boolean} isUserTriggered Specifies whether the column resize is caused by a user action.
 * @public
 */
/**
 * The event fired when the row is selected.
 *
 * @event
 * @name rowselection
 * @param {object} selectedRows The data in the rows that are selected.
 * @public
 */
/**
 * The event fired when a column is sorted.
 *
 * @event
 * @name sort
 * @param {string} fieldName The fieldName that controls the sorting.
 * @param {string} sortedDirection The sorting direction. Valid options include 'asc' and 'desc'.
 * @public
 */

// ------------------------- TYPE DEFINITIONS -------------------------

/**
 * @typedef {Object} DatatableColumn
 * @name Columns
 * @property {object} actions Appends a dropdown menu of actions to a column. See table below.
 * @property {object} cellAttributes Provides additional customization, such as appending an icon to the output. See table below for valid keys.
 * Cell attributes are not supported for the following data types:
 * * image
 * * progress-bar
 * * slider
 * @property {boolean} editable Specifies whether a column supports inline editing. The default is false.
 * This option is not supported for the following data types:
 * * avatar
 * * avatar-group
 * * badge
 * * dynamic-icon
 * * image
 * * progress-bar
 * * progress-circle
 * * progress-ring
 * * qrcode
 * * URL
 * * URLS
 * @property {string} fieldName Required. The name that binds the columns attributes to the associated data. Each columns attribute must correspond to an item in the data array.
 * @property {integer} fixedWidth Specifies the width of a column in pixels and makes the column non-resizable. If both <code>fixedWidth</code> and <code>initialWidth</code> values are provided, <code>initialWidth</code> is ignored.
 * @property {boolean} hideDefaultActions Specifies whether to hide the default header actions on a column. Default header actions are “Wrap text” and “Clip text”.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the header label.
 * @property {integer} initialWidth The width of the column when it's initialized, which must be within the min-column-width and max-column-width values, or within 50px and 1000px if they are not provided.
 * @property {string} label The Lightning Design System name of the icon.
 * @property {boolean} sortable Specifies whether the column can be sorted. The default is false.
 * @property {string} type Required. The data type to be used for data formatting. For more information, see table below.
 * @property {object} typeAttributes Provides custom formatting with component attributes for the data type. For example, currency-code for the currency type. For more information, see table below.
 * @property {boolean} wrapText Specifies whether text in a column is wrapped when the table renders. Wrapped text vertically expands a row to reveal its full content. Use with wrap-text-max-lines to display a number of lines before hiding the rest.
 * Text wrapping and clipping are only supported for the following data types:
 * * currency
 * * date
 * * email
 * * location
 * * number
 * * percent
 * * phone
 * * text
 * * url
 */

/**
 * @typedef {Object} DatatableAction
 * @name Actions
 * @property {string} label Required. The label that's displayed for the action.
 * @property {string} name Required. The name of the action, which identifies the selected action.
 * @property {boolean} checked Specifies whether a check mark is shown to the left of the action label. If true, a check mark is shown to the left of the menu item. If false, a check mark is not shown but there is space to accommodate one.
 * This key isn’t supported for the row actions.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 * @property {string} iconName The name of the icon to be displayed to the right of the action item.
 */

/**
 * @typedef {Object} DatatableCellAttribute
 * @name CellAttributes
 * @property {string} alignment Alignment of the text. Valid options include left, center and right.
 * @property {string} class Pass Lightning Design System classes to the cell.
 * @property {string | object} iconName The Lightning Design System name of the icon, for example, utility:down.
 * To use a custom icon for each row, pass an object with a key <code>fieldName</code>. The value of <code>fieldName</code> will be the data objects key containing the icon name.
 * @property {string} iconLabel The label for the icon to be displayed on the right of the icon.
 * @property {string} iconPosition The position of the icon relative to the data. Valid options include left and right. This value defaults to left.
 * @property {string} iconAlternativeText Descriptive text for the icon.
 */

/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name dataTypesFromAToB
 * @storyId example-datatable--data-types-from-a-to-b
 */
/**
 * @memberof examples
 * @name dataTypesFromCToD
 * @storyId example-datatable--data-types-from-c-to-d
 */
/**
 * @memberof examples
 * @name dataTypesFromEToN
 * @storyId example-datatable--data-types-from-e-to-n
 */
/**
 * @memberof examples
 * @name dataTypesFromOToQ
 * @storyId example-datatable--data-types-from-o-to-q
 */
/**
 * @memberof examples
 * @name dataTypesFromRToZ
 * @storyId example-datatable--data-types-from-r-to-z
 */
/**
 * @memberof examples
 * @name datatableWithSummarizeTypes
 * @storyId example-datatable--datatable-with-summarize-types
 */

/**
 * @typedef {Object} Column
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
 * * dynamic-icon
 * * image
 * * progress-bar
 * * progress-circle
 * * progress-ring
 * * qrcode
 * @property {string} fieldName Required. The name that binds the columns attributes to the associated data. Each columns attribute must correspond to an item in the data array.
 * @property {integer} fixedWidth Specifies the width of a column in pixels and makes the column non-resizable. If both fixedWidth and initialWidth values are provided, initialWidth is ignored.
 * @property {boolean} hideDefaultActions Specifies whether to hide the default header actions on a column. Default header actions are “Wrap text” and “Clip text”.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the header label.
 * @property {integer} initialWidth The width of the column when it's initialized, which must be within the min-column-width and max-column-width values, or within 50px and 1000px if they are not provided.
 * @property {string} label The Lightning Design System name of the icon.
 * @property {boolean} sortable Specifies whether the column can be sorted. The default is false.
 * @property {string[]} summarizeTypes Specifies what type of summarization.  If specified, an additional row is present a the bottom of the datatable with the result of the summarization. Valid summarize options are:
 * * count
 * * countUnique
 * * sum
 * * average
 * * median
 * * max
 * * min
 * * mode
 *
 * Summarization is only supported for the following data types:
 * * currency
 * * number
 * * percent
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
 * @typedef {Object} Action
 * @name Actions
 * @property {string} label Required. The label that's displayed for the action.
 * @property {string} name Required. The name of the action, which identifies the selected action.
 * @property {boolean} checked Specifies whether a check mark is shown to the left of the action label. If true, a check mark is shown to the left of the menu item. If false, a check mark is not shown but there is space to accommodate one.
 * This key isn’t supported for the row actions.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 * @property {string} iconName The name of the icon to be displayed to the right of the action item.
 */

/**
 * @typedef {Object} CellAttribute
 * @name CellAttributes
 * @property {string} alignment Alignment of the text. Valid options include left, center and right.
 * @property {string} class Pass Lightning Design System classes to the cell.
 * @property {string | object} iconName The Lightning Design System name of the icon, for example, utility:down.
 * To use a custom icon for each row, pass an object with a key fieldName. The value of fieldName will be the data objects key containing the icon name.
 * @property {string} iconLabel The label for the icon to be displayed on the right of the icon.
 * @property {string} iconPosition The position of the icon relative to the data. Valid options include left and right. This value defaults to left.
 * @property {string} iconAlternativeText Descriptive text for the icon.
 */

/**
 * @typedef {Object} VisualPickerItem
 * @name items
 * @property {string} title Title of the item.
 * @property {string} description Description displayed under the title.
 * @property {string} alignment Valid values include left, center and right. Default is center.
 * @property {string} value Unique value of the item.
 * @property {boolean} disabled If present, the item is disabled and the user cannot interact with it. Default is false.
 * @property {string[]} tags Array of tags.
 * @property {object} figure Figure object.
 */

/**
 * @typedef {Object} VisualPickerItemFigure
 * @name itemsFigure
 * @property {string} title Figure title displayed inside the figure.
 * @property {string} description The description can include text, and is displayed under the title inside the figure.
 * @property {string} alignment Valid values include left, center and right. Default is center.
 * @property {string} iconName The Lightning Design System name of the icon. Specify the name in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
 * @property {string} iconSize The size of the icon.
 * @property {string} iconAlternativeText The assistive text for the icon in the figure.
 * @property {string} iconPosition Valid value for coverable & non-coverable pickers are: top (default) and bottom. Valid values for vertical pickers are: left (default)and right.
 * @property {string} iconSrc URL of the icon.
 * @property {string} imgSrc URL of the image.
 */

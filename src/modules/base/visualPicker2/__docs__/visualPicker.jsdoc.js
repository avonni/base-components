/**
 * @typedef {Object} VisualPickerItem
 * @name items
 * @property {string} description Description displayed under the title.
 * @property {boolean} disabled If present, the item is disabled and the user cannot interact with it. Default is false.
 * @property {object} figure Figure object.
 * @property {string[]} tags Array of tags.
 * @property {string} title Title of the item.
 * @property {string} value Required. A unique value for the item.
 */
/**
 * @typedef {Object} VisualPickerFigure
 * @name itemsFigure
 * @property {string} description The description can include text, and is displayed under the title inside the figure.
 * @property {string} iconAlternativeText The assistive text for the icon.
 * @property {string} iconName The Lightning Design System name of the icon. Specify the name in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
 * @property {string} iconPosition Sets the position of the icon. Valid values include right and left. Default is left.
 * @property {string} iconSize The size of the icon. Valid values include xx-small, x-small, small, medium and large. Default is medium.
 * @property {string} imgAlternativeText The assistive text for the image.
 * @property {string} imgPosition Sets the position of the image if present. Valid values include right and left. Default is left.
 * @property {string} imgSrc The URL of the image.
 * @property {string} title Title of the item.
 * @property {string} titlePosition The position of the title in the figure. Valid positions include top, bottom, center, left and right. Default is center.
 */
/**
 * @typedef {Object} VisualPickerTag
 * @name itemsTags
 * @property {string} label Tag label.
 * @property {string} variant The variant changes the appearance of the tag. Valid values include base, brand, inverse, alt-inverse, success, info, warning, error, offline. Defaults to base.
 */

/**
 * @typedef {Object} DynamicMenuItem
 * @name items
 * @property {string} label Item label.
 * @property {string[]} meta An array of descriptive meta tags text.
 * @property {string} value Item text value.
 * @property {object} avatar avatar object.
 */
/**
 * @typedef {Object} DynamicMenuAvatar
 * @name avatar
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src The URL for the image.
 * @property {string} alternativeText The alternative text used to describe the avatar, which is displayed as hover text on the image. The default value is "Avatar".
 * @property {string} size The size of the avatar. Valid values are x-small, small, medium, large, x-large and xx-large. The default value is "medium".
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. The default value is "square".
 */
/**
 * @namespace slots
 */
/**
 * Placeholder for your content.
 *
 * @memberof slots
 * @name default
 */
/**
 * Placeholder for actionable components, such as lightning-button.
 *
 * @memberof slots
 * @name footer
 */

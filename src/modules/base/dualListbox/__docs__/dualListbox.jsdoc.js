/**
 * @typedef {Object} DualListboxOption
 * @name options
 * @property {object} avatar An object with item fields to be rendered as an avatar.
 * @property {string} description Description of the option.
 * @property {string} groupName Name of the group this option belongs to.
 * @property {string} label Label of the option.
 * @property {string} value Value of the option.
 */
/**
 * @typedef {Object} DualListboxAvatar
 * @name avatar
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} size Size of the avatar icon. Valid values are x-small, small, medium, large, x-large and xx-large. Defaults to medium.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src Image URL.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. Defaults to square.
 */

/**
 * @typedef {object} ChipContainerItems
 * @name items
 * @property {string} label Label display in the chip.
 * @property {string} variant The variant changes the appearance of the chip. Accepted variants include base, brand, inverse, alt-inverse, success, info, warning, error, offline.
 * @property {boolean} outline If true, display an outline style button.
 * @property {object} avatar Avatar object. If present, the avatar is displayed to the left of the label. Overwrites icon if both medias are present.
 * @property {string} iconName Icon name. If present, the icon is displayed to the left of the label.
 * @property {string} mediaPosition Position of the media element. Valid values include left (default) and right.
 *
 */

/**
 * @typedef {object} PillContainerAvatar
 * @name avatars
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src Image URL.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are circle and square. Defaults to square.
 */

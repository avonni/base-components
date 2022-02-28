/**
 * @typedef {object} PillContainerActions
 * @name actions
 * @property {boolean} disabled If true, the action is disabled and cannot be selected. Defaults to false.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {string} label Required. The label will be used as an alternative text if there is only one action, or as the menu item label if there are more than one.
 * @property {string} name Required. Unique name of the action.
 */

/**
 * @typedef {object} PillContainerAvatar
 * @name avatars
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src Image URL.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are circle and square. Defaults to square.
 */

/**
 * @typedef {object} PillContainerItem
 * @name items
 * @property {string} href Url of the page that the pill's link goes to.
 * @property {string} label Text to display in the pill.
 * @property {object} avatar Avatar object. If present, the avatar is displayed to the left of the label.
 */

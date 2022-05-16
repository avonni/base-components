/**
 * @typedef AvatarGroupItem
 * @name Items
 * @property {string} alternativeText The alternative text used to describe the avatar.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color.
 * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} src Image URL for the avatar. If present, the avatar is displayed before the label.
 * @property {string} entityIconName The Lightning Design System name of the icon used as a fallback for the entity icon when the image fails to load. The initials fallback relies on this for its background color.
 * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} entitySrc Image URL for the entity icon.
 * @property {string} entityPosition Position of the entity icon.
 * @property {string} entityVariant The variant changes the shape of the entity. Valid values are empty, circle, and square. The value defaults to square.
 * @property {string} status An avatar’s status shows contextual information, such as if someone approves or declines something. Valid values include approved, locked, declined and unknown.
 * @property {string} statusTitle Title of the status icon.
 * @property {string} statusPosition Position of the status icon.
 * @property {string} presence A presence shows an avatar’s availability. Valid values include online, busy, focus, offline, blocked and away.
 * @property {string} presenceTitle Title of the presence icon.
 * @property {string} presencePosition Position of the presence icon.
 * @property {string} primaryText Primary text displayed next to the avatar.
 * @property {string} secondaryText Secondary text displayed next to the avatar.
 * @property {string} tertiaryText Tertiary text displayed next to the avatar.
 * @property {object[]} tags Array of tag objects. The tags will be displayed as chips in the avatar’s details. See <a href="/components/avatar/">Avatar</a> for allowed keys.
 * @property {object[]} actions Array of action objects. One action is displayed as a button icon. Two or more actions are displayed in a button menu.
 * @property {string} actionPosition Position of action button. Valid values are top-right, bottom-right, bottom-left or top-left.
 * @property {string} actionMenuIcon Optional custom icon to replace the button menu down arrow default.
 * Names are written in the format 'utility:threedots' where 'utility' is the category, and 'threedots' is the specific icon to be displayed.
 */
/**
 * @typedef {Object} AvatarGroupTag
 * @name tags
 * @property {string} label Tag label.
 * @property {string} variant The variant changes the style of the chip. Valid values include base, brand, warning, error, success, info, alt-inverse, inverse, offline. Defaults to base.
 * @property {boolean} outline If true, display an outline style chip.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-avatar-group-avatar-stack-color-border
 * @default #ffffff
 * @type color
 */

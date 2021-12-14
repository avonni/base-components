/**
 * @typedef Item
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
 * @property {object[]} tags Array of tag objects. The tags will be displayed as badges in the avatar’s details. See <a href="/components/avatar/">Avatar</a> for allowed keys.
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

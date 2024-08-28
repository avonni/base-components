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
 * @property {string} presence Presence of the user to display. Valid values include online, busy, focus, offline, blocked and away.
 * @property {string} presencePosition Position of the presence icon. Valid values include top-left, top-right, bottom-left and bottom-right.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-text-color
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-background-hover
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-text-color-hover
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-background-selected
 * @default #edeceb
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-text-color-selected
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-font-weight
 * @default 700
 * @type font
 */

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
 * @property {string} name Name to identify the pill.
 * @property {object} avatar Avatar object. If present, the avatar is displayed to the left of the label.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-action-color-background
 * @default --avonni-pill-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-action-color-border
 * @default --avonni-pill-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-action-text-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-color-background-hover
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-color-border
 * @default #e5e5e5
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-color-border-focus
 * @default #1b96ff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-container-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-container-color-border
 * @default #e5e5e5
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-container-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-container-spacing-block-end
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-container-spacing-block-start
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-container-spacing-inline-end
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-container-spacing-inline-start
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-line-height
 * @default 1.5
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-shadow
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-shadow-focus
 * @default 0 0 3px #0176d3
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-sizing-border
 * @default 1px
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-spacing-block-end
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-spacing-block-start
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-spacing-inline-end
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-spacing-inline-start
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-pill-text-color
 * @default #181818
 * @type color
 */

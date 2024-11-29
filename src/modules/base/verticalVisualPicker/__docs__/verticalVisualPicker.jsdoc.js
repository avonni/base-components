/**
 * @typedef {Object} VerticalVisualPickerItem
 * @name items
 * @property {object} avatar An object with item fields to be rendered as an avatar.
 * @property {string} description Description displayed under the title.
 * @property {boolean} disabled If present, the item is disabled and the user cannot interact with it. Default is false.
 * @property {string} imgAlternativeText The assistive text for the image.
 * @property {string} imgSrc The URL of the image. If avatar is present and imgSrc are present, the image is prioritize.
 * @property {string} mediaPosition Sets the position of the avatar or the image if present. Valid values include right and left. The value defaults to left.
 * @property {object[]} subItems Array of input choice set options.
 * @property {boolean} subItemsMultiSelect Defines the input choice set is-multi-select attribute.
 * @property {string[]} tags Array of tags.
 * @property {string} title Title of the item.
 * @property {string} value Required. A unique value for the item.
 */
/**
 * @typedef {Object} VerticalVisualPickerSubItem
 * @name itemsSubItem
 * @property {string} label Label of the sub item.
 * @property {string} value Required. A unique value for the sub item.
 */
/**
 * @typedef {Object} VerticalVisualPickerAvatar
 * @name itemsAvatar
 * @property {string} alternativeText The alternative text used to describe the avatar, which is displayed as hover text on the image.
 * @property {string} iconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} imgSrc Image URL for the avatar.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} presence Presence of the user to display. Valid values include online, busy, focus, offline, blocked and away.
 * @property {string} presencePosition Position of the presence icon. Valid values include top-left, top-right, bottom-left and bottom-right.
 * @property {string} size Size of the avatar icon. Valid values are x-small, small, medium, large, x-large and xx-large. Defaults to medium.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. Defaults to square.
 */
/**
 * @typedef {Object} VerticalVisualPickerTag
 * @name itemsTag
 * @property {string} label Tag label.
 * @property {string} variant The variant changes the appearance of the tag. Valid values include base, brand, inverse, alt-inverse, success, info, warning, error, offline. Defaults to base.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-header-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-header-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-header-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-header-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-title-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-title-font-size
 * @default 1.25rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-title-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-title-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-title-alignment
 * @default left
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-description-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-description-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-description-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-description-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-description-alignment
 * @default left
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-description-line-height
 * @default 1.25
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-color-background-hover
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-color-background-selected
 * @default #1b96ff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-color-border
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-color-border-hover
 * @default #1b96ff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-color-border-selected
 * @default #1b96ff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-shadow-box
 * @default 0 2px 2px rgb(0 0 0 / 5%)
 * @type shadow
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-figure-tags-alignment
 * @default left
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-sub-items-color-background
 * @default #f7f9fb
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-spacing-block-end
 * @default 0
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-spacing-block-start
 * @default 0
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-spacing-inline-end
 * @default 1rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-spacing-inline-start
 * @default 1rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-color-background-active
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-color-background-hover
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-color-border
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-color-border-active
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-color-border-hover
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-text-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-text-color-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-text-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-vertical-visual-picker-show-more-button-sizing-border
 * @default 1px
 * @type sizing
 */

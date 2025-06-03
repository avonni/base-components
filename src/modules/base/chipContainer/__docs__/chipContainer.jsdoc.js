/**
 * @typedef {object} ChipContainerItem
 * @name items
 * @property {object} avatar Avatar object. If present, the avatar is displayed to the left of the label.
 * @property {string} backgroundColor If present, it replaces the default variant background color of the chip.
 * @property {boolean} hideText If present, the text is hidden and the chip is displayed as a colored circle.
 * @property {string} label Label display in the chip.
 * @property {string} name Name to identify the chip.
 * @property {boolean} outline If true, display an outline style button.
 * @property {string} prefixIconName Prefix Icon name. If present, the icon is displayed to the left of the label.
 * @property {string} suffixIconName Suffix Icon name. If present, the icon is displayed to the right of the label.
 * @property {string} textColor If present, it replaces the default variant text color. If outline is set to true, this attribute is ignored.
 * @property {string} variant The variant changes the appearance of the chip. Accepted variants include base, brand, inverse, alt-inverse, success, info, warning, error, offline.
 *
 */

/**
 * @typedef {object} ChipContainerAvatar
 * @name avatars
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src Image URL.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are circle and square. Defaults to square.
 * @property {string} position Position of the avatar relative to the text. Valid values include left and right. Defaults to left.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-container-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-container-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-container-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-container-spacing-block-end
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-container-spacing-block-start
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-container-spacing-inline-end
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-container-spacing-inline-start
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-alt-inverse-color-background
 * @default #032d60
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-alt-inverse-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-alt-inverse-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-alt-inverse-outline-color
 * @default #032d60
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-base-color-background
 * @default #032d60
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-base-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-base-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-base-outline-color
 * @default #032d60
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-brand-color-background
 * @default #0070d1
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-brand-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-brand-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-brand-outline-color
 * @default #0070d1
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-error-color-background
 * @default #ba0517
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-error-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-error-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-error-outline-color
 * @default #ba0517
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-info-color-background
 * @default #706e6b
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-info-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-info-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-info-outline-color
 * @default #706e6b
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-inverse-color-background
 * @default #001639
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-inverse-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-inverse-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-inverse-outline-color
 * @default #001639
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-offline-color-background
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-offline-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-offline-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-offline-outline-color
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-success-color-background
 * @default #2e844a
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-success-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-success-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-success-outline-color
 * @default #2e844a
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-warning-color-background
 * @default #dd7a01
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-warning-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-warning-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-warning-outline-color
 * @default #dd7a01
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-label-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-radius-border
 * @default 15rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-line-height
 * @default normal
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-spacing-block-start
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-spacing-block-end
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-spacing-inline-start
 * @default 0.5rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-chip-spacing-inline-end
 * @default 0.5rem
 * @type dimension
 */

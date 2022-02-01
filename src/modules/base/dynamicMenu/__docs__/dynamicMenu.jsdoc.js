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
/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-background
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-text-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-background-hover
 * @default #fafaf9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-border-hover
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-text-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-font-size-hover
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-font-style-hover
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-label-font-weight-hover
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-background-active
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-border-active
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-background
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-border
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-text-color
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-background-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-border-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-text-color-hover
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-font-size-hover
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-font-style-hover
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-label-font-weight-hover
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-background-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-border-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-font-size
 * @default 1.125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-font-weight
 * @default 700
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-background-hover
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-border-hover
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-text-color-hover
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-font-size-hover
 * @default 1.125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-font-style-hover
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-label-font-weight-hover
 * @default 700
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-background-active
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-border-active
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-dropdown-color-background
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-color-background-hover
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-check-mark-color
 * @default #0176d3
 * @type color
 */

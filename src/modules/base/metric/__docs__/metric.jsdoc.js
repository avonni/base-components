/**
 * @typedef {object} MetricAvatar
 * @name avatar
 * @property {string} alternativeText The alternative text used to describe the avatar.
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color.
 * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} position Position of the avatar relative to the value. Valid values include left, right, top and bottom. Defaults to left.
 * @property {string} size The size of the avatar. Valid values are x-small, small, medium, large, x-large and xx-large. Defaults to medium.
 * @property {string} src Image URL for the avatar.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are circle, and square. Defaults to square.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-alignment
 * @default left
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-description-font-size
 * @default 0.75rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-description-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-description-font-weight
 * @default normal
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-description-text-color
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-label-font-size
 * @default 0.875rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-label-font-weigth
 * @default normal
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-label-text-color
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-negative-trend-text-color
 * @default #ba0517
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-neutral-trend-text-color
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-prefix-font-size
 * @default 1rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-prefix-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-prefix-font-weight
 * @default bold
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-prefix-text-color
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-negative-trend-color-background
 * @default #feded8
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-negative-trend-radius
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-negative-trend-text-color
 * @default #ba0517
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-neutral-trend-color-background
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-neutral-trend-radius
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-neutral-trend-text-color
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-positive-trend-color-background
 * @default #cdefc4
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-positive-trend-radius
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-positive-trend-text-color
 * @default #2e844a
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-prefix-font-size
 * @default 0.8125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-prefix-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-prefix-font-weight
 * @default bold
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-prefix-text-color
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-suffix-font-size
 * @default 0.8125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-suffix-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-suffix-font-weight
 * @default bold
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-suffix-text-color
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-value-font-size
 * @default 0.8125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-value-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-value-font-weight
 * @default bold
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-secondary-value-text-color
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-suffix-font-size
 * @default 1rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-suffix-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-suffix-font-weight
 * @default bold
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-suffix-text-color
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-value-font-size
 * @default 1.5rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-value-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-value-font-weight
 * @default bold
 * @type (string|number)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-value-line-height
 * @default 1.25
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-value-text-color
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-metric-positive-trend-text-color
 * @default #2e844a
 * @type color
 */

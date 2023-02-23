/**
 * @typedef {Object} ColorPaletteColor
 * @name colors
 * @property {string} label Color label. If the display is grid, it will be used as the alternative text.
 * @property {string} value Value of the color, for example if the color represents a design token. If present, it will be sent as the token in the change event.
 * @property {string} color Required. Valid CSS color.
 * @property {object[]} groups Array of group names the color belongs to. If empty, the color will appear at the top of the list.
 */

/**
 * @typedef {Object} ColorPaletteGroup
 * @name groups
 * @property {string} name Unique name of the group.
 * @property {string} label Label of the group.
 */

/**
 * @memberof stylingHooks
 * @name --avonni-color-palette-swatch-border-radius
 * @default 0.125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-palette-swatch-selected-outline-width
 * @default 2px
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-palette-swatch-selected-outline-color
 * @default dynamic (swatch background-color)
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-palette-swatch-selected-border-width
 * @default 1px
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-palette-swatch-selected-border-color
 * @default white
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-palette-swatch-selected-checkmark-color
 * @default dynamic (white or black depending on the background color)
 * @type dimension
 */

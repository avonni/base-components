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

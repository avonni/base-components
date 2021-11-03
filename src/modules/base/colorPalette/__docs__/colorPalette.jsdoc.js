/**
 * @typedef {Object} ColorPaletteColor
 * @name colors
 * @property {string} label Color label. If the display is grid, it will be used as the alternative text.
 * @property {string} value Value of the color, for example if the color represents a design token. If present, it will be send as the token in the change event.
 * @property {string} color Required. Valid CSS color.
 * @property {object[]} groups Array of group names the color belongs to. If empty, the color will appear at the top of the list.
 */

/**
 * @typedef {Object} ColorPaletteGroups
 * @name groups
 * @property {string} name Unique name of the group.
 * @property {string} label Label of the group.
 */

/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name base
 * @storyId example-color-palette--base
 */
/**
 * @memberof examples
 * @name smallTiles
 * @storyId example-color-palette--small-tiles
 */
/**
 * @memberof examples
 * @name largeTiles
 * @storyId example-color-palette--large-tiles
 */
/**
 * @memberof examples
 * @name disabled
 * @storyId example-color-palette--disabled
 */
/**
 * @memberof examples
 * @name list
 * @storyId example-color-palette--list
 */
/**
 * @memberof examples
 * @name listWithGroups
 * @storyId example-color-palette--list-with-groups
 */
/**
 * @memberof examples
 * @name gridWithGroups
 * @storyId example-color-palette--grid-with-groups
 */

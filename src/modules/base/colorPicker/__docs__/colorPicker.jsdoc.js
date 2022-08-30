/**
 * @typedef {Object} ColorPickerToken
 * @name tokens
 * @property {string} label Token label.
 * @property {string} value Token value (for example <code>--lwc-brandAccessible</code>).
 * @property {string} color Color represented by the token (for example <code>#0176d3</code>).
 * @property {object[]} groups Array of group names the token belongs to. If empty, the token will appear at the top of the list.
 */

/**
 * @typedef {Object} ColorPickerGroup
 * @name groups
 * @property {string} label Label of the group.
 * @property {string} name Unique name of the group.
 */

/**
 * @typedef {Object} ColorPickerColor
 * @name colors
 * @property {string} color Valid CSS color.
 * @property {object[]} groups Array of group names the color belongs to. If empty, the color will appear at the top of the list.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-picker-label-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-picker-label-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-picker-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-color-picker-label-font-weight
 * @default 400
 * @type font
 */

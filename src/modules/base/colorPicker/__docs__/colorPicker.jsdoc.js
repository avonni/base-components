/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name base
 * @storyId example-color-picker--base
 */
/**
 * @memberof examples
 * @name tokens
 * @storyId example-color-picker--tokens
 */
/**
 * @memberof examples
 * @name groups
 * @storyId example-color-picker--groups
 */
/**
 * @memberof examples
 * @name readOnly
 * @storyId example-color-picker--read-only
 */
/**
 * @memberof examples
 * @name menu
 * @storyId example-color-picker--menu
 */
/**
 * @memberof examples
 * @name menuNoInput
 * @storyId example-color-picker--menu-no-input
 */
/**
 * @memberof examples
 * @name inline
 * @storyId example-color-picker--inline
 */
/**
 * @memberof examples
 * @name inlineNoInput
 * @storyId example-color-picker--inline-no-input
 */
/**
 * @memberof examples
 * @name labelHiddenBorderInverseMenu
 * @storyId example-color-picker--label-hidden-border-inverse-menu
 */
/**
 * @memberof examples
 * @name xxSmallMenuIcon
 * @storyId example-color-picker--xx-small-menu-icon
 */
/**
 * @memberof examples
 * @name mediumMenuIcon
 * @storyId example-color-picker--medium-menu-icon
 */

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

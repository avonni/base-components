/**
 * @typedef {Object} RelationshipGraphGroup
 * @name groups
 * @property {string} label Label of the group.
 * @property {string} name A unique name for the group. It will be returned by the onactionclick event handlers.
 * @property {string} avatarSrc Image URL for the avatar of the group. If present, the avatar is displayed before the label.
 * @property {string} avatarFallbackIconName The Lightning Design System name of the icon used as a fallback when the avatar image fails to load.
 * Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} href URL for the group label link.
 * @property {boolean} expanded If true, the group is expanded. Defaults to true.
 * @property {boolean} hideDefaultActions If true, hide the default actions for this group.
 * @property {object[]} items Array of nested items.
 * @property {object[]} actions Array of custom actions for this group. These actions will be added to the default actions, if present.
 */


/**
 * @typedef {Object} RelationshipGraphItem
 * @name items
 * @property {string} label Label of the item.
 * @property {string} name A unique name for the item. It will be returned by the onselect and the onactionclick event handlers.
 * @property {string} avatarSrc Image URL for the avatar of the item. If present, the avatar is displayed before the label.
 * @property {string} avatarFallbackIconName The Lightning Design System name of the icon used as a fallback when the avatar image fails to load.
 * Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} href URL for the item label link.
 * @property {boolean} hideDefaultActions If true, hide the default actions for this item.
 * @property {boolean} disabled If true, the item is disabled and cannot be selected.
 * @property {object[]} groups Array of nested item groups.
 * @property {object[]} actions Array of custom actions for this item. These actions will be added to the default actions, if present.
 * @property {object[]} data Array of data, displayed in the item body. The objects must have a these keys:
 * * label
 * * value
 */
/**
 * @typedef {Object} RelationshipGraphAction
 * @name actions
 * @property {string} label Required. The action label.
 * @property {string} name Required. The nam eof the action, which identifies the selected action.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-relationship-graph-selected-line-color
 * @default #0070d2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-relationship-graph-line-color
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-relationship-graph-children-indicator-color
 * @default #0070d2
 * @type color
 */

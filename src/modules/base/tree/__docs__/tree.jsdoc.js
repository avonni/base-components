/**
 * @typedef {object} TreeAction
 * @name actions
 * @property {boolean} visible If true, the action is always visible. If false, the action will be displayed in a button menu. Defaults to false.
 * @property {string} iconName Required if `visible` is true. The Lightning Design System name of the action icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} label Required. Label of the action. If `visible` is true, the label will be used as alternative text.
 * @property {string} name Required. Unique name of the action.
 * Reserved action names are: `Standard.Tree.Edit`, `Standard.Tree.Add`, `Standard.Tree.Duplicate` and `Standard.Tree.Delete`. If a reserved action name is used, the standard action will be executed on top of the dispatch of the `actionclick` event. To prevent the default behavior of a reserved action, `preventDefault()` can be called on the `actionclick` event.
 */

/**
 * @typedef {object} TreeAvatar
 * @name avatars
 * @property {string} alternativeText The alternative text used to describe the avatar. Defaults to "Avatar".
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} presence Presence of the user to display. Valid values include online, busy, focus, offline, blocked and away.
 * @property {string} presencePosition Position of the presence icon. Valid values include top-left, top-right, bottom-left and bottom-right. Defaults to bottom-right.
 * @property {string} size Size of the avatar icon. Valid values are x-small, small, medium, large, x-large and xx-large. Defaults to medium.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. Defaults to square.
 */

/**
 * @typedef {object} TreeItem
 * @name items
 * @property {object[]} actions Array of action objects that should be added to the tree actions for this item.
 * @property {object} avatar Avatar object. If present, the avatar is displayed to the left of the item.
 * @property {string} color Color of the item checkbox, if the tree is in multi-select mode.
 * @property {boolean} enableInfiniteLoading If true, the item is expandable even if it has no children. The loadmore event will be fired when the item is opened if it has no child, or when the user clicks on the “Load More” button.
 * @property {string} label Required. Label of the item.
 * @property {string} metatext Text to provide users with supplemental information and aid with identifiation or diambiguation.
 * @property {string} iconName The Lightning Design System name of the icon displayed after the label. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {boolean} indeterminate If true, the multi-select checkbox is displayed in an indeterminate state, independently of the selected state of the item or its children.
 * @property {object[]} items Nested item objects.
 * @property {string} name Required. The unique name of the item. It will be returned by the `onselect` event handler.
 * @property {string} href If the item label should be a link, URL of the link.
 * @property {string[]} hiddenActions Array of action names that should be hidden for this item.
 * @property {boolean} noSlots If true, the item cannot accept items has a child when sorting.
 * @property {string[]} slottableTypes Array of types of items that can be slotted into this item when sorting. If the array isn’t provided, any type of item can be slotted in this item.
 * @property {string} type Type of the item. It will be used to determine if the item can be slotted into another item when sorting.
 * @property {boolean} unselectable If true, the item is not selectable.
 * Links are incompatible with inline edition and multi-select trees.
 * @property {boolean} expanded If true, the item branch is expanded. An expanded branch displays its nested items visually. Defaults to false.
 * @property {boolean} disabled If true, the item is disabled. A disabled item is grayed out and can't be focused. Defaults to false.
 * @property {boolean} isLoading If true, a loading spinner is visible when the item is expanded. Defaults to false.
 * @property {object[]} fields Array of output data objects. See <a href="/components/output-data/">Output Data</a> for valid keys. The fields are visible only when the item is expanded.
 * @property {string} target Target attribute for the link.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-header-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-header-font-size
 * @type font
 * @default 0.875rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-header-font-weight
 * @type font
 * @default 700
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-color-background-hover
 * @type color
 * @default #f3f2f2
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-color-background-selected
 * @type color
 * @default rgba(21, 137, 238, 0.1)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-spacing-block-start
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-spacing-block-end
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-spacing-inline-end
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-spacing-inline-start
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-shadow-selected
 * @type shadow
 * @default #1b96ff 4px 0 0 inset
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-text-color
 * @type color
 * @default #080707
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-text-color-disabled
 * @type color
 * @default #dddbda
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-text-font-size
 * @type font
 * @default 0.8125rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-text-font-style
 * @type font
 * @default normal
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-header-text-font-weight
 * @type font
 * @default 400
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-metatext-text-color
 * @type color
 * @default #3e3e3c
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-metatext-text-color-disabled
 * @type color
 * @default #dddbda
 */
/**
 * @memberof stylingHooks
 * @name --avonni-tree-item-metatext-line-clamp
 * @type number
 * @default 2
 */

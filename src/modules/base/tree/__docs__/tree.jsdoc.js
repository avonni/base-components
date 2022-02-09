/**
 * @typedef {object} TreeAction
 * @name actions
 * @property {boolean} alwaysVisible If true, the action is always visible. If false, the action will be displayed in a button menu. Defaults to false.
 * @property {string} iconName Required if <code>alwaysVisible</code> is true. The Lightning Design System name of the action icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} label Required. Label of the action. If <code>alwaysVisible</code> is true, the label will be used as alternative text.
 * @property {string} name Required. Unique name of the action.
 * Reserved action names are: <code>edit</code>, <code>add</code>, <code>duplicate</code> and <code>delete</code>. If a reserved action name is used, the standard action will be executed on top of the dispatch of the <code>actionclick</code> event. To prevent the default behavior of a reserved action, <code>preventDefault()</code> can be called on the <code>actionclick</code> event.
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
 * @property {object} avatar Avatar object. If present, the avatar is displayed to the left of the item.
 * @property {string} label Required. Label of the item.
 * @property {string} metatext Text to provide users with supplemental information and aid with identifiation or diambiguation.
 * @property {object[]} items Nested item objects.
 * @property {string} name Required. The unique name of the item. It will be returned by the <code>onselect</code> event handler.
 * @property {string} href If the item label should be a link, URL of the link.
 * Links are incompatible with inline edition and multi-select trees.
 * @property {boolean} expanded If true, the item branch is expanded. An expanded branch displays its nested items visually. Defaults to false.
 * @property {boolean} disabled If true, the item is disabled. A disabled item is grayed out and can't be focused. Defaults to false.
 * @property {boolean} isLoading If true, the item is expandable and displays a loading spinner instead of nested items.
 * @property {object[]} fields Array of output data objects. See <a href="/components/output-data/">Output Data</a> for valid keys. The fields are visible only when the item is expanded.
 */

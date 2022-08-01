/**
 * @typedef {Object} KanbanAction
 * @name actions
 * @property {string} label Required. Action label.
 * @property {string} name Required. Unique name of the action.
 * @property {string} iconName Lightning Design System name of the icon displayed after the action label.
 * Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {boolean} disabled If present, the action is disabled and users cannot interact with it. Defaults to false.
 */

/**
 * @typedef {Object} KanbanGroup
 * @name groups
 * @property {object[]} avatar Avatar object. The avatar is displayed to the left of the group label.
 * @property {string} backgroundColor Color of the group's background.
 * @property {string} pathColor Color of the path item when the variant is path.
 * @property {string} label Group label.
 * @property {string} value Unique value for the group.
 * @property {object[]} headerActions Array of actions to be displayed in the group header.
 * @property {object[]} footerActions Array of actions to be displayed in the group footer.
 * @property {boolean} showItemCount If true, displays the number of items contained bu the group in it's header.
 */

/**
 * @typedef {Object} KanbanField
 * @name fields
 * @property {string} fieldName Required. Unique name for the field, used as a key in the data objects.
 * @property {string} label Label of the field.
 * @property {string} type Required. The data type to be used for data formatting.
 * @property {object} typeAttributes Provides custom formatting with component attributes for the data type. For example, currency-code for the currency type.
 */

/**
 * @typedef {Object} Avatar
 * @name avatar
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src Image URL for the avatar of the group. If present, the avatar is displayed before the label.
 * @property {object} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. The value defaults to square.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-column-sizing-min-width
 * @default 14em
 * @type (length|percentage)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-column-sizing-max-width
 * @default 22.5em
 * @type (length|percentage)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-path-color-background
 * @default #014486
 * @type color
 */

/**
 * @memberof stylingHooks
 * @name --avonni-kanban-summarize-header-sizing-height
 * @default 3rem
 * @type (length|percentage)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-summarize-header-sizing-line-height
 * @default 2.5rem
 * @type (length|percentage)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-summary-text-color
 * @default #10AA52
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-summarize-font-size
 * @default 1.5rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-summarize-font-weight
 * @default 400
 * @type font
 */

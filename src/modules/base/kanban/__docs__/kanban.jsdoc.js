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
 * @property {string} backgroundColor Color of the group's background.
 * @property {string} label Group label.
 * @property {string} value Unique value for the group.
 * @property {object[]} headerActions Array of actions to be displayed in the group header.
 * @property {object[]} footerActions Array of actions to be displayed in the group footer.
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
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-column-sizing-min-width
 * @default 14.5em
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
 * @name --avonni-kanban-summary-color-text
 * @default #10AA52
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-summarize-font-size
 * @default 1.25rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-kanban-summarize-font-weight
 * @default 400
 * @type font
 */
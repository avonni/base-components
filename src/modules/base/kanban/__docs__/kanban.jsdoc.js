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
 * @property {string} label Group label.
 * @property {string} value Unique value for the group.
 */

/**
 * @typedef {Object} KanbanField
 * @name fields
 * @property {string} fieldName Required. Unique name for the field, used as a key in the data objects.
 * @property {string} label Label of the field.
 * @property {string} type Required. The data type to be used for data formatting.
 * @property {object} typeAttributes Provides custom formatting with component attributes for the data type. For example, currency-code for the currency type.
 */

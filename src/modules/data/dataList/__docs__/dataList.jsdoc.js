/**
 * Action added to the items of the list.
 * @typedef {Object} Action
 * @property {string}   label       - The action label.
 * @property {string}   name        - The name of the action, which identifies the selected action.
 * @property {string}   [iconName]  - The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean}  [disabled]  - Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 */
/**
 * Data displayed in each field in the popover.
 * @typedef {Object} Data
 * @property {...string} fields - The values corresponding to their fields.
 */
/**
 * Field displayed in the popover.
 * @typedef {Object} Field
 * @property {string} label - Label of the field.
 * @property {string} name  - The name that binds the fields attributes to the associated data. Each fields attribute must correspond to an item in the data array.
 * @property {string} type  - The data type of the field. Valid values include boolean, currency, date, email, location, number, percent, phone, url, text.
 */
/**
 * An item built for the List component.
 * @typedef {Object} ListItem
 * @property {string} label         - Label of the item.
 * @property {string} [description] - The description displayed under the label of the item.
 */

/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name base
 * @storyId example-data-list--base
 */
/**
 * @memberof examples
 * @name sortableDataList
 * @storyId example-data-list--sortable-data-list
 */
/**
 * @memberof examples
 * @name dataListWithActionsAndRightSidePopover
 * @storyId example-data-list--data-list-with-actions-and-right-side-popover
 */
/**
 * @memberof examples
 * @name dataListWithListActions
 * @storyId example-data-list--data-list-with-list-actions
 */

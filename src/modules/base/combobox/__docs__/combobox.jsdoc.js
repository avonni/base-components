/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name base
 * @storyId example-combobox--base
 */
/**
 * @memberof examples
 * @name disabled
 * @storyId example-combobox--disabled
 */
/**
 * @memberof examples
 * @name loading
 * @storyId example-combobox--loading
 */
/**
 * @memberof examples
 * @name multiSelect
 * @storyId example-combobox--multi-select
 */
/**
 * @memberof examples
 * @name grouped
 * @storyId example-combobox--grouped
 */
/**
 * @memberof examples
 * @name multiLevelGroups
 * @storyId example-combobox--multi-level-groups
 */
/**
 * @memberof examples
 * @name lookup
 * @storyId example-combobox--lookup
 */
/**
 * @memberof examples
 * @name scopes
 * @storyId example-combobox--scopes
 */
/**
 * @memberof examples
 * @name scopesWithIcons
 * @storyId example-combobox--scopes-with-icons
 */
/**
 * @memberof examples
 * @name customSearch
 * @storyId example-combobox--custom-search
 */

/**
 * @typedef Option
 * @name Options
 * @property {string} avatarFallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color.
 * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} avatarSrc Image URL for the option avatar.
 * @property {string[]} groups Array of group names this option belongs to.
 * @property {string} label Label of the option.
 * @property {object[]} options Array of option objects. If present:
 * * The icon utility:chevronright will be displayed to the right of the option to indicate it has children.
 * * The option is not selectable. On click on it, the children options will replace the current options in the drop-down.
 * @property {string} secondaryText Secondary text to display below the label.
 * @property {string} value Required. A unique value for the option.
 */

/**
 * @typedef Scope
 * @name Scopes
 * @property {string} iconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color.
 * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string[]} groups Array of group names this option belongs to.
 * @property {string} label Label of the option.
 * @property {string} value Required. A unique value for the scope. It will be returned by the scopeselect event.
 */

/**
 * @typedef Group
 * @name Groups
 * @property {string} label Label of the option.
 * @property {string} name Required. A unique name for the group. It will be used as a reference in the options.
 */

/**
 * @typedef Action
 * @name Actions
 * @property {string} label Required. The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action. It will be returned by the actionclick event.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 * @property {string} position Position of the action in the drop-down. Valid values include top and bottom. Defaults to top.
 */

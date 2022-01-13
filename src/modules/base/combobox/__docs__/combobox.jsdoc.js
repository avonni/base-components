/**
 * @typedef {Object} ComboboxOption
 * @name options
 * @property {string} avatarFallbackIconName The Lightning Design System name of the icon used as a fallback when the option avatar image fails to load. Specify the name in the format 'utility:user' where 'utility' is the category, and 'user' is the specific icon to be displayed.
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
 * @typedef {Object} ComboboxScope
 * @name scopes
 * @property {string} iconName The Lightning Design System name of the icon displayed to the left of the label. Specify the name in the format 'utility:chevronright' where 'utility' is the category, and 'chevronright' is the specific icon to be displayed.
 * @property {string[]} groups Array of group names this scope belongs to.
 * @property {string} label Label of the scope.
 * @property {string} value Required. A unique value for the scope. It will be returned by the <code>scopeselect</code> event.
 */

/**
 * @typedef {Object} ComboboxGroup
 * @name groups
 * @property {string} label Label of the option.
 * @property {string} name Required. A unique name for the group. It will be used as a reference in the options.
 */

/**
 * @typedef {Object} ComboboxAction
 * @name actions
 * @property {string} label Required. The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action. It will be returned by the <code>actionclick</code> event.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 * @property {string} position Position of the action in the drop-down. Valid values include top and bottom. Defaults to top.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-option-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-option-color-background-hover
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-label-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-label-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-label-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-radius-border-bottom-left
 * @default 0.25rem
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-radius-border-bottom-right
 * @default 0.25rem
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-radius-border-top-left
 * @default 0.25rem
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-radius-border-top-right
 * @default 0.25rem
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-sizing-border-bottom
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-sizing-border-left
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-sizing-border-right
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-sizing-border-top
 * @default 1px
 * @type sizing
 */

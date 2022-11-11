/**
 * @typedef {Object} ComboboxOption
 * @name options
 * @property {object} avatar An object with item fields to be rendered as an avatar.
 * @property {boolean} isLoading If true, the option will be considered having nested options. On click, the back action and a spinner will appear.
 * @property {string} label Label of the option.
 * @property {object[]} options Array of option objects. If present:
 * * The icon utility:chevronright will be displayed to the right of the option to indicate it has children.
 * * The option is not selectable. On click on it, the children options will replace the current options in the drop-down, and the `levelchange`event will be dispatched.
 * @property {string} secondaryText Secondary text to display below the label.
 * @property {string} value Required. A unique value for the option.
 */

/**
 * @typedef {Object} ComboboxAvatar
 * @name avatar
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the option avatar image fails to load. Specify the name in the format 'utility:user' where 'utility' is the category, and 'user' is the specific icon to be displayed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} presence Presence of the user to display. Valid values include online, busy, focus, offline, blocked and away.
 * @property {string} presencePosition Position of the presence icon. Valid values include top-left, top-right, bottom-left and bottom-right. Default value is bottom-right.
 * @property {string} src Image URL for the option avatar.
 * @property {string} variant The variant changes the shape of the avatar. Accepted variants include circle, square, and empty. This value defaults to square.
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
 * @property {boolean} fixed If true, the action will always be visible, no matter the scroll position in the dropdown. Defaults to false.
 * @property {string} label Required. The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action. It will be returned by the <code>actionclick</code> event.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. Defaults to false.
 * @property {string} position Position of the action in the drop-down. Valid values include top and bottom. Defaults to top.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-action-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-action-color-background-hover
 * @default #f3f2f2
 * @type color
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
 * @name --avonni-combobox-input-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-styling-border
 * @default solid
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-combobox-input-sizing-border
 * @default 1px
 * @type dimension
 */

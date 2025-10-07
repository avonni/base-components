/**
 * @typedef {Object} Option
 * @name options
 * @property {string} alternativeText Alternative text of the option.
 * @property {string} color CSS color value. If present, the checkbox, radio button or button will take this color.
 * @property {boolean} disabled If present, the option is disabled and it is not possible to select it.
 * @property {string} label Label of the option.
 * @property {boolean} hideLabel If present, the label of the option is hidden.
 * @property {boolean} hidden If present, the option is not visible.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the header label.
 * @property {string} iconPosition The position of the icon with respect to the label. Valid options include left, right, top and bottom. This value defaults to left.
 * @property {string} tooltip Text visible when the option is hovered or focused.
 * @property {string} value Value of the option.
 */
/**
 * @typedef {Object} TypeAttributes
 * @name typeAttributes
 * @property {string} checkmarkPosition Describes the position of the checkmark for button and toggle when showCheckmark is present. Valid values include left and right.
 * @property {boolean} displayAsRow If present, display buttons as row.
 * @property {string} messageToggleActive Text shown for the active state of a toggle.
 * @property {string} messageToggleInactive Text shown for the inactive state of a toggle.
 * @property {boolean} showCheckmark If present, show checkmark on button or toggle when selected.
 * @property {string} size The size of the input toggle. Valid values include x-small, small, medium and large.
 * @property {boolean} stretch If present, vertical or horizontal button groups stretch to full width.
 */
/**
 * @typedef {Object} OrientationAttributes
 * @name orientationAttributes
 * @property {string|number} cols Default number of columns on smallest container widths. Valid values include 1, 2, 3, 4, 6 and 12.
 * @property {string|number} largeContainerCols Number of columns on small container widths. Width is greater or equal to 1024px. See `cols` for accepted values.
 * @property {string|number} mediumContainerCols Number of columns on small container widths. Width is greater or equal to 768px. See `cols` for accepted values.
 * @property {string|number} smallContainerCols Number of columns on small container widths. Width is greater or equal to 480px. See `cols` for accepted values.
 *  * @property {string|number} multipleRows If present, checks wrap to the following line when they exceed the layout width.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-header-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-header-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-header-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-header-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-background-checked
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-background-checked-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-background-hover
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-border-checked
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-border-checked-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-color-border-hover
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-sizing-border
 * @default 1px
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-styling-border
 * @default solid
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-radius-border
 * @default 0.25rem
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-label-text-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-label-text-color-checked
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-label-text-color-checked-hover
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-label-text-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-label-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-button-label-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-checkbox-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-checkbox-color-background-checked
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-checkbox-color-foreground
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-checkbox-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-checkbox-color-border-checked
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-checkbox-radius-border
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-label-text-color
 * @default #444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-label-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-label-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-label-line-clamp
 * @default 1
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-background
 * @default #aeaeae
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-background-checked
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-background-checked-focus
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-background-checked-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-background-hover
 * @default #939393
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-border
 * @default #aeaeae
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-border-checked
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-border-hover
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-color-foreground
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-switch-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-switch-color-background-checked
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-input-choice-set-option-toggle-radius-border
 * @default 15rem
 * @type radius
 */

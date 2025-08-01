/**
 * @typedef {Object} ActivityTimelineAction
 * @name actions
 * @property {boolean} disabled Specifies whether the action can be selected. If present, the action item is shown as disabled. Defaults to false.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {string} label Required. Action label.
 * @property {string} name Required. Unique name for the action.
 */

/**
 * @typedef {Object} ActivityTimelineItem
 * @name items
 * @property {string[]} actions Array of action objects.
 * @property {object} avatar Avatar object.
 * @property {boolean} buttonDisabled If present, the button is disabled. Defaults to false.
 * @property {string} buttonIconName The Lightning Design System name of the button icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} buttonIconPosition Describes the position of the icon with respect to the button label. Options include left and right. Defaults to left.
 * @property {string} buttonLabel Label of the button displayed below the details.
 * @property {string} buttonVariant The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success. Defaults to neutral.
 * @property {boolean} checked If present and `hasCheckbox` is true, the checkbox will be checked. Defaults to false.
 * @property {boolean} closed If present, the item is closed by default.
 * @property {string} dateFormat The date format to use for the item. See Luxon's documentation for accepted format. If you want to insert text in the label, you need to escape it using single quote. For example, the format of “Jan 14 day shift” would be “LLL dd 'day shift'".
 * @property {(Date|number|string)} datetimeValue Date/time value of the item. It can be a Date object, a timestamp, or an ISO8601 formatted string.
 * @property {string} description Description of the item, displayed under the title.
 * @property {boolean} endDateValue Specifies the value of the end date input, which can be a Date object, timestamp, or an ISO8601 formatted string.
 * @property {object} fieldAttributes Object that defines the layout of the fields. The object contains the following properties: cols, smallContainerCols, mediumContainerCols, largeContainerCols and variant.
 * @property {object[]} fields Array of output data objects. See <a href="/components/output-data">Output Data</a> for valid keys. The fields are displayed in the details section.
 * @property {boolean} hasCheckbox If present, a checkbox is displayed before the label. Defaults to false.
 * @property {boolean} hasError If present, display an error message in the details section. Defaults to false.
 * @property {boolean} hideVerticalBar If present, the vertical bar is hidden. Defaults to false.
 * @property {string} href URL to use as a link for the title.
 * @property {string} iconName (Deprecated) Use `avatar` instead. The Lightning Design System name of the icon displayed in the item header, before the title. Specify the name in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
 * @property {string} iconSize The size of the item's icon. Valid values are xx-small, x-small, small, medium and large. Defaults to small.
 * @property {string[]} icons Array of icon names to display after the title.
 * @property {boolean} isActive If present, and the item has no icon, a blue circle will replace the default gray bullet. Defaults to false.
 * @property {boolean} isLoading If present, the detail section is in a loading state and shows a spinner. Defaults to false.
 * @property {string} loadingStateAlternativeText Message displayed while the detail section is in the loading state. Defaults to "Loading...".
 * @property {string} name Required. Unique name of the item.
 * @property {string} timezone Time zone used, in a valid IANA format. If empty, the browser's time zone is used.
 * @property {string} title Title of the item, displayed in the item header.
 */
/**
 * @typedef {Object} FieldAttributes
 * @name fieldAttributes
 * @property {string|number} cols Default number of columns on smallest container widths. Valid values include 1, 2, 3, 4, 6 and 12.
 * @property {string|number} largeContainerCols Number of columns on small container widths. Width is greater or equal to 1024px. See `cols` for accepted values.
 * @property {string|number} mediumContainerCols Number of columns on small container widths. Width is greater or equal to 768px. See `cols` for accepted values.
 * @property {string|number} smallContainerCols Number of columns on small container widths. Width is greater or equal to 480px. See `cols` for accepted values.
 * @property {string} variant The variant changes the appearance of the field. Accepted variants include standard, label-inline, label-hidden, and label-stacked.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-icon-radius-border
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-icon-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-icon-color-background-complete
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-icon-color-foreground
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-icon-color-foreground-default
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-title-text-color
 * @type color
 * @default #080707
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-title-font-size
 * @type font
 * @default 1em
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-title-font-style
 * @type font
 * @default normal
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-title-font-weight
 * @type font
 * @default 400
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-item-fields-color-background
 * @type color
 * @default #f3f3f3 for vertical, none for horizontal
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-item-fields-radius-border
 * @type sizing
 * @default 0.25rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-item-fields-color-border
 * @type color
 * @default #c9c9c9
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-item-fields-sizing-border
 * @type dimension
 * @default 1px
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-item-fields-styling-border
 * @type string
 * @default solid for vertical, none for horizontal
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-item-fields-spacing-block
 * @type dimension
 * @default 1rem for vertical, 0.75rem for horizontal
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-item-fields-spacing-inline
 * @type dimension
 * @default 1rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-spacing-block-end
 * @default 0
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-spacing-block-start
 * @default 0
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-spacing-inline-end
 * @default 1rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-spacing-inline-start
 * @default 1rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-color-background-active
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-color-background-hover
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-color-border
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-color-border-active
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-color-border-hover
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-text-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-text-color-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-text-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-activity-timeline-show-more-button-neutral-sizing-border
 * @default 1px
 * @type sizing
 */

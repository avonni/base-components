/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-date-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-date-disabled-text-color
 * @default #adadad
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-weekdays-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-month-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-today-color-background
 * @default #ecebea
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-today-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-date-color-background-hover
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-selected-date-color-background
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-selected-date-text-color
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-multi-selected-color-border-hover
 * @default #d3d3d39a
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-multi-selected-styling-border-hover
 * @default dashed
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-week-label-text-color
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-week-label-font-size
 * @default 0.8125em
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-calendar-week-label-font-weight
 * @default 600
 * @type font
 */

/**
 * @typedef {Object} MarkedDate
 * @name markedDates
 * @property {string} date The value of the marked date, which can be a Date object, a timestamp, or an ISO8601 formatted string.
 * @property {string} color Color of the marker. Defaults to #bf0201.
 */

/**
 * @typedef {Object} DateLabel
 * @name dateLabels
 * @property {string} date The value of the marked date, which can be a Date object, a timestamp, or an ISO8601 formatted string.
 * To prioritize a date label, place it toward the end of the array.
 * @property {string} label The date label text.
 * @property {string} variant A chip variant. Default is base and accepted variants are base, brand, inverse, alt-inverse, success, info, warning, error, offline.
 * @property {boolean} outline If true, display a border around the label.
 * @property {string} iconName The Lightning Design System name of the icon to be displayed inside the label.
 * Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} iconPosition The side on which the icon is displayed. Default is left and accepted values are left and right.
 * @property {string} iconVariant The color scheme for the icon. Accepted variants include inverse, success, warning, and error.
 */

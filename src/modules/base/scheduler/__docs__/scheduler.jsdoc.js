/**
 * @typedef {Object} SchedulerAction
 * @name actions
 * @property {string} name Name of the action clicked.
 * @property {string} label Label of the action.
 * @property {string} iconName Name of the icon to display before the action label.
 * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
 */

/**
 * @typedef {Object} SchedulerHeader
 * @name headers
 * @property {string} unit The date/time unit of this header. Valid values include year, month, week, day, hour and minute.
 * @property {number} span The number of units in one column of this header. For example, if the unit is ‘hour’ and the span is '2', one column of this header will contain two hours.
 * @property {number} label The header label. See <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">Luxon’s documentation</a> for accepted format. If you want to insert text in the label, you need to escape it using single quote.
 * For example, the format of “Jan 14 day shift” would be “LLL dd 'day shift'".
 */

/**
 * @typedef {Object} SchedulerEvent
 * @name events
 * @property {string[]} keyFields Required. Array of unique row IDs. The event will be shown in the scheduler for each of these rows.
 * @property {string} name Required. Unique name for the event. It will be returned by the <code>eventclick</code> and <code>actionclick</code> events.
 * @property {string} title Title of the event.
 * @property {(Date|number|string)} from Required. Start of the event. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @property {(Date|number|string)} to Required if <code>allDay</code> is not true. End of the event. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @property {boolean} allDay If true, the event will be applied to the whole day(s). Defaults to false.
 * @property {string} recurrence Recurrence of the event (see Recurrence table).
 * @property {(Date|number|string)} recurrenceEndDate End of the recurrence. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * If a <code>recurrenceCount</code> is also given, the earliest ending date will be used.
 * @property {number} recurrenceCount Number of times the event will be repeated before the recurrence stops.
 * If a <code>recurrenceEndDate</code> is also given, the earliest ending date will be used.
 * @property {object} recurrenceAttributes Attributes specific to the recurrence type (see Recurrence attributes table).
 * @property {string} color Custom color for the event. If present, it will overwrite the default color.
 * It has to be a Hexadecimal or an RGB color. For example <code>#3A7D44</code> or <code>rgb(58, 125, 68)</code>.
 * @property {string} theme Custom theme for the event. If present, it will overwrite the default event theme. Valid values include default, transparent, line, hollow and rounded.
 * @property {object} labels Custom labels for the event. If present, it will overwrite the default event labels.
 */

/**
 * @typedef {Object} SchedulerDisabledDatesTimes
 * @name disabledDates/times
 * @property {string[]} keyFields Required. Array of unique row IDs. The disabled dates/times will be shown in the scheduler for each of these rows.
 * @property {string} title Title of the disabled date/time.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format utility:user. The icon is appended to the left of the title.
 * @property {(Date|number|string)} from Required. Start of the disabled date/time. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @property {(Date|number|string)} to Required if <code>allDay</code> is not true. End of the disabled date/time. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @property {boolean} allDay If true, the event will be applied to the whole day(s). Defaults to false.
 * @property {string} recurrence Recurrence of the event (see Recurrence table).
 * @property {(Date|number|string)} recurrenceEndDate End of the recurrence. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * If a <code>recurrenceCount</code> is also given, the earliest ending date will be used.
 * @property {number} recurrenceCount Number of times the disabled date/time will be repeated before the recurrence stops.
 * If a <code>recurrenceEndDate</code> is also given, the earliest ending date will be used.
 * @property {object} recurrenceAttributes Attributes specific to the recurrence type (see Recurrence attributes table).
 */

/**
 * @typedef {Object} SchedulerLabel
 * @name labels
 * @property {string} fieldName Name of a row key or an event key. The value corresponding to this key in the object will be used as the label.
 * If both the event and the row have a field with this name, the event field will be used.
 */

/**
 * @typedef {Object} SchedulerReferenceLine
 * @name referenceLines
 * @property {string} label Label displayed on the reference badge.
 * @property {(Date|number|string)} date Date of the badge. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * Defaults to the current date and time.
 * @property {string} variant Variant of the reference line. Valid values include default, inverse, success, warning, error and lightest. Defaults to default.
 * @property {string} recurrence Recurrence of the reference line (see Recurrence table).
 * @property {(Date|number|string)} recurrenceEndDate End of the recurrence. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * If a <code>recurrenceCount</code> is also given, the earliest ending date will be used.
 * @property {number} recurrenceCount Number of times the reference line will be repeated before the recurrence stops.
 * If a <code>recurrenceEndDate</code> is also given, the earliest ending date will be used.
 * @property {object} recurrenceAttributes Attributes specific to the recurrence type (see Recurrence attributes table).
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-scheduler-datatable-column-width
 * @default 300px
 * @type width
 */

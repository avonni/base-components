/**
 * @typedef {Object} SchedulerAction
 * @name actions
 * @property {string} iconName Name of the icon to display before the action label.
 * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
 * @property {string} label Label of the action.
 * @property {string} name Name of the action clicked. Default action names are `Standard.Scheduler.AddEvent`, `Standard.Scheduler.EditEvent` and `Standard.Scheduler.DeleteEvent`.
 */

/**
 * @typedef {Object} SchedulerDisabledDatesTimes
 * @name disabledDates/times
 * @property {boolean} allDay If true, the event will be applied to the whole day(s). Defaults to false.
 * @property {(Date|number|string)} from Required. Start of the disabled date/time. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format utility:user. The icon is appended to the left of the title.
 * @property {string} recurrence Recurrence of the event (see **Recurrence** table).
 * @property {object} recurrenceAttributes Attributes specific to the recurrence type (see **Recurrence** table).
 * @property {number} recurrenceCount Number of times the disabled date/time will be repeated before the recurrence stops. If a `recurrenceEndDate` is also given, the earliest ending date will be used.
 * @property {(Date|number|string)} recurrenceEndDate End of the recurrence. It can be a Date object, timestamp, or an ISO8601 formatted string. If a `recurrenceCount` is also given, the earliest ending date will be used.
 * @property {string[]} resourceNames Required. Array of unique resource names. The disabled dates/times will be shown in the scheduler for each of these resources.
 * @property {string} title Title of the disabled date/time.
 * @property {(Date|number|string)} to Required if `allDay` is not true. End of the disabled date/time. It can be a Date object, timestamp, or an ISO8601 formatted string.
 */

/**
 * @typedef {Object} SchedulerEvent
 * @name events
 * @property {boolean} allDay If true, the event will be applied to the whole day(s). Defaults to false.
 * @property {string} color Custom color for the event. If present, it will overwrite the default color.
 * It has to be a Hexadecimal or an RGB color. For example `#3A7D44` or `rgb(58, 125, 68)`.
 * @property {(Date|number|string)} from Required. Start of the event. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * @property {object} labels Custom labels for the event. If present, it will overwrite the default `event-labels`.
 * @property {string} name Required. Unique name for the event.
 * @property {string} recurrence Recurrence of the event (see **Recurrence** table).
 * @property {object} recurrenceAttributes Attributes specific to the recurrence type (see **Recurrence** table).
 * @property {number} recurrenceCount Number of times the event will be repeated before the recurrence stops. If a `recurrenceEndDate` is also given, the earliest ending date will be used.
 * @property {(Date|number|string)} recurrenceEndDate End of the recurrence. It can be a Date object, timestamp, or an ISO8601 formatted string. If a `recurrenceCount` is also given, the earliest ending date will be used.
 * @property {string[]} resourceNames Required. Array of unique resource names. The event will be shown in the scheduler for each of these resources.
 * @property {string} theme Custom theme for the event. If present, it will overwrite the default event theme. Valid values include default, transparent, line, hollow and rounded.
 * @property {string} title Title of the event.
 * @property {(Date|number|string)} to Required if `allDay` is not true. End of the event. It can be a Date object, timestamp, or an ISO8601 formatted string.
 */

/**
 * @typedef {Object} SchedulerHeader
 * @name headers
 * @property {number} label Required. The header label. See <a href="https://moment.github.io/luxon/#/formatting?id=table-of-tokens">Luxon’s documentation</a> for accepted format. If you want to insert text in the label, you need to escape it using single quotes.
 * For example, the format of “Jan 14 day shift” would be “LLL dd 'day shift'".
 * @property {number} span Required. The number of units in one section of this header. For example, if the unit is "hour" and the span is 2, one section of this header will contain two hours.
 * @property {string} unit Required. The date/time unit of this header. Valid values include year, month, week, day, hour and minute.
 */

/**
 * @typedef {Object} SchedulerLabel
 * @name labels
 * @property {string} fieldName Name of a resource key or an event key. The value corresponding to this key in the object will be used as the label.
 * If both the event and the resource have a field with this name, the event field will be used.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format utility:user. The icon is appended to the left of the label.
 * @property {string} value Custom value to use for the label. If a `fieldName` is also present, it will overwrite it.
 */

/**
 * @typedef {Object} SchedulerReferenceLine
 * @name referenceLines
 * @property {string} label Label displayed on the reference badge.
 * @property {(Date|number|string)} date Date of the badge. It can be a Date object, timestamp, or an ISO8601 formatted string.
 * Defaults to the current date and time.
 * @property {string} recurrence Recurrence of the reference line (see **Recurrence** table).
 * @property {object} recurrenceAttributes Attributes specific to the recurrence type (see **Recurrence** table).
 * @property {number} recurrenceCount Number of times the reference line will be repeated before the recurrence stops. If a `recurrenceEndDate` is also given, the earliest ending date will be used.
 * @property {(Date|number|string)} recurrenceEndDate End of the recurrence. It can be a Date object, timestamp, or an ISO8601 formatted string. If a `recurrenceCount` is also given, the earliest ending date will be used.
 * @property {string} variant Variant of the reference line. Valid values include default, inverse, success, warning, error and lightest. Defaults to default.
 */

/**
 * @typedef {object} SchedulerResource
 * @name resources
 * @property {string} avatarFallbackIconName The Lightning Design System name of the icon used as a fallback when the avatar image fails to load.
 * Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} avatarInitials Initials to display in place of the avatar image, if it fails to load.
 * If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} avatarSrc Image URL to use as the resource avatar.
 * @property {string} label Label of the resource.
 * @property {string} name Required. Unique name of the resource.
 */

/**
 * @typedef {object} SchedulerTimeSpan
 * @name timeSpans
 * @property {object[]} customHeaders Only used by the timeline display. Array of header objects. If both present, it will overwrite the `headers`.
 * @property {string} headers Only used by the timeline display. Name of the header preset, that will determine the precision of the timeline. Valid values include:
 * * minuteAndHour
 * * minuteHourAndDay
 * * hourAndDay
 * * hourDayAndWeek
 * * dayAndWeek
 * * dayAndMonth
 * * dayLetterAndWeek
 * * dayWeekAndMonth
 * * weekAndMonth
 * * weekMonthAndYear
 * * monthAndYear
 * * quartersAndYear
 * * fiveYears
 * Defaults to hourAndDay.
 * @property {string} label Label of the time span.
 * @property {string} name Required. Unique name of the time span.
 * @property {number} span The number of unit the scheduler will show. Defaults to 1.
 * @property {string} unit Unit of this time span. Valid values include minute, hour, day, week, month and year. Defaults to day.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-scheduler-toolbar-color-background
 * @default #ffffff
 * @type color
 */

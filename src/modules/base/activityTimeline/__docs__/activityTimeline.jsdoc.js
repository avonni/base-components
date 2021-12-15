/**
 * @typedef {Object} ActivityTimelineAction
 * @name actions
 * @property {string} label Required. The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If present, the action item is shown as disabled. Defaults to false.
 */

/**
* @typedef {Object} ActivityTimelineItem
* @name items
* @property {string} title Title of the item, displayed in the item header.
* @property {string} description Description of the item, displayed under the title.
* @property {(Date|number|string)} datetimeValue Date/time value of the item. It can be a Date object, a timestamp, or an ISO8601 formatted string.
* @property {string} href URL to use as a link for the title.
* @property {string} iconName The Lightning Design System name of the icon displayed in the item header, before the title. Specify the name in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
* @property {string[]} icons Array of icon names to display after the title.
* @property {object[]} fields Array of output data objects. See <a href="/components/output-data">Output Data</a> for valid keys. The fields are displayed in the details section.
* @property {boolean} hasCheckbox If present, a checkbox is displayed before the label. Defaults to false.
* @property {boolean} hasError If present, display an error message in the details section. Defaults to false.
* @property {boolean} isLoading If present, the detail section is in a loading state and shows a spinner. Defaults to false.
* @property {string} loadingStateAlternativeText Message displayed while the detail section is in the loading state. Defaults to "Loading".
* @property {boolean} closed If present, close the section.
* @property {string} buttonLabel Name of the button displayed below the details.
* @property {string} buttonIconName The Lightning Design System name of the button icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
* @property {string} buttonIconPosition Describes the position of the icon with respect to the button label. Options include left and right. Defaults to left.
* @property {string} buttonVariant The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success. Defaults to neutral.
* @property {boolean} buttonDisabled If present, the button is disabled. Defaults to false.
*/

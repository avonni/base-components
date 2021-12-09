/**
 * @typedef {Object} ProgressIndicatorSteps
 * @name step
 * @property {string} assistiveText Description of the step for screen-readers.
 * @property {string} label Text label to title the step.
 * @property {string} labelPosition Valid values include top and bottom.
 * @property {string} description Text description to describe the step.
 * @property {string} descriptionPosition Valid values include top and bottom.
 * @property {string} value Text to name the step.
 * @property {string} buttonLabel The text to be displayed inside the button.
 * @property {string} buttonName The name for the button element. This value is optional and can be used to identify the button in a callback.
 * @property {string} buttonIconName The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} buttonIconPosition Describes the position of the icon with respect to the button label. Options include left and right. This value defaults to left.
 * @property {boolean} buttonDisabled If true, the button is disabled.
 * @property {string} buttonTitle The title of the button.
 * @property {string} buttonVariant The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success. This value defaults to neutral.
 * @property {string} popoverVariant Valid values include base and button. Default to base.
 * @property {string} popoverIconName The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} popoverIconSrc The URL for the icon.
 * @property {string} popoverIconNameWhenHover The Lightning Design System name of the icon displayed on hover. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} popoverIconSrcWhenHover The URL for the icon displayed on hover.
 * @property {string} popoverSize Valid values include small, medium and large. Default to medium.
 * @property {string} popoverRatio Valid values include 1-by-1, 4-by-3 and 16-by-9. Default to 1-by-1.
 * @property {string} popoverLabel Text label to title the popover.
 * @property {string} popoverDescription Text description to describe the popover.
 * @property {string} popoverHidden If true, the popover is displayed only when the progress-step receives focus. Default to false.
 */
/**
 * @namespace stylingHooks
 */
/**
 * Background color of the popover.
 *
 * @memberof stylingHooks
 * @name --avonni-progress-indicator-step-color-background
 * @type {color}
 */

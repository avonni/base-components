/**
* @typedef {Object} PathStep
* @name steps
* @property {string} name Required. A unique name for the step. It will be returned by the <code>onchange</code>, <code>oncomplete</code> and <code>onactionclick</code> event handlers.
* @property {string} label Label of the step that will be displayed in the path.
* @property {string} tooltip The tooltip appears on hover on the step.
* @property {string} guidance Text of the guidance section.
* @property {boolean} hideDefaultActions If true, hide the default actions for this step.
* @property {boolean} showConfetti If true, confetti will be displayed when the step is completed.
* @property {string} confettiFrequency Frequency of the confetti, if used. Valid values include rarely, sometimes, often and always. Defaults to sometimes.
* @property {object[]} keyFields Array of output data objects (see <a href="/components/output-data">Output Data</a> for valid keys).
* @property {object[]} actions Array of actions.
* @property {object[]} completedOptions Array of completed option objects.
** If no completed option is passed, the base variant will be used.
** If only one completed option is passed, it will be used by default when a step is marked as complete. 
** If more than one completed option is passed, a dialog will open to let the user pick the completion status of the step.
*/

/**
* @typedef {Object} PathAction
* @name actions
* @property {string} name Required. A unique name for the action. It will be returned by the <code>onactionclick</code> event handler.
* @property {string} label The action label.
* @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. 
* If there is a label, the icon is appended to the left of it.
* @property {boolean} disabled If true, the action is shown as disabled. Defaults to false.
*/

/**
* @typedef {Object} PathCompletedOption
* @name completedOptions
* @property {string} label Required. Option label.
* @property {string} value Required. A unique value for this option.
* @property {string} variant The variant will impact the look of the path when the option is picked. Valid values include base, success, error, warning and offline.
*/

/**
* @typedef {Object} Item
* @name items
* @property {string} id Required. Unique id for the item.
* @property {string} title Primary string that will be used as the heading. 
* @property {string} description Secondary string that is used to describe the item.
* @property {object[]} infos List of additional information to display. Fields: [ label: string, href: string ].
* @property {string} imageAssistiveText Image alt text, if not present the heading will be used instead.
* @property {string} href Item link.
* @property {string} src URL of the item image.
* @property {object[]} actions Array of action objects for the item.
*/
/**
* @typedef {Object} Action
* @name actions
* @property {string} label Action label.
* @property {string} name Required.  Unique name of the action. It will be returned by the actionclick event.
* @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
* @property {boolean} disabled If present, the action item is shown as disabled. Defaults to false.
*/

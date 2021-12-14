/**
 * @typedef {Object} Menu
 * @name menus
 * @property {string} name Required. A unique name for the menu. It will be returned by the onselect event handler.
 * @property {string} accessKey The keyboard shortcut for the button menu (horizontal variant) or the checkbox group (vertical variant).
 * @property {string} alternativeText The assistive text for the button menu. This attribute isn’t supported for the vertical variant. Defaults to "Show menu".
 * @property {boolean} disabled If true, the menu cannot be used by users. Defaults to false.
 * @property {string} label Label of the menu.
 * @property {string} iconName The name of the icon to be used in the format 'utility:down'. Defaults to utility:down for horizontal variant
 * For the horizontal variant, if an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon. This value defaults to utility:down.
 * @property {string} iconSize The size of the icon. Options include xx-small, x-small, small, medium or large. Defaults to medium.
 * @property {boolean} isLoading If true, the menu is in a loading state and shows a spinner. Defaults to false.
 * @property {string} loadingStateAlternativeText Message displayed while the menu is in the loading state. Defaults to "Loading".
 * @property {string} title Title of the button (horizontal variant) or the label (vertical variant).
 * @property {string} tooltip The tooltip is displayed on hover or focus on the button (horizontal variant), or on the help icon (vertical variant).
 * @property {string[]} value Array of selected items’ values.
 * @property {string} buttonVariant The button variant changes the look of the horizontal variant’s button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse. This attribute isn’t supported for the vertical variant. Defaults to 'border'.
 * @property {string} searchInputPlaceholder Text displayed when the search input is empty, to prompt the user for a valid entry. Defaults to "Search...".
 * @property {boolean} showSearchBox If true, the search box is visible. Defaults to false.
 * @property {string} dropdownAlignment Determines the alignment of the dropdown menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space. Defaults to left.
 * This attribute isn’t supported for the vertical variant.
 * @property {string} dropdownWidth Minimum width of the dropdown menu. Valid values include xx-small, x-small, small, medium and large. Defaults to small.
 * This attribute isn’t supported for the vertical variant.
 * @property {string} dropdownLength Maximum length of the dropdown menu. Valid values include 5-items, 7-items and 10-items.
 * This attribute isn’t supported for the vertical variant. Defaults to 7-items.
 * @property {boolean} dropdownNubbin If true, a nubbin is present on the dropdown menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.
 * This attribute isn’t supported for the vertical variant. Defaults to false.
 * @property {object[]} items Array of item objects.
 * @property {boolean} isMultiSelect If present, multiple items can be selected.
 */
/**
 * @typedef {Object} Item
 * @name items
 * @property {string} label The item label.
 * @property {string} value Required. A value associated with the item. It will be returned by the onselect event handler.
 * @property {boolean} disabled If true, the item is disabled and users cannot interact with it. Defaults to false.
 * @property {string} iconName The name of an icon to display after the text of the item. This attribute isn’t supported for the vertical variant.
 * @property {string} prefixIconName The name of an icon to display before the text of the item. This attribute isn’t supported for the vertical variant.
 */

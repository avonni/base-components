/**
 * @typedef {Object} FilterMenuGroupMenu
 * @name menus
 * @property {string} accessKey The keyboard shortcut for the button menu (horizontal variant) or the checkbox group (vertical variant).
 * @property {string} alternativeText The assistive text for the button menu.
 * This property isn’t supported for the vertical variant.
 * @property {string} buttonVariant The button variant changes the look of the horizontal variant’s button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse.
 * This key isn’t supported for the vertical variant.
 * @property {boolean} disabled If true, the menu cannot be used by users. Defaults to false.
 * @property {string} dropdownAlignment Alignment of the dropdown menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space. Defaults to left.
 * This key isn’t supported for the vertical variant.
 * @property {boolean} dropdownNubbin If true, a nubbin is present on the dropdown menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment. Defaults to false.
 * This key isn’t supported for the vertical variant.
 * @property {string} iconName The name of the icon to be used in the format 'utility:down'. For the horizontal variant, if an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon.
 * @property {string} iconSize Size of the icon. Options include xx-small, x-small, small, medium or large. Defaults to medium.
 * @property {boolean} isLoading If true, the menu is in a loading state and shows a spinner. Defaults to false.
 * @property {string} label Label of the menu.
 * @property {string} loadingStateAlternativeText Message displayed while the menu is in the loading state. Defaults to "Loading".
 * @property {string} name Required. A unique name for the menu.
 * @property {string} title Title of the button (horizontal variant) or the label (vertical variant).
 * @property {string} tooltip The tooltip is displayed on hover or focus on the button (horizontal variant), or on the help icon (vertical variant).
 * @property {string} type Type of the filter menu. Valid values include date-range, list and range. Defaults to list.
 * @property {object} typeAttributes Attributes specific to the type (see **Types and Type Attributes** in <a href="/components/filter-menu">Filter Menu</a>).
 */

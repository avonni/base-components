/**
 * @typedef {Object} Item
 * @name items
 * @property {string} id Required. The id of the carousel item.
 * @property {string} title Primary string that will be used as the heading.
 * @property {string} description Secondary string that is used to describe the item.
 * @property {string} title Primary string that will be used as the heading.
 * @property {object[]} infos List of additional information to display. Fields: [ label: string, href: string ].
 * @property {string} imageAssistiveText Image alt text, if not present heading will be used instead.
 * @property {string} href Used for item link, if not provided 'javascript:void(0);' is used instead.
 * @property {string} src Item image src value.
 * @property {object[]} actions A list of different actions.
 */
/**
 * @typedef {Object} Action
 * @name actions
 * @property {string} label The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 */
/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-color-background
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-color-background-hover
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-color-border
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-color-border-hover
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-shaded-color-background
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-shaded-color-background-hover
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-shaded-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-active-indicator-shaded-color-border-hover
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-color-background-hover
 * @default #fafaf9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-color-border-hover
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-shaded-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-shaded-color-background-hover
 * @default #fafaf9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-shaded-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-shaded-color-border-hover
 * @default #dddbda
 * @type color
 */

/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name base
 * @storyId example-carousel--base
 */
/**
 * @memberof examples
 * @name baseWithNoProgressIndicator
 * @storyId example-carousel--base-with-no-progress-indicator
 */
/**
 * @memberof examples
 * @name baseWithTwoItemsPerPanel
 * @storyId example-carousel--base-with-two-items-per-panel
 */
/**
 * @memberof examples
 * @name baseWithThreeItemsPerPanelAndVariantShaded
 * @storyId example-carousel--base-with-three-items-per-panel-and-variant-shaded
 */
/**
 * @memberof examples
 * @name baseWithFiveItemsPerPanel
 * @storyId example-carousel--base-with-five-items-per-panel
 */
/**
 * @memberof examples
 * @name withoutPanelNavigation
 * @storyId example-carousel--without-panel-navigation
 */
/**
 * @memberof examples
 * @name withoutPanelNavigationWithTwoItemsPerPanel
 * @storyId example-carousel--without-panel-navigation-with-two-items-per-panel
 */
/**
 * @memberof examples
 * @name withoutPanelNavigationWithThreeItemsPerPanel
 * @storyId example-carousel--without-panel-navigation-with-three-items-per-panel
 */
/**
 * @memberof examples
 * @name withoutPanelNavigationWithFiveItemsPerPanel
 * @storyId example-carousel--without-panel-navigation-with-five-items-per-panel
 */

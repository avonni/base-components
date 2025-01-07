/**
 * @typedef {Object} Item
 * @name items
 * @property {string} name Required. Unique name for the item.
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
 * @name --avonni-carousel-item-color-border
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-radius-border
 * @default 0.25rem
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-content-radius-border
 * @default 0.25rem
 * @type radius
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-title-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-title-font-size
 * @default 1rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-title-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-title-font-weight
 * @default 600
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-description-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-description-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-description-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-description-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-image-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-image-sizing-height
 * @type length-percentage
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-image-positioning-object-fit
 * @type keyword
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-image-positioning-object-position
 * @type length-percentage
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-image-radius-border
 * @type radius
 * @default 0.25rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-title-line-clamp
 * @default 2
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-title-text-color
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
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-color-border-hover
 * @default #747474
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
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-inactive-indicator-shaded-color-border-hover
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-color-background
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-icon-color
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-color-background-hover
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-sizing-border-hover
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-styling-border-hover
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-color-border-hover
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-icon-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-color-border-disabled
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-button-color-background-disabled
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-navigation-icon-color-disabled
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-text-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-color-background-hover
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-text-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-color-border-hover
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-color-background-active
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-text-color-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-bare-color-border-active
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-color-background
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-text-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-color-background-hover
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-text-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-color-border-hover
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-color-background-active
 * @default #f3f3f3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-text-color-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-neutral-color-border-active
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-text-color
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-color-background-hover
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-text-color-hover
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-color-border-hover
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-color-background-active
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-text-color-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-color-border-active
 * @default #014486
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-carousel-item-action-button-menu-radius-border
 * @default 0.25rem
 * @type dimension
 */

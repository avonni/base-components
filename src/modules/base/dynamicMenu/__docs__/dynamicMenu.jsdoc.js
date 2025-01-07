/**
 * @typedef {Object} DynamicMenuItem
 * @name items
 * @property {string} label Item label.
 * @property {string[]} meta An array of descriptive meta tags text.
 * @property {string} value Item text value.
 * @property {object} avatar avatar object.
 */
/**
 * @typedef {Object} DynamicMenuAction
 * @name actions
 * @property {string} alternativeText The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'.
 * @property {boolean} disabled If present, the action item is shown as disabled. Defaults to false.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {string} name Required.  Unique name of the action. It will be returned by the actionclick event.
 */
/**
 * @typedef {Object} DynamicMenuAvatar
 * @name avatar
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src The URL for the image.
 * @property {string} alternativeText The alternative text used to describe the avatar, which is displayed as hover text on the image. The default value is "Avatar".
 * @property {string} size The size of the avatar. Valid values are x-small, small, medium, large, x-large and xx-large. The default value is "medium".
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. The default value is "square".
 */

/**
 * @namespace slots
 */
/**
 * Placeholder for your content.
 *
 * @memberof slots
 * @name default
 */
/**
 * Placeholder for actionable components, such as lightning-button.
 *
 * @memberof slots
 * @name footer
 */

/**
 * @namespace stylingHooks
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-line-height
 * @type dimension
 * @default 1.875rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-radius-border
 * @type radius
 * @default 0.25rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-sizing-border
 * @type sizing
 * @default 1px
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-styling-border
 * @type styling
 * @default solid
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-label-font-family
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-label-font-size
 * @type font
 * @default 0.8175rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-label-font-style
 * @type font
 * @default normal
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-label-font-weight
 * @type font
 * @default 400
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-color-background
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-color-background-active
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-color-background-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-color-border
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-color-border-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-color-border-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-text-color
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-color-background
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-color-background-active
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-color-background-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-color-border
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-color-border-active
 * @type color
 * @default rgba(255, 255, 255, 0.75)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-color-border-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-text-color
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-text-color-active
 * @type color
 * @default rgba(255, 255, 255, 0.75)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-bare-inverse-text-color-hover
 * @type color
 * @default rgba(255, 255, 255, 0.5)
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-color-background
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-color-background-active
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-color-background-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-color-border
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-color-border-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-color-border-hover
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-text-color
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-base-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-background
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-background-active
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-background-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-border
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-border-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-color-border-hover
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-text-color
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-color-background
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-color-background-active
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-color-background-hover
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-color-border
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-color-border-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-color-border-hover
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-text-color
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-filled-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-color-background
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-color-background-active
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-color-background-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-color-border
 * @type color
 * @default #c9c9c9
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-color-border-active
 * @type color
 * @default hsla(0, 0%, 100%, 0.5)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-color-border-hover
 * @type color
 * @default #c9c9c9
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-text-color
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-text-color-active
 * @type color
 * @default hsla(0, 0%, 100%, 0.5)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-border-inverse-text-color-hover
 * @type color
 * @default hsla(0, 0%, 100%, 0.5)
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-background
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-background-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-background-hover
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-border
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-border-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-color-border-hover
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-text-color
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-text-color-active
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-brand-text-color-hover
 * @type color
 * @default #fff
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-color-background
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-color-background-active
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-color-background-hover
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-color-border
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-color-border-active
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-color-border-hover
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-text-color
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-outline-brand-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-color-background
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-color-background-active
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-color-background-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-color-border
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-color-border-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-color-border-hover
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-text-color
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-container-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-color-background
 * @type color
 * @default #ba0517
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-color-background-active
 * @type color
 * @default #8e030f
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-color-background-hover
 * @type color
 * @default #8e030f
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-color-border
 * @type color
 * @default #ba0517
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-color-border-active
 * @type color
 * @default #8e030f
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-color-border-hover
 * @type color
 * @default #ba0517
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-text-color
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-text-color-active
 * @type color
 * @default #fff
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-destructive-text-color-hover
 * @type color
 * @default #fff
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-color-background
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-color-background-active
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-color-background-hover
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-color-border
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-color-border-active
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-color-border-hover
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-text-color
 * @type color
 * @default #8e030f
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-text-color-active
 * @type color
 * @default #8e030f
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-text-destructive-text-color-hover
 * @type color
 * @default #8e030f
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-color-background
 * @type color
 * @default transparent
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-color-background-active
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-color-background-hover
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-color-border
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-color-border-active
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-color-border-hover
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-text-color
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-inverse-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-color-background
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-color-background-active
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-color-background-hover
 * @type color
 * @default #f3f3f3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-color-border
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-color-border-active
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-color-border-hover
 * @type color
 * @default #747474
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-text-color
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-neutral-text-color-hover
 * @type color
 * @default #014486
 */

/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-color-background
 * @type color
 * @default #45c65a
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-color-background-active
 * @type color
 * @default #2e844a
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-color-background-hover
 * @type color
 * @default #2e844a
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-color-border
 * @type color
 * @default #91db8b
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-color-border-active
 * @type color
 * @default #2e844a
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-color-border-hover
 * @type color
 * @default #2e844a
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-text-color
 * @type color
 * @default #181818
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-text-color-active
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-success-text-color-hover
 * @type color
 * @default #fff
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-background-active
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-background-hover
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-border
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-border-active
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-color-border-hover
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-text-color-active
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-reset-text-color-hover
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-dropdown-color-background
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-color-background-hover
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-check-mark-color
 * @default #0176d3
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dynamic-menu-item-font-weight
 * @default 400
 * @type font
 */

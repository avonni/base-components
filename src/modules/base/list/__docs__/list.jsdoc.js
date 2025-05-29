/**
 * @typedef {Object} ListItem
 * @name items
 * @property {object} avatar Avatar object. If present, the avatar is displayed to the left of the item.
 * @property {boolean} checked If true, the checkbox to the left of the item will be checked.
 * @property {string} description Description of the item.
 * @property {object[]} fields Array of output data objects. See <a href="/components/output-data">Output Data</a> for valid keys. The fields are displayed in the details section.
 * @property {string} href The URL of the page the link goes to.
 * @property {string[]} icons List of iconName displayed next to the label.
 * @property {string} imageSrc Image URL for the list item image. If present, the image is displayed to the left of the item.
 * @property {object} infos List of additional information to display. Valid keys:
 * - label: string
 * - href: string
 * @property {string} label Required. Label of the item.
 * @property {string} name Name to identify the item in the list.
 */
/**
 * @typedef {Object} ListAction
 * @name actions
 * @property {string} label Required. The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 * @property {string} alternativeText The alternative text used to describe the action icon.
 */
/**
 * @typedef {Object} ListAvatar
 * @name avatar
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} size Size of the avatar icon. Valid values are x-small, small, medium, large, x-large and xx-large. Defaults to medium.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src Image URL.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. Defaults to square.
 * @property {string} position The position changes the location of the avatar in the list item. Valid values include left, top-left, bottom-left, right, top-right, bottom-right, left-of-title and right-of-title.
 * @property {string} presence Presence of the user to display. Valid values include online, busy, focus, offline, blocked and away.
 * @property {string} presencePosition Position of the presence icon. Valid values include top-left, top-right, bottom-left and bottom-right.
 */
/**
 * @typedef {Object} ImageAttributes
 * @name imageAttributes
 * @property {string} fallbackSrc The source URL to use if item.imageSrc is invalid or is not specified.
 * @property {string} position The position of the image relative to the content. The supported positions are left, right, top, bottom, background and overlay.
 * @property {string} size The size of the item image. The size controls the width for image positions left and right. Otherwise size controls the image height. Valid values are small, medium, large. The size defaults to large.
 * @property {number} height The image height in pixels. The height is only used for image positions top, bottom, background and overlay. The height overrides the size value.
 * @property {number} width The image width in pixels. The width is only used for image positions left and right. The width overrides the size value.
 * @property {string} cropFit The object-fit css property. Supported values are cover, contain, fill and none. The value defaults to cover.
 * @property {number} cropPositionX The image object-position horizontal percentage property. The value defaults to 50.
 * @property {number} cropPositionY The image object-position vertical percentage property. The value defaults to 50.
 */
/**
 * @typedef {Object} FieldAttributes
 * @name fieldAttributes
 * @property {string|number} cols Default number of columns on smallest container widths. Valid values include 1, 2, 3, 4, 6 and 12.
 * @property {string|number} largeContainerCols Number of columns on small container widths. Width is greater or equal to 1024px. See `cols` for accepted values.
 * @property {string|number} mediumContainerCols Number of columns on small container widths. Width is greater or equal to 768px. See `cols` for accepted values.
 * @property {string|number} smallContainerCols Number of columns on small container widths. Width is greater or equal to 480px. See `cols` for accepted values.
 * @property {string} variant The variant changes the appearance of the field. Accepted variants include standard, label-inline, label-hidden, and label-stacked.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-header-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-header-font-size
 * @default 0.875rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-header-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-header-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-header-line-height
 * @default 1.25
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-text-color-inverse
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-description-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-description-text-color-inverse
 * @default white
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-description-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-description-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-description-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-description-line-clamp
 * @default 2
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-color-background-sortable
 * @default --avonni-list-item-color-background, transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-color-background-hover
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-color-border
 * @default #747474
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-info-text-color
 * @default #444444
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-info-font-size
 * @default 0.8125rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-info-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-info-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-sizing-border
 * @default 1px
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-styling-border
 * @default solid
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-around-border-radius
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-color-background-sortable-hover
 * @default --avonni-list-item-color-background-hover, rgba(207, 207, 207, 0.25)
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-spacing-block-between
 * @type dimension
 * @default 0.5rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-spacing-inline-between
 * @type dimension
 * @default 0.5rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-shadow
 * @default none
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-spacing-block-start
 * @type dimension
 * @default 0.5rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-spacing-block-end
 * @type dimension
 * @default 0.5rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-spacing-inline-start
 * @type dimension
 * @default 0.5rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-spacing-inline-end
 * @type dimension
 * @default 0.5rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-cursor-sortable
 * @default --avonni-list-item-cursor, grab
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-cursor
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-avatar-image-object-fit
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-fields-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-fields-radius-border
 * @type color
 * @default 0.25rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-fields-color-border
 * @default #e5e5e5
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-fields-sizing-border
 * @default 1px
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-fields-styling-border
 * @type string
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-fields-spacing-block
 * @type dimension
 * @default 0.25rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-fields-spacing-inline
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-image-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-link-text-color
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-link-text-color-hover
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-link-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-link-text-color-inverse
 * @type color
 * @default white
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-link-text-color-inverse-hover
 * @type color
 * @default rgba(255, 255, 255, 0.75)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-link-text-color-inverse-active
 * @type color
 * @default rgba(255, 255, 255, 0.75)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-infos-link-text-color
 * @type color
 * @default #0176d3
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-infos-link-text-color-hover
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-infos-link-text-color-active
 * @type color
 * @default #014486
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-infos-link-text-color-inverse
 * @type color
 * @default white
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-infos-link-text-color-inverse-hover
 * @type color
 * @default rgba(255, 255, 255, 0.75)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-infos-link-text-color-inverse-active
 * @type color
 * @default rgba(255, 255, 255, 0.75)
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-icon-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-icon-color-foreground
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-icon-color-foreground-default
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-icon-color-background-inverse
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-icon-color-foreground-inverse
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-icon-color-foreground-default-inverse
 * @type color
 * @default white
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-icon-radius-border
 * @type color
 * @default 0.25rem
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-body-vertical-alignment
 * @default center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-actions-vertical-alignment
 * @default --avonni-list-item-body-vertical-alignment, center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-avatar-vertical-alignment
 * @default --avonni-list-item-body-vertical-alignment, center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-checkbox-button-size
 * @default 2rem
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-checkbox-button-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-checkbox-button-radius-border
 * @default 0.25rem
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-checkbox-button-color-border
 * @default rgb(201, 201, 201)
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-checkbox-button-color-background
 * @default rgb(255, 255, 255)
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-checkbox-button-color-background-active
 * @default rgb(1, 68, 134)
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-checkbox-button-icon-color-background
 * @default rgb(255, 255, 255)
 * @type color
 */

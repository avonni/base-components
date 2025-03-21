/**
 * @typedef {Object} VisualPickerItem
 * @name items
 * @property {object} avatar An object with item fields to be rendered as an avatar.
 * @property {string} avatarPosition If present, sets the position of the avatar. Valid values include top, bottom, right, left, right-of-content and left-of-content. The value defaults to left.
 * @property {string} avatarVerticalAlignment If present, sets the vertical aligment of the avatar. Valid values includes top, bottom and center. The value defaults to center.
 * @property {string} description The description can include text, and is displayed under the title inside the figure.
 * @property {string} descriptionPosition The position of the title in the figure. Valid positions include top, bottom and center. The value defaults to center.
 * @property {boolean} disabled If present, the item is disabled and the user cannot interact with it. Default is false.
 * @property {object[]} fields An object with fields displayed in the visual picker.
 * @property {boolean} hidden If present, the item is hidden and won't be displayed. Default is false.
 * @property {string} imgAlternativeText The assistive text for the image in the figure.
 * @property {string} imgSrc The URL of the image in the figure.
 * @property {string} itemDescription The description can include text, and is displayed under the title.
 * @property {string} itemTitle The title can include text and is displayed under the item.
 * @property {object[]} tags Array of tag objects. The tags will be displayed as badges in the visual picker item figure.
 * @property {string} title The title can include text and is displayed inside the figure.
 * @property {string} titlePosition The position of the title in the figure. Valid positions include top, bottom and center. The value defaults to center.
 * @property {string} value Required. A unique value for the item.
 */
/**
 * @typedef {Object} VisualPickerAvatar
 * @name itemAvatar
 * @property {string} alternativeText The alternative text used to describe the avatar, which is displayed as hover text on the image.
 * @property {string} iconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} imgSrc Image URL for the avatar.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} presence Presence of the user to display. Valid values include online, busy, focus, offline, blocked and away.
 * @property {string} presencePosition Position of the presence icon. Valid values include top-left, top-right, bottom-left and bottom-right.
 * @property {string} size Size of the avatar icon. Valid values are x-small, small, medium, large, x-large and xx-large. Defaults to medium.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. Defaults to square.
 */
/**
 * @typedef {Object} VisualPickerField
 * @name itemFields
 * @property {string} label Field label.
 * @property {string} value The value of the field.
 */
/**
 * @typedef {Object} VisualPickerTag
 * @name itemTags
 * @property {string} label Tag label.
 * @property {string} variant The variant changes the appearance of the tag. Valid values include base, brand, inverse, alt-inverse, success, info, warning, error, offline. Defaults to base.
 */
/**
 * @typedef {Object} ImageAttributes
 * @name imageAttributes
 * @property {string} fallbackSrc The source URL to use if item.imageSrc is invalid or is not specified.
 * @property {string} position The position of the image relative to the content. The supported positions are left, right, top, bottom, background and overlay.
 * @property {string} size The size of the item image. The size controls the width for image positions left and right. Otherwise size controls the image height. Valid values are small, medium, large. The size defaults to large.
 * @property {number} height The image height in pixels. The height is only used for image positions top, bottom, background and overlay. The height overrides the size value.
 * @property {string} cropFit The object-fit css property. Supported values are cover, contain, fill and none. The value defaults to cover.
 */
/**
 * @typedef {Object} FieldAttributes
 * @name fieldAttributes
 * @property {string|number} cols Default number of columns on smallest container widths. Valid values include 1, 2, 3, 4, 6 and 12.
 * @property {string} variant The variant changes the appearance of the field. Accepted variants include standard, label-inline, label-hidden, and label-stacked.
 */
/**
 * @typedef {Object} ColumnAttributes
 * @name columnAttributes
 * @property {string|number} cols Default number of columns on smallest container widths. Valid values include 1, 2, 3, 4, 6 and 12.
 * @property {string|number} largeContainerCols Number of columns on large container widths. Width is greater or equal to 1024px. See `cols` for accepted values.
 * @property {string|number} mediumContainerCols Number of columns on medium container widths. Width is greater or equal to 768px. See `cols` for accepted values.
 * @property {string|number} smallContainerCols Number of columns on small container widths. Width is greater or equal to 480px. See `cols` for accepted values.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-header-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-header-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-header-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-header-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-title-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-title-font-size
 * @default 1.25rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-title-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-title-font-weight
 * @default 700
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-title-alignment
 * @default center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-description-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-description-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-description-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-description-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-description-line-clamp
 * @default 2
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-description-line-height
 * @default 1.25
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-item-description-alignment
 * @default center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tags-alignment
 * @default center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tags-padding
 * @default 0.5rem
 * @type padding
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-alt-inverse-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-alt-inverse-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-alt-inverse-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-base-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-base-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-base-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-brand-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-brand-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-brand-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-error-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-error-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-error-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-info-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-info-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-info-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-inverse-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-inverse-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-inverse-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-offline-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-offline-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-offline-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-success-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-success-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-success-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-warning-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-warning-color-background
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-warning-color-border
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-label-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-label-font-weight
 * @default 700
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-radius-border
 * @default 15rem
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-sizing-border
 * @default 1px
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-tag-line-height
 * @default normal
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-title-text-color
 * @default #080707
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-title-font-size
 * @default 1.25rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-title-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-title-font-weight
 * @default 700
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-title-alignment
 * @default center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-title-padding
 * @default 0.15rem 0.75rem
 * @type padding
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-description-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-description-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-description-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-description-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-description-line-clamp
 * @default 2
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-description-line-height
 * @default 1.25
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-description-alignment
 * @default center
 * @type alignment
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-color-background-hover
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-color-background-selected
 * @default #1b96ff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-color-border
 * @default #c9c9c9
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-color-border-hover
 * @default #1b96ff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-color-border-selected
 * @default #1b96ff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-radius-border
 * @default 0.25rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-shadow
 * @default 0 2px 2px rgb(0 0 0 / 5%)
 * @type shadow
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-image-padding
 * @default 0rem
 * @type padding
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-responsive-sizing-max-height
 * @default 21rem
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-visual-picker-responsive-sizing-min-height
 * @default 15rem
 * @type sizing
 */

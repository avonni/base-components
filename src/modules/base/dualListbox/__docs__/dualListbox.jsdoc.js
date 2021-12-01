/**
 * @typedef {Object} Option
 * @name options
 * @property {object} avatar An object with item fields to be rendered as an avatar.
 * @property {string} description Description for the option.
 * @property {string} groupName Name of the group this option belongs to.
 * @property {string} label Label for options.
 * @property {string} value Text to name the option.
 */
/**
 * @typedef {Object} Avatar
 * @name avatar
 * @property {string} fallbackIconName The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.
 * @property {string} size This property will change the size of the avatar icon for each options. Valid values are x-small, small, medium, large, x-large and xx-large. The value defaults to medium.
 * @property {string} initials If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.
 * @property {string} src Image URL for the avatar of the group. If present, the avatar is displayed before the label.
 * @property {string} variant The variant changes the shape of the avatar. Valid values are empty, circle, and square. The value defaults to square.
 */

/**
 * @namespace stylingHooks
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-text-color
 * @default #706e6b
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-background-hover
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-text-color-hover
 * @default #706e6b
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-background-selected
 * @default #edeceb
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-text-color-selected
 * @default #706e6b
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-option-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-boxes-label-font-weight
 * @default 400
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-text-color
 * @default #3e3e3c
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-font-size
 * @default 0.75rem
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-font-style
 * @default normal
 * @type font
 */
/**
 * @memberof stylingHooks
 * @name --avonni-dual-listbox-header-font-weight
 * @default 700
 * @type font
 */

/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name base
 * @storyId example-dual-listbox--base
 */
/**
 * @memberof examples
 * @name baseWithGroups
 * @storyId example-dual-listbox--base-with-groups
 */
/**
 * @memberof examples
 * @name baseSmall
 * @storyId example-dual-listbox--base-small
 */
/**
 * @memberof examples
 * @name baseLarge
 * @storyId example-dual-listbox--base-large
 */
/**
 * @memberof examples
 * @name baseLarge
 * @storyId example-dual-listbox--base-responsive
 */
/**
 * @memberof examples
 * @name baseNoBorder
 * @storyId example-dual-listbox--base-no-border
 */
/**
 * @memberof examples
 * @name baseDisabled
 * @storyId example-dual-listbox--base-disabled
 */
/**
 * @memberof examples
 * @name baseLoading
 * @storyId example-dual-listbox--base-loading
 */
/**
 * @memberof examples
 * @name baseWithMaximumMinimum
 * @storyId example-dual-listbox--base-with-maximum-minimum
 */
/**
 * @memberof examples
 * @name baseWithAvatar
 * @storyId example-dual-listbox--base-with-avatar
 */
/**
 * @memberof examples
 * @name baseWithAvatarReorderingDisabled
 * @storyId example-dual-listbox--base-with-avatar-reordering-disabled
 */
/**
 * @memberof examples
 * @name baseWithAvatarLabelHidden
 * @storyId example-dual-listbox--base-with-avatar-label-hidden
 */
/**
 * @memberof examples
 * @name baseWithAvatarVisibleOptions10
 * @storyId example-dual-listbox--base-with-avatar-visible-options-10
 */
/**
 * @memberof examples
 * @name baseWithAvatarDescriptionVisibleOptions6
 * @storyId example-dual-listbox--base-with-avatar-description-visible-options-6
 */
/**
 * @memberof examples
 * @name languages
 * @storyId example-dual-listbox--languages
 */
/**
 * @memberof examples
 * @name languagesWithSearchEngine
 * @storyId example-dual-listbox--languages-with-allow-search
 */
/**
 * @memberof examples
 * @name languagesStacked
 * @storyId example-dual-listbox--languages-stacked
 */

/**
 * @typedef {Object} Item
 * @name items
 * @property {string} label Required. Label of the item.
 * @property {string} href The URL of the page the link goes to.
 * @property {string} description Description of the item.
 * @property {object} infos List of additional information to display. Fields:- label: string- href: string
 * @property {string[]} icons List of iconName display next to the label.
 * @property {string} avatarSrc Image URL for the item avatar. If present, the avatar is displayed before the label.
 * @property {string} avatarFallbackIconName The Lightning Design System name of the icon used as a fallback when the avatar image fails to load. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
 * @property {string} imageSrc Image URL for the list item image. If present, the image is presented to the left of the list item.
 */
/**
 * @typedef {Object} Action
 * @name actions
 * @property {string} label Required. The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
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
 * @default 1rem
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
 * @type line-height
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-header-text-color
 * @default #080707
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
 * @name --avonni-list-item-color-background
 * @default transparent
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-color-background-hover
 * @default #f3f2f2
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-color-border
 * @default #dddbda
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-sizing-border
 * @default 1px
 * @type sizing
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-styling-border
 * @default solid
 * @type styling
 */
/**
 * @memberof stylingHooks
 * @name --avonni-list-item-around-border-radius
 * @default 0.25rem
 * @type radius
 */

/**
 * @namespace examples
 */
/**
 * @memberof examples
 * @name base
 * @storyId example-list--base
 */
/**
 * @memberof examples
 * @name baseWithDividerOnTop
 * @storyId example-list--base-with-divider-on-top
 */
/**
 * @memberof examples
 * @name listWithAvatars
 * @storyId example-list--list-with-avatars
 */
/**
 * @memberof examples
 * @name sortableList
 * @storyId example-list--sortable-list
 */
/**
 * @memberof examples
 * @name sortableListWithAvatars
 * @storyId example-list--sortable-list-with-avatars
 */
/**
 * @memberof examples
 * @name sortableListWithAvatarsAndSingleAction
 * @storyId example-list--sortable-list-with-avatars-and-single-action
 */
/**
 * @memberof examples
 * @name listWithActions
 * @storyId example-list--list-with-actions
 */
/**
 * @memberof examples
 * @name sortableListWithImagesAndAvatars
 * @storyId example-list--sortable-list-with-images-and-avatars
 */

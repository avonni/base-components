import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import {
    animationFrame,
    keyCodes,
    normalizeArray,
    normalizeBoolean,
    normalizeString,
    timeout
} from 'c/utilsPrivate';
import {
    Direction,
    startPositioning,
    stopPositioning
} from 'c/positionLibrary';
import { AvonniResizeObserver } from 'c/resizeObserver';

const AVATAR_GROUP_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    default: 'medium'
};
const AVATAR_GROUP_LAYOUTS = {
    valid: ['stack', 'grid', 'list'],
    default: 'stack'
};

const AVATAR_GROUP_VARIANTS = {
    valid: ['empty', 'square', 'circle'],
    default: 'square'
};

const BUTTON_ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

const BUTTON_VARIANTS = {
    valid: [
        'neutral',
        'base',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};

const DEFAULT_LIST_BUTTON_SHOW_MORE_LABEL = 'Show more';
const DEFAULT_LIST_BUTTON_SHOW_LESS_LABEL = 'Show less';
const DEFAULT_LOAD_MORE_OFFSET = 20;

/**
 * @class
 * @name AvatarGroup
 * @descriptor avonni-avatar-group
 * @storyId example-avatar-group--base-with-two-avatars
 * @public
 */
export default class AvatarGroup extends LightningElement {
    /**
     * The Lightning Design System name of the action icon.
     * Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * @type {string}
     * @name action-icon-name
     * @public
     */
    @api actionIconName;

    /**
     * Label of the button that appears in the list layout, when the number of avatars exceeds the max-count number.
     * @type {string}
     * @name list-button-show-more-label
     * @default Show more
     * @public
     */
    @api listButtonShowMoreLabel = DEFAULT_LIST_BUTTON_SHOW_MORE_LABEL;

    /**
     * Label of the button that appears in the list layout, when the number of avatars exceeds the max-count number.
     * @type {string}
     * @name list-button-show-less-label
     * @default Show less
     * @public
     */
    @api listButtonShowLessLabel = DEFAULT_LIST_BUTTON_SHOW_LESS_LABEL;

    /**
     * The Lightning Design System name of the list button icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * @type {string}
     * @name list-button-show-more-icon-name
     * @public
     */
    @api listButtonShowMoreIconName;

    /**
     * The Lightning Design System name of the list button icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * @type {string}
     * @name list-button-show-less-icon-name
     * @public
     */
    @api listButtonShowLessIconName;

    /**
     * Name of the avatar group. It will be returned by the actionclick event.
     * @type {string}
     * @public
     */
    @api name;

    _enableInfiniteLoading = false;
    _isLoading = false;
    _items = [];
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _maxCount;
    _size = AVATAR_GROUP_SIZES.default;
    _layout = AVATAR_GROUP_LAYOUTS.default;
    _listButtonShowMoreIconPosition = BUTTON_ICON_POSITIONS.default;
    _listButtonShowLessIconPosition = BUTTON_ICON_POSITIONS.default;
    _listButtonVariant = BUTTON_VARIANTS.default;
    _variant = AVATAR_GROUP_VARIANTS.default;

    showHiddenItems = false;
    _autoPosition;
    _connected = false;
    _focusAnimationFrame;
    _focusedIndex = 0;
    _hiddenItemsStartIndex = 0;
    _lastHiddenItemIndex;
    _maxVisibleCount;
    _popoverFocusoutAnimationFrame;
    _popoverIsFocused = false;
    _positioning = false;
    _preventPopoverClosing = false;
    _resizeObserver;

    connectedCallback() {
        this.template.addEventListener(
            'actionclick',
            this.handleAvatarActionClick
        );
        this._connected = true;
    }

    renderedCallback() {
        if (this._resizeObserver && this._layout === 'list') {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        } else if (!this._resizeObserver && this._layout !== 'list') {
            this._resizeObserver = this.initResizeObserver();
        }

        if (this.isNotList) {
            this.updateVisibleMaxCount();
        } else {
            this.handleListScroll();
        }

        const avatars = this.template.querySelectorAll(
            '[data-group-name="avatar"]'
        );

        avatars.forEach((avatar, index) => {
            avatar.style.zIndex = avatars.length - index;
        });
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, you can load a subset of items and then display more when users scroll to the end of the list. Use with the `loadmore` event to retrieve more items.
     * If present, `max-count` is ignored.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);

        if (this._connected && this.isNotList) {
            this.updateVisibleMaxCount();
        } else if (this._connected) {
            this.handleListScroll();
        }
    }

    /**
     * If present, a spinner is shown to indicate that more items are loading.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
        this.keepFocusOnHiddenItems();
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the scroll position is from the end of the avatar group.
     *
     * @type {number}
     * @default 20
     * @public
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }
    set loadMoreOffset(value) {
        const number = parseInt(value, 10);
        this._loadMoreOffset = isNaN(number)
            ? DEFAULT_LOAD_MORE_OFFSET
            : number;
    }

    /**
     * An array of items to be rendered as avatar in a group.
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this.keepFocusOnHiddenItems();
        this._items = normalizeArray(value);

        if (
            this.showHiddenItems &&
            this.hiddenItems.length &&
            !this._lastHiddenItemIndex
        ) {
            // The hidden items popover was open but empty.
            // Set the focus on the first hidden item added.
            this._lastHiddenItemIndex = this.hiddenItems[0].index;
            this.switchFocus(this._lastHiddenItemIndex);
        }
    }

    /**
     * Defines the layout of the avatar group. Valid values include stack, grid and list.
     * @type {string}
     * @default stack
     * @public
     */
    @api
    get layout() {
        return this._layout;
    }
    set layout(value) {
        this._layout = normalizeString(value, {
            fallbackValue: AVATAR_GROUP_LAYOUTS.default,
            validValues: AVATAR_GROUP_LAYOUTS.valid
        });
    }

    /**
     * Position of the list button’s icon. Valid values include left and right.
     * @type {string}
     * @name list-button-show-less-icon-position
     * @default left
     * @public
     */
    @api
    get listButtonShowLessIconPosition() {
        return this._listButtonShowLessIconPosition;
    }
    set listButtonShowLessIconPosition(value) {
        this._listButtonShowLessIconPosition = normalizeString(value, {
            fallbackValue: BUTTON_ICON_POSITIONS.default,
            validValues: BUTTON_ICON_POSITIONS.valid
        });
    }

    /**
     * Position of the list button’s icon. Valid values include left and right.
     * @type {string}
     * @name list-button-show-more-icon-position
     * @default left
     * @public
     */
    @api
    get listButtonShowMoreIconPosition() {
        return this._listButtonShowMoreIconPosition;
    }
    set listButtonShowMoreIconPosition(value) {
        this._listButtonShowMoreIconPosition = normalizeString(value, {
            fallbackValue: BUTTON_ICON_POSITIONS.default,
            validValues: BUTTON_ICON_POSITIONS.valid
        });
    }

    /**
     * Variant of the button that appears in the list layout, when the number of avatars exceeds the max-count number.
     * @type {string}
     * @name list-button-variant
     * @default neutral
     * @public
     */
    @api
    get listButtonVariant() {
        return this._listButtonVariant;
    }
    set listButtonVariant(value) {
        this._listButtonVariant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /**
     * The maximum number of avatars allowed in the visible list.
     * This attribute is ignored if `enable-infinite-loading` is present.
     *
     * @type {number}
     * @name max-count
     * @default 5 for stack, 11 for grid and list
     * @public
     */
    @api
    get maxCount() {
        return this._maxCount;
    }
    set maxCount(value) {
        this._maxCount = value === Infinity ? value : parseInt(value, 10);
    }

    /**
     * The size of the avatars. Valid values include x-small, small, medium, large, x-large and xx-large.
     * @type {string}
     * @default medium
     * @public
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: AVATAR_GROUP_SIZES.default,
            validValues: AVATAR_GROUP_SIZES.valid
        });
    }

    /**
     * Shape of the avatars. Valid values include empty, circle or square.
     * @type {string}
     * @default square
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: AVATAR_GROUP_VARIANTS.default,
            validValues: AVATAR_GROUP_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Action Button HTML element.
     *
     * @type {HTMLElement}
     */
    get actionButtonElement() {
        return this.template.querySelector('[data-element-id="action-button"]');
    }

    /**
     * Class of the action button.
     *
     * @type {string}
     */
    get actionButtonClass() {
        return classSet('avonni-avatar-group__action-button')
            .add(`avonni-avatar-group__action-button_${this.variant}`)
            .add(`avonni-avatar-group__action-button_${this.size}`)
            .add({
                'avonni-avatar-group__avatar-in-line-button':
                    this.layout === 'stack'
            })
            .toString();
    }

    /**
     * Action button icon size.
     *
     * @type {string}
     */
    get actionButtonIconSize() {
        switch (this.size) {
            case 'x-small':
            case 'small':
            case 'medium':
                return 'x-small';
            case 'xx-large':
                return 'medium';
            default:
                return 'small';
        }
    }

    /**
     * Class of action button wrapper.
     *
     * @type {string}
     */
    get actionButtonWrapperClass() {
        return classSet(`avonni-action-button-${this.size}`)
            .add({
                'avonni-avatar-group__action-button-base-layout':
                    this.isNotList,
                'avonni-avatar-group__action-button-list slds-show slds-p-vertical_x-small slds-p-horizontal_small':
                    this.layout === 'list',
                'avonni-avatar-group__avatar-button-in-line':
                    this.layout === 'stack'
            })
            .toString();
    }

    /**
     * Class to add a flex row gap to grid and stack layouts.
     *
     * @type {string}
     */
    get avatarFlexWrapperClass() {
        return classSet({
            'slds-grid': this.isNotList,
            'slds-scrollable_y avonni-avatar-group__avatar-list_infinite-loading':
                this.enableInfiniteLoading && this.layout === 'list'
        }).toString();
    }

    /**
     * Class wrapping the two-avatar group.
     *
     * @type {string}
     */
    get avatarGroupClass() {
        return classSet('slds-avatar-group avonni-avatar-group__avatar')
            .add({
                'slds-avatar-group_x-small': this.size === 'x-small',
                'slds-avatar-group_small': this.size === 'small',
                'slds-avatar-group_medium': this.size === 'medium',
                'slds-avatar-group_large': this.size === 'large',
                'avonni-avatar-group_x-large': this.size === 'x-large',
                'avonni-avatar-group_xx-large': this.size === 'xx-large',
                'avonni-avatar-group_circle': this.variant === 'circle',
                'avonni-avatar-group_in-line': this.layout === 'stack'
            })
            .toString();
    }

    /**
     * Class of avatars when displayed in a line.
     *
     * @type {string}
     */
    get avatarInlineClass() {
        return classSet('avonni-avatar-group__avatar')
            .add({
                'avonni-avatar-group_in-line': this.layout === 'stack',
                'avonni-avatar-group__avatar_radius-border-square':
                    (this.layout === 'stack' || this.layout === 'grid') &&
                    this.variant === 'square'
            })
            .add(`avonni-avatar-${this.size}`)
            .toString();
    }

    /**
     * Avatar Item HTML element.
     *
     * @type {HTMLElement}
     */
    get avatarItemElement() {
        return this.template.querySelector('[data-element-id="li-visible"]');
    }

    /**
     * Class of the avatar wrapper, when there are more than two avatars.
     *
     * @type {string}
     */
    get avatarWrapperClass() {
        return classSet(
            'avonni-avatar-group__avatar-container slds-is-relative'
        )
            .add({
                'slds-show avonni-avatar-group__avatar-container_list slds-p-horizontal_small slds-p-vertical_x-small':
                    this.layout === 'list',
                'avonni-avatar-group__avatar-container_grid':
                    this.layout === 'grid',
                'avonni-avatar-group__avatar-container_stack':
                    this.layout === 'stack',
                'avonni-avatar-group_circle': this.variant === 'circle',
                'slds-p-right_x-small': this.layout === 'grid'
            })
            .toString();
    }

    /**
     * Maximum number of visible items.
     *
     * @type {number}
     */
    get computedMaxCount() {
        if (this.enableInfiniteLoading) {
            if (this.layout === 'list') {
                return Infinity;
            }
            return this._maxVisibleCount < this.maxCount
                ? this._maxVisibleCount
                : this.maxCount || this._maxVisibleCount;
        }

        if (this.maxCount && this._maxVisibleCount) {
            return Math.min(this.maxCount, this._maxVisibleCount);
        }

        if (this.maxCount) {
            return this.maxCount;
        }

        const maxLimit = this.layout === 'stack' ? 5 : 11;
        if (this._maxVisibleCount) {
            return Math.min(this._maxVisibleCount, maxLimit);
        }
        return maxLimit;
    }

    /**
     * Current icon name of the list button (show more or show less).
     *
     * @type {string}
     */
    get currentListButtonIcon() {
        return this.showHiddenItems
            ? this.listButtonShowLessIconName
            : this.listButtonShowMoreIconName;
    }

    /**
     * Current label of the list button (show more or show less).
     *
     * @type {string}
     */
    get currentlistButtonLabel() {
        return this.showHiddenItems
            ? this.listButtonShowLessLabel
            : this.listButtonShowMoreLabel;
    }

    /**
     * Current icon position of the list button (show more or show less).
     *
     * @type {string}
     */
    get currentListButtonPosition() {
        return this.showHiddenItems
            ? this.listButtonShowLessIconPosition
            : this.listButtonShowMoreIconPosition;
    }

    /**
     * True if they are exactly two items.
     *
     * @type {boolean}
     */
    get hasTwoItems() {
        return this.items.length === 2;
    }

    /**
     * Class of the hidden avatars when displayed in a line.
     *
     * @type {string}
     */
    get hiddenAvatarInlineClass() {
        return this.layout === 'list' ? this.avatarInlineClass : '';
    }

    /**
     * Class of the hidden avatar wrapper, when there are more avatar than the max count.
     *
     * @type {string}
     */
    get hiddenAvatarWrapperClass() {
        return this.layout === 'list'
            ? this.avatarWrapperClass
            : 'avonni-avatar-group__hidden-avatar-container slds-p-vertical_x-small slds-p-horizontal_small';
    }

    /**
     * Array of hidden items.
     *
     * @type {object[]}
     */
    get hiddenItems() {
        if (!this.showMoreButton) {
            return [];
        } else if (this.layout === 'list') {
            return this.items.slice(this.computedMaxCount);
        }

        const items = this.items.slice(
            this._hiddenItemsStartIndex,
            this.items.length
        );

        return items.map((it, index) => {
            return {
                ...it,
                index: index + this._hiddenItemsStartIndex
            };
        });
    }

    /**
     * Class of the hidden extra items dropdown.
     *
     * @type {string}
     */
    get hiddenListClass() {
        return classSet({
            'slds-dropdown slds-p-around_none': this.isNotList
        }).toString();
    }

    /**
     * True if there are only two avatars visible.
     *
     * @type {boolean}
     */
    get isClassic() {
        return (
            this.layout === 'stack' && this.hasTwoItems && !this.actionIconName
        );
    }

    /**
     * True if the layout is not "list".
     *
     * @type {boolean}
     */
    get isNotList() {
        return this.layout !== 'list';
    }

    /**
     * Class of the loading spinner.
     *
     * @type {string}
     */
    get loadingSpinnerClass() {
        return classSet('slds-is-relative')
            .add({
                'slds-avatar-group_x-small': this.size === 'x-small',
                'slds-avatar-group_small': this.size === 'small',
                'slds-avatar-group_medium': this.size === 'medium',
                'slds-avatar-group_large': this.size === 'large',
                'avonni-avatar-group__loading-spinner_x-large':
                    this.size === 'x-large',
                'avonni-avatar-group__loading-spinner_xx-large':
                    this.size === 'xx-large'
            })
            .toString();
    }

    /**
     * Loading spinner size.
     *
     * @type {string}
     */
    get loadingSpinnerSize() {
        switch (this.size) {
            case 'small':
                return 'x-small';
            case 'medium':
                return 'small';
            case 'large':
            case 'x-large':
                return 'medium';
            case 'xx-large':
                return 'large';
            default:
                return this.size;
        }
    }

    /**
     * If there are exactly two items, contains the first. Else contains an empty object.
     *
     * @type {object}
     */
    get primaryItem() {
        return this.hasTwoItems ? this.items[0] : {};
    }

    /**
     * If there are exactly two items, contains the second. Else contains an empty object.
     *
     * @type {object}
     */
    get secondaryItem() {
        return this.hasTwoItems ? this.items[1] : {};
    }

    /**
     * True if is loading, there is no show more button or the layout is not "list"
     *
     * @type {boolean}
     */
    get showLoadingSpinner() {
        return this.isLoading && (!this.showMoreButton || this.isNotList);
    }

    /**
     * Class of the show more button when the avatars are displayed in a line
     *
     * @type {string}
     */
    get showMoreAvatarClass() {
        return classSet('avonni-avatar-group__avatar avonni-avatar-group__plus')
            .add({
                'avonni-avatar-group_in-line ': this.layout === 'stack',
                'avonni-avatar-group__avatar_radius-border-square':
                    (this.layout === 'stack' || this.layout === 'grid') &&
                    this.variant === 'square'
            })
            .add(`avonni-avatar-${this.size}`)
            .toString();
    }

    /**
     * True if the "Show More" button should be displayed.
     *
     * @type {boolean}
     */
    get showMoreButton() {
        return (
            this.computedMaxCount < this.items.length ||
            (this.enableInfiniteLoading &&
                (this.computedMaxCount === this.items.length ||
                    (this.layout === 'list' && this.isLoading)))
        );
    }

    get showMoreButtonWrapperClass() {
        return classSet('slds-is-relative slds-show_inline-block')
            .add({
                'slds-m-left_small':
                    this.layout === 'list' && this.enableInfiniteLoading
            })
            .toString();
    }

    /**
     * Show more button HTML element.
     *
     * @type {HTMLElement}
     */
    get showMoreButtonElement() {
        return this.template.querySelector(
            '[data-element-id="show-more-button"]'
        );
    }

    /**
     * Label of the "Show More" button.
     *
     * @type {string}
     */
    get showMoreInitials() {
        if (this.enableInfiniteLoading) {
            return '···';
        }
        const length = this.items.length - this.computedMaxCount;
        return `+${length}`;
    }

    /**
     * Class to reorder show more section
     * @type {string}
     */
    get showMoreSectionClass() {
        return classSet({
            'slds-grid slds-grid_vertical-reverse': this.layout === 'list',
            'slds-show_inline slds-is-relative': this.isNotList
        }).toString();
    }

    /**
     * Computed list items
     * @type {object[]}
     */
    get visibleItems() {
        return this.items.length > this.computedMaxCount
            ? this.items.slice(0, this.computedMaxCount)
            : this.items;
    }

    /**
     * Wrapper HTML element.
     *
     * @type {HTMLElement}
     */
    get wrapperElement() {
        return this.template.querySelector('[data-element-id="ul"]');
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the item at the saved focused index.
     */
    focusItem() {
        const focusedItem = this.template.querySelector(
            `[data-element-id^="li"][data-index="${this._focusedIndex}"]`
        );
        if (focusedItem) {
            focusedItem.focus();
        }
    }

    /**
     * Find the item at the given position.
     *
     * @param {number} y Position of the item on the Y axis.
     * @returns {object} Object with two keys: index and offset (position of the given y compared to the top of the item).
     */
    getHiddenItemFromPosition(y) {
        const elements = this.template.querySelectorAll(
            '[data-element-id="li-hidden"]'
        );

        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            const position = el.getBoundingClientRect();

            if (y + 1 >= position.top && y - 1 <= position.bottom) {
                return {
                    index: Number(el.dataset.index),
                    offset: y - position.top
                };
            }
        }
        return null;
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.wrapperElement) {
            return null;
        }
        return new AvonniResizeObserver(
            this.wrapperElement,
            this.updateVisibleMaxCount.bind(this)
        );
    }

    /**
     * Set the focus on the last hidden item, to keep the popover open.
     */
    keepFocusOnHiddenItems() {
        if (!this.showHiddenItems) {
            this._lastHiddenItemIndex = undefined;
            return;
        }
        const lastHiddenItem = this.hiddenItems[this.hiddenItems.length - 1];
        this._lastHiddenItemIndex = lastHiddenItem
            ? lastHiddenItem.index
            : undefined;
        this.switchFocus(this._lastHiddenItemIndex);

        // Wait for rerender to set the focus
        cancelAnimationFrame(this._focusAnimationFrame);
        this._focusAnimationFrame = requestAnimationFrame(() => {
            this.focusItem();
            this._lastHiddenItemIndex = undefined;
        });
    }

    /**
     * Normalize the focused index.
     *
     * @param {number} index Index to normalize.
     */
    normalizeFocusedIndex(index) {
        let position = 'INDEX';
        const popoverOpen = this.showHiddenItems && this.isNotList;

        if (popoverOpen && index < this.computedMaxCount) {
            position = 'FIRST_HIDDEN_ITEM';
        } else if (popoverOpen && index > this.items.length - 1) {
            position = 'LAST_HIDDEN_ITEM';
        } else if (!this.showHiddenItems && index >= this.computedMaxCount) {
            position = 'LAST_VISIBLE_ITEM';
        } else if (index < 0) {
            position = 'FIRST_ITEM';
        } else if (index > this.items.length - 1) {
            position = 'LAST_ITEM';
        }

        switch (position) {
            case 'FIRST_ITEM':
                return 0;
            case 'LAST_VISIBLE_ITEM':
                return this.computedMaxCount - 1;
            case 'FIRST_HIDDEN_ITEM':
                return this.computedMaxCount;
            case 'LAST_HIDDEN_ITEM':
                return this.items.length - 1;
            case 'LAST_ITEM':
                return this.items.length - 1;
            default:
                return index;
        }
    }

    /**
     * Update the focused index.
     *
     * @param {number} index Index of the new focused item.
     */
    switchFocus(index) {
        const list = this.template.querySelector('[data-element-id="ul"]');
        if (list) {
            list.tabIndex = '-1';
        }

        const normalizedIndex = this.normalizeFocusedIndex(index);

        // remove focus from current item
        const previousItem = this.template.querySelector(
            `[data-element-id^="li"][data-index="${this._focusedIndex}"]`
        );
        if (previousItem) {
            previousItem.tabIndex = '-1';
        }

        // move to next
        this._focusedIndex = normalizedIndex;

        // set focus
        const item = this.template.querySelector(
            `[data-element-id^="li"][data-index="${normalizedIndex}"]`
        );
        if (item) {
            item.tabIndex = '0';
        }
    }

    startPositioning() {
        this._positioning = true;
        return animationFrame()
            .then(() => {
                this.stopPositioning();
                this._autoPosition = startPositioning(
                    this,
                    {
                        target: () =>
                            this.template.querySelector(
                                '[data-element-id="div-show-more-button-wrapper"]'
                            ),
                        element: () =>
                            this.template.querySelector(
                                '[data-element-id="div-hidden-items-popover"]'
                            ),
                        align: {
                            horizontal: Direction.Left,
                            vertical: Direction.Top
                        },
                        targetAlign: {
                            horizontal: Direction.Left,
                            vertical: Direction.Bottom
                        },
                        autoFlip: true
                    },
                    true
                );
                // Edge case: W-7460656
                if (this._autoPosition) {
                    return this._autoPosition.reposition();
                }
                return Promise.reject();
            })
            .then(() => {
                return timeout(0);
            })
            .then(() => {
                // Use a flag to prevent this async function from executing multiple times in a single lifecycle
                this._positioning = false;
            });
    }

    stopPositioning() {
        if (this._autoPosition) {
            stopPositioning(this._autoPosition);
            this._autoPosition = null;
        }
        this._positioning = false;
    }

    /**
     * Toggle the visibility of the hidden items popover.
     */
    toggleItemsVisibility() {
        this.showHiddenItems = !this.showHiddenItems;

        if (this.showHiddenItems) {
            if (this.isNotList) {
                this.startPositioning();
            }

            this._hiddenItemsStartIndex = this.computedMaxCount;
            this._focusedIndex = this.computedMaxCount;

            if (!this.hiddenItems.length && this.enableInfiniteLoading) {
                // If the popover is open but there are no hidden items,
                // dispatch the loadmore event
                this.dispatchLoadMore();
            }
        } else {
            this.stopPositioning();
            this._focusedIndex = this.computedMaxCount - 1;
        }

        requestAnimationFrame(() => {
            if (this.showHiddenItems) {
                this.focusItem();

                if (this.enableInfiniteLoading) {
                    // If the popover is open and there are hidden items but no scroll bar,
                    // dispatch the loadmore event.
                    const popover = this.template.querySelector(
                        '[data-element-id="div-hidden-items-popover"]'
                    );
                    const noScrollBar =
                        popover &&
                        popover.scrollHeight === popover.clientHeight;
                    if (noScrollBar) {
                        this.dispatchLoadMore();
                    }
                }
            } else {
                // On popver close, set the focus back on the toggle button
                const showMoreButton = this.template.querySelector(
                    '[data-show-more-button]'
                );
                if (showMoreButton) {
                    showMoreButton.focus();
                }
            }
        });
    }

    /**
     * Update the number of visible and collapsed items, depending on the available space.
     */
    updateVisibleMaxCount() {
        if (!this.wrapperElement) {
            return;
        }
        if (
            (!this.avatarItemElement && !this.showMoreButtonElement) ||
            this.items.length <= 1
        ) {
            if (this.enableInfiniteLoading && !this.isLoading) {
                // If there is no items, dispatch the loadmore event
                this.dispatchLoadMore();
            }
            return;
        }

        const totalWidth = this.wrapperElement.offsetWidth;
        const availableWidth = this.actionButtonElement
            ? totalWidth - this.actionButtonElement.offsetWidth
            : totalWidth;

        const referenceElement =
            this.avatarItemElement || this.showMoreButtonElement;

        const referenceElementStyles =
            window.getComputedStyle(referenceElement);
        const referenceElementWidth =
            parseFloat(referenceElementStyles.width) +
            parseFloat(referenceElementStyles.marginLeft) +
            parseFloat(referenceElementStyles.marginRight);

        this._maxVisibleCount = Math.max(
            0,
            Math.floor(availableWidth / referenceElementWidth)
        );

        if (
            this.enableInfiniteLoading &&
            !this.isLoading &&
            this._maxVisibleCount > this.items.length
        ) {
            // If there is room for more items,
            // dispatch the loadmore event
            this.dispatchLoadMore();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Dispatch the actionclick event.
     */
    handleActionClick() {
        const name = this.name;

        /**
         * The event fired when the user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name The avatar group name.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name
                }
            })
        );
    }

    /**
     * Dispatch the actionclick event.
     */
    handleAvatarActionClick = (event) => {
        const name = event.detail.name;
        const index = Number(event.target.dataset.index);
        const item = this.items[index];

        /**
         * The event fired when the user clicks on an avatar action.
         *
         * @event
         * @name avataractionclick
         * @param {object} item The avatar detail.
         * @param {string} name The action name.
         * @param {string} targetName Name of the avatar.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('avataractionclick', {
                detail: {
                    item,
                    name,
                    targetName: item.name
                }
            })
        );
    };

    /**
     * If the "show more" avatar was clicked, open the popover.
     * If another avatar was clicked, dispatch the avatarclick event.
     */
    handleAvatarClick(event) {
        if (event.type === 'keyup' && event.key !== 'Enter') {
            return;
        }

        const index = Number(event.target.dataset.index);
        const item = this.items[index];

        /**
         * The event fired when the user click on an avatar.
         *
         * @event
         * @name avatarclick
         * @param {object} item The avatar detail.
         * @param {string} name Name of the avatar.
         * @bubbles
         * @cancelable
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('avatarclick', {
                bubbles: true,
                cancelable: true,
                detail: {
                    item,
                    name: item.name
                }
            })
        );

        if (this.isNotList && this.showHiddenItems) {
            this.handleToggleShowHiddenItems();
        } else if (!this.isClassic) {
            this.switchFocus(index);
        }
    }

    /**
     * Handle a focus inside the hidden items list.
     */
    handleHiddenItemsFocusIn() {
        if (this.layout === 'list') {
            return;
        }
        this._popoverIsFocused = true;
    }

    /**
     * Handle a focus outside the hidden items list.
     */
    handleHiddenItemsFocusOut() {
        if (this.layout === 'list') {
            return;
        }
        this._popoverIsFocused = false;

        cancelAnimationFrame(this._popoverFocusoutAnimationFrame);
        this._popoverFocusoutAnimationFrame = requestAnimationFrame(() => {
            if (
                !this._popoverIsFocused &&
                this.showHiddenItems &&
                !this._preventPopoverClosing
            ) {
                this.handleToggleShowHiddenItems();
            }
            this._preventPopoverClosing = false;
        });
    }

    /**
     * Handle a scroll movement inside the hidden items list.
     *
     * @param {Event} event `scroll` event.
     */
    handleHiddenItemsScroll(event) {
        if (this.isLoading) {
            return;
        }

        const popover = event.currentTarget;
        const height = popover.scrollHeight;
        const scrolledDistance = popover.scrollTop;
        const bottomLimit = height - popover.clientHeight - this.loadMoreOffset;
        const loadDown = scrolledDistance >= bottomLimit;

        if (loadDown) {
            this.dispatchLoadMore();
        }
    }

    /**
     * Handle a focus on an item.
     *
     * @param {Event} event `focus` event.
     */
    handleItemFocus(event) {
        const index = Number(event.currentTarget.dataset.index);
        if (index !== this._focusedIndex) {
            this.switchFocus(index);
        }
    }

    /**
     * Handle a keydown event on the items list.
     *
     * @param {Event} event `keydown` event.
     */
    handleItemsKeyDown(event) {
        switch (event.keyCode) {
            case keyCodes.left:
            case keyCodes.up: {
                // Prevent the page from scrolling
                event.preventDefault();
                this.switchFocus(this._focusedIndex - 1);
                this.focusItem();
                break;
            }
            case keyCodes.right:
            case keyCodes.down: {
                // Prevent the page from scrolling
                event.preventDefault();
                this.switchFocus(this._focusedIndex + 1);
                this.focusItem();
                break;
            }
            case keyCodes.space:
            case keyCodes.enter:
                // Prevent the page from scrolling
                event.preventDefault();
                this.handleAvatarClick(event);
                break;
            case keyCodes.escape:
                if (this.showHiddenItems) {
                    this.handleToggleShowHiddenItems();
                }
                break;
            default:
                break;
        }
    }

    handleListScroll() {
        const wrapper = this.template.querySelector('[data-element-id="ul"]');
        if (
            !this.enableInfiniteLoading ||
            this.isNotList ||
            this.isLoading ||
            !wrapper
        ) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        const offsetFromBottom = scrollHeight - scrollTop - clientHeight;
        const noScrollBar = scrollTop === 0 && scrollHeight === clientHeight;

        if (offsetFromBottom <= this.loadMoreOffset || noScrollBar) {
            this.dispatchLoadMore();
        }
    }

    /**
     * Handle a keydown event on the show more button.
     *
     * @param {Event} event `keydown` event.
     */
    handleShowHiddenItemsButtonKeyDown(event) {
        const key = event.key;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
            this.handleToggleShowHiddenItems();
        }
    }

    /**
     * Toggle the hidden extra avatars popover
     */
    handleToggleShowHiddenItems() {
        /**
         * The event fired when you click on the show more/less button that appears at the end of the list `layout`, if a `max-count` value is present and `enable-infinite-loading` is not present.
         *
         * @event
         * @name itemsvisibilitytoggle
         * @param {boolean} show True if avatars are currently hidden and the click was meant to show more of them. False if the click was meant to hide the visible avatars.
         * @param {number} visibleItemsLength Length of the currently visible items.
         * @public
         * @cancelable
         */
        const event = new CustomEvent('itemsvisibilitytoggle', {
            detail: {
                show: !this.showHiddenItems,
                visibleItemsLength: this.items.length - this.hiddenItems.length
            },
            cancelable: true
        });
        this.dispatchEvent(event);

        if (!event.defaultPrevented) {
            this.toggleItemsVisibility();
        }
    }

    /**
     * Stop the propagation of an event.
     *
     * @param {Event} event Event to stop.
     */
    stopPropagation(event) {
        event.stopPropagation();
    }

    /**
     * Dispatch the `loadmore` event
     */
    dispatchLoadMore() {
        /**
         * The event fired when you scroll to the end of the avatar group. This event is fired only if `enable-infinite-loading` is true.
         *
         * @event
         * @name loadmore
         * @public
         */
        this.dispatchEvent(new CustomEvent('loadmore'));
    }
}

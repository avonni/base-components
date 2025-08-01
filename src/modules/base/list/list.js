import { AvonniResizeObserver } from 'c/resizeObserver';
import {
    classSet,
    deepCopy,
    generateUUID,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { equal } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';
import Item from './item';

const COLUMNS = { valid: [1, 2, 3, 4, 6, 12], default: 1 };

const CROP_POSITION_DEFAULT = 50;

const DEFAULT_FIELD_COLUMNS = {
    default: 12,
    small: 12,
    medium: 6,
    large: 4
};
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_NEXT_BUTTON_ALTERNATIVE_TEXT = 'Next Items';
const DEFAULT_PREVIOUS_BUTTON_ALTERNATIVE_TEXT = 'Previous Items';

const DIVIDER = {
    valid: ['none', 'top', 'bottom', 'around'],
    default: 'none'
};

const FIELD_VARIANTS = {
    default: 'standard',
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked']
};

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'right'
};

const IMAGE_CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};

const IMAGE_POSITION = {
    valid: ['top', 'bottom', 'left', 'right', 'background', 'overlay'],
    default: 'left'
};

const IMAGE_SIZE = {
    valid: ['small', 'medium', 'large'],
    default: 'large'
};

const VARIANTS = {
    valid: ['base', 'single-line', 'check-list'],
    default: 'base'
};

/**
 * @class
 * @storyId example-list--base
 * @description The List component allows to enumerate items in a vertical list form, in a grid form or in a paginated single-line form.
 * @descriptor avonni-list
 * @public
 */
export default class List extends LightningElement {
    /**
     * Alternative text used to describe the list. If the list is sortable, it should describe its behavior, for example: “Sortable menu. Press spacebar to grab or drop an item. Press up and down arrow keys to change position. Press escape to cancel.”
     *
     * @type {string}
     * @public
     */
    @api alternativeText;
    /**
     * Text label for the list.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Message displayed while the list is in the loading state.
     *
     * @type {string}
     * @public
     * @default Loading...
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    /**
     * 	Alternative text for the next button.
     *
     * @type {string}
     * @public
     */
    @api nextButtonAlternativeText = DEFAULT_NEXT_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the previous button.
     *
     * @type {string}
     * @public
     */
    @api previousButtonAlternativeText =
        DEFAULT_PREVIOUS_BUTTON_ALTERNATIVE_TEXT;
    /**
     * If present, displays the number of checked items out of the total.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api showCheckCounter;
    /**
     * The Lightning Design System name of the sortable icon. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
     *
     * @type {string}
     * @public
     */
    @api sortableIconName;
    /**
     * If present, strike through all checked items.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api strikeThroughOnCheck;

    _actions = [];
    _cols = 1;
    _divider = DIVIDER.default;
    _enableInfiniteLoading = false;
    _fieldAttributes = {
        cols: DEFAULT_FIELD_COLUMNS.default,
        largeContainerCols: DEFAULT_FIELD_COLUMNS.large,
        mediumContainerCols: DEFAULT_FIELD_COLUMNS.medium,
        smallContainerCols: DEFAULT_FIELD_COLUMNS.small,
        variant: 'standard'
    };
    _imageAttributes = {
        fallbackSrc: null,
        position: 'left',
        size: 'large',
        cropPositionX: 50,
        cropPositionY: 50,
        cropFit: 'cover'
    };
    _isLoading = false;
    _items = [];
    _largeContainerCols;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _mediaActions = [];
    _mediumContainerCols;
    _smallContainerCols;
    _sortable = false;
    _sortableIconPosition = ICON_POSITIONS.default;
    _variant = VARIANTS.default;
    _visibleActions;
    _visibleMediaActions;

    _cardRendersBeforeScrollUpdate = 0;
    _columnsSizes = {
        default: 1
    };
    _connected = false;
    _currentColumnCount = 1;
    _displayWidth = 'default';
    _draggedElement;
    _draggedElements = [];
    _draggedIndex;
    _dragging = false;
    _fieldsResizeIsHandledByParent = false;
    _listHasFields = false;
    _hoveredIndex;
    _imageSizes = {
        height: {
            small: 48,
            medium: 96,
            large: 192
        },
        width: {
            small: 48,
            medium: 72,
            large: 128
        }
    };
    _initialScrollHeight = 0;
    _isFallbackLoadedMap = {};
    _initialY;
    _itemElements;
    _initialItemPositions;
    _listHasImages = false;
    _menuTop;
    _menuBottom;
    _name = generateUUID();
    _previousDisplayWidth = 0;
    _previousScrollTop;
    _keyboardMoveIndex;
    _preventItemClick = false;
    _resizeObserver;
    _restrictMotion = false;
    _savedComputedItems;
    _scrollingInterval;
    _scrollTop = 0;
    _setItemsSizeCallbacks = new Map();
    _singleLinePageFirstIndex = 0;

    computedActions = [];
    computedItems = [];
    computedMediaActions = [];

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.updateColumnCount();
        this.setItemProperties();
        this._connected = true;

        /**
         * The event fired when the list is inserted in the DOM.
         *
         * @event
         * @name privatelistconnected
         * @param {object} callbacks Object containing the setDisplayWidth callback.
         * @param {string} name Unique name of the list.
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('privatelistconnected', {
                detail: {
                    callbacks: {
                        setDisplayWidth: this.setDisplayWidth.bind(this)
                    },
                    name: this._name
                },
                composed: true,
                bubbles: true
            })
        );
    }

    renderedCallback() {
        if ((this._dragging || this._keyboardDragged) && this._draggedElement) {
            this.recoverDraggedElement();
        }

        this._itemElements = Array.from(
            this.template.querySelectorAll('[data-element-id="li-item"]')
        );

        // Wait for all the cards to render before checking if the bottom is reached.
        const cards = this.template.querySelectorAll(
            '[data-element-id="avonni-card"]'
        );
        if (!cards.length) {
            this.handleScroll();
        } else {
            this._cardRendersBeforeScrollUpdate = cards.length;
        }

        // Reset loaded fallback map.
        this._isFallbackLoadedMap = {};

        if (
            !this._resizeObserver &&
            !this._fieldsResizeIsHandledByParent &&
            this._listHasFields
        ) {
            this.initResizeObserver();
        } else if (
            this._fieldsResizeIsHandledByParent ||
            !this._listHasFields
        ) {
            this.removeResizeObserver();
        }
    }

    disconnectedCallback() {
        this.removeResizeObserver();
        window.removeEventListener('mouseup', this._dragEndMethod);
        window.removeEventListener('touchend', this._dragEndMethod);

        /**
         * The event fired when the list is inserted in the DOM.
         *
         * @event
         * @name privatelistdisconnected
         * @param {string} name Unique name of the list.
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('privatelistdisconnected', {
                detail: {
                    name: this._name
                },
                composed: true,
                bubbles: true
            })
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects.
     *
     * @type {object}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(proxy) {
        const actions = normalizeArray(proxy);
        if (equal(this._actions, actions)) {
            return;
        }
        this._actions = actions;
        this.computedActions = deepCopy(actions);

        if (this._connected) {
            this.setItemProperties();
        }
    }

    /**
     * Default number of columns on smallest container widths. Valid values include 1, 2, 3, 4, 6 and 12.
     *
     * @type {number}
     * @default 1
     * @public
     */
    @api
    get cols() {
        return this._cols;
    }
    set cols(value) {
        this._cols = this.normalizeColumns(value) || COLUMNS.default;
        this._columnsSizes.default = this._cols;

        if (this._connected) {
            this.updateColumnCount();
        }
    }

    /**
     * Position of the item divider. Valid values include none, top, bottom and around.
     *
     * @type {string}
     * @public
     */
    @api
    get divider() {
        return this._divider;
    }
    set divider(value) {
        this._divider = normalizeString(value, {
            fallbackValue: DIVIDER.default,
            validValues: DIVIDER.valid
        });
    }

    /**
     * If present, you can load a subset of data and then display more when users scroll to the end of the list or reach the last page of items in a single-line variant.
     * Use with the loadmore event handler to retrieve more data.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);

        if (!this._connected) {
            return;
        }

        if (this._enableInfiniteLoading && this.isSingleLine) {
            this.checkSingleLineLoading();
        } else if (this._enableInfiniteLoading) {
            this.computedItems = [...this.computedItems];
        } else if (!this.displayedItems.length) {
            const previousPageStart =
                this._singleLinePageFirstIndex - this._currentColumnCount;
            if (previousPageStart >= 0) {
                this._singleLinePageFirstIndex = previousPageStart;
            }
        }
    }

    /**
     * Field attributes: cols, smallContainerCols, mediumContainerCols, largeContainerCols and variant.
     *
     * @type {object}
     * @public
     */
    @api
    get fieldAttributes() {
        return this._fieldAttributes;
    }
    set fieldAttributes(value) {
        const normalizedFieldAttributes = normalizeObject(value);

        const small = this.normalizeFieldColumns(
            normalizedFieldAttributes.smallContainerCols
        );
        const medium = this.normalizeFieldColumns(
            normalizedFieldAttributes.mediumContainerCols
        );
        const large = this.normalizeFieldColumns(
            normalizedFieldAttributes.largeContainerCols
        );
        const defaults = this.normalizeFieldColumns(
            normalizedFieldAttributes.cols
        );

        // Keep same logic as in layoutItem.
        this._fieldAttributes.cols = defaults || DEFAULT_FIELD_COLUMNS.default;
        this._fieldAttributes.smallContainerCols =
            small || defaults || DEFAULT_FIELD_COLUMNS.small;
        this._fieldAttributes.mediumContainerCols =
            medium || small || defaults || DEFAULT_FIELD_COLUMNS.medium;
        this._fieldAttributes.largeContainerCols =
            large || medium || small || defaults || DEFAULT_FIELD_COLUMNS.large;

        this._fieldAttributes.variant = normalizeString(
            normalizedFieldAttributes.variant,
            {
                fallbackValue: FIELD_VARIANTS.default,
                validValues: FIELD_VARIANTS.valid
            }
        );

        if (this._connected) {
            this.setItemProperties();
        }
    }

    /**
     * Image attributes: fallbackSrc, cropFit, position, size, width, height and cropPosition.
     *
     * @type {object}
     * @public
     */
    @api
    get imageAttributes() {
        return this._imageAttributes;
    }
    set imageAttributes(value) {
        const normalizedImgAttributes = normalizeObject(value);

        this._imageAttributes.fallbackSrc = normalizedImgAttributes.fallbackSrc;

        this._imageAttributes.width = !isNaN(normalizedImgAttributes.width)
            ? normalizedImgAttributes.width
            : null;

        this._imageAttributes.height = !isNaN(normalizedImgAttributes.height)
            ? normalizedImgAttributes.height
            : null;

        this._imageAttributes.size = normalizeString(
            normalizedImgAttributes.size,
            {
                fallbackValue: IMAGE_SIZE.default,
                validValues: IMAGE_SIZE.valid
            }
        );

        this._imageAttributes.cropPositionX = !isNaN(
            normalizedImgAttributes.cropPositionX
        )
            ? normalizedImgAttributes.cropPositionX
            : CROP_POSITION_DEFAULT;
        this._imageAttributes.cropPositionY = !isNaN(
            normalizedImgAttributes.cropPositionY
        )
            ? normalizedImgAttributes.cropPositionY
            : CROP_POSITION_DEFAULT;

        this._imageAttributes.cropFit = normalizeString(
            normalizedImgAttributes.cropFit,
            {
                fallbackValue: IMAGE_CROP_FIT.default,
                validValues: IMAGE_CROP_FIT.valid
            }
        );

        this._imageAttributes.position = normalizeString(
            normalizedImgAttributes.position,
            {
                fallbackValue: IMAGE_POSITION.default,
                validValues: IMAGE_POSITION.valid
            }
        );

        if (this._connected) {
            this.setItemProperties();
        }
    }

    /**
     * Deprecated. Use 'size' attribute instead.
     *
     * @type {string}
     * @default large
     * @deprecated
     */
    @api
    get imageWidth() {
        return this._imageAttributes.size;
    }
    set imageWidth(size) {
        this._imageAttributes.size = normalizeString(size, {
            fallbackValue: IMAGE_SIZE.default,
            validValues: IMAGE_SIZE.valid
        });
        console.warn(
            "'imageWidth' is deprecated. Use image-attributes 'size' instead."
        );
    }

    /**
     * If true a loading animation is shown.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);

        if (
            this.enableInfiniteLoading &&
            this._connected &&
            this.isSingleLine
        ) {
            this.checkSingleLineLoading();
        } else if (this.enableInfiniteLoading && this._connected) {
            this.computedItems = [...this.computedItems];
        }
    }

    /**
     * Array of item objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(proxy) {
        this._items = normalizeArray(proxy, 'object');

        if (this._connected) {
            this.setItemProperties();

            if (this.isSingleLine) {
                if (!this.computedItems[this._singleLinePageFirstIndex]) {
                    this._singleLinePageFirstIndex = 0;
                }

                if (this.enableInfiniteLoading) {
                    this.checkSingleLineLoading();
                }
            } else if (this.enableInfiniteLoading) {
                this._restoreScroll = true;
            }
        }
    }

    /**
     * Number of columns on large container widths and above. See `cols` for accepted values.
     *
     * @type {number}
     * @public
     */
    @api
    get largeContainerCols() {
        return this._largeContainerCols;
    }
    set largeContainerCols(value) {
        this._largeContainerCols = this.normalizeColumns(value);
        this._columnsSizes.large = this._largeContainerCols;

        if (this._connected) {
            this.updateColumnCount();
        }
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table.
     *
     * @type {Number}
     * @public
     * @default 20
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }
    set loadMoreOffset(value) {
        this._loadMoreOffset = Number.isNaN(parseInt(value, 10))
            ? DEFAULT_LOAD_MORE_OFFSET
            : parseInt(value, 10);
    }

    /**
     * Array of action objects displayed in the image.
     *
     * @type {object[]}
     * @public
     */
    @api
    get mediaActions() {
        return this._mediaActions;
    }
    set mediaActions(proxy) {
        this._mediaActions = normalizeArray(proxy);
        this.computedMediaActions = JSON.parse(
            JSON.stringify(this._mediaActions)
        );
    }

    /**
     * Number of columns on medium container widths. See `cols` for accepted values.
     *
     * @type {number}
     * @public
     */
    @api
    get mediumContainerCols() {
        return this._mediumContainerCols;
    }
    set mediumContainerCols(value) {
        this._mediumContainerCols = this.normalizeColumns(value);
        this._columnsSizes.medium = this._mediumContainerCols;

        if (this._connected) {
            this.updateColumnCount();
        }
    }

    /**
     * Number of columns on small container widths. See `cols` for accepted values.
     * @type {number}
     * @public
     */
    @api
    get smallContainerCols() {
        return this._smallContainerCols;
    }
    set smallContainerCols(value) {
        this._smallContainerCols = this.normalizeColumns(value);
        this._columnsSizes.small = this._smallContainerCols;

        if (this._connected) {
            this.updateColumnCount();
        }
    }

    /**
     * If true, it is be possible to reorder the list items. Only the base variant supports item sorting.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(value) {
        this._sortable = normalizeBoolean(value);
    }

    /**
     * Position of the sortable icon. Valid values include left and right.
     *
     * @type {string}
     * @public
     * @default right
     */
    @api
    get sortableIconPosition() {
        return this._sortableIconPosition;
    }
    set sortableIconPosition(value) {
        this._sortableIconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * Variant to display the items as list or single line. Accepted values are base or single-line. The base variant displays a list. The variant defaults to base.
     *
     * @type {string}
     * @public
     * @default list
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
        this.computedItems.forEach((item) => {
            item.variant = this._variant;
        });

        if (this._connected) {
            this.setItemProperties();

            if (this.isSingleLine && this.enableInfiniteLoading) {
                this.checkSingleLineLoading();
            }
        }
    }

    /**
     * The number of actions that appear as regular buttons.
     *
     * @type {number}
     * @public
     */
    @api
    get visibleActions() {
        return this._visibleActions;
    }
    set visibleActions(value) {
        const normalizedValue = parseInt(value, 10);
        this._visibleActions = Number.isNaN(normalizedValue)
            ? null
            : normalizedValue;
    }

    /**
     * The number of media actions that appear as regular buttons.
     *
     * @type {number}
     * @public
     */
    @api
    get visibleMediaActions() {
        return this._visibleMediaActions;
    }
    set visibleMediaActions(value) {
        const normalizedValue = parseInt(value, 10);
        this._visibleMediaActions = Number.isNaN(normalizedValue)
            ? null
            : normalizedValue;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Size of the button icon visible when only one action is set.
     *
     * @type {string}
     */
    get actionButtonIconSize() {
        return this.imageAttributes.position === 'overlay' ? 'small' : 'medium';
    }

    /**
     * Variant of the button icon visible when only one action is set.
     *
     * @type {string}
     */
    get actionButtonIconVariant() {
        return this.imageAttributes.position === 'overlay'
            ? 'border-filled'
            : 'bare';
    }

    /**
     * Returns the column size.
     */
    get colSize() {
        return 12 / this.cols;
    }

    /**
     * Computed item class styling based on user specified attributes.
     *
     * @type {string}
     */
    get computedItemClass() {
        return classSet('slds-template__container')
            .add({
                'avonni-list__item-divider_sortable':
                    this.sortable && this.divider !== 'none',
                'avonni-list__item-divider':
                    !this.sortable && this.divider !== 'none',
                'avonni-list__item_check-list': this.isCheckList
            })
            .add(`avonni-list__item-divider_${this.divider}`)
            .toString();
    }

    /**
     * Computed object fit class to images.
     */
    get computedImageMediaClass() {
        return classSet('avonni-list__item-img')
            .add(
                `avonni-list__item-image_object-fit-${this.imageAttributes.cropFit}`
            )
            .toString();
    }

    /**
     * Apply object position style to images.
     */
    get computedImageStyle() {
        const size = this.imageAttributes.size;
        const setHeight =
            this.imageAttributes.height || this._imageSizes.height[size];
        const setWidth =
            this.imageAttributes.width || this._imageSizes.width[size];
        const imageObjectPosition = `object-position: ${this.imageAttributes.cropPositionX}% ${this.imageAttributes.cropPositionY}%;`;
        const objectFit = `object-fit: ${this.imageAttributes.cropFit};`;

        let widthStyle = 'width: 100%;';
        let heightStyle = 'height: 100%;';

        if (
            this.imageAttributes.position === 'left' ||
            this.imageAttributes.position === 'right'
        ) {
            widthStyle = `min-width: ${setWidth}px; width: ${setWidth}px; height: 100%;`;
        }
        if (
            this.imageAttributes.position === 'background' ||
            this.imageAttributes.position === 'overlay'
        ) {
            widthStyle = `min-width: 100%; width: 100%; height: ${setHeight}px;`;
        }
        if (
            this.imageAttributes.position === 'top' ||
            this.imageAttributes.position === 'bottom'
        ) {
            heightStyle = `height: ${setHeight}px; min-height: ${setHeight}px; width: 100%;`;
        }

        return `${heightStyle} ${widthStyle} ${imageObjectPosition} ${objectFit}`;
    }

    /**
     * Computed item header class styling based on user specified attributes.
     *
     * @type {string}
     */
    get computedItemHeaderClass() {
        return classSet(
            'slds-truncate avonni-list__item-header_font slds-grid slds-grid_vertical-align-center slds-margin-bottom_xx-small'
        )
            .add({
                'avonni-list__checkbox-list-item-header_font':
                    this.isCheckList && this.strikeThroughOnCheck
            })
            .toString();
    }

    /**
     * Computed item wrapper class styling based on user specified attributes.
     *
     * @type {string}
     */
    get computedItemWrapperClass() {
        return classSet('avonni-list__item-wrapper avonni-list__item')
            .add({
                'avonni-list__item-sortable':
                    this.sortable &&
                    this._currentColumnCount === 1 &&
                    this.isNotSingleLine,
                'avonni-list__item_horizontal-compact':
                    this._currentColumnCount === 1
            })
            .toString();
    }

    /**
     * Check if Image is present and set the list class styling according to attributes.
     *
     * @type {string}
     */
    get computedListClass() {
        return classSet('avonni-list__item-menu slds-is-relative slds-show')
            .add({
                'avonni-list__vertical-compact':
                    ['none', 'top', 'bottom'].includes(this.divider) &&
                    this._currentColumnCount === 1,
                'avonni-list__item-menu_horizontal-compact':
                    this._currentColumnCount === 1,
                'slds-p-bottom_xx-small':
                    this.variant === 'base' || this.isCheckList
            })
            .toString();
    }

    /**
     * Only enable scrolling if enable or has been used
     */
    get computedListContainerClass() {
        return classSet({
            'slds-grid avonni-list__flex-col avonni-list__single-line':
                this.isSingleLine,
            'slds-scrollable_y': this.isNotSingleLine
        }).toString();
    }

    /**
     * Compute the number of visible actions.
     *
     * @type {number}
     */
    get computedVisibleActions() {
        if (this.visibleActions) return this.visibleActions;
        return this.hasMultipleActions ? 0 : 1;
    }

    /**
     * Compute the number of visible media actions.
     *
     * @type {number}
     */
    get computedVisibleMediaActions() {
        if (this.visibleMediaActions) return this.visibleMediaActions;
        return this.hasMultipleMediaActions ? 0 : 1;
    }

    /**
     * Items to be displayed in the list. On single-line lists, displayed items
     * are a portion of total computed items to display on a single page of item.
     *
     * @type {array}
     */
    get displayedItems() {
        if (this.isSingleLine) {
            const startIndex = this._singleLinePageFirstIndex;
            const endIndex = startIndex + this._currentColumnCount;
            const items = this.computedItems.slice(startIndex, endIndex);
            if (!this.enableInfiniteLoading || items.length) {
                return items;
            }
            const previousPageStart =
                this._singleLinePageFirstIndex - this._currentColumnCount;
            return previousPageStart >= 0
                ? this.computedItems.slice(previousPageStart, startIndex)
                : [];
        }
        return this.computedItems;
    }

    /**
     * Get the first Action.
     *
     * @type {object}
     */
    get firstAction() {
        return this.computedActions[0];
    }

    /**
     * Get the first Media Action.
     *
     * @type {object}
     */
    get firstMediaAction() {
        return this.computedMediaActions[0];
    }

    /**
     * Check if there are any Actions.
     *
     * @type {boolean}
     */
    get hasActions() {
        return this._actions.length;
    }

    /**
     * Check if there are any Media Actions.
     *
     * @type {boolean}
     */
    get hasMediaActions() {
        return this.computedMediaActions.length;
    }

    /**
     * Check if there is more than one Action.
     *
     * @type {boolean}
     */
    get hasMultipleActions() {
        return this._actions.length > 1;
    }

    /**
     * Check if there is more than one Media Actions.
     *
     * @type {boolean}
     */
    get hasMultipleMediaActions() {
        return this.computedMediaActions.length > 1;
    }

    /**
     * Returns true if the variant is a check-list.
     */
    get isCheckList() {
        return this.variant === 'check-list';
    }

    /**
     * Returns false if the variant is a single-line.
     */
    get isNotSingleLine() {
        return !this.isSingleLine;
    }

    /**
     * Returns true if the variant is a single-line.
     */
    get isSingleLine() {
        return this.variant === 'single-line';
    }

    /**
     * Returns the label to display.
     */
    get labelToDisplay() {
        if (!this.isCheckList || !this.showCheckCounter) {
            return this.label;
        }
        return `${this.label} (${this.nbCheckedItems}/${this.computedItems.length})`;
    }

    /**
     * Returns the size of a large container.
     */
    get largeContainerColSize() {
        return this.largeContainerCols
            ? 12 / this.largeContainerCols
            : undefined;
    }

    /**
     * Returns the layout direction of the list based on the variant.
     * If the variant is single-line, the layout direction is horizontal.
     */
    get layoutDirection() {
        return this.isSingleLine ? 'horizontal' : 'vertical';
    }

    /**
     * Query selector for the list container.
     */
    get listContainer() {
        return this.template.querySelector(
            '[data-element-id="list-container"]'
        );
    }

    /**
     * Returns the size of a loading column.
     */
    get loadingColSize() {
        return !this.displayedItems.length ? 12 : this.colSize;
    }

    /**
     * Returns the size of a large container loading column.
     */
    get loadingLargeContainerColSize() {
        return !this.displayedItems.length ? 12 : this.largeContainerColSize;
    }

    /**
     * Returns the size of a medium container loading column.
     */
    get loadingMediumContainerColSize() {
        return !this.displayedItems.length ? 12 : this.mediumContainerColSize;
    }

    /**
     * Returns the size of a small container loading column.
     */
    get loadingSmallContainerColSize() {
        return !this.displayedItems.length ? 12 : this.smallContainerColSize;
    }

    /**
     * Returns the size of a medium container.
     */
    get mediumContainerColSize() {
        return this.mediumContainerCols
            ? 12 / this.mediumContainerCols
            : undefined;
    }

    /**
     * ARIA role of the menu, if the list is sortable.
     *
     * @type {string|undefined}
     */
    get menuRole() {
        return this.sortable ? 'listbox' : undefined;
    }

    /**
     * On single-line variant, if there are items on the next page, enable the next page button.
     *
     * @type {boolean}
     */
    get nextPageDisabled() {
        return (
            this.isLoading ||
            (!this.enableInfiniteLoading &&
                this._singleLinePageFirstIndex + this._currentColumnCount >=
                    this.computedItems.length)
        );
    }

    /**
     * Returns the number of items that are checked.
     */
    get nbCheckedItems() {
        return this.computedItems.filter((item) => item.checked).length;
    }

    /**
     * On single-line variant, if there are items on the previous page, enable the previous page button.
     *
     * @type {boolean}
     */
    get previousPageDisabled() {
        return this._singleLinePageFirstIndex === 0;
    }

    /**
     * If the list is a single-line variant and is loading, the loading column is shown
     */
    get showLoadingColumn() {
        return this.isLoading && !this.isSingleLine;
    }

    /**
     * Check if Icon is to be shown to the right.
     *
     * @type {boolean}
     */
    get showSortIconRight() {
        return (
            this._currentColumnCount === 1 &&
            this.isNotSingleLine &&
            this.sortable &&
            this.sortableIconName &&
            this.sortableIconPosition === 'right'
        );
    }

    /**
     * Check if Icon is left of the image.
     *
     * @type {boolean}
     */
    get showSortIconInLeftImage() {
        return (
            this._currentColumnCount === 1 &&
            this.isNotSingleLine &&
            this.sortable &&
            !!this.sortableIconName &&
            this._listHasImages &&
            this.imageAttributes.position === 'left' &&
            this.sortableIconPosition === 'left'
        );
    }

    /**
     * Check if Icon is left of content.
     *
     * @type {boolean}
     */
    get showSortIconLeftOfContent() {
        return (
            this._currentColumnCount === 1 &&
            !this.showSortIconInLeftImage &&
            this.isNotSingleLine &&
            this.sortable &&
            !!this.sortableIconName &&
            this.sortableIconPosition === 'left'
        );
    }

    /**
     * Returns the size of a small container.
     */
    get smallContainerColSize() {
        return this.smallContainerCols
            ? 12 / this.smallContainerCols
            : undefined;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Get the size and position of a list item in the viewport.
     *
     * @param {string} name Name of the item we want the position of.
     * @returns {DOMRect} Size and position of the item in the viewport.
     * @public
     */
    @api
    getItemPosition(name) {
        const item = this.template.querySelector(
            `[data-element-id="li-item"][data-name="${name}"]`
        );
        if (item) {
            return item.getBoundingClientRect();
        }
        console.warn(`No item with the name ${name} was found.`);
        return null;
    }

    /**
     * If the items have been sorted by the user, reset the items to their original order.
     *
     * @public
     */
    @api
    reset() {
        this.clearSelection();
        this.setItemProperties();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Handle moving elements with the keyboard.
     *
     * @param {HTMLElement} currentItem
     * @param {HTMLElement} targetItem
     */
    accessMoveItem(currentItem, targetItem) {
        this._keyboardDragged = true;
        const currentIndex = Number(currentItem.dataset.elementTempIndex);
        const targetIndex = Number(targetItem.dataset.elementTempIndex);
        const currentItemHeight = this.computeItemHeight(currentItem);
        const targetItemHeight = this.computeItemHeight(targetItem);

        this._draggedElement = currentItem;
        this._hoveredIndex = targetIndex;

        let currentItemYTransform = currentItem.style.transform.match(
            /translateY\((-?\d+(?:\.\d*)?)px/
        );
        if (currentItemYTransform) {
            currentItemYTransform = parseInt(currentItemYTransform[1], 10) || 0;
        }

        if (currentIndex < targetIndex) {
            currentItem.style.transform = `translateY(${
                currentItemYTransform + targetItemHeight
            }px)`;
            targetItem.style.transform = `translateY(${-currentItemHeight}px)`;
            this.checkIfKeyboardMoved(targetItem);
        } else if (currentIndex > targetIndex) {
            currentItem.style.transform = `translateY(${
                currentItemYTransform - targetItemHeight
            }px)`;
            targetItem.style.transform = `translateY(${currentItemHeight}px)`;
            this.checkIfKeyboardMoved(targetItem);
        }

        this.scrollItemIntoView(currentItem);
        targetItem.dataset.elementTempIndex = currentIndex;
        currentItem.dataset.elementTempIndex = targetIndex;

        this._keyboardMoveIndex = targetIndex;
    }

    /**
     * Apply transform style to dragged items.
     *
     * @param {number} currentY
     */
    animateDraggedItems(currentY) {
        const cursorDeltaY = currentY - this._initialY;
        const currentDraggedIndex = this._draggedIndex;

        const sortedDraggedElements = this._draggedElements.sort((a, b) => {
            const indexA = Number(a.dataset.index);
            const indexB = Number(b.dataset.index);
            return indexB - indexA;
        });
        const previousIndexes = sortedDraggedElements.map((draggedElement) =>
            Number(draggedElement.dataset.index)
        );

        let maxIndex =
            this._hoveredIndex === 0
                ? previousIndexes.length - 1
                : this._hoveredIndex;
        const newTempIndexes = Array.from(
            { length: previousIndexes.length },
            (_, i) => maxIndex - i
        );

        this._draggedElements.forEach((draggedElement) => {
            const draggedItemIndex = Number(draggedElement.dataset.index);

            if (draggedElement === this._draggedElement) {
                draggedElement.style.transform = `translate(0px, ${cursorDeltaY}px)`;
                draggedElement.dataset.moved = 'moved';

                const tempIndex = previousIndexes.findIndex(
                    (i) => i === draggedItemIndex
                );
                draggedElement.dataset.elementTempIndex =
                    newTempIndexes[tempIndex];
                return;
            }
            if (this._draggedElements.length > 1) {
                const isLarger = draggedItemIndex > currentDraggedIndex;
                const itemsBetween = this._itemElements.filter((item) => {
                    const itemIndex = Number(item.dataset.index);
                    const min = isLarger
                        ? currentDraggedIndex
                        : draggedItemIndex;
                    const max = isLarger
                        ? draggedItemIndex
                        : currentDraggedIndex;
                    const isDragging = this._draggedElements.find((i) => {
                        const index = Number(i.dataset.index);
                        return index === itemIndex;
                    });
                    return itemIndex > min && itemIndex < max && !isDragging;
                });
                let totalItemsHeight = 0;
                itemsBetween.forEach((item) => {
                    totalItemsHeight += this.computeItemHeight(item);
                });
                if (isLarger) {
                    totalItemsHeight = -totalItemsHeight;
                }
                draggedElement.style.transform = `translate(0px, ${
                    cursorDeltaY + totalItemsHeight
                }px)`;
                draggedElement.dataset.moved = 'moved';

                const tempIndex = previousIndexes.findIndex(
                    (i) => i === draggedItemIndex
                );
                draggedElement.dataset.elementTempIndex =
                    newTempIndexes[tempIndex];
            }
        });
    }

    /**
     * Apply transform style to hovered item and items in-between.
     *
     * @param {HTMLElement} hoveredItem
     */
    animateHoveredItem(hoveredItem, droppedIndex) {
        const startIndex = this.getMinIndex(this._draggedElements);
        const groupDraggedIndex = this.getMaxIndex(this._draggedElements);

        const itemsBetween = this._itemElements.filter((item) => {
            const itemIndex = Number(item.dataset.index);
            return itemIndex > startIndex && itemIndex < groupDraggedIndex;
        });

        const undraggedItems = itemsBetween.filter(
            (el) =>
                this._draggedElements.findIndex(
                    (i) => i.dataset.name === el.dataset.name
                ) === -1
        );

        const hoveredInBetween =
            hoveredItem &&
            undraggedItems.some(
                (el) => el.dataset.name === hoveredItem.dataset.name
            );

        if (
            hoveredItem &&
            (this._draggedElements.length === 1 ||
                (this._draggedElements.length > 1 &&
                    (itemsBetween.length === 0 || !hoveredInBetween)))
        ) {
            const tempHoveredIndex = parseInt(
                hoveredItem.dataset.elementTempIndex,
                10
            );
            const currentDraggedIndex =
                this._draggedElements.length > 1
                    ? groupDraggedIndex
                    : this._draggedIndex;
            const itemHasMoved = hoveredItem.dataset.moved === 'moved';
            const itemHoveringSmallerItem =
                currentDraggedIndex > this._hoveredIndex ||
                tempHoveredIndex > this._hoveredIndex;
            const itemHoveringLargerItem =
                currentDraggedIndex < this._hoveredIndex ||
                tempHoveredIndex < this._hoveredIndex;

            if (itemHasMoved) {
                delete hoveredItem.dataset.moved;
                const hoveredElementIndex = parseInt(
                    hoveredItem.dataset.index,
                    10
                );
                hoveredItem.style.transform = 'translateY(0px)';
                hoveredItem.dataset.elementTempIndex = hoveredElementIndex;
            } else if (itemHoveringSmallerItem || itemHoveringLargerItem) {
                let height = 0;
                this._draggedElements.forEach((el) => {
                    height += this.computeItemHeight(el);
                });
                const offset = this._draggedElements.length;

                if (itemHoveringSmallerItem) {
                    hoveredItem.style.transform = `translateY(${height}px)`;
                    hoveredItem.dataset.elementTempIndex =
                        tempHoveredIndex + offset;
                } else {
                    hoveredItem.style.transform = `translateY(-${height}px)`;
                    hoveredItem.dataset.elementTempIndex =
                        tempHoveredIndex - offset;
                }
                hoveredItem.dataset.moved = 'moved';
            }
        }

        undraggedItems.forEach((item) => {
            const itemIndex = Number(item.dataset.index);
            const itemHoveringSmallerItem =
                itemIndex >= droppedIndex && itemIndex <= groupDraggedIndex;
            const draggedItemsBetween = this._draggedElements.filter((i) => {
                const index = Number(i.dataset?.index);
                return (
                    index >= 0 &&
                    (itemHoveringSmallerItem
                        ? index >= itemIndex
                        : index <= itemIndex)
                );
            });
            let height = 0;
            draggedItemsBetween.forEach((el) => {
                height += this.computeItemHeight(el);
            });
            const offset = draggedItemsBetween.length;

            item.style.transform = `translateY(${
                itemHoveringSmallerItem ? height : -height
            }px)`;
            item.dataset.elementTempIndex = itemHoveringSmallerItem
                ? itemIndex + offset
                : itemIndex - offset;
            item.dataset.moved = 'moved';
        });
    }

    /**
     * Process the animation of the dragged item, and the hovered items.
     *
     * @param {number} currentY
     */
    animateItems(currentY) {
        if (!currentY || !this._draggedElement) return;

        const droppedIndex = this.getDroppedIndex(currentY);
        const hoveredItem = this.getHoveredItem(currentY);

        // Update hovered index
        if (hoveredItem) {
            const previousHoveredIndex = this._hoveredIndex;
            if (hoveredItem.dataset.elementTempIndex != null) {
                const tempIndex = parseInt(
                    hoveredItem.dataset.elementTempIndex,
                    10
                );
                const hoveredUp = tempIndex < previousHoveredIndex;
                this._hoveredIndex = hoveredUp
                    ? tempIndex + this._draggedElements.length - 1
                    : tempIndex;
            } else {
                this._hoveredIndex = Number(hoveredItem.dataset.index);
            }
        }

        // Animate items
        this.animateHoveredItem(hoveredItem, droppedIndex);

        // Adjust hovered index
        const movedItems = this._itemElements.filter((item) => {
            return item.dataset.moved === 'moved';
        });
        let hoveredIndexes = movedItems.map((item) => {
            return Number(item.dataset.index);
        });
        const undraggedItemTempIndexes = movedItems
            .filter(
                (el) =>
                    this._draggedElements.findIndex(
                        (i) => i.dataset.name === el.dataset.name
                    ) === -1
            )
            .map((item) => Number(item.dataset.elementTempIndex));

        hoveredIndexes = hoveredIndexes.filter(
            (index) => !undraggedItemTempIndexes.includes(index)
        );
        this._hoveredIndex = Math.max(...hoveredIndexes);

        // Animate dragged items
        this.animateDraggedItems(currentY);
    }

    /**
     * Scroll when an item is dragged near the top or bottom of the list.
     *
     * @param {number} currentY
     */
    autoScroll(currentY) {
        this._scrollStep = this.computeScrollStep(currentY);

        if (!this._scrollingInterval && this._draggedElement) {
            this._scrollingInterval = window.setInterval(() => {
                const overflowY =
                    this.listContainer.scrollHeight > this._initialScrollHeight;

                if (!overflowY) {
                    const amountScrolled =
                        this.listContainer.scrollTop + this._scrollStep;
                    this.listContainer.scrollTop = amountScrolled;

                    this.animateItems(currentY);

                    this._restrictMotion = true;
                    window.requestAnimationFrame(() => {
                        this._restrictMotion = false;
                    });
                }
            }, 20);
        }

        if (this._scrollStep === 0) {
            window.clearInterval(this._scrollingInterval);
            this._scrollingInterval = null;
        }
    }

    /**
     * Verify if moving elements with the keyboard.
     *
     * @param {HTMLElement} targetItem
     */
    checkIfKeyboardMoved(targetItem) {
        const itemHasMoved = targetItem.dataset.moved === 'keyboard-moved';
        if (itemHasMoved) {
            delete targetItem.dataset.moved;
            targetItem.style.transform = `translateY(0px)`;
        } else {
            targetItem.dataset.moved = 'keyboard-moved';
        }
    }

    checkSingleLineLoading() {
        const isAllLoaded =
            this.displayedItems.length < this._currentColumnCount;
        if (isAllLoaded && !this.isLoading) {
            this.dispatchLoadMore();
        }
    }

    /**
     * Erase the list styles and dataset - clear tracked variables.
     */
    clearSelection() {
        // Clean the styles and dataset
        this._itemElements.forEach((item, index) => {
            item.style.transform = '';
            item.dataset.index = index;
            item.dataset.elementTempIndex = index;
            delete item.dataset.moved;
        });
        if (this._draggedElement) {
            this._draggedElement.classList.remove(
                'avonni-list__item-sortable_dragged'
            );
        }

        this.template.querySelector(
            '.slds-assistive-text[aria-live="assertive"]'
        ).textContent = '';

        // Clean the tracked variables
        this._draggedElement =
            this._draggedIndex =
            this._hoveredIndex =
            this._initialY =
            this._savedComputedItems =
                null;
    }

    /**
     * Clean up the item before sending it to the event.
     *
     * @param {object} item
     */
    cleanUpItem(item) {
        const itemCopy = deepCopy(item);
        delete itemCopy.index;
        delete itemCopy.imagePosition;
        delete itemCopy.variant;
        delete itemCopy.infos;
        delete itemCopy.icons;
        delete itemCopy.avatarPosition;
        return itemCopy;
    }

    /**
     * Calculate the height of an item, including the row gap.
     *
     * @param {HTMLElement} itemElement
     */
    computeItemHeight(itemElement) {
        const list = this.template.querySelector(
            '[data-element-id="list-element"]'
        );
        let rowGap;
        if (list) {
            rowGap = parseInt(getComputedStyle(list).rowGap.split('px')[0], 10);
        }
        return itemElement.offsetHeight + (rowGap || 0);
    }

    /**
     * Compute whether to scroll up, down or none.
     *
     * @param {number} currentY
     * @return {string}
     */
    computeScrollStep(currentY) {
        let scrollStep = 0;

        const closeToTop =
            currentY - this.listContainer.getBoundingClientRect().top < 50;
        const closeToBottom =
            this.listContainer.getBoundingClientRect().bottom - currentY < 50;
        const scrolledTop = this.listContainer.scrollTop === 0;
        const scrolledBottom =
            this.listContainer.scrollHeight - this.listContainer.scrollTop ===
            this.listContainer.clientHeight;

        if (closeToTop) {
            scrollStep = -5;
        } else if (closeToBottom) {
            scrollStep = 5;
        }

        if ((scrolledTop && closeToTop) || (scrolledBottom && closeToBottom)) {
            scrollStep = 0;
        }

        return scrollStep;
    }

    /**
     * When the single-line page is resized, the first item on the page previously
     * displayed will be on a different page.
     */
    findNewPageOfItem(index, columns) {
        let page = 0;
        for (let i = 0; i < this.computedItems.length; i += columns) {
            const chunk = this.computedItems.slice(i, i + columns);
            const chunkIndexes = [];
            chunk.forEach((item) => {
                chunkIndexes.push(item.index);
            });
            if (chunkIndexes.includes(index)) {
                return page;
            }
            page++;
        }
        return page;
    }

    /**
     * Get the item the cursor has entered.
     *
     * @param {number} cursorY
     * @returns {object} item
     */
    getHoveredItem(cursorY) {
        return this._itemElements.find((item) => {
            if (item !== this._draggedElement) {
                const itemIndex = Number(item.dataset.index);
                const itemPosition = item.getBoundingClientRect();
                const hoverTop = itemPosition.top;
                const hoverBottom = itemPosition.bottom;

                // keep the current hovered item and don't set to null if hovering a gap.
                if (
                    cursorY > hoverTop &&
                    cursorY < hoverBottom &&
                    itemIndex != null
                ) {
                    return item;
                }
            }
            return undefined;
        });
    }

    getMaxIndex(items) {
        let maxIndex = -Infinity;

        for (const item of items) {
            const index = Number(item.dataset.index);
            if (index > maxIndex) {
                maxIndex = index;
            }
        }
        return maxIndex;
    }

    getMinIndex(items) {
        let minIndex = Infinity;

        for (const item of items) {
            const index = Number(item.dataset.index);
            if (index < minIndex) {
                minIndex = index;
            }
        }
        return minIndex;
    }

    getDroppedIndex(cursorY) {
        let index = -1;
        let currentHoverTop = 0;
        this._initialItemPositions.forEach((item) => {
            const itemIndex = item.index;
            const hoverTop = item.top;
            if (
                cursorY > hoverTop &&
                currentHoverTop < hoverTop &&
                itemIndex != null
            ) {
                currentHoverTop = hoverTop;
                index = itemIndex;
            }
        });
        return index;
    }

    /**
     * Get initial list menu position and initial Y position on user interaction.
     *
     * @param {Event} event
     */
    initPositions(event) {
        let menuPosition;
        if (this.listContainer) {
            menuPosition = this.listContainer.getBoundingClientRect();
        }
        this._menuTop = menuPosition.top;
        this._menuBottom = menuPosition.bottom;
        this._initialScrollHeight = this.listContainer.scrollHeight;
        this._initialScrollHeight = this.listContainer.scrollHeight;

        this._initialY =
            event.type === 'touchstart'
                ? event.touches[0].clientY
                : event.clientY;
    }

    initResizeObserver() {
        if (!this.listContainer) return;

        this._resizeObserver = new AvonniResizeObserver(
            this.listContainer,
            () => {
                this._setItemsSizeCallbacks.forEach((callback) => {
                    callback();
                });
            }
        );
    }

    /**
     * Only accept predetermined number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    normalizeColumns(value) {
        const numValue = parseInt(value, 10);
        return COLUMNS.valid.includes(numValue) ? numValue : null;
    }

    /**
     * Inverse logic of number of columns.
     * Matches the logic of cols, smallContainerCols, mediumContainerCols and largeContainerCols attributes.
     *
     * @param {number} value
     * @returns {number}
     */
    normalizeFieldColumns(value) {
        const normalizedCols = this.normalizeColumns(value);
        return normalizedCols
            ? 12 / Math.pow(2, Math.log2(normalizedCols))
            : null;
    }

    /**
     * Make sure all used properties are set before they are used in items.
     */
    setItemProperties() {
        this._listHasFields = false;
        this._listHasImages = false;
        this.computedItems = this.items.map((item, index) => {
            const imageSrc = item.imageSrc || this.imageAttributes.fallbackSrc;
            if (imageSrc) {
                this._listHasImages = true;
            }

            // With image position == background or overlay,
            // if the image is missing fallback to default list layout.
            let usedImagePosition = this.imageAttributes.position;
            const layoutRequiresImage =
                usedImagePosition === 'background' ||
                usedImagePosition === 'overlay';
            if (!imageSrc && layoutRequiresImage) {
                usedImagePosition = 'top';
            }
            const newItem = new Item(item);
            newItem.index = index;
            newItem.imagePosition = usedImagePosition;
            newItem.variant = this.variant;
            newItem.imageSrc = imageSrc;
            if (newItem.fields.length) {
                this._listHasFields = true;
            }

            return newItem;
        });
    }

    scrollItemIntoView(draggedItem) {
        const draggedItemPosition = draggedItem.getBoundingClientRect();
        const containerSize = this.listContainer.getBoundingClientRect();
        const moveUpWithItem = draggedItemPosition.top < 0;
        const moveDownWithItem =
            draggedItemPosition.bottom > containerSize.height;

        if (moveUpWithItem) {
            draggedItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (moveDownWithItem) {
            draggedItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    /**
     * After a rerender, recover the element being dragged and keep it.
     */
    recoverDraggedElement() {
        this._draggedElement = this.template.querySelector(
            `[data-index="${this._initialDraggedIndex}"]`
        );
        this._draggedIndex = this._initialDraggedIndex;

        if (this._dragging) {
            this.animateItems(this._currentY);
            this._initialScrollHeight = this.listContainer.scrollHeight;
        }
        if (this._keyboardDragged && this._draggedElement) {
            this._draggedElement.focus();
            this.restoreItemsTransform(
                this._draggedIndex,
                this._keyboardMoveIndex
            );
        }
    }

    removeResizeObserver() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }

    /**
     * Remove transform style and class from all items.
     */
    resetItemsAnimations() {
        this._itemElements.forEach((item) => {
            if (item.dataset.moved === 'moved') {
                delete item.dataset.moved;
                item.style.transform = 'translateY(0px)';
            }
        });
    }

    restoreItemsTransform(draggedIndex, targetIndex) {
        setTimeout(() => {
            const draggedItem = this._itemElements.find(
                (item) => Number(item.dataset.index) === draggedIndex
            );
            draggedItem.dataset.elementTempIndex = targetIndex;
            const draggedItemHeight = this.computeItemHeight(draggedItem);

            const itemsBetween = this._itemElements.filter(
                (item) =>
                    Number(item.dataset.index) > draggedIndex &&
                    Number(item.dataset.index) <= targetIndex
            );
            let draggedItemTransform = 0;
            itemsBetween.forEach((item) => {
                draggedItemTransform += this.computeItemHeight(item);
                item.style.transform = `translateY(${-draggedItemHeight}px)`;
                item.dataset.moved = 'keyboard-moved';
                item.dataset.elementTempIndex = Number(item.dataset.index) - 1;
            });
            draggedItem.style.transform = `translateY(${draggedItemTransform}px)`;
        }, 0);
    }

    setDisplayWidth(width) {
        this._displayWidth = width;
        this.updateColumnCount();

        if (this.isSingleLine && this.enableInfiniteLoading) {
            this.checkSingleLineLoading();
        }
    }

    setFieldsAreResizedByParent(value) {
        this._fieldsResizeIsHandledByParent = normalizeBoolean(value);
    }

    /**
     * Compute swap between dragged items.
     *
     */
    switchItems() {
        let previousIndexes = [];
        let newIndexes = [];
        const computedItems = [...this.computedItems];

        if (this._keyboardDragged) {
            previousIndexes = [this._draggedIndex];
            newIndexes = [this._hoveredIndex];
            const draggedItem = computedItems.splice(this._draggedIndex, 1)[0];
            computedItems.splice(this._hoveredIndex, 0, draggedItem);
        } else {
            const movedItems = this._itemElements.filter(
                (item) => item.dataset.moved === 'moved'
            );

            previousIndexes = movedItems.map((item) =>
                Number(item.dataset.index)
            );
            newIndexes = movedItems.map((item) =>
                Number(item.dataset.elementTempIndex)
            );
            for (let i = 0; i < newIndexes.length; i++) {
                computedItems[newIndexes[i]] =
                    this.computedItems[previousIndexes[i]];
            }
        }

        // Update indexes
        computedItems.forEach((item, index) => {
            item.index = index;
        });
        this.computedItems = [...computedItems];
        this.resetItemsAnimations();
        this.updateAssistiveText();

        return { previousIndexes, newIndexes };
    }

    /**
     * Stop the propagation of an event.
     *
     * @param {Event} event
     */
    stopPropagation(event) {
        event.stopPropagation();
    }

    /**
     * Update assistive text based on new item ordering.
     */
    updateAssistiveText() {
        const label = this.computedItems[this._draggedIndex].label;
        const position = this._draggedIndex + 1;
        const total = this.computedItems.length;
        const element = this.template.querySelector(
            '.slds-assistive-text[aria-live="assertive"]'
        );
        // We don't use a variable to avoid rerendering
        element.textContent = `${label}. ${position} / ${total}`;
    }

    updateColumnCount() {
        const {
            large,
            medium,
            small,
            default: defaultSize
        } = this._columnsSizes;

        switch (this._displayWidth) {
            case 'large':
                this._currentColumnCount =
                    large || medium || small || defaultSize;
                break;
            case 'medium':
                this._currentColumnCount = medium || small || defaultSize;
                break;
            case 'small':
                this._currentColumnCount = small || defaultSize;
                break;
            default:
                this._currentColumnCount = defaultSize;
                break;
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLING
     * -------------------------------------------------------------
     */

    /**
     * Compute drag event start element positions and indexes // Prevent certain elements from being dragged.
     *
     * @param {Event} event
     */
    dragStart(event) {
        if (
            event.type === 'mousedown' &&
            event.button !== 0 &&
            this.isNotSingleLine
        ) {
            return;
        }
        if (event.button === 0) {
            const index = Number(event.currentTarget.dataset.index);
            const item = this.computedItems[index];
            if (!item) {
                return;
            }

            if (event.ctrlKey || event.metaKey) {
                // Selecting multiple items
                if (item.selected) {
                    item.selected = false;

                    // Remove from selection
                    const itemIndex = this._draggedElements.indexOf(
                        event.currentTarget
                    );
                    if (itemIndex > -1) {
                        this._draggedElements.splice(itemIndex, 1);
                    }
                } else {
                    // Add to selection
                    item.selected = true;
                    this._draggedElements.push(event.currentTarget);
                }
                this.computedItems = [...this.computedItems];
            } else if (!item.selected) {
                // Single item selected
                this.computedItems.forEach((computedItem) => {
                    computedItem.selected = false;
                });
                item.selected = true;
                this._draggedElements = [event.currentTarget];
                this.computedItems = [...this.computedItems];
            }

            /**
             * The event fired when the mouse is pressed on an item.
             *
             * @event
             * @name itemmousedown
             * @param {object} item Item clicked.
             * @param {string} name Name of the item clicked.
             * @public
             * @bubbles
             */
            const itemMouseDownEvent = new CustomEvent('itemmousedown', {
                detail: {
                    item: this.cleanUpItem(item),
                    name: item.name
                },
                bubbles: true
            });
            itemMouseDownEvent.clientX = event.clientX;
            itemMouseDownEvent.clientY = event.clientY;
            itemMouseDownEvent.pageX = event.pageX;
            itemMouseDownEvent.pageY = event.pageY;
            this.dispatchEvent(itemMouseDownEvent);
        }

        if (this._keyboardDragged) {
            this._keyboardDragged = false;
            return;
        }

        // Stop dragging if the click was on a button menu
        if (
            this._currentColumnCount > 1 ||
            (this.variant !== 'base' && !this.isCheckList) ||
            !this.sortable
        ) {
            return;
        }

        this._itemElements = Array.from(
            this.template.querySelectorAll('[data-element-id="li-item"]')
        );
        this._initialItemPositions = [];
        this._itemElements.forEach((item) => {
            const rect = item.getBoundingClientRect();
            this._initialItemPositions.push({
                index: Number(item.dataset.index),
                top: rect.top,
                bottom: rect.top + rect.height
            });
        });

        this._draggedElement = event.currentTarget;

        this._draggedIndex = Number(this._draggedElement.dataset.index);
        this._initialDraggedIndex = this._draggedIndex;

        if (event.type !== 'keydown') {
            this.initPositions(event);
        } else {
            this._savedComputedItems = [...this.computedItems];
        }

        this.updateAssistiveText();

        this._currentY = this.getPositionY(event);

        if (event.type === 'touchstart') {
            // Make sure touch events don't trigger mouse events
            event.preventDefault();
            // Close any open button menu
            this._draggedElement.focus();
        }

        this._dragEndMethod = this.dragEnd.bind(this);
        window.addEventListener('mouseup', this._dragEndMethod);
        window.addEventListener('touchend', this._dragEndMethod);
    }

    /**
     * Compute drag event logic.
     *
     * @param {Event} event
     */
    drag(event) {
        if (!this._draggedElement || this._keyboardDragged) {
            return;
        }

        this._dragging = true;
        this._draggedElement.classList.add(
            'avonni-list__item-sortable_dragged'
        );

        const currentY = this.getPositionY(event);

        if (!this._scrollStep) {
            // First time dragging should set the hovered index to the farthest element in the group.
            if (this._hoveredIndex === null) {
                const sortedDraggedElements = [...this._draggedElements].sort(
                    (a, b) => {
                        const indexA = Number(a.dataset.index);
                        const indexB = Number(b.dataset.index);
                        return indexB - indexA;
                    }
                );
                const previousIndexes = sortedDraggedElements.map(
                    (draggedElement) => Number(draggedElement.dataset.index)
                );
                const previousIndex = previousIndexes.findIndex(
                    (i) => i === this._draggedIndex
                );
                const offset = previousIndexes.slice(0, previousIndex).length;
                this._hoveredIndex = this._draggedIndex + offset;
            }

            // Stick the dragged item to the mouse position
            this.animateItems(currentY);
        }

        const buttonMenu = event.currentTarget.querySelector(
            '[data-element-id="lightning-button-menu"]'
        );
        if (buttonMenu) {
            buttonMenu.classList.remove('slds-is-open');
        }

        this.stopPropagation(event);
        this.autoScroll(currentY);

        this._currentY = currentY;
    }

    /**
     * When dragging is finished, reorder items or reset the list.
     *
     * @param {Event} event
     */
    dragEnd() {
        window.removeEventListener('mouseup', this._dragEndMethod);
        window.removeEventListener('touchend', this._dragEndMethod);

        clearInterval(this._scrollingInterval);
        this._scrollingInterval = null;

        if (!this._draggedElement) {
            this._dragging = false;
            return;
        }

        if (this._draggedIndex != null && this._hoveredIndex != null) {
            const orderHasChanged = this._itemElements.some((item) => {
                return (
                    Number(item.dataset.index) !==
                    Number(item.dataset.elementTempIndex)
                );
            });
            if (orderHasChanged) {
                const { previousIndexes, newIndexes } = this.switchItems();

                const cleanItems = [];
                this.computedItems.forEach((item) => {
                    cleanItems.push(this.cleanUpItem(item));
                });
                this._preventItemClick = true;

                /**
                 * The event fired when a user reordered the items.
                 *
                 * @event
                 * @name reorder
                 * @param {object} items The items in their new order.
                 * @param {object} newIndexes New indexes of the reordered items.
                 * @param {object} previousIndexes Previous indexes of the reordered items.
                 * @public
                 */
                this.dispatchEvent(
                    new CustomEvent('reorder', {
                        detail: {
                            items: cleanItems,
                            previousIndexes,
                            newIndexes
                        }
                    })
                );

                requestAnimationFrame(() => {
                    this._preventItemClick = false;
                });
            }
        }

        if (this._dragging || this._keyboardDragged) {
            this.computedItems.forEach((computedItem) => {
                computedItem.selected = false;
            });
            this._draggedElements = [];
        }
        this._dragging = false;
        this.clearSelection();
    }

    getPositionY(event) {
        const mouseY =
            event.type === 'touchmove'
                ? event.touches[0].clientY
                : event.clientY;
        const menuTop = this._menuTop;
        const menuBottom = this._menuBottom;

        // Make sure it is not possible to drag the item out of the menu
        let currentY;
        if (mouseY < menuTop) {
            currentY = menuTop;
        } else if (mouseY > menuBottom) {
            currentY = menuBottom;
        } else {
            currentY = mouseY;
        }
        return currentY;
    }

    /**
     * Handles a click on an item's action.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        event.stopPropagation();
        const actionName = event.detail.name;
        const itemIndex = event.currentTarget.dataset.itemIndex;
        if (!this.computedItems[itemIndex]) {
            return;
        }

        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name  Name of the action clicked.
         * @param {object} item Item clicked.
         * @param {string} targetName Name of the item.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    item: this.cleanUpItem(this.computedItems[itemIndex]),
                    targetName: this.computedItems[itemIndex].name
                }
            })
        );
    }

    handleFieldsLayoutConnected(event) {
        event.stopPropagation();
        const { name, callbacks } = event.detail;
        callbacks.setIsResizedByParent(true);
        this._setItemsSizeCallbacks.set(name, callbacks.setItemsSize);

        this.dispatchEvent(
            new CustomEvent('privatelayoutconnected', {
                detail: {
                    name,
                    callbacks: {
                        setIsResizedByParent:
                            this.setFieldsAreResizedByParent.bind(this),
                        setItemsSize: callbacks.setItemsSize
                    }
                },
                bubbles: true,
                composed: true
            })
        );
    }

    handleFieldsLayoutDisconnected(event) {
        this._setItemsSizeCallbacks.delete(event.detail.name);
    }

    handleLayoutSizeChange(event) {
        this.setDisplayWidth(event.detail.width);
    }

    /**
     * Handles a click on an item's media action.
     *
     * @param {Event} event
     */
    handleMediaActionClick(event) {
        event.stopPropagation();
        const actionName = event.detail.name;
        const itemIndex = event.currentTarget.dataset.itemIndex;

        if (!this.computedItems[itemIndex]) {
            return;
        }
        /**
         * The event fired when a user clicks on a media action.
         *
         * @event
         * @name mediaactionclick
         * @param {string} name  Name of the media action clicked.
         * @param {object} item Item clicked.
         * @param {string} targetName Name of the item.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('mediaactionclick', {
                detail: {
                    name: actionName,
                    item: this.cleanUpItem(this.computedItems[itemIndex]),
                    targetName: this.computedItems[itemIndex].name
                }
            })
        );
    }

    /**
     * Prevent anchor tag from navigating when href leads to nothing.
     *
     * @param {Event} event
     */
    handleAnchorTagClick(event) {
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }

    /**
     * Prevent ghost image on avatar drag.
     *
     * @param {Event} event
     */
    handleAvatarDragStart(event) {
        event.preventDefault();
    }

    /**
     * Handle a card render. If the list was just rendered, triggers the `handleScroll()` method after the last card has been rendered.
     */
    handleCardRendered() {
        if (this._cardRendersBeforeScrollUpdate === 1) {
            if (this._restoreScroll) {
                this.listContainer.scrollTop = this._scrollTop;
            }
            this.handleScroll();
        }

        if (this._cardRendersBeforeScrollUpdate) {
            this._cardRendersBeforeScrollUpdate -= 1;
        }
    }

    /**
     * Handle a key pressed on a checkbox item.
     *
     * @param {Event} event
     */
    handleCheckboxKeyDown(event) {
        if (event.key === 'Enter') {
            event.currentTarget.click();
        }
    }

    /**
     * Handle a key pressed on an item.
     *
     * @param {Event} event
     */
    handleKeyDown(event) {
        // If space bar is pressed, select or drop the item
        if (event.key === 'Enter') {
            this.handleItemClick(event);
        } else if (
            this.sortable &&
            (event.key === ' ' || event.key === 'Spacebar')
        ) {
            event.preventDefault();
            if (this._draggedElement) {
                this.dragEnd();
                this._keyboardDragged = false;
            } else {
                this.computedItems.forEach((computedItem) => {
                    computedItem.selected = false;
                });

                const index = Number(event.currentTarget.dataset.index);
                const item = this.computedItems[index];
                if (item) {
                    item.selected = true;
                    this._draggedElements = [event.currentTarget];
                    this.dragStart(event);
                    this._keyboardDragged = true;
                }
            }
        } else if (this.sortable && this._draggedElement) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                this.clearSelection();
            }

            // If up/down arrow is pressed, move the item
            const index = Number(event.currentTarget.dataset.elementTempIndex);
            let targetIndex;

            if (
                this._currentColumnCount === 1 &&
                this.isNotSingleLine &&
                event.key === 'ArrowDown' &&
                index + 1 < this.computedItems.length
            ) {
                targetIndex = index + 1;
            } else if (
                this._currentColumnCount === 1 &&
                this.isNotSingleLine &&
                event.key === 'ArrowUp'
            ) {
                targetIndex = index - 1;
            }

            if (targetIndex != null) {
                const targetItem = this._itemElements.find(
                    (item) =>
                        Number(item.dataset.elementTempIndex) === targetIndex
                );

                if (event.currentTarget && targetItem) {
                    event.preventDefault();
                    this.accessMoveItem(event.currentTarget, targetItem);
                }
            }
        }
    }

    /**
     * Handle the check and uncheck event on an item. Dispatch the check event.
     *
     * @param {Event} event
     */
    handleItemCheck(event) {
        event.stopPropagation();
        const itemIndex = Number(event.currentTarget.dataset.index);
        const item = this.computedItems[itemIndex];

        if (!item || !this.isCheckList || item.uncheckable) {
            return;
        }
        const checked = !item.checked;
        item.checked = checked;
        this.computedItems = [...this.computedItems];

        /**
         * The event fired when an item is checked or unchecked.
         *
         * @event
         * @name itemclick
         * @param {object}  item Item clicked.
         * @param {string}  name Name of the clicked item.
         * @param {boolean} checked True if the item is checked, false otherwise.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemcheck', {
                detail: {
                    item: this.cleanUpItem(item),
                    name: item.name,
                    checked
                }
            })
        );
    }

    /**
     * Handles a click on an item.
     * The click event will not dispatch an event if the clicked element already has a purpose (action or link).
     *
     * @param {Event} event
     */
    handleItemClick(event) {
        const itemIndex = Number(event.currentTarget.dataset.index);
        const item = this.computedItems[itemIndex];

        if (!item || event.ctrlKey || event.metaKey || this._preventItemClick) {
            return;
        }

        /**
         * The event fired when a user clicks on an item.
         *
         * @event
         * @name itemclick
         * @param {object}  item Item clicked.
         * @param {DOMRect} bounds The size and position of the item in the viewport.
         * @param {string}  name Name of the clicked item.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    item: this.cleanUpItem(item),
                    bounds: event.currentTarget.getBoundingClientRect(),
                    name: item.name
                }
            })
        );

        if (this.isCheckList) {
            this.handleItemCheck(event);
        }
    }

    /**
     * Handle an item image loading error.
     * If a fallbackSrc exists assign it to the image src attribute.
     * @param {Event} event
     */
    handleItemImageError(event) {
        const itemIndex = event.target?.dataset.itemIndex;
        const fallbackSrc = this.imageAttributes.fallbackSrc;

        // _isFallbackLoadedMap is a fix to avoid infinite image error loop.
        // Happens when the loaded img fallbackSrc is not equal to the original fallbackSrc.
        // It remembers wich item image has already loaded the fallbackSrc so it doesnt loop.
        if (
            !event.target ||
            !fallbackSrc ||
            event.target?.src === fallbackSrc ||
            itemIndex < 0 ||
            this._isFallbackLoadedMap[itemIndex]
        ) {
            return;
        }

        event.target.onerror = null;
        event.target.src = fallbackSrc;
        this._isFallbackLoadedMap[itemIndex] = true;
    }

    handleItemMouseUp(event) {
        if (event.button !== 0) {
            return;
        }

        const index = Number(event.currentTarget.dataset.index);
        const item = this.computedItems[index];

        if (!item) {
            return;
        }

        /**
         * The event fired when the mouse is released on an item.
         *
         * @event
         * @name itemmouseup
         * @param {object} item Item clicked.
         * @param {string} name Name of the item clicked.
         * @public
         * @bubbles
         */
        const itemMouseUpEvent = new CustomEvent('itemmouseup', {
            detail: {
                item: this.cleanUpItem(item),
                name: item.name
            },
            bubbles: true
        });
        itemMouseUpEvent.clientX = event.clientX;
        itemMouseUpEvent.clientY = event.clientY;
        itemMouseUpEvent.pageX = event.pageX;
        itemMouseUpEvent.pageY = event.pageY;
        this.dispatchEvent(itemMouseUpEvent);
    }

    /**
     * In the case the user loses control of the dragged element, clicking anywhere will reset the list.
     */
    handleListClick() {
        if (this._draggedElement) {
            this.clearSelection();
            this._scrollStep = 0;
        }
    }

    /**
     * Handle a click on the next page button, visible in the single-line variant.
     */
    handleNextPage() {
        const newIndex =
            this._singleLinePageFirstIndex + this._currentColumnCount;

        if (this.enableInfiniteLoading) {
            const newItems = this.computedItems.slice(
                newIndex,
                newIndex + this._currentColumnCount
            );
            if (newItems.length < this._currentColumnCount) {
                this.dispatchLoadMore();
            }
        }
        this._singleLinePageFirstIndex = newIndex;
    }

    /**
     * Handle a click on the previous page button, visible in the single-line variant.
     */
    handlePreviousPage() {
        this._singleLinePageFirstIndex -= this._currentColumnCount;

        if (this._singleLinePageFirstIndex < 0) {
            // It could happen if the currentColumnCount has changed,
            // or the number of items have changed, for example
            this._singleLinePageFirstIndex = 0;
        }
    }

    /**
     * Determine scroll position to trigger loadmore and adjust dragged item position.
     */
    handleScroll() {
        if (this.isSingleLine || !this.listContainer || this.isLoading) {
            return;
        }

        this._previousScrollTop = this._scrollTop;
        this._scrollTop = this.listContainer.scrollTop;
        this._initialY -= this._scrollTop - this._previousScrollTop;

        if (!this.enableInfiniteLoading) {
            return;
        }

        const offsetFromBottom =
            this.listContainer.scrollHeight -
            this.listContainer.scrollTop -
            this.listContainer.clientHeight;

        if (
            (offsetFromBottom <= this.loadMoreOffset && !this.isLoading) ||
            (this.listContainer.scrollTop === 0 &&
                this.listContainer.scrollHeight ===
                    this.listContainer.clientHeight &&
                !this.isLoading)
        ) {
            this.dispatchLoadMore();
        }
    }

    /**
     * Handle a keydown event on an action button. If the button is actioned, prevent the `itemclick` event from being dispatched.
     *
     * @param {Event} event `keydown` event.
     */
    handleStopKeyDown(event) {
        if (
            event.key === 'Enter' ||
            event.key === ' ' ||
            event.key === 'Spacebar'
        ) {
            event.stopPropagation();
        }
    }

    /*
     * -------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    dispatchLoadMore() {
        /**
         * The event fired when the end of the list is reached.
         *
         * @event
         * @name loadmore
         * @public
         */
        this.dispatchEvent(new CustomEvent('loadmore'));
    }
}

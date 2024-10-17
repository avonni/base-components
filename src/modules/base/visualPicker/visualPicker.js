import { LightningElement, api, track } from 'lwc';
import {
    classSet,
    generateUUID,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { equal } from 'c/utilsPrivate';
import { InteractingState, FieldConstraintApi } from 'c/inputUtils';

const VISUAL_PICKER_VARIANTS = {
    valid: ['coverable', 'non-coverable'],
    default: 'non-coverable'
};
const INPUT_TYPES = { valid: ['radio', 'checkbox'], default: 'radio' };
const VISUAL_PICKER_SIZES = {
    valid: [
        'xx-small',
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        'responsive'
    ],
    default: 'medium'
};
const VISUAL_PICKER_RATIOS = {
    valid: ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'],
    default: '1-by-1'
};

const AVATAR_POSITION = {
    valid: [
        'top',
        'bottom',
        'left',
        'right',
        'left-of-content',
        'right-of-content'
    ],
    default: 'left'
};
const AVATAR_VERTICAL_ALIGNMENT = {
    valid: ['top', 'bottom', 'center'],
    default: 'center'
};

const COLUMNS = { valid: [1, 2, 3, 4, 6, 12], default: 1 };
const DEFAULT_COLUMNS = {
    default: 12,
    small: 12,
    medium: 6,
    large: 4
};

const FIELD_VARIANTS = {
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked'],
    default: 'standard'
};

const IMAGE_CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};
const IMAGE_POSITION = {
    valid: ['top', 'bottom', 'left', 'right', 'background', 'overlay'],
    default: 'top'
};
const IMAGE_MAX_HEIGHT_REM = {
    small: {
        '1-by-1': 1,
        '4-by-3': 0.5,
        '16-by-9': 0.25,
        '3-by-4': 3.5,
        '9-by-16': 4.75
    },
    medium: {
        '1-by-1': 3,
        '4-by-3': 2.5,
        '16-by-9': 2,
        '3-by-4': 5.25,
        '9-by-16': 7
    },
    large: {
        '1-by-1': 5,
        '4-by-3': 3,
        '16-by-9': 2.25,
        '3-by-4': 6.5,
        '9-by-16': 9
    },
    'x-large': {
        '1-by-1': 6,
        '4-by-3': 3.5,
        '16-by-9': 3.25,
        '3-by-4': 8,
        '9-by-16': 10.5
    },
    'xx-large': {
        '1-by-1': 7,
        '4-by-3': 4,
        '16-by-9': 4,
        '3-by-4': 9.25,
        '9-by-16': 12.5
    }
};
const IMAGE_MAX_WIDTH_PERCENT = {
    small: 50,
    medium: 75,
    large: 100
};
const IMAGE_SIZE = {
    valid: ['small', 'medium', 'large'],
    default: 'large'
};

const DEFAULT_MIN = 0;
const DEFAULT_DISABLED = false;
const DEFAULT_HIDE_CHECK_MARK = false;
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_REQUIRED = false;

/**
 * @class
 * @descriptor avonni-visual-picker
 * @storyId example-visualpicker--base
 * @public
 */
export default class VisualPicker extends LightningElement {
    /**
     * Text label to title the visual picker.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Error message to be displayed when a range overflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeOverflow;
    /**
     * Error message to be displayed when a range underflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeUnderflow;
    /**
     * Error message to be displayed when the value is missing and input is required.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;
    /**
     * The name of the visual picker.
     *
     * @type {string}
     * @public
     * @required
     */
    @api name = generateUUID();

    _columnAttributes = {};
    _disabled = DEFAULT_DISABLED;
    _enableInfiniteLoading = false;
    _fieldAttributes = {};
    _hideBorder;
    _hideCheckMark = DEFAULT_HIDE_CHECK_MARK;
    _imageAttributes = {};
    _isLoading = false;
    @track _items = [];
    _largeContainerCols;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _max;
    _maxCount;
    _mediumContainerCols;
    _min = DEFAULT_MIN;
    _ratio = VISUAL_PICKER_RATIOS.default;
    _required = DEFAULT_REQUIRED;
    _size = VISUAL_PICKER_SIZES.default;
    _smallContainerCols;
    _type = INPUT_TYPES.default;
    _value = [];
    _variant = VISUAL_PICKER_VARIANTS.default;

    _cancelBlur = false;
    _columnSizes = {};
    _computedItems = [];
    _connected = false;
    _isCollapsed = true;
    _isFallbackLoadedMap = {};
    _itemRendersBeforeScrollUpdate = 0;
    _scrollTop = 0;

    helpMessage = '';

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;
    }

    renderedCallback() {
        if (this.inputs.length) {
            this.inputs.forEach((input) => {
                input.checked = this._value.includes(input.value);
            });
        }

        // Wait for all the items to render before checking if the bottom is reached.
        const items = this.template.querySelectorAll(
            '[data-element-id="div-item-wrapper"]'
        );
        if (!items.length) {
            this.handleScroll();
        } else {
            this._itemRendersBeforeScrollUpdate = items.length;
        }

        // Reset loaded fallback map.
        this._isFallbackLoadedMap = {};
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Column attributes: cols, smallContainerCols, mediumContainerCols, largeContainerCols
     * Number of columns depending on the width of the container. See 'cols' for accepted values.
     *
     * @type {object}
     * @public
     */
    @api
    get columnAttributes() {
        return this._columnAttributes;
    }
    set columnAttributes(value) {
        const normalizedFieldAttributes = normalizeObject(value);
        const small = this._normalizeColumnAttributes(
            normalizedFieldAttributes.smallContainerCols
        );
        const medium = this._normalizeColumnAttributes(
            normalizedFieldAttributes.mediumContainerCols
        );
        const large = this._normalizeColumnAttributes(
            normalizedFieldAttributes.largeContainerCols
        );
        const defaults = this._normalizeColumnAttributes(
            normalizedFieldAttributes.cols
        );

        // Keep same logic as in layoutItem.
        this._columnAttributes.cols = defaults || DEFAULT_COLUMNS.default;
        this._columnAttributes.smallContainerCols =
            small || defaults || DEFAULT_COLUMNS.small;
        this._columnAttributes.mediumContainerCols =
            medium || small || defaults || DEFAULT_COLUMNS.medium;
        this._columnAttributes.largeContainerCols =
            large || medium || small || defaults || DEFAULT_COLUMNS.large;

        this._columnAttributes = { ...this._columnAttributes };
    }

    /**
     * If present, the visual picker is disabled and the user cannot interact with it.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, you can load a subset of items and then display more when users scroll to the end of the picker. Use with the `loadmore` event to retrieve more items.
     * If present, `max-count` is ignored.
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

        if (this._connected) {
            this.handleScroll();
        }
    }

    /**
     * Field attributes: variant, cols
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
        const defaults = this._normalizeColumnAttributes(
            normalizedFieldAttributes.cols
        );

        // Keep same logic as in layoutItem.
        this._fieldAttributes.cols = defaults || DEFAULT_COLUMNS.default;

        this._fieldAttributes.variant = normalizeString(
            normalizedFieldAttributes.variant,
            {
                fallbackValue: FIELD_VARIANTS.default,
                validValues: FIELD_VARIANTS.valid
            }
        );
        this._fieldAttributes = { ...this._fieldAttributes };
    }

    /**
     * Deprecated. Use the styling hooks instead.
     *
     * @type {boolean}
     * @deprecated
     */
    @api
    get hideBorder() {
        return this._hideBorder;
    }
    set hideBorder(value) {
        this._hideBorder = value;
        console.warn(
            'The "hide-border" attribute is deprecated. Use the styling hooks instead.'
        );
    }

    /**
     * If present, hide the check mark when selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideCheckMark() {
        return this._hideCheckMark;
    }
    set hideCheckMark(value) {
        this._hideCheckMark = normalizeBoolean(value);
    }

    /**
     * Image attributes: fallbackSrc, cropFit, position, size and height.
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
    }

    /**
     * If present, a spinner is shown to indicate that more items are loading.
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
    }

    /**
     * Array of items with attributes populating the visual picker.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value);
        this._computedItems = [...this._items];
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the scroll position is from the end of the picker.
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
        this._loadMoreOffset = isNaN(value)
            ? DEFAULT_LOAD_MORE_OFFSET
            : parseInt(value, 10);

        if (this._connected) {
            this.handleScroll();
        }
    }

    /**
     * Maximum number of selected items.
     *
     * @type {number}
     * @default Infinity
     * @public
     */
    @api
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = isNaN(parseInt(value, 10)) ? Infinity : parseInt(value, 10);
    }

    /**
     * Maximum of items allowed in the visible list.
     * This attribute is ignored if `enable-infinite-loading` is present.
     *
     * @type {number}
     * @public
     */
    @api
    get maxCount() {
        return this._maxCount;
    }
    set maxCount(value) {
        this._maxCount = isNaN(value) ? undefined : parseInt(value, 10);
    }

    /**
     * Minimum number of selected options required.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = isNaN(parseInt(value, 10))
            ? DEFAULT_MIN
            : parseInt(value, 10);
    }

    /**
     * The ratio of the items. Valid values include 1-by-1, 4-by-3, 16-by-9, 3-by-4 and 9-by-16.
     *
     * @type {string}
     * @public
     * @default 1-by-1
     */
    @api
    get ratio() {
        return this._ratio;
    }
    set ratio(ratio) {
        this._ratio = normalizeString(ratio, {
            fallbackValue: VISUAL_PICKER_RATIOS.default,
            validValues: VISUAL_PICKER_RATIOS.valid
        });
    }

    /**
     * If present, at least one item must be selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * The size of the items. Valid values include xx-small (4rem x 4 rem), x-small (6rem x 6 rem), small (8rem x 8rem), medium (12rem x 12rem), large (15rem x 15rem), x-large (18rem x 18rem), xx-large (21rem x 21rem) and responsive. Only avatar appears when x-small and xx-small.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: VISUAL_PICKER_SIZES.default,
            validValues: VISUAL_PICKER_SIZES.valid
        });
    }

    /**
     * It defines the type of input. Valid values include radio and checkbox.
     *
     * @type {string}
     * @public
     * @default radio
     */
    @api
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: INPUT_TYPES.default,
            validValues: INPUT_TYPES.valid
        });
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraint.validity;
    }

    /**
     * Value of the selected item. For the checkbox type, the value can be an array. Ex: [value1, value2], 'value1' or ['value1']
     *
     * @type {(string|string[])}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        const normalizedValue =
            typeof value === 'string' ? [value] : normalizeArray(value);
        if (equal(normalizedValue, this._value)) {
            return;
        }
        this._value = normalizedValue;
    }

    /**
     * Changes the appearance of the item when selected. Valid values include coverable and non-coverable.
     *
     * @type {string}
     * @public
     * @default non-coverable
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VISUAL_PICKER_VARIANTS.default,
            validValues: VISUAL_PICKER_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Default number of columns on smallest container widths. Valid values include 1, 2, 3, 4, 6 and 12.
     *
     * @type {number}
     */
    get cols() {
        return this.isResponsive ? this.columnAttributes.cols : null;
    }

    /**
     * Computed CSS classes for the div wrapping the loading spinner and the show more/less button.
     *
     * @type {string}
     */
    get computedButtonSpinnerWrapperClass() {
        const classes = classSet('slds-is-relative').add({
            'avonni-visual-picker__loading-spinner':
                this.isLoading && !this.showMoreButton,
            'slds-show_inline-block': this.isLoading && this.showMoreButton
        });

        if (this.isLoading && !this.showMoreButton) {
            classes.add(`avonni-visual-picker__item_size-${this.size}`);
        }
        return classes.toString();
    }

    /**
     * Computed check icon container class styling.
     *
     * @type {string}
     */
    get computedCheckIconContainerClass() {
        return classSet('slds-icon_container slds-visual-picker__text-check')
            .add({
                'avonni-visual-picker__chek-icon': this.isResponsive
            })
            .toString();
    }

    /**
     * Computed object fit class to images.
     *
     * @type {string}
     */
    get computedImageMediaClass() {
        return classSet('avonni-visual-picker__figure-image')
            .add(
                `avonni-visual-picker__figure-image_object-fit-${this.imageAttributes.cropFit}`
            )
            .toString();
    }

    /**
     * Compute visual picker class styling based on selected attributes. ( orientation, size, ratio)
     *
     * @type {string}
     */
    get computedVisualPickerClass() {
        return classSet('slds-visual-picker slds-m-top_small')
            .add(`avonni-visual-picker_${this.size}`)
            .add(`ratio-${this.ratio}`)
            .add({ 'slds-p-right_small': this.isResponsive })
            .toString();
    }

    /**
     * Computed visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get computedVisualPickerTypeClass() {
        return classSet(
            'slds-visual-picker__figure avonni-visual-picker__figure'
        )
            .add({
                'slds-visual-picker__text': !this.isCoverable,
                'slds-visual-picker__icon': this.isCoverable,
                'avonni-hide-check-mark': this.hideCheckMark,
                'slds-align_absolute-center': !this.isResponsive
            })
            .toString();
    }

    /**
     * Validation with constraint Api.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && this.value.length === 0,
                rangeUnderflow: () =>
                    this.type === 'checkbox' &&
                    this.numberOfMainItemsSelected < this.min,
                rangeOverflow: () =>
                    this.type === 'checkbox' &&
                    this.numberOfMainItemsSelected > this.max
            });
        }
        return this._constraintApi;
    }

    /**
     * Icon name of the show more/less button.
     *
     * @type {string}
     */
    get currentShowButtonIconName() {
        return this._isCollapsed ? 'utility:down' : 'utility:up';
    }

    /**
     * Label of the show more/less button.
     *
     * @type {string}
     */
    get currentShowButtonLabel() {
        return this._isCollapsed ? 'Show more' : 'Show less';
    }

    /**
     * Get input.
     *
     * @type {Element}
     */
    get input() {
        return this.template.querySelector('[data-element-id="input"]');
    }

    /**
     * Get all inputs.
     *
     * @type {Element}
     */
    get inputs() {
        return Array.from(
            this.template.querySelectorAll('[data-element-id="input"]')
        );
    }

    /**
     * Verify if size is bigger than x-small.
     *
     * @type {boolean}
     */
    get isBiggerThanXSmall() {
        return !(this.size === 'x-small' || this.size === 'xx-small');
    }

    /**
     * Verify if variant is coverable.
     *
     * @type {boolean}
     */
    get isCoverable() {
        return this.variant === 'coverable';
    }

    /**
     * Verify if size is responsive.
     *
     * @type {boolean}
     */
    get isResponsive() {
        return this.size === 'responsive';
    }

    /**
     * Number of columns on large container widths and above. See `cols` for accepted values.
     *
     * @type {number}
     */
    get largeContainerCols() {
        return this.isResponsive
            ? this.columnAttributes.largeContainerCols
            : null;
    }

    /**
     * Number of columns on medium container widths. See `cols` for accepted values.
     *
     * @type {number}
     */
    get mediumContainerCols() {
        return this.isResponsive
            ? this.columnAttributes.mediumContainerCols
            : null;
    }

    /**
     * Return the number of selected items.
     *
     * @type {number}
     */
    get numberOfMainItemsSelected() {
        if (this.type === 'radio') return this.value ? 1 : 0;
        return this.items
            .map(({ value }) => value)
            .filter((value) => this.value.includes(value)).length;
    }

    /**
     * True of the max count show more/less button is visible, or if the component is loading.
     *
     * @type {boolean}
     * @default false
     */
    get showButtonOrSpinner() {
        return this.isLoading || this.showMoreButton;
    }

    /**
     * True if the show more/less button should be visible.
     *
     * @type {boolean}
     */
    get showMoreButton() {
        return (
            !this.enableInfiniteLoading &&
            !isNaN(this.maxCount) &&
            this.items.length > this.maxCount
        );
    }

    /**
     * Number of columns on small container widths. See `cols` for accepted values.
     *
     * @type {number}
     */
    get smallContainerCols() {
        return this.isResponsive
            ? this.columnAttributes.smallContainerCols
            : null;
    }

    /**
     * Computed list items
     *
     * @type {object[]}
     */
    get visibleItems() {
        const items = this._computedItems.map((item) => {
            let {
                avatar,
                avatarPosition,
                avatarVerticalAlignment,
                description,
                descriptionPosition,
                disabled,
                fields,
                hasHiddenTags,
                hidden,
                imgAlternativeText,
                imgSrc,
                itemDescription,
                itemTitle,
                tags,
                title,
                titlePosition,
                value
            } = item;
            const maxReached =
                this.type === 'checkbox' &&
                this.max !== 1 &&
                this.value.length >= this.max;
            const isUnselectedOption =
                this.type === 'checkbox' && !this.value.includes(value);
            disabled =
                this._disabled ||
                disabled ||
                (maxReached && isUnselectedOption);

            // Check management
            const checked = this._value.includes(value);
            const displayCheckCoverable =
                !this.hideCheckMark && checked && this.isCoverable;
            const displayCheckNonCoverable =
                !this.hideCheckMark && checked && !this.isCoverable;
            const computedSelectedClass = this.isResponsive
                ? 'slds-is-selected avonni-visual-picker__check_absolute-center'
                : 'slds-is-selected';

            // Title management
            titlePosition = titlePosition || 'center';
            const displayTitle = title && this.isBiggerThanXSmall;
            const titleIsTop = titlePosition === 'top' && displayTitle;
            const titleIsCenter = titlePosition === 'center' && displayTitle;
            const titleIsBottom = titlePosition === 'bottom' && displayTitle;

            const titleTopHidden = !titleIsTop;
            const titleCenterHidden = !titleIsCenter;
            const titleBottomHidden = !titleIsBottom;

            // Description management
            descriptionPosition = descriptionPosition || 'center';
            const displayDescription = description && this.isBiggerThanXSmall;
            const descriptionIsTop =
                descriptionPosition === 'top' && displayDescription;
            const descriptionIsCenter =
                descriptionPosition === 'center' && displayDescription;
            const descriptionIsBottom =
                descriptionPosition === 'bottom' && displayDescription;

            const descriptionTopHidden = !descriptionIsTop;
            const descriptionCenterHidden = !descriptionIsCenter;
            const descriptionBottomHidden = !descriptionIsBottom;

            // Avatar management
            avatarPosition = normalizeString(avatarPosition, {
                fallbackValue: AVATAR_POSITION.default,
                validValues: AVATAR_POSITION.valid
            });
            const displayAvatar =
                this.isBiggerThanXSmall &&
                avatar &&
                (avatar.imgSrc || avatar.initials || avatar.iconName);
            const avatarIsHorizontal =
                displayAvatar &&
                (avatarPosition === 'left-of-content' ||
                    avatarPosition === 'right-of-content');
            const avatarAltText = displayAvatar
                ? avatar.alternativeText ||
                  avatar.iconName ||
                  avatar.initials ||
                  'avatar'
                : '';
            const avatarIsTop = avatarPosition === 'top' && displayAvatar;
            const avatarIsBottom = avatarPosition === 'bottom' && displayAvatar;
            const avatarIsCenter =
                avatar &&
                !avatarIsHorizontal &&
                (avatarPosition === 'center' ||
                    !this.isBiggerThanXSmall ||
                    (!avatarIsBottom && !avatarIsTop && !displayTitle));

            const avatarTopHidden = !avatarIsTop;
            const avatarCenterHidden = !avatarIsCenter;
            const avatarBottomHidden = !avatarIsBottom;

            avatarVerticalAlignment = normalizeString(avatarVerticalAlignment, {
                fallbackValue: AVATAR_VERTICAL_ALIGNMENT.default,
                validValues: AVATAR_VERTICAL_ALIGNMENT.valid
            });

            // Header management
            const headerIsTop = avatarIsTop || titleIsTop || descriptionIsTop;
            const headerIsCenter =
                avatarIsCenter || titleIsCenter || descriptionIsCenter;
            const headerIsBottom =
                avatarIsBottom || titleIsBottom || descriptionIsBottom;

            // Fields management
            const hasFields =
                this.isBiggerThanXSmall && fields && fields.length > 0;

            // Tag management
            const hasTags =
                this.isBiggerThanXSmall &&
                Array.isArray(tags) &&
                tags.length > 0;

            // Image management
            let imgPosition = this.imageAttributes.position;
            imgSrc = imgSrc || this.imageAttributes.fallbackSrc;

            // With image position == background or overlay,
            // if the image is missing fallback to default list layout.
            if (
                !imgSrc &&
                (imgPosition === 'background' || imgPosition === 'overlay')
            ) {
                imgPosition = 'top';
            }

            // Image positioning
            const hasImg = imgSrc && this.isBiggerThanXSmall;

            const imgIsHorizontal =
                hasImg && (imgPosition === 'left' || imgPosition === 'right');
            const imgIsBackground =
                hasImg &&
                (imgPosition === 'background' || imgPosition === 'overlay');
            const layoutIsHorizontal = imgIsHorizontal || imgIsBackground;

            const imgIsTop =
                hasImg &&
                imgPosition === 'top' &&
                !layoutIsHorizontal &&
                !titleIsTop;
            const imgIsBottom =
                hasImg &&
                imgPosition === 'bottom' &&
                !layoutIsHorizontal &&
                !titleIsBottom &&
                !hasTags;
            const imgIsCenter =
                hasImg && !layoutIsHorizontal && !imgIsTop && !imgIsBottom;

            // Class and styling management
            const computedBodyLayoutStyle = this._computeLayoutContainerStyle(
                imgIsHorizontal,
                imgIsBackground,
                false
            );
            const computedImgLayoutStyle = this._computeLayoutContainerStyle(
                imgIsHorizontal,
                imgIsBackground,
                true
            );
            const computedImgContainerStyle = this._computeImageContainerStyle(
                imgIsHorizontal,
                imgIsBackground
            );
            const computedImgStyle = this._computeImageStyle(
                imgIsHorizontal,
                imgIsBackground
            );

            const computedNotSelectedClass = this._computeNotSelectedClass(
                imgPosition,
                value
            );
            const computedBodyClass = this._computeBodyClass(imgIsBackground);
            const computedBodyContentTopClass =
                this._computeVisualPickerItemsClass(imgIsTop, false);
            const computedBodyContentCenterClass =
                this._computeVisualPickerItemsClass(imgIsCenter, hasFields);
            const computedBodyContentBottomClass =
                this._computeVisualPickerItemsClass(imgIsBottom, false);

            const hasBodyContent =
                displayTitle ||
                displayDescription ||
                displayAvatar ||
                hasTags ||
                hasFields ||
                (hasImg && !imgIsBackground);

            const hasTitleOrDescription = itemTitle || itemDescription;

            return {
                avatar,
                avatarAltText,
                avatarBottomHidden,
                avatarCenterHidden,
                avatarPosition,
                avatarTopHidden,
                avatarVerticalAlignment,
                checked,
                computedBodyClass,
                computedBodyContentBottomClass,
                computedBodyContentCenterClass,
                computedBodyContentTopClass,
                computedBodyLayoutStyle,
                computedImgContainerStyle,
                computedImgLayoutStyle,
                computedImgStyle,
                computedNotSelectedClass,
                computedSelectedClass,
                description,
                descriptionBottomHidden,
                descriptionCenterHidden,
                descriptionTopHidden,
                disabled,
                displayCheckCoverable,
                displayCheckNonCoverable,
                fields,
                hasBodyContent,
                hasFields,
                hasHiddenTags,
                hasTags,
                hasTitleOrDescription,
                headerIsBottom,
                headerIsCenter,
                headerIsTop,
                imgAlternativeText,
                imgIsBottom,
                imgIsCenter,
                imgIsTop,
                imgPosition,
                imgSrc,
                itemDescription,
                itemTitle,
                layoutIsHorizontal,
                tags,
                title,
                titleBottomHidden,
                titleCenterHidden,
                titleTopHidden,
                value,
                visible: !hidden
            };
        });

        return this.showMoreButton && this._isCollapsed
            ? items.slice(0, this.maxCount)
            : items;
    }

    /**
     * Get the visual picker container DOM elements.
     *
     * @type {Element}
     */
    get visualPickerContainer() {
        return this.template.querySelector(
            '[data-element-id="div-items-wrapper"]'
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes keyboard focus from the input element.
     *
     * @public
     */
    @api
    blur() {
        this.input.blur();
    }

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} Indicates whether the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Sets focus on the input element.
     *
     * @public
     */
    @api
    focus() {
        this.input.focus();
    }

    /**
     * Retrieve the current error message. If it is null than the input is valid.
     *
     * @returns {string} Current input error message.
     * @public
     */
    @api
    getErrorMessage() {
        this.reportValidity();
        return this.helpMessage;
    }

    /**
     * Displays the error messages and returns false if the input is invalid.
     * If the input is valid, reportValidity() clears displayed error messages and returns true.
     *
     * @returns {boolean} - The validity status of the input fields.
     * @public
     */
    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = message;
        });
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message - The string that describes the error.
     * If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when checkValidity() is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Computed items body content class styling.
     *
     * @param {boolean} imgIsBackground
     * @returns {string}
     */
    _computeBodyClass(imgIsBackground) {
        return classSet('avonni-visual-picker__figure-body')
            .add({
                'avonni-visual-picker__figure-body-image-background':
                    imgIsBackground
            })
            .toString();
    }

    /**
     * Compute image container styling.
     *
     * @param {boolean} imgIsHorizontal
     * @param {boolean} imgIsBackground
     * @returns {string}
     */
    _computeImageContainerStyle(imgIsHorizontal, imgIsBackground) {
        let widthStyle = 'width: 100%;';
        let heightStyle = 'height: 100%;';

        if (
            !imgIsHorizontal &&
            this.isBiggerThanXSmall &&
            !this.isResponsive &&
            !imgIsBackground
        ) {
            const maxHeightInRem = IMAGE_MAX_HEIGHT_REM[this.size][this.ratio];
            let heightInPx = this.imageAttributes.height;
            let heightSize = heightInPx
                ? `min(${heightInPx}px, ${maxHeightInRem}rem)`
                : `${maxHeightInRem}rem`;

            heightStyle = `height: ${heightSize};`;
        }
        return `${heightStyle} ${widthStyle}`;
    }

    /**
     * Compute image styling.
     *
     * @param {boolean} imgIsHorizontal
     * @param {boolean} imgIsBackground
     * @returns {string}
     */
    _computeImageStyle(imgIsHorizontal, imgIsBackground) {
        const objectFit = `object-fit: ${this.imageAttributes.cropFit};`;
        let widthStyle = 'width: 100%;';
        let heightStyle = 'height: 100%;';

        const size = this.imageAttributes.size || this.size;
        if (size && this.ratio) {
            // Size controls the width for image positions left and right. Otherwise, it controls the height.
            // The height is only used for image positions top, bottom, background and overlay.
            let heightInPx = this.imageAttributes.height;
            let sizeInPercent = IMAGE_MAX_WIDTH_PERCENT[size]
                ? IMAGE_MAX_WIDTH_PERCENT[size]
                : 0;
            let imageSize = `${sizeInPercent}%`;
            if (!imgIsHorizontal) {
                if (heightInPx > 0) {
                    // If present, the height overrides the size value
                    imageSize = `${heightInPx}px`;
                } else if (imgIsBackground) {
                    widthStyle = `width: ${imageSize}; min-width: ${imageSize};`;
                }
                heightStyle = `height: ${imageSize}; min-height: ${imageSize};`;
            }
        }
        return `${heightStyle} ${widthStyle} ${objectFit}`;
    }

    /**
     * Compute item layout container styling. If the image position is left or right, the item content layout will be split into two columns.
     *
     * @param {boolean} imgIsHorizontal
     * @param {boolean} imgIsBackground
     * @param {boolean} hasImage
     * @returns {string}
     */
    _computeLayoutContainerStyle(imgIsHorizontal, imgIsBackground, hasImage) {
        let heightStyle = '';
        let widthStyle = '';
        if (!imgIsBackground) {
            let percent;
            if (!this.isBiggerThanXSmall || !imgIsHorizontal) {
                percent = 100;
            } else {
                const size = this.imageAttributes.size || this.size;
                // The image max width in the horizontal layout should be 50% of the parent container width
                percent = size ? IMAGE_MAX_WIDTH_PERCENT[size] * 0.5 : 50;
                if (!hasImage) {
                    percent = 100 - percent;
                }
            }
            if (percent) {
                widthStyle = `width: ${percent}%;`;
            }
            heightStyle = imgIsHorizontal ? 'height: 100%;' : '';
        }
        return `${heightStyle} ${widthStyle}`;
    }

    /**
     * Computed NOT selected class styling.
     *
     * @param {string} imgPosition
     * @param {string} itemValue
     * @returns {string}
     */
    _computeNotSelectedClass(imgPosition, itemValue) {
        const isSelected = this.value.includes(itemValue);
        return classSet(
            'avonni-visual-picker__figure-container avonni-visual-picker__height'
        )
            .add({
                'slds-is-not-selected': this.isCoverable && !this.hideCheckMark,
                'avonni-visual-picker__figure-container-reverse':
                    imgPosition === 'right',
                'avonni-visual-picker__figure-image-background':
                    this.isBiggerThanXSmall &&
                    (imgPosition === 'background' ||
                        (isSelected && imgPosition === 'overlay')),
                'avonni-visual-picker__figure-image-overlay':
                    this.isBiggerThanXSmall &&
                    imgPosition === 'overlay' &&
                    !isSelected
            })
            .toString();
    }

    /**
     * Compute visual picker items class styling based on size attributes and presence of image and fields.
     *
     * @param {boolean} hasImg
     * @param {boolean} hasFields
     * @type {string}
     */
    _computeVisualPickerItemsClass(hasImg, hasFields) {
        return classSet('slds-has-flexi-truncate')
            .add({
                'avonni-visual-picker__items':
                    !this.isResponsive || (this.isResponsive && !hasImg),
                'avonni-visual-picker__items_responsive_image':
                    this.isResponsive && hasImg,
                'avonni-visual-picker__items_responsive_image-fields':
                    this.isResponsive && hasImg && hasFields
            })
            .toString();
    }

    /**
     * Only accept predetermined number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    _normalizeColumns(value) {
        const numValue = parseInt(value, 10);
        return COLUMNS.valid.includes(numValue) ? numValue : null;
    }

    /**
     * Inverse logic of number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    _normalizeColumnAttributes(value) {
        const normalizedCols = this._normalizeColumns(value);
        return normalizedCols
            ? 12 / Math.pow(2, Math.log2(normalizedCols))
            : null;
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handles the blur event.
     */
    handleBlur() {
        this.interactingState.leave();
    }

    /**
     * Change event handler.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();
        const oldValue = this._value;
        this._value =
            this.type === 'radio'
                ? event.target.value
                : this.inputs
                      .filter((input) => input.checked)
                      .map((input) => input.value);

        // Exception if checkbox max = 1, unselect last option and select the clicked one.
        // Looking to have the same behaviour as radio buttons + being able to deselect the option.
        if (
            this.max === 1 &&
            this.validity.rangeOverflow &&
            oldValue.length < this.value.length
        ) {
            this._value = this.value.filter(
                (value) => !oldValue.includes(value)
            );
        }

        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string|string[]} value Selected items' value. Returns an array of string if the type is checkbox. Returns a string otherwise.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    /**
     * Handle the click on an item. Dispatch the itemclick event.
     *
     * @param {Event} event
     */
    handleClick(event) {
        /**
         * The event fired when an item is clicked.
         *
         * @event
         * @name itemclick
         * @param {string} value Clicked item value.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    value: event.currentTarget.value
                }
            })
        );
    }

    /**
     * Dispatches the focus event.
     */
    handleFocus() {
        this.interactingState.enter();
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

    /**
     * Handle an iten render. If the visual picker was just rendered, triggers the `handleScroll()` method after the last item has been rendered.
     */
    handleItemRendered() {
        if (this._itemRendersBeforeScrollUpdate === 1) {
            if (this.enableInfiniteLoading) {
                this.visualPickerContainer.scrollTop = this._scrollTop;
            }
            this.handleScroll();
        }

        if (this._itemRendersBeforeScrollUpdate) {
            this._itemRendersBeforeScrollUpdate -= 1;
        }
    }

    /**
     * Input keyup event handler.
     *
     * @param {Event} event
     */
    handleKeyUp(event) {
        if (event.key !== 'Enter') return;
        event.currentTarget.click();
    }

    /**
     * Handle the mouse enter event.
     */
    handleMouseEnter() {
        this._cancelBlur = true;
    }

    /**
     * Handle the mouse leave event.
     */
    handleMouseLeave() {
        this._cancelBlur = false;
    }

    /**
     * Handle the scroll of the items wrapper.
     */
    handleScroll() {
        if (!this.enableInfiniteLoading || this.isLoading) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } =
            this.visualPickerContainer;
        const offsetFromBottom = scrollHeight - scrollTop - clientHeight;
        const noScrollBar = scrollTop === 0 && scrollHeight === clientHeight;
        this._scrollTop = scrollTop;

        if (offsetFromBottom <= this.loadMoreOffset || noScrollBar) {
            /**
             * The event fired when you scroll to the end of the visual picker. This event is fired only if `enable-infinite-loading` is true.
             *
             * @event
             * @name loadmore
             * @public
             */
            this.dispatchEvent(new CustomEvent('loadmore'));
        }
    }

    /**
     * Handle a click on the show more/less button.
     */
    handleToggleShowMoreButton() {
        /**
         * The event fired when the show more/less button is clicked.
         *
         * @event
         * @name itemsvisibilitytoggle
         * @param {boolean} show True if items are currently hidden and the click was meant to show more of them. False if the click was meant to hide the visible items.
         * @param {number} visibleItemsLength Length of the currently visible items.
         * @public
         * @cancelable
         */
        const event = new CustomEvent('itemsvisibilitytoggle', {
            detail: {
                show: this._isCollapsed,
                visibleItemsLength: this.visibleItems.length
            },
            cancelable: true
        });
        this.dispatchEvent(event);

        if (!event.defaultPrevented) {
            this._isCollapsed = !this._isCollapsed;
        }
    }
}

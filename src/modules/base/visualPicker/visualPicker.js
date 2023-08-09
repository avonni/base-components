/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api, track } from 'lwc';
import { classSet, generateUUID } from 'c/utils';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray,
    normalizeObject
} from 'c/utilsPrivate';
import { InteractingState, FieldConstraintApi } from 'c/inputUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';

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
    valid: ['top', 'bottom', 'left', 'content-left', 'right', 'content-right'],
    default: 'left'
};
const AVATAR_VERTICAL_ALIGNMENT = {
    valid: ['top', 'bottom', 'center'],
    default: 'center'
};

const COLUMNS = { valid: [1, 2, 3, 4, 6, 12], default: 1 };
const DEFAULT_FIELD_COLUMNS = {
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
const IMAGE_SIZE = {
    valid: ['small', 'medium', 'large'],
    default: 'large'
};

const DEFAULT_REQUIRED = false;
const DEFAULT_DISABLED = false;
const DEFAULT_HIDE_CHECK_MARK = false;

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
     * Error message to be displayed when no item is selected and the required attribute is set to true.
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

    _disabled = DEFAULT_DISABLED;
    _fieldAttributes = {};
    _hideBorder;
    _hideCheckMark = DEFAULT_HIDE_CHECK_MARK;
    _imageAttributes = {};
    @track _items = [];
    _ratio = VISUAL_PICKER_RATIOS.default;
    _required = DEFAULT_REQUIRED;
    _size = VISUAL_PICKER_SIZES.default;
    _type = INPUT_TYPES.default;
    _value = [];
    _variant = VISUAL_PICKER_VARIANTS.default;

    _connected = false;
    _computedItems = [];
    _itemHeightInRem = {
        small: {
            '1-by-1': 8,
            '4-by-3': 6,
            '16-by-9': 4.5,
            '3-by-4': 10.66,
            '9-by-16': 14.22
        },
        medium: {
            '1-by-1': 12,
            '4-by-3': 7.5,
            '16-by-9': 5.625,
            '3-by-4': 16,
            '9-by-16': 21.3
        },
        large: {
            '1-by-1': 15,
            '4-by-3': 9,
            '16-by-9': 6.75,
            '3-by-4': 20,
            '9-by-16': 26.66
        },
        'x-large': {
            '1-by-1': 18,
            '4-by-3': 10.5,
            '16-by-9': 10.125,
            '3-by-4': 24,
            '9-by-16': 32
        },
        'xx-large': {
            '1-by-1': 21,
            '4-by-3': 12,
            '16-by-9': 11.8125,
            '3-by-4': 28,
            '9-by-16': 37.3333
        }
    };
    _imageContainerHeightInRem = {
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
    _imageHeightSize = {
        small: 48,
        medium: 96,
        large: 192,
        'x-large': 384,
        'xx-large': 768
    };
    _isFallbackLoadedMap = {};
    _resizeObserver;

    displayImg = false;
    displayImgC = false;
    displayImgT = false;
    helpMessage;

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

        if (this.inputs) {
            this.inputs.forEach((input) => {
                if (this._value.indexOf(input.value) > -1) {
                    input.checked = true;
                } else {
                    input.checked = false;
                }
            });
        }

        // Reset loaded fallback map.
        this._isFallbackLoadedMap = {};
    }

    connectedCallback() {
        this._connected = true;
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this.recomputeTags();
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

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
        const defaults = this.normalizeFieldColumns(
            normalizedFieldAttributes.cols
        );

        // Keep same logic as in layoutItem.
        this._fieldAttributes.cols = defaults || DEFAULT_FIELD_COLUMNS.default;

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

        if (this._connected) {
            this.recomputeTags();
        }
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
        this._value =
            typeof value === 'string' ? [value] : normalizeArray(value);
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
     * Get the wrapper DOM elements.
     *
     * @type {Element}
     */
    get wrapperElement() {
        return this.template.querySelector('[data-element-id="fieldset"]');
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
     * Computed list items
     *
     * @type {object[]}
     */
    get listItems() {
        return this._computedItems.map((item, index) => {
            let {
                avatar,
                avatarPosition,
                avatarVerticalAlignment,
                description,
                descriptionPosition,
                disabled,
                fields,
                hasHiddenTags,
                imgAlternativeText,
                imgSrc,
                itemDescription,
                itemTitle,
                tags,
                title,
                titlePosition,
                value
            } = item;
            const key = `visual-picker-key-${index}`;
            disabled = this._disabled ? true : disabled;

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

            // Description management
            descriptionPosition = descriptionPosition || 'center';
            const displayDescription = description && this.isBiggerThanXSmall;
            const descriptionIsTop =
                descriptionPosition === 'top' && displayDescription;
            const descriptionIsCenter =
                descriptionPosition === 'center' && displayDescription;
            const descriptionIsBottom =
                descriptionPosition === 'bottom' && displayDescription;
            const computedDescriptionClass = classSet(
                'avonni-visual-picker__figure-description slds-line-clamp'
            ).add({
                'slds-p-around_small': this.truncateRatio,
                'slds-p-horizontal_xx-small':
                    descriptionPosition === titlePosition && !this.truncateRatio
            });

            // Fields management
            const hasFields = fields && fields.length > 0;

            // Avatar management
            avatarPosition = normalizeString(avatarPosition, {
                fallbackValue: AVATAR_POSITION.default,
                validValues: AVATAR_POSITION.valid
            });
            const displayAvatar = avatar && this.isBiggerThanXSmall;
            const avatarIsHorizontal =
                displayAvatar &&
                (avatarPosition === 'content-left' ||
                    avatarPosition === 'content-right');
            const displayTitleAvatar = !avatarIsHorizontal;
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
                displayTitleAvatar &&
                (avatarPosition === 'center' ||
                    !this.isBiggerThanXSmall ||
                    (!avatarIsBottom && !avatarIsTop && !displayTitle));

            avatarVerticalAlignment = normalizeString(avatarVerticalAlignment, {
                fallbackValue: AVATAR_VERTICAL_ALIGNMENT.default,
                validValues: AVATAR_VERTICAL_ALIGNMENT.valid
            });

            const avatarClass = this.computeAvatarClass(
                avatarVerticalAlignment
            );

            // Tag management
            const hasTags = tags && Array.isArray(tags) && tags.length > 0;

            // Image management
            let imgPosition = this.imageAttributes.position;
            imgSrc = imgSrc || this.imageAttributes.fallbackSrc;

            // With image position == background or overlay,
            // if the image is missing fallback to default list layout.
            const layoutRequiresImage =
                imgPosition === 'background' || imgPosition === 'overlay';
            if (!imgSrc && layoutRequiresImage) {
                imgPosition = 'top';
            }

            // Image positioning
            const hasImg = imgSrc && this.isBiggerThanXSmall;

            const imgIsHorizontal =
                hasImg && (imgPosition === 'left' || imgPosition === 'right');
            const displayImgBackground =
                hasImg &&
                (imgPosition === 'background' || imgPosition === 'overlay');
            const layoutIsHorizontal = imgIsHorizontal || displayImgBackground;

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
            this.displayImgC = imgIsCenter;
            this.displayImgT = imgIsTop;

            const layoutContainerStyle = this.computeItemLayoutContainerStyle(
                imgIsHorizontal,
                displayImgBackground
            );
            const imgStyle = this.computeImageStyle(
                imgIsHorizontal,
                displayImgBackground
            );
            const imgContainerStyle = this.computeImageContainerStyle(
                imgIsHorizontal,
                displayImgBackground
            );

            const notSelectedClass = this.computeNotSelectedClass(
                imgPosition,
                value
            );
            const bodyContainerClass =
                this.computeBodyContainerClass(avatarPosition);
            const itemsContainerClass =
                this.computeItemsContainerClass(displayImgBackground);

            return {
                key,
                itemTitle,
                avatar,
                itemDescription,
                disabled,
                value,
                checked,
                avatarPosition,
                avatarClass,
                avatarVerticalAlignment,
                avatarIsTop,
                avatarIsCenter,
                avatarIsBottom,
                avatarIsHorizontal,
                avatarAltText,
                bodyContainerClass,
                displayCheckCoverable,
                displayCheckNonCoverable,
                title,
                titleIsTop,
                titleIsBottom,
                titleIsCenter,
                description,
                descriptionIsTop,
                descriptionIsBottom,
                descriptionIsCenter,
                displayTitleAvatar,
                hasHiddenTags,
                tags,
                imgAlternativeText,
                imgIsBottom,
                imgIsCenter,
                imgContainerStyle,
                imgIsTop,
                imgPosition,
                imgSrc,
                imgStyle,
                itemsContainerClass,
                layoutIsHorizontal,
                computedSelectedClass,
                computedDescriptionClass,
                fields,
                hasFields,
                layoutContainerStyle,
                notSelectedClass
            };
        });
    }

    /**
     * Compute visual picker class styling based on selected attributes. ( orientation, size, ratio)
     *
     * @type {string}
     */
    get visualPickerClass() {
        return classSet('slds-visual-picker')
            .add(`avonni-visual-picker_${this._size}`)
            .add(`ratio-${this._ratio}`)
            .add({ 'slds-m-around_none': this.isResponsive })
            .toString();
    }

    /**
     * Compute visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get visualPickerTypeClass() {
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
     * Compute visual picker items class styling based on size attributes and presence of image.
     *
     * @type {string}
     */
    get visualPickerItemsClass() {
        return classSet('slds-has-flexi-truncate')
            .add({
                'avonni-visual-picker__items':
                    this.size !== 'responsive' ||
                    (this.size === 'responsive' && !this.displayImg),
                'avonni-visual-picker__items_responsive':
                    this.size === 'responsive' && this.displayImg
            })
            .toString();
    }

    /**
     * Compute visual picker items class styling based on size attributes and presence of image.
     *
     * @type {string}
     */
    get visualPickerItemsClassTop() {
        return classSet('slds-has-flexi-truncate')
            .add({
                'avonni-visual-picker__items':
                    this.size !== 'responsive' ||
                    (this.size === 'responsive' && !this.displayImgT),
                'avonni-visual-picker__items_responsive_image':
                    this.size === 'responsive' && this.displayImgT
            })
            .toString();
    }

    /**
     * Compute visual picker items class styling based on size attributes and presence of image.
     *
     * @type {string}
     */
    get visualPickerItemsClassCenter() {
        return classSet('slds-has-flexi-truncate')
            .add({
                'avonni-visual-picker__items':
                    this.size !== 'responsive' ||
                    (this.size === 'responsive' && !this.displayImgC),
                'avonni-visual-picker__items_responsive_image':
                    this.size === 'responsive' && this.displayImgC
            })
            .toString();
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
     * Add horizontal padding when size is responsive.
     *
     * @type {string}
     */
    get responsivePadding() {
        return this.isResponsive ? 'horizontal-small' : '';
    }

    /**
     * Pull boundary small if size is responsive.
     *
     * @type {string}
     */
    get responsivePullBoundary() {
        return this.isResponsive ? 'small' : '';
    }

    /**
     * Verify if is a truncate description ratio.
     *
     * @type {boolean}
     */
    get truncateRatio() {
        return (
            (this._ratio === '4-by-3' || this._ratio === '16-by-9') &&
            !this.isResponsive
        );
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
     * Get input.
     *
     * @type {Element}
     */
    get input() {
        return this.template.querySelector('[data-element-id="input"]');
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
                    !this.disabled && this.required && this.value.length === 0
            });
        }
        return this._constraintApi;
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
     * Sets focus on the input element.
     *
     * @public
     */
    @api
    focus() {
        this.input.focus();
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
     * Compute avatar styling.
     *
     * @param {string} verticalAlignment
     * @returns {string}
     */
    computeAvatarClass(verticalAlignment) {
        return classSet(
            'avonni-visual-picker__figure-avatar slds-grid slds-p-around_xx-small'
        )
            .add({
                'slds-grid_vertical-align-start': verticalAlignment === 'top',
                'slds-grid_vertical-align-center':
                    verticalAlignment === 'center',
                'slds-grid_vertical-align-end': verticalAlignment === 'bottom'
            })
            .toString();
    }

    /**
     * Computed body container class styling
     *
     * @param {string} avatarPosition
     * @returns {string}
     */
    computeBodyContainerClass(avatarPosition) {
        return classSet('avonni-visual-picker__figure-body-container')
            .add({
                'avonni-visual-picker__figure-body-container-horizontal':
                    avatarPosition === 'content-left',
                'avonni-visual-picker__figure-body-container-horizontal-reverse':
                    avatarPosition === 'content-right'
            })
            .toString();
    }

    /**
     * Compute image container styling.
     *
     * @param {boolean} imgIsHorizontal
     * @param {boolean} isImgBackgroundOrOverlay
     * @returns {string}
     */
    computeImageContainerStyle(imgIsHorizontal, isImgBackgroundOrOverlay) {
        let widthStyle = 'width: 100%;';
        let heightStyle = 'height: 100%;';

        if (
            !imgIsHorizontal &&
            this.isBiggerThanXSmall &&
            !this.isResponsive &&
            !isImgBackgroundOrOverlay
        ) {
            const maxHeightInRem =
                this._imageContainerHeightInRem[this.size][this.ratio];
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
     * @param {boolean} isImgBackgroundOrOverlay
     * @returns {string}
     */
    computeImageStyle(imgIsHorizontal, isImgBackgroundOrOverlay) {
        const objectFit = `object-fit: ${this.imageAttributes.cropFit};`;
        let widthStyle = 'width: 100%;';
        let heightStyle = 'height: 100%;';

        const size = this.imageAttributes.size || this.size;
        if (size) {
            let heightInPx = this.imageAttributes.height;
            let heightInRem = this._imageContainerHeightInRem[size]
                ? this._imageContainerHeightInRem[size][this.ratio]
                : 0;
            let heightSize = heightInPx
                ? `${heightInPx}px`
                : `${heightInRem}rem`;

            if (!imgIsHorizontal && !isImgBackgroundOrOverlay) {
                widthStyle = 'width: 100%;';
                heightStyle = `height: ${heightSize}; min-height: ${heightSize};`;
            }
        }

        return `${heightStyle} ${widthStyle} ${objectFit}`;
    }

    /**
     * Compute item layout container styling.
     *
     * @param {boolean} imgIsHorizontal
     * @param {boolean} isImgBackgroundOrOverlay
     * @returns {string}
     */
    computeItemLayoutContainerStyle(imgIsHorizontal, isImgBackgroundOrOverlay) {
        let heightStyle = '';
        let widthStyle = '';
        if (!isImgBackgroundOrOverlay) {
            let percent = this.isBiggerThanXSmall && imgIsHorizontal ? 50 : 100;
            widthStyle = `width: ${percent}%;`;
            heightStyle = imgIsHorizontal ? 'height: 100%;' : '';
        }
        return `${heightStyle} ${widthStyle}`;
    }

    /**
     * Computed items container class styling
     *
     * @param {boolean} isImgBackgroundOrOverlay
     * @returns {string}
     */
    computeItemsContainerClass(isImgBackgroundOrOverlay) {
        return classSet('')
            .add({
                'avonni-visual-picker__figure-body-container':
                    !isImgBackgroundOrOverlay
            })
            .toString();
    }

    /**
     * Computed NOT selected class styling.
     *
     * @param {string} imgPosition
     * @param {string} itemValue
     * @returns {string}
     */
    computeNotSelectedClass(imgPosition, itemValue) {
        const isSelected = this.value.includes(itemValue);
        return classSet(
            'avonni-visual-picker__figure-container avonni-visual-picker__height'
        )
            .add({
                'slds-is-not-selected':
                    this.isCoverable && !this._hideCheckMark,
                'slds-grid_vertical': imgPosition === 'bottom',
                'slds-grid_reverse': imgPosition === 'right',
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
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.wrapperElement) {
            return null;
        }
        return new AvonniResizeObserver(this.wrapperElement, () => {
            this.recomputeTags();
        });
    }

    /**
     * Only accept predetermined number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    normalizeColumns(value) {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) {
            return null;
        }

        if (COLUMNS.valid.includes(numValue)) {
            return numValue;
        }
        return null;
    }

    /**
     * Inverse logic of number of columns.
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

    recomputeTags() {
        requestAnimationFrame(() => {
            const container = Array.from(
                this.template.querySelectorAll(
                    '.avonni-visual-picker__tags-container'
                )
            );
            const tagClass = 'avonni-visual-picker__tags';
            const hiddenTagClass = 'avonni-visual-picker__tags-hidden';

            // Resets tags visibility
            const items = this._items.map((item, index) => {
                if (container && container[index]) {
                    const tagElements = Array.from(
                        container[index].querySelectorAll(
                            '[data-element-id="avonni-visual-picker-tag"]'
                        )
                    );
                    tagElements.forEach((tagElement) => {
                        if (tagElement.classList.contains(hiddenTagClass)) {
                            tagElement.classList.remove(hiddenTagClass);
                        }
                    });
                }
                let tags = [];
                if (item.tags && Array.isArray(item.tags)) {
                    tags = item.tags.map((tag) => {
                        return {
                            ...tag,
                            hidden: false
                        };
                    });
                }
                return {
                    ...item,
                    tags,
                    hasHiddenTags: false
                };
            });

            // Calculate overflow
            this._computedItems = items.map((item, index) => {
                if (item.tags && Array.isArray(item.tags)) {
                    if (container && container[index]) {
                        const overflowElement = container[index].querySelector(
                            '[data-element-id="avonni-visual-picker-tag-overflow"]'
                        );
                        const tagElements = Array.from(
                            container[index].querySelectorAll(
                                '[data-element-id="avonni-visual-picker-tag"]'
                            )
                        );
                        let totalWidth = 0;
                        let maxWidth =
                            container[index].getBoundingClientRect().width - 30;
                        if (overflowElement) {
                            maxWidth -=
                                overflowElement.getBoundingClientRect().width;
                        }
                        tagElements.forEach((tagElement, tagIndex) => {
                            const width =
                                tagElement.getBoundingClientRect().width;
                            const isHidden = maxWidth <= totalWidth + width;
                            if (!tagElement.classList.contains(tagClass)) {
                                tagElement.classList.add(tagClass);
                            }
                            if (
                                isHidden &&
                                !tagElement.classList.contains(hiddenTagClass)
                            ) {
                                tagElement.classList.add(hiddenTagClass);
                            }
                            item.tags[tagIndex].hidden = isHidden;
                            totalWidth += width;
                        });
                        item.hasHiddenTags = item.tags.some(
                            (tag) => tag.hidden
                        );
                    }
                }
                return item;
            });
        });
    }

    /**
     * Dispatches the blur event.
     */
    handleBlur() {
        this.interactingState.leave();
    }

    /**
     * Dispatches the focus event.
     */
    handleFocus() {
        this.interactingState.enter();
    }

    /**
     * Change event handler.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();
        this._value =
            this.type === 'radio'
                ? event.target.value
                : this.inputs
                      .filter((input) => input.checked)
                      .map((input) => input.value);

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
     * Input keyup event handler.
     *
     * @param {Event} event
     */
    handleKeyUp(event) {
        if (event.key !== 'Enter') return;
        event.currentTarget.click();
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
}

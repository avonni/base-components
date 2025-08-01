import {
    classSet,
    generateUUID,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { LightningElement, api } from 'lwc';

const PAGINATION_ALIGNS = {
    valid: ['left', 'center', 'right', 'fill'],
    default: 'left'
};

const DEFAULT_PER_PAGE = 20;
const DEFAULT_TOTAL_ROWS = 0;
const DEFAULT_ELLIPSIS_TEXT = '...';
const DEFAULT_VALUE = 1;
const DEFAULT_LIMIT = 5;

/**
 * @class
 * @descriptor avonni-pagination
 * @storyId example-pagination--base
 * @public
 */
export default class Pagination extends LightningElement {
    /**
     * The name of an icon to display after the label of the first button.
     *
     * @type {string}
     * @public
     */
    @api firstButtonIconName;
    /**
     * Label for the first button.
     *
     * @type {string}
     * @public
     */
    @api firstButtonLabel;
    /**
     * The name of an icon to display after the label for the last button.
     *
     * @type {string}
     * @public
     */
    @api lastButtonIconName;
    /**
     * Label for the last button.
     *
     * @type {string}
     * @public
     */
    @api lastButtonLabel;
    /**
     * Label for the next button.
     *
     * @type {string}
     * @public
     */
    @api nextButtonLabel;
    /**
     * Label for the previous button.
     *
     * @type {string}
     * @public
     */
    @api previousButtonLabel;

    _align = PAGINATION_ALIGNS.default;
    _disabled = false;
    _ellipsisText = DEFAULT_ELLIPSIS_TEXT;
    _limit = DEFAULT_LIMIT;
    _nextButtonIconName;
    _perPage = DEFAULT_PER_PAGE;
    _previousButtonIconName;
    _totalRows = DEFAULT_TOTAL_ROWS;
    _value = DEFAULT_VALUE;

    renderedCallback() {
        this.setActiveButton();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Alignment of the page buttons. Values include left, center, right and fill.
     *
     * @type {string}
     * @public
     * @default left
     */
    @api
    get align() {
        return this._align;
    }
    set align(align) {
        this._align = normalizeString(align, {
            fallbackValue: PAGINATION_ALIGNS.default,
            validValues: PAGINATION_ALIGNS.valid
        });
    }

    /**
     * If present, the pagination is disabled and the user cannot interact with it.
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
     * Content to place in the ellipsis placeholder.
     *
     * @type {string}
     * @public
     * @default ...
     */
    @api
    get ellipsisText() {
        return this._ellipsisText;
    }
    set ellipsisText(value) {
        this._ellipsisText =
            typeof value === 'string' ? value : DEFAULT_ELLIPSIS_TEXT;
    }

    /**
     * Maximum number of buttons to show (including ellipsis if shown, but excluding the bookend buttons). The minimum value is 3.
     *
     * @type {number}
     * @public
     * @default 5
     */
    @api
    get limit() {
        return this._limit;
    }
    set limit(value) {
        this._limit = Number(value);

        if (this._limit < 3) {
            this._limit = 3;
        }
    }

    /**
     * The name of an icon to display after the label for the next button.
     *
     * @type {string}
     * @public
     * @default utility:chevronright
     */
    @api
    get nextButtonIconName() {
        if (!this.nextButtonLabel && !this._nextButtonIconName) {
            return 'utility:chevronright';
        }

        return this._nextButtonIconName;
    }
    set nextButtonIconName(value) {
        this._nextButtonIconName = value;
    }

    /**
     * Number of rows per page
     *
     * @type {number}
     * @public
     * @default 20
     */
    @api
    get perPage() {
        return this._perPage;
    }
    set perPage(value) {
        const number = parseInt(value, 10);
        this._perPage = isNaN(number) ? DEFAULT_PER_PAGE : number;
    }

    /**
     * The name of an icon to display after the label for the previous button.
     *
     * @type {string}
     * @public
     * @default utility:chevronleft
     */
    @api
    get previousButtonIconName() {
        if (!this.previousButtonLabel && !this._previousButtonIconName) {
            return 'utility:chevronleft';
        }

        return this._previousButtonIconName;
    }
    set previousButtonIconName(value) {
        this._previousButtonIconName = value;
    }

    /**
     * Total number of rows in the dataset.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get totalRows() {
        return this._totalRows;
    }
    set totalRows(value) {
        const number = parseInt(value, 10);
        this._totalRows = isNaN(number) ? DEFAULT_TOTAL_ROWS : number;
    }

    /**
     * Current page number, starting from 1
     *
     * @type {number}
     * @public
     * @default 1
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = Number(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed CSS classes of the main pagination buttons.
     *
     * @type {string}
     */
    get computedButtonClass() {
        return classSet(
            'slds-button slds-button_neutral avonni-pagination__button_neutral avonni-pagination__navigation-button'
        )
            .add({
                'slds-button_stretch': this.align === 'fill'
            })
            .toString();
    }

    /**
     * Computed container class styling for alignment attribute.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet({
            'slds-grid slds-grid_align-center': this.align === 'center',
            'slds-grid slds-grid_align-end': this.align === 'right',
            'avonni-pagination__container_fill': this.align === 'fill'
        }).toString();
    }

    /**
     * Computed Aria Label for ellipsis button.
     *
     * @type {string}
     */
    get computedEllipsisButtonAriaLabel() {
        if (!this.ellipsisText || this.ellipsisText === '...') {
            return 'More';
        }
        return this.ellipsisText;
    }

    /**
     * Computed Aria Label for first button.
     *
     * @type {string}
     */
    get computedFirstButtonAriaLabel() {
        return this.firstButtonLabel || 'First';
    }

    /**
     * Computed first icon class styling.
     *
     * @type {string}
     */
    get computedFirstIconClass() {
        return classSet('slds-button__icon').add({
            'slds-button__icon_left': this.firstButtonLabel
        });
    }

    /**
     * Computed Aria Label for last button.
     *
     * @type {string}
     */
    get computedLastButtonAriaLabel() {
        return this.lastButtonLabel || 'Last';
    }

    /**
     * Computed last icon class styling.
     *
     * @type {string}
     */
    get computedLastIconClass() {
        return classSet('slds-button__icon').add({
            'slds-button__icon_left': this.lastButtonLabel
        });
    }

    /**
     * Computed Aria Label for next button.
     *
     * @type {string}
     */
    get computedNextButtonAriaLabel() {
        return this.nextButtonLabel || 'Next';
    }

    /**
     * Computed next icon class styling.
     *
     * @type {string}
     */
    get computedNextIconClass() {
        return classSet('slds-button__icon').add({
            'slds-button__icon_left': this.nextButtonLabel
        });
    }

    /**
     * Computed Aria Label for previous button.
     *
     * @type {string}
     */
    get computedPreviousButtonAriaLabel() {
        return this.previousButtonLabel || 'Previous';
    }

    /**
     * Computed previous icon class styling.
     *
     * @type {string}
     */
    get computedPreviousIconClass() {
        return classSet('slds-button__icon').add({
            'slds-button__icon_left': this.previousButtonLabel
        });
    }

    /**
     * Check whether Left button is disabled.
     *
     * @type {boolean | number}
     */
    get disabledLeftButtons() {
        return this._disabled || this.value === 1;
    }

    /**
     * Check whether Right button is disabled.
     *
     * @type {boolean | number}
     */
    get disabledRightButtons() {
        return this._disabled || this.value === this.paginationSize;
    }

    /**
     * Check whether the label is not specified and that the icon is present to display on the first button.
     *
     * @type {string}
     */
    get firstButtonIcon() {
        return !this.firstButtonLabel && this.firstButtonIconName;
    }

    /**
     * Get index of pagination buttons.
     *
     * @type {number}
     */
    get index() {
        return this.limit === 3 ? 2 : this.limit - Math.ceil(this.limit / 3);
    }

    /**
     * Check whether the label is not specified and that the icon is present to display on the first button.
     *
     * @type {string}
     */
    get lastButtonIcon() {
        return !this.lastButtonLabel && this.lastButtonIconName;
    }

    /**
     * Compute pagination buttons to array object and display according to index and limit.
     *
     * @type {object}
     */
    get paginationButtons() {
        let paginationButtons = [
            ...Array(this.paginationSize + 1).keys()
        ].slice(1);

        let firstIndex = this.value - this.index;
        let lastIndex = this.limit + firstIndex;

        if (this.limit < this.paginationSize) {
            if (this.limit === 3) {
                if (this.value < this.paginationSize - 1) {
                    if (this.value > 2) {
                        paginationButtons = paginationButtons.slice(
                            firstIndex,
                            lastIndex
                        );
                    } else {
                        paginationButtons = paginationButtons.slice(
                            0,
                            this.limit
                        );
                    }
                } else {
                    paginationButtons = paginationButtons.slice(
                        this.paginationSize - this.limit,
                        this.paginationSize
                    );
                }
            } else {
                if (this.value < this.paginationSize - 2) {
                    if (this.value >= this.limit - 2) {
                        paginationButtons = paginationButtons.slice(
                            firstIndex,
                            lastIndex
                        );
                    } else {
                        paginationButtons = paginationButtons.slice(
                            0,
                            this.limit
                        );
                    }
                } else {
                    paginationButtons = paginationButtons.slice(
                        this.paginationSize - this.limit,
                        this.paginationSize
                    );
                }
            }
        }

        return paginationButtons;
    }

    /**
     * Check pagination size to display.
     *
     * @type {number}
     */
    get paginationSize() {
        let size = Math.ceil(this.totalRows / this.perPage);
        return size === 0 ? 1 : size;
    }

    /**
     * Check which label or icon to display on the first button.
     *
     * @type {boolean}
     */
    get showFirstButton() {
        return this.firstButtonLabel || this.firstButtonIconName;
    }

    /**
     * Check which label or icon to display on the last button.
     *
     * @type {boolean}
     */
    get showLastButton() {
        return this.lastButtonLabel || this.lastButtonIconName;
    }

    /**
     * Check whether to display the next ellipsis.
     *
     * @type {boolean}
     */
    get showNextEllipsis() {
        const pages = this.paginationButtons;
        return pages.length && pages[pages.length - 1] !== this.paginationSize;
    }

    /**
     * Check whether to display the previous ellipsis.
     *
     * @type {boolean}
     */
    get showPreviousEllipsis() {
        const pages = this.paginationButtons;
        return pages.length && pages[0] !== 1;
    }

    /**
     * Generate unique Key iD for buttons.
     *
     * @type {string}
     */
    get uniqueKey() {
        return generateUUID();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Go to first page.
     *
     * @public
     */
    @api
    first() {
        if (this.disabled) {
            return;
        }
        this._value = 1;
        this.handleChange();
    }

    /**
     * Go to page at index.
     *
     * @param {number} index Index of the page.
     */
    @api
    goto(index) {
        this._value = Number(index);
        this.handleChange();
    }

    /**
     * Go to last page.
     *
     * @public
     */
    @api
    last() {
        this._value = this.paginationSize;
        this.handleChange();
    }

    /**
     * Go to next page.
     *
     * @public
     */
    @api
    next() {
        if (this.value < this.paginationSize) {
            this._value = this.value + 1;
            this.handleChange();
        }
    }

    /**
     * Go to previous page.
     *
     * @public
     */
    @api
    previous() {
        if (this.value > 1) {
            this._value = this.value - 1;
            this.handleChange();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Go to button index event handler.
     *
     * @param {Event} event
     */
    goToIndex(event) {
        this.goto(Number(event.target.value));
    }

    /**
     * Function to set the currently selected button as "avonni-button-active".
     */
    setActiveButton() {
        const buttons = this.template.querySelectorAll(
            '[data-element-id="button"]'
        );
        buttons.forEach((button) => {
            if (Number(button.value) === this.value) {
                button.classList.add('avonni-pagination__button_active');
            } else {
                button.classList.remove('avonni-pagination__button_active');
            }
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Change event handler.
     */
    handleChange() {
        /**
         * The event fired when the page changed.
         *
         * @event
         * @name change
         * @param {string} value The page number selected.
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
     * Function to handle the click on the next ellipsis button.
     */
    handleNextEllipsisClick() {
        const pages = this.paginationButtons;
        this.goto(pages[pages.length - 1] + 1);
    }

    /**
     * Function to handle the click on the previous ellipsis button.
     */
    handlePreviousEllipsisClick() {
        this.goto(this.paginationButtons[0] - 1);
    }
}

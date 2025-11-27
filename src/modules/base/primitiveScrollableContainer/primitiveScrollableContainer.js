import { AvonniResizeObserver } from 'c/resizeObserver';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

const MENU_VARIANTS = {
    valid: [
        'base',
        'neutral',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'base'
};
const MENU_WIDTH = 100;
const SCROLL_OFFSET = 150;

export default class PrimitiveScrollableContainer extends LightningElement {
    _disabled = false;
    _menuVariant = MENU_VARIANTS.default;
    _showMenu = false;
    _showScrollButtons = false;

    _connected = false;
    _hiddenContentCloseTimeout;
    _resizeObserver;
    _scrollTimeout;
    _showHiddenContent = false;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._connected = true;
    }

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this._initResizeObserver();
        }
        this._updateScrollButtonVisibility();
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
        clearTimeout(this._scrollTimeout);
        clearTimeout(this._hiddenContentCloseTimeout);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the container is disabled and it is not possible to scroll the content.
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
     * The variant changes the look of the "more" menu. Valid variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse and success.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get menuVariant() {
        return this._menuVariant;
    }
    set menuVariant(value) {
        this._menuVariant = normalizeString(value, {
            fallbackValue: MENU_VARIANTS.default,
            validValues: MENU_VARIANTS.valid
        });
    }

    /**
     * If present, the overflowing content will be displayed in a menu.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showMenu() {
        return this._showMenu;
    }
    set showMenu(value) {
        const boolean = normalizeBoolean(value);
        if (boolean === this._showMenu) {
            return;
        }
        this._showMenu = boolean;

        if (this._connected) {
            requestAnimationFrame(() => {
                this._dispatchWidthChange();
            });
        }
    }

    /**
     * If present, display scroll buttons when the slot content is overflowing the container.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showScrollButtons() {
        return this._showScrollButtons;
    }
    set showScrollButtons(value) {
        this._showScrollButtons = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedMainContentClass() {
        return classSet({
            'slds-col slds-has-flexi-truncate': this.showMenu
        }).toString();
    }

    get computedMainWrapperClass() {
        return classSet(
            'avonni-primitive-scrollable-container__width-100 avonni-primitive-scrollable-container__main-wrapper'
        )
            .add({
                'slds-scrollable_x': !this.showMenu && !this.disabled,
                'slds-grid': this.showMenu
            })
            .toString();
    }

    get computedShowScrollButtons() {
        return !this.showMenu && this.showScrollButtons;
    }

    get mainElement() {
        return this.template.querySelector('[data-element-id="div-main"]');
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _closeHiddenContent() {
        this._showHiddenContent = false;
        const hiddenContent = this.template.querySelector(
            '[data-element-id="div-hidden-content"]'
        );
        if (hiddenContent) {
            hiddenContent.classList.add('slds-hide');
        }

        const showMoreButton = this.template.querySelector(
            '[data-element-id="lightning-button-show-more"]'
        );
        if (showMoreButton) {
            showMoreButton.focus();
        }
    }

    _initResizeObserver() {
        if (!this.mainElement) {
            return null;
        }
        return new AvonniResizeObserver(this.mainElement, () => {
            if (this.computedShowScrollButtons) {
                this._updateScrollButtonVisibility();
            }
            this._dispatchWidthChange();
        });
    }

    _updateScrollButtonVisibility() {
        const rightScrollButton = this.template.querySelector(
            '[data-element-id="div-scroll-right-button"]'
        );
        const leftScrollButton = this.template.querySelector(
            '[data-element-id="div-scroll-left-button"]'
        );
        if (!this.mainElement || !rightScrollButton || !leftScrollButton) {
            return;
        }

        const { scrollWidth, clientWidth, scrollLeft } = this.mainElement;
        const scrolledDistance = Math.ceil(scrollLeft);
        const maxScroll = scrollWidth - clientWidth;
        const isOverflowing = scrollWidth > clientWidth;

        const hasScrollRight = isOverflowing && scrolledDistance < maxScroll;
        if (hasScrollRight) {
            rightScrollButton.classList.remove('slds-hide');
        } else {
            rightScrollButton.classList.add('slds-hide');
        }

        const hasScrollLeft = isOverflowing && scrolledDistance > 0;
        if (hasScrollLeft) {
            leftScrollButton.classList.remove('slds-hide');
        } else {
            leftScrollButton.classList.add('slds-hide');
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handleHiddenContentFocusIn() {
        clearTimeout(this._hiddenContentCloseTimeout);
    }

    handleHiddenContentFocusOut() {
        clearTimeout(this._hiddenContentCloseTimeout);
        this._hiddenContentCloseTimeout = setTimeout(() => {
            this._closeHiddenContent();

            // We have to use a timeout for the use in the input choice set.
            // On click on a label, the focus passes to the input,
            // and the focusin event is delayed.
        }, 150);
    }

    handleHiddenContentKeyUp(event) {
        if (event.key === 'Escape') {
            this._closeHiddenContent();
        }
    }

    handleScroll() {
        if (this.showMenu || !this.showScrollButtons) {
            return;
        }
        clearTimeout(this._scrollTimeout);
        this._scrollTimeout = setTimeout(() => {
            this._updateScrollButtonVisibility();
        }, 100);
    }

    handleScrollButtonClick(event) {
        if (!this.mainElement) {
            return;
        }
        const direction = event.currentTarget.dataset.direction;
        const factor = direction === 'left' ? -1 : 1;
        const scrolledDistance = this.mainElement.scrollLeft;
        const scrollDistance = scrolledDistance + SCROLL_OFFSET * factor;
        this.mainElement.scrollTo({
            left: scrollDistance,
            behavior: 'smooth'
        });
    }

    handleShowMoreClick() {
        this._showHiddenContent = !this._showHiddenContent;
        const hiddenContent = this.template.querySelector(
            '[data-element-id="div-hidden-content"]'
        );
        if (hiddenContent) {
            hiddenContent.classList.toggle('slds-hide');
        }

        if (this._showHiddenContent) {
            const focusTrap = this.template.querySelector(
                '[data-element-id="avonni-focus-trap"]'
            );
            if (focusTrap) {
                focusTrap.focus();
            }

            const instructions = this.template.querySelector(
                '[data-element-id="span-instructions"]'
            );
            if (instructions) {
                instructions.textContent = 'Press escape to close this menu.';
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    _dispatchWidthChange() {
        const visibleWidth = this.mainElement
            ? this.mainElement.clientWidth
            : 0;
        this.dispatchEvent(
            new CustomEvent('widthchange', {
                detail: {
                    availableWidth: this.showMenu
                        ? visibleWidth - MENU_WIDTH
                        : visibleWidth
                }
            })
        );
    }
}

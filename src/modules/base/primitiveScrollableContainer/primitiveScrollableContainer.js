import { AvonniResizeObserver } from 'c/resizeObserver';
import { LightningElement, api } from 'lwc';

const SCROLL_OFFSET = 150;

export default class PrimitiveScrollableContainer extends LightningElement {
    @api showScrollButtons = false;

    _resizeObserver;
    _scrollTimeout;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        if (!this._resizeObserver && this.showScrollButtons) {
            this._resizeObserver = this._initResizeObserver();
        } else if (this._resizeObserver && !this.showScrollButtons) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
        }
        this._updateScrollButtonVisibility();
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get mainElement() {
        return this.template.querySelector('[data-element-id="div-main"]');
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _initResizeObserver() {
        if (!this.mainElement) {
            return null;
        }
        return new AvonniResizeObserver(this.mainElement, () => {
            this._updateScrollButtonVisibility();
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
        const totalWidth = this.mainElement.scrollWidth;
        const visibleWidth = this.mainElement.clientWidth;
        const scrolledDistance = Math.ceil(this.mainElement.scrollLeft);
        const hasScroll = totalWidth > visibleWidth;
        const maxScroll = totalWidth - visibleWidth;

        const scrollRight = hasScroll && scrolledDistance < maxScroll;
        if (scrollRight) {
            rightScrollButton.classList.remove('slds-hide');
        } else {
            rightScrollButton.classList.add('slds-hide');
        }

        const scrollLeft = hasScroll && scrolledDistance > 0;
        if (scrollLeft) {
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

    handleScroll() {
        if (!this.showScrollButtons) {
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
}

import { LightningElement, api } from 'lwc';
import {
    keyCodes,
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';
import { AvonniResizeObserver } from 'c/resizeObserver';
import PaginationItem from './paginationItem';
import { updateActivePaginationItem } from './paginationItemsUtils';

const MAX_NB_PANELS_INFINITE_LOADING = 6;
const FALSE_STRING = 'false';
const TRUE_STRING = 'true';

const ACTIONS_POSITIONS = {
    valid: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'bottom-center'
    ],
    default: 'bottom-center'
};
const ACTIONS_VARIANTS = {
    valid: ['bare', 'border', 'menu', 'stretch'],
    default: 'border'
};

const ITEMS_PER_PANEL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MEDIA_QUERY_BREAKPOINTS = {
    small: 480,
    medium: 768,
    large: 1024
};

const IMAGE_POSITIONS = {
    valid: ['top', 'left', 'right', 'bottom'],
    default: 'top'
};

const INDICATOR_VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

const DEFAULT_ITEMS_PER_PANEL = 1;
const DEFAULT_LOAD_MORE_OFFSET = 1;
const DEFAULT_SCROLL_DURATION = 5;
const DEFAULT_ASSISTIVE_TEXT_AUTOPLAY_BUTTON = 'Play / Stop auto-play';
const DEFAULT_ASSISTIVE_TEXT_PREVIOUS_PANEL = 'Previous Panel';
const DEFAULT_ASSISTIVE_TEXT_NEXT_PANEL = 'Next Panel';
const DEFAULT_AUTOCROLL_PLAY_ICON = 'utility:play';
const DEFAULT_AUTOCROLL_PAUSE_ICON = 'utility:pause';

const i18n = {
    nextPanel: DEFAULT_ASSISTIVE_TEXT_NEXT_PANEL,
    previousPanel: DEFAULT_ASSISTIVE_TEXT_PREVIOUS_PANEL,
    autoplayButton: DEFAULT_ASSISTIVE_TEXT_AUTOPLAY_BUTTON
};

/**
 * @class
 * @descriptor avonni-carousel
 * @storyId example-carousel--base
 * @public
 */
export default class Carousel extends LightningElement {
    /**
     * If present, the carousel doesn't loop after the last image is displayed.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api disableAutoRefresh;
    /**
     * If present, images do not automatically scroll and users must click the indicators to scroll.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api disableAutoScroll;
    /**
     * If present, the left and right arrows of the carousel are hidden.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api hidePreviousNextPanelNavigation;
    /**
     * If present, the carousel will loop when reaching the last panel.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api isInfinite;

    _actionsPosition = ACTIONS_POSITIONS.default;
    _actionsVariant = ACTIONS_VARIANTS.default;
    _assistiveText = {
        nextPanel: i18n.nextPanel,
        previousPanel: i18n.previousPanel,
        autoplayButton: i18n.autoplayButton
    };
    _carouselItems = [];
    _currentPanel;
    _enableInfiniteLoading = false;
    _hideIndicator = false;
    _imagePosition = IMAGE_POSITIONS.default;
    _indicatorVariant = INDICATOR_VARIANTS.default;
    _isLoading = false;
    _itemsPerPanel = DEFAULT_ITEMS_PER_PANEL;
    _largeItemsPerPanel;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _mediumItemsPerPanel;
    _scrollDuration = DEFAULT_SCROLL_DURATION;
    _smallItemsPerPanel;

    _rendered = false;

    activeIndexPanel = 0;
    autoScrollIcon = DEFAULT_AUTOCROLL_PLAY_ICON;
    autoScrollTimeOut;
    autoScrollOn;
    columnsCount = {
        default: 1
    };
    currentPanelIndex = 0;
    currentItemsPerPanel;
    panelItems = [];
    paginationItems = [];
    panelStyle;
    resizeObserver;

    renderedCallback() {
        if (!this._rendered) {
            this.initCarousel();
            if (!this.disableAutoScroll) {
                this.play();
            }
        }

        if (!this.resizeObserver && this.carouselIsResponsive) {
            this.initWrapObserver();
        }

        this.computeItemsPerPanel();
        this._rendered = true;
    }

    connectedCallback() {
        this._connected = true;
    }

    disconnectedCallback() {
        this._connected = false;
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = undefined;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the actions. Valid values include top-left, top-right,  bottom-left, bottom-right and bottom-center.
     *
     * @type {string}
     * @public
     * @default bottom-center
     */
    @api
    get actionsPosition() {
        return this._actionsPosition;
    }
    set actionsPosition(position) {
        this._actionsPosition = normalizeString(position, {
            fallbackValue: ACTIONS_POSITIONS.default,
            validValues: ACTIONS_POSITIONS.valid
        });
    }

    /**
     * Changes the appearance of the actions. Valid values include bare, border and menu.
     *
     * @type {string}
     * @public
     * @default border
     */
    @api
    get actionsVariant() {
        return this._actionsVariant;
    }
    set actionsVariant(variant) {
        this._actionsVariant = normalizeString(variant, {
            fallbackValue: ACTIONS_VARIANTS.default,
            validValues: ACTIONS_VARIANTS.valid
        });
    }

    /**
     * Description of the carousel items for screen-readers.
     *
     * @type {object}
     * @public
     * @default <code>{ autoplayButton: 'Play / Stop auto-play', nextPanel: 'Next Panel', previousPanel: 'Previous Panel' }</code>
     */
    @api
    get assistiveText() {
        return this._assistiveText;
    }
    set assistiveText(value) {
        const text = typeof value === 'object' && value !== null ? value : {};
        this._assistiveText = {
            autoplayButton:
                text.autoplayButton || DEFAULT_ASSISTIVE_TEXT_AUTOPLAY_BUTTON,
            nextPanel: text.nextPanel || DEFAULT_ASSISTIVE_TEXT_NEXT_PANEL,
            previousPanel:
                text.previousPanel || DEFAULT_ASSISTIVE_TEXT_PREVIOUS_PANEL
        };
    }

    /**
     * Dictates the currently active/visible carousel panel. Use item’s name to select current panel.
     *
     * @type {string}
     * @public
     */
    @api
    get currentPanel() {
        return this._currentPanel;
    }
    set currentPanel(value) {
        this._currentPanel = value;

        if (this._connected) {
            this.initCarousel();
        }
    }

    /**
     * If present, the carousel items can be loaded dynamically.
     * As a consequence, the navigation is not disabled when the end of the items is reached, the indicator is always hidden, and `is-infinite` is ignored.
     * Use in conjunction with `load-more-offset` to determine when the loadmore event should be fired.
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
            this.checkIfShouldLoadMore();
        }
    }

    /**
     * If present, the progress indicator is hidden.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideIndicator() {
        return this._hideIndicator;
    }
    set hideIndicator(value) {
        this._hideIndicator = normalizeBoolean(value);
    }

    /**
     * Changes the appearance of the progress indicators. Valid values are base or shaded.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get indicatorVariant() {
        return this._indicatorVariant;
    }
    set indicatorVariant(variant) {
        this._indicatorVariant = normalizeString(variant, {
            fallbackValue: INDICATOR_VARIANTS.default,
            validValues: INDICATOR_VARIANTS.valid
        });
    }

    /**
     * Array of item objects to display in the carousel.
     *
     * @type {object[]}
     * @public
     * @required
     */
    @api
    get items() {
        return this._carouselItems;
    }
    set items(value) {
        this._carouselItems = [];
        normalizeArray(value).forEach((item) => {
            this._carouselItems.push({
                name: item.name,
                title: item.title,
                description: item.description,
                imageAssistiveText: item.imageAssistiveText || item.title,
                href: item.href,
                src: item.src,
                actions: item.actions || []
            });
        });

        if (this._connected) {
            this.initCarousel();
        }
    }

    /**
     * If present, the carousel is in a loading state and shows the loading spinner.
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

        if (this.isLoading) {
            this.pause();
        }
    }

    /**
     * Number of items to be displayed at a time in the carousel. Maximum of 10 items per panel.
     *
     * @type {number}
     * @public
     * @default 1
     */
    @api
    get itemsPerPanel() {
        return this._itemsPerPanel;
    }
    set itemsPerPanel(value) {
        const number = parseInt(value, 10);
        if (ITEMS_PER_PANEL.includes(number)) {
            this._itemsPerPanel = number;
        } else {
            this._itemsPerPanel = DEFAULT_ITEMS_PER_PANEL;
        }

        this.columnsCount.default = this._itemsPerPanel;

        if (this._connected) {
            this.computeItemsPerPanel();
        }
    }

    /**
     * Position of the media. Valid values include top, left, right and bottom.
     *
     * @type {string}
     * @public
     * @default top
     */
    @api
    get imagePosition() {
        return this._imagePosition;
    }
    set imagePosition(imagePosition) {
        this._imagePosition = normalizeString(imagePosition, {
            fallbackValue: IMAGE_POSITIONS.default,
            validValues: IMAGE_POSITIONS.valid
        });
    }

    /**
     * Number of hidden panels left when the `loadmore` event should be fired. For example, if the value is `2`, the `loadmore` event will be fired when the user clicks on the “next” navigation button, and from this screen, they could click two more times on “next” before reaching the end of the items.
     * Depends on `enable-infinite-loading` being true.
     *
     * @type {number}
     * @default 1
     * @public
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }
    set loadMoreOffset(value) {
        const number = parseInt(value, 10);
        this._loadMoreOffset = number >= 0 ? number : DEFAULT_LOAD_MORE_OFFSET;

        if (this._connected) {
            this.checkIfShouldLoadMore();
        }
    }

    /**
     * Auto scroll delay. The default is 5 seconds, after which the next image is displayed.
     *
     * @type {number}
     * @public
     * @default 5
     */
    @api
    get scrollDuration() {
        return this._scrollDuration;
    }
    set scrollDuration(value) {
        const duration = Number(value);
        this._scrollDuration =
            isNaN(duration) || duration <= 0
                ? DEFAULT_SCROLL_DURATION
                : duration;
    }

    /**
     * Number of items to be displayed at a time when the component is 480px wide or more. Maximum of 10 items per panel.
     *
     * @type {number}
     * @public
     */
    @api
    get smallItemsPerPanel() {
        return this._smallItemsPerPanel;
    }
    set smallItemsPerPanel(value) {
        this._smallItemsPerPanel = this.normalizeItemsPerPanel(value, 'small');

        if (this._connected) {
            this.computeItemsPerPanel();
        }
    }

    /**
     * Number of items to be displayed at a time when the component is 768px wide or more. Maximum of 10 items per panel.
     *
     * @type {number}
     * @public
     */
    @api
    get mediumItemsPerPanel() {
        return this._mediumItemsPerPanel;
    }
    set mediumItemsPerPanel(value) {
        this._mediumItemsPerPanel = this.normalizeItemsPerPanel(
            value,
            'medium'
        );
        if (this._connected) {
            this.computeItemsPerPanel();
        }
    }

    /**
     * Number of items to be displayed at a time in the carousel when the component is 1024px wide or more. Maximum of 10 items per panel.
     *
     * @type {number}
     * @public
     */
    @api
    get largeItemsPerPanel() {
        return this._largeItemsPerPanel;
    }
    set largeItemsPerPanel(value) {
        this._largeItemsPerPanel = this.normalizeItemsPerPanel(value, 'large');

        if (this._connected) {
            this.computeItemsPerPanel();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * HTML element for the carousel container.
     *
     * @type {HTMLElement}
     */
    get carouselContainer() {
        return this.template.querySelector(
            '[data-element-id="avonni-carousel-container"]'
        );
    }

    /**
     * Returns true if the carousel is responsive.
     *
     * @type {boolean}
     */
    get carouselIsResponsive() {
        const { small, medium, large } = this.columnsCount;
        return (
            small !== undefined || medium !== undefined || large !== undefined
        );
    }

    /**
     * Sets the width of each item, depending on the number of items per panel
     *
     * @type {string}
     */
    get carouselItemStyle() {
        const itemWidth = 100 / this.currentItemsPerPanel;
        return `flex-basis: ${itemWidth}%; width: ${itemWidth}%`;
    }

    /**
     * Change the button position depending if hideIndicator is true or false.
     *
     * @type {string}
     */
    get computedAutoScrollAutoplayButton() {
        return !this.showIndicator
            ? 'avonni-carousel__autoscroll-button-without-indicator'
            : 'avonni-carousel__autoscroll-button-with-indicator';
    }

    get nbOfPanels() {
        return Math.ceil(
            this._carouselItems.length / this.currentItemsPerPanel
        );
    }

    /**
     * If not infinite - set next panel as disabled.
     *
     * @type {number}
     */
    get nextPanelNavigationDisabled() {
        return !this.isInfinite && !this.enableInfiniteLoading
            ? this.activeIndexPanel === this.paginationItems.length - 1
            : null;
    }

    /**
     * If navigation is not infinite - set previous panel as disabled.
     *
     * @type {number}
     */
    get previousPanelNavigationDisabled() {
        return !this.isInfinite ? this.activeIndexPanel === 0 : null;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Pause the slide cycle.
     *
     * @public
     */
    @api
    pause() {
        clearTimeout(this.autoScrollTimeOut);
        this.autoScrollOn = false;
        this.autoScrollIcon = DEFAULT_AUTOCROLL_PLAY_ICON;
    }

    /**
     * Play the slide cycle.
     *
     * @public
     */
    @api
    play() {
        const scrollDuration = parseInt(this.scrollDuration, 10) * 1000;
        const carouselPanelsLength = this.panelItems.length;

        if (
            this.activeIndexPanel === carouselPanelsLength - 1 &&
            (this.disableAutoRefresh || !this.isInfinite)
        ) {
            this.pause();
            return;
        }

        this.pause();
        this.autoScrollTimeOut = setTimeout(
            this.startAutoScroll.bind(this),
            scrollDuration
        );

        this.autoScrollOn = true;
        this.autoScrollIcon = DEFAULT_AUTOCROLL_PAUSE_ICON;
    }

    /**
     * Go to first slide.
     *
     * @public
     */
    @api
    first() {
        this.selectNewPanel(0);
    }

    /**
     * Go to last slide.
     *
     * @public
     */
    @api
    last() {
        this.selectNewPanel(this.paginationItems.length - 1);
    }

    /**
     * Go to previous slide.
     *
     * @public
     */
    @api
    previous() {
        this.pause();
        this.unselectCurrentPanel();
        const panelIndex =
            this.activeIndexPanel > 0
                ? this.activeIndexPanel - 1
                : this.nbOfPanels - 1;
        this.selectNewPanel(panelIndex);
    }

    /**
     * Go to next slide.
     *
     * @public
     */
    @api
    next() {
        this.pause();
        this.unselectCurrentPanel();
        const panelIndex =
            this.activeIndexPanel < this.nbOfPanels - 1
                ? this.activeIndexPanel + 1
                : 0;
        this.selectNewPanel(panelIndex);
        this.checkIfShouldLoadMore();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    checkIfShouldLoadMore() {
        if (!this.enableInfiniteLoading) {
            return;
        }
        const nbPanelsLeft = this.nbOfPanels - (this.activeIndexPanel + 1);
        if (nbPanelsLeft <= this.loadMoreOffset) {
            this.dispatchLoadMoreEvent();
        }
    }

    /**
     * Computes the items per panel.
     */
    computeItemsPerPanel() {
        if (!this.carouselContainer) return;

        const previousItemsPerPanel = this.currentItemsPerPanel;
        const carouselWidth = this.carouselContainer.offsetWidth;

        let calculatedItemsPerPanel;

        if (carouselWidth >= MEDIA_QUERY_BREAKPOINTS.large) {
            calculatedItemsPerPanel =
                this.largeItemsPerPanel > 0
                    ? this.columnsCount.large
                    : this.columnsCount.default;
        } else if (carouselWidth >= MEDIA_QUERY_BREAKPOINTS.medium) {
            calculatedItemsPerPanel =
                this.mediumItemsPerPanel > 0
                    ? this.columnsCount.medium
                    : this.columnsCount.default;
        } else if (carouselWidth >= MEDIA_QUERY_BREAKPOINTS.small) {
            calculatedItemsPerPanel =
                this.smallItemsPerPanel > 0
                    ? this.columnsCount.small
                    : this.columnsCount.default;
        } else {
            calculatedItemsPerPanel = this.columnsCount.default;
        }

        if (
            calculatedItemsPerPanel !== previousItemsPerPanel &&
            this._connected
        ) {
            this.currentItemsPerPanel = calculatedItemsPerPanel;
            this.initCarousel();
            this.checkIfShouldLoadMore();
            this.dispatchPrivateItemsPerPanelChange();
        }
    }

    /**
     * Item clicked event handler.
     *
     * @param {event}
     */
    handleItemClick(event) {
        /**
         * The event fired when an item is clicked.
         *
         * @event
         * @name itemclick
         * @param {object} item The item data clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    item: event.detail.item
                }
            })
        );
    }

    /**
     * Item clicked event handler.
     *
     * @param {event}
     */
    handleActionClick(event) {
        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name Name of the action clicked.
         * @param {object} item Item clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: event.detail.name,
                    item: event.detail.item
                }
            })
        );
    }

    /**
     * Initialize Carousel method.
     */
    initCarousel() {
        this.initCurrentPanel();
        this.initPaginationItems();
        this.initPanels();
    }

    /**
     * Set the active panel index, based on the value of `current-panel`.
     */
    initCurrentPanel() {
        const itemIndex = this.currentPanel
            ? this.items.findIndex((item) => item.name === this.currentPanel)
            : 0;
        const panelIndex =
            itemIndex > -1
                ? Math.floor(itemIndex / this.currentItemsPerPanel)
                : 0;
        this.activeIndexPanel = panelIndex;
    }

    /**
     * Initialize Pagination items method.
     */
    initPaginationItems() {
        this.paginationItems = [];

        const nbOfPanels =
            this.enableInfiniteLoading &&
            this.nbOfPanels > MAX_NB_PANELS_INFINITE_LOADING
                ? MAX_NB_PANELS_INFINITE_LOADING
                : this.nbOfPanels;

        for (let i = 0; i < nbOfPanels; i++) {
            this.paginationItems.push(
                new PaginationItem({
                    activeIndexPanel: this.activeIndexPanel,
                    enableInfiniteLoading: this.enableInfiniteLoading,
                    index: i,
                    isActive: i === 1,
                    lastPanelIndex: this.nbOfPanels - 1,
                    variant: this.indicatorVariant
                })
            );
        }
    }

    /**
     * Creates an array of panels, each containing an array of items.
     */
    initPanels() {
        const panelItems = [];
        let panelIndex = 0;
        for (
            let i = 0;
            i < this._carouselItems.length;
            i += this.currentItemsPerPanel
        ) {
            const item = this._carouselItems[i];
            panelItems.push({
                index: panelIndex,
                key: `panel-${panelIndex}`,
                items: this._carouselItems.slice(
                    i,
                    i + this.currentItemsPerPanel
                ),
                ariaHidden:
                    this.currentPanel === item.name ? FALSE_STRING : TRUE_STRING
            });
            panelIndex += 1;
        }
        this.panelItems = panelItems;

        // Remove the transition so the carousel is not animated on render,
        // if a current-panel was selected
        this.panelStyle = `
            transition: none;
            transform: translateX(-${this.activeIndexPanel * 100}%);
        `;
    }

    /**
     * Setup the carousel resize observer. Used to update the number of items per panel when the carousel is resized.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initWrapObserver() {
        if (!this.carouselContainer) {
            return;
        }
        this.resizeObserver = new AvonniResizeObserver(
            this.carouselContainer,
            this.computeItemsPerPanel.bind(this)
        );
    }

    /**
     * Key down event handler.
     *
     * @param {Event}
     */
    keyDownHandler(event) {
        const key = event.keyCode;
        let indicatorActionsElements = this.indicatorActionsElements;

        if (key === keyCodes.right) {
            event.preventDefault();
            event.stopPropagation();

            this.pause();
            if (
                this.activeIndexPanel < this.panelItems.length - 1 ||
                this.isInfinite
            ) {
                this.next();
            }
        }

        if (key === keyCodes.left) {
            event.preventDefault();
            event.stopPropagation();

            this.pause();
            if (this.activeIndexPanel > 0 || this.isInfinite) {
                this.previous();
            }
        }

        // we cache them the first time
        if (!indicatorActionsElements) {
            indicatorActionsElements = this.template.querySelectorAll(
                '.slds-carousel__indicator-action'
            );
            this.indicatorActionsElements = indicatorActionsElements;
        }

        // we want to make sure that while we are using the keyboard
        // navigation we are focusing on the right indicator
        indicatorActionsElements[this.activeIndexPanel].focus();
    }

    /**
     * Ensure items per panel is an accepted value, otherwise unset it.
     */
    normalizeItemsPerPanel(value, size) {
        const number = parseInt(value, 10);
        if (ITEMS_PER_PANEL.includes(number)) {
            this.columnsCount[size] = number;
            return number;
        }
        this.columnsCount[size] = undefined;
        return undefined;
    }

    /**
     * Panel selection event method.
     *
     * @param {Event}
     */
    onPanelSelect(event) {
        const currentTarget = event.currentTarget;
        const itemIndex = parseInt(currentTarget.dataset.index, 10);
        this.pause();

        if (this.activeIndexPanel !== itemIndex) {
            this.unselectCurrentPanel();
            this.selectNewPanel(itemIndex);
        }
    }

    /**
     * New panel selection method.
     *
     * @param {number} panelIndex
     */
    selectNewPanel(panelIndex) {
        const activePanelItem = this.panelItems[panelIndex];
        if (!activePanelItem) {
            return;
        }

        activePanelItem.ariaHidden = FALSE_STRING;
        this.panelStyle = `transform:translateX(-${panelIndex * 100}%);`;
        const goToPrevious = panelIndex < this.activeIndexPanel;
        this.activeIndexPanel = panelIndex;
        updateActivePaginationItem({
            carousel: this,
            goToPrevious,
            items: this.paginationItems,
            nbOfPanels: this.nbOfPanels,
            panelIndex
        });

        if (activePanelItem.items[0]) {
            // Update the current panel for consistency
            // and to make sure there is no jump if more items are loaded
            this._currentPanel = activePanelItem.items[0].name;
        }
    }

    /**
     * Call the auto scroll.
     */
    startAutoScroll() {
        this.next();
        this.play();
    }

    /**
     * Auto Scroll toggler method.
     */
    toggleAutoScroll() {
        /*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/
        this.autoScrollOn ? this.pause() : this.play();
    }

    /**
     * Selection removed from current panel.
     */
    unselectCurrentPanel() {
        const activePaginationItem =
            this.paginationItems[this.activeIndexPanel];
        const activePanelItem = this.panelItems[this.activeIndexPanel];

        if (!activePaginationItem || !activePanelItem) return;
        activePanelItem.ariaHidden = TRUE_STRING;
    }

    /*
     * -------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    dispatchLoadMoreEvent() {
        /**
         * The event fired when more items should be loaded.
         *
         * @event
         * @name loadmore
         * @public
         */
        this.dispatchEvent(new CustomEvent('loadmore'));
    }

    dispatchPrivateItemsPerPanelChange() {
        /**
         * The event fired when the number of visible items per panel changes.
         *
         * @event
         * @name privateitemsperpanelchange
         * @param {number} value Number of visible items per panel.
         */
        this.dispatchEvent(
            new CustomEvent('privateitemsperpanelchange', {
                detail: { value: this.currentItemsPerPanel }
            })
        );
    }
}

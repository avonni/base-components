import { LightningElement, api } from 'lwc';
import { keyCodes } from 'c/utilsPrivate';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { AvonniResizeObserver } from 'c/resizeObserver';
import PaginationItem from './paginationItem';
import {
    endAnimation,
    updateActivePaginationItem
} from './paginationItemsUtils';

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
const MINIMUM_INDICATOR_ITEMS = 3;

const IMAGE_POSITIONS = {
    valid: ['top', 'left', 'right', 'bottom'],
    default: 'top'
};
const IMAGE_CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};

const INDICATOR_VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

const CAROUSEL_PANEL_TOUCH_DRAG_OFFSET = 25;
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
    _cropFit = IMAGE_CROP_FIT.default;
    _currentPanel;
    _enableInfiniteLoading = false;
    _hideIndicator = false;
    _imagePosition = IMAGE_POSITIONS.default;
    _indicatorVariant = INDICATOR_VARIANTS.default;
    _isLoading = false;
    _itemsPerPanel = DEFAULT_ITEMS_PER_PANEL;
    _largeItemsPerPanel;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _maxIndicatorItems;
    _mediumItemsPerPanel;
    _scrollDuration = DEFAULT_SCROLL_DURATION;
    _smallItemsPerPanel;

    _activePaginationItemIndex;
    _elementToFocus;
    _rendered = false;

    activePanelIndex = 0;
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
    paginationItemsTimeout;
    panelStyle;
    resizeObserver;

    connectedCallback() {
        this._connected = true;
    }

    renderedCallback() {
        if (!this._rendered) {
            this._initCarousel();
            if (!this.disableAutoScroll) {
                this.play();
            }
        }

        if (!this.resizeObserver && this.carouselIsResponsive) {
            this._initWrapObserver();
        }

        if (this._elementToFocus) {
            const element = this.template.querySelector(
                `[data-element-id="${this._elementToFocus}"]`
            );
            if (element) {
                element.focus();
            }
            this._elementToFocus = undefined;
        }

        this._computeItemsPerPanel();
        this._rendered = true;
    }

    disconnectedCallback() {
        this._connected = false;
        clearTimeout(this.paginationItemsTimeout);
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
     * Position of the actions. Valid values include top-left, top-right, bottom-left, bottom-right and bottom-center.
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
     * Changes the appearance of the actions. Valid values include bare, border, menu and stretch.
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
     * Image fit behaviour inside its container. Valid values include cover, contain, fill and none.
     *
     * @type {string}
     * @public
     * @default cover
     */
    @api
    get cropFit() {
        return this._cropFit;
    }
    set cropFit(cropFit) {
        this._cropFit = normalizeString(cropFit, {
            fallbackValue: IMAGE_CROP_FIT.default,
            validValues: IMAGE_CROP_FIT.valid
        });
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
            this._initCarousel();
            this._checkIfShouldLoadMore();
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
            this.first();
            this._initActivePaginationItemIndex();
            this._initPaginationItems();
            this._checkIfShouldLoadMore();
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
        clearTimeout(this.paginationItemsTimeout);
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

        if (this._connected) {
            this._initPaginationItems();
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

        if (this.template.activeElement) {
            this._elementToFocus =
                this.template.activeElement.dataset.elementId;
        }
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
            this._initCarousel();
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
            this._computeItemsPerPanel();
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
        this._largeItemsPerPanel = this._normalizeItemsPerPanel(value, 'large');

        if (this._connected) {
            this._computeItemsPerPanel();
        }
    }

    /**
     * Number of hidden panels left when the `loadmore` event should be fired. For example, if the value is `2`, the `loadmore` event will be fired when the user clicks on the “next” navigation button, and from this screen, they could click two more times on “next” before reaching the end of the items.
     * Depends on `enable-infinite-loading` being true.
     *
     * @type {number}
     * @default 3
     * @public
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }
    set loadMoreOffset(value) {
        const number = parseInt(value, 10);
        this._loadMoreOffset = number > 1 ? number : DEFAULT_LOAD_MORE_OFFSET;

        if (this._connected) {
            this._checkIfShouldLoadMore();
        }
    }

    /**
     * Maximum number of panels displayed in the indicator. If empty, one dot will be displayed for each panel.
     *
     * @type {number}
     * @public
     */
    @api
    get maxIndicatorItems() {
        return this._maxIndicatorItems;
    }
    set maxIndicatorItems(value) {
        const number = parseInt(value, 10);
        this._maxIndicatorItems =
            number >= MINIMUM_INDICATOR_ITEMS ? number : undefined;

        if (this._connected) {
            this.first();
            this._initActivePaginationItemIndex();
            this._initPaginationItems();
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
        this._mediumItemsPerPanel = this._normalizeItemsPerPanel(
            value,
            'medium'
        );
        if (this._connected) {
            this._computeItemsPerPanel();
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
        this._smallItemsPerPanel = this._normalizeItemsPerPanel(value, 'small');

        if (this._connected) {
            this._computeItemsPerPanel();
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
        return classSet('slds-m-left_x-small slds-m-top_xx-small').add({
            'avonni-carousel__autoscroll-button-with-indicator':
                !this.hideIndicator
        });
    }

    /**
     * Return the number of panels.
     *
     * @type {number}
     */
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
        return !this.isInfinite || this.enableInfiniteLoading
            ? this.activePanelIndex === this.nbOfPanels - 1
            : null;
    }

    /**
     * If navigation is not infinite - set previous panel as disabled.
     *
     * @type {number}
     */
    get previousPanelNavigationDisabled() {
        return !this.isInfinite || this.enableInfiniteLoading
            ? this.activePanelIndex === 0
            : null;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Go to first slide.
     *
     * @public
     */
    @api
    first() {
        this._selectNewPanel(0);
    }

    /**
     * Go to last slide.
     *
     * @public
     */
    @api
    last() {
        this._selectNewPanel(this.paginationItems.length - 1);
    }

    /**
     * Go to next slide.
     *
     * @public
     */
    @api
    next() {
        this.pause();
        this._unselectCurrentPanel();
        const panelIndex =
            this.activePanelIndex < this.nbOfPanels - 1
                ? this.activePanelIndex + 1
                : 0;
        this._selectNewPanel(panelIndex);
        this._checkIfShouldLoadMore();
    }

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
            this.isLoading ||
            (this.activePanelIndex === carouselPanelsLength - 1 &&
                (this.disableAutoRefresh || !this.isInfinite))
        ) {
            this.pause();
            return;
        }

        this.pause();
        this.autoScrollTimeOut = setTimeout(
            this._startAutoScroll.bind(this),
            scrollDuration
        );

        this.autoScrollOn = true;
        this.autoScrollIcon = DEFAULT_AUTOCROLL_PAUSE_ICON;
    }

    /**
     * Go to previous slide.
     *
     * @public
     */
    @api
    previous() {
        this.pause();
        this._unselectCurrentPanel();
        const panelIndex =
            this.activePanelIndex > 0
                ? this.activePanelIndex - 1
                : this.nbOfPanels - 1;
        this._selectNewPanel(panelIndex);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Animates the drag movement.
     */
    _animatePanelDrag(dragDirection) {
        const carouselPanel = this.template.querySelector(
            `.avonni-carousel__panel:nth-child(${this.activePanelIndex + 1})`
        );
        carouselPanel.classList.add(
            `avonni-carousel__panel-drag-${dragDirection}`
        );
        setTimeout(() => {
            carouselPanel.classList.remove(
                `avonni-carousel__panel-drag-${dragDirection}`
            );
        }, 201);
    }

    /**
     * Verifies if the carousel should load more items.
     */
    _checkIfShouldLoadMore() {
        if (!this.enableInfiniteLoading) {
            return;
        }
        const nbPanelsLeft = this.nbOfPanels - (this.activePanelIndex + 1);
        if (nbPanelsLeft <= this.loadMoreOffset) {
            this.dispatchLoadMoreEvent();
        }
    }

    /**
     * Computes the items per panel.
     */
    _computeItemsPerPanel() {
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
            this._initCarousel();
            this._checkIfShouldLoadMore();
            this.dispatchPrivateItemsPerPanelChange();
        }
    }

    _initActivePaginationItemIndex() {
        const maxItems = this.maxIndicatorItems;
        const panelIndex = this.activePanelIndex;
        const allPaginationItemsAreVisible =
            !maxItems || maxItems >= this.nbOfPanels;
        const currentPanelIsAtBeginning =
            this.currentPanel &&
            this.maxIndicatorItems - 2 > this.activePanelIndex;
        const firstItemIsActive = this._activePaginationItemIndex === 1;
        const firstPanelIsSelected = this.activePanelIndex === 0;
        const lastItemIsActive = this._activePaginationItemIndex === maxItems;
        const lastPanelIsSelected =
            this.activePanelIndex === this.nbOfPanels - 1;

        if (allPaginationItemsAreVisible) {
            this._activePaginationItemIndex = panelIndex || 0;
        } else if (!panelIndex) {
            this._activePaginationItemIndex = 1;
        } else if (currentPanelIsAtBeginning) {
            this._activePaginationItemIndex = this.activePanelIndex + 1;
        } else if (lastItemIsActive && !lastPanelIsSelected) {
            this._activePaginationItemIndex = maxItems - 1;
        } else if (lastPanelIsSelected) {
            this._activePaginationItemIndex = maxItems;
        } else if (firstItemIsActive && !firstPanelIsSelected) {
            this._activePaginationItemIndex = 2;
        }
    }

    /**
     * Initialize Carousel method.
     */
    _initCarousel() {
        this._initCurrentPanel();
        this._initPaginationItems();
        this._initPanels();
    }

    /**
     * Set the active panel index, based on the value of `current-panel`.
     */
    _initCurrentPanel() {
        const itemIndex = this.currentPanel
            ? this.items.findIndex((item) => item.name === this.currentPanel)
            : 0;
        const panelIndex =
            itemIndex > -1
                ? Math.floor(itemIndex / this.currentItemsPerPanel)
                : 0;
        this.activePanelIndex = panelIndex;
        this._initActivePaginationItemIndex();
    }

    /**
     * Initialize Pagination items method.
     */
    _initPaginationItems() {
        clearTimeout(this.paginationItemsTimeout);
        this.paginationItems = [];

        const nbOfItems =
            this.maxIndicatorItems < this.nbOfPanels
                ? this.maxIndicatorItems + 2
                : this.nbOfPanels;

        for (let i = 0; i < nbOfItems; i++) {
            this.paginationItems.push(
                new PaginationItem({
                    activePanelIndex: this.activePanelIndex,
                    index: i,
                    isActive: i === this._activePaginationItemIndex,
                    maxItems:
                        this.maxIndicatorItems < this.nbOfPanels
                            ? this.maxIndicatorItems
                            : undefined,
                    nbOfPanels: this.nbOfPanels,
                    variant: this.indicatorVariant
                })
            );
        }
    }

    /**
     * Creates an array of panels, each containing an array of items.
     */
    _initPanels() {
        const panelItems = [];
        let panelIndex = 0;
        for (
            let i = 0;
            i < this._carouselItems.length;
            i += this.currentItemsPerPanel
        ) {
            const isHidden =
                this.activePanelIndex === panelIndex
                    ? FALSE_STRING
                    : TRUE_STRING;
            panelItems.push({
                index: panelIndex,
                key: `panel-${panelIndex}`,
                items: this._carouselItems.slice(
                    i,
                    i + this.currentItemsPerPanel
                ),
                tabIndex: isHidden === TRUE_STRING ? -1 : 0,
                ariaHidden: isHidden,
                ariaLabelledby: `pagination-item-${panelIndex}`,
                isActive: isHidden !== TRUE_STRING
            });
            panelIndex += 1;
        }
        this.panelItems = panelItems;

        // Remove the transition so the carousel is not animated on render,
        // if a current-panel was selected
        this.panelStyle = `
            transition: none;
            transform: translateX(-${this.activePanelIndex * 100}%);
        `;
    }

    /**
     * Setup the carousel resize observer. Used to update the number of items per panel when the carousel is resized.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    _initWrapObserver() {
        if (!this.carouselContainer) {
            return;
        }
        this.resizeObserver = new AvonniResizeObserver(
            this.carouselContainer,
            this._computeItemsPerPanel.bind(this)
        );
    }

    /**
     * Ensure items per panel is an accepted value, otherwise unset it.
     */
    _normalizeItemsPerPanel(value, size) {
        const number = parseInt(value, 10);
        if (ITEMS_PER_PANEL.includes(number)) {
            this.columnsCount[size] = number;
            return number;
        }
        this.columnsCount[size] = undefined;
        return undefined;
    }

    /**
     * New panel selection method.
     *
     * @param {number} panelIndex
     */
    _selectNewPanel(panelIndex) {
        const activePanelItem = this.panelItems[panelIndex];
        if (!activePanelItem) {
            return;
        }

        activePanelItem.isActive = true;
        activePanelItem.ariaHidden = FALSE_STRING;
        activePanelItem.tabIndex = 0;
        this.panelStyle = `transform:translateX(-${panelIndex * 100}%);`;
        const goToPrevious = panelIndex < this.activePanelIndex;
        const jumpedPanels = Math.abs(this.activePanelIndex - panelIndex);
        this.activePanelIndex = panelIndex;
        this._activePaginationItemIndex = updateActivePaginationItem({
            activeItemIndex: this._activePaginationItemIndex,
            carousel: this,
            goToPrevious,
            jumpedPanels,
            maxItems: this.maxIndicatorItems,
            items: this.paginationItems,
            nbOfPanels: this.nbOfPanels,
            panelIndex
        });

        if (activePanelItem.items[0]) {
            // Update the current panel for consistency
            // and to make sure there is no jump if more items are loaded
            this._currentPanel = activePanelItem.items[0].name;
            this.dispatchCurrentPanelChange(activePanelItem.items[0]);
        }
    }

    /**
     * Call the auto scroll.
     */
    _startAutoScroll() {
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
    _unselectCurrentPanel() {
        const activePaginationItem =
            this.paginationItems[this.activePanelIndex];
        const activePanelItem = this.panelItems[this.activePanelIndex];

        if (!activePaginationItem || !activePanelItem) return;
        activePanelItem.isActive = false;
        activePanelItem.ariaHidden = TRUE_STRING;
        activePanelItem.tabIndex = -1;
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Item clicked event handler.
     *
     * @param {event}
     */
    handleActionClick(event) {
        const { name, item } = event.detail;
        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name Name of the action clicked.
         * @param {object} item Item the action belongs to.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name,
                    item
                }
            })
        );
    }

    /**
     * Panel dragged by touch event handler.
     *
     * @param {Event} start touchdown event
     */
    handleDragStart(start) {
        start.preventDefault();

        const startPosition = start.changedTouches[0].clientX;

        const handleDragEnd = (end) => {
            window.removeEventListener('touchend', handleDragEnd);

            const endPosition = end.changedTouches[0].clientX;
            const offset = startPosition - endPosition;
            const isDragLeft = offset > CAROUSEL_PANEL_TOUCH_DRAG_OFFSET;
            const isDragRight = offset < -CAROUSEL_PANEL_TOUCH_DRAG_OFFSET;

            let dragDirection = '';

            if (isDragLeft && !this.nextPanelNavigationDisabled) {
                this.next();
                dragDirection = 'left';
            } else if (isDragRight && !this.previousPanelNavigationDisabled) {
                this.previous();
                dragDirection = 'right';
            }

            this._animatePanelDrag(dragDirection);
        };

        window.addEventListener('touchend', handleDragEnd);
    }

    /**
     * Item clicked event handler.
     *
     * @param {event}
     */
    handleItemClick(event) {
        const { item } = event.detail;
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
                    item
                }
            })
        );
    }

    /**
     * Key down event handler.
     *
     * @param {Event}
     */
    handleKeyDown(event) {
        if (this.isLoading) {
            return;
        }
        const key = event.keyCode;
        let indicatorActionsElements = this.indicatorActionsElements;

        if (key === keyCodes.right) {
            event.preventDefault();
            event.stopPropagation();

            this.pause();
            if (
                this.activePanelIndex < this.panelItems.length - 1 ||
                this.isInfinite
            ) {
                this.next();
            }
        }

        if (key === keyCodes.left) {
            event.preventDefault();
            event.stopPropagation();

            this.pause();
            if (this.activePanelIndex > 0 || this.isInfinite) {
                this.previous();
            }
        }

        // we cache them the first time
        if (!indicatorActionsElements) {
            indicatorActionsElements = this.template.querySelectorAll(
                '[data-element-id="a-pagination"]'
            );
            this.indicatorActionsElements = indicatorActionsElements;
        }

        // we want to make sure that while we are using the keyboard
        // navigation we are focusing on the right indicator
        if (indicatorActionsElements[this.activePanelIndex]) {
            indicatorActionsElements[this.activePanelIndex].focus();
        }
    }

    /**
     * Animation end event handler.
     *
     * @param {event}
     */
    handlePaginationItemAnimationEnd(event) {
        endAnimation({
            activeIndex: this._activePaginationItemIndex,
            element: event.currentTarget,
            items: this.paginationItems
        });
    }

    /**
     * Panel selection event method.
     *
     * @param {Event}
     */
    handlePaginationItemClick(event) {
        if (this.isLoading) {
            return;
        }
        this.pause();
        const itemIndex = parseInt(event.currentTarget.dataset.index, 10);
        const goToNext = itemIndex > this._activePaginationItemIndex;
        let panelIndex;
        if (goToNext) {
            panelIndex =
                this.activePanelIndex +
                (itemIndex - this._activePaginationItemIndex);
        } else {
            panelIndex =
                this.activePanelIndex -
                (this._activePaginationItemIndex - itemIndex);
        }

        if (this.activePanelIndex !== panelIndex) {
            this._unselectCurrentPanel();
            this._selectNewPanel(panelIndex);

            if (goToNext) {
                this._checkIfShouldLoadMore();
            }
        }
    }

    /**
     * Prevent event default handler.
     *
     * @param {Event} event
     */
    handlePreventDefault(event) {
        event.preventDefault();
    }

    dispatchCurrentPanelChange(item) {
        /**
         * The event fired when the currently visible panel changes.
         *
         * @event
         * @name currentpanelchange
         * @param {object} item Data of the panel's first item.
         * @param {string} name Name of the panel's first item.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('currentpanelchange', {
                detail: {
                    item,
                    name: this.currentPanel
                }
            })
        );
    }

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

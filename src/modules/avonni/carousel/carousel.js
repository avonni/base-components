import { LightningElement, api } from 'lwc';
import { keyCodes } from 'avonni/utilsPrivate';

const INDICATOR_ACTION = 'slds-carousel__indicator-action';
const SLDS_ACTIVE = 'slds-is-active';
const FALSE_STRING = 'false';
const TRUE_STRING = 'true';

const i18n = {
	autoPlay: 'Start / Stop auto-play',
	nextPanel: 'Next Panel',
	previousPanel: 'Previous Panel'
};

export default class Carousel extends LightningElement {
	@api currentPanel;
	@api disableAutoRefresh;
	@api disableAutoScroll;
	@api hidePreviousNextPanelNavigation;
	@api isInfinite;
	@api scrollDuration = 5;
	
	_assistiveText = {
		autoplayButton: i18n.autoPlay,
		nextPanel: i18n.nextPanel,
		previousPanel: i18n.previousPanel
	};
	_carouselItems = [];
	_itemsPerPanel = 1;
	_initialRender = true;
	
	activeIndexPage;
	autoScrollTimeOut;
	pageItems = [];
	paginationItems = [];
	pageStyle;
	
	
	connectedCallback() {
		const numberOfPages = Math.ceil(this._carouselItems.length / this.itemsPerPanel);
		
		this.initializeCurrentPanel(numberOfPages);
		this.initializePaginationItems(numberOfPages);
		this.initializePages();
	}
	
	renderedCallback() {
		if (this._initialRender) {
			if (!this.disableAutoScroll) {
				this.setAutoScroll();
			}
		}
		this._initialRender = false;
	}
	
	
	initializePaginationItems(numberOfPages) {
		for (let i = 0; i < numberOfPages; i++) {
			const isItemActive = i === this.activeIndexPage;
			this.paginationItems.push({
				key: i,
				id: `pagination-item-${i}`,
				className: isItemActive ? INDICATOR_ACTION + ' ' + SLDS_ACTIVE
				: INDICATOR_ACTION,
				tabIndex: isItemActive ? '0' : '-1',
				ariaSelected: isItemActive ? TRUE_STRING : FALSE_STRING,
				tabTitle: `Tab ${i}`
			})
		}
	}
	
	initializeCurrentPanel(numberOfPages) {
		const firstPanel = parseInt(this.currentPanel, 10);
		this.activeIndexPage = firstPanel < numberOfPages ? firstPanel : 0;
	}
	
	// Creates an array of pages, each containing an array of items
	initializePages() {
		const pageItems = [];
		let pageIndex = 0;
		for (let i = 0; i < this._carouselItems.length; i += this.itemsPerPanel) {
			pageItems.push({
				index: pageIndex,
				key: `page-${pageIndex}`,
				items: this._carouselItems.slice(i, i + this.itemsPerPanel),
				ariaHidden: this.activeIndexPage === i ? FALSE_STRING : TRUE_STRING
			});
			pageIndex += 1;
		}
		this.pageItems = pageItems;
		this.pageStyle = `transform: translateX(-${this.activeIndexPage * 100}%);`
	}
	
	setAutoScroll() {
		const scrollDuration = parseInt(this.scrollDuration, 10) * 1000;
		const carouselPagesLength = this.pageItems.length;
		
		if (this.activeIndexPage === carouselPagesLength - 1 && (this.disableAutoRefresh || !this.isInfinite)) {
			this.cancelAutoScrollTimeOut();
			return;
		}
		
		this.cancelAutoScrollTimeOut();
		this.autoScrollTimeOut = setTimeout(
			this.startAutoScroll.bind(this),
			scrollDuration
		);
	}
		
	startAutoScroll() {
		this.selectNextSibling();
		this.setAutoScroll();
	}
	
	cancelAutoScrollTimeOut() {
		clearTimeout(this.autoScrollTimeOut);
	}
	
	@api get assistiveText() {
		return this._assistiveText;
	}
	set assistiveText(value) {
		this._assistiveText = {
			autoplayButton: value.autoplayButton || this._assistiveText.autoplayButton,
			nextPanel: value.nextPanel || this._assistiveText.nextPanel,
			previousPanel: value.previousPanel || this._assistiveText.previousPanel
		};
	}
	
	@api 
	get items() {
		return this._carouselItems;
	}
	set items(allItems) {
		allItems.forEach((item) => {
			this._carouselItems.push({
				key: item.id,
				heading: item.heading,
				description: item.description,
				buttonLabel: item.buttonLabel || null,
				buttonIconName: item.buttonIconName,
				buttonIconPosition: item.buttonIconPosition,
				buttonVariant: item.buttonVariant,
				buttonDisabled: item.buttonDisabled,
				imageAssistiveText: item.imageAssistiveText || item.heading,
				href: item.href || 'javascript:void(0);',
				src: item.src
			});
		});
	}
	
	@api
	get itemsPerPanel() {
		return this._itemsPerPanel;
	}
	set itemsPerPanel(number) {
		this._itemsPerPanel = parseInt(number, 10);
	}
	
	// Sets the width of each item, depending on the number of items per panel
	get carouselItemStyle() {
		const flexBasis = 100 / this.itemsPerPanel;
		return `flex-basis: ${flexBasis}%;`
	}
	
	get previousPanelNavigationDisabled() {
		return !this.isInfinite ? this.activeIndexPage === 0 : null;
	}
	get nextPanelNavigationDisabled() {
		return !this.isInfinite ? this.activeIndexPage === this.paginationItems.length - 1 : null;
	}
	
	handleItemClicked(event) {
		const pageNumber = parseInt(event.currentTarget.dataset.pageIndex, 10);
		const itemNumber = parseInt(event.currentTarget.dataset.itemIndex, 10);
		const itemData = this.pageItems[pageNumber].items[itemNumber];
		this.dispatchEvent(new CustomEvent(
			'itemclick', { detail: itemData }
		));
	}
	
	onPageSelect(event) {
		const currentTarget = event.currentTarget;
		const itemIndex = parseInt(currentTarget.dataset.index, 10);
		
		if (this.activeIndexPage !== itemIndex) {
			this.unselectCurrentPage();
			this.selectNewPage(itemIndex);
		}
	}
	
	selectNewPage(pageIndex) {
		const activePaginationItem = this.paginationItems[pageIndex];
		const activePageItem = this.pageItems[pageIndex];
		
		activePageItem.ariaHidden = FALSE_STRING;
		activePaginationItem.tabIndex = '0';
		activePaginationItem.ariaHidden = TRUE_STRING;
		activePaginationItem.className =
		INDICATOR_ACTION + ' ' + SLDS_ACTIVE;
		
		this.pageStyle = `transform:translateX(-${
			pageIndex * 100
		}%);`;
		this.activeIndexPage = pageIndex;
	}
	
	unselectCurrentPage() {
		const activePaginationItem = this.paginationItems[this.activeIndexPage];
		const activePageItem = this.pageItems[this.activeIndexPage];
		
		activePageItem.ariaHidden = TRUE_STRING;
		activePaginationItem.tabIndex = '-1';
		activePaginationItem.ariaSelected = FALSE_STRING;
		activePaginationItem.className = INDICATOR_ACTION;
	}
	
	selectPreviousSibling() {
		this.unselectCurrentPage();
		if (this.activeIndexPage > 0) {
			this.activeIndexPage -= 1;
		} else {
			this.activeIndexPage = this.paginationItems.length - 1;
		}
		this.selectNewPage(this.activeIndexPage);
	}
	
	selectNextSibling() {
		this.unselectCurrentPage();
		if (this.activeIndexPage < this.paginationItems.length - 1){
			this.activeIndexPage += 1;
		} else {
			this.activeIndexPage = 0;
		}
		this.selectNewPage(this.activeIndexPage);
	}
	
	keyDownHandler(event) {
		const key = event.keyCode;
		let indicatorActionsElements = this.indicatorActionsElements;
		
		if (key === keyCodes.right) {
			event.preventDefault();
			event.stopPropagation();

			this.cancelAutoScrollTimeOut();
			if(this.activeIndexPage < this.pageItems.length - 1 || this.isInfinite) {
				this.selectNextSibling();
			}
		}

		if (key === keyCodes.left) {
			event.preventDefault();
			event.stopPropagation();

			this.cancelAutoScrollTimeOut();
			if(this.activeIndexPage > 0 || this.isInfinite) {
				this.selectPreviousSibling();
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
        indicatorActionsElements[this.activeIndexPage].focus();
	}
}

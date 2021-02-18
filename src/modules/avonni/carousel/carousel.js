import { LightningElement, api } from 'lwc';

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
	@api scrollDuration;
	
	_assistiveText = {
		autoplayButton: i18n.autoPlay,
		nextPanel: i18n.nextPanel,
		previousPanel: i18n.previousPanel
	};
	_carouselItems = [];
	_itemsPerPanel = 1;
	
	activeIndexPage;
	pageItems = [];
	paginationItems = [];
	pageStyle;
	
	
	connectedCallback() {
		const numberOfPages = Math.ceil(this._carouselItems.length / this.itemsPerPanel);
		
		this.initializeCurrentPanel(numberOfPages);
		this.initializePaginationItems(numberOfPages);
		this.initializePages();
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
				items: this._carouselItems.slice(i, i + this.itemsPerPanel)
			});
			pageIndex += 1;
		}
		this.pageItems = pageItems;
		this.pageStyle = `transform: translateX(-${this.activeIndexPage * 100}%);`
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
		return this.activeIndexPage === 0;
	}
	get nextPanelNavigationDisabled() {
		return this.activeIndexPage === this.paginationItems.length - 1;
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
		
		activePaginationItem.tabIndex = '0';
		activePaginationItem.ariaSelected = TRUE_STRING;
		activePaginationItem.className =
		INDICATOR_ACTION + ' ' + SLDS_ACTIVE;
		
		this.pageStyle = `transform:translateX(-${
			pageIndex * 100
		}%);`;
		this.activeIndexPage = pageIndex;
	}
	
	unselectCurrentPage() {
		const activePaginationItem = this.paginationItems[this.activeIndexPage];
		
		activePaginationItem.tabIndex = '-1';
		activePaginationItem.ariaSelected = FALSE_STRING;
		activePaginationItem.className = INDICATOR_ACTION;
	}

	handlePreviousClick() {
		this.unselectCurrentPage();
		this.activeIndexPage -= 1;
		this.selectNewPage(this.activeIndexPage);
	}

	handleNextClick() {
		this.unselectCurrentPage();
		this.activeIndexPage += 1;
		this.selectNewPage(this.activeIndexPage);
	}
	
	keyDownHandler(event) {
		// Handle keyboard navigation
	}
}
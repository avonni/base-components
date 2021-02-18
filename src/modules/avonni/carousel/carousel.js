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
	get i18n() {
		return i18n;
	}
	
	@api assistiveText = {
		autoplayButton: i18n.autoPlay,
		nextPanel: i18n.nextPanel,
		previousPanel: i18n.previousPanel
	}
	@api currentPanel;
	@api disableAutoRefresh;
	@api disableAutoScroll;
	@api hidePreviousNextPanelNavigation;
	@api isInfinite;
	@api scrollDuration;
	
	_carouselItems = [];
	_itemsPerPanel = 1;
	
	activeIndexPage = 0;
	pageItems = [];
	paginationItems = [];
	pageStyle = `transform: translateX(-0%);`;
	
	
	connectedCallback() {	
		this.initializePaginationItems();
		this.initializePages();
	}
	
	initializePaginationItems() {
		const numberOfPages = Math.ceil(this._carouselItems.length / this.itemsPerPanel);

		for (let i = 1; i <= numberOfPages; i++) {
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
	}

	// Sets the width of each item, depending on the number of items per panel
	get carouselItemStyle() {
		const flexBasis = 100 / this.itemsPerPanel;
		return `flex-basis: ${flexBasis}%;`
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
	
	onItemSelect(event) {
		const currentTarget = event.currentTarget;
		const itemIndex = currentTarget.dataset.index;
		console.log(itemIndex);
		// Change to the selected slide
	}
	
	keyDownHandler(event) {
		// Handle keyboard navigation
	}
}
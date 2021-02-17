import { LightningElement, api } from 'lwc';

export default class CarouselBasic extends LightningElement {
	// TODO
	@api assistiveText = {
		autoplayButton: 'Start / Stop auto-play',
		nextPanel: 'Next Panel',
		previousPanel: 'Previous Panel'
	}
	@api currentPanel;
	@api disableAutoRefresh;
	@api disableAutoScroll;
	@api hidePreviousNextPanelNavigation;
	@api isInfinite;
	@api items = [];
	@api itemsPerPanel;
	@api scrollDuration;

	paginationItems = [];

	onItemSelect(event) {
		// Dispatch itemclick
	}

	keyDownHandler(event) {
		// Handle keyboard navigation
    }
}
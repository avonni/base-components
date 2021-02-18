import { LightningElement, api } from 'lwc';

export default class Carousel extends LightningElement {
    @api assistiveText;
    @api currentPanel;
    @api disableAutoRefresh;
    @api disableAutoScroll;
    @api hidePreviousNextPanelNavigation;
    @api isInfinite;
    @api items;
    @api itemsPerPanel;
    @api scrollDuration;
}

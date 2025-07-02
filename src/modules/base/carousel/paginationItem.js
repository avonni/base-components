import { classSet, generateUUID, normalizeBoolean } from 'c/utils';

export default class CarouselPaginationItem {
    constructor(props) {
        this.activePanelIndex = parseInt(props.activePanelIndex, 10) || 0;
        this.key = generateUUID();
        this.index = props.index;
        this.isActive = normalizeBoolean(props.isActive);
        this.maxItems = parseInt(props.maxItems, 10);
        this.nbOfPanels = parseInt(props.nbOfPanels, 10) || 0;
        this.tabIndex = this.isActive ? '0' : '-1';
        this.variant = props.variant;
    }

    get ariaSelected() {
        return this.isActive ? 'true' : 'false';
    }

    get ariaControls() {
        return `panel-${this.index}`;
    }

    get className() {
        const lastPanelIsActive = this.activePanelIndex === this.nbOfPanels - 1;
        const firstPanelIsActive = this.activePanelIndex === 0;

        return classSet('slds-carousel__indicator-action')
            .add({
                'slds-is-relative avonni-carousel__progress-indicator_infinite-loading':
                    this.maxItems,
                'avonni-carousel__progress-indicator__hidden':
                    this.maxItems && (this.isFirst || this.isLast),
                'avonni-carousel__progress-indicator__small':
                    this.maxItems &&
                    ((!firstPanelIsActive && this.index === 1) ||
                        (this.isPenultimate && !lastPanelIsActive)),
                'avonni-carousel__progress-indicator_inactive':
                    this.variant === 'base',
                'avonni-carousel__progress-indicator_shaded-inactive':
                    this.variant !== 'base',
                'slds-is-active': this.isActive,
                'avonni-carousel__progress-indicator_active':
                    this.isActive && this.variant === 'base',
                'avonni-carousel__progress-indicator_shaded-active':
                    this.isActive && this.variant !== 'base'
            })
            .toString();
    }

    get elementId() {
        return `pagination-item-${this.index}`;
    }

    get isFirst() {
        return this.index === 0;
    }

    get isLast() {
        return this.index === this.maxItems + 1;
    }

    get isPenultimate() {
        return this.index === this.maxItems;
    }

    get nextAnimationClass() {
        const movingFromBeginning = this.activePanelIndex === 1;
        const movingToEnd = this.activePanelIndex === this.nbOfPanels - 1;
        const isInTheMiddle = this.index > 2 && this.index < this.maxItems;

        if (this.isPenultimate && movingToEnd) {
            return 'avonni-carousel__progress-indicator_to-big';
        } else if (this.index === 1 && movingFromBeginning) {
            return 'avonni-carousel__progress-indicator_to-small';
        } else if (movingToEnd || movingFromBeginning) {
            return '';
        } else if (this.index === 1) {
            return 'avonni-carousel__progress-indicator_to-hidden-left';
        } else if (this.index === 2) {
            return 'avonni-carousel__progress-indicator_to-small-left';
        } else if (isInTheMiddle) {
            return 'avonni-carousel__progress-indicator_to-left';
        } else if (this.isPenultimate) {
            return 'avonni-carousel__progress-indicator_to-big-left';
        } else if (this.isLast) {
            return 'avonni-carousel__progress-indicator_to-visible-left';
        }
        return '';
    }

    get previousAnimationClass() {
        const movingToBeginning = this.activePanelIndex === 0;
        const movingFromEnd = this.activePanelIndex === this.nbOfPanels - 2;
        const isInTheMiddle = this.index > 1 && this.index < this.maxItems - 1;

        if (this.index === 1 && movingToBeginning) {
            return 'avonni-carousel__progress-indicator_to-big';
        } else if (this.isPenultimate && movingFromEnd) {
            return 'avonni-carousel__progress-indicator_to-small';
        } else if (movingToBeginning || movingFromEnd) {
            return '';
        } else if (this.isFirst) {
            return 'avonni-carousel__progress-indicator_to-visible-right';
        } else if (this.index === 1) {
            return 'avonni-carousel__progress-indicator_to-big-right';
        } else if (isInTheMiddle) {
            return 'avonni-carousel__progress-indicator_to-right';
        } else if (this.index === this.maxItems - 1) {
            return 'avonni-carousel__progress-indicator_to-small-right';
        } else if (this.isPenultimate) {
            return 'avonni-carousel__progress-indicator_to-hidden-right';
        }
        return '';
    }

    get tabTitle() {
        return `Tab ${this.index}`;
    }
}

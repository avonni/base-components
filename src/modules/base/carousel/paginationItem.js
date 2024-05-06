import { classSet, generateUUID } from 'c/utils';
import { normalizeBoolean } from 'c/utilsPrivate';

export default class CarouselPaginationItem {
    constructor(props) {
        this.activeIndexPanel = parseInt(props.activeIndexPanel, 10) || 0;
        this.enableInfiniteLoading = normalizeBoolean(
            props.enableInfiniteLoading
        );
        this.key = generateUUID();
        this.index = props.index;
        this.isActive = normalizeBoolean(props.isActive);
        this.lastPanelIndex = parseInt(props.lastPanelIndex, 10) || 0;
        this.tabIndex = this.isActive ? '0' : '-1';
        this.variant = props.variant;
    }

    get ariaSelected() {
        return this.isActive ? 'true' : 'false';
    }

    get className() {
        return classSet('slds-carousel__indicator-action')
            .add({
                'slds-is-relative avonni-carousel__progress-indicator_infinite-loading':
                    this.enableInfiniteLoading,
                'avonni-carousel__progress-indicator__hidden':
                    this.enableInfiniteLoading &&
                    (this.index === 0 || this.index === 5),
                'avonni-carousel__progress-indicator__small':
                    this.enableInfiniteLoading &&
                    ((this.activeIndexPanel >= 3 && this.index === 1) ||
                        (this.index === 4 &&
                            this.activeIndexPanel < this.lastPanelIndex - 2)),
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

    get previousAnimationClass() {
        const isMovingToBeginning = this.activeIndexPanel < 3;
        switch (this.index) {
            case 0:
                return isMovingToBeginning
                    ? 'avonni-carousel__progress-indicator_to-visible-big-right'
                    : 'avonni-carousel__progress-indicator_to-visible-right';
            case 1:
                return 'avonni-carousel__progress-indicator_to-big-right';
            case 2:
                return 'avonni-carousel__progress-indicator_to-right';
            case 3:
                return 'avonni-carousel__progress-indicator_to-small-right';
            case 4:
                return 'avonni-carousel__progress-indicator_to-hidden-right';
            default:
                return '';
        }
    }

    get nextAnimationClass() {
        switch (this.index) {
            case 1:
                return 'avonni-carousel__progress-indicator_to-hidden-left';
            case 2:
                return 'avonni-carousel__progress-indicator_to-small-left';
            case 3:
                return 'avonni-carousel__progress-indicator_to-left';
            case 4:
                return 'avonni-carousel__progress-indicator_to-big-left';
            case 5:
                return 'avonni-carousel__progress-indicator_to-visible-left';
            default:
                return '';
        }
    }

    get tabTitle() {
        return `Tab ${this.index}`;
    }
}

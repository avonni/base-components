import { classSet, generateUUID } from 'c/utils';
import { normalizeBoolean } from 'c/utilsPrivate';

export default class CarrouselPaginationItem {
    constructor(props) {
        this.enableInfiniteLoading = normalizeBoolean(
            props.enableInfiniteLoading
        );
        this.key = generateUUID();
        this.index = props.index;
        this.isActive = normalizeBoolean(props.isActive);
        this.tabIndex = this.isActive ? '0' : '-1';
        this.variant = props.variant;
    }

    get ariaSelected() {
        return this.isActive ? 'true' : 'false';
    }

    get className() {
        return classSet('slds-carousel__indicator-action')
            .add({
                'slds-is-relative': this.enableInfiniteLoading,
                'avonni-carousel__progress-indicator__hidden':
                    this.enableInfiniteLoading &&
                    (this.index === 0 || this.index === 5),
                'avonni-carousel__progress-indicator__small':
                    this.enableInfiniteLoading &&
                    (this.index === 1 || this.index === 4),
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

    get tabTitle() {
        return `Tab ${this.index}`;
    }
}

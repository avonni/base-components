import { LightningElement, api } from 'lwc';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString,
    observePosition
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const POPOVER_SIZES = {
    valid: ['small', 'medium', 'large'],
    default: 'medium'
};

const PLACEMENTS = {
    valid: [
        'auto',
        'left',
        'right',
        'center',
        'bottom-left',
        'bottom-right',
        'bottom-center'
    ],
    default: 'left'
};

const THEMES = {
    valid: ['default', 'shade', 'inverse'],
    default: 'default'
};

const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading';

export default class HoverableLink extends LightningElement {
    @api label;
    @api href;
    @api title;
    @api titleHref;
    @api avatarSrc;
    @api avatarFallbackIconName;

    _fields = [];
    _popoverSize = POPOVER_SIZES.default;
    _placement = PLACEMENTS.default;
    _isLoading = false;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _theme = THEMES.default;

    popoverVisible = false;

    @api
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = normalizeArray(value);
    }

    @api
    get popoverSize() {
        return this._popoverSize;
    }
    set popoverSize(value) {
        this._popoverSize = normalizeString(value, {
            fallbackValue: POPOVER_SIZES.default,
            validValues: POPOVER_SIZES.valid
        });
    }

    @api
    get placement() {
        return this._placement;
    }
    set placement(value) {
        this._placement = normalizeString(value, {
            fallbackValue: PLACEMENTS.default,
            validValues: PLACEMENTS.valid
        });
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(bool) {
        this._isLoading = normalizeBoolean(bool);
    }

    @api
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string'
                ? value
                : DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    }

    @api
    get theme() {
        return this._theme;
    }
    set theme(value) {
        this._theme = normalizeString(value, {
            fallbackValue: THEMES.default,
            validValues: THEMES.valid
        });
    }

    get showPopoverHeader() {
        return (
            this.title ||
            this.titleHref ||
            this.avatarSrc ||
            this.avatarFallbackIconName
        );
    }

    get showAvatar() {
        return this.avatarSrc || this.avatarFallbackIconName;
    }

    get showFields() {
        return this.fields.length > 0;
    }

    get computedLabel() {
        return this.label || this.href;
    }

    get computedTitle() {
        return this.title || this.titleHref;
    }

    get computedAriaExpanded() {
        return String(this.popoverVisible);
    }

    get computedPopoverClass() {
        return classSet('slds-popover')
            .add({
                'slds-dropdown_left':
                    this.placement === 'left' || this.isAutoAlignment(),
                'slds-dropdown_center': this.placement === 'center',
                'slds-dropdown_right': this.placement === 'right',
                'slds-dropdown_bottom': this.placement === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this.placement === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this.placement === 'bottom-left',
                'slds-nubbin_top-left': this.placement === 'left',
                'slds-nubbin_top-right': this.placement === 'right',
                'slds-nubbin_top': this.placement === 'center',
                'slds-nubbin_bottom-left': this.placement === 'bottom-left',
                'slds-nubbin_bottom-right': this.placement === 'bottom-right',
                'slds-nubbin_bottom': this.placement === 'bottom-center',
                'slds-p-vertical_large': this.isLoading,
                'slds-popover_small': this.popoverSize === 'small',
                'slds-popover_medium': this.popoverSize === 'medium',
                'slds-popover_large': this.popoverSize === 'large'
            })
            .toString();
    }

    get computedPopoverWrapperClass() {
        const topSpacing =
            this.placement === 'left' ||
            this.placement === 'right' ||
            this.placement === 'center' ||
            this.isAutoAlignment();

        return classSet()
            .add({
                'popover-top': topSpacing,
                'popover-bottom': this.placement.startsWith('bottom')
            })
            .toString();
    }

    @api
    open() {
        if (!this.popoverVisible) {
            this.toggleMenuVisibility();
        }
    }

    @api
    close() {
        if (this.popoverVisible) {
            this.toggleMenuVisibility();
        }

        console.log('leave');
    }

    toggleMenuVisibility() {
        this.popoverVisible = !this.popoverVisible;

        if (this.popoverVisible) {
            this._boundingRect = this.getBoundingClientRect();
            this.pollBoundingRect();
        }

        this.classList.toggle('slds-is-open');
    }

    pollBoundingRect() {
        if (this.isAutoAlignment() && this.popoverVisible) {
            setTimeout(() => {
                if (this._connected) {
                    observePosition(this, 300, this._boundingRect, () => {
                        this.close();
                    });

                    this.pollBoundingRect();
                }
            }, 250);
        }
    }

    isAutoAlignment() {
        return this.placement.startsWith('auto');
    }

    allowBlur() {
        this._cancelBlur = false;
    }

    cancelBlur() {
        this._cancelBlur = true;
    }
}

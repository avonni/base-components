import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import visualPickerLink from './visualPickerLink.html';
import visualPickerLinkInfoOnly from './visualPickerLinkInfoOnly.html';

const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

export default class VisualPickerLink extends LightningElement {
    @api iconName;
    @api title;
    @api href;

    _iconPosition = ICON_POSITIONS.default;
    _completed = false;
    _infoOnly = false;
    showTitle = true;

    render() {
        return this._infoOnly ? visualPickerLinkInfoOnly : visualPickerLink;
    }

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
    }

    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    @api get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(iconPosition) {
        this._iconPosition = normalizeString(iconPosition, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    @api get completed() {
        return this._completed;
    }

    set completed(value) {
        this._completed = normalizeBoolean(value);
    }

    @api get infoOnly() {
        return this._infoOnly;
    }

    set infoOnly(value) {
        this._infoOnly = normalizeBoolean(value);
    }

    get computedContainerClass() {
        return classSet('slds-welcome-mat__tile')
            .add({
                'slds-welcome-mat__tile_complete':
                    this._completed && !this._infoOnly,
                'slds-welcome-mat__tile_info-only': this._infoOnly
            })
            .toString();
    }

    get computedTileBodyClass() {
        return classSet('slds-welcome-mat__tile-body')
            .add({
                'avonni-welcome-mat__tile-body-right':
                    this._iconPosition === 'right',
                'avonni-welcome-mat__tile-no-icon': !this.iconName
            })
            .toString();
    }

    get computedIconContainerClass() {
        return classSet(
            'slds-media__figure slds-media__figure_fixed-width slds-align_absolute-center'
        )
            .add({
                'avonni-media__figure-right': this._iconPosition === 'right'
            })
            .toString();
    }

    get leftPosition() {
        return this._iconPosition === 'left';
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('click'));
    }
}

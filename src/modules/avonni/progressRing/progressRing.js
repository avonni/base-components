import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

const validVariants = [
    'base',
    'active-step',
    'warning',
    'expired',
    'base-autocomplete'
];
const validDirections = ['fill', 'drain'];
const validSizes = ['medium', 'large'];

export default class ProgressRing extends LightningElement {
    _direction = 'fill';
    _size = 'medium';
    _value = 0;
    _variants = 'base';
    _hideIcon = false;

    @api get direction() {
        return this._direction;
    }

    set direction(direction) {
        this._direction = normalizeString(direction, {
            fallbackValue: 'fill',
            validValues: validDirections
        });
    }

    @api get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: 'medium',
            validValues: validSizes
        });
    }

    @api get value() {
        return this._value;
    }

    set value(value) {
        if (value < 0) {
            this._value = 0;
        } else if (value > 100) {
            this._value = 100;
        } else {
            this._value = value;
        }
    }

    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: 'standard',
            validValues: validVariants
        });
    }

    @api get hideIcon() {
        return this._hideIcon;
    }

    set hideIcon(value) {
        this._hideIcon = normalizeBoolean(value);
    }

    get progressRingClass() {
        return classSet('slds-progress-ring')
            .add({
                'slds-progress-ring_large': this._size === 'large'
            })
            .toString();
    }
}

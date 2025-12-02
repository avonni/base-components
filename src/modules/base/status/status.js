import { Tooltip } from 'c/tooltipLibrary';
import {
    classSet,
    normalizeArray,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { api, LightningElement } from 'lwc';

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

export default class Status extends LightningElement {
    _iconPosition = ICON_POSITIONS.default;
    _iconSize = ICON_SIZES.default;
    _states = [];
    _value;

    _connected = false;
    _tooltip;
    computedState = {};

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._initStates();
        this._connected = true;
    }

    disconnectedCallback() {
        if (this._tooltip) {
            this._tooltip.destroy();
        }
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the icon relative to the label. Valid values include left and right.
     *
     * @type {string}
     * @default left
     * @public
     */
    @api
    get iconPosition() {
        return this._iconPosition;
    }
    set iconPosition(value) {
        this._iconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * Size of the icon. Valid values include xx-small, x-small, small, medium, or large.
     *
     * @type {string}
     * @default medium
     * @public
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * Array of available state objects. The selected state will be displayed as the current status.
     *
     * @type {Object[]}
     * @public
     */
    @api
    get states() {
        return this._states;
    }
    set states(value) {
        this._states = normalizeArray(value);

        if (this._connected) {
            this._initStates();
        }
    }

    /**
     * Value of the selected state.
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;

        if (this._connected) {
            this._initStates();
        }
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedIconClass() {
        return classSet({
            'slds-order_0 slds-m-right_x-small':
                this.iconPosition === ICON_POSITIONS.default,
            'slds-order_2 slds-m-left_x-small': this.iconPosition === 'right'
        }).toString();
    }

    get computedIconStyle() {
        return `--slds-c-icon-color-foreground-default: ${this.computedState.color};`;
    }

    get computedTextStyle() {
        return `color: ${this.computedState.color};`;
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _initStates() {
        this.computedState = normalizeObject(
            this.states.find((s) => s.value === this.value)
        );
        this._initTooltip();
    }

    _initTooltip() {
        if (this._tooltip) {
            this._tooltip.destroy();
        }
        const tooltip = this.computedState.tooltip;
        if (!tooltip) {
            return;
        }
        this._tooltip = new Tooltip(tooltip, {
            root: this,
            target: () =>
                this.template.querySelector('[data-element-id="span-wrapper"]')
        });
        this._tooltip.initialize();
    }
}

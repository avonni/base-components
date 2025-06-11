import { LightningElement, api } from 'lwc';
import { classSet, normalizeBoolean, normalizeObject } from 'c/utils';

export default class PrimitiveDualListboxOption extends LightningElement {
    @api description;
    @api groupLabel;
    @api label;
    @api lockAlternativeText;
    @api value;

    _avatar = {};
    _disabled = false;
    _draggable = false;
    _hideBottomDivider = false;
    _isFocused = false;
    _isLocked = false;
    _selected = false;
    _showAvatar = false;

    _connected = false;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._connected = true;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Avatar object. The avatar will be displayed to the left of the label.
     *
     * @type {object}
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = normalizeObject(value);
    }

    /**
     * If present, the option is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get disabled() {
        return this._disabled || false;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, the options are draggable.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get draggable() {
        return this._draggable;
    }
    set draggable(value) {
        this._draggable = normalizeBoolean(value);
    }

    /**
     * If present, hide the bottom divider.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get hideBottomDivider() {
        return this._hideBottomDivider;
    }
    set hideBottomDivider(value) {
        this._hideBottomDivider = normalizeBoolean(value);
    }

    /**
     * If present, the option is focused.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get isFocused() {
        return this._isFocused;
    }
    set isFocused(value) {
        this._isFocused = normalizeBoolean(value);
    }

    /**
     * If present, the option is locked.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get isLocked() {
        return this._isLocked;
    }
    set isLocked(value) {
        this._isLocked = normalizeBoolean(value);
    }

    /**
     * If present, the option is selected.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = normalizeBoolean(value);
    }

    /**
     * If present, the avatar is displayed.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get showAvatar() {
        return this._showAvatar;
    }
    set showAvatar(value) {
        this._showAvatar = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set focus on the option.
     *
     */
    @api
    focus() {
        if (this._connected && this.option && !this.disabled) {
            this.option.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed Aria label.
     *
     * @type {string}
     */
    get computedAriaLabel() {
        let ariaLabel = this.label;
        if (this.groupLabel) {
            ariaLabel += ` (${this.groupLabel})`;
        }
        if (this.description) {
            ariaLabel += ` "${this.description}"`;
        }
        return ariaLabel;
    }

    /**
     * Computed List Item Class styling.
     *
     * @type {string}
     */
    get computedOptionClass() {
        return classSet(
            'slds-listbox__option slds-listbox__option_plain slds-media slds-media_center slds-media_inline avonni-primitive-dual-listbox__option_min-height avonni-primitive-dual-listbox__option'
        )
            .add({ 'slds-media_small': !this.description })
            .add({
                'avonni-primitive-dual-listbox__option-selected slds-is-selected':
                    this.selected
            })
            .toString();
    }

    /**
     * Computed List Item Tab index.
     *
     * @type {string}
     */
    get computedTabIndex() {
        return this.isFocused ? '0' : '-1';
    }

    /**
     * Computed Wrapper Class styling.
     *
     * @type {string}
     */
    get computedWrapperClass() {
        return classSet('slds-listbox__item')
            .add({
                'avonni-primitive-dual-listbox__option_border-bottom':
                    !this.hideBottomDivider
            })
            .toString();
    }

    /**
     * Returns the dual listbox option element.
     *
     * @type {Element}
     */
    get option() {
        return this.template.querySelector(
            '[data-element-id="dual-listbox-option"]'
        );
    }
}

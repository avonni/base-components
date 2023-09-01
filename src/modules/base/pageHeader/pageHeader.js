

import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import pageHeader from './pageHeader.html';
import pageHeaderVertical from './pageHeaderVertical.html';
import { computeSldsClass } from 'c/iconUtils';

const PAGE_HEADER_VARIANTS = {
    valid: ['base', 'object-home', 'record-home', 'record-home-vertical'],
    default: 'base'
};

/**
 * @class
 * @descriptor avonni-page-header
 * @storyId example-page-header--base
 * @public
 */
export default class PageHeader extends LightningElement {
    /**
     * The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * The icon is displayed in the header before the title.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Text to display below the title. To include additional markup or another component, use the info slot.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api info;
    /**
     * Label to display above the title. To include additional markup or another component, use the label slot.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Title of the page header. To include additional markup or another component, use the title slot.
     *
     * @type {string}
     * @public
     */
    @api title;

    _isJoined = false;
    _variant = PAGE_HEADER_VARIANTS.default;

    showTitle = true;
    showLabel = true;
    showActions = true;
    showDetails = true;
    showInfo = true;
    showControls = true;

    /**
     * Render html template based on variant 'vertical'.
     *
     * @returns {File} pageHeader | pageHeaderVertical
     */
    render() {
        if (this._variant === 'record-home-vertical') {
            return pageHeaderVertical;
        }
        return pageHeader;
    }

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
        if (this.labelSlot) {
            this.showLabel = this.labelSlot.assignedElements().length !== 0;
        }
        if (this.actionsSlot) {
            this.showActions = this.actionsSlot.assignedElements().length !== 0;
        }
        if (this.detailsSlot) {
            this.showDetails = this.detailsSlot.assignedElements().length !== 0;
        }
        if (this.infoSlot) {
            this.showInfo = this.infoSlot.assignedElements().length !== 0;
        }
        if (this.controlsSlot) {
            this.showControls =
                this.controlsSlot.assignedElements().length !== 0;
        }
    }

    /**
     * Get the title slot DOM element.
     *
     * @type {Element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /**
     * Get the label slot DOM element.
     *
     * @type {Element}
     */
    get labelSlot() {
        return this.template.querySelector('slot[name=label]');
    }

    /**
     * Get the action slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    /**
     * Get the details slot DOM element.
     *
     * @type {Element}
     */
    get detailsSlot() {
        return this.template.querySelector('slot[name=details]');
    }

    /**
     * Get the info slot DOM element.
     *
     * @type {Element}
     */
    get infoSlot() {
        return this.template.querySelector('slot[name=info]');
    }

    /**
     * Get the controls slot DOM element.
     *
     * @type {Element}
     */
    get controlsSlot() {
        return this.template.querySelector('slot[name=controls]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the bottom border-radius is set to zero and the shadow is removed. This allows the page-header to sit flush on top of another element.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isJoined() {
        return this._isJoined;
    }

    set isJoined(value) {
        this._isJoined = normalizeBoolean(value);
    }

    /**
     * The type of component. Valid values include base, object-home, record-home and record-home-vertical.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: PAGE_HEADER_VARIANTS.default,
            validValues: PAGE_HEADER_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed Outer class styling based on variant 'object-home' or 'record-home'.
     *
     * @type {string}
     */
    get computedOuterClass() {
        return classSet('slds-page-header')
            .add({ 'slds-page-header_joined': this._isJoined })
            .add(`avonni-page-header__header_${this._variant}`)
            .toString();
    }

    /**
     * Computed Outer class styling based on variant 'record-home-vertical'.
     *
     * @type {string}
     */
    get computedVerticalOuterClass() {
        return classSet('slds-page-header slds-page-header_vertical')
            .add({ 'slds-page-header_joined': this._isJoined })
            .toString();
    }

    /**
     * Computed Icon class styling for normal viewport.
     *
     * @type {string}
     */
    get computedIconClass() {
        return classSet('slds-icon_container slds-show_small')
            .add(computeSldsClass(this.iconName))
            .toString();
    }

    /**
     * Computed Mobile Icon class styling for mobile viewport.
     *
     * @type {string}
     */
    get computedMobileIconClass() {
        return classSet('slds-icon_container slds-hide_small')
            .add(computeSldsClass(this.iconName))
            .toString();
    }

    /**
     * Check if variant is 'base'.
     *
     * @type {string}
     */
    get isBaseVariant() {
        return this._variant === 'base';
    }

    /**
     * Check if variant is 'record-home'.
     *
     * @type {string}
     */
    get isRecordHomeVariant() {
        return this._variant === 'record-home';
    }

    /**
     * Check if Title text is specified.
     *
     * @type {string}
     */
    get hasStringTitle() {
        return !!this.title;
    }

    /**
     * Check if Label text is specified.
     *
     * @type {string}
     */
    get hasStringLabel() {
        return !!this.label;
    }

    /**
     * Check if Info text is specified.
     *
     * @type {string}
     */
    get hasStringInfo() {
        return !!this.info;
    }

    /**
     * Check whether to display actions and/or details.
     */
    get showActionsOrDetails() {
        return this.showActions || this.showDetails;
    }
}

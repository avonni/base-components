import { LightningElement, api } from 'lwc';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';

const PANEL_POSITIONS = { valid: ['right', 'left'], default: 'right' };

const PANEL_SIZES = {
    valid: ['small', 'medium', 'large', 'x-large', 'full'],
    default: 'medium'
};

/**
 * @class
 * @descriptor avonni-panel
 * @storyId example-panel--base
 * @public
 */
export default class Pagination extends LightningElement {
    /**
     * The title is displayed in the panel header. To include additional markup or another component, use the title slot.
     *
     * @type {string}
     * @public
     */
    @api title;

    _position = PANEL_POSITIONS.default;
    _showPanel = false;
    _size = PANEL_SIZES.default;

    _isRight = true;
    showTitleSlot = true;
    showPanelBodySlot = true;

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitleSlot = this.titleSlot.assignedElements().length !== 0;
        }

        if (this.panelBodySlot) {
            this.showPanelBodySlot =
                this.panelBodySlot.assignedElements().length !== 0;
        }
    }

    /**
     * Get Panel body slot DOM element.
     *
     * @type {Element}
     */
    get panelBodySlot() {
        return this.template.querySelector('slot[name=panel-body]');
    }

    /**
     * Get title slot DOM element.
     *
     * @type {Element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the panel. Valid values include left and right.
     *
     * @type {string}
     * @public
     * @default right
     */
    @api
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = normalizeString(position, {
            fallbackValue: PANEL_POSITIONS.default,
            validValues: PANEL_POSITIONS.valid
        });
    }

    /**
     * If present, the panel is visible by default.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showPanel() {
        return this._showPanel;
    }
    set showPanel(value) {
        this._showPanel = normalizeBoolean(value);
    }

    /**
     * Width of the panel. Valid values include small, medium, large, x-large and full.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: PANEL_SIZES.default,
            validValues: PANEL_SIZES.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed Outer class styling basedf on selected attributes.
     *
     * @type {string}
     */
    get computedOuterClass() {
        return classSet('slds-panel slds-panel_docked')
            .add(`slds-size_${this.size}`)
            .add(`slds-panel_docked-${this.position}`)
            .add({
                'slds-is-open': this.showPanel,
                'slds-is-hidden': !this.showPanel
            })
            .toString();
    }

    /**
     * Check if Title has text.
     *
     * @type {string}
     */
    get hasStringTitle() {
        return !!this.title;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Close the panel.
     *
     * @public
     */
    @api
    close() {
        this._showPanel = false;
    }

    /**
     * Open the panel.
     *
     * @public
     */
    @api
    open() {
        this._showPanel = true;
    }

    /**
     * Toggle the panel.
     *
     * @public
     */
    @api
    toggle() {
        this._showPanel = !this._showPanel;
    }
}

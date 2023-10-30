import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import visualPickerLink from './visualPickerLink.html';
import visualPickerLinkInfoOnly from './visualPickerLinkInfoOnly.html';

const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

/**
 * @class
 * @descriptor avonni-visual-picker-link
 * @storyId example-visualpickerlink--base
 * @public
 */
export default class VisualPickerLink extends LightningElement {
    /**
     * The URL of the page that the link goes to.
     *
     * @type {string}
     * @public
     */
    @api href;

    /**
     * The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Title of the visual picker link. To include additional markup or another component, use the title slot.
     *
     * @type {string}
     * @public
     */
    @api title;

    _disabled = false;

    _completed = false;

    _iconPosition = ICON_POSITIONS.default;

    _infoOnly = false;

    showTitle = true;

    render() {
        return this._infoOnly || this._disabled
            ? visualPickerLinkInfoOnly
            : visualPickerLink;
    }

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
    }

    /**
     * Get slot dom element.
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
     * If present, the visual picker is disabled and the user cannot interact with it.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, a checkmark is added to the icon.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get completed() {
        return this._completed;
    }

    set completed(value) {
        this._completed = normalizeBoolean(value);
    }

    /**
     * Position of the icon. Valid values include left and right.
     *
     * @type {string}
     * @public
     * @default left
     */
    @api
    get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(iconPosition) {
        this._iconPosition = normalizeString(iconPosition, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * If present, The <a> tags are removed from the tiles. The tiles also lose their button appearance, removing borders and shadows.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get infoOnly() {
        return this._infoOnly;
    }

    set infoOnly(value) {
        this._infoOnly = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed container class styling.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet('avonni-visual-picker-link__tile')
            .add({
                'slds-welcome-mat__tile_complete avonni-visual-picker-link__tile_complete':
                    this._completed,
                'avonni-visual-picker-link__tile_info-only': this._infoOnly,
                'avonni-visual-picker-link__box':
                    this._disabled && !this._infoOnly,
                'avonni-visual-picker-link_disabled':
                    this._disabled && !this._infoOnly,
                'avonni-visual-picker-link_cursor-not-allowed': this._disabled
            })
            .toString();
    }

    /**
     * Computed tile body class styling.
     *
     * @type {string}
     */
    get computedTileBodyClass() {
        return classSet('slds-welcome-mat__tile-body')
            .add({
                'avonni-visual-picker-link__tile-body-right':
                    this._iconPosition === 'right',
                'avonni-visual-picker-link__tile-no-icon': !this.iconName
            })
            .toString();
    }

    /**
     * Computed icon container class styling.
     *
     * @type {string}
     */
    get computedIconContainerClass() {
        return classSet(
            'slds-media__figure slds-media__figure_fixed-width slds-align_absolute-center'
        )
            .add({
                'avonni-visual-picker-link__figure-right':
                    this._iconPosition === 'right'
            })
            .toString();
    }

    /**
     * Verify if icon is left.
     *
     * @type {boolean}
     */
    get leftPosition() {
        return this._iconPosition === 'left';
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Click event handler.
     */
    handleClick(e) {
        /**
         * The event fired when the visual picker is clicked.
         *
         * @event
         * @name click
         * @public
         */
        this.dispatchEvent(new CustomEvent('click'));
        e.stopPropagation();
    }
}

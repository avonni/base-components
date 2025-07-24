import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utils';
import eraser from './eraser.html';
import inkPen from './inkPen.html';

const NAMES = {
    default: 'eraser',
    valid: ['eraser', 'inkPen']
};

/**
 * Primitive component used to display SVG icons. Contains one HTML template per SVG icon.
 *
 * @class
 * @descriptor c-primitive-svg-icon
 */
export default class PrimitiveSvgIcon extends LightningElement {
    /**
     * CSS classes to apply to the SVG tag.
     *
     * @type {string}
     * @public
     */
    @api svgClass;

    _name = NAMES.default;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    render() {
        switch (this.name) {
            case 'eraser':
                return eraser;
            case 'inkPen':
                return inkPen;
            default:
                return eraser;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Name of the icon. Valid values include eraser and inkPen.
     *
     * @type {string}
     * @default eraser
     * @public
     */
    @api
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = normalizeString(value, {
            fallbackValue: NAMES.default,
            validValues: NAMES.valid,
            toLowerCase: false
        });
    }
}

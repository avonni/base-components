import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const ILLUSTRATION_SIZES = { valid: ['small', 'large'], default: 'small' };

const ILLUSTRATION_VARIANTS = {
    valid: [
        'text-only',
        'going-camping',
        'gone_fishing',
        'maintenance',
        'desert',
        'open-road',
        'no-access',
        'no-connection',
        'not-available-in-lightning',
        'page-not-available',
        'walkthrough-not-available',
        'fishing-deals',
        'lake-mountain',
        'no-events',
        'no-events-2',
        'no-task',
        'no-task-2',
        'setup',
        'gone-fishing',
        'no-access-2',
        'no-content',
        'no-preview',
        'preview',
        'research'
    ],
    default: 'text-only'
};

/**
 * @class
 * @descriptor avonni-illustration
 * @storyId example-illustration--small-size
 * @public
 */
export default class Illustration extends LightningElement {
    /**
     * The illustration title.
     *
     * @type {string}
     * @public
     */
    @api title;

    _size = ILLUSTRATION_SIZES.default;
    _variant = ILLUSTRATION_VARIANTS.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The illustration size. Valid options include 'small', 'large'.
     *
     * @type {string}
     * @public
     * @default small
     */
    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: ILLUSTRATION_SIZES.default,
            validValues: ILLUSTRATION_SIZES.valid
        });
    }

    /**
     * The variant types of illustrations. Valid values include text-only, going-camping, gone_fishing, maintenance, desert, open-road, no-access, no-connection, not-available-in-lightning page-not-available, walkthrough-not-available, fishing-deals, lake-mountain, no-events, no-events-2, no-task, no-task-2, setup, gone-fishing, no-access-2, no-content, no-preview, preview and research
     *
     * @type {string}
     * @public
     * @default text-only
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: ILLUSTRATION_VARIANTS.default,
            validValues: ILLUSTRATION_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Illustration class styling.
     *
     * @type {string}
     */
    get illustrationClass() {
        return classSet('slds-illustration')
            .add(`slds-illustration_${this._size}`)
            .toString();
    }

    /**
     * Assign variant to svg URL.
     *
     * @type {string}
     */
    get svgURL() {
        return `/assets/canvas-elements/illustrationLibrary/${this.variant}.svg`;
    }

    /**
     * Show Illustration SVG.
     *
     * @type {boolean}
     */
    get showSvg() {
        return this._variant !== 'text-only';
    }
}

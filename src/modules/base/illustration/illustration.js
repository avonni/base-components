import { LightningElement, api } from 'lwc';
import { classSet, normalizeString } from 'c/utils';
import { isOrgSlds2 } from 'c/utilsPrivate';

const ILLUSTRATION_SIZES = { valid: ['small', 'large'], default: 'small' };

const ILLUSTRATION_VARIANTS = {
    valid: [
        // old variants
        'text-only',
        'desert',
        'fishing-deals',
        'going-camping',
        'gone_fishing',
        'gone-fishing',
        'lake-mountain',
        'maintenance',
        'no-access-2',
        'no-access',
        'no-connection',
        'no-content',
        'no-events-2',
        'no-events',
        'no-preview',
        'no-task-2',
        'no-task',
        'not-available-in-lightning',
        'open-road',
        'page-not-available',
        'preview',
        'research',
        'setup',
        'walkthrough-not-available',
        // new variants
        'access-deleted',
        'access-limit',
        'access-request',
        'cart-noitems',
        'error-appconnection',
        'error-connectionissue',
        'error-recoverable',
        'error-unrecoverable',
        'maintenance-planned',
        'maintenance-unplanned',
        'noresults-filter',
        'noresults-search',
        'noresults-unknown',
        'success-assigned',
        'success-new',
        'success-selfassigned'
    ],
    default: 'text-only'
};

const SLDS2_TO_SLDS1_VARIANTS = {
    'access-deleted': 'no-content',
    'access-limit': 'no-access',
    'access-request': 'no-access',
    'cart-noitems': 'gone-fishing',
    'error-appconnection': 'no-connection',
    'error-connectionissue': 'no-connection',
    'error-recoverable': 'no-events',
    'error-unrecoverable': 'walkthrough-not-available',
    'maintenance-planned': 'maintenance',
    'maintenance-unplanned': 'maintenance',
    'noresults-filter': 'no-preview',
    'noresults-search': 'no-preview',
    'noresults-unknown': 'no-preview',
    'success-assigned': 'gone-fishing',
    'success-new': 'gone-fishing',
    'success-selfassigned': 'gone-fishing'
};

/**
 * @class
 * @descriptor avonni-illustration
 * @storyId example-illustration--small-size
 * @public
 */
export default class Illustration extends LightningElement {
    /**
     * Assistive text that describes the illustration. Provide this text for assistive devices if the meaning of the surrounding content isn't sufficient.
     *
     * @type {string}
     * @public
     */
    @api alternativeText;
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
     * Illustration name of the illustration. Valid values include text-only, going-camping, maintenance, desert,
     * open-road, no-access, no-connection, not-available-in-lightning, page-not-available, walkthrough-not-available,
     * fishing-deals, lake-mountain, no-events, no-task, setup, gone-fishing, no-access-2, no-content, no-preview,
     * preview, research, access-deleted, access-limit, access-request, cart-noitems, error-appconnection,
     * error-connectionissue, error-recoverable, error-unrecoverable, maintenance-planned, maintenance-unplanned,
     * noresults-filter, noresults-search, noresults-unknown, success-assigned, success-new, success-selfassigned.
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
    get computedIllustrationClass() {
        return classSet('slds-illustration')
            .add(`slds-illustration_${this.size}`)
            .toString();
    }

    get computedVariant() {
        return isOrgSlds2()
            ? this.variant
            : SLDS2_TO_SLDS1_VARIANTS[this.variant] || this.variant;
    }

    /**
     * Show Illustration SVG.
     *
     * @type {boolean}
     */
    get showSvg() {
        return this.variant !== 'text-only';
    }

    /**
     * Assign variant to svg URL.
     *
     * @type {string}
     */
    get svgURL() {
        return `/assets/canvas-elements/illustrationLibrary/${this.computedVariant}.svg`;
    }
}

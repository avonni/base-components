import { LightningElement, api } from 'lwc';
import { classSet, normalizeString } from 'c/utils';

const DEFAULT_MEDIA_ALTERNATIVE_TEXT = 'Card media';
const MEDIA_POSITIONS = {
    valid: [
        'left',
        'right',
        'top',
        'bottom',
        'center',
        'background',
        'overlay'
    ],
    default: 'top'
};

/**
 * @class
 * @name Card
 * @descriptor avonni-card
 * @storyId example-card--base
 * @public
 */
export default class Card extends LightningElement {
    /**
     * The Lightning Design System name displayed left of the title in the header.
     * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * The alternative text for the media.
     *
     * @type {string}
     * @public
     */
    @api mediaAlternativeText = DEFAULT_MEDIA_ALTERNATIVE_TEXT;
    /**
     * Source for the image or media.
     *
     * @type {string}
     * @public
     */
    @api mediaSrc;
    /**
     * The title in the header of the card, right of the icon. The title attribute supersedes the title slot.
     *
     * @type {string}
     * @public
     */
    @api title;

    _mediaPosition = MEDIA_POSITIONS.default;

    showMediaSlot = true;
    showTitleSlot = true;
    showActionsSlot = true;
    showDefaultSlot = true;
    showFooterSlot = true;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        this.showMediaSlot =
            !this.mediaSrc &&
            this.mediaSlot &&
            this.mediaSlot.assignedElements().length !== 0;
        this.showActionsSlot =
            this.actionsSlot &&
            this.actionsSlot.assignedElements().length !== 0;
        this.showDefaultSlot =
            (this.defaultSlot &&
                this.defaultSlot.assignedElements().length !== 0) ||
            (this.defaultSlot &&
                this.defaultSlot.innerText &&
                this.defaultSlot.innerText.trim().length !== 0);
        this.showTitleSlot =
            !this.title &&
            this.titleSlot &&
            this.titleSlot.assignedElements().length !== 0;
        this.showFooterSlot =
            this.footerSlot && this.footerSlot.assignedElements().length !== 0;

        /**
         * The event fired when the card is rendered.
         * Used by the list to check if the bottom has been reached after the card slots have been fully rendered.
         *
         * @event
         * @name privatecardrendered
         */
        this.dispatchEvent(
            new CustomEvent('privatecardrendered', {
                detail: {
                    callbacks: {
                        // Used by the Component Builder in Salesforce
                        // to show the empty slots when a component is being dragged
                        recomputeSlotsVisibility: () => {
                            this.showActionsSlot = true;
                            this.showFooterSlot = true;
                            this.showMediaSlot = true;
                            this.showTitleSlot = true;
                            this.showDefaultSlot = true;
                        }
                    }
                },
                bubbles: true
            })
        );
    }

    /**
     * Get the actions slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    /**
     * Get the actions slot DOM element.
     *
     * @type {Element}
     */
    get defaultSlot() {
        return this.template.querySelector(
            'slot[data-element-id="avonni-card-default-slot"], slot[data-element-id="avonni-card-center-default-slot"]'
        );
    }

    /**
     * Get the footer slot DOM element.
     *
     * @type {Element}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /**
     * Get the media actions slot DOM element.
     *
     * @type {Element}
     */
    get mediaActionsSlot() {
        return this.template.querySelector('slot[name=media-actions]');
    }

    /**
     * Get the media slot DOM element.
     *
     * @type {Element}
     */
    get mediaSlot() {
        return this.template.querySelector('slot[name=media]');
    }

    /**
     * Get the title slot DOM element.
     *
     * @type {Element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Position of the media relative to the card.
     * Valid values are "top", "center", "left", "right", "bottom", "background", and "overlay".
     *
     * @type {string}
     * @public
     * @default top
     */
    @api
    get mediaPosition() {
        return this._mediaPosition;
    }
    set mediaPosition(value) {
        this._mediaPosition = normalizeString(value, {
            fallbackValue: MEDIA_POSITIONS.default,
            validValues: MEDIA_POSITIONS.valid
        });
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Card body classes
     *
     * @type {string}
     */
    get computedCardClasses() {
        return classSet(
            'avonni-card__body-container avonni-height_full slds-grid slds-is-relative'
        )
            .add({
                'slds-grid_vertical':
                    this.mediaPosition === 'top' || this.isCenterMedia,
                'avonni-card__media-top': this.mediaPosition === 'top',
                'avonni-card__media-left': this.mediaPosition === 'left',
                'avonni-card__media-right': this.mediaPosition === 'right',
                'avonni-card__media-center': this.isCenterMedia,
                'slds-grid_vertical-reverse': this.mediaPosition === 'bottom',
                'avonni-card__media-background':
                    this.mediaPosition === 'background',
                'avonni-card__media-overlay ': this.mediaPosition === 'overlay'
            })
            .toString();
    }

    /**
     * In background and overlay variants, the dark background overlay needs round corners.
     *
     * @type {string}
     */
    get computedContentClasses() {
        return classSet(
            'slds-has-flexi-truncate avonni-card__content-container'
        )
            .add({
                'avonni-card__media-bottom-left-radius avonni-card__media-bottom-right-radius avonni-card__media-top-left-radius avonni-card__media-top-right-radius ':
                    !this.showFooterSlot &&
                    (this.mediaPosition === 'background' ||
                        this.mediaPosition === 'overlay')
            })
            .toString();
    }

    /**
     * In background and overlay variants, the dark background overlay needs round corners.
     *
     * @type {string}
     */
    get computedMediaRadius() {
        return classSet('avonni-card__media-border-radius')
            .add({
                'avonni-card__media-top avonni-card__media-top-left-radius avonni-card__media-top-right-radius':
                    this.mediaPosition === 'top' ||
                    (this.isCenterMedia && !this.showHeader),

                'avonni-card__media-border-right avonni-card__media-top-left-radius':
                    this.mediaPosition === 'left',
                'avonni-card__media-border-left avonni-card__media-top-right-radius':
                    this.mediaPosition === 'right',
                'avonni-card__media-top-left-radius avonni-card__media-top-right-radius':
                    this.mediaPosition === 'background' ||
                    this.mediaPosition === 'overlay',
                'avonni-card__media-bottom-left-radius':
                    !this.showFooterSlot &&
                    (this.mediaPosition === 'left' ||
                        this.mediaPosition === 'background' ||
                        this.mediaPosition === 'overlay' ||
                        this.mediaPosition === 'bottom' ||
                        (this.isCenterMedia && !this.showDefaultSlot)),
                'avonni-card__media-bottom-right-radius':
                    !this.showFooterSlot &&
                    (this.mediaPosition === 'right' ||
                        this.mediaPosition === 'background' ||
                        this.mediaPosition === 'overlay' ||
                        this.mediaPosition === 'bottom' ||
                        (this.isCenterMedia && !this.showDefaultSlot))
            })
            .toString();
    }

    /**
     * Media container classes
     *
     * @type {string}
     */
    get computedMediaClasses() {
        return classSet('avonni-card__media-container slds-is-relative')
            .add({
                'avonni-card__media-border-bottom': this.mediaHasBottomBorder,
                'avonni-card__media-border-top': this.mediaHasTopBorder
            })
            .toString();
    }

    /**
     * Show default slot for center media.
     *
     * @type {boolean}
     */
    get isCenterMedia() {
        return this.mediaPosition === 'center';
    }

    /**
     * Apply bottom border
     *
     * @type {boolean}
     */
    get mediaHasBottomBorder() {
        return (
            this.showMedia &&
            ((this.mediaPosition === 'top' &&
                (this.showDefaultSlot || this.showHeader)) ||
                (this.isCenterMedia && this.showDefaultSlot))
        );
    }

    /**
     * Apply top border
     *
     * @type {boolean}
     */
    get mediaHasTopBorder() {
        return (
            this.showMedia &&
            ((this.isCenterMedia && this.showHeader) ||
                (this.mediaPosition === 'bottom' &&
                    (this.showHeader || this.showDefaultSlot)))
        );
    }

    /**
     * Show default slot for center media.
     *
     * @type {boolean}
     */
    get showCenterMediaContent() {
        return this.showDefaultSlot && this.isCenterMedia;
    }

    /**
     * Show the header.
     *
     * @type {boolean}
     */
    get showHeader() {
        return (
            this.title ||
            this.showTitleSlot ||
            this.iconName ||
            this.showActionsSlot
        );
    }

    /**
     * Get show media.
     *
     * @type {boolean}
     */
    get showMedia() {
        return this.mediaSrc || this.showMediaSlot;
    }
}

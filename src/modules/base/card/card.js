import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

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
     * The title in the header of the card, right of the icon. The title attribute supersedes the title slot.
     *
     * @type {string}
     * @public
     */
    @api title;
    /**
     * The Lightning Design System name displayed left of the title in the header.
     * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Source for the image or media.
     *
     * @type {string}
     * @public
     */
    @api mediaSrc;

    _mediaPosition = MEDIA_POSITIONS.default;

    showActionsSlot = true;
    showDefaultSlot = true;
    showFooterSlot = true;
    showMediaActionsSlot = true;
    showMediaSlot = true;
    showTitleSlot = true;
    showCenterMediaContent = true;

    renderedCallback() {
        this.showActionsSlot =
            this.actionsSlot &&
            this.actionsSlot.assignedElements().length !== 0;
        this.showDefaultSlot =
            (this.defaultSlot &&
                this.defaultSlot.assignedElements().length !== 0) ||
            (this.defaultSlot &&
                this.defaultSlot.innerText &&
                this.defaultSlot.innerText.trim().length !== 0);
        this.showFooterSlot =
            this.footerSlot && this.footerSlot.assignedElements().length !== 0;
        this.showMediaActionsSlot =
            this.mediaActionsSlot &&
            this.mediaActionsSlot.assignedElements().length !== 0;
        this.showMediaSlot =
            !this.mediaSrc &&
            this.mediaSlot &&
            this.mediaSlot.assignedElements().length !== 0;
        this.showTitleSlot =
            !this.title &&
            this.titleSlot &&
            this.titleSlot.assignedElements().length !== 0;

        this.showCenterMediaContent =
            this.showDefaultSlot && this.mediaPosition === 'center';

        /**
         * The event fired when the card is rendered.
         * Used by the list to check if the bottom has been reached after the card slots have been fully rendered.
         *
         * @event
         * @name privatecardrendered
         */
        this.dispatchEvent(new CustomEvent('privatecardrendered'));
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
     * Get the actions slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    /**
     * Card body class
     *
     * @type {string}
     */
    get computedCardClass() {
        return classSet(
            'avonni-card__body-container avonni-height_full slds-grid slds-is-relative'
        ).add({
            'avonni-card__media-top slds-grid_vertical':
                this.mediaPosition === 'top',
            'avonni-card__media-left': this.mediaPosition === 'left',
            'avonni-card__media-right': this.mediaPosition === 'right',
            'slds-grid_vertical avonni-card__media-center':
                this.mediaPosition === 'center',
            'slds-grid_vertical-reverse': this.mediaPosition === 'bottom',
            'avonni-card__media-background':
                this.mediaPosition === 'background',
            'avonni-card__media-overlay ': this.mediaPosition === 'overlay'
        });
    }

    /**
     * In background and overlay variants, the dark background overlay needs round corners.
     *
     * @type {string}
     */
    get computedContentClass() {
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
     * Media container class
     *
     * @type {string}
     */
    get computedMediaClass() {
        return classSet('avonni-card__media-container slds-is-relative').add({
            'avonni-card__media-border-bottom': this.mediaHasBottomBorder,
            'avonni-card__media-border-top': this.mediaHasTopBorder
        });
    }

    /**
     * In background and overlay variants, the dark background overlay needs round corners.
     *
     * @type {string}
     */
    get computedMediaRadiusClass() {
        return classSet('avonni-card__media-border-radius')
            .add({
                'avonni-card__media-top avonni-card__media-top-left-radius avonni-card__media-top-right-radius':
                    this.mediaPosition === 'top' ||
                    (this.mediaPosition === 'center' && !this.hasHeader),
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
                        (this.mediaPosition === 'center' &&
                            !this.showDefaultSlot)),
                'avonni-card__media-bottom-right-radius':
                    !this.showFooterSlot &&
                    (this.mediaPosition === 'right' ||
                        this.mediaPosition === 'background' ||
                        this.mediaPosition === 'overlay' ||
                        this.mediaPosition === 'bottom' ||
                        (this.mediaPosition === 'center' &&
                            !this.showDefaultSlot))
            })
            .toString();
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
     * Returns true if the card has a title, icon, or actions.
     *
     * @type {boolean}
     */
    get hasHeader() {
        return (
            this.showTitleSlot ||
            this.title ||
            this.iconName ||
            this.showActionsSlot
        );
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
     * Apply bottom border
     *
     * @type {boolean}
     */
    get mediaHasBottomBorder() {
        return (
            this.showMedia &&
            ((this.mediaPosition === 'top' &&
                (this.showDefaultSlot || this.hasHeader)) ||
                (this.mediaPosition === 'center' && this.showDefaultSlot))
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
            ((this.mediaPosition === 'center' && this.hasHeader) ||
                (this.mediaPosition === 'bottom' &&
                    (this.hasHeader || this.showDefaultSlot)))
        );
    }

    /**
     * Show default slot for center media.
     *
     * @type {boolean}
     */
    get mediaPositionCenter() {
        return this.mediaPosition === 'center';
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
     * Get show media.
     *
     * @type {boolean}
     */
    get showMedia() {
        return this.mediaSrc || this.showMediaSlot;
    }

    /**
     * Get the title slot DOM element.
     *
     * @type {Element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }
}

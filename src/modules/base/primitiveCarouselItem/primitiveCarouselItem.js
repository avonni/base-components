

import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import tag from './tag.html';
import noTag from './noTag.html';

const ACTIONS_POSITIONS = {
    valid: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'bottom-center'
    ],
    default: 'bottom-center'
};

const ACTIONS_VARIANTS = {
    valid: ['bare', 'border', 'menu', 'stretch'],
    default: 'border'
};

const DEFAULT_CAROUSEL_HEIGHT = 6.625;

export default class PrimitiveCarouselItem extends LightningElement {
    @api title;
    @api description;
    @api infos;
    @api imageAssistiveText;
    @api href;
    @api name;
    @api src;

    @api itemIndex;
    @api panelIndex;
    @api panelItems;

    _actions = [];
    _actionsPosition = ACTIONS_POSITIONS.default;
    _actionsVariant = ACTIONS_VARIANTS.default;
    _carouselContentHeight = DEFAULT_CAROUSEL_HEIGHT;

    render() {
        return normalizeBoolean(this.href) ? tag : noTag;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Valid values include bare, border and menu.
     *
     * @type {string}
     * @public
     * @default border
     */
    @api
    get actions() {
        return this._actions;
    }

    set actions(actions) {
        this._actions = actions;
        this.initializeCarouselHeight();
    }

    /**
     * Valid values include top-left, top-right,  bottom-left, bottom-right and bottom-center.
     *
     * @type {string}
     * @public
     * @default bottom-center
     */
    @api
    get actionsPosition() {
        return this._actionsPosition;
    }

    set actionsPosition(position) {
        this._actionsPosition = normalizeString(position, {
            fallbackValue: ACTIONS_POSITIONS.default,
            validValues: ACTIONS_POSITIONS.valid
        });
    }

    /**
     * Valid values include bare, border and menu.
     *
     * @type {string}
     * @public
     * @default border
     */
    @api
    get actionsVariant() {
        return this._actionsVariant;
    }

    set actionsVariant(variant) {
        this._actionsVariant = normalizeString(variant, {
            fallbackValue: ACTIONS_VARIANTS.default,
            validValues: ACTIONS_VARIANTS.valid
        });
        this.initializeCarouselHeight();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed actions container class styling based on action position attributes.
     *
     * @type {string}
     */
    get computedActionsContainerClass() {
        return classSet('')
            .add({
                'avonni-carousel__actions-bottom-center':
                    this._actionsPosition === 'bottom-center',
                'avonni-carousel__actions-right':
                    this._actionsPosition.includes('right'),
                'avonni-carousel__actions-left':
                    this._actionsPosition.includes('left')
            })
            .add({
                'slds-p-around_small': !this.isBottomPosition,
                'slds-is-absolute': !this.isBottomPosition
            })
            .add({
                'avonni-carousel__actions_stretch': this.isStretchVariant,
                'avonni-carousel__actions': !this.isStretchVariant
            })
            .toString();
    }

    /**
     * Set actions variant button icon to bare if the action variant is bare, if not , set the button icon to border-filled.
     *
     * @type {string}
     */
    get computedActionsVariantButtonIcon() {
        return this._actionsVariant === 'bare' ? 'bare' : 'border-filled';
    }

    /**
     * Set actions variant button to base if the action variant is bare, if not , set the button to neutral.
     *
     * @type {string}
     */
    get computedActionsVariantButton() {
        return this._actionsVariant === 'bare' ? 'base' : 'neutral';
    }

    /**
     * Lightning Button class styling based on attributes.
     *
     * @type {string}
     */
    get computedButtonClass() {
        return classSet('')
            .add({
                'avonni-carousel__actions_bare':
                    this._actionsVariant === 'bare',
                'avonni-carousel__actions_neutral':
                    this._actionsVariant === 'border' || this.isStretchVariant
            })
            .toString();
    }

    /**
     * Buttons container class styling based on attributes.
     *
     * @type {string}
     */
    get computedButtonsContainerClass() {
        return !this.isStretchVariant ? 'slds-show_small' : 'slds-show_small';
    }

    /**
     * Action button icon class styling based on attributes.
     *
     * @type {string}
     */
    get computedButtonIconActionClass() {
        return classSet('')
            .add({
                'avonni-carousel-item__float':
                    this._actionsVariant === 'border' ||
                    this._actionsVariant === 'bare',
                'slds-p-around_xx-small slds-grid': this.isStretchVariant
            })
            .toString();
    }

    /**
     * Action button class styling based on attributes.
     *
     * @type {string}
     */
    get computedButtonActionClass() {
        return classSet('')
            .add({
                'avonni-carousel-item__float':
                    this._actionsVariant === 'border' ||
                    this._actionsVariant === 'bare',
                'slds-p-around_xx-small': this.isStretchVariant
            })
            .toString();
    }

    /**
     * Action button menu action class styling based on attributes.
     *
     * @type {string}
     */
    get computedButtonMenuActionClass() {
        return !this.isMenuVariant ? 'slds-hide_small' : '';
    }

    /**
     * Computed carousel content class - set to display content bottom if position is bottom.
     *
     * @type {string}
     */
    get computedCarouselContentClass() {
        return this.isBottomPosition
            ? 'slds-carousel__content avonni-primitive-carousel-item__content_background avonni-carousel__content-bottom'
            : 'slds-carousel__content avonni-primitive-carousel-item__content_background';
    }

    /**
     * Computed Carousle content size height styling.
     *
     * @type {string}
     */
    get computedCarouselContentSize() {
        return `height: ${this._carouselContentHeight}rem`;
    }

    /**
     * Retrieve image class - set to relative if not in bottom position.
     *
     * @type {string}
     */
    get computedCarouselImageClass() {
        return !this.isBottomPosition
            ? 'slds-carousel__image slds-is-relative'
            : 'slds-carousel__image';
    }

    /**
     * Verify if has text or actions bottom.
     *
     * @type {boolean}
     */
    get displayContentContainer() {
        return this.hasText || (this.hasActions && this.isBottomPosition);
    }

    /**
     * Verify if actions are present.
     *
     * @type {boolean}
     */
    get hasActions() {
        return this._actions.length > 0;
    }

    /**
     * Verify if the title or description is present.
     *
     * @type {boolean}
     */
    get hasText() {
        return this.title || this.description;
    }

    /**
     * Verify if actions position is at the bottom.
     *
     * @type {boolean}
     */
    get isBottomPosition() {
        return this._actionsPosition.includes('bottom');
    }

    /**
     * Verify if the actions variant is menu.
     *
     * @type {boolean}
     */
    get isMenuVariant() {
        return this._actionsVariant === 'menu';
    }

    /**
     * Returns true if the action variant is stretch.
     *
     * @type {boolean}
     */
    get isStretchVariant() {
        return this._actionsVariant === 'stretch';
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */
    actionDispatcher(actionName) {
        const {
            title,
            description,
            src,
            href,
            actions,
            imageAssistiveText,
            name
        } = this;

        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name Name of the action clicked.
         * @param {object} item Item clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    item: {
                        title,
                        description,
                        name,
                        src,
                        href,
                        actions,
                        imageAssistiveText
                    }
                }
            })
        );
    }

    /**
     * Action click event handler.
     *
     * @param {Event}
     */
    handleActionClick(event) {
        event.stopPropagation();
        event.preventDefault();
        const actionName = event.currentTarget.name;
        this.actionDispatcher(actionName);
    }

    /**
     * Item clicked event handler.
     *
     * @param {event}
     */
    handleItemClick() {
        const {
            title,
            description,
            src,
            href,
            actions,
            imageAssistiveText,
            name
        } = this;
        /**
         * The event fired when an item is clicked.
         *
         * @event
         * @name itemclick
         * @param {object} item The item data clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    item: {
                        title,
                        description,
                        src,
                        href,
                        actions,
                        imageAssistiveText,
                        name
                    }
                }
            })
        );
    }

    /**
     * Menu select event handler
     *
     * @param {Event}
     */
    handleMenuSelect(event) {
        const actionName = event.currentTarget.name;
        this.actionDispatcher(actionName);
    }

    /**
     * Carousel height initialization.
     */
    initializeCarouselHeight() {
        const isStretch = this.isStretchVariant ? 8.5 : 7.5;
        this._carouselContentHeight =
            this.actions.length > 0 && this.isBottomPosition
                ? isStretch
                : 6.625;
    }

    /**
     * Prevent the default event browser behavior
     *
     * @param {Event}
     */
    preventDefault(event) {
        event.preventDefault();
    }
}

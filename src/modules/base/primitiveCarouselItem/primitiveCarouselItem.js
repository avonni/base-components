import {
    classSet,
    convertHTMLToPlainText,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { LightningElement, api } from 'lwc';
import noTag from './noTag.html';
import tag from './tag.html';

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
const DEFAULT_IMAGE_ERROR_LABEL = 'No Preview Available';
const DEFAULT_NO_IMAGE_LABEL = 'No Image Source Provided';
const IMAGE_CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};
const IMAGE_POSITIONS = {
    valid: ['top', 'left', 'right', 'bottom'],
    default: 'top'
};

export default class PrimitiveCarouselItem extends LightningElement {
    @api href;
    @api imageAssistiveText;
    @api imageErrorLabel = DEFAULT_IMAGE_ERROR_LABEL;
    @api infos;
    @api itemIndex;
    @api name;
    @api noImageLabel = DEFAULT_NO_IMAGE_LABEL;
    @api panelIndex;
    @api panelItems;
    @api target;
    @api title;

    _actions = [];
    _actionsPosition = ACTIONS_POSITIONS.default;
    _actionsVariant = ACTIONS_VARIANTS.default;
    _description;
    _cropFit = IMAGE_CROP_FIT.default;
    _imagePosition = IMAGE_POSITIONS.default;
    _isFocusable = false;
    _src;

    descriptionTitle;
    displayImageError = false;
    illustrationTitle;
    illustrationVariant;

    render() {
        return normalizeBoolean(this.href) ? tag : noTag;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * An array of action objects.
     *
     * @type {object[]}
     * @public
     * @default border
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(actions) {
        this._actions = normalizeArray(actions);
    }

    /**
     * Valid values include top-left, top-right, bottom-left, bottom-right and bottom-center.
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
    }

    /**
     * Valid values include cover, contain, fill and none.
     *
     * @type {string}
     * @public
     * @default cover
     */
    @api
    get cropFit() {
        return this._cropFit;
    }
    set cropFit(cropFit) {
        this._cropFit = normalizeString(cropFit, {
            fallbackValue: IMAGE_CROP_FIT.default,
            validValues: IMAGE_CROP_FIT.valid
        });
    }

    /**
     * The description of the item.
     *
     * @type {string}
     * @public
     */
    @api
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
        this.descriptionTitle = convertHTMLToPlainText(description);
    }

    /**
     * Valid values include top, left, right, bottom.
     *
     * @type {string}
     * @public
     * @default top
     */
    @api
    get imagePosition() {
        return this._imagePosition;
    }
    set imagePosition(position) {
        this._imagePosition = normalizeString(position, {
            fallbackValue: IMAGE_POSITIONS.default,
            validValues: IMAGE_POSITIONS.valid
        });
    }

    /**
     * Check if item is focusable.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isFocusable() {
        return this._isFocusable;
    }
    set isFocusable(isFocusable) {
        this._isFocusable =
            typeof isFocusable === 'string'
                ? isFocusable === 'true'
                : normalizeBoolean(isFocusable);
    }

    /**
     * The URL of the image.
     *
     * @type {string}
     * @public
     */
    @api
    get src() {
        return this._src;
    }
    set src(src) {
        this._src = src;
        if (!src) {
            this.illustrationVariant = 'desert';
            this.illustrationTitle = this.noImageLabel;
            this.displayImageError = true;
        } else {
            this.displayImageError = false;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed actions button class styling based on action variant attributes.
     *
     * @type {string}
     */
    get computedActionButtonClass() {
        return classSet('')
            .add({
                'avonni-carousel__actions-bare': this.actionsVariant === 'bare',
                'avonni-carousel__actions-border':
                    this.actionsVariant === 'border' || this.isStretchVariant,
                'avonni-carousel__actions-menu': this.isMenuVariant
            })
            .toString();
    }

    /**
     * Computed actions container class styling based on action position attributes.
     *
     * @type {string}
     */
    get computedActionsContainerClass() {
        return classSet('')
            .add({
                'avonni-carousel__actions-bottom-center':
                    this.actionsPosition === 'bottom-center',
                'avonni-carousel__actions-right':
                    this.actionsPosition.includes('right'),
                'avonni-carousel__actions-left':
                    this.actionsPosition.includes('left'),
                'slds-p-around_small slds-is-absolute': this.isTopPosition,
                'avonni-carousel__actions_stretch': this.isStretchVariant,
                'avonni-carousel__actions-container': !this.isStretchVariant
            })
            .toString();
    }

    /**
     * Set actions variant button to base if the action variant is bare, if not, set the button to neutral.
     *
     * @type {string}
     */
    get computedActionsVariant() {
        return this.actionsVariant === 'bare' ? 'base' : 'neutral';
    }

    /**
     * Buttons container class styling based on attributes.
     *
     * @type {string}
     */
    get computedButtonsContainerClass() {
        return !this.isStretchVariant
            ? 'slds-show_small slds-grid slds-grid_vertical-align-center'
            : 'slds-show_small';
    }

    /**
     * Carousel class styling based on attributes.
     *
     * @type {string}
     */
    get computedCarouselClass() {
        return classSet(
            `slds-carousel__panel-action avonni-carousel__panel-action avonni-carousel__image-${this.imagePosition}`
        ).add({
            'slds-text-link_reset': normalizeBoolean(this.href),
            'avonni-carousel__panel-action_with-content':
                this.displayContentContainer
        });
    }

    /**
     * Computed carousel content class - set to display content bottom if position is bottom.
     *
     * @type {string}
     */
    get computedCarouselContentClass() {
        return classSet(
            'slds-col slds-carousel__content avonni-carousel__content avonni-primitive-carousel-item__content_background'
        ).add({
            'avonni-carousel__content-bottom': this.isBottomPosition
        });
    }

    /**
     * Retrieve image class - set to relative if not in bottom position.
     *
     * @type {string}
     */
    get computedCarouselImageClass() {
        return classSet(
            'avonni-carousel__image-container slds-carousel__image'
        ).add({
            'slds-is-relative': this.isTopPosition
        });
    }

    /**
     * Action button div class styling based on attributes.
     *
     * @type {string}
     */
    get computedDivActionClass() {
        return classSet('')
            .add({
                'avonni-carousel-item__float':
                    this.actionsVariant === 'border' ||
                    this.actionsVariant === 'bare',
                'slds-p-around_xx-small': this.isStretchVariant
            })
            .toString();
    }

    /**
     * Computed image media class based on object fit.
     *
     * @type {string}
     */
    get computedImageMediaClass() {
        return classSet('avonni-carousel__image')
            .add(`avonni-carousel__image-object-fit_${this.cropFit}`)
            .toString();
    }

    /**
     * Computed tabindex value for interactive elements.
     *
     * @type {string}
     */
    get computedTabIndex() {
        return this.isFocusable ? '0' : '-1';
    }

    /**
     * Verify if has text or actions bottom.
     *
     * @type {boolean}
     */
    get displayContentContainer() {
        return this.hasText || this.isBottomPosition;
    }

    /**
     * Verify if actions are present.
     *
     * @type {boolean}
     */
    get hasActions() {
        return this.actions.length;
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
        return this.actionsPosition.includes('bottom') && this.hasActions;
    }

    /**
     * Verify if the actions variant is menu.
     *
     * @type {boolean}
     */
    get isMenuVariant() {
        return this.actionsVariant === 'menu';
    }

    /**
     * Returns true if the action variant is stretch.
     *
     * @type {boolean}
     */
    get isStretchVariant() {
        return this.actionsVariant === 'stretch';
    }

    /**
     * Verify if actions position is at the top.
     *
     * @type {boolean}
     */
    get isTopPosition() {
        return this.actionsPosition.includes('top') && this.hasActions;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the first focusable element.
     *
     * @public
     */
    @api
    focus() {
        const focusableElement =
            this.template.querySelector('[data-focusable]');
        if (focusableElement) {
            focusableElement.focus();
        }
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Action click event handler.
     *
     * @param {Event}
     */
    handleActionClick(event) {
        event.stopPropagation();
        event.preventDefault();
        const actionName = event.currentTarget.name;
        this._dispatchActionClick(actionName);
    }

    handleBlur() {
        this._dispatchBlur();
    }

    /**
     * Prevent the default event browser behavior and stop the event propagation.
     *
     * @param {Event}
     */
    handleButtonMenuClick(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    handleFocus() {
        this._dispatchFocus();
    }

    /**
     * Image error event handler.
     */
    handleImageError() {
        this.illustrationVariant = 'no-preview';
        this.illustrationTitle = this.imageErrorLabel;
        this.displayImageError = true;
    }

    /**
     * Item clicked event handler.
     *
     * @param {Event} event
     */
    handleItemClick(event) {
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(
                this.href
            )
        ) {
            event.preventDefault();
        }

        this._dispatchItemClick();
    }

    /**
     * Menu select event handler
     *
     * @param {Event}
     */
    handleMenuSelect(event) {
        const actionName = event.currentTarget.name;
        this._dispatchActionClick(actionName);
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Action click event dispatcher.
     */
    _dispatchActionClick(actionName) {
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
                        title: this.title,
                        description: this.description,
                        name: this.name,
                        src: this.src,
                        href: this.href,
                        actions: this.actions,
                        imageAssistiveText: this.imageAssistiveText
                    }
                }
            })
        );
    }

    _dispatchBlur() {
        /**
         * The event fired when the focus is removed from an element of the item.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    _dispatchFocus() {
        /**
         * The event fired when the focus is set on an element of the item.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Item click event dispatcher.
     */
    _dispatchItemClick() {
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
                        title: this.title,
                        description: this.description,
                        src: this.src,
                        href: this.href,
                        actions: this.actions,
                        imageAssistiveText: this.imageAssistiveText,
                        name: this.name
                    }
                }
            })
        );
    }
}

import { LightningElement, api } from 'lwc';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';

const AVATAR_POSITION = {
    valid: ['left-of-title', 'right-of-title'],
    default: 'left-of-title'
};

const FIELD_VARIANTS = {
    default: 'label-hidden',
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked']
};
const IMAGE_CROP_FIT = {
    valid: ['cover', 'contain', 'fill', 'none'],
    default: 'cover'
};
const IMAGE_CROP_POSITION_DEFAULT = 50;
const IMAGE_HEIGHT_DEFAULT = 250;
const IMAGE_POSITION = {
    valid: ['top', 'bottom'],
    default: 'top'
};

export default class PrimitiveKanbanTile extends LightningElement {
    @api coverImage;
    @api description;
    @api name;
    @api title;
    @api titleUrl;
    @api warningIcon;

    _actions = [];
    _avatar = {};
    _avatarPosition = AVATAR_POSITION.default;
    _dueDate;
    _fields = [];
    _fieldAttributes = {
        variant: FIELD_VARIANTS.default
    };
    _icons = [];
    _imageAttributes = {
        fallbackSrc: null,
        position: IMAGE_POSITION.default,
        height: IMAGE_HEIGHT_DEFAULT,
        cropPositionX: IMAGE_CROP_POSITION_DEFAULT,
        cropPositionY: IMAGE_CROP_POSITION_DEFAULT,
        cropFit: IMAGE_CROP_FIT.default
    };
    _infos = [];
    _isDraggable = false;
    _startDate;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects. The actions are displayed on each card and refer to tasks you can perform, such as updating or deleting the card.
     *
     * @type {object[]}
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(values) {
        this._actions = normalizeArray(values);
    }

    /**
     * Avatar object. The avatar will be displayed in the header.
     *
     * @type {object}
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = normalizeObject(value);
    }

    /**
     * Position of the avatar.
     *
     * @type {string}
     */
    @api
    get avatarPosition() {
        return this._avatarPosition;
    }
    set avatarPosition(value) {
        this._avatarPosition = normalizeString(value, {
            validValues: AVATAR_POSITION.valid,
            fallbackValue: AVATAR_POSITION.default
        });
    }
    /**
     * Specifies the value of the end date, which can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {(string|Date|number)}
     */
    @api
    get dueDate() {
        return this._dueDate;
    }
    set dueDate(value) {
        const date = new Date(value);
        this._dueDate = !value || isNaN(date) ? null : date;
    }

    /**
     * Array of field objects. The fields are displayed on each card.
     *
     * @type {object[]}
     */
    @api
    get fields() {
        return this._fields;
    }
    set fields(values) {
        this._fields = normalizeArray(values);
    }

    /**
     * Field attributes: variant.
     *
     * @type {object}
     */
    @api
    get fieldAttributes() {
        return this._fieldAttributes;
    }
    set fieldAttributes(value) {
        const normalizedFieldAttributes = normalizeObject(value);
        const variant = normalizeString(normalizedFieldAttributes.variant, {
            fallbackValue: FIELD_VARIANTS.default,
            validValues: FIELD_VARIANTS.valid
        });
        this._fieldAttributes = {
            variant
        };
    }

    /**
     * Array of icon objects.
     *
     * @type {object[]}
     */
    @api
    get icons() {
        return this._icons;
    }
    set icons(values) {
        this._icons = normalizeArray(values);
    }

    /**
     * Array of info objects.
     *
     * @type {object[]}
     */
    @api
    get infos() {
        return this._infos;
    }
    set infos(values) {
        this._infos = normalizeArray(values);
    }

    /**
     * Image attributes: fallbackSrc, cropFit, position, height and cropPosition.
     *
     * @type {object}
     */
    @api
    get imageAttributes() {
        return this._imageAttributes;
    }
    set imageAttributes(value) {
        const normalizedImgAttributes = normalizeObject(value);

        this._imageAttributes.fallbackSrc = normalizedImgAttributes.fallbackSrc;

        this._imageAttributes.height = !isNaN(normalizedImgAttributes.height)
            ? normalizedImgAttributes.height
            : IMAGE_HEIGHT_DEFAULT;

        this._imageAttributes.cropPositionX = !isNaN(
            normalizedImgAttributes.cropPositionX
        )
            ? normalizedImgAttributes.cropPositionX
            : IMAGE_CROP_POSITION_DEFAULT;
        this._imageAttributes.cropPositionY = !isNaN(
            normalizedImgAttributes.cropPositionY
        )
            ? normalizedImgAttributes.cropPositionY
            : IMAGE_CROP_POSITION_DEFAULT;

        this._imageAttributes.cropFit = normalizeString(
            normalizedImgAttributes.cropFit,
            {
                fallbackValue: IMAGE_CROP_FIT.default,
                validValues: IMAGE_CROP_FIT.valid
            }
        );

        this._imageAttributes.position = normalizeString(
            normalizedImgAttributes.position,
            {
                fallbackValue: IMAGE_POSITION.default,
                validValues: IMAGE_POSITION.valid
            }
        );
    }

    /**
     * If present, the tile can be dragged by users.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get isDraggable() {
        return this._isDraggable;
    }
    set isDraggable(value) {
        this._isDraggable = normalizeBoolean(value);
    }

    /**
     * Specifies the value of the start date, which can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {(string|Date|number)}
     */
    @api
    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        const date = new Date(value);
        this._startDate = !value || isNaN(date) ? null : date;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set focus on the tile.
     *
     */
    @api
    focus() {
        const tile = this.template.querySelector(
            '[data-element-id="lightning-tile"]'
        );
        if (tile) {
            tile.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed cover image style.
     *
     * @type {string}
     */
    get computedCoverImageStyle() {
        const cropX = this.imageAttributes.cropPositionX;
        const cropY = this.imageAttributes.cropPositionY;
        const imageObjectPosition = `object-position:${cropX}%${cropY}%;`;
        const objectFit = `object-fit:${this.imageAttributes.cropFit};`;
        const heightStyle = `height:${this.imageAttributes.height}px;`;
        return `${heightStyle}${imageObjectPosition}${objectFit}`;
    }

    /**
     * Computed the dates styling class.
     *
     * @type {string}
     */
    get computedDatesClass() {
        return classSet(
            'avonni-kanban__tile_dates slds-grid slds-grid_vertical-align-center slds-p-around_xx-small'
        ).add({
            'avonni-kanban__tile_dates_due-date': this.dueDate,
            'avonni-kanban__tile_dates_overdue slds-p-vertical_xx-small slds-p-horizontal_x-small':
                this.isOverdue
        });
    }

    /**
     * Computed tile bottom styling class.
     *
     * @type {string}
     */
    get computedTileBottomClass() {
        return classSet('').add({
            'slds-grid slds-grid_vertical-align-center slds-m-top_x-small':
                this.hasDates
        });
    }

    /**
     * Gets the class of the tile depending if it is draggable.
     *
     * @type {string}
     */
    get computedTileClass() {
        return classSet('avonni-kanban__tile slds-item slds-is-relative').add({
            'avonni-kanban__tile_disabled_drag': !this.isDraggable
        });
    }

    /**
     * Computed warning icon styling class.
     *
     * @type {string}
     */
    get computedWarningIconClass() {
        return classSet('avonni-primitive-kanban__tile_warning-icon').add({
            'avonni-primitive-kanban__tile_warning-icon-bottom': this.hasDates
        });
    }

    /**
     * Returns true if actions exist.
     *
     * @type {boolean}
     */
    get hasActions() {
        return this.actions && this.actions.length > 0;
    }

    /**
     * Returns true if the tile has an avatar.
     *
     * @type {boolean}
     */
    get hasAvatar() {
        return (
            this.avatar &&
            (this.avatar.src ||
                this.avatar.fallbackIconName ||
                this.avatar.initials)
        );
    }

    /**
     * Returns true if they are dates on the tile.
     *
     * @type {boolean}
     */
    get hasDates() {
        return this.startDate;
    }

    /**
     * Returns true if the tile has a header.
     *
     * @type {boolean}
     */
    get hasHeader() {
        return this.title || this.description;
    }

    /**
     * Returns true if the tile has icons.
     *
     * @type {boolean}
     */
    get hasIcons() {
        return this.icons && this.icons.length > 0;
    }

    /**
     * Returns true if the tile has infos.
     *
     * @type {boolean}
     */
    get hasInfos() {
        return this.infos && this.infos.length > 0;
    }

    /**
     * Returns true if the avatar is displayed on the left.
     *
     * @type {boolean}
     */
    get isAvatarLeft() {
        return this.hasAvatar && this.avatarPosition === 'left-of-title';
    }

    /**
     * Returns true if the avatar is displayed on the right.
     *
     * @type {boolean}
     */
    get isAvatarRight() {
        return this.hasAvatar && this.avatarPosition === 'right-of-title';
    }

    /**
     * Returns true if the cover image is displayed at the top.
     *
     * @type {boolean}
     */
    get isCoverImageTop() {
        return this.coverImage && this.imageAttributes.position === 'top';
    }

    /**
     * Returns true if the cover image is displayed at the bottom.
     *
     * @type {boolean}
     */
    get isCoverImageBottom() {
        return this.coverImage && this.imageAttributes.position === 'bottom';
    }

    /**
     * Returns true if the due date has passed.
     *
     * @type {boolean}
     */
    get isOverdue() {
        const currentDate = new Date();
        if (this.dueDate) {
            const isSameDate =
                this.dueDate.getUTCFullYear() ===
                    currentDate.getUTCFullYear() &&
                this.dueDate.getDay() === currentDate.getDay() &&
                this.dueDate.getMonth() === currentDate.getMonth();
            return isSameDate
                ? false
                : this.dueDate.getTime() < currentDate.getTime();
        }
        return true;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Actionclick handler.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        const actionName =
            event.detail.value || event.currentTarget.dataset.name;
        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name Unique name of the action.
         * @param {string} targetName Unique name of the tile.
         *
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    targetName: this.name
                },
                bubbles: true
            })
        );
    }

    /**
     * Stop the propagation of an event.
     *
     * @param {Event} event
     */
    handleStopPropagation(event) {
        event.stopPropagation();
    }
}

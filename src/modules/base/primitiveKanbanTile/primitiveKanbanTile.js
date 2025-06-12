import { LightningElement, api } from 'lwc';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';

const FIELD_VARIANTS = {
    default: 'label-hidden',
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked']
};

export default class PrimitiveKanbanTile extends LightningElement {
    @api coverImage;
    @api description;
    @api name;
    @api title;
    @api warningIcon;

    _actions = [];
    _dueDate;
    _fields = [];
    _fieldAttributes = {};
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
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(values) {
        this._actions = normalizeArray(values);
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
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Display cover image as background image.
     *
     * @type {string}
     */
    get computedCoverImageStyle() {
        return `background-image: url(${this.coverImage}); height: 250px;`;
    }

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
     * Gets the class of the tile depending on disableItemDragAndDrop
     *
     * @type {string}
     */
    get computedTileClass() {
        return classSet('avonni-kanban__tile slds-item slds-is-relative').add({
            'avonni-kanban__tile_disabled_drag': !this.isDraggable
        });
    }

    /**
     * Computed Warning icon styling class.
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
         * @public
         * @bubbles
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
    stopPropagation(event) {
        event.stopPropagation();
    }
}

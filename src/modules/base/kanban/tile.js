import { classSet } from 'c/utils';

export default class KanbanTile {
    constructor(props) {
        this._index = props.index;
        this._group = props.group;
        this._warningIcon = props.warningIcon;
        this._field = [];
        this._subGroup = props.subGroup;
        this._coverImage = null;
        this._title = props.title;
        this._description = props.description;
        this._startDate = props.startDate;
        this._dueDate = props.dueDate;
        this._summarizeValue = props.summarizeValue;
    }

    get coverImage() {
        return this._coverImage;
    }
    set coverImage(coverImage) {
        this._coverImage = coverImage;
    }

    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    get dueDate() {
        return this._dueDate;
    }
    set dueDate(value) {
        const date = !value || isNaN(new Date(value)) ? null : new Date(value);
        this._dueDate = date;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        const date = !value || isNaN(new Date(value)) ? null : new Date(value);
        this._startDate = date;
    }

    get summarizeValue() {
        return this._summarizeValue;
    }
    set summarizeValue(summarizeValue) {
        this._summarizeValue = summarizeValue;
    }

    get computedTileDatesClass() {
        return classSet(
            'avonni-kanban__tile_dates slds-grid slds-grid_vertical-align-center slds-p-around_xx-small'
        ).add({
            'avonni-kanban__tile_dates_due-date': this.dueDate,
            'avonni-kanban__tile_dates_overdue slds-p-vertical_xx-small slds-p-horizontal_x-small':
                this.isOverdue
        });
    }

    get computedTileFieldsBottomClass() {
        return classSet('').add({
            'slds-grid slds-grid_vertical-align-center slds-m-top_x-small':
                this.hasDates
        });
    }

    get coverImageStyle() {
        return `background-image: url(${this._coverImage}); height: 250px;`;
    }

    get field() {
        return this._field;
    }

    get group() {
        return this._group;
    }

    get hasDates() {
        return this.startDate && (!this.dueDate || this.dueDate);
    }

    get index() {
        return this._index;
    }

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

    get subGroup() {
        return this._subGroup;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    get warningIcon() {
        return this._warningIcon;
    }

    get warningIconStyle() {
        return `position: absolute; right: 0.75rem; ${
            this.hasDates ? '' : 'bottom: 0.75rem;'
        }`;
    }

    addField(field) {
        this._field.push(field);
    }
}

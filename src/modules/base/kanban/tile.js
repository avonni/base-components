import { generateUUID, classSet, normalizeString } from 'c/utils';

const AVATAR_POSITION = {
    valid: ['left-of-title', 'right-of-title'],
    default: 'left-of-title'
};

export default class KanbanTile {
    constructor(props) {
        this._index = props.index;
        this._group = props.group;
        this._warningIcon = props.warningIcon;
        this._field = [];
        this._subGroup = props.subGroup;
        this._coverImage = null;
        this._title = props.title;
        this._titleUrl = props.titleUrl;
        this._description = props.description;
        this.startDate = props.startDate;
        this.dueDate = props.dueDate;
        this._summarizeValue = props.summarizeValue;
        this._linkify = props.linkify;
        this._imageAttributes = props.imageAttributes;
        this._avatarAttributes = props.avatarAttributes || {};
    }

    get avatar() {
        return {
            ...(this._avatar || {}),
            fallbackIconName:
                this._avatar?.fallbackIconName ||
                this._avatarAttributes.fallbackIconName,
            variant: this._avatar?.variant || this._avatarAttributes.variant,
            size: this._avatar?.size || this._avatarAttributes.size,
            presencePosition:
                this._avatar?.presencePosition ||
                this._avatarAttributes.presencePosition,
            initials: this._avatarAttributes.initialsAutoFormatted
                ? this._computeInitials(this._avatar?.initials)
                : this._avatar?.initials
        };
    }
    set avatar(value) {
        this._avatar = value;
    }

    get avatarPosition() {
        return normalizeString(this._avatarAttributes.position, {
            validValues: AVATAR_POSITION.valid,
            fallbackValue: AVATAR_POSITION.default
        });
    }

    get coverImage() {
        return this._coverImage || this._imageAttributes.fallbackSrc;
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
        const date = !isNaN(Number(value))
            ? new Date(Number(value))
            : new Date(value);
        this._dueDate = !value || isNaN(date) ? null : date;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        const date = !isNaN(Number(value))
            ? new Date(Number(value))
            : new Date(value);
        this._startDate = !value || isNaN(date) ? null : date;
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
        const cropX = this._imageAttributes.cropPositionX;
        const cropY = this._imageAttributes.cropPositionY;
        const imageObjectPosition = `object-position:${cropX}%${cropY}%;`;
        const objectFit = `object-fit:${this._imageAttributes.cropFit};`;
        const heightStyle = `height:${this._imageAttributes.height}px;`;
        return `${heightStyle}${imageObjectPosition}${objectFit}`;
    }

    get field() {
        return this._field;
    }

    get group() {
        return this._group;
    }

    get hasDates() {
        return this.startDate;
    }

    get icons() {
        return this._icons?.map((icon) => ({
            name: icon,
            key: generateUUID()
        }));
    }
    set icons(icons) {
        this._icons = icons;
    }

    get index() {
        return this._index;
    }

    get infos() {
        return this._infos?.map((info) => ({
            ...info,
            key: generateUUID()
        }));
    }
    set infos(infos) {
        this._infos = infos;
    }

    get isAvatarLeft() {
        return this._avatar && this.avatarPosition === 'left-of-title';
    }

    get isAvatarRight() {
        return this._avatar && this.avatarPosition === 'right-of-title';
    }

    get isCoverImageTop() {
        return this.coverImage && this._imageAttributes.position === 'top';
    }

    get isCoverImageBottom() {
        return this.coverImage && this._imageAttributes.position === 'bottom';
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

    get titleUrl() {
        if (!this._linkify || !this.index || !this._titleUrl) {
            return null;
        }

        return this._titleUrl;
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
        if (!isNaN(field.value) && field.type === 'percent') {
            field.value = field.value / 100;
        }
        this._field.push(field);
    }

    _computeInitials(initials) {
        if (initials) {
            const initialsArray = initials.split(/[\s-]+/);
            if (initialsArray.length > 1) {
                return initialsArray
                    .map((initial, index) => {
                        if (index > 2) {
                            return '';
                        }
                        return initial.charAt(0).toUpperCase();
                    })
                    .join('');
            }
            if (initials.length >= 2) {
                return (
                    initials.charAt(0).toUpperCase() +
                    initials.charAt(1).toLowerCase()
                );
            } else if (initials.length === 1) {
                return initials.toUpperCase();
            }
        }
        return undefined;
    }
}

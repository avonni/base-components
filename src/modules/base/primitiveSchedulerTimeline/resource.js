import { SchedulerCellGroup } from 'c/schedulerUtils';

export default class SchedulerResource extends SchedulerCellGroup {
    constructor(props) {
        super(props);
        this.avatarSrc = props.avatarSrc;
        this.avatarFallbackIconName = props.avatarFallbackIconName;
        this.avatarInitials = props.avatarInitials;
        this.color = props.color;
        this.label = props.label;
        this.data = props.data;
        this.minHeight = 0;
        this.name = props.name;
        this._height = 0;
    }

    get height() {
        return this._height > this.minHeight ? this._height : this.minHeight;
    }
    set height(value) {
        this._height = value;
    }

    get avatar() {
        if (
            this.avatarFallbackIconName ||
            this.avatarInitials ||
            this.avatarSrc
        ) {
            return {
                src: this.avatarSrc,
                fallbackIconName: this.avatarFallbackIconName,
                initials: this.avatarInitials
            };
        }
        return null;
    }
}

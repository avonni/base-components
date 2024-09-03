import { classSet, normalizeBoolean, normalizeString } from 'c/utils';

const POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};
const VARIANTS = {
    valid: [
        'alt-inverse',
        'base',
        'brand',
        'error',
        'info',
        'inverse',
        'offline',
        'success',
        'warning'
    ],
    default: 'base'
};

const ICON_VARIANTS = {
    valid: ['bare', 'error', 'inverse', 'warning', 'success'],
    default: 'bare'
};

export default class CalendarDateLabel {
    constructor(props) {
        this.iconName = props.iconName;
        this.iconPosition = normalizeString(props.iconPosition, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
        this.iconVariant = normalizeString(props.iconVariant, {
            fallbackValue: ICON_VARIANTS.default,
            validValues: ICON_VARIANTS.valid
        });
        this.label = props.label;
        this.outline = normalizeBoolean(props.outline);
        this.variant = normalizeString(props.variant, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    get computedClass() {
        return classSet('avonni-calendar__chip-label')
            .add({
                'avonni-calendar__chip-icon-only': this.iconName && !this.label,
                'avonni-calendar__chip-without-icon': !this.iconName
            })
            .toString();
    }

    get showLeftIcon() {
        return this.iconName && this.iconPosition === 'left';
    }

    get showRightIcon() {
        return this.iconName && this.iconPosition === 'right';
    }
}

import { classSet } from 'c/utils';

export default class EventOccurrence {
    constructor(props) {
        this.from = props.from;
        this.key = props.key;
        this.to = props.to;
        this.event = props.event;
    }

    get color() {
        return this.event.color;
    }

    get disabled() {
        return this.event.disabled;
    }

    get iconName() {
        return this.event.iconName;
    }

    get keyFields() {
        return this.event.keyFields;
    }

    get name() {
        return this.event.name;
    }

    get offsetLeft() {
        return this.event.offsetLeft;
    }

    get theme() {
        return this.event.theme;
    }

    get title() {
        return this.event.title;
    }

    get width() {
        return this.event.width;
    }

    get wrapperStyle() {
        const { width, offsetLeft } = this;

        // Since the cell border is not included in the %,
        // we add 1px per cell crossed by the event
        const borderWidth = Math.floor(width / 100);

        return `
            margin-left: ${offsetLeft}%;
            width: calc(${width}% + ${borderWidth - 1}px);
        `;
    }

    get wrapperClass() {
        return classSet(
            'slds-grid slds-grid_vertical-align-center scheduler__event-wrapper slds-is-relative'
        )
            .add({
                'slds-m-vertical_x-small': this.theme === 'line',
                'slds-p-vertical_xx-small': this.theme !== 'line'
            })
            .toString();
    }

    get style() {
        const { color, transparentColor, theme } = this;
        const isDefault = theme === 'default';
        const isTransparent = theme === 'transparent';
        const isRounded = theme === 'rounded';
        const isHollow = theme === 'hollow';
        const isLine = theme === 'line';

        let style = '';
        if (isDefault || isRounded) {
            style += `background-color: ${color};`;
        }
        if (isTransparent) {
            style += `
                background-color: ${transparentColor};
                border-left-color: ${color};
            `;
        }
        if (isHollow || isLine) {
            style += `border-color: ${color}`;
        }

        return style;
    }

    get class() {
        const theme = this.theme;
        return classSet(
            `slds-p-vertical_xx-small slds-p-horizontal_small scheduler__event slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate scheduler__event_${theme}`
        )
            .add({
                'slds-text-color_inverse slds-current-color':
                    theme === 'default' || theme === 'rounded'
            })
            .toString();
    }

    get transparentColor() {
        const isHex = this.color.match(/#([a-zA-Z0-9]{3}$|[a-zA-Z0-9]{6}$)/);
        if (isHex) {
            return isHex[0].length === 4
                ? `${isHex[0]}${isHex[1]}30`
                : `${isHex[0]}30`;
        }
        const isRGB = this.color.match(/rgb\(([0-9]+,\s?[0-9]+,\s?[0-9]+)\)/);
        if (isRGB) {
            return `rgba(${isRGB[1]}, .3)`;
        }
        return this.color;
    }

    get showTitle() {
        return this.disabled && (this.iconName || this.title);
    }
}

import { classSet } from 'c/utils';
import { generateColors, isLightColor } from 'c/colorUtils';

const DISABLED_COLOR = '#dddbda';

export default class ColorPaletteColor {
    constructor(props) {
        this.color = props.color;
        this.disabled = props.disabled;
        this.displayCheckMark = props.displayCheckMark;
        this.group = props.group;
        this.hideOutline = props.hideOutline;
        this.label = props.label;
        this.selected = props.selected;
        this.tileHeight = props.tileHeight;
        this.tileWidth = props.tileWidth;
        this.value = props.value;
    }

    get ariaLabel() {
        const label = this.label || this.color || '';
        return this.groupLabel ? `${this.groupLabel}, ${label}` : label;
    }

    get ariaSelected() {
        return this.selected ? 'true' : 'false';
    }

    get checkMarkStyle() {
        const smallestLength = Math.min(this.tileHeight, this.tileWidth);
        const lengthStyle = `${smallestLength - smallestLength * 0.4}px`;
        const height = lengthStyle;
        const width = lengthStyle;
        const { R, G, B } = generateColors(this.color);
        const color = isLightColor(R, G, B) ? 'black' : 'white';
        const fill = `var(--avonni-color-palette-swatch-selected-checkmark-color, ${color})`;
        return `
            height: ${height};
            width: ${width};
            fill: ${fill};
        `;
    }

    get gridItemClass() {
        return classSet('slds-color-picker__swatch-trigger')
            .add({
                'slds-is-selected': this.selected,
                'avonni-color-picker__show-selected-outline': !this.hideOutline,
                'avonni-color-picker__show-selected-checkmark':
                    this.displayCheckMark
            })
            .toString();
    }

    get groupLabel() {
        return this.group?.label;
    }

    get showCheckMark() {
        return this.selected && this.displayCheckMark;
    }

    get swatchStyle() {
        const backgroundColor = this.disabled ? DISABLED_COLOR : this.color;
        const outline = this.hideOutline
            ? 'none'
            : `var(--avonni-color-palette-swatch-selected-outline-color, ${backgroundColor})`;
        return `
            background-color: ${backgroundColor};
            height: ${this.tileHeight}px;
            outline-color: ${outline};
            width: ${this.tileWidth}px;
        `;
    }

    get wrapperClass() {
        return classSet('slds-dropdown__item')
            .add({
                'slds-is-selected': this.selected
            })
            .toString();
    }

    setGroup(group) {
        this.group = group;
    }
}

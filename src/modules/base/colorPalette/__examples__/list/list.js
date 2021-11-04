import { LightningElement } from 'lwc';

export default class ColorPaletteList extends LightningElement {
    colors = [
        {
            label: 'color-background',
            color: '#f3f2f2',
            value: '--lwc-colorBackground'
        },
        {
            label: 'color-background-alt',
            color: '#ffffff',
            value: '--lwc-colorBackgroundAlt'
        },
        {
            label: 'color-background-alt-inverse',
            color: '#032d60',
            value: '--lwc-colorBackgroundAltInverse'
        },
        {
            label: 'color-text-action-label',
            color: '#3e3e3c',
            value: '--lwc-colorTextActionLabel'
        },
        {
            label: 'color-text-action-label-active',
            color: '#080707',
            value: '--lwc-colorTextActionLabelActive'
        },
        {
            label: 'color-text-brand',
            color: '#1b96ff',
            value: '--lwc-colorTextBrand'
        },
        {
            label: 'color-border',
            color: '#dddbda',
            value: '--lwc-colorBorder'
        },
        {
            label: 'color-border-brand',
            color: '#1b96ff',
            value: '--lwc-colorBorderBrand'
        }
    ];
}

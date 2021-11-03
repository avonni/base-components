import { LightningElement } from 'lwc';

export default class ColorPickerTokens extends LightningElement {
    tokens = [
        {
            label: 'color-background',
            color: '#f3f2f2',
            value: '--lwc-colorBackground',
            groups: ['background', 'invalidGroup']
        },
        {
            label: 'color-background-alt',
            color: '#ffffff',
            value: '--lwc-colorBackgroundAlt',
            groups: ['background']
        },
        {
            label: 'color-background-alt-inverse',
            color: '#032d60',
            value: '--lwc-colorBackgroundAltInverse',
            groups: ['background']
        },
        {
            label: 'color-text-action-label',
            color: '#3e3e3c',
            value: '--lwc-colorTextActionLabel',
            groups: ['text']
        },
        {
            label: 'color-text-action-label-active',
            color: '#080707',
            value: '--lwc-colorTextActionLabelActive',
            groups: ['text']
        },
        {
            label: 'color-text-brand',
            color: '#1b96ff',
            value: '--lwc-colorTextBrand',
            groups: ['text']
        },
        {
            label: 'color-border',
            color: '#dddbda',
            value: '--lwc-colorBorder',
            groups: ['border']
        },
        {
            label: 'color-border-brand',
            color: '#1b96ff',
            value: '--lwc-colorBorderBrand',
            groups: ['border']
        }
    ];
}

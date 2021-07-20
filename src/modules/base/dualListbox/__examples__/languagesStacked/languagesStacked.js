import { LightningElement } from 'lwc';

export default class DualListboxLanguagesStacked extends LightningElement {
    values = ['en', 'fr'];

    languagesOptions = [
        {
            value: 'fr',
            label: 'French'
        },
        {
            value: 'en',
            label: 'English'
        },
        {
            value: 'es',
            label: 'Spanish'
        },
        {
            value: 'de',
            label: 'German'
        },
        {
            value: 'it',
            label: 'Italian'
        },
        {
            value: 'ja',
            label: 'Japanese'
        },
        {
            value: 'hi',
            label: 'Hindi'
        },
        {
            value: 'md',
            label: 'Mandarin'
        }
    ];
}

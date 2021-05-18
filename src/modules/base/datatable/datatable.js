import LightningDatatable from 'lightning/datatable';
import { api } from 'lwc';

import avatar from './avatar.html';
import avatarGroup from './avatarGroup.html';
import colorPicker from './colorPicker.html';
import image from './image.html';
import inputCounter from './inputCounter.html';

const TYPES_ALWAYS_WRAPPED = [
    'avatar',
    'avatar-group',
    'color-picker',
    'image',
    'input-counter'
];

export default class Datatable extends LightningDatatable {
    static customTypes = {
        avatar: {
            template: avatar
        },
        'avatar-group': {
            template: avatarGroup
        },
        'color-picker': {
            template: colorPicker
        },
        image: {
            template: image
        },
        'input-counter': {
            template: inputCounter
        }
    };

    connectedCallback() {
        this.template.addEventListener('avatarclick', this.dispatchAvatarClick);
        this.template.addEventListener('change', this.dispatchChange);
        this.template.addEventListener('blur', this.dispatchBlur);
        this.template.addEventListener('focus', this.dispatchFocus);
    }

    disconnectedCallback() {
        this.template.removeEventListener(
            'avatarclick',
            this.dispatchAvatarClick
        );
        this.template.removeEventListener('change', this.dispatchChange);
        this.template.removeEventListener('blur', this.dispatchBlur);
        this.template.removeEventListener('focus', this.dispatchFocus);
    }

    @api
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this._columns = JSON.parse(JSON.stringify(value));
        this.removeWrapOption();
    }

    removeWrapOption() {
        this.columns.forEach((column) => {
            if (TYPES_ALWAYS_WRAPPED.includes(column.type)) {
                column.wrapText = true;
                column.hideDefaultActions = true;
            }
        });
    }

    dispatchAvatarClick = (event) => {
        event.stopPropagation();

        this.dispatchEvent(
            new CustomEvent('avatarclick', {
                detail: event.detail,
                bubbles: true,
                cancelable: true
            })
        );
    };

    dispatchChange = (event) => {
        event.stopPropagation();

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: event.detail,
                bubbles: true,
                cancelable: true
            })
        );
    };

    dispatchFocus = (event) => {
        event.stopPropagation();

        this.dispatchEvent(new CustomEvent('focus'));
    };

    dispatchBlur = (event) => {
        event.stopPropagation();

        this.dispatchEvent(new CustomEvent('blur'));
    };
}

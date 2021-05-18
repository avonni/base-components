import LightningDatatable from 'lightning/datatable';
import { api } from 'lwc';

import avatar from './avatar.html';
import avatarGroup from './avatarGroup.html';
import colorPicker from './colorPicker.html';

const TYPES_ALWAYS_WRAPPED = ['avatar', 'avatar-group', 'color-picker'];

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
        }
    };

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
}

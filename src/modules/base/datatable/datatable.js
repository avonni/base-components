import LightningDatatable from 'lightning/datatable';
import avatar from './avatar.html';
import avatarGroup from './avatarGroup.html';
import { api } from 'lwc';

const TYPES_ALWAYS_WRAPPED = ['avatar', 'avatar-group'];

export default class Datatable extends LightningDatatable {
    static customTypes = {
        avatar: {
            template: avatar
            // typeAttributes: []
        },
        'avatar-group': {
            template: avatarGroup
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

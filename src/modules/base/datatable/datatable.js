import LightningDatatable from 'lightning/datatable';
import avatar from './avatar.html';

export default class Datatable extends LightningDatatable {
    static customTypes = {
        avatar: {
            template: avatar
            // typeAttributes: []
        }
    };
}

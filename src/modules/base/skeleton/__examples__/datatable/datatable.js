import { LightningElement } from 'lwc';

export default class Datatable extends LightningElement {
    variantAttributes = {
        columns: 3,
        hideCheckboxColumn: false,
        hideTableHeader: false
    };
}

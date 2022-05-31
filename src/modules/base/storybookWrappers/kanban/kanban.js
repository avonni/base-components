import { LightningElement, api } from 'lwc';

export default class Kanban extends LightningElement {
    @api groupValues;
    @api fields;
    @api records;
    @api actions;
    @api summarizeFieldName;
    @api readOnly;
    @api isLoading;
    @api variant;
    @api groupFieldName;
}

import { LightningElement, api } from 'lwc';

export default class Kanban extends LightningElement {
    @api actions;
    @api coverImageFieldName;
    @api descriptionFieldName;
    @api disableColumnDragAndDrop;
    @api disableItemDragAndDrop;
    @api dueDateFieldName;
    @api fieldAttributes;
    @api fields;
    @api groupFieldName;
    @api groupValues;
    @api hideHeader;
    @api isLoading;
    @api keyField;
    @api records;
    @api startDateFieldName;
    @api subGroupFieldName;
    @api summarizeFieldName;
    @api titleFieldName;
    @api variant;
}

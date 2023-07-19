import { LightningElement, api } from 'lwc';

export default class Kanban extends LightningElement {
    @api actions;
    @api cardAttributes;
    @api disableColumnDragAndDrop;
    @api disableItemDragAndDrop;
    @api groupFieldName;
    @api groupValues;
    @api hideHeader;
    @api isLoading;
    @api keyField;
    @api records;
    @api subGroupFieldName;
    @api summarizeFieldName;
    @api variant;
}

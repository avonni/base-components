/*
 * -------------------------------------------------------------
 *  Mock component for the Lightning Record Edit Form.
 * -------------------------------------------------------------
 */

import { LightningElement, api } from 'lwc';

export default class RecordEditForm extends LightningElement {
    @api density;
    @api fieldNames;
    @api formClass;
    @api layoutType;
    @api objectApiName;
    @api optionFields;
    @api recordId;
    @api recordTypeId;
}

/*
 * -------------------------------------------------------------
 *  Mock component for the Lightning Record View Form.
 * -------------------------------------------------------------
 */

import { LightningElement, api } from 'lwc';

export default class RecordViewForm extends LightningElement {
    @api density;
    @api objectApiName;
    @api optionFields;
    @api recordId;
}
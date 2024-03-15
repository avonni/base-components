/*
 * -------------------------------------------------------------
 *  Mock component for the Lightning Record Picker.
 * -------------------------------------------------------------
 */

import { LightningElement, api } from 'lwc';

export default class RecordPicker extends LightningElement {
    @api disabled;
    @api displayInfo;
    @api fieldLevelHelp;
    @api filter;
    @api label;
    @api matchingInfo;
    @api messageWhenBadInput;
    @api objectApiName;
    @api placeholder;
    @api required;
    @api value;
    @api variant;
}

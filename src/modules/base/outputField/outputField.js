/*
 * -------------------------------------------------------------
 *  Mock component for the Lightning Output Field.
 * -------------------------------------------------------------
 */

import { LightningElement, api } from 'lwc';

export default class OutputField extends LightningElement {
    @api fieldClass;
    @api fieldName;
    @api variant;
}
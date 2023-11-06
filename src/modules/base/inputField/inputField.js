/*
 * -------------------------------------------------------------
 *  Mock component for the Lightning Input Field.
 * -------------------------------------------------------------
 */

import { LightningElement, api } from 'lwc';

export default class InputField extends LightningElement {
    @api ariaInvalid;
    @api autocomplete;
    @api dirty;
    @api disabled;
    @api fieldName;
    @api readOnly;
    @api required;
    @api value;
    @api variant;
}

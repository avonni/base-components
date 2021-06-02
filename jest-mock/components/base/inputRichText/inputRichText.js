import { LightningElement, api } from 'lwc';

export default class InputRichText extends LightningElement {
    @api label;
    @api labelVisible;
    @api placeholder;
    @api disabledCategories;
    @api formats;
    @api variant;
    @api messageWhenBadInput;
    @api customButtons;
    @api shareWithEntityId;
    @api isPublisher;
    @api value;
    @api valid;
    @api disabled;

    @api
    focus() {
        return true;
    }

    @api
    blur() {
        return true;
    }

    @api
    setFormat(value) {
        return true;
    }

    @api
    getFormat() {
        return true;
    }
}

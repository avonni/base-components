import { LightningElement, api } from 'lwc';

export default class InputDateRange extends LightningElement {
    @api fieldLevelHelp;
    @api label;
    @api labelStartDate;
    @api labelEndDate;
    @api messageWhenValueMissing;
    @api startDate;
    @api endDate;
    @api timezone;
    @api dateStyle;
    @api timeStyle;
    @api type;
    @api disabled;
    @api readOnly;
    @api required;
    @api variant;

    @api
    get validity() {
        return true;
    }

    @api
    focus() {
        return undefined;
    }

    @api
    blur() {
        return undefined;
    }

    @api
    checkValidity() {
        return true;
    }

    @api
    reportValidity() {
        return true;
    }

    @api
    showHelpMessageIfInvalid() {
        return undefined;
    }

    @api
    setCustomValidity() {
        return undefined;
    }
}

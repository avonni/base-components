import { LightningElement, api } from 'lwc';
import { generateUniqueId } from 'c/utils';

// QUESTIONS:
// Option to hide empty groups?

export default class RelationshipGraph extends LightningElement {
    @api label;
    @api groups;

    get generateKey() {
        return generateUniqueId();
    }
}

import { LightningElement } from 'lwc';

export default class OutputDataDateTime extends LightningElement {
    typeAttributes = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    };

    value = new Date().toISOString();
}

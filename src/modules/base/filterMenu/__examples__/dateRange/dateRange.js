import { LightningElement } from 'lwc';

export default class FilterMenuDateRange extends LightningElement {
    typeAttributes = {
        labelStartDate: 'Start',
        labelEndDate: 'End'
    };

    value = [new Date(2022, 10, 16, 11), new Date(2022, 10, 20, 15, 30)];
}

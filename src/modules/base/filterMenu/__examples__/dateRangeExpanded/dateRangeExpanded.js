import { LightningElement } from 'lwc';

export default class FilterMenuDateRangeExpanded extends LightningElement {
    typeAttributes = {
        isExpanded: true,
        labelStartDate: 'Start',
        labelEndDate: 'End',
        showRangeOptions: true
    };

    value = [new Date(2022, 10, 16, 11), new Date(2022, 10, 20, 15, 30)];
}

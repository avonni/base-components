import { LightningElement } from 'lwc';

export default class FilterMenuDateRangeExpanded extends LightningElement {
    typeAttributes = {
        isExpanded: true,
        labelStartDate: 'Start',
        labelEndDate: 'End',
        showRangeOptions: true,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    value = [new Date(2022, 10, 16, 11), new Date(2022, 10, 20, 15, 30)];
}

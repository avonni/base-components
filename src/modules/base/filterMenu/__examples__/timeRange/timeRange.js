import { LightningElement } from 'lwc';

export default class FilterMenuTimeRange extends LightningElement {
    typeAttributes = {
        labelStartTime: 'Start',
        labelEndTime: 'End'
    };

    value = ['08:30:00.000', '17:00:00.000'];
}

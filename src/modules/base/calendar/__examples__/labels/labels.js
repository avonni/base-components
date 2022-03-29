import { LightningElement } from 'lwc';

export default class CalendarLabels extends LightningElement {
    value = ['05/10/2022', '05/30/2022'];
    disabledDates = ['Sat'];
    dateLabels = [
        {
            date: 'Tue',
            label: 'Tuesday',
            variant: 'success',
            iconName: 'standard:branch_merge',
            iconPosition: 'right',
            iconVariant: 'inverse'
        },
        {
            date: 23,
            variant: 'success',
            iconName: 'standard:campaign',
            iconVariant: 'inverse'
        },
        {
            date: new Date('05/25/2022'),
            label: '25 may long label',
            variant: 'error',
            iconName: 'standard:lightning_component',
            iconVariant: 'inverse'
        }
    ];
}

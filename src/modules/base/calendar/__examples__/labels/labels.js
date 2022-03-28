import { LightningElement } from 'lwc';

export default class CalendarLabels extends LightningElement {
    value = ['05/10/2022', '05/30/2022'];
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
            date: 25,
            variant: 'error',
            iconName: 'standard:campaign',
            iconVariant: 'inverse'
        },
        {
            date: new Date('05/26/2022'),
            label: '26 may',
            variant: 'error',
            iconName: 'standard:branch_merge',
            iconVariant: 'inverse'
        }
    ];
}

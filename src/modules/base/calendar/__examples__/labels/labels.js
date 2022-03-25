import { LightningElement } from 'lwc';

export default class CalendarLabels extends LightningElement {
    value = ['05/03/2022', '05/08/2022', '05/12/2022', '05/18/2022'];
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
            label: '',
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

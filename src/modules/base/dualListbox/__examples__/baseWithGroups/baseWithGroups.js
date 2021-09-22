import { LightningElement } from 'lwc';

export default class DualListboxBaseWithGroups extends LightningElement {
    options = [
        {
            value: 'A',
            label: 'Option A'
        },
        {
            value: 'B',
            label: 'Option B'
        },
        {
            value: '1',
            label: 'Option 1',
            groupName: 'Odd'
        },
        {
            value: '2',
            label: 'Option 2',
            groupName: 'Even'
        },
        {
            value: '3',
            label: 'Option 3',
            groupName: 'Odd'
        },
        {
            value: '4',
            label: 'Option 4',
            groupName: 'Even'
        },
        {
            value: '5',
            label: 'Option 5',
            groupName: 'Odd'
        },
        {
            value: '6',
            label: 'Option 6',
            groupName: 'Even'
        },
        {
            value: '7',
            label: 'Option 7',
            groupName: 'Odd'
        },
        {
            value: '8',
            label: 'Option 8',
            groupName: 'Even'
        },
        {
            value: '9',
            label: 'Option 9',
            groupName: 'Odd'
        },
        {
            value: '10',
            label: 'Option 10',
            groupName: 'Even'
        }
    ];

    values = ['B', '3', '2', '4', '5', '6'];
}

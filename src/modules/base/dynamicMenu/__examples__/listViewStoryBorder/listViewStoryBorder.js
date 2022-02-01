import { LightningElement } from 'lwc';

export default class DynamicMenuListViewStoryBorder extends LightningElement {
    items = [
        {
            label: 'All Accounts',
            value: 'all-accounts'
        },
        {
            label: 'All Accounts 2',
            value: 'all-accounts-2'
        },
        {
            label: 'My Accounts',
            value: 'my-accounts'
        },
        {
            label: 'New Last Week',
            value: 'last-week'
        },
        {
            label: 'New This Week',
            value: 'this-week'
        }
    ];
}

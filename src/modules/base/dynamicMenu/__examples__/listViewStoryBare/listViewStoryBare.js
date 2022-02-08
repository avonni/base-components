import { LightningElement } from 'lwc';

export default class DynamicMenuListViewStoryBare extends LightningElement {
    items = [
        {
            label: 'All Accounts',
            value: 'all-accounts',
            actions: [
                {
                    name: 'action-1',
                    iconName: 'utility:edit',
                    alternativeText: 'Edit'
                },
                {
                    name: 'action-2',
                    iconName: 'utility:delete',
                    alternativeText: 'Delete'
                }
            ]
        },
        {
            label: 'All Accounts 2',
            value: 'all-accounts-2',
            actions: [
                {
                    name: 'action-1',
                    iconName: 'utility:edit',
                    alternativeText: 'Edit'
                },
                {
                    name: 'action-2',
                    iconName: 'utility:delete',
                    alternativeText: 'Delete'
                }
            ]
        },
        {
            label: 'My Accounts',
            value: 'my-accounts',
            actions: [
                {
                    name: 'action-1',
                    iconName: 'utility:edit',
                    alternativeText: 'Edit'
                },
                {
                    name: 'action-2',
                    iconName: 'utility:delete',
                    alternativeText: 'Delete'
                }
            ]
        },
        {
            label: 'New Last Week',
            value: 'last-week',
            actions: [
                {
                    name: 'action-1',
                    iconName: 'utility:edit',
                    alternativeText: 'Edit'
                },
                {
                    name: 'action-2',
                    iconName: 'utility:delete',
                    alternativeText: 'Delete'
                }
            ]
        },
        {
            label: 'New This Week',
            value: 'this-week',
            actions: [
                {
                    name: 'action-1',
                    iconName: 'utility:edit',
                    alternativeText: 'Edit'
                },
                {
                    name: 'action-2',
                    iconName: 'utility:delete',
                    alternativeText: 'Delete'
                }
            ]
        }
    ];
}

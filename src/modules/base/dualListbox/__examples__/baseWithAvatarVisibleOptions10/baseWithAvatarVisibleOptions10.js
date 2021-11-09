import { LightningElement } from 'lwc';

export default class DualListboxBaseWithAvatarVisibleOptions10 extends LightningElement {
    values = ['2', '3'];
    requiredOptions = ['1'];

    optionsWithAvatar = [
        {
            value: '1',
            label: 'Jobs',
            avatar: {
                fallbackIconName: 'custom:custom91'
            }
        },
        {
            value: '2',
            label: 'Leads & Referrals',
            avatar: {
                fallbackIconName: 'standard:lead'
            }
        },
        {
            value: '3',
            label: 'Legal Entities',
            avatar: {
                fallbackIconName: 'custom:custom87'
            }
        },
        {
            value: '4',
            label: 'Contacts',
            avatar: {
                fallbackIconName: 'standard:contact'
            }
        },
        {
            value: '5',
            label: 'Cases',
            avatar: {
                fallbackIconName: 'standard:case'
            }
        },
        {
            value: '6',
            label: 'Accounts',
            avatar: {
                fallbackIconName: 'standard:account'
            }
        },
        {
            value: '7',
            label: 'Reports',
            avatar: {
                fallbackIconName: 'standard:report'
            }
        },
        {
            value: '8',
            label: 'Knowledge',
            avatar: {
                fallbackIconName: 'standard:knowledge'
            }
        },
        {
            value: '9',
            label: 'List Emails',
            avatar: {
                fallbackIconName: 'standard:list_email'
            }
        },
        {
            value: '10',
            label: 'Dashboards',
            avatar: {
                fallbackIconName: 'standard:dashboard'
            }
        }
    ];
}

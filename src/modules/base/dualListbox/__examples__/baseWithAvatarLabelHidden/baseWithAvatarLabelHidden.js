import { LightningElement } from 'lwc';

export default class DualListboxBaseWithAvatarLabelHidden extends LightningElement {
    values = ['2', '3'];
    requiredOptions = ['1'];

    optionsWithAvatar = [
        {
            value: '1',
            label: 'Jobs',
            iconName: 'custom:custom91'
        },
        {
            value: '2',
            label: 'Leads & Referrals',
            iconName: 'standard:lead'
        },
        {
            value: '3',
            label: 'Legal Entities',
            iconName: 'custom:custom87'
        },
        {
            value: '4',
            label: 'Contacts',
            iconName: 'standard:contact'
        },
        {
            value: '5',
            label: 'Cases',
            iconName: 'standard:case'
        },
        {
            value: '6',
            label: 'Accounts',
            iconName: 'standard:account'
        },
        {
            value: '7',
            label: 'Reports',
            iconName: 'standard:report'
        },
        {
            value: '8',
            label: 'Knowledge',
            iconName: 'standard:knowledge'
        },
        {
            value: '9',
            label: 'List Emails',
            iconName: 'standard:list_email'
        },
        {
            value: '10',
            label: 'Dashboards',
            iconName: 'standard:dashboard'
        }
    ];
}

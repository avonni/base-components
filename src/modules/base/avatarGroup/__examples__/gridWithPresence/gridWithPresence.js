import { LightningElement } from 'lwc';

export default class AvatarGroupGridWithPresence extends LightningElement {
    items = [
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'online',
            presenceTitle: 'Online',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-1'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-2'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'offline',
            presenceTitle: 'Offline',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-3'
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-4'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'online',
            presenceTitle: 'Online',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-5'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-6'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'offline',
            presenceTitle: 'Offline',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-7'
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-8'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'online',
            presenceTitle: 'Online',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-9'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-10'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'offline',
            presenceTitle: 'Offline',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-11'
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-12'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'online',
            presenceTitle: 'Online',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-13'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-14'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'offline',
            presenceTitle: 'Offline',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-15'
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-16'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'online',
            presenceTitle: 'Online',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-17'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-18'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'offline',
            presenceTitle: 'Offline',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-19'
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-20'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'online',
            presenceTitle: 'Online',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-21'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-22'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'offline',
            presenceTitle: 'Offline',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-23'
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-24'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'online',
            presenceTitle: 'Online',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-25'
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-26'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            presence: 'offline',
            presenceTitle: 'Offline',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-27'
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-28'
        }
    ];
}

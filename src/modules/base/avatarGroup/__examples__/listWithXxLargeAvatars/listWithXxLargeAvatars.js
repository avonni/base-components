import { LightningElement } from 'lwc';

export default class AvatarGroupListWithXxLargeAvatars extends LightningElement {
    items = [
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'John Doe',
            status: 'locked',
            statusTitle: 'Locked',
            statusPosition: 'top-left',
            entityIconName: 'standard:account',
            entityInitials: 'FC',
            entityVariant: 'circle',
            entityPosition: 'bottom-right',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-1',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'brand', outline: true },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'Jane Doe',
            status: 'approved',
            statusTitle: 'Approved',
            statusPosition: 'top-left',
            entityIconName: 'standard:account',
            entityInitials: 'FC',
            entityPosition: 'bottom-right',
            entityVariant: 'circle',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-2',
            tags: [
                { label: 'tag-01', variant: 'warning' },
                { label: 'tag-02', variant: 'error' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'Vishnu Doe',
            status: 'declined',
            statusTitle: 'Declined',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-3',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'inverse' },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'Eliott Beauchesne',
            status: 'unknown',
            statusTitle: 'Unknown',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-4',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'inverse' },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'John Doe',
            status: 'locked',
            statusTitle: 'Locked',
            statusPosition: 'top-left',
            entityIconName: 'standard:account',
            entityInitials: 'FC',
            entityVariant: 'circle',
            entityPosition: 'bottom-right',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-5',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'brand', outline: true },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'Jane Doe',
            status: 'approved',
            statusTitle: 'Approved',
            statusPosition: 'top-left',
            entityIconName: 'standard:account',
            entityInitials: 'FC',
            entityPosition: 'bottom-right',
            entityVariant: 'circle',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-6',
            tags: [
                { label: 'tag-01', variant: 'warning' },
                { label: 'tag-02', variant: 'error' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'Vishnu Doe',
            status: 'declined',
            statusTitle: 'Declined',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-7',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'inverse' },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'Eliott Beauchesne',
            status: 'unknown',
            statusTitle: 'Unknown',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-8',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'inverse' },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'John Doe',
            status: 'locked',
            statusTitle: 'Locked',
            statusPosition: 'top-left',
            entityIconName: 'standard:account',
            entityInitials: 'FC',
            entityVariant: 'circle',
            entityPosition: 'bottom-right',
            primaryText: 'John Doe',
            secondaryText: 'VP, Human Resources',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-9',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'brand', outline: true },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:user',
            initials: 'UA',
            alternativeText: 'Jane Doe',
            status: 'approved',
            statusTitle: 'Approved',
            statusPosition: 'top-left',
            entityIconName: 'standard:account',
            entityInitials: 'FC',
            entityPosition: 'bottom-right',
            entityVariant: 'circle',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-10',
            tags: [
                { label: 'tag-01', variant: 'warning' },
                { label: 'tag-02', variant: 'error' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'Vishnu Doe',
            status: 'declined',
            statusTitle: 'Declined',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
            name: 'user-11',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'inverse' },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            initials: 'EB',
            alternativeText: 'Eliott Beauchesne',
            status: 'unknown',
            statusTitle: 'Unknown',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-12',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'inverse' },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        }
    ];
}

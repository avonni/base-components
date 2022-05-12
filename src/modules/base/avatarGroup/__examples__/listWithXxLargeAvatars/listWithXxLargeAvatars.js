import { LightningElement } from 'lwc';

export default class AvatarGroupListWithXxLargeAvatars extends LightningElement {
    items = [
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
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
            alternativeText: 'This is the alternative text',
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
            tags: [
                { label: 'tag-01', variant: 'warning' },
                { label: 'tag-02', variant: 'error' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            status: 'declined',
            statusTitle: 'Declined',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
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
            alternativeText: 'This is the alternative text',
            status: 'unknown',
            statusTitle: 'Unknown',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
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
            alternativeText: 'This is the alternative text',
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
            alternativeText: 'This is the alternative text',
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
            tags: [
                { label: 'tag-01', variant: 'warning' },
                { label: 'tag-02', variant: 'error' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            status: 'declined',
            statusTitle: 'Declined',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
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
            alternativeText: 'This is the alternative text',
            status: 'unknown',
            statusTitle: 'Unknown',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
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
            alternativeText: 'This is the alternative text',
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
            alternativeText: 'This is the alternative text',
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
            tags: [
                { label: 'tag-01', variant: 'warning' },
                { label: 'tag-02', variant: 'error' }
            ]
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
            status: 'declined',
            statusTitle: 'Declined',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Vishnu Doe',
            secondaryText: 'VP, Research and Development',
            tertiaryText: 'MadeUp Co.',
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
            alternativeText: 'This is the alternative text',
            status: 'unknown',
            statusTitle: 'Unknown',
            statusPosition: 'top-left',
            entityIconName: 'standard:case',
            entityPosition: 'bottom-right',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            tags: [
                { label: 'tag-01', variant: 'default' },
                { label: 'tag-02', variant: 'inverse' },
                { label: 'tag-03', variant: 'warning' },
                { label: 'tag-04', variant: 'success' }
            ]
        }
    ];
}

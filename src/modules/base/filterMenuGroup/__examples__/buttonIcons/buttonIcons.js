import { LightningElement } from 'lwc';

const contact = [
    {
        label: 'Call',
        value: 'call',
        prefixIconName: 'standard:call',
        iconName: 'utility:voicemail_drop'
    },
    {
        label: 'Email',
        value: 'email',
        prefixIconName: 'standard:email'
    },
    {
        label: 'Meeting',
        value: 'meeting',
        prefixIconName: 'standard:service_appointment',
        disabled: true
    },
    {
        label: 'Other',
        value: 'other',
        prefixIconName: 'standard:all'
    }
];
const prices = [
    {
        label: 'Free',
        value: 'free'
    },
    {
        label: 'Paid',
        value: 'paid'
    }
];

const editions = [
    {
        label: 'Essentials',
        value: 'essentials'
    },
    {
        label: 'Professional',
        value: 'professional'
    },
    {
        label: 'Enterprise',
        value: 'enterprise'
    },
    {
        label: 'Unlimited',
        value: 'unlimited'
    },
    {
        label: 'Force.com',
        value: 'forcecom'
    },
    {
        label: 'Developer',
        value: 'developer'
    },
    {
        label: 'Performance',
        value: 'performance'
    }
];

const languages = [
    {
        label: 'Dutch',
        value: 'dutch'
    },
    {
        label: 'English',
        value: 'english'
    },
    {
        label: 'Finnish',
        value: 'finnish'
    },
    {
        label: 'French',
        value: 'french'
    },
    {
        label: 'German',
        value: 'german'
    },
    {
        label: 'Danish',
        value: 'danish'
    },
    {
        label: 'Italian',
        value: 'italian'
    },
    {
        label: 'Japanese',
        value: 'japanese'
    },
    {
        label: 'Korean',
        value: 'korean'
    },
    {
        label: 'Portuguese',
        value: 'portuguese'
    }
];

export default class FilterMenuGroupButtonIcons extends LightningElement {
    iconsMenus = [
        {
            name: 'contact',
            accessKey: 'k',
            alternativeText: 'Open contact type filter',
            items: contact,
            iconName: 'utility:call',
            tooltip: 'Type of contact',
            value: ['email', 'meeting']
        },
        {
            name: 'prices',
            disabled: true,
            items: prices,
            iconName: 'utility:currency',
            dropdownWidth: 'large',
            droddownNubbin: true,
            hideSelectedItems: true
        },
        {
            name: 'editions',
            items: editions,
            iconName: 'utility:knowledge_base',
            buttonVariant: 'bare',
            showSearchBox: true,
            dropdownLength: '5-items'
        },
        {
            name: 'ratings',
            iconName: 'utility:favorite',
            isLoading: true,
            loadingStateAlternativeText: 'Waiting for the items to load...'
        },
        {
            name: 'languages',
            iconName: 'utility:world',
            items: languages,
            dropdownLength: '10-items'
        }
    ];
}

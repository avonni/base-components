import { LightningElement } from 'lwc';

const CONTACT = [
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

const EDITIONS = [
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

const LANGUAGES = [
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

const MENUS = [
    {
        name: 'contact',
        label: 'Type',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        typeAttributes: {
            items: CONTACT,
            dropdownWidth: 'large',
            droddownNubbin: true
        },
        tooltip: 'Type of contact',
        buttonVariant: 'brand'
    },
    {
        name: 'price',
        label: 'Price',
        type: 'range',
        typeAttributes: {
            showPin: true,
            unit: 'currency',
            unitAttributes: {
                currencyCode: 'CAD'
            }
        }
    },
    {
        name: 'editions',
        label: 'Editions',
        typeAttributes: {
            items: EDITIONS,
            allowSearch: true,
            isMultiSelect: true
        }
    },
    {
        name: 'languages',
        label: 'Languages',
        typeAttributes: {
            isMultiSelect: true,
            items: LANGUAGES,
            dropdownLength: '5-items'
        }
    },
    {
        name: 'publication',
        label: 'Publication',
        type: 'date-range',
        typeAttributes: {
            type: 'datetime'
        }
    }
];

export default class FilterMenuGroupVertical extends LightningElement {
    menus = MENUS;
}

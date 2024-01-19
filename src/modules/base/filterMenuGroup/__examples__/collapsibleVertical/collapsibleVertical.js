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
        collapsible: true,
        typeAttributes: {
            items: CONTACT,
            dropdownWidth: 'large',
            droddownNubbin: true
        },
        tooltip: 'Type of contact'
    },
    {
        name: 'price',
        label: 'Price',
        type: 'range',
        collapsible: true,
        typeAttributes: {
            showPin: true,
            unit: 'currency',
            unitAttributes: {
                currencyCode: 'CAD'
            }
        }
    },

    {
        name: 'languages',
        label: 'Languages',
        collapsible: true,
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
        collapsible: true,
        typeAttributes: {
            type: 'datetime'
        }
    },
    {
        name: 'editions',
        label: 'Editions',
        collapsible: true,
        typeAttributes: {
            items: EDITIONS,
            allowSearch: true,
            isMultiSelect: true
        }
    }
];

export default class FilterMenuGroupCollapsibleVertical extends LightningElement {
    menus = MENUS;
}

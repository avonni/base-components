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

const MENUS = [
    {
        name: 'contact',
        iconName: 'utility:call',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        typeAttributes: {
            items: contact,
            dropdownWidth: 'large',
            droddownNubbin: true
        },
        tooltip: 'Type of contact',
        buttonVariant: 'bare'
    },
    {
        name: 'price',
        label: 'Price',
        iconName: 'utility:currency',
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
        disabled: true,
        label: 'Editions',
        iconName: 'utility:knowledge_base',
        typeAttributes: {
            items: editions,
            allowSearch: true,
            isMultiSelect: true
        }
    },
    {
        name: 'languages',
        label: 'Languages',
        iconName: 'utility:world',
        typeAttributes: {
            enableInfiniteLoading: true,
            dropdownLength: '5-items',
            isMultiSelect: true
        }
    },
    {
        name: 'publication',
        label: 'Publication',
        iconName: 'utility:date_input',
        type: 'date-range',
        typeAttributes: {
            type: 'datetime'
        }
    }
];
const VALUE = {
    editions: ['professional', 'enterprise'],
    contact: 'other',
    publication: ['2019-01-01T00:00:00.000Z', '2019-01-31T13:40:00.000Z']
};
export { MENUS, VALUE };

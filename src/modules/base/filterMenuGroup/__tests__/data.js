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
        buttonVariant: 'bare',
        iconName: 'utility:call',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        closed: false,
        collapsible: false,
        disabled: false,
        dropdownAlignment: 'left',
        iconSize: 'medium',
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
        type: 'list',
        typeAttributes: {
            items: contact,
            dropdownWidth: 'large',
            droddownNubbin: true
        },
        tooltip: 'Type of contact'
    },
    {
        name: 'price',
        alternativeText: 'Show menu',
        buttonVariant: 'border',
        label: 'Price',
        iconName: 'utility:currency',
        type: 'range',
        closed: false,
        collapsible: false,
        disabled: false,
        dropdownAlignment: 'left',
        iconSize: 'medium',
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
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
        alternativeText: 'Show menu',
        buttonVariant: 'border',
        disabled: true,
        label: 'Editions',
        iconName: 'utility:knowledge_base',
        closed: false,
        collapsible: false,
        dropdownAlignment: 'left',
        iconSize: 'medium',
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
        type: 'list',
        typeAttributes: {
            items: editions,
            allowSearch: true,
            isMultiSelect: true
        }
    },
    {
        name: 'languages',
        label: 'Languages',
        alternativeText: 'Show menu',
        buttonVariant: 'border',
        iconName: 'utility:world',
        closed: false,
        collapsible: false,
        disabled: false,
        dropdownAlignment: 'left',
        iconSize: 'medium',
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
        type: 'list',
        typeAttributes: {
            enableInfiniteLoading: true,
            dropdownLength: '5-items',
            isMultiSelect: true
        }
    },
    {
        name: 'publication',
        label: 'Publication',
        alternativeText: 'Show menu',
        buttonVariant: 'border',
        iconName: 'utility:date_input',
        type: 'date-range',
        closed: false,
        collapsible: false,
        disabled: false,
        dropdownAlignment: 'left',
        iconSize: 'medium',
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
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

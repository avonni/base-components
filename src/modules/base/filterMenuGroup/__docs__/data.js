

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
        label: 'Type',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        typeAttributes: {
            items: contact,
            dropdownWidth: 'large',
            droddownNubbin: true
        },
        tooltip: 'Type of contact'
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
        name: 'languages',
        label: 'Languages',
        typeAttributes: {
            isMultiSelect: true,
            items: languages,
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
    },
    {
        name: 'editions',
        label: 'Editions',
        typeAttributes: {
            items: editions,
            allowSearch: true,
            isMultiSelect: true
        }
    }
];

const ICONS_MENUS = [
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
        tooltip: 'Type of contact'
    },
    {
        name: 'price',
        disabled: true,
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

const COLLAPSIBLE_MENUS = [
    {
        name: 'contact',
        label: 'Type',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        collapsible: true,
        typeAttributes: {
            items: contact,
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
            items: languages,
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
            items: editions,
            allowSearch: true,
            isMultiSelect: true
        }
    }
];

export { COLLAPSIBLE_MENUS, MENUS, ICONS_MENUS };

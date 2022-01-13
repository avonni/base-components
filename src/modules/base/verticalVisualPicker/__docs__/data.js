export const items = [
    {
        title: 'Item Text',
        description:
            'Some optional item description to help the user better understand what this option is about.',
        value: 'item-1'
    },
    {
        title: 'Item Text',
        description:
            'Some optional item description to help the user better understand what this option is about.',
        value: 'item-2'
    },
    {
        title: 'Item Text',
        description:
            'Some optional item description to help the user better understand what this option is about.',
        value: 'item-3'
    }
];

export const itemsWithIcons = [
    {
        title: 'Lightning Professional',
        description: 'Complete service CRM for teams of any size.',
        value: 'lightning-professional',
        iconName: 'standard:user'
    },
    {
        title: 'Lightning Enterprise',
        description: 'Everything you need to take support to the next level.',
        value: 'lightning-enterprise',
        iconName: 'standard:groups'
    },
    {
        title: 'Lightning Enterprise Plus',
        description: 'Example of a disabled tile.',
        value: 'lightning-enterprise-plus',
        disabled: true,
        iconName: 'standard:account'
    },
    {
        title: 'Lightning Unlimited',
        description: 'Complete support with enterprise-grade customization.',
        value: 'lightning-unlimited',
        iconName: 'custom:custom68'
    }
];

export const itemsWithoutIcon = [
    {
        title: 'Lightning Professional',
        description: 'Complete service CRM for teams of any size.',
        value: 'lightning-professional'
    },
    {
        title: 'Lightning Enterprise',
        description: 'Everything you need to take support to the next level.',
        value: 'lightning-enterprise'
    },
    {
        title: 'Lightning Enterprise Plus',
        description: 'Example of a disabled tile.',
        value: 'lightning-enterprise-plus',
        disabled: true
    },
    {
        title: 'Lightning Unlimited',
        description: 'Complete support with enterprise-grade customization.',
        value: 'lightning-unlimited'
    }
];

export const itemsWithImages = [
    {
        title: 'Sales Cloud',
        description: 'Grow accounts, find customers, and close deals faster.',
        value: 'sales-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/sales-day.svg'
    },
    {
        title: 'Service Cloud',
        description:
            'Deliver smarter, more personalised support anywhere across the platform with Service Cloud.',
        value: 'service-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/service-day.svg'
    },
    {
        title: 'Marketing Cloud',
        description:
            'Meet the unified marketing platform to know consumers, engage them, and personalise their experience across everything.',
        value: 'marketing-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/commerce-day.svg'
    },
    {
        title: 'Einstein Analytics',
        description:
            'Turn the tide of your business with insights that boost growth and productivity.',
        value: 'einstein-analytics',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/tableau-day.svg'
    },
    {
        title: 'Lightning Platform',
        description:
            "Extend the power of the world's #1 CRM with apps built on the Salesforce Platform.",
        value: 'lightning-platform',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/platform-day.svg'
    },
    {
        title: 'Integration Cloud',
        description:
            "Make your business more agile by connecting all your systems to the world's #1 CRM.",
        value: 'integration-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/integration-day.svg'
    }
];

export const itemsWithImagesRight = [
    {
        title: 'Sales Cloud',
        description: 'Grow accounts, find customers, and close deals faster.',
        value: 'sales-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/sales-day.svg',
        imgPosition: 'right'
    },
    {
        title: 'Service Cloud',
        description:
            'Deliver smarter, more personalised support anywhere across the platform with Service Cloud.',
        value: 'service-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/service-day.svg',
        imgPosition: 'right'
    },
    {
        title: 'Marketing Cloud',
        description:
            'Meet the unified marketing platform to know consumers, engage them, and personalise their experience across everything.',
        value: 'marketing-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/commerce-day.svg',
        imgPosition: 'right'
    },
    {
        title: 'Einstein Analytics',
        description:
            'Turn the tide of your business with insights that boost growth and productivity.',
        value: 'einstein-analytics',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/tableau-day.svg',
        imgPosition: 'right'
    },
    {
        title: 'Lightning Platform',
        description:
            "Extend the power of the world's #1 CRM with apps built on the Salesforce Platform.",
        value: 'lightning-platform',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/platform-day.svg',
        imgPosition: 'right'
    },
    {
        title: 'Integration Cloud',
        description:
            "Make your business more agile by connecting all your systems to the world's #1 CRM.",
        value: 'integration-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/integration-day.svg',
        imgPosition: 'right'
    }
];

export const itemsWithImagesAndTags = [
    {
        title: 'Sales Cloud',
        description: 'Grow accounts, find customers, and close deals faster.',
        value: 'sales-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/sales-day.svg',
        tags: [
            {
                label: 'sales',
                variant: 'offline'
            },
            {
                label: 'cloud'
            }
        ]
    },
    {
        title: 'Service Cloud',
        description:
            'Deliver smarter, more personalised support anywhere across the platform with Service Cloud.',
        value: 'service-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/service-day.svg',
        tags: [
            {
                label: 'service',
                variant: 'error'
            },
            {
                label: 'cloud'
            }
        ]
    },
    {
        title: 'Marketing Cloud',
        description:
            'Meet the unified marketing platform to know consumers, engage them, and personalise their experience across everything.',
        value: 'marketing-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/commerce-day.svg',
        tags: [
            {
                label: 'marketing',
                variant: 'success'
            },
            {
                label: 'cloud'
            }
        ]
    },
    {
        title: 'Einstein Analytics',
        description:
            'Turn the tide of your business with insights that boost growth and productivity.',
        value: 'einstein-analytics',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/tableau-day.svg',
        tags: [
            {
                label: 'analytics',
                variant: 'warning'
            }
        ]
    },
    {
        title: 'Lightning Platform',
        description:
            "Extend the power of the world's #1 CRM with apps built on the Salesforce Platform.",
        value: 'lightning-platform',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/platform-day.svg',
        tags: [
            {
                label: 'platform',
                variant: 'inverse'
            }
        ]
    },
    {
        title: 'Integration Cloud',
        description:
            "Make your business more agile by connecting all your systems to the world's #1 CRM.",
        value: 'integration-cloud',
        imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/integration-day.svg',
        tags: [
            {
                label: 'CRM',
                variant: 'brand'
            },
            {
                label: 'cloud'
            }
        ]
    }
];

export const baseItems = [
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
        avatar: {
            alternativeText: 'Icon',
            iconName: 'standard:user'
        }
    },
    {
        title: 'Lightning Enterprise',
        description: 'Everything you need to take support to the next level.',
        value: 'lightning-enterprise',
        avatar: {
            alternativeText: 'Icon',
            iconName: 'standard:groups'
        }
    },
    {
        title: 'Lightning Enterprise Plus',
        description: 'Example of a disabled tile.',
        value: 'lightning-enterprise-plus',
        disabled: true,
        avatar: {
            alternativeText: 'Icon',
            iconName: 'standard:account'
        }
    },
    {
        title: 'Lightning Unlimited',
        description: 'Complete support with enterprise-grade customization.',
        value: 'lightning-unlimited',
        avatar: {
            alternativeText: 'Icon',
            iconName: 'custom:custom68'
        }
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
        mediaPosition: 'right',
        value: 'sales-cloud',
        avatar: {
            imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/sales-day.svg'
        }
    },
    {
        title: 'Service Cloud',
        description:
            'Deliver smarter, more personalised support anywhere across the platform with Service Cloud.',
        mediaPosition: 'right',
        value: 'service-cloud',
        avatar: {
            imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/service-day.svg'
        }
    },
    {
        title: 'Marketing Cloud',
        description:
            'Meet the unified marketing platform to know consumers, engage them, and personalise their experience across everything.',
        mediaPosition: 'right',
        value: 'marketing-cloud',
        avatar: {
            imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/commerce-day.svg'
        }
    },
    {
        title: 'Einstein Analytics',
        description:
            'Turn the tide of your business with insights that boost growth and productivity.',
        mediaPosition: 'right',
        value: 'einstein-analytics',
        avatar: {
            imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/tableau-day.svg'
        }
    },
    {
        title: 'Lightning Platform',
        description:
            "Extend the power of the world's #1 CRM with apps built on the Salesforce Platform.",
        mediaPosition: 'right',
        value: 'lightning-platform',
        avatar: {
            imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/platform-day.svg'
        }
    },
    {
        title: 'Integration Cloud',
        description:
            "Make your business more agile by connecting all your systems to the world's #1 CRM.",
        mediaPosition: 'right',
        value: 'integration-cloud',
        avatar: {
            imgSrc: 'https://s23.q4cdn.com/574569502/files/images/products/integration-day.svg'
        }
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

export const employerTags = [
    {
        title: 'Garret Jones',
        description: 'VP, Human Resources',
        avatar: {
            variant: 'circle',
            imgSrc: 'https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/2.jpg',
            presence: 'online',
            size: 'x-large'
        },
        tags: [
            {
                label: 'Attending',
                variant: 'success'
            }
        ],
        value: 'garret-jones'
    },
    {
        title: 'Heather Johnson',
        description: 'VP, Finance',
        avatar: {
            variant: 'circle',
            initials: 'HJ',
            iconName: 'standard:user',
            presence: 'online',
            size: 'x-large'
        },
        tags: [
            {
                label: 'Not Attending',
                variant: 'error'
            }
        ],
        value: 'heather-johnson'
    },
    {
        title: 'Richard Matthews',
        description: 'Director of Sales Operations',
        avatar: {
            variant: 'circle',
            imgSrc: 'https://i0.wp.com/www.commercialphotographynorthwestblog.co.uk/wp-content/uploads/2018/04/Linkedin-headshot-0005.jpg?resize=1024%2C1024&ssl=1',
            presence: 'offline',
            size: 'x-large'
        },
        tags: [
            {
                label: 'Invited'
            }
        ],
        value: 'richard-matthews'
    },
    {
        title: 'Michaela Davidson',
        description: 'HR Services Lead',
        avatar: {
            variant: 'circle',
            imgSrc: 'https://source.unsplash.com/nwdPxI1h4NQ/100x100',
            presence: 'away',
            size: 'x-large'
        },
        tags: [
            {
                label: 'Attending',
                variant: 'success'
            }
        ],
        value: 'michaela-davidson'
    },
    {
        title: 'Roger Reese',
        description: 'Senior Vice President',
        avatar: {
            variant: 'circle',
            imgSrc: 'https://linkedinriches.com/wp-content/uploads/2013/12/Nemo-Headshot-2.jpg',
            presence: 'online',
            size: 'x-large'
        },
        tags: [
            {
                label: 'Attending',
                variant: 'success'
            }
        ],
        value: 'roger-reese'
    }
];

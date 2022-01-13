import { LightningElement } from 'lwc';

export default class VerticalVisualPickerResponsiveWithImagesAndTags extends LightningElement {
    items = [
        {
            title: 'Sales Cloud',
            description:
                'Grow accounts, find customers, and close deals faster.',
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
}

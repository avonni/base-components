import { LightningElement } from 'lwc';

export default class VerticalVisualPickerLargeWithImages extends LightningElement {
    value = ['sales-cloud', 'einstein-analytics'];

    items = [
        {
            title: 'Sales Cloud',
            description:
                'Grow accounts, find customers, and close deals faster.',
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
}

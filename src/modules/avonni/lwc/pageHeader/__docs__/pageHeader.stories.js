import { PageHeader } from '../__examples__/pageHeader';

export default {
    title: 'Example/Page Header',
    argTypes: {
        iconName: {
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header before the title.",
            table: {
                type: { summary: 'String' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'The label can include text. To include additional markup or another component, use the label slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text. To include additional markup or another component, use the title slot.The title can include text. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        info: {
            control: {
                type: 'text'
            },
            description:
                'The info can include text. To include additional markup or another component, use the info slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'object-home',
                    'record-home',
                    'record-home vertical'
                ]
            },
            defaultValue: 'base',
            description:
                'The type of component. Valid values include base, object-home, record-home and record-home vertical',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'String' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description:
                'The type of component. Valid values include base, object-home, record-home and related-list',
            table: {
                type: { summary: 'Object []' }
            }
        }
    }
};

const items = [
    {
        label: 'Currency',
        value: 70,
        type: 'currency',
        typeAttributes: {
            currencyCode: 'EUR'
        }
    },
    {
        label: 'Email',
        value: 'Avonni@Avonni.com',
        type: 'email'
    },
    {
        label: 'Phone',
        value: '514-555-1234',
        type: 'phone'
    },
    {
        label: 'Date',
        value: '1547250828000',
        type: 'date',
        typeAttributes: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }
    },
    {
        label: 'Text',
        value: 'This is a text',
        type: 'text',
        typeAttributes: {
            linkify: true
        }
    },
    {
        label: 'Boolean',
        value: 'true',
        type: 'boolean'
    },
    {
        label: 'URL',
        value: 'salesforce.com',
        tooltip: 'Use full domain name',
        target: '_blank',
        type: 'url'
    },
    {
        label: 'Location',
        value: {
            latitude: '37.798460',
            longitude: '-122.3948370'
        },
        type: 'location'
    },
    {
        label: 'Percent',
        value: '0.10',
        type: 'percent'
    },
    {
        label: 'Number',
        value: '11',
        type: 'number'
    }
];

const Template = (args) => PageHeader(args);

export const Base = Template.bind({});
Base.args = {
    variant: 'record-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info',
    items: items
};

export const Vertical = Template.bind({});
Vertical.args = {
    variant: 'record-home vertical',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info',
    items: items
};

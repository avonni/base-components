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
                type: 'select'
            },
            options: [
                'base',
                'object-home',
                'record-home',
                'record-home-vertical'
            ],
            defaultValue: 'base',
            description:
                'The type of component. Valid values include base, object-home, record-home and record-home-vertical',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'String' }
            }
        },
        fields: {
            control: {
                type: 'object'
            },
            description:
                'The fields can include an object array, and is displayed in the details section. To include additional markup or another component, use the details slot.',
            table: {
                type: { summary: 'Object []' }
            }
        }
    }
};

const fields = [
    {
        label: 'Currency',
        value: 70,
        type: 'currency',
        typeAttributes: {
            currencyCode: 'EUR',
            currencyDisplayAs: 'name',
            minimumIntegerDigits: 2
        }
    },
    {
        label: 'Email',
        value: 'Avonni@Avonni.com',
        type: 'email',
        typeAttributes: {
            hideIcon: 'true'
        }
    },
    {
        label: 'Date',
        value: '10/12/1991',
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
            linkify: 'false'
        }
    },
    {
        label: 'URL',
        value: 'salesforce.com',
        type: 'url',
        typeAttributes: {
            tooltip: 'Use full domain name',
            target: '_blank'
        }
    },
    {
        label: 'Number',
        value: '11',
        type: 'number',
        typeAttributes: {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2
        }
    }
];

const Template = (args) => PageHeader(args);

export const Base = Template.bind({});
Base.args = {
    variant: 'base',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const ObjectHome = Template.bind({});
ObjectHome.args = {
    variant: 'object-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const RecordHome = Template.bind({});
RecordHome.args = {
    variant: 'record-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info',
    fields: fields
};

export const RecordHomeVertical = Template.bind({});
RecordHomeVertical.args = {
    variant: 'record-home-vertical',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info',
    fields: fields
};

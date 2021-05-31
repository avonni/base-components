import { OutputData } from '../__examples__/outputData';

export default {
    title: 'Example/Output Data',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the output data',
            table: {
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: [
                'boolean',
                'currency',
                'date',
                'date-local',
                'email',
                'location',
                'number',
                'percent',
                'phone',
                'url',
                'text'
            ],
            description: 'Data type',
            defaultValue: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'text' }
            }
        },
        typeAttributes: {
            control: {
                type: 'object'
            },
            description: 'Object of attributes specific to the type.',
            table: {
                type: { summary: 'object' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: 'Value of the output data.',
            table: {
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => OutputData(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text',
    value: 'Some text value'
};

export const DateLocal = Template.bind({});
DateLocal.args = {
    label: 'Date local',
    type: 'date-local',
    value: new Date().toISOString(),
    typeAttributes: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
};

export const Percent = Template.bind({});
Percent.args = {
    label: 'Percentage',
    type: 'percent',
    value: 0.4567,
    typeAttributes: {
        maximumFractionDigits: 1
    }
};

export const URL = Template.bind({});
URL.args = {
    label: 'URL',
    type: 'url',
    value: 'https://www.avonnicomponents.com/',
    typeAttributes: {
        label: 'Avonni components'
    }
};

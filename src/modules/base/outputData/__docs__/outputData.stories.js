

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
                'email',
                'location',
                'number',
                'percent',
                'phone',
                'url',
                'text'
            ],
            description: 'Data type',
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
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'standard',
                'label-inline',
                'label-hidden',
                'label-stacked'
            ],
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked.This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        }
    },
    args: {
        type: 'text',
        variant: 'standard'
    }
};

const Template = (args) => OutputData(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text',
    value: 'Some text value'
};

export const DateTime = Template.bind({});
DateTime.args = {
    label: 'Date',
    type: 'date',
    value: new Date().toISOString(),
    typeAttributes: {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
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

export const LabelInline = Template.bind({});
LabelInline.args = {
    label: 'Text with Inline Label',
    value: 'Some text value',
    variant: 'label-inline'
};

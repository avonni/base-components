import { ProgressBar } from '../__examples__/progressBar';

export default {
    title: 'Example/Progress Bar',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large', 'full']
            },
            defaultValue: 'full',
            description:
                'The size of the progress bar. Valid values are x-small, small, medium, large and full. The default value is medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'full' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            defaultValue: 0,
            description: 'The percentage value of the progress bar.',
            table: {
                type: { summary: 'number', detail: 'From 0 to 100' },
                defaultValue: { summary: '0' },
                category: 'Value'
            }
        },
        showValue: {
            name: 'show-value',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, display the value.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Value'
            }
        },
        valuePosition: {
            name: 'value-position',
            control: {
                type: 'select',
                options: [
                    'left',
                    'right',
                    'top-right',
                    'top-left',
                    'bottom-right',
                    'bottom-left'
                ]
            },
            defaultValue: 'top-right',
            description:
                'Valid values include left, right, top-right, top-left, bottom-right and bottom-left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top-right' },
                category: 'Value'
            }
        },
        valueLabel: {
            name: 'value-label',
            control: {
                type: 'text'
            },
            description:
                'Text display next to the value. <br> Example: 25% Complete',
            table: {
                type: { summary: 'string' },
                category: 'Value'
            }
        },
        referenceLines: {
            control: {
                type: 'object'
            },
            description:
                'Field: <ul><li>label: string</li> <li>value: number</li> <li>variant: string (default, darker, lightest, success, warning, error)</li> <li>borderStyle: string (none, solid, dashed, dotted)</li>',
            table: {
                type: { summary: 'object[]' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'circular']
            },
            defaultValue: 'base',
            description:
                'The variant changes the appearance of the progress bar. Accepted variants include base or circular. This value defaults to base.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        theme: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'success',
                    'inverse',
                    'alt-inverse',
                    'warning',
                    'info',
                    'error',
                    'offline'
                ]
            },
            defaultValue: 'base',
            description:
                'Valid values includes base, success, inverse, alt-inverse, warning, info, error and offline.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        textured: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true display a texture background.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        thickness: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            description:
                'Set progress bar thickness. Valid values include x-small, small, medium and large',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        orientation: {
            control: {
                type: 'select',
                options: ['horizontal', 'vertical']
            },
            defaultValue: 'horizontal',
            description:
                'Orientation of the progress bar to be used. Valid values include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    }
};

const oneReferenceLine = [
    {
        label: 'Avg',
        value: 90,
        variant: 'darker',
        borderStyle: 'dashed'
    }
];

const multipleReferenceLines = [
    {
        label: '1st',
        value: 10,
        variant: 'darker',
        borderStyle: 'dashed'
    },
    {
        label: '2nd',
        value: 15,
        variant: 'lightest',
        borderStyle: 'dotted'
    },
    {
        label: '3rd',
        value: 53,
        variant: 'warning',
        borderStyle: 'solid'
    },
    {
        label: '4th',
        value: 87,
        variant: 'success',
        borderStyle: 'none'
    }
];

const Template = (args) => ProgressBar(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    value: 45,
    referenceLines: oneReferenceLine
};

export const Vertical = Template.bind({});
Vertical.args = {
    label: 'Vertical progress bar',
    value: 45,
    orientation: 'vertical',
    referenceLines: oneReferenceLine
};

export const MultipleReferenceLines = Template.bind({});
MultipleReferenceLines.args = {
    label: 'Progress bar with multiple reference lines',
    value: 45,
    referenceLines: multipleReferenceLines
};

export const ThickWarningTheme = Template.bind({});
ThickWarningTheme.args = {
    label: 'Thick circular progress bar with warning theme',
    value: 87,
    referenceLines: oneReferenceLine,
    theme: 'warning',
    thickness: 'large',
    variant: 'circular'
};

export const TexturedVisibleValue = Template.bind({});
TexturedVisibleValue.args = {
    label: 'Textured progress bar with visible value',
    value: 24,
    referenceLines: oneReferenceLine,
    valueLabel: 'Value label',
    showValue: true,
    textured: true
};

export const ExtraSmallVertical = Template.bind({});
ExtraSmallVertical.args = {
    label: 'Extra small and thin vertical progress bar',
    value: 63,
    referenceLines: oneReferenceLine,
    valueLabel: 'Value label',
    valuePosition: 'bottom-right',
    showValue: true,
    size: 'x-small',
    orientation: 'vertical',
    thickness: 'x-small'
};

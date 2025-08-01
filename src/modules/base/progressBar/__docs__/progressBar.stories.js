import { ProgressBar } from '../__examples__/progressBar';

export default {
    title: 'Example/Progress Bar',
    argTypes: {
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text for the progress bar.',
            table: {
                type: { summary: 'string' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the progress bar is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Label for the progress bar.',
            table: {
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the progress bar is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' }
            }
        },
        orientation: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description:
                'Orientation of the progress bar to be used. Valid values include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        },
        pinAttributes: {
            name: 'pin-attributes',
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the pin.',
            table: {
                type: { summary: 'object' },
                category: 'Value'
            }
        },
        referenceLines: {
            control: {
                type: 'object'
            },
            description:
                'Field: <ul><li>label: string</li> <li>value: number</li> <li>variant: string (default, inverse, lightest, success, warning, error)</li> <li>borderStyle: string (none, solid, dashed, dotted)</li></ul>',
            table: {
                type: { summary: 'object[]' }
            }
        },
        showPin: {
            name: 'show-pin',
            control: {
                type: 'boolean'
            },
            description: 'If present, display the pin.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Value'
            }
        },
        showValue: {
            name: 'show-value',
            control: {
                type: 'boolean'
            },
            description: 'If present, display the value.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Value'
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'full'],
            description:
                'The size of the progress bar. Valid values are x-small, small, medium, large and full. The default value is medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'full' }
            }
        },
        textured: {
            control: {
                type: 'boolean'
            },
            description: 'If present, display a texture background.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        theme: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'success',
                'inverse',
                'alt-inverse',
                'warning',
                'info',
                'error',
                'offline'
            ],
            description:
                'Defines the theme of the progress bar. Valid values includes base, success, inverse, alt-inverse, warning, info, error and offline.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        thickness: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large'],
            description:
                'Set progress bar thickness. Valid values include x-small, small, medium and large',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            description: 'The percentage value of the progress bar.',
            table: {
                type: { summary: 'number', detail: 'From 0 to 100' },
                defaultValue: { summary: '0' },
                category: 'Value'
            }
        },
        valuePosition: {
            name: 'value-position',
            control: {
                type: 'select'
            },
            options: [
                'left',
                'right',
                'top-right',
                'top-left',
                'bottom-right',
                'bottom-left'
            ],
            description:
                'Position of the value if present. Valid values include left, right, top-right, top-left, bottom-right and bottom-left.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top-right' },
                category: 'Value'
            }
        },
        valuePrefix: {
            name: 'value-prefix',
            control: {
                type: 'text'
            },
            description:
                'Text display before the value. <br> Example: Progress 25%',
            table: {
                type: { summary: 'string' },
                category: 'Value'
            }
        },
        valueSuffix: {
            name: 'value-suffix',
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
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'circular'],
            description:
                'The variant changes the appearance of the progress bar. Accepted variants include base or circular. This value defaults to base.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        }
    },
    args: {
        isLoading: false,
        loadingStateAlternativeText: 'Loading...',
        orientation: 'horizontal',
        showPin: false,
        showValue: false,
        size: 'full',
        textured: false,
        theme: 'base',
        thickness: 'medium',
        value: 0,
        valuePosition: 'top-right',
        variant: 'base'
    }
};

const oneReferenceLine = [
    {
        label: 'Avg',
        value: 90,
        variant: 'inverse',
        borderStyle: 'dashed'
    }
];

const multipleReferenceLines = [
    {
        label: '1st',
        value: 10,
        variant: 'inverse',
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
    referenceLines: oneReferenceLine,
    size: 'large'
};

export const ShowPinValue = Template.bind({});
ShowPinValue.args = {
    label: 'Label',
    value: 45,
    referenceLines: oneReferenceLine,
    showValue: true,
    showPin: true,
    pinAttributes: {
        type: 'circle'
    }
};

export const VerticalShowPinValue = Template.bind({});
VerticalShowPinValue.args = {
    label: 'Vertical progress bar',
    value: 45,
    orientation: 'vertical',
    referenceLines: oneReferenceLine,
    size: 'large',
    showValue: true,
    showPin: true,
    pinAttributes: {
        type: 'rectangle',
        position: 'right'
    }
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
    valuePrefix: 'Progress:',
    valueSuffix: 'completed',
    showValue: true,
    textured: true
};

export const ExtraSmallVertical = Template.bind({});
ExtraSmallVertical.args = {
    label: 'Extra small and thin vertical progress bar',
    value: 63,
    referenceLines: oneReferenceLine,
    valuePrefix: 'Progress:',
    valueSuffix: 'completed',
    valuePosition: 'bottom-right',
    showValue: true,
    size: 'x-small',
    orientation: 'vertical',
    thickness: 'x-small'
};

import { VisualPicker } from '../__examples__/visualPicker';

export default {
    title: 'Example/VisualPicker',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Optional message to be displayed when no checkbox is selected and the required attribute is set.',
            table: {
                type: { summary: 'string' },
                category: 'Validations'
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['coverable', 'non-coverable', 'vertical'],
            defaultValue: 'non-coverable',
            description:
                'Allowed values are coverable, non-coverable and vertical.',
            table: {
                defaultValue: { summary: 'non-coverable' },
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['radio', 'checkbox'],
            defaultValue: 'radio',
            description: 'Allowed values are radio and checkbox.',
            table: {
                defaultValue: { summary: 'radio' },
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'Allowed values are xx-small (4rem x 4 rem), x-small (6rem x 6 rem), small (8rem x 8rem), medium and large.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        ratio: {
            control: {
                type: 'select'
            },
            options: ['1-by-1', '4-by-3', '16-by-9'],
            defaultValue: '1-by-1',
            description: 'Values include 1-by-1, 4-by-3 and 16-by-9.',
            table: {
                defaultValue: { summary: '1-by-1' },
                type: { summary: 'string' }
            }
        },
        hideCheckMark: {
            name: 'hide-check-mark',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If true, hide the check mark.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideBorder: {
            name: 'hide-border',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If true, hide the border and box-shadow on item picker. Still displayed border on hover.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, the visual picker is disabled.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validations'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, at least one item must be selected.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validations'
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description:
                'Value of the selected item. For the checkbox type, the value is an array (Ex: [value1, value2])',
            table: {
                type: { summary: 'string or string[]' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description: '',
            table: {
                type: { summary: 'object' }
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'The name of the visual picker.',
            type: { required: true },
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        hideCheckMark: false,
        hideBorder: false,
        disabled: false,
        required: false
    }
};

const items = [
    {
        title: 'Lightning Professional',
        description: 'Complete service CRM for teams of any size',
        value: 'lightning-professional',
        figure: {
            title: '$30',
            description: 'USD/user/month *',
            iconName: 'standard:user',
            imgSrc: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
        }
    },
    {
        title: 'Lightning Enterprise',
        description: 'Everything you need to take support to the next level',
        value: 'lightning-enterprise',
        figure: {
            title: '$150',
            description: 'USD/user/month *',
            iconName: 'standard:groups',
            imgSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        }
    },
    {
        title: 'Lightning Enterprise Plus',
        description: 'Example of a disabled tile',
        value: 'lightning-enterprise-plus',
        disabled: true,
        figure: {
            title: '$220',
            description: 'USD/user/month *',
            iconName: 'standard:account',
            imgSrc: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'

        }
    },
    {
        title: 'Lightning Unlimited',
        description: 'Complete support with enterprise-grade customization',
        value: 'lightning-unlimited',
        figure: {
            title: '$300',
            description: 'USD/user/month *',
            iconName: 'custom:custom68'
        }
    }
];

const Template = (args) => VisualPicker(args);

export const Base = Template.bind({});
Base.args = {
    name: 'base',
    value: ['lightning-enterprise'],
    items: items
};

export const NoMarkDoubleExtraSmall = Template.bind({});
NoMarkDoubleExtraSmall.args = {
    name: 'xx-small',
    label: 'Double extra small input with no check mark',
    value: ['lightning-enterprise'],
    items: items,
    size: 'xx-small',
    hideCheckMark: true
};

export const NoBorderExtraSmall = Template.bind({});
NoBorderExtraSmall.args = {
    name: 'x-small',
    label: 'Extra small input with no borders',
    value: ['lightning-enterprise'],
    items: items,
    size: 'x-small',
    hideBorder: true
};

export const CoverableSmall = Template.bind({});
CoverableSmall.args = {
    name: 'small',
    label: 'Coverable small input',
    value: ['lightning-enterprise'],
    items: items,
    size: 'small',
    variant: 'coverable'
};

export const Large4By3 = Template.bind({});
Large4By3.args = {
    name: 'large',
    label: '4 by 3 large input',
    value: ['lightning-enterprise'],
    items: items,
    size: 'large',
    ratio: '4-by-3'
};

export const VerticalCheckbox = Template.bind({});
VerticalCheckbox.args = {
    name: 'checkbox',
    type: 'checkbox',
    label: 'Vertical checkbox input',
    value: ['lightning-enterprise', 'lightning-unlimited'],
    items: items,
    variant: 'vertical'
};

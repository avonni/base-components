import { VisualPicker } from '../__examples__/visualPicker';

export default {
    title: 'Example/VisualPicker',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        messageWhenValueMissing: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['coverable', 'non-coverable', 'vertical']
            },
            defaultValue: 'non-coverable',
            table: {
                defaultValue: { summary: 'non-coverable' }
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['radio', 'checkbox']
            },
            defaultValue: 'radio',
            table: {
                defaultValue: { summary: 'radio' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        ratio: {
            control: {
                type: 'select',
                options: ['1-by-1', '4-by-3', '16-by-9']
            },
            defaultValue: '1-by-1',
            table: {
                defaultValue: { summary: '1-by-1' }
            }
        },
        hideCheckMark: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        hideBorder: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        value: {
            control: {
                type: 'object'
            }
        },
        items: {
            control: {
                type: 'object'
            }
        }
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
            iconName: 'standard:apps'
        }
    },
    {
        title: 'Lightning Enterprise',
        description: 'Everything you need to take support to the next level',
        value: 'lightning-enterprise',
        figure: {
            title: '$150',
            description: 'USD/user/month *',
            iconName: 'utility:animal_and_nature'
        }
    },
    {
        title: 'Lightning Enterprise Plus',
        description: 'Everything you need to take support to the next level',
        value: 'lightning-enterprise-plus',
        figure: {
            title: '$220',
            description: 'USD/user/month *',
            iconName: 'standard:coaching'
        }
    }
];

const Template = (args) => VisualPicker(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    messageWhenValueMissing: 'Value missing',
    value: ['lightning-enterprise'],
    items: items
};

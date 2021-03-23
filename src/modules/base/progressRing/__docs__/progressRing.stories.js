import { ProgressRing } from '../__examples__/progressRing';

export default {
    title: 'Example/Progress Ring',
    argTypes: {
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            description:
                'The percentage value of the progress ring. The value must be a number from 0 to 100. A value of 50 corresponds to a color fill of half the ring in a clockwise or counterclockwise direction, depending on the direction attribute.',
            defaultValue: 0,
            table: {
                type: { summary: 'number', detail: 'From 0 to 100' },
                defaultValue: { summary: '0' }
            }
        },
        direction: {
            control: {
                type: 'select',
                options: ['fill', 'drain']
            },
            description:
                'Controls which way the color flows from the top of the ring, either clockwise or counterclockwise Valid values include fill and drain. The fill value corresponds to a color flow in the clockwise direction. The drain value indicates a color flow in the counterclockwise direction.',
            defaultValue: 'fill',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'fill' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['medium', 'large']
            },
            description:
                'The size of the progress ring. Valid values include medium and large.',
            defaultValue: 'medium',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'active-step',
                    'warning',
                    'expired',
                    'base-autocomplete'
                ]
            },
            description:
                'Changes the appearance of the progress ring. Accepted variants include base, active-step, warning, expired, base-autocomplete.',
            defaultValue: 'base',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'base' }
            }
        },
        hideIcon: {
            name: 'hide-icon',
            control: {
                type: 'boolean'
            },
            description:
                'If true and the variant is equal to warning, base-autocomplete or expired, hide the icon in the progress ring content',
            defaultValue: 0,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => ProgressRing(args);

export const Base = Template.bind({});
Base.args = {
    value: 25
};

export const Large = Template.bind({});
Large.args = {
    value: 25,
    size: 'large'
};

export const ActiveStepDrain = Template.bind({});
ActiveStepDrain.args = {
    value: 25,
    variant: 'active-step',
    direction: 'drain'
};

export const Warning = Template.bind({});
Warning.args = {
    value: 45,
    variant: 'warning'
};

export const Expired = Template.bind({});
Expired.args = {
    value: 89,
    variant: 'expired'
};

export const BaseAutocomplete = Template.bind({});
BaseAutocomplete.args = {
    value: 100,
    variant: 'base-autocomplete'
};

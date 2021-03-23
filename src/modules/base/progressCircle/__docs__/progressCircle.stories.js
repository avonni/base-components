import { ProgressCircle } from '../__examples__/progressCircle';

export default {
    title: 'Example/Progress Circle',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title is displayed at the bottom of the progress circle.',
            table: {
                type: { summary: 'string' }
            }
        },
        color: {
            control: {
                type: 'color'
            },
            defaultValue: '#1589ee',
            description:
                'The color of the Progress Circle. Accepts a valid CSS color string, including hex and rgb.',
            table: {
                defaultValue: { summary: '#1589ee' },
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            description:
                'The percentage value of the progress ring. The value must be a number from 0 to 100. A value of 50 corresponds to a color fill of half the ring in a clockwise or counterclockwise direction, depending on the direction attribute.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['standard', 'value-hidden']
            },
            defaultValue: 'standard',
            description:
                'Accepted variants include standard, value-hidden.\nvalue-hidden: Hide the value in the progress circle (ex: 75%).',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        },
        direction: {
            control: {
                type: 'select',
                options: ['fill', 'drain']
            },
            defaultValue: 'fill',
            description:
                'Controls which way the color flows from the top of the ring, either clockwise or counterclockwise Valid values include fill and drain. The fill value corresponds to a color flow in the clockwise direction. The drain value indicates a color flow in the counterclockwise direction.',
            table: {
                defaultValue: { summary: 'fill' },
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large', 'x-large']
            },
            defaultValue: 'medium',
            description:
                'The size of the progress circle. Valid values include x-small (26x26px), small (52x52px), medium (104x104px), large (152x152px) and x-large (208x208px).',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        thickness: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large', 'x-large']
            },
            defaultValue: 'medium',
            description:
                'Set progress circle thickness. Valid values include x-small, small, medium, large and x-large.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => ProgressCircle(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Text title',
    value: 45
};

export const DrainDirection = Template.bind({});
DrainDirection.args = {
    title: 'Drain direction',
    value: 45,
    direction: 'drain'
};

export const NoLabelSmallValueHiddenGreen = Template.bind({});
NoLabelSmallValueHiddenGreen.args = {
    value: 45,
    variant: 'value-hidden',
    color: '#7ED321',
    size: 'small'
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
    title: 'Extra small',
    value: 45,
    size: 'x-small'
};

export const Small = Template.bind({});
Small.args = {
    title: 'Small',
    value: 45,
    size: 'small'
};

export const Large = Template.bind({});
Large.args = {
    title: 'Large',
    value: 45,
    size: 'large'
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
    title: 'Extra large',
    value: 45,
    size: 'x-large'
};

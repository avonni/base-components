

import { Confetti } from '../__examples__/confetti';

export default {
    title: 'Example/Confetti',
    argTypes: {
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'random-direction',
                'realistic',
                'fireworks',
                'snow',
                'pride'
            ],
            description:
                'The variant changes the appearance of the confetti. Accepted variants include include base, random-direction, realistic, fireworks, snow and pride.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        colors: {
            control: {
                type: 'object'
            },
            description: 'An array of color strings, in the HEX format',
            table: {
                defaultValue: {
                    summary:
                        "['#529EE0','#F0E442','#FFB03B','#E16032','#4FD2D2','#006699','#E287B2']"
                },
                type: { summary: 'string[]' }
            }
        },
        originX: {
            name: 'origin-x',
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The x position on the page, with 0 being the left edge and 1 being the right edge.',
            table: {
                defaultValue: { summary: 0.5 },
                type: { summary: 'number' }
            }
        },
        originY: {
            name: 'origin-y',
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The y position on the page, with 0 being the top edge and 1 being the bottom edge.',
            table: {
                defaultValue: { summary: 0.5 },
                type: { summary: 'number' }
            }
        }
    },
    args: {
        colors: [
            '#529EE0',
            '#F0E442',
            '#FFB03B',
            '#E16032',
            '#4FD2D2',
            '#006699',
            '#E287B2'
        ],
        originX: 0.5,
        originY: 0.5,
        variant: 'base'
    }
};

const Template = (args) => Confetti(args);

export const Base = Template.bind({});

export const RandomDirection = Template.bind({});
RandomDirection.args = {
    variant: 'random-direction'
};

export const Realistic = Template.bind({});
Realistic.args = {
    variant: 'realistic'
};

export const Fireworks = Template.bind({});
Fireworks.args = {
    variant: 'fireworks'
};

export const Snow = Template.bind({});
Snow.args = {
    colors: ['e63946', 'f1faee', 'a8dadc', '457b9d', '1d3557'],
    variant: 'snow'
};

export const Pride = Template.bind({});
Pride.args = {
    variant: 'pride'
};

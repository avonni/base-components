import { MediaObject } from '../__examples__/mediaObject';
import { InverseMediaObject } from '../__examples__/inverseMediaObject';
import { DoubleMediaObject } from '../__examples__/doubleMediaObject';

export default {
    title: 'Example/Media Object',
    argTypes: {
        verticalAlign: {
            name: 'vertical-align',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end'],
            defaultValue: 'start',
            description:
                'Determines how to align the media object items vertically in the container. The alignment options are start, center and end.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'start' }
            }
        },
        responsive: {
            control: {
                type: 'boolean'
            },
            description: 'Figure and body stack on smaller screens.',
            defaultValue: 0,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        inline: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'Aligns the figure and body to be inline-block of each other.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['medium', 'small', 'large'],
            description: 'Valid values include small, medium and large.',
            defaultValue: 'medium',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        }
    },
    args: {
        responsive: false,
        inline: false
    }
};

const BaseTemplate = (args) => MediaObject(args);
const InverseTemplate = (args) => InverseMediaObject(args);
const DoubleTemplate = (args) => DoubleMediaObject(args);

export const Base = BaseTemplate.bind({});
export const Inverse = InverseTemplate.bind({});
export const Double = DoubleTemplate.bind({});

export const CenterSmall = BaseTemplate.bind({});
CenterSmall.args = {
    verticalAlign: 'center',
    size: 'small'
};

export const EndLarge = BaseTemplate.bind({});
EndLarge.args = {
    verticalAlign: 'end',
    size: 'large'
};

export const Inline = BaseTemplate.bind({});
Inline.args = {
    inline: true
};

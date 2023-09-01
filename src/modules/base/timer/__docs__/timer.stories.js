

import { Timer } from '../__examples__/timer';
import { TimerButtons } from '../__examples__/timerButtons';

export default {
    title: 'Example/Timer',
    argTypes: {
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            name: 'value',
            control: {
                type: 'number',
                min: 0
            },
            description: 'Default value of the timer.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        duration: {
            name: 'duration',
            control: {
                type: 'number',
                min: 1
            },
            description:
                'How long a timer runs in milliseconds. There is no maximum value.',
            table: {
                defaultValue: { summary: '1000' },
                type: { summary: 'number' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'neutral',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
                'success'
            ],
            description:
                'The variant changes the appearance of the timer. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success. This value defaults to neutral.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['count-up', 'count-down'],
            description:
                'Type of the timer. Valid values include count-up and count-down.',
            table: {
                defaultValue: { summary: 'count-up' },
                type: { summary: 'string' }
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body. Options include left and right. This value defaults to left.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' }
            }
        },
        format: {
            control: {
                type: 'select'
            },
            options: [
                'hh:mm:ss',
                'mm:ss',
                'hh:mm',
                'hh',
                'mm',
                'ss',
                'ss.ms',
                'mm:ss.ms'
            ],
            description:
                'Format of the timer. Valid values include "hh:mm:ss", "mm:ss", "hh:mm", “hh”, “mm”, “ss”.',
            table: {
                defaultValue: { summary: 'hh:mm:ss' },
                type: { summary: 'string' }
            }
        },
        autoStart: {
            name: 'auto-start',
            control: {
                type: 'boolean'
            },
            description:
                'Whether the timer control automatically starts to play when the user navigates to the component.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        repeat: {
            control: {
                type: 'boolean'
            },
            description:
                'Whether a timer automatically restarts when it finishes running.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        autoStart: false,
        duration: 1000,
        format: 'hh:mm:ss',
        iconPosition: 'left',
        repeat: false,
        type: 'count-up',
        variant: 'neutral'
    }
};

const Template = (args) => Timer(args);
const TemplateWithButtons = (args) => TimerButtons(args);

export const Base = TemplateWithButtons.bind({});
Base.args = {
    duration: 10000
};

export const BrandIcon = TemplateWithButtons.bind({});
BrandIcon.args = {
    iconName: 'utility:clock',
    duration: 10000,
    variant: 'brand'
};

export const SuccessSeconds = Template.bind({});
SuccessSeconds.args = {
    duration: 10000,
    autoStart: true,
    variant: 'success',
    format: 'ss'
};

export const DestructiveCountdown = Template.bind({});
DestructiveCountdown.args = {
    type: 'count-down',
    value: 5000,
    duration: 10000,
    format: 'mm:ss',
    variant: 'destructive',
    autoStart: true
};

export const ChronoCountdown = Template.bind({});
ChronoCountdown.args = {
    type: 'count-down',
    value: 10000,
    duration: 10000,
    format: 'ss.ms',
    autoStart: true,
    repeat: true
};

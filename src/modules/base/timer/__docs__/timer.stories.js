import { Timer } from '../__examples__/timer';
import { html } from 'lit-html';

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
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            description: 'Default value of the timer.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        duration: {
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 1000,
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
            defaultValue: 'neutral',
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
            defaultValue: 'count-up',
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
            defaultValue: 'left',
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
            options: ['hh:mm:ss', 'mm:ss', 'hh:mm', 'hh', 'mm', 'ss'],
            defaultValue: 'hh:mm:ss',
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
            defaultValue: 0,
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
            defaultValue: 0,
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
        repeat: false
    }
};

const Template = (args) => {
    let component = Timer(args);

    const btnStart = document.createElement('ac-lightning-button');
    btnStart.onclick = () => component.start();
    btnStart.label = 'Start';

    const btnPause = document.createElement('ac-lightning-button');
    btnPause.onclick = () => component.pause();
    btnPause.label = 'Pause';

    const btnStop = document.createElement('ac-lightning-button');
    btnStop.onclick = () => component.stop();
    btnStop.label = 'Stop';

    const btnReset = document.createElement('ac-lightning-button');
    btnReset.onclick = () => component.reset();
    btnReset.label = 'Reset';

    return html`
        <div>${component}</div>
        <div class="slds-m-vertical_small">
            ${btnStart} ${btnPause} ${btnStop} ${btnReset}
        </div>
    `;
};

export const Base = Template.bind({});
Base.args = {
    duration: 10000
};

export const SuccessSeconds = Template.bind({});
SuccessSeconds.args = {
    duration: 10000,
    variant: 'success',
    format: 'ss'
};

export const BrandIcon = Template.bind({});
BrandIcon.args = {
    iconName: 'utility:clock',
    duration: 10000,
    variant: 'brand'
};

export const DestructiveCountdown = Template.bind({});
DestructiveCountdown.args = {
    type: 'count-down',
    value: 10,
    duration: 10000,
    format: 'mm:ss',
    variant: 'destructive',
    autoStart: true
};

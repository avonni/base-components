import { Timer } from '../__examples__/timer';
import { html } from 'lit-html';

export default {
    title: 'Example/Timer',
    argTypes: {
        iconName: {
            control: {
                type: 'text'
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' }
            }
        },
        duration: {
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: '1' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
            },
            defaultValue: 'neutral',
            table: {
                defaultValue: { summary: 'neutral' }
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['count-up', 'count-down']
            },
            defaultValue: 'count-up',
            table: {
                defaultValue: { summary: 'count-up' }
            }
        },
        iconPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        format: {
            control: {
                type: 'select',
                options: ['hh:mm:ss', 'mm:ss', 'hh:mm', 'hh', 'mm', 'ss']
            },
            defaultValue: 'hh:mm:ss',
            table: {
                defaultValue: { summary: 'hh:mm:ss' }
            }
        },
        autoStart: {
            control: {
                type: 'boolean'
            }
        },
        repeat: {
            control: {
                type: 'boolean'
            }
        }
    }
};

const Template = (args) => {
    let component = Timer(args);

    const btnStart = document.createElement('ac-lightning-button');
    btnStart.onclick = () => component.start();
    btnStart.label = "Start";

    const btnPause = document.createElement('ac-lightning-button');
    btnPause.onclick = () => component.pause();
    btnPause.label = "Pause";

    const btnStop = document.createElement('ac-lightning-button');
    btnStop.onclick = () => component.stop();
    btnStop.label = "Stop";

    const btnReset = document.createElement('ac-lightning-button');
    btnReset.onclick = () => component.reset();
    btnReset.label = "Reset";

    return html`
        <div>
            ${component}
        </div>
        <div class="slds-m-vertical_small">
            ${btnStart}
            ${btnPause}
            ${btnStop}
            ${btnReset}
        </div>
    `
};

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:clock',
    duration: 10000
};

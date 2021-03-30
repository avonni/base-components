import { Confetti } from '../__examples__/confetti';
import { html } from 'lit-html';
import Button from 'lightning/button';

customElements.define('ac-lightning-button', Button.CustomElementConstructor);

export default {
    title: 'Example/Confetti',
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'random-direction',
                    'realistic',
                    'fireworks',
                    'snow',
                    'pride'
                ]
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        colors: {
            control: {
                type: 'object'
            }
        },
        originX: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0.5,
            table: {
                defaultValue: { summary: 0.5 }
            }
        },
        originY: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0.5,
            table: {
                defaultValue: { summary: 0.5 }
            }
        }
    }
};

const Template = (args) => {
    let component = Confetti(args);

    const element = document.createElement('ac-lightning-button');
    element.onclick = () => component.fire();
    element.label = 'FIRE';

    return html` <div style="">${component} ${element}</div> `;
};

export const Base = Template.bind({});

Base.args = {
    colors: [
        '#529EE0',
        '#F0E442',
        '#FFB03B',
        '#E16032',
        '#4FD2D2',
        '#006699',
        '#E287B2'
    ]
};

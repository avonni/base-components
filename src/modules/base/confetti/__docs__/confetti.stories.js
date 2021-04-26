import { Confetti } from '../__examples__/confetti';
import { html } from 'lit-html';
import Button from 'lightning/button';

customElements.define('ac-lightning-button', Button.CustomElementConstructor);

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
            defaultValue: 'base',
            description:
                'Values include base, random-direction, realistic, fireworks, snow and pride.',
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
            defaultValue: 0.5,
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
            defaultValue: 0.5,
            table: {
                defaultValue: { summary: 0.5 },
                type: { summary: 'number' }
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

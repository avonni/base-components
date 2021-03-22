import { Qrcode } from '../__examples__/qrcode';

export default {
    title: 'Example/Qrcode',
    argTypes: {
        value: {
            control: {
                type: 'text'
            }
        },
        color: {
            control: {
                type: 'color'
            },
            defaultValue: '#000',
            table: {
                defaultValue: { summary: '#000' }
            }
        },
        background: {
            control: {
                type: 'color'
            },
            defaultValue: '#fff',
            table: {
                defaultValue: { summary: '#fff' }
            }
        },
        borderColor: {
            control: {
                type: 'color'
            }
        },
        borderWidth: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' }
            }
        },
        padding: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' }
            }
        },
        size: {
            control: {
                type: 'number',
                min: 200
            },
            defaultValue: 200,
            table: {
                defaultValue: { summary: '200' }
            }
        },
        encoding: {
            control: {
                type: 'select',
                options: ['ISO_8859_1', 'UTF_8']
            },
            defaultValue: 'ISO_8859_1',
            table: {
                defaultValue: { summary: 'ISO_8859_1' }
            }
        },
        errorCorrection: {
            control: {
                type: 'select',
                options: ['L', 'M', 'Q', 'H']
            },
            defaultValue: 'L',
            table: {
                defaultValue: { summary: 'L' }
            }
        },
        renderAs: {
            control: {
                type: 'select',
                options: ['svg', 'canvas']
            },
            defaultValue: 'svg',
            table: {
                defaultValue: { summary: 'svg' }
            }
        }
    }
};

const Template = (args) => Qrcode(args);

export const Base = Template.bind({});
Base.args = {
    value: 'https://www.avonni.app'
};

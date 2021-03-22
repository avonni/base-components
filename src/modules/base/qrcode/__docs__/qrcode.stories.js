import { Qrcode } from '../__examples__/qrcode';

export default {
    title: 'Example/Qrcode',
    argTypes: {
        value: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'The value of the QRCode.',
            table: {
                type: { summary: 'string' }
            }
        },
        color: {
            control: {
                type: 'color'
            },
            defaultValue: '#000',
            description:
                'The color of the QR code. Accepts a valid CSS color string, including hex and rgb.',
            table: {
                defaultValue: { summary: '#000' },
                type: { summary: 'string' }
            }
        },
        background: {
            control: {
                type: 'color'
            },
            description:
                'Background color of the qr-code. Accepts a valid CSS color string, including hex and rgb.',
            defaultValue: '#fff',
            table: {
                defaultValue: { summary: '#fff' },
                type: { summary: 'string' }
            }
        },
        borderColor: {
            name: 'border-color',
            control: {
                type: 'color'
            },
            description:
                'The color of the border. Accepts a valid CSS color string, including hex and rgb.',
            table: {
                type: { summary: 'string' }
            }
        },
        borderWidth: {
            name: 'border-width',
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        padding: {
            control: {
                type: 'number',
                min: 0
            },
            description:
                'Sets the minimum distance in pixels that should be left between the border and the QR modules.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        size: {
            control: {
                type: 'number',
                min: 200
            },
            description:
                'Specifies the size of a QR code in pixels (i.e. "200px"). Numeric values are treated as pixels. If no size is specified, it will be determined from the element width and height. In case the element has width or height of zero, a default value of 200 pixels will be used.',
            defaultValue: 200,
            table: {
                defaultValue: { summary: '200' },
                type: { summary: 'number' }
            }
        },
        encoding: {
            control: {
                type: 'select',
                options: ['ISO_8859_1', 'UTF_8']
            },
            description:
                'The encoding mode used to encode the value.The possible values are: \n"ISO_8859_1" - supports all characters from the ISO/IEC 8859-1 character set.\n "UTF_8" - supports all Unicode characters.',
            defaultValue: 'ISO_8859_1',
            table: {
                defaultValue: { summary: 'ISO_8859_1' },
                type: { summary: 'string' }
            }
        },
        errorCorrection: {
            name: 'error-correction',
            control: {
                type: 'select',
                options: ['L', 'M', 'Q', 'H']
            },
            description:
                'The error correction level used to encode the value. The possible values are: \n"L" - approximately 7% of the codewords can be restored. \n"M" - approximately 15% of the codewords can be restored. \n"Q" - approximately 25% of the codewords can be restored. \n"H" - approximately 30% of the codewords can be restored.',
            defaultValue: 'L',
            table: {
                defaultValue: { summary: 'L' },
                type: { summary: 'string' }
            }
        },
        renderAs: {
            name: 'render-as',
            control: {
                type: 'select',
                options: ['svg', 'canvas']
            },
            description:
                'Sets the preferred rendering engine. If it is not supported by the browser, the QRCode will switch to the first available mode. The supported values are: \n"canvas" - renders the widget as a Canvas element, if available. \n"svg" - renders the widget as inline SVG document, if available',
            defaultValue: 'svg',
            table: {
                defaultValue: { summary: 'svg' },
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => Qrcode(args);

export const Base = Template.bind({});
Base.args = {
    value: 'https://www.avonni.app'
};

export const ErrorCorrectionH = Template.bind({});
ErrorCorrectionH.args = {
    value: 'https://www.avonni.app',
    errorCorrection: 'H'
};

export const Colors = Template.bind({});
Colors.args = {
    value: 'https://www.avonni.app',
    color: '#FFDEAA',
    background: '#1B0972',
    borderWidth: 20,
    borderColor: '#1B0972',
    padding: 30
};

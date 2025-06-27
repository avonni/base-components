import { InputPen } from '../__examples__/inputPen';

export default {
    title: 'Example/Input Pen',
    argTypes: {
        backgroundColor: {
            name: 'background-color',
            control: {
                type: 'color'
            },
            description: 'Defines the color of the background.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff00' },
                category: 'Pen'
            }
        },
        backgroundButtonAlternativeText: {
            name: 'background-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the background button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Background color' },
                category: 'Alternative Text'
            }
        },
        clearButtonAlternativeText: {
            name: 'clear-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the clear button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Clear' },
                category: 'Alternative Text'
            }
        },
        color: {
            control: {
                type: 'color'
            },
            description: 'Defines the color of the pen.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#000' },
                category: 'Pen'
            }
        },
        colorButtonAlternativeText: {
            name: 'color-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the color button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Pen color' },
                category: 'Alternative Text'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        disabledButtons: {
            name: 'disabled-buttons',
            control: {
                type: 'object'
            },
            description:
                'Array of buttons to remove from the toolbar. Values include pen, paintbrush, eraser, ink, size, color, background, download, undo, redo, clear.',
            table: {
                type: { summary: 'string[]' },
                category: 'Toolbar'
            }
        },
        downloadButtonAlternativeText: {
            name: 'download-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the download button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Download PNG' },
                category: 'Alternative Text'
            }
        },
        drawButtonAlternativeText: {
            name: 'draw-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the draw button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Draw' },
                category: 'Alternative Text'
            }
        },
        eraseButtonAlternativeText: {
            name: 'erase-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the erase button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Erase' },
                category: 'Alternative Text'
            }
        },
        fieldLevelHelp: {
            name: 'field-level-help',
            control: {
                type: 'text'
            },
            description:
                'Help text detailing the purpose and function of the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        hideControls: {
            name: 'hide-controls',
            control: {
                type: 'boolean'
            },
            description: 'If present, hide the control bar.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Toolbar'
            }
        },
        inkButtonAlternativeText: {
            name: 'ink-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the ink button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Ink' },
                category: 'Alternative Text'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        mode: {
            control: {
                type: 'select'
            },
            options: ['draw', 'paint', 'ink', 'erase'],
            description: 'Valid modes include draw and erase.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'draw' },
                category: 'Pen'
            }
        },
        paintButtonAlternativeText: {
            name: 'paint-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the paint button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Paint' },
                category: 'Alternative Text'
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is read-only and cannot be edited by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
            }
        },
        redoButtonAlternativeText: {
            name: 'redo-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the redo button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Redo' },
                category: 'Alternative Text'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
            }
        },
        showSignaturePad: {
            name: 'show-signature-pad',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field will become a signature field',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
            }
        },
        size: {
            control: {
                type: 'number',
                min: 1
            },
            description: 'Defines the size of the pen.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '2' },
                category: 'Pen'
            }
        },
        sizeButtonAlternativeText: {
            name: 'size-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the size button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Size' },
                category: 'Alternative Text'
            }
        },
        undoButtonAlternativeText: {
            name: 'undo-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the undo button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Undo' },
                category: 'Alternative Text'
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: "dataUrl like 'data:image/png;base64, …'",
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['top-toolbar', 'bottom-toolbar'],
            description:
                'The variant changes the appearance of the toolbar. Accepted variant is bottom-toolbar and top-toolbar which causes the toolbar to be displayed below the box.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'bottom-toolbar' },
                category: 'Toolbar'
            }
        }
    },
    args: {
        backgroundColor: '#ffffff00',
        backgroundButtonAlternativeText: 'Background color',
        clearButtonAlternativeText: 'Clear',
        color: '#000',
        colorButtonAlternativeText: 'Pen color',
        disabled: false,
        downloadButtonAlternativeText: 'Download PNG',
        drawButtonAlternativeText: 'Draw',
        eraseButtonAlternativeText: 'Erase',
        hideControls: false,
        inkButtonAlternativeText: 'Ink',
        mode: 'draw',
        paintButtonAlternativeText: 'Paint',
        readOnly: false,
        redoButtonAlternativeText: 'Redo',
        required: false,
        showSignaturePad: false,
        size: 3,
        sizeButtonAlternativeText: 'Size',
        undoButtonAlternativeText: 'Undo',
        variant: 'bottom-toolbar'
    }
};

const value =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAfCAYAAAC/MX7XAAACBElEQVRYR+2XT0sbQRjGnzdGCj1I9Sb2mJv4KcSjIEraQjz00ssOTnY+SWY3WYMIHkoppYdqDp7sN+ixnntrKfTPTUE0eUUwNgSTmdnddDdk9zrvn+f3PjPsDGFGP5pRbhTgs+Z84Xjh+IxMYKq2upLiiIFdAPOD/jDjZ9CMll08mxbwUn3PuyKi8jg4pl4tCNrvbQaQa/B7h7cALNrAAGAdRiWb2LyCl3wpLgE8sYEYjCHC90YQPTfl5Q5cKbHau+GvRBRXm5XrcYubBuq87ktxCOAFgAXn5KEEHUZGLmPAKBFKihMGNgA8vY/5C+Yz3dx/5SJcSfGRgW0Acy5542InAq48r8JlOo9z/tICM9SZzFb3pbgYcPk/sTi1+aHDaMWU4bTV/br3AUwvTUWzXLfZ5nf63MCl+ANgKUuw8RcYqgVBK/0LjC8F5xGamblU5kqj0f5mq8/V8RyC07kOW2u2wP04J/C6FBf07/fl2ivNeCbgbSOMXsct6gSupPjMwHrcZinkdUHU0UFrJ2ktJ/C7Zr4U1wDGvpKSinokvwvgnU7g8HBNZ3ClvAp36QuAZxMAHC7ZA/BJh1E17V7O4H0Bft07BtNmmlfNAbjfBJwmOcOmQcUGfxiAFAfMqBJZv5lHafoFoKPD6I1JdBrricHTEJFFjQI8i6ln2bNwPMvpZ9H7FthrgyBtDlzVAAAAAElFTkSuQmCC';

const Template = (args) => InputPen(args);

export const Base = Template.bind({});

export const TopToolbar = Template.bind({});
TopToolbar.args = {
    variant: 'top-toolbar',
    label: 'Input with toolbar at the top',
    fieldLevelHelp: 'A default color has been set',
    required: true,
    color: '#419fec'
};

export const HiddenToolbar = Template.bind({});
HiddenToolbar.args = {
    label: 'Input with no toolbar',
    fieldLevelHelp: 'Controls are hidden',
    hideControls: true
};

export const DisabledButtons = Template.bind({});
DisabledButtons.args = {
    label: 'Input with buttons disabled',
    fieldLevelHelp: 'Size and color buttons have been disabled',
    disabledButtons: ['size', 'color']
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    value: value,
    disabled: true,
    fieldLevelHelp: 'A default value has been set'
};

export const SignaturePad = Template.bind({});
SignaturePad.args = {
    label: 'Signature Field',
    showSignaturePad: true,
    required: true,
    hideControls: true,
    size: 12
};

/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { InputPen } from '../__examples__/inputPen';

export default {
    title: 'Example/Input Pen',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
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
        value: {
            control: {
                type: 'text'
            },
            description: "dataUrl like 'data:image/png;base64, …'",
            table: {
                type: { summary: 'string' }
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
        },
        mode: {
            control: {
                type: 'select'
            },
            options: ['draw', 'erase', 'sign'],
            description: 'Valid modes include draw and erase.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'draw' },
                category: 'Pen'
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
        signature: {
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
        disabledButtons: {
            name: 'disabled-buttons',
            control: {
                type: 'object'
            },
            description:
                'A comma-separated list of buttons to remove from the toolbar. Values include pen, eraser, clear, size, color',
            table: {
                type: { summary: 'string[]' },
                category: 'Toolbar'
            }
        },
        invalid: {
            control: {
                type: 'boolean'
            },
            description:
                'Specifies whether the editor content is valid. If invalid, the slds-has-error class is added. This value defaults to false.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
            }
        }
    },
    args: {
        color: '#000',
        disabled: false,
        hideControls: false,
        invalid: false,
        mode: 'draw',
        readOnly: false,
        required: false,
        signature: false,
        size: 2,
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

export const Signature = Template.bind({});
Signature.args = {
    hideControls: true,
    label: 'Signature Field',
    signature: true,
    size: 14
};

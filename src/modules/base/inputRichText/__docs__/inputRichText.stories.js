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

import { InputRichText } from '../__examples__/inputRichText';

export default {
    title: 'Base/Input Rich Text',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        labelVisible: {
            name: 'label-visible',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        placeholder: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenBadInput: {
            name: 'message-when-bad-input',
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['top-toolbar', 'bottom-toolbar'],
            defaultValue: 'top-toolbar',
            table: {
                defaultValue: { summary: 'top-toolbar' },
                type: { summary: 'string' },
                category: 'Toolbar'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        isPublisher: {
            name: 'is-publisher',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Toolbar'
            }
        },
        disabledCategories: {
            name: 'disabled-categories',
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'string[]' },
                category: 'Toolbar'
            }
        },
        formats: {
            control: {
                type: 'object'
            },
            defaultValue: [],
            table: {
                type: { summary: 'string[]' },
                category: 'Toolbar'
            }
        }
    },
    args: {
        labelVisible: false,
        disabled: false,
        isPublisher: false
    }
};

const Template = (args) => InputRichText(args);

export const Base = Template.bind({});

export const BottomToolbar = Template.bind({});
BottomToolbar.args = {
    label: 'Input with bottom toolbar',
    labelVisible: true,
    placeholder: 'Write here'
};

export const CustomToolbar = Template.bind({});
CustomToolbar.args = {
    label: 'Input with custom toolbar',
    labelVisible: true,
    formats: [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'table',
        'header',
        'color'
    ],
    placeholder: 'Write here',
    value: 'Note that disabled-categories takes precedence on formats',
    disabledCategories: ['FORMAT_TEXT']
};

export const Publisher = Template.bind({});
Publisher.args = {
    label: 'Publisher input',
    labelVisible: true,
    isPublisher: true,
    value: 'Note that the toolbar contains more actions.'
};

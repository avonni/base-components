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

import { Dialog } from '../__examples__/dialog';

export default {
    title: 'Example/Dialog',
    argTypes: {
        dialogName: {
            name: 'dialog-name',
            control: {
                type: 'text'
            },
            description: '',
            table: {
                type: { summary: 'string' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the modal box is in the loading state.',
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'Width of the modal. Accepted values include small, medium, large.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the modal box is in a loading state and shows a spinner.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        showDialog: {
            name: 'show-dialog',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, display dialog',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        isLoading: false,
        showDialog: false
    }
};

const Template = (args) => Dialog(args);

export const Base = Template.bind({});
Base.args = {
    dialogName: 'dialog',
    showDialog: true
};

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    dialogName: 'dialog',
    size: 'small',
    showDialog: true
};

export const BaseLarge = Template.bind({});
BaseLarge.args = {
    dialogName: 'dialog',
    size: 'large',
    showDialog: true
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    dialogName: 'dialog',
    showDialog: true,
    isLoading: 'true',
    loadingStateAlternativeText: 'Modal is loading'
};

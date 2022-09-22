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

import { Alert } from '../__examples__/alert';
import { viewports } from 'c/utilsPrivate';

export default {
    title: 'Example/Alert',
    argTypes: {
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'error', 'offline', 'warning'],
            description:
                'The variant change the apparence of the alert. Valid values include base, error, offline and warning.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        isDismissible: {
            name: 'is-dismissible',
            control: {
                type: 'boolean'
            },
            description: 'Specify if the alert can be close.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        closeAction: {
            name: 'close-action',
            control: {
                type: 'action'
            },
            description:
                'Custom function to execute when the user close the alert.',
            table: {
                type: { summary: 'action' }
            }
        }
    },
    args: {
        closeAction: false,
        isDismissible: false,
        variant: 'base'
    }
};

const Template = (args) => Alert(args);
const screenshotParams = {
    parameters: {
        layout: 'padded', // Overrides all screenshot layout. // if you put padded here, they're all padded, but not centered
    }
};

export const Base = Template.bind({});
Base.story = screenshotParams;
Base.args = {
    iconName: 'utility:user'
};

export const DismissibleWithCloseAction = Template.bind({});
DismissibleWithCloseAction.story = screenshotParams;
DismissibleWithCloseAction.args = {
    iconName: 'utility:user',
    isDismissible: true,
    closeAction: () => {
        console.log('Close action triggered');
    }
};

export const Error = Template.bind({});
Error.story = screenshotParams;
Error.args = {
    iconName: 'utility:error',
    variant: 'error'
};

export const Offline = Template.bind({});
Offline.story = screenshotParams;
Offline.args = {
    iconName: 'utility:clock',
    variant: 'offline'
};

export const Warning = Template.bind({});
Warning.story = screenshotParams;
Warning.args = {
    iconName: 'utility:warning',
    variant: 'warning'
};

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

import { ScopedNotification } from '../__examples__/scopedNotification';
import { NoSlotScopedNotification } from '../__examples__/noSlotScopedNotification';

export default {
    title: 'Example/Scoped Notification',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description: 'The heading of the section message.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'dark', 'warning', 'error', 'success'],
            defaultValue: 'base',
            description:
                'The variant changes the look of the scoped notification. Valid values include base, light, dark, warning, error, success.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium, or large. This value defaults to medium.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => ScopedNotification(args);
const NoSlotTemplate = (args) => NoSlotScopedNotification(args);

export const Base = Template.bind({});
Base.args = {
    title: 'base',
    iconName: 'utility:info'
};

export const DarkExtraSmallIcon = NoSlotTemplate.bind({});
DarkExtraSmallIcon.args = {
    iconName: 'utility:info',
    variant: 'dark',
    iconSize: 'x-small',
    title: 'Dark variant with extra small icon.'
};

export const WarningSmallIcon = NoSlotTemplate.bind({});
WarningSmallIcon.args = {
    iconName: 'utility:warning',
    variant: 'warning',
    iconSize: 'small',
    title: 'Warning variant with small icon.'
};

export const ErrorLargeIcon = NoSlotTemplate.bind({});
ErrorLargeIcon.args = {
    iconName: 'utility:error',
    variant: 'error',
    iconSize: 'large',
    title: 'Error variant with large icon.'
};

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

import { VerticalProgressIndicator } from '../__examples__/verticalProgressIndicator';

export default {
    title: 'Example/Vertical Progress Indicator',
    argTypes: {
        currentStep: {
            name: 'current-step',
            control: {
                type: 'text'
            },
            description:
                'Set current-step to match the value attribute of one of progress-step components. If current-step is not provided, the value of the first progress-step component is used.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'shaded']
            },
            options: ['base', 'shade'],
            defaultValue: 'base',
            description:
                'Changes the appearance of the progress indicator for the base type only. Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators. The default is base.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        hasError: {
            name: 'has-error',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the current step is in error state and an error icon is displayed on the step indicator. Only the base type can display errors.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        contentInLine: {
            name: 'content-in-line',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If true, add the class slds-progress__item_content to all vertical-progress-step items. Example: https://www.lightningdesignsystem.com/components/setup-assistant/#Hub-with-Expandable-Steps',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        hasError: false,
        contentInLine: false
    }
};

const Template = (args) => VerticalProgressIndicator(args);

export const Base = Template.bind({});
Base.args = {
    currentStep: '2'
};

export const Shaded = Template.bind({});
Shaded.args = {
    currentStep: '2',
    variant: 'shaded'
};

export const HasError = Template.bind({});
HasError.args = {
    currentStep: '2',
    hasError: true
};

export const contentInLine = Template.bind({});
contentInLine.args = {
    currentStep: '2',
    contentInLine: true
};

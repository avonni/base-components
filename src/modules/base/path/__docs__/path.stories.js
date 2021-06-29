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

import { Path } from '../__examples__/path';
import {
    ACTIONS,
    STEPS,
    ALL_STEPS_WITH_COMPLETED_OPTIONS,
    SUCCESS_STEPS_WITH_CLOSING_OPTIONS
} from './data';

export default {
    title: 'Base/Path',
    argTypes: {
        steps: {
            control: {
                type: 'object'
            },
            description: 'Array of step objects.',
            type: {
                required: true
            },
            table: {
                type: { summary: 'object[]' }
            }
        },
        currentStep: {
            name: 'current-step',
            control: {
                type: 'text'
            },
            description: 'Name of the current step.',
            table: {
                type: { summary: 'string' }
            }
        },
        hideCoaching: {
            name: 'hide-coaching',
            control: {
                type: 'boolean'
            },
            description: 'If true, the coaching section will be hidden.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Coaching'
            }
        },
        keyFieldsLabel: {
            name: 'key-fields-label',
            control: {
                type: 'text'
            },
            description: 'Label of the key fields section.',
            defaultValue: 'Key Fields',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Key Fields' },
                category: 'Coaching'
            }
        },
        guidanceLabel: {
            name: 'guidance-label',
            control: {
                type: 'text'
            },
            description: 'Label of the guidance section.',
            defaultValue: 'Guidance for Success',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Guidance for Success' },
                category: 'Coaching'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If true, the path is disabled.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        format: {
            control: {
                type: 'radio'
            },
            options: ['linear', 'non-linear'],
            description: 'Valid values include linear and non-linear.',
            defaultValue: 'linear',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'linear' },
                category: 'Path navigation'
            }
        },
        actions: {
            control: {
                type: 'object'
            },
            description: 'Array of default step actions.',
            table: {
                type: { summary: 'object[]' },
                category: 'Coaching'
            }
        },
        hideButtons: {
            name: 'hide-buttons',
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the path buttons.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        nextButtonLabel: {
            name: 'next-button-label',
            control: {
                type: 'text'
            },
            description:
                'Default label of the path button. On click on the button, the path will go to the next step.',
            defaultValue: 'Mark as Complete',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Mark as Complete' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        nextButtonIconName: {
            name: 'next-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used for the path update button.\n Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        nextButtonIconPosition: {
            name: 'next-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectButtonLabel: {
            name: 'select-button-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the path button, when the user clicked on a different step than the current one. On click on the button, the selected step will become the current step.',
            defaultValue: 'Mark as Current Stage',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Mark as Current Stage' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectButtonIconName: {
            name: 'select-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used for the path update button.\n Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectButtonIconPosition: {
            name: 'select-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        changeCompletionStatusLabel: {
            name: 'change-completion-status-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the menu item that appears when the previous step had completed options. On click on the menu item, the dialog will reopen, and the user will be able to change the completion status.',
            defaultValue: 'Change Completion Status',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Change Completion Status' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        }
    }
};

const Template = (args) => Path(args);

export const Base = Template.bind({});
Base.args = {
    steps: STEPS
};

export const SuccessWithClosingOptions = Template.bind({});
SuccessWithClosingOptions.args = {
    steps: SUCCESS_STEPS_WITH_CLOSING_OPTIONS
};

export const CompletedOptionsForEachStep = Template.bind({});
CompletedOptionsForEachStep.args = {
    steps: ALL_STEPS_WITH_COMPLETED_OPTIONS
};

export const NonLinear = Template.bind({});
NonLinear.args = {
    steps: STEPS,
    format: 'non-linear',
    actions: ACTIONS
};

export const NonLinearWithCompletedOptions = Template.bind({});
NonLinearWithCompletedOptions.args = {
    steps: ALL_STEPS_WITH_COMPLETED_OPTIONS,
    format: 'non-linear',
    actions: ACTIONS
};

export const ButtonHiddenWithCurrentStep = Template.bind({});
ButtonHiddenWithCurrentStep.args = {
    steps: STEPS,
    actions: ACTIONS,
    hideButtons: true,
    currentStep: 'contacted'
};

export const Disabled = Template.bind({});
Disabled.args = {
    steps: STEPS,
    disabled: true,
    keyFieldsLabel: 'Details',
    guidanceLabel: 'Instructions'
};

export const NoCoachingWithCustomButtonLabels = Template.bind({});
NoCoachingWithCustomButtonLabels.args = {
    steps: SUCCESS_STEPS_WITH_CLOSING_OPTIONS,
    actions: ACTIONS,
    hideCoaching: true,
    nextButtonLabel: 'Next',
    nextButtonIconName: 'utility:chevronright',
    nextButtonIconPosition: 'right',
    selectButtonLabel: 'Move to this step',
    selectButtonIconName: 'utility:level_down',
    changeCompletionStatusLabel: 'Change status'
};

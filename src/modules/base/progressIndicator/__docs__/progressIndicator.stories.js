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

import { ProgressIndicator } from '../__examples__/progressIndicator';

export default {
    title: 'Base/Progress Indicator',
    argTypes: {
        completedSteps: {
            control: {
                type: 'object'
            },
            description: 'All completed steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        disabledSteps: {
            control: {
                type: 'object'
            },
            description: 'All disabled steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        errorSteps: {
            control: {
                type: 'object'
            },
            description: 'All error steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        warningSteps: {
            control: {
                type: 'object'
            },
            description: 'All warning steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        currentStep: {
            control: {
                type: 'text'
            },
            description:
                'Set current-step to match the value attribute of one of progress-step components. If current-step is not provided, the value of the first progress-step component is used.',
            table: {
                type: { summary: 'String' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['base'],
            description:
                'Changes the visual pattern of the indicator. Valid values are base and arrow. The default is base.',
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'String' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'shaded'],
            description:
                'Changes the appearance of the progress indicator for the base type only. Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators. The default is base.',
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        steps: {
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'object[]' }
            }
        }
    }
};

const BaseStepsWithPopoverHidden = [
    {
        value: '1',
        label: '1',
        labelPosition: 'bottom',
        assistiveText: '1',
        popoverDescription: 'This is step #1',
        popoverHidden: 'true'
    },
    {
        value: '2',
        label: '2',
        labelPosition: 'bottom',
        assistiveText: '2',
        popoverDescription: 'This is step #2',
        popoverHidden: 'true'
    },
    {
        value: '3',
        label: '3',
        labelPosition: 'bottom',
        assistiveText: '3',
        popoverDescription: 'This is step #3',
        popoverHidden: 'true'
    },
    {
        value: '4',
        label: '4',
        labelPosition: 'bottom',
        popoverDescription: 'This is step #4',
        popoverHidden: 'true'
    },
    {
        value: '5',
        label: '5',
        labelPosition: 'bottom',
        popoverDescription: 'This is step #5',
        popoverHidden: 'true'
    }
];

const BaseStepsWithPopoverVisible = [
    {
        value: '1',
        label: '1',
        labelPosition: 'bottom',
        assistiveText: '1',
        popoverDescription: 'This is step 1',
        popoverSize: 'large'
    },
    {
        value: '2',
        label: '2',
        labelPosition: 'bottom',
        assistiveText: '2',
        popoverDescription: 'This is step 2',
        popoverSize: 'large',
        popoverRatio: '4-by-3'
    },
    {
        value: '3',
        label: '3',
        labelPosition: 'bottom',
        assistiveText: '3',
        popoverDescription: 'This is step 3',
        popoverSize: 'large',
        popoverRatio: '16-by-9'
    },
    {
        value: '4',
        label: '4',
        labelPosition: 'bottom',
        popoverDescription: 'Step 4'
    },
    {
        value: '5',
        label: '5',
        labelPosition: 'bottom',
        popoverDescription: 'Step 5',
        popoverRatio: '4-by-3'
    },
    {
        value: '6',
        label: '6',
        labelPosition: 'bottom',
        popoverDescription: 'Step 6',
        popoverRatio: '16-by-9'
    },
    {
        value: '7',
        label: '7',
        labelPosition: 'bottom',
        popoverDescription: '7',
        popoverSize: 'small'
    },
    {
        value: '8',
        label: '8',
        labelPosition: 'bottom',
        popoverDescription: '8',
        popoverSize: 'small',
        popoverRatio: '4-by-3'
    },
    {
        value: '9',
        label: '9',
        labelPosition: 'bottom',
        popoverDescription: '9',
        popoverSize: 'small',
        popoverRatio: '16-by-9'
    }
];

const stepsWithButtons = [
    {
        value: '1',
        label: '1',
        labelPosition: 'top',
        assistiveText: '1',
        description: 'This is step #1',
        buttonLabel: 'Error',
        buttonVariant: 'destructive'
    },
    {
        value: '2',
        label: '2',
        labelPosition: 'top',
        assistiveText: '2',
        description: 'This is step #2',
        buttonLabel: 'Completed',
        buttonVariant: 'success'
    },
    {
        value: '3',
        label: '3',
        labelPosition: 'top',
        assistiveText: '3',
        description: 'This is step #3',
        buttonLabel: 'Completed',
        buttonVariant: 'success'
    },
    {
        value: '4',
        label: '4',
        labelPosition: 'top',
        assistiveText: '4',
        description: 'This is step #4',
        buttonLabel: 'Current',
        buttonVariant: 'brand'
    },
    {
        value: '5',
        label: '5',
        labelPosition: 'top',
        assistiveText: '5',
        description: 'This is step #5',
        buttonLabel: 'Warning',
        buttonVariant: 'destructive-text'
    }
];

const milestonesSteps = [
    {
        value: '1',
        label: 'Merger & Acquisition',
        labelPosition: 'bottom',
        popoverIconName: 'utility:merge',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small',
        popoverVariant: 'button'
    },
    {
        value: '2',
        label: 'Expansion',
        labelPosition: 'bottom',
        popoverIconName: 'utility:rules',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small',
        popoverVariant: 'button'
    },
    {
        value: '3',
        label: 'Executive Change',
        labelPosition: 'bottom',
        popoverIconName: 'utility:block_visitor',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small',
        popoverVariant: 'button'
    },
    {
        value: '4',
        label: 'Market Listing',
        labelPosition: 'bottom',
        popoverIconName: 'utility:priority',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small',
        popoverVariant: 'button'
    },
    {
        value: '5',
        label: 'Bankruptcy',
        labelPosition: 'bottom',
        popoverIconName: 'utility:error',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small',
        popoverVariant: 'button'
    },
    {
        value: '6',
        label: 'New Product Launch',
        labelPosition: 'bottom',
        popoverIconName: 'utility:cases',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small',
        popoverVariant: 'button'
    },
    {
        value: '7',
        label: 'New Partnership',
        labelPosition: 'bottom',
        popoverIconName: 'utility:change_record_type',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small',
        popoverVariant: 'button'
    }
];

const Template = (args) => ProgressIndicator(args);

export const BaseWithPopoverHidden = Template.bind({});
BaseWithPopoverHidden.args = {
    type: 'base',
    variant: 'base',
    steps: BaseStepsWithPopoverHidden,
    currentStep: '4',
    errorSteps: ['1'],
    warningSteps: ['5'],
    completedSteps: ['2', '3'],
    disabledSteps: []
};

export const BaseWithPopoverVisible = Template.bind({});
BaseWithPopoverVisible.args = {
    type: 'base',
    variant: 'base',
    steps: BaseStepsWithPopoverVisible,
    currentStep: '4',
    errorSteps: ['1'],
    warningSteps: ['5'],
    completedSteps: ['2', '3'],
    disabledSteps: []
};

export const withButtons = Template.bind({});
withButtons.args = {
    type: 'base',
    variant: 'base',
    steps: stepsWithButtons,
    currentStep: '4',
    errorSteps: ['1'],
    warningSteps: ['5'],
    completedSteps: ['2', '3'],
    disabledSteps: ['3']
};

export const milestones = Template.bind({});
milestones.args = {
    type: 'base',
    variant: 'base',
    steps: milestonesSteps,
    errorSteps: [],
    warningSteps: [],
    completedSteps: ['1'],
    disabledSteps: []
};

export const milestonesShaded = Template.bind({});
milestonesShaded.args = {
    type: 'base',
    variant: 'shaded',
    steps: milestonesSteps,
    errorSteps: [],
    warningSteps: [],
    completedSteps: ['1'],
    disabledSteps: []
};

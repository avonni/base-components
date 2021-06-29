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

const ACTIONS = [
    {
        name: 'action-add',
        iconName: 'utility:add'
    },
    {
        name: 'action-remove',
        label: 'Remove',
        iconName: 'utility:delete',
        disabled: true
    }
];

const COMPLETED_OPTIONS = [
    {
        label: 'Base',
        value: 'completed-base',
        variant: 'base'
    },
    {
        label: 'Success',
        value: 'completed-success',
        variant: 'success'
    },
    {
        label: 'Error',
        value: 'completed-error',
        variant: 'error'
    },
    {
        label: 'Warning',
        value: 'completed-warning',
        variant: 'warning'
    },
    {
        label: 'Offline',
        value: 'completed-offline',
        variant: 'offline'
    }
];

const STEPS = [
    {
        name: 'open',
        label: 'Open',
        tooltip: '1 day in Open',
        keyFields: [
            {
                label: 'Name',
                value: 'Mr. John Doe'
            },
            {
                label: 'Phone',
                value: '514-234-5678',
                type: 'phone'
            },
            {
                label: 'Website',
                value: 'https://www.avonni.app/',
                type: 'url'
            }
        ],
        guidance:
            "Respond to lead within 5 minutes. Visit the lead's website to learn about their business.",
        actions: [
            {
                name: 'action-edit-phone',
                label: 'Edit phone',
                iconName: 'utility:edit'
            },
            {
                name: 'action-add-email',
                label: 'Add email',
                iconName: 'utility:email'
            }
        ]
    },
    {
        name: 'qualification',
        label: 'Qualification',
        tooltip: '3 days in Open',
        keyFields: [
            {
                label: 'Company',
                value: 'John Doe Inc.'
            },
            {
                label: 'Description',
                value: 'John Doe Inc. is the lead retailer of yarn in Canada.'
            },
            {
                label: 'Number of employees',
                value: '2300',
                type: 'number'
            }
        ],
        guidance:
            "Qualify the opportunity and confirm budget. What's their business? What problems are they trying to solve? How does solving these problems help them?",
        actions: [
            {
                name: 'action-edit',
                iconName: 'utility:edit'
            },
            {
                name: 'action-add',
                iconName: 'utility:add'
            },
            {
                name: 'action-remove',
                iconName: 'utility:delete'
            }
        ],
        showConfetti: true,
        confettiFrequency: 'rarely'
    },
    {
        name: 'contacted',
        label: 'Contacted',
        tooltip: '5 days in Open',
        keyFields: [
            {
                label: 'Date of call',
                value: new Date('2021/10/23'),
                type: 'date',
                typeAttributes: {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }
            },
            {
                label: 'Notes',
                value:
                    'John Doe Inc. is the lead retailer of yarn in Canada. It has 2,300 employees.'
            }
        ],
        guidance:
            'Verify contact information and qualify your lead. Gather all the contact information you can. The better armed you are, the higher the likelihood of developing positive communications with your lead and improving your prospecting success.',
        showConfetti: true,
        confettiFrequency: 'always'
    },
    {
        name: 'closed',
        label: 'Closed',
        tooltip: 'Closed',
        keyFields: [
            {
                label: 'Close date',
                value: new Date('2021/10/30'),
                type: 'date'
            },
            {
                label: 'Budget Confirmed',
                value: 300000,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'CAD'
                }
            }
        ],
        hideDefaultActions: true
    }
];

const ALL_STEPS_WITH_COMPLETED_OPTIONS = JSON.parse(JSON.stringify(STEPS));
ALL_STEPS_WITH_COMPLETED_OPTIONS.forEach((step) => {
    step.completedOptions = COMPLETED_OPTIONS;
});

const SUCCESS_STEPS_WITH_CLOSING_OPTIONS = JSON.parse(JSON.stringify(STEPS));
SUCCESS_STEPS_WITH_CLOSING_OPTIONS[0].completedOptions = [COMPLETED_OPTIONS[1]];
SUCCESS_STEPS_WITH_CLOSING_OPTIONS[1].completedOptions = [COMPLETED_OPTIONS[1]];
SUCCESS_STEPS_WITH_CLOSING_OPTIONS[2].completedOptions = COMPLETED_OPTIONS;

export {
    ACTIONS,
    STEPS,
    ALL_STEPS_WITH_COMPLETED_OPTIONS,
    SUCCESS_STEPS_WITH_CLOSING_OPTIONS,
    COMPLETED_OPTIONS
};

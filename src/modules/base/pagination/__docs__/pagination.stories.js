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

import { Pagination } from '../__examples__/pagination';

export default {
    title: 'Base/Pagination',
    argTypes: {
        align: {
            control: {
                type: 'select'
            },
            options: ['left', 'center', 'right', 'fill'],
            description:
                'Alignment of the page buttons. Values include left, center, right and fill.',
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                "When set to 'true', disables the component's functionality and places it in a disabled state",
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 1
            },
            description: 'Current page number, starting from 1',
            defaultValue: 1,
            table: {
                defaultValue: { summary: '1' },
                type: { summary: 'number' }
            }
        },
        limit: {
            control: {
                type: 'number',
                min: 3
            },
            description:
                'Maximum number of buttons to show (including ellipsis if shown, but excluding the bookend buttons). The minimum value is 3.',
            defaultValue: 5,
            table: {
                defaultValue: { summary: '5' },
                type: { summary: 'number' }
            }
        },
        perPage: {
            name: 'per-page',
            control: {
                type: 'number',
                min: 1
            },
            description: 'Number of rows per page.',
            defaultValue: 20,
            table: {
                defaultValue: { summary: '20' },
                type: { summary: 'number' }
            }
        },
        totalRows: {
            name: 'total-rows',
            control: {
                type: 'number',
                min: 0
            },
            description: 'Total number of rows in the dataset.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        ellipsisText: {
            name: 'ellipsis-text',
            control: {
                type: 'text'
            },
            description: 'Content to place in the ellipsis placeholder.',
            defaultValue: '...',
            table: {
                defaultValue: { summary: '...' },
                type: { summary: 'number' }
            }
        },
        ellipsisClass: {
            name: 'ellipsis-class',
            control: {
                type: 'text'
            },
            description: "Class(es) to apply to the 'ellipsis' placeholders.",
            table: {
                type: { summary: 'string' }
            }
        },
        firstButtonLabel: {
            name: 'first-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the first button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        firstButtonIconName: {
            name: 'first-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display after the label of the first button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        previousButtonLabel: {
            name: 'previous-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the previous button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        previousButtonIconName: {
            name: 'previous-button-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevronleft',
            description:
                'The name of an icon to display after the label for the previous button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:chevronleft' },
                category: 'Buttons'
            }
        },
        nextButtonLabel: {
            name: 'next-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the next button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        nextButtonIconName: {
            name: 'next-button-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevronright',
            description:
                'The name of an icon to display after the label for the next button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:chevronright' },
                category: 'Buttons'
            }
        },
        lastButtonLabel: {
            name: 'last-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the last button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        lastButtonIconName: {
            name: 'last-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display after the label for the last button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        }
    },
    args: {
        disabled: false
    }
};

const Template = (args) => Pagination(args);

export const Base = Template.bind({});
Base.args = {
    totalRows: 200
};

export const CustomButtons = Template.bind({});
CustomButtons.args = {
    totalRows: 100,
    perPage: 10,
    previousButtonIconName: 'utility:back',
    previousButtonLabel: 'back',
    firstButtonLabel: 'First',
    firstButtonIconName: 'utility:jump_to_left',
    lastButtonLabel: 'Last',
    lastButtonIconName: 'utility:jump_to_right',
    nextButtonIconName: 'utility:forward',
    nextButtonLabel: 'next'
};

export const CustomEllipsis = Template.bind({});
CustomEllipsis.args = {
    totalRows: 100,
    perPage: 10,
    value: 5,
    ellipsisText: `...more...`
};

export const Fill = Template.bind({});
Fill.args = {
    totalRows: 100,
    perPage: 9,
    limit: 10,
    align: 'fill'
};

export const Disabled = Template.bind({});
Disabled.args = {
    totalRows: 100,
    perPage: 9,
    disabled: true
};

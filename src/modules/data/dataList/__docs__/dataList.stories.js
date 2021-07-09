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

import { DataList } from '../__examples__/dataList';

export default {
    title: 'Example/Data List',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description: 'Array of actions.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        alternativeText: {
            control: {
                type: 'text'
            },
            description:
                "Alternative text used to describe the list. If the list is sortable, it should describe its behavior, for example: 'Sortable menu. Press spacebar to grab or drop an item. Press up and down arrow keys to change position. Press escape to cancel.'",
            table: {
                type: { summary: 'string' }
            }
        },
        data: {
            control: {
                type: 'object'
            },
            description: 'The array of data to be displayed.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        divider: {
            control: {
                type: 'select'
            },
            options: ['top', 'bottom', 'around'],
            description:
                'Changes the appearance of the list. Valid values include top, bottom and around.',
            defaultValue: 'around',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'around' }
            }
        },
        fields: {
            control: {
                type: 'object'
            },
            description: 'Array of fields displayed in the popover.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the list.',
            table: {
                type: { summary: 'string' }
            }
        },
        listActions: {
            control: {
                type: 'object'
            },
            description: 'Array of actions for the list.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        sortable: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If true, it will be possible to reorder the list items.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        sortableIconName: {
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the sortable icon. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        sortableIconPosition: {
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Position of the sortable icon. Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        }
    }
};

const Template = (args) => DataList(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Base Data List',
    actions: [
        {
            label: 'Edit',
            name: 'edit-action',
            iconName: 'utility:edit',
            disabled: false
        },
        {
            label: 'Remove',
            name: 'delete-action',
            iconName: 'utility:close',
            disabled: false
        }
    ],
    fields: [
        {
            label: 'Label',
            name: 'label',
            type: 'text'
        },
        {
            label: 'Title',
            name: 'title',
            type: 'text'
        },
        {
            label: 'Name',
            name: 'name',
            type: 'text'
        }
    ],
    data: [
        {
            label: 'Accordion Title A',
            title: 'Lightning Accodion Section',
            name: 'A'
        },
        {
            label: 'Accordion Title B',
            title: 'Lightning Accodion Section',
            name: 'B'
        },
        {
            label: 'Accordion Title C',
            title: 'Lightning Accodion Section',
            name: 'C'
        }
    ],
    listActions: [
        {
            label: 'Add Lightning Accordion',
            name: 'addLightningAccordion'
        },
        {
            label: 'Section',
            name: 'section',
            iconName: 'utility:list',
            disabled: true
        }
    ],
    sortableIconName: 'utility:drag_and_drop',
    sortable: true
};

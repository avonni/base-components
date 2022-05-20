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

import { Kanban } from '../__examples__/kanban';
import { GROUP_VALUES, FIELDS, RECORDS, ACTIONS } from './data';

export default {
    title: 'Example/Kanban',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description:
                ' Array of action objects. The actions are displayed on each card and refer to tasks you can perform, such as updating or deleting the card.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        fields: {
            control: {
                type: 'object'
            },
            description:
                ' Array of field objects, used to define the allowed data fields.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        groupValues: {
            name: 'group-values',
            control: {
                type: 'object'
            },
            description:
                ' Array of group objects. Each group represents one step of the path.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        groupFieldName: {
            name: 'group-field-name',
            control: {
                type: 'text'
            },
            description:
                ' Name of the data field containing the group label the data belongs to. ',
            table: {
                type: { summary: 'String' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                ' If present, the tiles are read-only and cannot be dragged by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        records: {
            control: {
                type: 'object'
            },
            description:
                ' Array of data objects. Each object will be displayed as a data card in one of the steps. The objects should have a key <code>id</code>, used as their unique identifier. The other keys should correspond to the available fields, and/or the summarize and group field names.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        summarizeFieldName: {
            name: 'summarize-field-name',
            control: {
                type: 'text'
            },
            description:
                ' Name of the data field containing the number to add to the group summarization, at the top of each column.',
            table: {
                type: { summary: 'String' }
            }
        }
    },
    args: {}
};

const Template = (args) => Kanban(args);

export const Base = Template.bind({});
Base.args = {
    groupValues: GROUP_VALUES,
    fields: FIELDS,
    records: RECORDS,
    actions: ACTIONS,
    readOnly: false,
    summarizeFieldName: 'Amount',
    groupFieldName: 'status'
};

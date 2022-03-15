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

import { TreeGrid } from '../__examples__/treeGrid';
import {
    EXAMPLES_COLUMNS_DEFINITION_BASIC,
    EXAMPLES_RECORDS_BASIC,
    EXPANDED_ROWS_BASIC
} from '../__docs__/data';
export default {
    title: 'Example/Tree Grid',
    argTypes: {
        ariaLabel: {
            name: 'aria-label',
            control: {
                type: 'text'
            },
            description: 'Pass through for aria-label on lightning-datatable.',
            table: {
                type: { summary: 'string' }
            }
        },
        columns: {
            control: {
                type: 'object'
            },
            description:
                "Array of the columns object that's used to define the data types. Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'. See the table below for more information.",
            table: {
                type: { summary: 'object[]' }
            }
        },
        expandedRows: {
            name: 'expanded-rows',
            control: {
                type: 'object'
            },
            description:
                'The array of unique row IDs for rows that are expanded.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        hideCheckboxColumn: {
            name: 'hide-checkbox-column',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the checkbox column for row selection is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a spinner is displayed to indicate that more data is being loaded.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        keyField: {
            name: 'key-field',
            control: {
                type: 'string'
            },
            description:
                'Required for better performance. Associates each row with a unique ID.',
            table: {
                type: { summary: 'string' }
            }
        },
        maxColumnWidth: {
            name: 'max-column-width',
            control: {
                type: 'number'
            },
            description:
                'The maximum width for all columns. The default is 1000px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1000' }
            }
        },
        minColumnWidth: {
            name: 'min-column-width',
            control: {
                type: 'number'
            },
            description:
                'The minimum width for all columns. The default is 50px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '50' }
            }
        },
        records: {
            control: {
                type: 'object'
            },
            description: 'The array of data to be displayed.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        resizeColumnDisabled: {
            name: 'resize-column-disabled',
            control: {
                type: 'boolean'
            },
            description: 'If present, column resizing is disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        rowNumberOffset: {
            name: 'row-number-offset',
            control: {
                type: 'number'
            },
            description:
                'Determines where to start counting the row number. The default is 0.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        },
        selectedRows: {
            name: 'selected-rows',
            control: {
                type: 'object'
            },
            description:
                'Enables programmatic row selection with a list of key-field values.',
            table: {
                type: { summary: 'string[]' }
            }
        },
        showRowNumberColumn: {
            name: 'show-row-number-column',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the row numbers are shown in the first column.',
            table: {
                type: { summary: 'string[]' }
            }
        }
    },
    args: {
        hideCheckboxColumn: false,
        isLoading: false,
        maxColumnWidth: 1000,
        minColumnWidth: 50,
        resizeColumnDisabled: false,
        rowNumberOffset: 0,
        selectedRows: [],
        showRowNumberColumn: false
    }
};

const Template = (args) => TreeGrid(args);

export const Base = Template.bind({});
Base.args = {
    keyField: 'name',
    columns: EXAMPLES_COLUMNS_DEFINITION_BASIC,
    records: EXAMPLES_RECORDS_BASIC
};

export const Expanded = Template.bind({});
Expanded.args = {
    keyField: 'name',
    columns: EXAMPLES_COLUMNS_DEFINITION_BASIC,
    records: EXAMPLES_RECORDS_BASIC,
    expandedRows: EXPANDED_ROWS_BASIC
};

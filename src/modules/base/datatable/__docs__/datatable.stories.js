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

import { Datatable } from '../__examples__/datatable';
import {
    columnsAB,
    columnsCD,
    columnsEN,
    columnsOQ,
    columnsRZ,
    columnsSum,
    columnsGroupBy,
    dataAB,
    dataCD,
    dataEN,
    dataOQ,
    dataRZ,
    dataSum,
    dataGroupBy
} from './data';

export default {
    title: 'Example/Datatable',
    argTypes: {
        columnWidthsMode: {
            name: 'column-widths-mode',
            control: {
                type: 'radio'
            },
            options: ['fixed', 'auto'],
            defaultValue: 'fixed',
            description:
                "Specifies how column widths are calculated. Set to 'fixed' for columns with equal widths. Set to 'auto' for column widths that are based on the width of the column content and the table width.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'fixed' },
                category: 'Display'
            }
        },
        columns: {
            control: {
                type: 'object'
            },
            description:
                "Array of the columns object that's used to define the data types. Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'. See the table below for more information.",
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
            }
        },
        data: {
            control: {
                type: 'object'
            },
            description: 'The array of data to be displayed.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
            }
        },
        defaultSortDirection: {
            name: 'default-sort-direction',
            control: {
                type: 'radio'
            },
            options: ['asc', 'desc'],
            defaultValue: 'asc',
            description:
                "Specifies the default sorting direction on an unsorted column. Valid options include 'asc' and 'desc'.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'asc' },
                category: 'Data'
            }
        },
        draftValues: {
            name: 'draft-values',
            control: {
                type: 'object'
            },
            description:
                'The current values per row that are provided during inline edit.',
            table: {
                type: { summary: 'string[]' },
                category: 'Data'
            }
        },
        enableInfiniteLoading: {
            name: 'enable-infinite-loading',
            control: {
                type: 'boolean'
            },
            defaultvalue: false,
            description:
                'If present, you can load a subset of data and then display more when users scroll to the end of the table. Use with the onloadmore event handler to retrieve more data.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        errors: {
            control: {
                type: 'object'
            },
            description:
                "Specifies an object containing information about cell level, row level, and table level errors. When it's set, error messages are displayed on the table accordingly.",
            table: {
                type: { summary: 'object' },
                category: 'Data'
            }
        },
        groupBy: {
            name: 'group-by',
            control: {
                type: 'text'
            },
            description:
                'If present, the value will define how the data will be grouped.',
            table: {
                type: { summary: 'string' },
                category: 'Data'
            }
        },
        hideCheckboxColumn: {
            name: 'hide-checkbox-column',
            control: {
                type: 'boolean'
            },
            defaultvalue: false,
            description:
                'If present, the checkbox column for row selection is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        hideTableHeader: {
            name: 'hide-table-header',
            control: {
                type: 'boolean'
            },
            defaultvalue: false,
            description: 'If present, the table header is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultvalue: false,
            description:
                'If present, a spinner is shown to indicate that more data is loading.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        keyField: {
            name: 'key-field',
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'Associates each row with a unique ID.',
            table: {
                type: { summary: 'string' },
                category: 'Data'
            }
        },
        loadMoreOffset: {
            name: 'load-more-offset',
            control: {
                type: 'number'
            },
            defaultValue: 20,
            description:
                "Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table.",
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '20' },
                category: 'Display'
            }
        },
        maxColumnWidth: {
            name: 'max-column-width',
            control: {
                type: 'number'
            },
            defaultValue: 1000,
            description:
                'The maximum width for all columns. The default is 1000px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1000' },
                category: 'Display'
            }
        },
        maxRowSelection: {
            name: 'max-row-selection',
            control: {
                type: 'number'
            },
            defaultValue: 100,
            description:
                'The maximum number of rows that can be selected. Checkboxes are used for selection by default, and radio buttons are used when max-row-selection is 1.',
            table: {
                type: { summary: 'number' },
                category: 'Display'
            }
        },
        minColumnWidth: {
            name: 'min-column-width',
            control: {
                type: 'number'
            },
            defaultValue: 50,
            description:
                'The minimum width for all columns. The default is 50px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '50' },
                category: 'Display'
            }
        },
        resizeColumnDisabled: {
            name: 'resize-column-disabled',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, column resizing is disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        resizeStep: {
            name: 'resize-step',
            control: {
                type: 'number'
            },
            defaultValue: 10,
            description:
                'The width to resize the column when a user presses left or right arrow. The default is 10px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10' },
                category: 'Display'
            }
        },
        rowNumberOffset: {
            name: 'row-number-offset',
            control: {
                type: 'number'
            },
            defaultValue: 0,
            description:
                'Determines where to start counting the row number. The default is 0.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Display'
            }
        },
        selectedRows: {
            name: 'selected-rows',
            control: {
                type: 'object'
            },
            defaultValue: [],
            description:
                'Enables programmatic row selection with a list of key-field values.',
            table: {
                type: { summary: 'string[]' },
                category: 'Display'
            }
        },
        showRowNumberColumn: {
            name: 'show-row-number-column',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the row numbers are shown in the first column.',
            table: {
                type: { summary: 'string[]' },
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        sortedBy: {
            name: 'sorted-by',
            control: {
                type: 'text'
            },
            description:
                'The column fieldName that controls the sorting order. Sort the data using the onsort event handler.',
            table: {
                type: { summary: 'string' },
                category: 'Data'
            }
        },
        sortedDirection: {
            name: 'sorted-direction',
            control: {
                type: 'radio'
            },
            options: ['asc', 'desc'],
            defaultValue: 'asc',
            description:
                "Specifies the sorting direction. Sort the data using the onsort event handler. Valid options include 'asc' and 'desc'.",
            table: {
                type: { summary: 'string' },
                category: 'Data'
            }
        },
        suppressBottomBar: {
            name: 'suppress-bottom-bar',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the footer that displays the Save and Cancel buttons is hidden during inline editing.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        wrapTextMaxLines: {
            name: 'wrap-text-max-lines',
            description:
                'This value specifies the number of lines after which the content will be cut off and hidden. It must be at least 1 or more. The text in the last line is truncated and shown with an ellipsis.',
            table: {
                type: { summary: 'number' },
                category: 'Display'
            }
        },
        renderConfig: {
            name: 'render-config',
            description:
                'Reserved for internal use. Enables and configures advanced rendering modes.',
            table: {
                category: 'Display'
            }
        }
    }
};

const Template = (args) => Datatable(args);

export const DataTypesFromAToB = Template.bind({});
DataTypesFromAToB.args = {
    columns: columnsAB,
    data: dataAB,
    keyField: 'id',
    columnWidthsMode: 'auto'
};

export const DataTypesFromCToD = Template.bind({});
DataTypesFromCToD.args = {
    columns: columnsCD,
    data: dataCD,
    keyField: 'id',
    columnWidthsMode: 'auto',
    draftValues: [
        {
            colorPicker: '#76ded9',
            id: '1'
        },
        {
            currency: '3044',
            id: '3'
        }
    ],
    errors: {
        rows: {
            2: {
                title: 'Invalid',
                messages: ['The color picked is invalid.'],
                fieldNames: ['colorPicker']
            }
        }
    }
};
export const DataTypesFromEToN = Template.bind({});
DataTypesFromEToN.args = {
    columns: columnsEN,
    data: dataEN,
    keyField: 'id',
    columnWidthsMode: 'auto',
    hideCheckboxColumn: true
};

export const DataTypesFromOToQ = Template.bind({});
DataTypesFromOToQ.args = {
    columns: columnsOQ,
    data: dataOQ,
    keyField: 'id',
    columnWidthsMode: 'auto',
    selectedRows: ['2']
};

export const DataTypesFromRToZ = Template.bind({});
DataTypesFromRToZ.args = {
    columns: columnsRZ,
    data: dataRZ,
    keyField: 'id',
    columnWidthsMode: 'auto'
};

export const DatatableWithSummarizeTypes = Template.bind({});
DatatableWithSummarizeTypes.args = {
    columns: columnsSum,
    data: dataSum,
    keyField: 'id',
    columnWidthsMode: 'auto'
};

export const DatatableWithGroupBy = Template.bind({});
DatatableWithGroupBy.args = {
    columns: columnsGroupBy,
    data: dataGroupBy,
    keyField: 'id',
    columnWidthsMode: 'auto',
    groupBy: 'category'
};



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
                type: { summary: 'string' },
                category: 'Display'
            }
        },
        columnWidthsMode: {
            name: 'column-widths-mode',
            control: {
                type: 'radio'
            },
            options: ['fixed', 'auto'],
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
        expandedRows: {
            name: 'expanded-rows',
            control: {
                type: 'object'
            },
            description:
                'The array of unique row IDs for rows that are expanded.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
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
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        hideTableHeader: {
            name: 'hide-table-header',
            control: {
                type: 'boolean'
            },
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
            description:
                'If present, a spinner is displayed to indicate that more data is being loaded.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display'
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
                type: { summary: 'string' },
                category: 'Data'
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
                defaultValue: { summary: '1000' },
                category: 'Display'
            }
        },
        maxRowSelection: {
            name: 'max-row-selection',
            control: {
                type: 'number'
            },
            description:
                'The maximum number of rows that can be selected. Checkboxes are used for selection by default, and radio buttons are used when max-row-selection is 1.',
            table: {
                type: { summary: 'number' },
                category: 'Data'
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
                defaultValue: { summary: '50' },
                category: 'Display'
            }
        },
        records: {
            control: {
                type: 'object'
            },
            description: 'The array of data to be displayed.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
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
                defaultValue: { summary: 'false' },
                category: 'Display'
            }
        },
        resizeStep: {
            name: 'resize-step',
            control: {
                type: 'number'
            },
            description:
                'The width to resize the column when a user presses left or right arrow. The default is 10px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10px' },
                category: 'Display'
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
                defaultValue: { summary: '0' },
                category: 'Display'
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
                type: { summary: 'string[]' },
                category: 'Data'
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
                type: { summary: 'string[]' },
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
        }
    },
    args: {
        columnWidthsMode: 'fixed',
        hideCheckboxColumn: false,
        hideTableHeader: false,
        isLoading: false,
        loadMoreOffset: 20,
        maxColumnWidth: 1000,
        minColumnWidth: 50,
        resizeColumnDisabled: false,
        resizeStep: 10,
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

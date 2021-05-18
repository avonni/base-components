import { Datatable } from '../__examples__/datatable';
import { columns, data } from './data';

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
                defaultValue: { summary: 'fixed' }
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
        data: {
            control: {
                type: 'object'
            },
            description: 'The array of data to be displayed.',
            table: {
                type: { summary: 'object[]' }
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
                defaultValue: { summary: 'asc' }
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
                type: { summary: 'string[]' }
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
                defaultValue: { summary: 'false' }
            }
        },
        errors: {
            control: {
                type: 'object'
            },
            description:
                "Specifies an object containing information about cell level, row level, and table level errors. When it's set, error messages are displayed on the table accordingly.",
            table: {
                type: { summary: 'object' }
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
                defaultValue: { summary: 'false' }
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
                defaultValue: { summary: 'false' }
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
                defaultValue: { summary: 'false' }
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
                type: { summary: 'string' }
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
                defaultValue: { summary: '20' }
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
                defaultValue: { summary: '1000' }
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
                type: { summary: 'number' }
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
                defaultValue: { summary: '50' }
            }
        },
        renderConfig: {
            name: 'render-config',
            description:
                'Reserved for internal use. Enables and configures advanced rendering modes.'
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
                defaultValue: { summary: 'false' }
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
                defaultValue: { summary: '10' }
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
                defaultValue: { summary: '0' }
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
                type: { summary: 'string[]' }
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
                defaultValue: { summary: 'false' }
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
                type: { summary: 'string' }
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
                type: { summary: 'string' }
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
                defaultValue: { summary: 'false' }
            }
        },
        wrapTextMaxLines: {
            name: 'suppress-bottom-bar',
            control: {
                type: 'number'
            },
            description:
                'This value specifies the number of lines after which the content will be cut off and hidden. It must be at least 1 or more. The text in the last line is truncated and shown with an ellipsis.',
            table: {
                type: { summary: 'number' }
            }
        }
    }
};

const Template = (args) => Datatable(args);

export const Base = Template.bind({});
Base.args = {
    columns: columns,
    data: data,
    keyField: 'id'
};

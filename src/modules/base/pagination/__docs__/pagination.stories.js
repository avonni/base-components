import { Pagination } from '../__examples__/pagination';

export default {
    title: 'Example/Pagination',
    argTypes: {
        align: {
            control: {
                type: 'select'
            },
            options: ['left', 'center', 'right', 'fill'],
            description:
                'Alignment of the page buttons. Values include left, center, right and fill.',
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
            table: {
                defaultValue: { summary: '...' },
                type: { summary: 'number' }
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
        align: 'left',
        disabled: false,
        ellipsisText: '...',
        limit: 5,
        nextButtonIconName: 'utility:chevronright',
        perPage: 20,
        previousButtonIconName: 'utility:chevronleft',
        totalRows: 0,
        value: 1
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

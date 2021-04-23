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
            description: 'Text of the button.',
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
                'The name of an icon to display after the text of the button.',
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
            description: 'Text of the button.',
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
                'The name of an icon to display after the text of the button.',
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
            description: 'Text of the button.',
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
                'The name of an icon to display after the text of the button.',
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
            description: 'Text of the button.',
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
                'The name of an icon to display after the text of the button.',
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

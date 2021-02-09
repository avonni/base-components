import { Pagination } from '../__examples__/pagination';

export default {
    title: 'Example/Pagination',
    argTypes: {
        align: {
            control: {
                type: 'select',
                options: ['left', 'center', 'right', 'fill']
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            }
        },
        value: {
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: '1' }
            }
        },
        limit: {
            control: {
                type: 'number',
                min: 3
            },
            defaultValue: 5,
            table: {
                defaultValue: { summary: '5' }
            }
        },
        perPage: {
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 20,
            table: {
                defaultValue: { summary: '20' }
            }
        },
        totalRows: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' }
            }
        },
        ellipsisText: {
            control: {
                type: 'text'
            },
            defaultValue: '...'
        },
        ellipsisClass: {
            control: {
                type: 'text'
            }
        },
        firstButtonLabel: {
            control: {
                type: 'text'
            }
        },
        firstButtonIconName: {
            control: {
                type: 'text'
            }
        },
        previousButtonLabel: {
            control: {
                type: 'text'
            }
        },
        previousButtonIconName: {
            control: {
                type: 'text'
            }
        },
        nextButtonLabel: {
            control: {
                type: 'text'
            }
        },
        nextButtonIconName: {
            control: {
                type: 'text'
            }
        },
        lastButtonLabel: {
            control: {
                type: 'text'
            }
        },
        lastButtonIconName: {
            control: {
                type: 'text'
            }
        },
    }
};

const Template = (args) => Pagination(args);

export const Base = Template.bind({});
Base.args = {
    totalRows: 100,
    previousButtonIconName: 'utility:chevronleft',
    nextButtonIconName: 'utility:chevronright'
};

import { InputRichText } from '../__examples__/inputRichText';

export default {
    title: 'Example/Input Rich Text',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        labelVisible: {
            name: 'label-visible',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        placeholder: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenBadInput: {
            name: 'message-when-bad-input',
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['top-toolbar', 'bottom-toolbar']
            },
            defaultValue: 'top-toolbar',
            table: {
                defaultValue: { summary: 'top-toolbar' },
                type: { summary: 'string' },
                category: 'Toolbar'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        isPublisher: {
            name: 'is-publisher',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Toolbar'
            }
        },
        disabledCategories: {
            name: 'disabled-categories',
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'string[]' },
                category: 'Toolbar'
            }
        },
        formats: {
            control: {
                type: 'object'
            },
            defaultValue: [],
            table: {
                type: { summary: 'string[]' },
                category: 'Toolbar'
            }
        }
    }
};

const Template = (args) => InputRichText(args);

export const Base = Template.bind({});

export const BottomToolbar = Template.bind({});
BottomToolbar.args = {
    label: 'Input with bottom toolbar',
    labelVisible: true,
    placeholder: 'Write here'
};

export const CustomToolbar = Template.bind({});
CustomToolbar.args = {
    label: 'Input with custom toolbar',
    labelVisible: true,
    formats: [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'table',
        'header',
        'color'
    ],
    placeholder: 'Write here',
    value: 'Note that disabled-categories takes precedence on formats',
    disabledCategories: ['FORMAT_TEXT']
};

export const Publisher = Template.bind({});
Publisher.args = {
    label: 'Publisher input',
    labelVisible: true,
    isPublisher: true,
    value: 'Note that the toolbar contains more actions.'
};

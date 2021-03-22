import { InputRichText } from '../__examples__/inputRichText';

export default {
    title: 'Example/Input Rich Text',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        value: {
            control: {
                type: 'text'
            }
        },
        placeholder: {
            control: {
                type: 'text'
            }
        },
        messageWhenBadInput: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['top-toolbar', 'bottom-toolbar']
            },
            defaultValue: 'top-toolbar',
            table: {
                defaultValue: { summary: 'top-toolbar' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        hideControls: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        labelVisible: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        disabledCategories: {
            control: {
                type: 'object'
            }
        },
        formats: {
            control: {
                type: 'object'
            },
            defaultValue: []
        }
    }
};

const Template = (args) => InputRichText(args);

export const Base = Template.bind({});

Base.args = {
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
        'link',
        'image',
        'clean',
        'table',
        'header',
        'color'
    ]
};

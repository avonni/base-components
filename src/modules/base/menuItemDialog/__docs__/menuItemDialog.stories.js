import { MenuItemDialog } from '../__examples__/menuItemDialog';

export default {
    title: 'Example/Menu Item Dialog (only with avonni-button-menu)',
    argTypes: {
        value: {
            control: {
                type: 'text'
            }
        },
        accessKey: {
            control: {
                type: 'text'
            }
        },
        draftAlternativeText: {
            control: {
                type: 'text'
            }
        },
        iconName: {
            control: {
                type: 'text'
            }
        },
        label: {
            control: {
                type: 'text'
            }
        },
        prefixIconName: {
            control: {
                type: 'text'
            }
        },
        tabIndex: {
            control: {
                type: 'text'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        isDraft: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => MenuItemDialog(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1',
    iconName: 'utility:delete',
    prefixIconName: 'utility:success'
};

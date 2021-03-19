import { MenuItemDialog } from '../__examples__/menuItemDialog';

export default {
    title: 'Example/Menu Item Dialog (only with avonni-button-menu)',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Text of the menu item.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'A value associated with the menu item. This value will be the same with dialog (dialog-name === value)',
            table: {
                type: { summary: 'string' }
            }
        },
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the menu item.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        draftAlternativeText: {
            name: 'draft-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Describes the reason for showing the draft indicator. This is required when is-draft is present on the lightning-menu-item tag.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display after the text of the menu item.',
            table: {
                type: { summary: 'string' }
            }
        },
        prefixIconName: {
            name: 'prefix-icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display before the text of the menu item.',
            table: {
                type: { summary: 'string' }
            }
        },
        tabIndex: {
            name: 'tab-index',
            control: {
                type: 'text'
            },
            description:
                'Reserved for internal use. Use tabindex instead to indicate if an element should be focusable. tabindex can be set to 0 or -1. The default tabindex value is 0, which means that the menu item is focusable and participates in sequential keyboard navigation. The value -1 means that the menu item is focusable but does not participate in keyboard navigation.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menu item is disabled and users cannot interact with it.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        isDraft: {
            name: 'is-draft',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a draft indicator is shown on the menu item. A draft indicator is denoted by blue asterisk on the left of the menu item. When you use a draft indicator, include alternative text for accessibility using draft-alternative-text.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    }
};

const Template = (args) => MenuItemDialog(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1',
    disabled: true
};

export const Icons = Template.bind({});
Icons.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1',
    iconName: 'utility:delete',
    prefixIconName: 'utility:success'
};

export const Draft = Template.bind({});
Draft.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1',
    isDraft: true,
    draftAlternativeText: 'This is the draft alternative text'
};

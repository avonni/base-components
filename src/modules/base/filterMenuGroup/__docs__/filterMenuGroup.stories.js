import { FilterMenuGroup } from '../__examples__/filterMenuGroup';
import { COLLAPSIBLE_MENUS, MENUS, ICONS_MENUS } from './data';

export default {
    title: 'Example/Filter Menu Group',
    argTypes: {
        menus: {
            control: {
                type: 'object'
            },
            description: 'Array of menu objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        applyButtonLabel: {
            name: 'apply-button-label',
            control: {
                type: 'text'
            },
            description: 'Label of the apply button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Apply' }
            }
        },
        resetButtonLabel: {
            name: 'reset-button-label',
            control: {
                type: 'text'
            },
            description: 'Label of the reset button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Reset' }
            }
        },
        hideApplyResetButtons: {
            name: 'hide-apply-reset-buttons',
            control: {
                type: 'boolean'
            },
            description: 'If present, the selected items are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        hideSelectedItems: {
            name: 'hide-selected-items',
            control: {
                type: 'boolean'
            },
            description: 'If present, the selected items are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isToggleButtonVariant: {
            name: 'is-toggle-button-variant',
            control: {
                type: 'boolean'
            },
            description:
                'If present, each menu will have its button variant toggled between the border and outline-brand variants',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        showSelectedFilterValueCount: {
            name: 'show-selected-filter-value-count',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the selected filter value and count are displayed in the label.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description:
                'Value of the menus. The object follows the structure { menuName: menuValue }.',
            table: {
                type: { summary: 'object' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description:
                'The variant changes the look of the menu group. Accepted variants include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    },
    args: {
        applyButtonLabel: 'Apply',
        hideApplyResetButtons: false,
        hideSelectedItems: false,
        isToggleButtonVariant: false,
        resetButtonLabel: 'Reset',
        showSelectedFilterValueCount: false,
        variant: 'horizontal'
    }
};

const Template = (args) => FilterMenuGroup(args);

export const Base = Template.bind({});
Base.args = {
    menus: MENUS
};

export const ButtonIcons = Template.bind({});
ButtonIcons.args = {
    menus: ICONS_MENUS,
    applyButtonLabel: 'Save',
    resetButtonLabel: 'Clear',
    value: {
        contact: 'email',
        languages: ['dutch', 'english'],
        price: [45, 67],
        publication: [new Date(2022, 11, 4, 13, 45)]
    }
};

export const Vertical = Template.bind({});
Vertical.args = {
    menus: MENUS,
    variant: 'vertical',
    value: {
        contact: 'email',
        languages: ['dutch', 'english'],
        price: [45, 67],
        publication: [new Date(2022, 11, 4, 13, 45)]
    }
};

export const CollapsibleVertical = Template.bind({});
CollapsibleVertical.args = {
    menus: COLLAPSIBLE_MENUS,
    variant: 'vertical',
    value: {
        contact: 'email',
        languages: ['dutch', 'english'],
        price: [45, 67],
        publication: [new Date(2022, 11, 4, 13, 45)]
    }
};

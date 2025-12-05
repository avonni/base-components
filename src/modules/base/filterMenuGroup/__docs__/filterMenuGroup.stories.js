import { FilterMenuGroup } from '../__examples__/filterMenuGroup';
import { COLLAPSIBLE_MENUS, ICONS_MENUS, MENUS } from './data';

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
        align: {
            name: 'align',
            control: {
                type: 'select'
            },
            options: ['left', 'center', 'right'],
            description:
                'Alignment of the menu group. Valid values include left, center, right. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
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
        hideApplyButton: {
            name: 'hide-apply-button',
            control: {
                type: 'boolean'
            },
            description: 'If present, the apply button is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        singleLine: {
            name: 'single-line',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menus are limited to one line for the horizontal variant.',
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
        },
        weekStartDay: {
            name: 'week-start-day',
            control: {
                type: 'number'
            },
            description:
                'Used by the `date-range` menu type. Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        }
    },
    args: {
        align: 'left',
        applyButtonLabel: 'Apply',
        hideApplyButton: false,
        hideApplyResetButtons: false,
        hideSelectedItems: false,
        resetButtonLabel: 'Reset',
        singleLine: false,
        variant: 'horizontal',
        weekStartDay: 0
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

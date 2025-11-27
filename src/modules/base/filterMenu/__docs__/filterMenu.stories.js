import { FilterMenu } from '../__examples__/filterMenu';
import { FilterMenuInfiniteLoading } from '../__examples__/infiniteLoading';
import { COLOR_ITEMS, ITEMS, NESTED_ITEMS } from './data';

export default {
    title: 'Example/Filter Menu',
    argTypes: {
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description:
                'The keyboard shortcut for the button menu (horizontal variant) or the checkbox group (vertical variant).',
            table: {
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The assistive text for the button menu. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' }
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
                defaultValue: { summary: 'Apply' },
                category: 'Button'
            }
        },
        buttonVariant: {
            name: 'button-variant',
            control: {
                type: 'select'
            },
            options: [
                'border',
                'bare',
                'container',
                'border-filled',
                'bare-inverse',
                'border-inverse',
                'outline-brand'
            ],
            description:
                'The button variant changes the look of the horizontal variant’s button. Accepted variants include bare, container, border, border-filled, outline-brand, bare-inverse, and border-inverse. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' },
                category: 'Button'
            }
        },
        closed: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the collapsible is closed. This attribute is only supported by the vertical variant.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        collapsible: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the headers are collapsible. This attribute is only supported by the vertical variant.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the menu cannot be used by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        dropdownAlignment: {
            name: 'dropdown-alignment',
            control: {
                type: 'select'
            },
            options: [
                'auto',
                'left',
                'center',
                'right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
            description:
                'Determines the alignment of the dropdown menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Dropdown menu'
            }
        },
        dropdownNubbin: {
            name: 'dropdown-nubbin',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a nubbin is present on the dropdown menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Dropdown menu'
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
                defaultValue: { summary: 'false' },
                category: 'Button'
            }
        },
        hideApplyResetButtons: {
            name: 'hide-apply-reset-buttons',
            control: {
                type: 'boolean'
            },
            description: 'If present, the apply and reset buttons are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Button'
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
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'. For the horizontal variant, if an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon. This value defaults to utility:down.",
            table: {
                type: { summary: 'string' },
                defaultValue: {
                    summary: 'utility:down',
                    detail: 'Only for horizontal variant'
                }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium or large. This value defaults to medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menu is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the menu is in the loading state.',
            table: {
                type: { summary: 'string' },
                category: 'Search'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of the filter menu.',
            table: {
                type: { summary: 'string' }
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
                defaultValue: { summary: 'Reset' },
                category: 'Button'
            }
        },
        showClearButton: {
            name: 'show-clear-button',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a clear button is displayed next to each filter.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Button'
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'Title of the button (horizontal variant) or the label (vertical variant).',
            table: {
                type: { summary: 'string' }
            }
        },
        tooltip: {
            control: {
                type: 'text'
            },
            description:
                'The tooltip is displayed on hover or focus on the button (horizontal variant), or on the help icon (vertical variant).',
            table: {
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['date-range', 'list', 'range', 'time-range'],
            description:
                'Type of the filter menu. Valid values include list, range, date-range and time-range.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'list' }
            }
        },
        typeAttributes: {
            name: 'type-attributes',
            control: {
                type: 'object'
            },
            description: 'Attributes specific to the type.',
            table: {
                type: { summary: 'object' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description: "Array of selected item's values.",
            table: {
                type: { summary: 'string[]' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description:
                'The variant changes the look of the menu. Accepted variants include horizontal and vertical.',
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
                'Used by the `date-range` type. Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        }
    },
    args: {
        applyButtonLabel: 'Apply',
        buttonVariant: 'border',
        closed: false,
        collapsible: false,
        disabled: false,
        dropdownAlignment: 'left',
        dropdownNubbin: false,
        hideApplyButton: false,
        hideApplyResetButtons: false,
        hideSelectedItems: false,
        iconSize: 'medium',
        isLoading: false,
        loadingStateAlternativeText: 'Loading...',
        resetButtonLabel: 'Clear selection',
        showClearButton: false,
        type: 'list',
        variant: 'horizontal',
        weekStartDay: 0
    }
};

const Template = (args) => FilterMenu(args);
const InfiniteLoadingTemplate = (args) => FilterMenuInfiniteLoading(args);

export const Base = Template.bind({});
Base.args = {
    typeAttributes: { items: ITEMS }
};

export const NestedItems = Template.bind({});
NestedItems.args = {
    typeAttributes: {
        allowSearch: true,
        isMultiSelect: true,
        hasNestedItems: true,
        items: NESTED_ITEMS
    },
    label: 'Nested Items',
    value: ['oceania', 'burundi', 'burkina-faso']
};

export const MultiSelectList = Template.bind({});
MultiSelectList.args = {
    typeAttributes: {
        allowSearch: true,
        isMultiSelect: true,
        items: ITEMS
    },
    value: ['item-5', 'meeting', 'wrong-value']
};

export const CustomMenu = Template.bind({});
CustomMenu.args = {
    typeAttributes: {
        dropdownLength: '5-items',
        dropdownWidth: 'xx-small',
        items: COLOR_ITEMS
    },
    iconSize: 'x-small',
    iconName: 'utility:apps',
    dropdownNubbin: true,
    hideApplyResetButtons: true
};

export const DateRange = Template.bind({});
DateRange.args = {
    typeAttributes: {
        labelStartDate: 'Start',
        labelEndDate: 'End'
    },
    weekStartDay: 1,
    buttonVariant: 'container',
    resetButtonLabel: 'Clear',
    applyButtonLabel: 'Save',
    label: 'Dates',
    type: 'date-range',
    value: [new Date(2022, 10, 16, 11), new Date(2022, 10, 20, 15, 30)]
};

export const Range = Template.bind({});
Range.args = {
    typeAttributes: {
        max: 30,
        min: 6,
        showPin: true,
        step: 2,
        tickMarkStyle: 'dot',
        showTickMarks: true,
        unit: 'currency',
        unitAttributes: {
            currencyCode: 'EUR'
        }
    },
    iconName: 'utility:money',
    type: 'range'
};

export const TimeRange = Template.bind({});
TimeRange.args = {
    typeAttributes: {
        labelStartTime: 'Start',
        labelEndTime: 'End'
    },
    buttonVariant: 'container',
    resetButtonLabel: 'Clear',
    applyButtonLabel: 'Save',
    label: 'Times',
    type: 'time-range',
    value: ['08:30:00.000', '17:00:00.000']
};

export const Vertical = Template.bind({});
Vertical.args = {
    typeAttributes: {
        allowSearch: true,
        isMultiSelect: true,
        items: ITEMS
    },
    variant: 'vertical',
    label: 'Contact',
    iconName: 'custom:custom22',
    iconSize: 'small'
};

export const VerticalWithNestedItems = Template.bind({});
VerticalWithNestedItems.args = {
    typeAttributes: {
        allowSearch: true,
        isMultiSelect: true,
        hasNestedItems: true,
        items: NESTED_ITEMS
    },
    variant: 'vertical',
    label: 'Vertical With Nested Items',
    value: ['oceania', 'burundi', 'burkina-faso']
};

export const InfiniteLoading = InfiniteLoadingTemplate.bind({});
InfiniteLoading.args = {
    label: 'Infinite Loading',
    typeAttributes: {
        allowSearch: true,
        isMultiSelect: true,
        enableInfiniteLoading: true
    },
    hideSelectedItems: true
};

export const VerticalInfiniteLoading = InfiniteLoadingTemplate.bind({});
VerticalInfiniteLoading.args = {
    label: 'Vertical Infinite Loading',
    typeAttributes: {
        allowSearch: true,
        isMultiSelect: true,
        enableInfiniteLoading: true,
        dropdownLength: '7-items'
    },
    variant: 'vertical'
};

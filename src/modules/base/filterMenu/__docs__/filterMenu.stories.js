import { FilterMenu } from '../__examples__/filterMenu';

export default {
    title: 'Example/Filter Menu',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:down',
            description:
                'The name of the icon to be used in the format "utility:down". If an icon other than "utility:down" or "utility:chevrondown" is used, a utility:down icon is appended to the right of that icon. This value defaults to utility:down.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:down' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium or large. This value defaults to medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, the menu cannot be opened by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If true, the menu is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search'
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
        items: {
            control: {
                type: 'object'
            },
            description: 'Array of item objects',
            table: {
                type: { summary: 'object[]' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description: "Array of selected items' values.",
            table: {
                type: { summary: 'string[]' }
            }
        },
        buttonVariant: {
            control: {
                type: 'select'
            },
            options: [
                'border',
                'bare',
                'container',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
            defaultValue: 'border',
            description:
                'Changes the look of the button. Accepted values include bare, container, border, border-filled, bare-inverse, and border-inverse. This value defaults to border.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            defaultValue: 'horizontal',
            description:
                'Changes the look of the filter menu. Accepted values include vertical or horizontal.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'Displays tooltip text when the mouse moves over the button menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        tooltip: {
            control: {
                type: 'text'
            },
            description:
                'Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.',
            table: {
                type: { summary: 'string' }
            }
        },
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the button menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text for the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        hideSelectedItems: {
            name: 'hide-selected-items',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, the selected items are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        searchInputPlaceholder: {
            name: 'search-input-placeholder',
            control: {
                type: 'text'
            },
            defaultValue: 'Search...',
            description:
                'Text that is displayed when the field is empty, to prompt the user for a valid entry.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Search...' },
                category: 'Search'
            }
        },
        showSearchBox: {
            name: 'show-search-box',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, the search box is visible.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search'
            }
        },
        submitButtonLabel: {
            name: 'submit-button-label',
            control: {
                type: 'text'
            },
            defaultValue: 'Apply',
            description: 'Label of the submit button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Apply' },
                category: 'Search'
            }
        },
        resetButtonLabel: {
            name: 'reset-button-label',
            control: {
                type: 'text'
            },
            defaultValue: 'Reset',
            description: 'Label of the reset button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Reset' },
                category: 'Search'
            }
        },
        menuAlignment: {
            name: 'menu-alignment',
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
            defaultValue: 'left',
            description:
                'Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space. This value defaults to left.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Dropdown menu'
            }
        },
        menuWidth: {
            name: 'menu-width',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            defaultValue: 'small',
            description:
                'Width of the dropdown menu. Valid values include xx-small, x-small, small, medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' },
                category: 'Dropdown menu'
            }
        },
        menuLength: {
            name: 'menu-length',
            control: {
                type: 'select'
            },
            options: ['5-items', '7-items', '10-items'],
            defaultValue: '7-items',
            description:
                'Maximum length of the dropdown menu. Valid values include 5-items, 7-items and 10-items.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '7-items' },
                category: 'Dropdown menu'
            }
        },
        nubbin: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If true, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Dropdown menu'
            }
        }
    }
};

const items = [
    {
        label: 'Call',
        value: 'call',
        prefixIconName: 'standard:call',
        iconName: 'utility:voicemail_drop'
    },
    {
        label: 'Email',
        value: 'email',
        prefixIconName: 'standard:email'
    },
    {
        label: 'Meeting',
        value: 'meeting',
        prefixIconName: 'standard:service_appointment',
        disabled: true
    },
    {
        label: 'Other',
        value: 'other',
        prefixIconName: 'standard:all'
    },
    {
        label: 'Menu item 5',
        value: 'item-5'
    },
    {
        label: 'Menu item 6',
        value: 'item-6'
    },
    {
        label: 'Menu item 7',
        value: 'item-7'
    }
];

const Template = (args) => FilterMenu(args);

export const Base = Template.bind({});
Base.args = {
    items: items
};

export const Vertical = Template.bind({});
Vertical.args = {
    items: items,
    variant: 'vertical',
    label: 'Contact'
};

export const ShowSearch = Template.bind({});
ShowSearch.args = {
    items: items,
    showSearchBox: true
};

export const Disabled = Template.bind({});
Disabled.args = {
    items: items,
    disabled: true
};

export const ContainerVariantWithCustomButtonLabels = Template.bind({});
ContainerVariantWithCustomButtonLabels.args = {
    items: items,
    buttonVariant: 'container',
    label: 'Open menu',
    resetButtonLabel: 'Erase',
    submitButtonLabel: 'Save'
};

export const XSmallIcon = Template.bind({});
XSmallIcon.args = {
    items: items,
    iconSize: 'x-small',
    iconName: 'utility:apps',
    value: ['item-5', 'meeting', 'wrong-value']
};

export const Loading = Template.bind({});
Loading.args = {
    items: items,
    isLoading: true,
    tooltip: 'is-loading is set to true'
};

export const LargeWidthAndNubbin = Template.bind({});
LargeWidthAndNubbin.args = {
    items: items,
    menuWidth: 'large',
    nubbin: true
};

export const FiveItemsLengthNoSearchBox = Template.bind({});
FiveItemsLengthNoSearchBox.args = {
    items: items,
    menuLength: '5-items'
};

import { FilterMenu } from '../__examples__/filterMenu';

export default {
    title: 'Example/FilterMenu',
    argTypes: {
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
                defaultValue: { summary: 'false' }
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
                type: { summary: 'string' }
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
        value: {
            control: {
                type: 'object'
            },
            description: "Array of selected items' values.",
            table: {
                type: { summary: 'string[]' }
            }
        },
        variant: {
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
                'The variant changes the look of the button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse. This value defaults to border.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
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
                defaultValue: { summary: 'Search...' }
            }
        },
        hideSearchBox: {
            name: 'hide-search-box',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, the search box is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
                defaultValue: { summary: 'Apply' }
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
                defaultValue: { summary: 'Reset' }
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
                defaultValue: { summary: 'left' }
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
                defaultValue: { summary: 'small' }
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
                defaultValue: { summary: '7-items' }
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
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => FilterMenu(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Base filter menu'
};

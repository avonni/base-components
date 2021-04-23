import { DynamicMenu } from '../__examples__/dynamicMenu';

export default {
    title: 'Example/Dynamic Menu',
    argTypes: {
        value: {
            control: {
                type: 'text'
            },
            description:
                'The value for the button element. This value is optional and can be used when submitting a form.',
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
        label: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the button.',
            table: {
                type: { summary: 'string' }
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
        searchInputPlaceholder: {
            name: 'search-input-placeholder',
            control: {
                type: 'text'
            },
            defaultValue: 'Search…',
            description:
                'Text that is displayed when the field is empty, to prompt the user for a valid entry.',
            table: {
                defaultValue: { summary: 'Search…' },
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
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'container',
                'brand',
                'border',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
            defaultValue: 'border',
            description:
                'The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        },
        menuAlignment: {
            name: 'menu-alignement',
            control: {
                type: 'select'
            },
            options: [
                'left',
                'center',
                'right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
            defaultValue: 'left',
            description:
                'Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        withSearch: {
            name: 'with-search',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, display search box.',
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
            defaultValue: 0,
            description:
                'If present, the menu is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, the menu can be opened by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description:
                'Fields: label, meta, id, value, avatar : {fallbackIconName, initials, src, alternativeText, size, variant}',
            table: {
                type: { summary: 'object[]' }
            }
        }
    },
    args: {
        withSearch: false,
        isLoading: false,
        disabled: false
    }
};

const items = [
    {
        label: 'Acme',
        meta: ['Account', 'San Francisco'],
        id: 0,
        value: 'acme',
        avatar: {
            fallbackIconName: 'standard:account',
            alternativeText: 'Account'
        }
    },
    {
        label: 'Remo',
        meta: ['Contact', 'San Francisco'],
        id: 1,
        value: 'remo',
        avatar: {
            fallbackIconName: 'standard:contact',
            alternativeText: 'Contact'
        }
    },
    {
        label: 'Niko',
        meta: ['Lead', 'San Francisco'],
        id: 2,
        value: 'niko',
        avatar: {
            fallbackIconName: 'standard:lead',
            alternativeText: 'Lead'
        }
    }
];

const Template = (args) => DynamicMenu(args);

export const Base = Template.bind({});
Base.args = {
    items: items,
    iconName: 'utility:favorite'
};

export const BaseWithSearch = Template.bind({});
BaseWithSearch.args = {
    items: items,
    iconName: 'utility:favorite',
    withSearch: 'true'
};

export const Disabled = Template.bind({});
Disabled.args = {
    items: items,
    iconName: 'utility:favorite',
    disabled: 'true'
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    items: items,
    iconName: 'utility:favorite',
    isLoading: 'true'
};

export const BaseWithLabel = Template.bind({});
BaseWithLabel.args = {
    items: items,
    label: 'Menu',
    iconName: 'utility:favorite'
};

export const BorderFilled = Template.bind({});
BorderFilled.args = {
    items: items,
    iconName: 'utility:add',
    variant: 'border-filled'
};

export const Bare = Template.bind({});
Bare.args = {
    items: items,
    iconName: 'utility:add',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.args = {
    items: items,
    iconName: 'utility:favorite',
    variant: 'bare-inverse'
};

export const Container = Template.bind({});
Container.args = {
    items: items,
    alternativeText: 'Display Menu',
    iconName: 'utility:add',
    variant: 'container'
};

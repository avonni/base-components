import { DynamicMenu } from '../__examples__/dynamicMenu';
import { DynamicMenuInGroup } from '../__examples__/dynamicMenuInGroup';
import { ListView } from '../__examples__/listView';
import { baseItems, listViewItems } from '../__docs__/data';

export default {
    title: 'Example/Dynamic Menu',
    argTypes: {
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
        allowSearch: {
            name: 'allow-search',
            control: {
                type: 'boolean'
            },
            description: 'If present, display search box.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        buttonSize: {
            name: 'button-size',
            control: {
                type: 'radio'
            },
            options: ['auto', 'stretch'],
            description:
                'Size of the button. Available options include auto and stretch.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'auto' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the menu can be opened by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        hideCheckMark: {
            name: 'hide-check-mark',
            control: {
                type: 'boolean'
            },
            description: 'If present, hide the check mark when selected.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
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
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'The position of the icon if present with label. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the button-icon. Valid values include xx-small, x-small, medium, or large.',
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
                defaultValue: { summary: 'false' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description:
                'Fields: label, meta, value, avatar : {fallbackIconName, initials, src, alternativeText, size, variant}',
            table: {
                type: { summary: 'object[]' }
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
        menuAlignment: {
            name: 'menu-alignment',
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
            description:
                'Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        menuLength: {
            name: 'menu-length',
            control: {
                type: 'select'
            },
            options: ['5-items', '7-items', '10-items'],
            description:
                'Maximum length of the dropdown menu. Valid values include 5-items, 7-items and 10-items.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '7-items' }
            }
        },
        menuWidth: {
            name: 'menu-width',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'Minimum width of the menu. Valid values include xx-small, x-small, small, medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' }
            }
        },
        nubbin: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.',
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
            description:
                'Text that is displayed when the field is empty, to prompt the user for a valid entry.',
            table: {
                defaultValue: { summary: 'Search…' },
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
                type: 'text'
            },
            description:
                'The value for the button element. This value is optional and can be used when submitting a form.',
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
                'bare-inverse',
                'base',
                'border',
                'border-filled',
                'border-inverse',
                'brand',
                'brand-outline',
                'container',
                'destructive',
                'destructive-text',
                'inverse',
                'neutral',
                'reset',
                'success'
            ],
            description:
                'The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled, border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral, reset and success.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        }
    },
    args: {
        allowSearch: false,
        alternativeText: 'My Favorites',
        buttonSize: 'auto',
        disabled: false,
        hideCheckMark: false,
        iconPosition: 'left',
        iconSize: 'medium',
        isLoading: false,
        menuAlignment: 'left',
        menuLength: '7-items',
        menuWidth: 'small',
        nubbin: false,
        searchInputPlaceholder: 'Search…',
        variant: 'border'
    }
};

const Template = (args) => DynamicMenu(args);
const TemplateInGroup = (args) => DynamicMenuInGroup(args);
const TemplateListView = (args) => ListView(args);

export const Base = Template.bind({});
Base.args = {
    items: baseItems,
    iconName: 'utility:favorite',
    buttonSize: 'stretch'
};

export const BaseWithSearch = Template.bind({});
BaseWithSearch.args = {
    items: baseItems,
    iconName: 'utility:favorite',
    allowSearch: true
};

export const Disabled = Template.bind({});
Disabled.args = {
    items: baseItems,
    iconName: 'utility:favorite',
    disabled: true
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    items: baseItems,
    iconName: 'utility:favorite',
    isLoading: true
};

export const BaseWithLabel = Template.bind({});
BaseWithLabel.args = {
    items: baseItems,
    label: 'Menu',
    iconName: 'utility:favorite'
};

export const Stretched = Template.bind({});
Stretched.args = {
    items: baseItems,
    label: 'Menu',
    iconName: 'utility:alert',
    buttonSize: 'stretch'
};

export const BorderFilled = Template.bind({});
BorderFilled.args = {
    items: baseItems,
    iconName: 'utility:add',
    variant: 'border-filled'
};

export const Bare = Template.bind({});
Bare.args = {
    items: baseItems,
    iconName: 'utility:add',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.args = {
    items: baseItems,
    iconName: 'utility:favorite',
    variant: 'bare-inverse'
};

export const Container = Template.bind({});
Container.args = {
    items: baseItems,
    alternativeText: 'Display Menu',
    iconName: 'utility:add',
    variant: 'container'
};

export const ListViewStory = TemplateListView.bind({});
ListViewStory.args = {
    alternativeText: 'List Views',
    iconName: 'utility:down',
    iconPosition: 'right',
    items: listViewItems,
    label: 'Recently Viewed',
    variant: 'reset',
    value: 'all-accounts'
};

export const ListViewStoryBorder = TemplateListView.bind({});
ListViewStoryBorder.args = {
    alternativeText: 'List Views',
    iconName: 'utility:down',
    iconPosition: 'right',
    items: listViewItems,
    label: 'Recently Viewed',
    nubbin: true,
    value: 'all-accounts'
};

export const ListViewStoryBare = TemplateListView.bind({});
ListViewStoryBare.args = {
    alternativeText: 'List Views',
    iconName: 'utility:down',
    iconPosition: 'right',
    items: listViewItems,
    label: 'Recently Viewed',
    value: 'all-accounts',
    variant: 'bare',
    allowSearch: true
};

export const InButtonGroup = TemplateInGroup.bind({});
InButtonGroup.args = {
    items: baseItems,
    label: 'Dynamic menu'
};

import { RelationshipGraph } from '../__examples__/relationshipGraph';
import { groupActions, groups, itemActions, actions } from './data';

export default {
    title: 'Example/Relationship Graph',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Root label.',
            type: { required: true },
            table: {
                type: { summary: 'string' }
            }
        },
        avatarSrc: {
            name: 'avatar-src',
            control: {
                type: 'text'
            },
            description:
                'Image URL for the avatar of the root item. If present, the avatar is displayed before the label.',
            table: {
                type: { summary: 'string' }
            }
        },
        avatarFallbackIconName: {
            name: 'avatar-fallback-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used as a fallback when the root avatar image fails to load. \nSpecify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        href: {
            control: {
                type: 'text'
            },
            description: 'URL for the root label link.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'radio'
            },
            options: ['vertical', 'horizontal'],
            description: 'Valid values include horizontal, vertical.',
            defaultValue: 'horizontal',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        },
        actions: {
            control: {
                type: 'object'
            },
            description: 'Array of root actions.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        selectedItemName: {
            name: 'selected-item-name',
            control: {
                type: 'text'
            },
            description: 'Name of the selected item.',
            table: {
                type: { summary: 'string' }
            }
        },
        groups: {
            control: {
                type: 'object'
            },
            description: 'Array of item groups.',
            table: {
                type: { summary: 'object[]' },
                category: 'Groups'
            }
        },
        groupActions: {
            name: 'group-actions',
            control: {
                type: 'object'
            },
            description: 'Array of default actions for all groups.',
            table: {
                type: { summary: 'object[]' },
                category: 'Groups'
            }
        },
        groupActionsPosition: {
            name: 'group-actions-position',
            control: {
                type: 'radio'
            },
            options: ['top', 'bottom'],
            defaultValue: 'top',
            description: 'Array of default actions for all groups.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top' },
                category: 'Groups'
            }
        },
        groupTheme: {
            name: 'group-theme',
            control: {
                type: 'select'
            },
            options: ['default', 'shade', 'inverse'],
            defaultValue: 'default',
            description:
                'Theme of the item groups tiles. Valid options include: ‘default’, ‘shade’ and ‘inverse’.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
                category: 'Groups'
            }
        },
        itemActions: {
            name: 'item-actions',
            control: {
                type: 'object'
            },
            description: 'Array of default actions for all items.',
            table: {
                type: { summary: 'object[]' },
                category: 'Items'
            }
        },
        itemTheme: {
            name: 'item-theme',
            control: {
                type: 'select'
            },
            options: ['default', 'shade', 'inverse'],
            defaultValue: 'default',
            description:
                'Theme of the item tiles. Valid options include: ‘default’, ‘shade’ and ‘inverse’.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
                category: 'Items'
            }
        },
        shrinkIconName: {
            name: 'shrink-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevrondown',
            description: 'Icon used to shrink an expanded group of items.',
            table: {
                type: { summary: 'object[]' },
                defaultValue: { summary: 'utility:chevrondown' },
                category: 'Groups'
            }
        },
        expandIconName: {
            name: 'expand-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevronright',
            description: 'Icon used to expand a closed group of items.',
            table: {
                type: { summary: 'object[]' },
                defaultValue: { summary: 'utility:chevronright' },
                category: 'Groups'
            }
        },
        hideItemsCount: {
            name: 'hide-items-count',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, the number of items per group is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Groups'
            }
        }
    },
    args: {
        hideItemsCount: false
    }
};

const Template = (args) => RelationshipGraph(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Root label',
    groups: groups
};

export const SelectedItem = Template.bind({});
SelectedItem.args = {
    label: 'Root label',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
    groups: groups,
    selectedItemName: 'mary-james',
    groupActions: groupActions,
    groupActionsPosition: 'bottom',
    hideItemsCount: true
};

export const InverseTheme = Template.bind({});
InverseTheme.args = {
    label: 'Root label',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    href: 'https://www.avonni.app/',
    actions: actions,
    groups: groups,
    groupActions: groupActions,
    itemActions: itemActions,
    groupTheme: 'inverse',
    itemTheme: 'inverse',
    hideItemsCount: true
};

export const MixedThemes = Template.bind({});
MixedThemes.args = {
    label: 'Root label',
    avatarFallbackIconName: 'standard:user',
    actions: actions,
    groups: groups,
    groupActions: groupActions,
    itemActions: itemActions,
    groupTheme: 'shade',
    itemTheme: 'default',
    groupActionsPosition: 'bottom'
};

export const Vertical = Template.bind({});
Vertical.args = {
    label: 'Root label',
    avatarFallbackIconName: 'standard:user',
    groups: groups,
    actions: actions,
    groupActions: groupActions,
    itemActions: itemActions,
    variant: 'vertical',
    selectedItemName: 'mary-james'
};

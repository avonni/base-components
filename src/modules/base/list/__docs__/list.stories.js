import { List } from '../__examples__/list';
import { InfiniteGrid } from '../__examples__/infiniteGrid';
import {
    checkListItems,
    items,
    itemsWithAvatars,
    itemsWithImages,
    itemsWithImagesAndAvatars,
    actions
} from './data';

export default {
    title: 'Example/List',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description: 'Array of actions',
            table: {
                type: { summary: 'object[]' },
                category: 'Base'
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Alternative text used to describe the list. If the list is sortable, it should describe its behavior, for example: "Sortable menu. Press spacebar to grab or drop an item. Press up and down arrow keys to change position. Press escape to cancel."',
            table: {
                type: { summary: 'string' },
                category: 'Alternative Text'
            }
        },
        cols: {
            control: { type: 'number', min: 1, max: 12 },
            description:
                'Default number of columns. Valid values include 1, 2, 3, 4, 6 and 12.',
            table: {
                type: { summary: 'number' },
                category: 'Columns'
            }
        },
        divider: {
            control: {
                type: 'select'
            },
            options: ['none', 'top', 'bottom', 'around'],
            description:
                'Position of the sortable icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                category: 'Base'
            }
        },
        enableInfiniteLoading: {
            name: 'enable-infinite-loading',
            control: {
                type: 'boolean'
            },
            description:
                'Enable infinite loading. When enabled, the list will load more items when the user scrolls to the bottom of the list.',
            table: {
                type: { summary: 'boolean' },
                category: 'Infinite Loading'
            }
        },
        fieldAttributes: {
            name: 'field-attributes',
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the list item fields.',
            table: {
                type: { summary: 'object' },
                category: 'Base'
            }
        },
        imageAttributes: {
            name: 'image-attributes',
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the list item images.',
            table: {
                type: { summary: 'object' },
                category: 'Base'
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description: 'Set to true to indicate that the list is loading.',
            table: {
                type: { summary: 'boolean' },
                category: 'Infinite Loading'
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description: 'Array of item objects.',
            table: {
                type: { summary: 'object[]' },
                category: 'Base'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the list.',
            table: {
                type: { summary: 'string' },
                category: 'Base'
            }
        },
        largeContainerCols: {
            name: 'large-container-cols',
            control: { type: 'number', min: 1, max: 12 },
            description:
                'Number of columns for large containers. Valid values include 1, 2, 3, 4, 6 and 12.',
            table: {
                type: { summary: 'number' },
                category: 'Columns'
            }
        },
        loadMoreOffset: {
            name: 'load-more-offset',
            control: {
                type: 'number'
            },
            description:
                "Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table. The default is 20.",
            table: {
                type: { summary: 'number' },
                category: 'Infinite Loading'
            }
        },
        mediaActions: {
            name: 'media-actions',
            control: {
                type: 'object'
            },
            description: 'Array of actions',
            table: {
                type: { summary: 'object[]' },
                category: 'Base'
            }
        },
        mediumContainerCols: {
            name: 'medium-container-cols',
            control: { type: 'number', min: 1, max: 12 },
            description:
                'Number of columns for medium containers. Valid values include 1, 2, 3, 4, 6 and 12.',
            table: {
                type: { summary: 'number' },
                category: 'Columns'
            }
        },
        nextButtonAlternativeText: {
            name: 'next-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the next button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Next Items' },
                category: 'Alternative Text'
            }
        },
        previousButtonAlternativeText: {
            name: 'previous-button-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text for the previous button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Previous Items' },
                category: 'Alternative Text'
            }
        },
        showCheckCounter: {
            name: 'show-check-counter',
            control: {
                type: 'boolean'
            },
            description:
                'If present, displays the number of checked items out of the total.',
            table: {
                type: { summary: 'boolean' },
                category: 'Check List'
            }
        },
        smallContainerCols: {
            name: 'small-container-cols',
            control: { type: 'number', min: 1, max: 12 },
            description:
                'Number of columns for small containers. Valid values include 1, 2, 3, 4, 6 and 12.',
            table: {
                type: { summary: 'number' },
                category: 'Columns'
            }
        },
        sortable: {
            control: {
                type: 'boolean'
            },
            description:
                'If true, it will be possible to reorder the list items.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Sorting'
            }
        },
        sortableIconName: {
            name: 'sortable-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the sortable icon. \nNames are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Sorting'
            }
        },
        sortableIconPosition: {
            name: 'sortable-icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Position of the sortable icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'right' },
                category: 'Sorting'
            }
        },
        strikeThroughOnCheck: {
            name: 'strike-through-on-check',
            control: {
                type: 'boolean'
            },
            description: 'If present, strike through all checked items.',
            table: {
                type: { summary: 'boolean' },
                category: 'Check List'
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'check-list', 'single-line'],
            description: 'Variant of the list.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' },
                category: 'Base'
            }
        },
        visibleActions: {
            name: 'visible-actions',
            control: {
                type: 'number'
            },
            description:
                'The number of actions that appear as regular buttons.',
            table: {
                type: { summary: 'number' },
                category: 'Base'
            }
        },
        visibleMediaActions: {
            name: 'visible-media-actions',
            control: {
                type: 'number'
            },
            description:
                'The number of media actions that appear as regular buttons.',
            table: {
                type: { summary: 'number' },
                category: 'Base'
            }
        }
    },
    args: {
        cols: 1,
        nextButtonAlternativeText: 'Next Items',
        previousButtonAlternativeText: 'Previous Items',
        sortable: false,
        sortableIconPosition: 'right',
        variant: 'base'
    }
};

const Template = (args) => List(args);
const InfiniteGridTemplate = (args) => InfiniteGrid(args);

export const Base = Template.bind({});
Base.args = {
    items,
    sortable: true
};

export const DividerOnTop = Template.bind({});
DividerOnTop.args = {
    items,
    divider: 'top'
};

export const Images = Template.bind({});
Images.args = {
    items: itemsWithImages,
    imageAttributes: {
        fallbackSrc:
            'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
    }
};

export const Avatars = Template.bind({});
Avatars.args = {
    label: 'List with icons',
    items: itemsWithAvatars,
    divider: 'around'
};

export const SortableWithAvatarsAndSingleAction = Template.bind({});
SortableWithAvatarsAndSingleAction.args = {
    label: 'Sortable list with Icons and Single Action',
    items: itemsWithAvatars,
    actions: [actions[0]],
    sortableIconName: 'utility:drag_and_drop',
    sortableIconPosition: 'left',
    sortable: true,
    divider: 'top'
};

export const SortableWithImagesAndAvatars = Template.bind({});
SortableWithImagesAndAvatars.args = {
    label: 'Sortable list Images and Avatars with Icons',
    items: itemsWithImagesAndAvatars,
    actions: actions,
    sortableIconName: 'utility:drag_and_drop',
    sortableIconPosition: 'left',
    sortable: true,
    divider: 'around',
    fieldAttributes: {
        cols: 12,
        variant: 'label-inline'
    },
    imageAttributes: {
        size: 'medium'
    }
};

export const ColumnsWithImageBottom = Template.bind({});
ColumnsWithImageBottom.args = {
    label: 'Columns with Image Bottom',
    items: itemsWithImages,
    mediaActions: actions,
    divider: 'around',
    imageAttributes: {
        fallbackSrc:
            'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300',
        position: 'bottom',
        height: 100
    },
    cols: 1,
    smallContainerCols: 2,
    mediumContainerCols: 4,
    largeContainerCols: 6
};

export const ColumnsWithImageOverlay = Template.bind({});
ColumnsWithImageOverlay.args = {
    label: 'Columns with Image Overlay',
    items: itemsWithImages,
    actions: actions,
    mediaActions: [
        {
            name: 'event-action',
            iconName: 'utility:bookmark'
        }
    ],
    divider: 'around',
    imageAttributes: {
        fallbackSrc:
            'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300',
        position: 'overlay'
    },
    cols: 1,
    smallContainerCols: 3,
    mediumContainerCols: 4,
    largeContainerCols: 6
};

export const SingleLineWithInfiniteLoading = InfiniteGridTemplate.bind({});
SingleLineWithInfiniteLoading.args = {
    label: 'Single Line with infinite loading',
    variant: 'single-line',
    items: itemsWithImages,
    enableInfiniteLoading: true,
    divider: 'around',
    imageAttributes: {
        fallbackSrc:
            'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300',
        position: 'bottom'
    },
    cols: 1,
    smallContainerCols: 3,
    mediumContainerCols: 4
};

export const ColumnsWithInfiniteLoading = InfiniteGridTemplate.bind({});
ColumnsWithInfiniteLoading.args = {
    label: 'Columns with infinite loading',
    items: itemsWithImages,
    actions: actions,
    divider: 'around',
    imageAttributes: {
        fallbackSrc:
            'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300',
        position: 'top'
    },
    loadMoreOffset: 100,
    enableInfiniteLoading: true,
    cols: 1,
    smallContainerCols: 3,
    mediumContainerCols: 4
};

export const BaseWithInfiniteLoading = InfiniteGridTemplate.bind({});
BaseWithInfiniteLoading.args = {
    label: 'Sortable list with infinite loading',
    items,
    actions: actions,
    sortable: true,
    divider: 'around',
    enableInfiniteLoading: true
};

export const CheckList = Template.bind({});
CheckList.args = {
    label: 'Check List',
    items: checkListItems,
    variant: 'check-list',
    showCheckCounter: true,
    strikeThroughOnCheck: true,
    enableInfiniteLoading: true
};

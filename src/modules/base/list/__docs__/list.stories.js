/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { List } from '../__examples__/list';
import { InifiniteGrid } from '../__examples__/infiniteGrid';

export default {
    title: 'Example/List',
    argTypes: {
        action: {
            control: {
                type: 'object'
            },
            description: 'Array of actions',
            table: {
                type: { summary: 'object[]' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Alternative text used to describe the list. If the list is sortable, it should describe its behavior, for example: “Sortable menu. Press spacebar to grab or drop an item. Press up and down arrow keys to change position. Press escape to cancel.”',
            table: {
                type: { summary: 'string' }
            }
        },
        cols: {
            control: { type: 'number' },
            minimum: 1,
            maximum: 12,
            description: 'Default number of columns',
            table: {
                type: { summary: 'number' }
            }
        },
        smallContainerCols: {
            name: 'small-container-cols',
            control: { type: 'number' },
            minimum: 1,
            maximum: 12,
            description: 'Number of columns for small containers',
            table: {
                type: { summary: 'number' }
            }
        },
        mediumContainerCols: {
            name: 'medium-container-cols',
            control: { type: 'number' },
            minimum: 1,
            maximum: 12,
            description: 'Number of columns for medium containers',
            table: {
                type: { summary: 'number' }
            }
        },
        largeContainerCols: {
            name: 'large-container-cols',
            control: { type: 'number' },
            minimum: 1,
            maximum: 12,
            description: 'Number of columns for large containers',
            table: {
                type: { summary: 'number' }
            }
        },
        divider: {
            control: {
                type: 'select'
            },
            options: ['top', 'bottom', 'around'],
            description:
                'Position of the sortable icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' }
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
                type: { summary: 'boolean' }
            }
        },
        imageAttributes: {
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the list item images.',
            table: {
                type: { summary: 'object' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description: 'Set to true to indicate that the list is loading.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description: 'Array of item objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the list.',
            table: {
                type: { summary: 'string' }
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
                type: { summary: 'number' }
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
                type: { summary: 'boolean' }
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
                type: { summary: 'string' }
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
                defaultValue: { summary: 'right' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['list', 'grid']
        }
    },
    args: {
        sortable: false,
        sortableIconPosition: 'right'
    }
};

const Template = (args) => List(args);
const InifiniteGridTemplate = (args) => InifiniteGrid(args);

const items = [
    {
        label: 'Item 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: 'name-item-1'
    },
    {
        label: 'Item 2',
        href: '/path/to_somewhere',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: 'name-item-2'
    },
    {
        label: 'Item 3',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: 'name-item-3'
    },
    {
        label: 'Item 4',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: 'name-item-4'
    },
    {
        label: 'Item 5',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: 'name-item-5'
    }
];

const itemsWithImages = [
    {
        label: 'Item 1',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageSrc:
            'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        name: 'name-item-1'
    },
    {
        label: 'Item 2',
        href: '/path/to_somewhere',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageSrc:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDAyMjV8MHwxfGFsbHw1NHx8fHx8fDF8fDE2MjAyNTA3MjY&ixlib=rb-1.2.1&q=85',
        name: 'name-item-2'
    },
    {
        label: 'Item 3',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageSrc:
            'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
        name: 'name-item-3'
    },
    {
        label: 'Item 4',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: ['utility:share', 'utility:refresh'],
        imageSrc:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        name: 'name-item-4'
    },
    {
        label: 'Item 5',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: ['utility:share', 'utility:refresh'],
        imageSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300',
        name: 'name-item-5'
    }
];

const itemsWithAvatars = [
    {
        label: 'Item 1',
        avatar: {
            fallbackIconName: 'custom:custom5',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        name: 'name-item-1'
    },
    {
        label: 'Item 2',
        avatar: {
            fallbackIconName: 'custom:custom9'
        },
        name: 'name-item-2'
    },
    {
        label: 'Item 3',
        avatar: {
            fallbackIconName: 'custom:custom1',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
        },
        name: 'name-item-3'
    },
    {
        label: 'Item 4',
        avatar: {
            fallbackIconName: 'custom:custom11'
        },
        name: 'name-item-4'
    },
    {
        label: 'Item 5',
        avatar: {
            fallbackIconName: 'custom:custom51'
        },
        name: 'name-item-5'
    }
];

const itemsWithImagesAndAvatars = [
    {
        label: 'Item 1',
        avatar: {
            fallbackIconName: 'custom:custom5',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageSrc:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        name: 'name-item-1'
    },
    {
        label: 'Item 2',
        avatar: {
            fallbackIconName: 'custom:custom9',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        href: '/path/to_somewhere',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageSrc:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDAyMjV8MHwxfGFsbHw1NHx8fHx8fDF8fDE2MjAyNTA3MjY&ixlib=rb-1.2.1&q=85',
        name: 'name-item-2'
    },
    {
        label: 'Item 3',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        imageSrc:
            'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
        name: 'name-item-3'
    },
    {
        label: 'Item 4',
        avatar: {
            fallbackIconName: 'custom:custom11',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: ['utility:share', 'utility:refresh'],
        imageSrc:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        name: 'name-item-4'
    },
    {
        label: 'Item 5',
        avatar: {
            fallbackIconName: 'custom:custom1',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
        },
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [{ label: 'info 1', href: '' }],
        icons: ['utility:share'],
        imageSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300',
        name: 'name-item-5'
    }
];

const actions = [
    {
        label: 'Completed',
        name: 'completed-action',
        iconName: 'utility:check',
        disabled: false
    },
    {
        label: 'Pending',
        name: 'prending-action',
        iconName: 'utility:spinner',
        disabled: false
    },
    {
        label: 'Delete',
        name: 'delete-action',
        iconName: 'utility:delete',
        disabled: true
    }
];

export const Base = Template.bind({});
Base.args = {
    items
};

export const DividerOnTop = Template.bind({});
DividerOnTop.args = {
    items,
    divider: 'top'
};

export const Images = Template.bind({});
Images.args = {
    items: itemsWithImages
};

export const Avatars = Template.bind({});
Avatars.args = {
    label: 'List with icons',
    items: itemsWithAvatars,
    divider: 'around'
};

export const Actions = Template.bind({});
Actions.args = {
    label: 'List with actions menu',
    items,
    actions,
    divider: 'around'
};

export const Sortable = Template.bind({});
Sortable.args = {
    label: 'Sortable list',
    sortable: true,
    items,
    divider: 'around'
};

export const SortableWithAvatars = Template.bind({});
SortableWithAvatars.args = {
    label: 'Sortable list with icons',
    items: itemsWithAvatars,
    actions,
    sortableIconName: 'utility:drag_and_drop',
    sortableIconPosition: 'left',
    sortable: true,
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
    imageAttributes: {
        size: 'medium'
    }
};

export const SortableGridWithImagesAndAvatars = Template.bind({});
SortableGridWithImagesAndAvatars.args = {
    label: 'Sortable grid with Avatars and Icons',
    items: itemsWithAvatars,
    actions: actions,
    divider: 'around',
    imageAttributes: {
        size: 'medium'
    },
    variant: 'grid',
    cols: 1,
    smallContainerCols: 3
};

export const GridWithImages = Template.bind({});
GridWithImages.args = {
    label: 'Sortable grid with Avatars and Icons',
    items: itemsWithImages,
    actions: actions,
    imageAttributes: {
        cropPositionX: 100,
        cropPositionY: 0,
        cropFit: 'contain',
        size: 'medium'
    },
    variant: 'grid',
    cols: 1,
    smallContainerCols: 3,
    mediumContainerCols: 4,
    largeContainerCols: 6
};

export const GridCardWithImages = Template.bind({});
GridCardWithImages.args = {
    label: 'Sortable grid with Avatars and Icons',
    items: itemsWithImages,
    actions: actions,
    divider: 'around',
    imageAttributes: {
        size: 'medium'
    },
    variant: 'grid',
    cols: 1,
    smallContainerCols: 3,
    mediumContainerCols: 4,
    largeContainerCols: 6
};

export const InfiniteGrid = InifiniteGridTemplate.bind({});
InfiniteGrid.args = {
    label: 'Grid with infinite loading',
    items: itemsWithImages,
    actions: actions,
    divider: 'around',
    imageAttributes: {
        size: 'large'
    },
    loadMoreOffset: 100,
    enableInfiniteLoading: true,
    variant: 'grid',
    cols: 1,
    smallContainerCols: 3,
    mediumContainerCols: 4,
    largeContainerCols: 6
};

export const InfiniteList = InifiniteGridTemplate.bind({});
InfiniteList.args = {
    label: 'Grid with infinite loading',
    items,
    actions: actions,
    loadMoreOffset: 0,
    // divider: 'around',
    imageAttributes: {
        size: 'large'
    },
    enableInfiniteLoading: true
};

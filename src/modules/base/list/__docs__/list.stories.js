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
import { InfiniteGrid } from '../__examples__/infiniteGrid';
import {
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
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Alternative text used to describe the list. If the list is sortable, it should describe its behavior, for example: “Sortable menu. Press spacebar to grab or drop an item. Press up and down arrow keys to change position. Press escape to cancel.”',
            table: {
                type: { summary: 'string' },
                category: 'Base'
            }
        },
        cols: {
            control: { type: 'number', min: 1, max: 12 },
            description: 'Default number of columns',
            table: {
                type: { summary: 'number' },
                category: 'Columns'
            }
        },
        smallContainerCols: {
            name: 'small-container-cols',
            control: { type: 'number', min: 1, max: 12 },
            description: 'Number of columns for small containers',
            table: {
                type: { summary: 'number' },
                category: 'Columns'
            }
        },
        mediumContainerCols: {
            name: 'medium-container-cols',
            control: { type: 'number', min: 1, max: 12 },
            description: 'Number of columns for medium containers',
            table: {
                type: { summary: 'number' },
                category: 'Columns'
            }
        },
        largeContainerCols: {
            name: 'large-container-cols',
            control: { type: 'number', min: 1, max: 12 },
            description: 'Number of columns for large containers',
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
        mediaActions: {
            control: {
                type: 'object'
            },
            description: 'Array of actions',
            table: {
                type: { summary: 'object[]' },
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
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'single-line'],
            description: 'Variant of the list.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' },
                category: 'Base'
            }
        }
    },
    args: {
        sortable: false,
        sortableIconPosition: 'right',
        variant: 'base'
    }
};

const Template = (args) => List(args);
const InfiniteGridTemplate = (args) => InfiniteGrid(args);

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

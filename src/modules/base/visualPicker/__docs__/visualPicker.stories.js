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

import { VisualPicker } from '../__examples__/visualPicker';
import {
    items,
    itemsWithIcon,
    iconTiles,
    itemsWithPictures,
    itemsWithTags,
    analyticsItems,
    topAnalyticsItems,
    goalStories,
    botStories,
    avatarStories,
    xSmallAvatarStories,
    templates
} from './data';

export default {
    title: 'Example/VisualPicker',
    argTypes: {
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the visual picker is disabled and the user cannot with it. ',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validations'
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
        items: {
            control: {
                type: 'object'
            },
            description:
                'Array of items with attributes populating the visual picker.',
            table: {
                type: { summary: 'object' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label to title the visual picker.',
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when no item is selected and the required attribute is set to true.',
            table: {
                type: { summary: 'string' },
                category: 'Validations'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'The name of the visual picker.',
            type: { required: true },
            table: {
                type: { summary: 'string' }
            }
        },
        ratio: {
            control: {
                type: 'select'
            },
            options: ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'],
            description:
                'The ratio of the items. Valid values include 1-by-1, 4-by-3, 16-by-9, 3-by-4 and 9-by-16.',
            table: {
                defaultValue: { summary: '1-by-1' },
                type: { summary: 'string' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description: 'If present, at least one item must be selected.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validations'
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: [
                'xx-small',
                'x-small',
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large',
                'responsive'
            ],
            description:
                'The size of the items. Valid values include xx-small (4rem x 4 rem), x-small (6rem x 6 rem), small (8rem x 8rem), medium (12rem x 12rem), large (15rem x 15rem), x-large (18rem x 18rem), xx-large (21rem x 21rem) and responsive. Only avatar appears when x-small and xx-small.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['radio', 'checkbox'],
            description:
                'It defines the type of input. Valid values include radio and checkbox.',
            table: {
                defaultValue: { summary: 'radio' },
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description:
                "Value of the selected item. For the checkbox type, the value can be an array. Ex: [value1, value2], 'value1' or ['value1']",
            table: {
                type: { summary: 'string | string[]' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['coverable', 'non-coverable'],
            description:
                'Changes the appearance of the item when selected. Valid values include coverable and non-coverable.',
            table: {
                defaultValue: { summary: 'non-coverable' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disabled: false,
        hideCheckMark: false,
        ratio: '1-by-1',
        required: false,
        size: 'medium',
        type: 'radio',
        variant: 'non-coverable'
    }
};

const Template = (args) => VisualPicker(args);

export const Base = Template.bind({});
Base.args = {
    items: items,
    label: 'This is a label',
    name: 'base',
    value: 'lightning-professional'
};

export const BaseWithIcons = Template.bind({});
BaseWithIcons.args = {
    items: itemsWithIcon,
    label: 'This is a label',
    name: 'base',
    value: 'lightning-professional'
};

export const Coverable = Template.bind({});
Coverable.args = {
    items: itemsWithIcon,
    label: 'Coverable 4-by-3',
    name: 'coverable',
    ratio: '4-by-3',
    value: 'lightning-professional',
    variant: 'coverable'
};

export const CoverableNoMark = Template.bind({});
CoverableNoMark.args = {
    hideCheckMark: true,
    items: itemsWithIcon,
    label: 'Coverable 16-by-9 no mark',
    name: 'coverable',
    ratio: '16-by-9',
    size: 'large',
    value: 'lightning-professional',
    variant: 'coverable'
};

export const ItemsWithTags = Template.bind({});
ItemsWithTags.args = {
    name: 'with-tags',
    items: itemsWithTags,
    size: 'large'
};

export const NoMarkDoubleExtraSmall = Template.bind({});
NoMarkDoubleExtraSmall.args = {
    hideCheckMark: true,
    items: itemsWithIcon,
    label: 'Double extra small no mark',
    name: 'xx-small',
    size: 'xx-small',
    value: 'lightning-enterprise'
};

export const IconTiles = Template.bind({});
IconTiles.args = {
    items: iconTiles,
    label: 'Choose an icon',
    name: 'icon-tiles',
    ratio: '3-by-4',
    size: 'small'
};

export const ItemsWithPictures = Template.bind({});
ItemsWithPictures.args = {
    items: itemsWithPictures,
    name: 'with-pictures',
    ratio: '3-by-4'
};

export const analyticItems = Template.bind({});
analyticItems.args = {
    items: analyticsItems,
    label: 'All Templates',
    name: 'analytic-items',
    size: 'xx-large'
};

export const analyticItemsTop = Template.bind({});
analyticItemsTop.args = {
    items: topAnalyticsItems,
    label: 'All Templates',
    name: 'analytic-items',
    ratio: '3-by-4',
    size: 'xx-large',
    type: 'checkbox',
    value: ['approval-analytics', 'commerce-analytics']
};

export const GoalStory = Template.bind({});
GoalStory.args = {
    items: goalStories,
    label: 'What is the goal of your story',
    name: 'goal-story',
    size: 'responsive'
};

export const BotStory = Template.bind({});
BotStory.args = {
    items: botStories,
    label: 'Select a bot',
    name: 'bot-story',
    size: 'responsive'
};

export const AvatarStory = Template.bind({});
AvatarStory.args = {
    items: avatarStories,
    label: 'Select an avatar',
    name: 'avatar-story',
    ratio: '4-by-3',
    size: 'large'
};

export const X_SmallAvatarStory = Template.bind({});
X_SmallAvatarStory.args = {
    items: xSmallAvatarStories,
    label: 'Select an avatar',
    name: 'small-avatar-story',
    size: 'x-small'
};

export const Templates = Template.bind({});
Templates.args = {
    items: templates,
    size: 'xx-large',
    label: 'Recommended Templates',
    name: 'templates'
};

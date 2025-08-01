import { VisualPicker } from '../__examples__/visualPicker';
import { InfiniteLoadingVisualPicker } from '../__examples__/infiniteLoading';
import { InfiniteLoadingUsingShowMoreVisualPicker } from '../__examples__/infiniteLoadingUsingShowMore';
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
    templates,
    itemsWithFields,
    fieldAttributes
} from './data';

export default {
    title: 'Example/Visual Picker',
    argTypes: {
        collapsedShowMoreButton: {
            name: 'collapsed-show-more-button',
            control: {
                type: 'text'
            },
            description:
                'The label for the show more button when the items are collapsed.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show more' }
            }
        },
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
        enableInfiniteLoading: {
            name: 'enable-infinite-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, you can load a subset of items and then display more when users scroll to the end of the picker. Use with the loadmore event to retrieve more items. If present, `max-count` is ignored.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        expandedShowMoreButton: {
            name: 'expanded-show-more-button',
            control: {
                type: 'text'
            },
            description:
                'The label for the show more button when the items are expanded.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show less' }
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
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a spinner is shown to indicate that more items are loading.',
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
        loadMoreOffset: {
            name: 'load-more-offset',
            control: {
                type: 'number'
            },
            description:
                'Determines when to trigger infinite loading based on how many pixels the scroll position is from the end of the picker.',
            table: {
                defaultValue: { summary: '20' },
                type: { summary: 'number' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the picker is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' }
            }
        },
        maxCount: {
            name: 'max-count',
            control: {
                type: 'number'
            },
            description:
                'Maximum of items allowed in the visible list. This attribute is ignored if `enable-infinite-loading` is present.',
            table: {
                type: { summary: 'number' }
            }
        },
        columnAttributes: {
            name: 'column-attributes',
            control: {
                type: 'object'
            },
            description:
                'An object of attributes for cols, smallContainerCols, mediumContainerCols and largeContainerCols.',
            table: {
                type: { summary: 'object' }
            }
        },
        fieldAttributes: {
            name: 'field-attributes',
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the item fields.',
            table: {
                type: { summary: 'object' }
            }
        },
        imageAttributes: {
            name: 'image-attributes',
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the item images.',
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
        max: {
            control: {
                type: 'number'
            },
            description: 'Maximum number of selected items.',
            table: {
                type: { summary: 'number' },
                category: 'Validations'
            }
        },
        messageWhenRangeOverflow: {
            name: 'message-when-range-overflow',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a range overflow is detected.',
            table: {
                type: { summary: 'string' },
                category: 'Validations'
            }
        },
        messageWhenRangeUnderflow: {
            name: 'message-when-range-underflow',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a range underflow is detected.',
            table: {
                type: { summary: 'string' },
                category: 'Validations'
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
        min: {
            control: {
                type: 'number'
            },
            description: 'Minimum number of selected options required.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
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
        requiredAlternativeText: {
            name: 'required-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The assistive text when the required attribute is set to true.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Required' },
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
        collapsedShowMoreButton: 'Show more',
        disabled: false,
        enableInfiniteLoading: false,
        expandedShowMoreButton: 'Show less',
        hideCheckMark: false,
        isLoading: false,
        loadMoreOffset: 20,
        loadingStateAlternativeText: 'Loading...',
        min: 0,
        name: 'visual-picker',
        ratio: '1-by-1',
        required: false,
        requiredAlternativeText: 'Required',
        size: 'medium',
        type: 'radio',
        variant: 'non-coverable'
    }
};

const Template = (args) => VisualPicker(args);
const TemplateInfiniteLoading = (args) => InfiniteLoadingVisualPicker(args);
const TemplateInfiniteLoadingUsingShowMore = (args) =>
    InfiniteLoadingUsingShowMoreVisualPicker(args);

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

export const NoMarkSmall = Template.bind({});
NoMarkSmall.args = {
    hideCheckMark: true,
    items: itemsWithIcon,
    label: 'Small no mark',
    name: 'small',
    size: 'small',
    value: 'lightning-enterprise'
};

export const IconTiles = Template.bind({});
IconTiles.args = {
    items: iconTiles,
    label: 'Choose an icon',
    name: 'icon-tiles',
    ratio: '1-by-1',
    size: 'small'
};

export const MaximumAndMinimum = Template.bind({});
MaximumAndMinimum.args = {
    items: iconTiles,
    label: 'Visual Picker with a Maximum and a Minimum',
    name: 'icon-tiles',
    ratio: '1-by-1',
    size: 'small',
    type: 'checkbox',
    min: 2,
    max: 4
};

export const ItemsWithPictures = Template.bind({});
ItemsWithPictures.args = {
    items: itemsWithPictures,
    name: 'with-pictures',
    ratio: '16-by-9',
    size: 'xx-large',
    imageAttributes: {
        cropFit: 'cover',
        position: 'overlay'
    }
};

export const ItemsWithFields = Template.bind({});
ItemsWithFields.args = {
    items: itemsWithFields,
    name: 'with-fields',
    size: 'xx-large',
    fieldAttributes: fieldAttributes
};

export const AnalyticItems = Template.bind({});
AnalyticItems.args = {
    items: analyticsItems,
    label: 'All Templates',
    name: 'analytic-items',
    size: 'xx-large'
};

export const AnalyticItemsTop = Template.bind({});
AnalyticItemsTop.args = {
    items: topAnalyticsItems,
    label: 'All Templates',
    name: 'analytic-items',
    ratio: '3-by-4',
    size: 'xx-large',
    type: 'checkbox',
    value: ['approval-analytics', 'commerce-analytics'],
    imageAttributes: {
        position: 'top'
    }
};

export const GoalStory = Template.bind({});
GoalStory.args = {
    items: goalStories,
    label: 'What is the goal of your story',
    name: 'goal-story',
    size: 'responsive',
    columnAttributes: {
        cols: 2,
        smallContainerCols: 2,
        mediumContainerCols: 4,
        largeContainerCols: 4
    }
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

export const SmallAvatarStory = Template.bind({});
SmallAvatarStory.args = {
    items: xSmallAvatarStories,
    label: 'Select an avatar',
    name: 'small-avatar-story',
    size: 'small'
};

export const Templates = Template.bind({});
Templates.args = {
    items: templates,
    size: 'xx-large',
    label: 'Recommended Templates',
    name: 'templates'
};

export const InfiniteLoading = TemplateInfiniteLoading.bind({});
InfiniteLoading.args = {
    label: 'Infinite Loading'
};

export const InfiniteLoadingUsingShowMore =
    TemplateInfiniteLoadingUsingShowMore.bind({});
InfiniteLoadingUsingShowMore.args = {
    maxCount: 5
};

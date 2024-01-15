import { VerticalVisualPicker } from '../__examples__/verticalVisualPicker';
import { InfiniteLoadingVerticalVisualPicker } from '../__examples__/infiniteLoading';
import { InfiniteLoadingUsingShowMoreVerticalVisualPicker } from '../__examples__/infiniteLoadingUsingShowMore';
import {
    baseItems,
    itemsWithIcons,
    itemsWithoutIcon,
    itemsWithImages,
    itemsWithImagesAndTags,
    itemsWithImagesRight,
    itemsWithSubItems,
    employerTags
} from './data';

export default {
    title: 'Example/Vertical Visual Picker',
    argTypes: {
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the visual picker is disabled and the user cannot interact with it.',
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
                'Array of items with attributes populating the vertical visual picker.',
            table: {
                type: { summary: 'object' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label to title the vertical visual picker.',
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
                'Determines when to trigger infinite loading based on how many pixels the scroll position is from the end of the picker.',
            table: {
                defaultValue: { summary: '20' },
                type: { summary: 'number' }
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
            description: 'The name of the vertical visual picker.',
            type: { required: true },
            table: {
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
            options: ['small', 'medium', 'large', 'responsive'],
            description:
                'It defines the width of the item. Valid values include small, medium, large and responsive.',
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
                "Value of the selected item. For the checkbox type, the value can be an array. Ex: [value1, value2], 'value1' or ['value1'].",
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
                'Changes the appearance of the vertical visual picker when selected. Valid values include coverable and non-coverable.',
            table: {
                defaultValue: { summary: 'non-coverable' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disabled: false,
        enableInfiniteLoading: false,
        hideCheckMark: false,
        isLoading: false,
        loadMoreOffset: 20,
        required: false,
        size: 'medium',
        type: 'radio',
        variant: 'non-coverable'
    }
};

const Template = (args) => VerticalVisualPicker(args);
const TemplateInfiniteLoading = (args) =>
    InfiniteLoadingVerticalVisualPicker(args);
const TemplateInfiniteLoadingUsingShowMore = (args) =>
    InfiniteLoadingUsingShowMoreVerticalVisualPicker(args);

export const Base = Template.bind({});
Base.args = {
    name: 'Vertical Visual Picker',
    label: 'Select an option',
    items: baseItems,
    value: 'item-3'
};

export const MaximumAndMinimum = Template.bind({});
MaximumAndMinimum.args = {
    name: 'Vertical Visual Picker',
    label: 'Select an option',
    items: baseItems,
    value: 'item-3',
    type: 'checkbox',
    max: 3,
    min: 2
};

export const BaseWithIcons = Template.bind({});
BaseWithIcons.args = {
    name: 'Vertical Visual Picker',
    label: 'Base with icons',
    items: itemsWithIcons,
    value: 'lightning-professional'
};

export const BaseWithImages = Template.bind({});
BaseWithImages.args = {
    name: 'Vertical Visual Picker',
    label: 'Base with images',
    items: itemsWithImages
};

export const CoverableCheckbox = Template.bind({});
CoverableCheckbox.args = {
    name: 'Vertical Visual Picker',
    label: 'Coverable Checkbox',
    items: itemsWithoutIcon,
    variant: 'coverable',
    value: ['lightning-professional', 'lightning-unlimited'],
    type: 'checkbox',
    required: true
};

export const LargeWithImageAvatars = Template.bind({});
LargeWithImageAvatars.args = {
    name: 'Vertical Visual Picker',
    label: 'Large with images',
    items: itemsWithImagesRight,
    size: 'large',
    type: 'checkbox',
    value: ['sales-cloud', 'einstein-analytics']
};

export const ResponsiveWithImages = Template.bind({});
ResponsiveWithImages.args = {
    name: 'Vertical Visual Picker',
    label: 'Responsive with images',
    items: itemsWithImages,
    size: 'responsive'
};

export const ResponsiveWithImagesAndTags = Template.bind({});
ResponsiveWithImagesAndTags.args = {
    name: 'Vertical Visual Picker',
    label: 'Responsive with images and tags',
    items: itemsWithImagesAndTags,
    size: 'responsive',
    variant: 'coverable',
    hideCheckMark: true,
    value: 'sales-cloud'
};

export const EmployerTag = Template.bind({});
EmployerTag.args = {
    name: 'Vertical Visual Picker',
    label: "Employer's tag",
    items: employerTags
};

export const SubItems = Template.bind({});
SubItems.args = {
    name: 'Vertical Visual Picker',
    label: 'Select an option',
    items: itemsWithSubItems,
    type: 'checkbox',
    value: ['item-1', 'sub-item-1-2', 'sub-item-1-3', 'item-3', 'sub-item-3-1'],
    maxCount: 2
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

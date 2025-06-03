import { ChipContainer } from '../__examples__/chipContainer';
import { MaxWidthChipContainer } from '../__examples__/maxWidthChipContainer';
import { ITEMS, ITEMS_NO_MEDIA, ITEMS_NO_MEDIA_CIRCLE } from './data.js';

export default {
    title: 'Example/Chip Container',
    argTypes: {
        items: {
            control: {
                type: 'object'
            },
            description:
                'Array of item objects to display as chips in the container.',
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
                'The alternative text used to describe the chip container.',
            table: {
                type: { summary: 'string' }
            }
        },
        isCollapsible: {
            name: 'is-collapsible',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the chip list can be collapsed. Use `is-collapsible` with the `is-expanded` attribute to expand and collapse the list of chips.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        isExpanded: {
            name: 'is-expanded',
            control: {
                type: 'boolean'
            },
            description:
                'If present and `is-collapsible` too, the list of chips is expanded. This attribute is ignored when `is-collapsible` is false, and the list of chips is expanded even if `is-expanded` is false or not set',
            table: {
                type: { summary: 'boolean' }
            }
        },
        singleLine: {
            name: 'single-line',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the chips are limited to one line. This attribute overrides the is-collapsible and is-expanded attributes.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        sortable: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the chips are sortable.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        alternativeText: 'Selected Options:',
        isCollapsible: false,
        isExpanded: false,
        singleLine: false,
        sortable: false
    }
};

const Template = (args) => ChipContainer(args);
const TemplateWithMaxWidth = (args) => MaxWidthChipContainer(args);

export const Base = Template.bind({});
Base.args = {
    items: ITEMS
};

export const NoMedia = Template.bind({});
NoMedia.args = {
    items: ITEMS_NO_MEDIA
};

export const NoMediaCircle = Template.bind({});
NoMediaCircle.args = {
    items: ITEMS_NO_MEDIA_CIRCLE
};

export const SingleLineSortable = Template.bind({});
SingleLineSortable.args = {
    items: ITEMS_NO_MEDIA,
    singleLine: true,
    sortable: true
};

export const SingleLineCollapsed = TemplateWithMaxWidth.bind({});
SingleLineCollapsed.args = {
    items: ITEMS,
    isCollapsible: true,
    singleLine: true
};

export const Collapsed = TemplateWithMaxWidth.bind({});
Collapsed.args = {
    items: ITEMS,
    isCollapsible: true
};

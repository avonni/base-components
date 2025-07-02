import { PillContainer } from '../__examples__/pillContainer';
import { MaxWidthPillContainer } from '../__examples__/maxWidthPillContainer';
import { ITEMS, ACTIONS, generateItems } from './data';

export default {
    title: 'Example/Pill Container',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description:
                'Array of actions to display to the right of each pill.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        alternativeText: {
            control: {
                type: 'text'
            },
            description:
                'Alternative text used to describe the pill container. If the pill container is sortable, it should describe its behavior, for example: "Sortable pills. Press spacebar to grab or drop an item. Press right and left arrow keys to change position. Press escape to cancel."',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Selected Options:' }
            }
        },
        isCollapsible: {
            name: 'is-collapsible',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the pill list can be collapsed. Use is-collapsible with the is-expanded attribute to expand and collapse the list of pills.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isExpanded: {
            name: 'is-expanded',
            control: {
                type: 'boolean'
            },
            description:
                'If present and is-collapsible too, the list of pills is expanded. This attribute is ignored when is-collapsible is false, and the list of pills is expanded even if is-expanded is false or not set.',
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
                'Array of item objects to display as pills in the container.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        singleLine: {
            name: 'single-line',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the pills are limited to one line. This attribute overrides the is-collapsible and is-expanded attributes.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        sortable: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the pills are sortable.',
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

const Template = (args) => PillContainer(args);
const TemplateWithMaxWidth = (args) => MaxWidthPillContainer(args);

export const Base = Template.bind({});
Base.args = {
    items: ITEMS
};

export const Actions = Template.bind({});
Actions.args = {
    actions: ACTIONS,
    items: ITEMS
};

export const Collapsible = TemplateWithMaxWidth.bind({});
Collapsible.args = {
    isCollapsible: true,
    items: ITEMS,
    actions: [ACTIONS[0]]
};

export const SingleLine = Template.bind({});
SingleLine.args = {
    items: ITEMS,
    singleLine: true
};

export const Sortable = TemplateWithMaxWidth.bind({});
Sortable.args = {
    items: ITEMS,
    alternativeText:
        'Sortable pills. Press spacebar to grab or drop an item. Press right and left arrow keys to change position. Press escape to cancel.',
    sortable: true
};

export const SortableSingleLine = Template.bind({});
SortableSingleLine.args = {
    alternativeText:
        'Sortable pills. Press spacebar to grab or drop an item. Press right and left arrow keys to change position. Press escape to cancel.',
    actions: ACTIONS,
    items: generateItems(200),
    singleLine: true,
    isCollapsible: true,
    sortable: true
};

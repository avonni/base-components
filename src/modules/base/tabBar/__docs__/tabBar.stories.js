import { TabBar } from '../__examples__/tabBar';

export default {
    title: 'Example/Tab Bar',
    argTypes: {
        defaultTab: {
            control: {
                type: 'text'
            },
            description: 'The label of the active tab by default.',
            table: {
                type: { summary: 'string' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description: 'Array of items',
            table: {
                type: { summary: 'object[]' }
            }
        },
        showMoreButtonAlternativeText: {
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the show more button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show more' }
            }
        },
        tabsHidden: {
            control: {
                type: 'number'
            },
            description: 'Number of tabs hidden.',
            table: {
                defaultValue: { summary: 0 },
                type: { summary: 'number' }
            }
        }
    },
    args: {
        showMoreButtonAlternativeText: 'Show more',
        tabsHidden: 0
    }
};

const items = [
    { label: 'Tab 1', name: 'tab1' },
    { label: 'Tab 2', name: 'tab2' },
    { label: 'Tab 3', name: 'tab3' },
    { label: 'Tab 4', name: 'tab4' },
    { label: 'Tab 5', name: 'tab5' }
];

const Template = (args) => TabBar(args);

export const Base = Template.bind({});
Base.args = {
    items: items
};

export const BaseWithDefaultTab = Template.bind({});
BaseWithDefaultTab.args = {
    items: items,
    defaultTab: 'tab2'
};

export const BaseWithTabsHidden = Template.bind({});
BaseWithTabsHidden.args = {
    items: items,
    tabsHidden: 2
};

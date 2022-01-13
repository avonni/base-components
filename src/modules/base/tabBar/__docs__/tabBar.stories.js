import { TabBar } from '../__examples__/tabBar';

export default {
    title: 'Example/Tab Bar',
    argTypes: {
        labels: {
            control: {
                type: 'object'
            },
            description: 'List of tab labels used to separate information.',
            table: {
                type: { summary: 'string[]' }
            }
        },
        tabsHidden: {
            control: {
                type: 'number'
            },
            defaultValue: 0,
            description: 'Number of tabs hidden.',
            table: {
                defaultValue: { summary: 0 },
                type: { summary: 'number' }
            }
        },
        defaultTab: {
            control: {
                type: 'text'
            },
            description: 'The label of the active tab by default.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {}
};

const labels = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

const Template = (args) => TabBar(args);

export const Base = Template.bind({});
Base.args = {
    labels: labels
};

export const BaseWithDefaultTab = Template.bind({});
BaseWithDefaultTab.args = {
    labels: labels,
    defaultTab: 'Tab 2'
};

export const BaseWithTabsHidden = Template.bind({});
BaseWithTabsHidden.args = {
    labels: labels,
    tabsHidden: 2
};

import { Layout } from '../__examples__/layout';

export default {
    title: 'Example/Layout',
    argTypes: {
        direction: {
            name: 'direction',
            control: {
                type: 'select'
            },
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
            description:
                'Direction in which the items are placed in the container. Valid values include row, row-reverse, column and column-reverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'row' }
            }
        },
        equalHeights: {
            name: 'equal-heights',
            control: {
                type: 'boolean'
            },
            description:
                'If present, layout items are set to the height of the tallest item in the layout.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        horizontalAlign: {
            name: 'horizontal-align',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end', 'space', 'spread'],
            description:
                'Determines how to spread the layout items horizontally. Valid values include start, center, space, spread, and end.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'start' }
            }
        },
        multipleRows: {
            name: 'multiple-rows',
            control: {
                type: 'boolean'
            },
            description:
                'If present, layout items wrap to the following line when they exceed the layout width.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        verticalAlign: {
            name: 'vertical-align',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end', 'stretch'],
            description:
                'Determines how to align the layout items vertically in the container. Valid values include start, center, end, and stretch.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        direction: 'row',
        equalHeights: false,
        horizontalAlign: 'start',
        multipleRows: false,
        verticalAlign: 'stretch'
    }
};

const Template = (args) => Layout(args);

export const Base = Template.bind({});

export const MultipleRows = Template.bind({});
MultipleRows.args = {
    multipleRows: true
};

export const EqualHeights = Template.bind({});
EqualHeights.args = {
    multipleRows: true,
    equalHeights: true
};

export const ReverseColumns = Template.bind({});
ReverseColumns.args = {
    direction: 'column-reverse'
};

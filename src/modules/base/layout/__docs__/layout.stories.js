import { Layout } from '../__examples__/layout';

export default {
    title: 'Example/Layout',
    argTypes: {
        columnGap: {
            name: 'column-gap',
            control: {
                type: 'text'
            },
            description:
                'Space between columns of items, given as a number of pixels, or as a valid CSS length. If an item has an alignment bump, the gap in this direction will be half the given size.',
            table: {
                type: { summary: 'string|number' },
                defaultValue: { summary: '0' }
            }
        },
        direction: {
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
        rowGap: {
            name: 'row-gap',
            control: {
                type: 'text'
            },
            description:
                'Space between rows of items, given as a number of pixels, or as a valid CSS length. Only used if `multiple-rows` is true. If an item has an alignment bump, the gap in this direction will be half the given size.',
            table: {
                type: { summary: 'string|number' },
                defaultValue: { summary: '0' }
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
        columnGap: 0,
        direction: 'row',
        horizontalAlign: 'start',
        multipleRows: false,
        rowGap: 0,
        verticalAlign: 'stretch'
    }
};

const Template = (args) => Layout(args);

export const Base = Template.bind({});

export const MultipleRows = Template.bind({});
MultipleRows.args = {
    multipleRows: true
};

export const ReverseColumns = Template.bind({});
ReverseColumns.args = {
    direction: 'column-reverse'
};

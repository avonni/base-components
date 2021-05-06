import { ActivityTimeline } from '../__examples__/activityTimeline';

export default {
    title: 'Example/ActivityTimeline',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header before the title.",
            table: {
                type: { summary: 'string' }
            }
        },
        collapsible: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If true, the section is collapsible, the left icon is present.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        closed: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If true, close the section.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        groupBy: {
            name: 'group-by',
            control: {
                type: 'select'
            },
            options: ['week', 'month', 'year'],
            defaultValue: 'week',
            description: 'Values include week, month, year.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'week' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'shaded'],
            defaultValue: 'base',
            description:
                'Changes the appearance of the activity time line. Valid values are base or shaded. The shaded variant adds a light gray box to the activity timeline titles.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        }
    },
    args: {
        closed: false,
        collapsible: false
    }
};

const Template = (args) => ActivityTimeline(args);

export const Base = Template.bind({});
Base.args = {};

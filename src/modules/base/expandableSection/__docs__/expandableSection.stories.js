import { ExpandableSection } from '../__examples__/expandableSection';

export default {
    title: 'Example/Expandable Section',
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
        closed: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If true, close the section.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        collapsible: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If the section is not collapsible, the left icon is hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        closed: false,
        collapsible: false
    }
};

const Template = (args) => ExpandableSection(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Section'
};

export const Collapsible = Template.bind({});
Collapsible.args = {
    title: 'Section',
    collapsible: true
};

export const CollapsibleClosed = Template.bind({});
CollapsibleClosed.args = {
    title: 'Section',
    closed: 'true',
    collapsible: true
};

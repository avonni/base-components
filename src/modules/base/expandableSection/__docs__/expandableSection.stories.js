import { ExpandableSection } from '../__examples__/expandableSection';

export default {
    title: 'Example/Expandable Section',
    argTypes: {
        title: {
            control: {
                type: 'text'
            }
        },
        closed: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
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
                defaultValue: { summary: 'false' }
            }
        }
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

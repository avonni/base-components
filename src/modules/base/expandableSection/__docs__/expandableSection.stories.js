

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
            description: 'If present, close the section.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        collapsible: {
            control: {
                type: 'boolean'
            },
            description:
                'If the section is not collapsible, the left icon is hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'shaded'],
            description:
                'Variant of the section. Valid values include base and shaded.',
            table: {
                defaultValue: { summary: 'shaded' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        closed: false,
        collapsible: false,
        variant: 'shaded'
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
    closed: true,
    collapsible: true
};

export const BaseVariant = Template.bind({});
BaseVariant.args = {
    title: 'Section',
    collapsible: true,
    variant: 'base'
};

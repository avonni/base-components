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
        collapsable: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
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

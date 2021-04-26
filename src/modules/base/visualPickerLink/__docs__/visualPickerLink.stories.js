import { VisualPickerLink } from '../__examples__/visualPickerLink';
import { VisualPickerLinkWithSlot } from '../__examples__/visualPickerLinkWithSlot';

export default {
    title: 'Example/VisualPickerLink',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' }
            }
        },
        href: {
            control: {
                type: 'text'
            },
            description: 'The URL of the page that the link goes to.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        iconPosition: {
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description: 'Values include left and right.',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        completed: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Show as completed.',
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        infoOnly: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'The <a> tags are removed from the tiles. The tiles also lose their button appearance, removing borders and shadows.',
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        completed: false,
        infoOnly: false
    }
};

const Template = (args) => VisualPickerLink(args);
const TemplateWithSlots = (args) => VisualPickerLinkWithSlot(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Share the knowledge'
};

export const IconPositionLeft = Template.bind({});
IconPositionLeft.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    iconPosition: 'left'
};

export const IconPositionRight = Template.bind({});
IconPositionRight.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    iconPosition: 'right'
};

export const Link = Template.bind({});
Link.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    href: 'https://www.lightningdesignsystem.com/components/visual-picker/#Link'
};

export const Completed = Template.bind({});
Completed.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    completed: true
};

export const InfoOnly = Template.bind({});
InfoOnly.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    infoOnly: true
};

export const WithSlots = TemplateWithSlots.bind({});
WithSlots.args = {
    iconName: 'utility:knowledge_base'
};

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
            name: 'icon-name',
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
            name: 'icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' }
            }
        },
        completed: {
            control: {
                type: 'boolean'
            },
            description: 'If present, a checkmark is added to the icon.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        completedIconAlternativeText: {
            name: 'completed-icon-alternative-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text when the link is completed.',
            table: {
                defaultValue: { summary: 'Completed' },
                type: { summary: 'string' }
            }
        },
        infoOnly: {
            name: 'info-only',
            control: {
                type: 'boolean'
            },
            description:
                'The <a> tags are removed from the tiles. The tiles also lose their button appearance, removing borders and shadows.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        disabled: {
            name: 'disabled',
            control: {
                type: 'boolean'
            },
            description:
                'The tile is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        completed: false,
        completedIconAlternativeText: 'Completed',
        iconPosition: 'left',
        infoOnly: false,
        disabled: false
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

export const Disabled = Template.bind({});
Disabled.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    disabled: true
};

export const WithSlots = TemplateWithSlots.bind({});
WithSlots.args = {
    iconName: 'utility:knowledge_base'
};

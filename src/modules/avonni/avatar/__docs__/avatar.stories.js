import { Avatar } from '../__examples__/avatar';

export default {
    title: 'Example/Avatar',
    argTypes: {
        alternativeText: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description:
                'The alternative text used to describe the avatar, which is displayed as hover text on the image.',
            table: {
                type: { summary: 'string' }
            }
        },
        fallbackIconName: {
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.",
            table: {
                type: { summary: 'string' }
            }
        },
        initials: {
            control: {
                type: 'text'
            },
            description:
                'If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.',
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: [
                    'xx-small',
                    'x-small',
                    'small',
                    'medium',
                    'large',
                    'x-large',
                    'xx-large'
                ]
            },
            defaultValue: 'medium',
            description: 'The size of the avatar.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        src: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'The URL for the image.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['circle', 'square']
            },
            defaultValue: 'square',
            description: 'The variant changes the shape of the avatar.',
            table: {
                defaultValue: { summary: 'square' },
                type: { summary: 'string' }
            }
        },
        status: {
            control: {
                type: 'select',
                options: ['approved', 'locked', 'declined', 'unknown', '']
            },
            description: 'Status of the user to display. ',
            table: {
                type: { summary: 'string' }
            }
        },
        statusPosition: {
            control: {
                type: 'select',
                options: [
                    'top-left',
                    'top-right',
                    'bottom-left',
                    'bottom-right'
                ]
            },
            defaultValue: 'top-right',
            description: 'Position of the status icon.',
            table: {
                defaultValue: { summary: 'top-right' },
                type: { summary: 'string' }
            }
        },
        statusTitle: {
            control: {
                type: 'text'
            },
            description:
                'Status title to be shown as a tooltip on hover over the status icon.',
            table: {
                type: { summary: 'string' }
            }
        },
        presence: {
            control: {
                type: 'select',
                options: [
                    'online',
                    'busy',
                    'focus',
                    'offline',
                    'blocked',
                    'away',
                    ''
                ]
            },
            description: 'Presence of the user to display.',
            table: {
                type: { summary: 'string' }
            }
        },
        presenceTitle: {
            control: {
                type: 'text'
            },
            description:
                'Presence title to be shown as a tooltip on hover over the presence icon.',
            table: {
                type: { summary: 'string' }
            }
        },
        presencePosition: {
            control: {
                type: 'select',
                options: [
                    'top-left',
                    'top-right',
                    'bottom-left',
                    'bottom-right'
                ]
            },
            defaultValue: 'bottom-right',
            description: 'Position of the presence icon.',
            table: {
                defaultValue: { summary: 'bottom-right' },
                type: { summar: 'string' }
            }
        },
        entityIconName: {
            control: {
                type: 'text'
            },
            description:
                "Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.",
            table: {
                type: { summary: 'string' }
            }
        },
        entityInitials: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        entityPosition: {
            control: {
                type: 'select',
                options: [
                    'top-left',
                    'top-right',
                    'bottom-left',
                    'bottom-right'
                ]
            },
            defaultValue: 'top-left',
            description: 'Position of the entity icon.',
            table: {
                defaultValue: { summary: 'top-left' },
                type: { summary: 'string' }
            }
        },
        entitySrc: {
            control: {
                type: 'text'
            },
            description: 'The URL for the entity image.',
            table: {
                type: { summary: 'string' }
            }
        },
        entityTitle: {
            control: {
                type: 'text'
            },
            description:
                'Entity title to be shown as a tooltip on hover over the presence icon.',
            table: {
                type: { summary: 'string' }
            }
        },
        entityVariant: {
            control: {
                type: 'select',
                options: ['circle', 'square']
            },
            defaultValue: 'square',
            description: 'The variant changes the shape of the entity.',
            table: {
                defaultValue: { summary: 'square' },
                type: { summary: 'string' }
            }
        },
        hideAvatarDetails: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'Hide primary, secondary and tertiary text.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        primaryText: {
            control: {
                type: 'text'
            },
            description:
                'Primary text to display, usually the name of the person.',
            table: {
                type: { summary: 'string' }
            }
        },
        secondaryText: {
            control: {
                type: 'text'
            },
            description:
                'Secondary text to display, usually the role of the user.',
            table: {
                type: { summary: 'string' }
            }
        },
        tertiaryText: {
            control: {
                type: 'text'
            },
            description:
                'Tertiary text to display, usually the status of the user. The tertiary text will only be shown when using size x-large and xx-large.',
            table: {
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => Avatar(args);

export const Base = Template.bind({});
Base.args = {
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    entityIconName: 'standard:account',
    presence: 'online',
    primaryText: 'Jane Doe',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Approved',
    size: 'medium'
};

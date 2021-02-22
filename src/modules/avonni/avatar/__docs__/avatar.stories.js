import { Avatar } from '../__examples__/avatar';

export default {
    title: 'Example/Avatar',
    argTypes: {
        alternativeText: {
            control: {
                type: 'text'
            }
        },
        entityIconName: {
            control: {
                type: 'text'
            }
        },
        entityInitials: {
            control: {
                type: 'text'
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
            table: {
                defaultValue: { summary: 'top-left' }
            }
        },
        entitySrc: {
            control: {
                type: 'text'
            }
        },
        entityTitle: {
            control: {
                type: 'text'
            }
        },
        entityVariant: {
            control: {
                type: 'select',
                options: ['circle', 'square']
            },
            defaultValue: 'square',
            table: {
                defaultValue: { summary: 'square' }
            }
        },
        fallbackIconName: {
            control: {
                type: 'text'
            }
        },
        hideAvatarDetails: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        initials: {
            control: {
                type: 'text'
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
            }
        },
        presenceTitle: {
            control: {
                type: 'text'
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
            table: {
                defaultValue: { summary: 'bottom-right' }
            }
        },
        primaryText: {
            control: {
                type: 'text'
            }
        },
        secondaryText: {
            control: {
                type: 'text'
            }
        },
        tertiaryText: {
            control: {
                type: 'text'
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
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        status: {
            control: {
                type: 'select',
                options: ['approved', 'locked', 'declined', 'unknown', '']
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
            table: {
                defaultValue: { summary: 'top-right' }
            }
        },
        statusTitle: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['circle', 'square']
            },
            defaultValue: 'square',
            table: {
                defaultValue: { summary: 'square' }
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
    status: 'approved',
    primaryText: 'Jane Doe',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Approved'
};

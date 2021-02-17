import { ProfileCard } from '../__examples__/profileCard';

export default {
    title: 'Example/Profile Card',
    argTypes: {
        title: {
            control: {
                type: 'text'
            }
        },
        subtitle: {
            control: {
                type: 'text'
            }
        },
        backgroundSrc: {
            control: {
                type: 'text'
            }
        },
        backgroundAlternativeText: {
            control: {
                type: 'text'
            }
        },
        backgroundColor: {
            control: {
                type: 'color'
            }
        },
        avatarSrc: {
            control: {
                type: 'text'
            }
        },
        avatarAlternativeText: {
            control: {
                type: 'text'
            }
        },
        avatarFallbackIconName: {
            control: {
                type: 'text'
            }
        },
        avatarPosition: {
            control: {
                type: 'select',
                options: [
                    'top-left',
                    'top-center',
                    'top-right',
                    'bottom-left',
                    'bottom-center',
                    'bottom-right'
                ]
            },
            defaultValue: 'top-left',
            table: {
                defaultValue: { summary: 'top-left' }
            }
        },
        avatarVariant: {
            control: {
                type: 'select',
                options: ['circle', 'square']
            },
            defaultValue: 'circle',
            table: {
                defaultValue: { summary: 'circle' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large', 'x-large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        }
    }
};

const Template = (args) => ProfileCard(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg'
};

import { ProfileCard } from '../__examples__/profileCard';
import { NoActionsProfileCard } from '../__examples__/noActions';

export default {
    title: 'Example/Profile Card',
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
        subtitle: {
            control: {
                type: 'text'
            },
            description:
                'The subtitle can include text, and is displayed under the title.',
            table: {
                type: { summary: 'string' }
            }
        },
        backgroundSrc: {
            name: 'background-src',
            control: {
                type: 'text'
            },
            description: 'URL for the optional image.',
            table: {
                type: { summary: 'string' },
                category: 'Background'
            }
        },
        backgroundAlternativeText: {
            name: 'background-alternative-text',
            control: {
                type: 'text'
            },
            description: "Value to set the image attribute 'alt'",
            table: {
                type: { summary: 'string' },
                category: 'Background'
            }
        },
        backgroundColor: {
            name: 'background-color',
            control: {
                type: 'color'
            },
            description: 'Background color in hexadecimal',
            table: {
                type: { summary: 'string' },
                category: 'Background'
            }
        },
        avatarSrc: {
            name: 'avatar-src',
            control: {
                type: 'text'
            },
            description: 'URL for the avatar image.',
            table: {
                type: { summary: 'string' },
                category: 'Avatar'
            }
        },
        avatarAlternativeText: {
            name: 'avatar-alternative-text',
            control: {
                type: 'text'
            },
            description: "Value to set the image attribute 'alt'",
            table: {
                type: { summary: 'string' },
                category: 'Avatar'
            }
        },
        avatarFallbackIconName: {
            name: 'avatar-fallback-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.",
            table: {
                type: { summary: 'string' },
                category: 'Avatar'
            }
        },
        avatarPosition: {
            name: 'avatar-position',
            control: {
                type: 'select'
            },
            options: [
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
            description:
                'Values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.',
            defaultValue: 'top-left',
            table: {
                defaultValue: { summary: 'top-left' },
                type: { summary: 'string' },
                category: 'Avatar'
            }
        },
        avatarMobilePosition: {
            name: 'avatar-mobile-position',
            control: {
                type: 'select'
            },
            options: [
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
            description:
                'Values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.',
            defaultValue: 'top-left',
            table: {
                defaultValue: { summary: 'top-left' },
                type: { summary: 'string' },
                category: 'Avatar'
            }
        },
        avatarVariant: {
            name: 'avatar-variant',
            control: {
                type: 'select'
            },
            options: ['circle', 'square'],
            description:
                'The variant change the shape of the avatar. Valid values are circle, square.',
            defaultValue: 'circle',
            table: {
                defaultValue: { summary: 'circle' },
                type: { summary: 'string' },
                category: 'Avatar'
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'x-large'],
            description:
                'Values include x-small, small, medium, large, x-large.',
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => ProfileCard(args);
const NoActionsTemplate = (args) => NoActionsProfileCard(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg'
};

export const SquareTopCenter = Template.bind({});
SquareTopCenter.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarPosition: 'top-center',
    avatarVariant: 'square'
};

export const SmallTopRight = NoActionsTemplate.bind({});
SmallTopRight.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarPosition: 'top-right',
    size: 'small'
};

export const ExtraSmallBottomCenter = NoActionsTemplate.bind({});
ExtraSmallBottomCenter.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    size: 'x-small',
    backgroundColor: '#4A4A4A',
    avatarPosition: 'bottom-center'
};

export const LargeBottomLeft = Template.bind({});
LargeBottomLeft.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarPosition: 'bottom-left',
    size: 'large'
};

export const ExtraLargeSquare = Template.bind({});
ExtraLargeSquare.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    size: 'x-large',
    avatarVariant: 'square'
};

export const NoImage = Template.bind({});
NoImage.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    backgroundColor: '#E0E0E0',
    avatarFallbackIconName: 'standard:user',
    avatarSrc: 'wrong path'
};

export const BaseMobile = Template.bind({});
BaseMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
BaseMobile.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg'
};

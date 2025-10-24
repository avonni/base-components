import { ProfileCard } from '../__examples__/profileCard';
import { NoActionsProfileCard } from '../__examples__/noActions';

export default {
    title: 'Example/Profile Card',
    argTypes: {
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
                'bottom-right',
                'left',
                'center',
                'right'
            ],
            description:
                'Position of the avatar. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, right.',
            table: {
                defaultValue: { summary: 'top-left' },
                type: { summary: 'string' },
                category: 'Avatar Position'
            }
        },
        avatarSize: {
            name: 'avatar-size',
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'x-large'],
            description:
                'The size of the avatar. Valid values include x-small, small, medium, large, x-large.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' },
                category: 'Avatar'
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
        avatarVariant: {
            name: 'avatar-variant',
            control: {
                type: 'select'
            },
            options: ['circle', 'square'],
            description:
                'The variant change the shape of the avatar. Valid values are circle, square.',
            table: {
                defaultValue: { summary: 'circle' },
                type: { summary: 'string' },
                category: 'Avatar'
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
        largeAvatarPosition: {
            name: 'large-avatar-position',
            control: {
                type: 'select'
            },
            options: [
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
                'left',
                'center',
                'right'
            ],
            description:
                'Position of the avatar when the component is 1024px wide or more. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, and right.',
            table: {
                type: { summary: 'string' },
                category: 'Avatar Position'
            }
        },
        mediumAvatarPosition: {
            name: 'medium-avatar-position',
            control: {
                type: 'select'
            },
            options: [
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
                'left',
                'center',
                'right'
            ],
            description:
                'Position of the avatar when the component is 768px wide or more. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, and right.',
            table: {
                type: { summary: 'string' },
                category: 'Avatar Position'
            }
        },
        smallAvatarPosition: {
            name: 'small-avatar-position',
            control: {
                type: 'select'
            },
            options: [
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
                'left',
                'center',
                'right'
            ],
            description:
                'Position of the avatar when the component is 480px wide or more. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right, left, center, and right.',
            table: {
                defaultValue: { summary: 'top-left' },
                type: { summary: 'string' },
                category: 'Avatar Position'
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
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        avatarAlternativeText: 'Avatar',
        avatarPosition: 'top-left',
        avatarSize: 'medium',
        avatarVariant: 'circle'
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
    avatarSize: 'small'
};

export const ExtraSmallBottomCenter = NoActionsTemplate.bind({});
ExtraSmallBottomCenter.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    avatarSize: 'x-small',
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
    avatarSize: 'large'
};

export const ExtraLargeSquare = Template.bind({});
ExtraLargeSquare.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarSize: 'x-large',
    avatarVariant: 'square'
};

export const NoImage = Template.bind({});
NoImage.args = {
    title: 'Rosalyn Franklin (rffranklin)',
    subtitle: 'Manager',
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
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarPosition: 'top-left'
};

export const TopCenterMobile = Template.bind({});
TopCenterMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
TopCenterMobile.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarPosition: 'top-center'
};

export const SmallBottomCenterMobile = Template.bind({});
SmallBottomCenterMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
SmallBottomCenterMobile.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    avatarSize: 'small',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarPosition: 'bottom-center'
};

export const ResponsiveAvatar = Template.bind({});
ResponsiveAvatar.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    backgroundSrc:
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
    avatarPosition: 'bottom-center',
    smallAvatarPosition: 'top-left',
    mediumAvatarPosition: 'top-center',
    largeAvatarPosition: 'top-right'
};

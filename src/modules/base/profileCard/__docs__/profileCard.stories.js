/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
                'Position of the avatar when screen width is under 480px. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.',
            table: {
                defaultValue: { summary: 'top-left' },
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
                'Position of the avatar. Valid values include top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.',
            table: {
                defaultValue: { summary: 'top-left' },
                type: { summary: 'string' },
                category: 'Avatar'
            }
        },
        avatarSize: {
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
        }
    },
    args: {
        avatarPosition: 'top-left',
        avatarMobilePosition: 'top-left',
        avatarVariant: 'circle',
        avatarSize: 'medium'
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
    avatarMobilePosition: 'top-left'
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
    avatarMobilePosition: 'top-center'
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
    avatarMobilePosition: 'bottom-center'
};

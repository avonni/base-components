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

import { Avatar } from '../__examples__/avatar';

export default {
    title: 'Example/Avatar',
    argTypes: {
        alternativeText: {
            name: 'alternative-text',
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
            name: 'fallback-icon-name',
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
                type: 'select'
            },
            options: [
                'xx-small',
                'x-small',
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large'
            ],
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
                type: 'select'
            },
            options: ['circle', 'square'],
            defaultValue: 'square',
            description: 'The variant changes the shape of the avatar.',
            table: {
                defaultValue: { summary: 'square' },
                type: { summary: 'string' }
            }
        },
        status: {
            control: {
                type: 'select'
            },
            options: ['approved', 'locked', 'declined', 'unknown', ''],
            description: 'Status of the user to display. ',
            table: {
                type: { summary: 'string' },
                category: 'Status'
            }
        },
        statusPosition: {
            name: 'status-position',
            control: {
                type: 'select'
            },
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            defaultValue: 'top-right',
            description: 'Position of the status icon.',
            table: {
                defaultValue: { summary: 'top-right' },
                type: { summary: 'string' },
                category: 'Status'
            }
        },
        statusTitle: {
            name: 'status-title',
            control: {
                type: 'text'
            },
            description:
                'Status title to be shown as a tooltip on hover over the status icon.',
            table: {
                type: { summary: 'string' },
                category: 'Status'
            }
        },
        presence: {
            control: {
                type: 'select'
            },
            options: [
                'online',
                'busy',
                'focus',
                'offline',
                'blocked',
                'away',
                ''
            ],
            description: 'Presence of the user to display.',
            table: {
                type: { summary: 'string' },
                category: 'Presence'
            }
        },
        presenceTitle: {
            name: 'presence-title',
            control: {
                type: 'text'
            },
            description:
                'Presence title to be shown as a tooltip on hover over the presence icon.',
            table: {
                type: { summary: 'string' },
                category: 'Presence'
            }
        },
        presencePosition: {
            name: 'presence-position',
            control: {
                type: 'select'
            },
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            defaultValue: 'bottom-right',
            description: 'Position of the presence icon.',
            table: {
                defaultValue: { summary: 'bottom-right' },
                type: { summary: 'string' },
                category: 'Presence'
            }
        },
        actions: {
            control: {
                type: 'object'
            },
            description:
                'One action or a list of different actions in a dropdown menu.',
            table: {
                type: { summary: 'object[]' },
                category: 'Action'
            }
        },
        actionMenuIcon: {
            name: 'action-menu-icon',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used as a menu icon. Names are written in the format 'utility:threedots_vertical' where 'utility' is the category, and 'threedots_vertical' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Action'
            }
        },
        actionPosition: {
            name: 'action-position',
            control: {
                type: 'select'
            },
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            defaultValue: 'bottom-left',
            description: 'Position of the action button.',
            table: {
                defaultValue: { summary: 'bottom-left' },
                type: { summary: 'string' },
                category: 'Action'
            }
        },
        actionSize: {
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            defaultValue: 'small',
            description: 'The size of the action button.',
            table: {
                defaultValue: { summary: 'small' },
                type: { summary: 'string' },
                category: 'Action'
            }
        },
        entityIconName: {
            name: 'entity-icon-name',
            control: {
                type: 'text'
            },
            description:
                "Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.",
            table: {
                type: { summary: 'string' },
                category: 'Entity'
            }
        },
        entityInitials: {
            name: 'entity-initials',
            control: {
                type: 'text'
            },
            description:
                'If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter. Placed inside the entity.',
            table: {
                type: { summary: 'string' },
                category: 'Entity'
            }
        },
        entityPosition: {
            name: 'entity-position',
            control: {
                type: 'select'
            },
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            defaultValue: 'top-left',
            description: 'Position of the entity icon.',
            table: {
                defaultValue: { summary: 'top-left' },
                type: { summary: 'string' },
                category: 'Entity'
            }
        },
        entitySrc: {
            name: 'entity-src',
            control: {
                type: 'text'
            },
            description: 'The URL for the entity image.',
            table: {
                type: { summary: 'string' },
                category: 'Entity'
            }
        },
        entityTitle: {
            name: 'entity-title',
            control: {
                type: 'text'
            },
            description:
                'Entity title to be shown as a tooltip on hover over the presence icon.',
            table: {
                type: { summary: 'string' },
                category: 'Entity'
            }
        },
        entityVariant: {
            name: 'entity-variant',
            control: {
                type: 'select'
            },
            options: ['circle', 'square'],
            defaultValue: 'square',
            description: 'The variant changes the shape of the entity.',
            table: {
                defaultValue: { summary: 'square' },
                type: { summary: 'string' },
                category: 'Entity'
            }
        },
        hideAvatarDetails: {
            name: 'hide-avatar-details',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Hide primary, secondary and tertiary text.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Details'
            }
        },
        primaryText: {
            name: 'primary-text',
            control: {
                type: 'text'
            },
            description:
                'Primary text to display, usually the name of the person.',
            table: {
                type: { summary: 'string' },
                category: 'Details'
            }
        },
        secondaryText: {
            name: 'secondary-text',
            control: {
                type: 'text'
            },
            description:
                'Secondary text to display, usually the role of the user.',
            table: {
                type: { summary: 'string' },
                category: 'Details'
            }
        },
        tertiaryText: {
            name: 'tertiary-text',
            control: {
                type: 'text'
            },
            description:
                'Tertiary text to display, usually the status of the user. The tertiary text will only be shown when using size x-large and xx-large.',
            table: {
                type: { summary: 'string' },
                category: 'Details'
            }
        },
        textPosition: {
            name: 'text-position',
            control: {
                type: 'select'
            },
            options: ['right', 'center', 'left'],
            defaultValue: 'right',
            description:
                'Tertiary text to display, usually the status of the user. The tertiary text will only be shown when using size x-large and xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: 'right',
                category: 'Details'
            }
        },
        tags: {
            name: 'tags',
            control: {
                type: 'object'
            },
            description: 'tags associated with the avatar',
            table: {
                type: { summary: 'object[]' }
            }
        }
    },
    args: {
        hideAvatarDetails: false
    }
};
const tags = [
    { label: 'default', variant: 'default' },
    { label: 'warning', variant: 'warning' },
    { label: 'error', variant: 'error' },
    { label: 'success', variant: 'success' },
    { label: 'lightest', variant: 'lightest' },
    { label: 'inverse', variant: 'inverse' }
];

const actions = [
    {
        label: 'Edit item',
        name: 'edit-item',
        iconName: 'utility:edit'
    },
    {
        label: 'Add item',
        name: 'add-item',
        iconName: 'utility:add'
    }
];

const Template = (args) => Avatar(args);

export const Base = Template.bind({});
Base.args = {
    alternativeText: 'JD',
    hideAvatarDetails: true,
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD'
};

export const BaseWithStatusBottomLeft = Template.bind({});
BaseWithStatusBottomLeft.args = {
    alternativeText: 'Invitation Declined',
    hideAvatarDetails: true,
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    status: 'declined',
    statusPosition: 'bottom-left',
    statusTitle: 'declined',
    size: 'x-large'
};

export const BaseWithPresenceTopRight = Template.bind({});
BaseWithPresenceTopRight.args = {
    alternativeText: 'Invitation Declined',
    hideAvatarDetails: true,
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    presence: 'focus',
    presencePosition: 'top-right',
    presenceTitle: 'focus',
    size: 'large'
};

export const BaseWithPresenceAndStatus = Template.bind({});
BaseWithPresenceAndStatus.args = {
    alternativeText: 'Invitation Declined',
    hideAvatarDetails: true,
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    presence: 'blocked',
    presencePosition: 'top-right',
    presenceTitle: 'blocked',
    status: 'locked',
    statusPosition: 'bottom-right',
    statusTitle: 'locked',
    size: 'large'
};

export const BaseWithDetails = Template.bind({});
BaseWithDetails.args = {
    alternativeText: 'Invitation Declined',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    size: 'xx-large',
    entityIconName: 'standard:account',
    entityInitials: 'JD',
    presence: 'online',
    presenceTitle: 'online',
    status: 'declined',
    primaryText: 'Jane Doe',
    secondaryText: 'VP, Finance',
    tertiaryText: 'Online'
};

export const BaseWithCenteredDetails = Template.bind({});
BaseWithCenteredDetails.args = {
    alternativeText: 'Invitation Declined',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    size: 'xx-large',
    entityIconName: 'standard:account',
    entityInitials: 'JD',
    presence: 'online',
    presenceTitle: 'online',
    status: 'declined',
    primaryText: 'Jane Doe',
    secondaryText: 'VP, Finance',
    tertiaryText: 'Online',
    textPosition: 'center'
};

export const BaseWithLeftDetails = Template.bind({});
BaseWithLeftDetails.args = {
    alternativeText: 'Invitation Declined',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    size: 'xx-large',
    entityIconName: 'standard:account',
    entityInitials: 'JD',
    presence: 'online',
    presenceTitle: 'online',
    status: 'declined',
    primaryText: 'Jane Doe',
    secondaryText: 'VP, Finance',
    tertiaryText: 'Online',
    textPosition: 'left'
};

export const Circle = Template.bind({});
Circle.args = {
    alternativeText: 'JS',
    hideAvatarDetails: true,
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS',
    variant: 'circle'
};

export const CircleLargeWithEntity = Template.bind({});
CircleLargeWithEntity.args = {
    alternativeText: 'John Smith',
    hideAvatarDetails: true,
    variant: 'circle',
    size: 'large',
    entityIconName: 'standard:account',
    entityInitials: 'JS',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS'
};

export const CircleWithEntityIcon = Template.bind({});
CircleWithEntityIcon.args = {
    alternativeText: 'John Smith',
    hideAvatarDetails: true,
    variant: 'circle',
    size: 'large',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    entityIconName: 'utility:favorite',
    initials: 'JS'
};

export const CircleWithPresence = Template.bind({});
CircleWithPresence.args = {
    alternativeText: 'John Smith',
    hideAvatarDetails: true,
    variant: 'circle',
    presence: 'online',
    size: 'large',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS'
};

export const CircleWithDetails = Template.bind({});
CircleWithDetails.args = {
    alternativeText: 'John Smith',
    variant: 'circle',
    size: 'x-large',
    presence: 'offline',
    status: 'unknown',
    primaryText: 'John Smith',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Offline',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS'
};

export const CircleWithCenteredDetails = Template.bind({});
CircleWithCenteredDetails.args = {
    alternativeText: 'John Smith',
    variant: 'circle',
    size: 'x-large',
    presence: 'offline',
    status: 'unknown',
    primaryText: 'John Smith',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Offline',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS',
    textPosition: 'center'
};

export const CircleWithLeftDetails = Template.bind({});
CircleWithLeftDetails.args = {
    alternativeText: 'John Smith',
    variant: 'circle',
    size: 'x-large',
    presence: 'offline',
    status: 'unknown',
    primaryText: 'John Smith',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Offline',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS',
    textPosition: 'left'
};

export const CircleWithPresenceAndDetails = Template.bind({});
CircleWithPresenceAndDetails.args = {
    alternativeText: 'John Smith',
    variant: 'circle',
    size: 'x-large',
    presence: 'busy',
    primaryText: 'John Smith',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Busy',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS'
};

export const BaseWithTags = Template.bind({});
BaseWithTags.args = {
    alternativeText: 'John Smith',
    size: 'xx-large',
    presence: 'busy',
    primaryText: 'John Smith',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Busy',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS',
    tags: tags
};

export const BaseWithAction = Template.bind({});
BaseWithAction.args = {
    alternativeText: 'John Smith',
    size: 'xx-large',
    presence: 'busy',
    primaryText: 'John Smith',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Busy',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS',
    actions: [
        {
            label: 'Take a profile picture',
            name: 'take-profile-picture',
            iconName: 'utility:photo'
        }
    ]
};

export const BaseWithActions = Template.bind({});
BaseWithActions.args = {
    alternativeText: 'John Smith',
    size: 'xx-large',
    presence: 'busy',
    primaryText: 'John Smith',
    secondaryText: 'VP, Human Resources',
    tertiaryText: 'Busy',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JS',
    actionPosition: 'bottom-left',
    actions: actions,
    actionMenuIcon: 'utility:threedots'
};

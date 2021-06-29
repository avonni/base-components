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

import { HoverableText } from '../__examples__/hoverableText';

export default {
    title: 'Data/Hoverable Text',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description:
                'Hoverable text. If no label is given, the href attribute will be used as a label.',
            table: {
                type: { summary: 'string' }
            }
        },
        href: {
            control: {
                type: 'text'
            },
            description:
                'href property of the label. If no label is given, the href will also be used as a label.',
            table: {
                type: { summary: 'string' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description: 'Title of the popover.',
            table: {
                type: { summary: 'string' }
            }
        },
        titleHref: {
            name: 'title-href',
            control: {
                type: 'text'
            },
            description:
                'href property of the popover title. If present, the title will be a link.',
            table: {
                type: { summary: 'string' }
            }
        },
        avatarSrc: {
            name: 'avatar-src',
            control: {
                type: 'text'
            },
            description:
                'Image URL for the avatar displayed before the popover title.',
            table: {
                type: { summary: 'string' }
            }
        },
        avatarFallbackIconName: {
            name: 'avatar-fallback-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used as a fallback when the avatar image fails to load. \nSpecify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        fields: {
            control: {
                type: 'object'
            },
            description: 'Array of field objects to display in the popover.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        popoverSize: {
            name: 'popover-size',
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'Width of the popover. Accepted values include small, medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        placement: {
            control: {
                type: 'select'
            },
            options: [
                'auto',
                'left',
                'right',
                'center',
                'bottom-left',
                'bottom-right',
                'bottom-center'
            ],
            defaultValue: 'left',
            description:
                'Determines the alignment of the popover relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the popover based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the popover is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            defaultValue: 'Loading',
            description:
                'Message displayed while the popover is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading' }
            }
        },
        theme: {
            control: {
                type: 'select'
            },
            options: ['default', 'shade', 'default-shade', 'inverse'],
            defaultValue: 'default',
            description:
                'Theme of the popover. Valid values include default, shade and inverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' }
            }
        }
    }
};

const fields = [
    {
        label: 'Account Name',
        value: 'Jane Doe Inc.',
        type: 'text'
    },
    {
        label: 'Phone',
        value: '514-222-3333',
        type: 'phone'
    },
    {
        label: 'Close date',
        value: new Date(),
        type: 'date',
        typeAttributes: {
            day: 'numeric',
            month: 'long'
        }
    }
];

const longFields = [
    {
        label: 'Account Name',
        value: 'Jane Doe',
        type: 'text'
    },
    {
        label: 'Phone',
        value: '514-222-3333',
        type: 'phone'
    },
    {
        label: 'Close date',
        value: new Date(),
        type: 'date',
        typeAttributes: {
            day: 'numeric',
            month: 'long'
        }
    },
    {
        label: 'Address',
        value: '6578 Holland avenue, Fake City on the Lake',
        type: 'text'
    },
    {
        label: 'Website',
        value: 'https://www.avonni.app/',
        type: 'text',
        typeAttributes: 'linkify'
    },
    {
        label: 'Email',
        value: 'janedoe@gmail.com',
        type: 'email'
    },
    {
        label: 'Company',
        value: 'Jane Doe Yarn Import Inc.',
        type: 'text'
    }
];

const Template = (args) => HoverableText(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Hover me',
    fields: fields
};

export const LargePopover = Template.bind({});
LargePopover.args = {
    href: 'https://www.avonni.app/',
    title: 'Title of the popover',
    titleHref: 'https://www.avonni.app/',
    fields: longFields,
    popoverSize: 'large',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    avatarFallbackIconName: 'standard:user'
};

export const SmallPopover = Template.bind({});
SmallPopover.args = {
    label: 'Small popover',
    fields: fields,
    popoverSize: 'small'
};

export const DefaultShadeTheme = Template.bind({});
DefaultShadeTheme.args = {
    label: 'Default-shade theme',
    title: 'Title of the popover',
    avatarFallbackIconName: 'standard:user',
    fields: fields,
    theme: 'default-shade'
};

export const ShadeTheme = Template.bind({});
ShadeTheme.args = {
    label: 'Shade theme',
    href: 'https://www.avonni.app/',
    title: 'Title of the popover',
    fields: fields,
    theme: 'shade'
};

export const InverseTheme = Template.bind({});
InverseTheme.args = {
    label: 'Inverse theme',
    href: 'https://www.avonni.app/',
    avatarFallbackIconName: 'standard:user',
    fields: fields,
    theme: 'inverse'
};

export const Loading = Template.bind({});
Loading.args = {
    label: 'Loading popover',
    title: 'Title of the popover',
    isLoading: true,
    loadingStateAlternativeText: 'Content loading...',
    avatarFallbackIconName: 'standard:user',
    fields: fields
};

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

import { ButtonMenuIllustration } from '../__examples__/buttonMenuIllustration';
import { ButtonMenuBase } from '../__examples__/buttonMenuBase';

export default {
    title: 'Example/Button Menu',
    argTypes: {
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the button menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text for the button menu.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show Menu' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: "If present, the popover can't be opened by users.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        draftAlternativeText: {
            name: 'draft-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Describes the reason for showing the draft indicator. This is required when is-draft is true.',
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
                "The name of the icon to be used in the format 'utility:down'. If an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:down' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, or medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        isDraft: {
            name: 'is-draft',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menu trigger shows a draft indicator.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the popover is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Popover'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the popover is in the loading state.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
            }
        },
        menuAlignment: {
            name: 'menu-alignment',
            control: {
                type: 'select'
            },
            options: [
                'auto',
                'left',
                'center',
                'right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
            description:
                'Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        nubbin: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'Displays title text when the mouse moves over the button menu.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
            }
        },
        tooltip: {
            control: {
                type: 'text'
            },
            description:
                'Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'The value for the button element. This value is optional and can be used when submitting a form.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'brand',
                'bare',
                'bare-inverse',
                'container',
                'border',
                'border-filled',
                'border-inverse'
            ],
            description:
                'The variant changes the appearance of buttonIcon. Accepted variants include bare, container, brand, border, border-filled, bare-inverse, and border-inverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        }
    },
    args: {
        alternativeText: 'Show Menu',
        disabled: false,
        iconName: 'utility:down',
        iconSize: 'medium',
        isDraft: false,
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
        menuAlignment: 'left',
        nubbin: false,
        variant: 'border'
    }
};

const Template = (args) => ButtonMenuBase(args);
const TemplateIllustration = (args) => ButtonMenuIllustration(args);

export const Base = Template.bind({});
export const Illustration = TemplateIllustration.bind({});

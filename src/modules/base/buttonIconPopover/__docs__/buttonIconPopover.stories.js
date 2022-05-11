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

import { ButtonIconPopover } from '../__examples__/buttonIconPopover';
import { ButtonIconPopoverWithToggle } from '../__examples__/buttonIconPopoverWithToggle';

export default {
    title: 'Example/Button Icon Popover',
    argTypes: {
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text for the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The tile can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
            }
        },
        hideCloseButton: {
            name: 'hide-close-button',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the close button of the popover is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Popover'
            }
        },
        iconClass: {
            name: 'icon-class',
            control: {
                type: 'text'
            },
            description:
                'The class to be applied to the contained icon element.',
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
                "The name of the icon to be used in the format 'utility:down'.",
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
        size: {
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium'],
            description:
                'The size of the buttonIcon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants, options include xx-small, x-small, small, and medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
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
        triggers: {
            control: {
                type: 'select'
            },
            options: ['click', 'hover', 'focus'],
            description:
                "Specify which triggers will show the popover. Supported values are 'click', 'hover', 'focus'.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'click' }
            }
        },
        placement: {
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
                'Determines the alignment of the popover relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the popover based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Popover'
            }
        },
        popoverSize: {
            name: 'popover-size',
            control: {
                type: 'select'
            },
            description:
                'Width of the popover. Accepted values include small, medium and large. ',
            options: ['small', 'medium', 'large'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
                category: 'Popover'
            }
        },
        popoverVariant: {
            name: 'popover-variant',
            control: {
                type: 'select'
            },
            options: ['base', 'warning', 'error', 'walkthrough'],
            description:
                'The variant changes the appearance of the popover. Accepted variants include base, warning, error, walkthrough.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' },
                category: 'Popover'
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'container',
                'border',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
            description:
                'The variant changes the appearance of buttonIcon. Accepted variants include bare, container, brand, border, border-filled, bare-inverse, and border-inverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
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
        disabled: {
            control: {
                type: 'boolean'
            },
            description: "If present, the popover can't be opened by users.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        disabled: false,
        hideCloseButton: false,
        isLoading: false,
        placement: 'left',
        popoverSize: 'medium',
        popoverVariant: 'base',
        size: 'medium',
        triggers: 'click',
        variant: 'border'
    }
};

const Template = (args) => ButtonIconPopover(args);
const TemplateWithToggle = (args) => ButtonIconPopoverWithToggle(args);

export const BaseWithPopoverBase = Template.bind({});
BaseWithPopoverBase.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text'
};

export const BaseWithPopoverLoading = Template.bind({});
BaseWithPopoverLoading.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text',
    isLoading: true
};

export const BaseWithPopoverWarning = Template.bind({});
BaseWithPopoverWarning.args = {
    iconName: 'utility:warning',
    iconClass: 'slds-icon-text-warning',
    tooltip: 'Tooltip text',
    size: 'small',
    popoverVariant: 'warning'
};

export const BaseWithToggleInDefaultSlot = TemplateWithToggle.bind({});
BaseWithToggleInDefaultSlot.args = {
    iconName: 'utility:favorite'
};

export const Brand = Template.bind({});
Brand.args = {
    iconName: 'utility:check',
    tooltip: 'Tooltip text',
    size: 'small',
    variant: 'brand'
};

export const BorderFilledWithGreenSuccessIcon = Template.bind({});
BorderFilledWithGreenSuccessIcon.args = {
    iconName: 'utility:success',
    iconClass: 'slds-icon-text-success',
    tooltip: 'Tooltip text',
    variant: 'border-filled'
};

export const BorderFilledWithLightCheckIcon = Template.bind({});
BorderFilledWithLightCheckIcon.args = {
    iconName: 'utility:check',
    iconClass: 'slds-icon-text-light',
    tooltip: 'Tooltip text',
    variant: 'border-filled'
};

export const BorderFilledWithLargePopoverWalkthrough = Template.bind({});
BorderFilledWithLargePopoverWalkthrough.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text',
    variant: 'border-filled',
    popoverVariant: 'walkthrough',
    popoverSize: 'large'
};

export const ContainerWithSmallPopoverError = Template.bind({});
ContainerWithSmallPopoverError.args = {
    iconName: 'utility:error',
    iconClass: 'slds-icon-text-error',
    tooltip: 'Tooltip text',
    variant: 'Container',
    popoverVariant: 'error',
    popoverSize: 'small'
};

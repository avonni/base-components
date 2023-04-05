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
        hideDownArrow: {
            name: 'hide-down-arrow',
            control: {
                type: 'boolean'
            },
            description:
                'If present the additional down arrow displayed on the right of the custom icon is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
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
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium or large.',
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
                'bare',
                'bare-inverse',
                'border',
                'border-filled',
                'border-inverse',
                'brand',
                'brand-outline',
                'container',
                'destructive',
                'destructive-text',
                'inverse',
                'neutral',
                'success'
            ],
            description:
                'The variant changes the look of the button. Accepted variants include bare, container, border, border-filled, bare-inverse, border-inverse, brand, brand-outline, destructive, destructive-text, success, neutral, inverse and success. The variant defaults to border when there is no label and to neutral when there is one.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        alternativeText: 'Show Menu',
        disabled: false,
        hideDownArrow: false,
        iconName: 'utility:down',
        iconSize: 'medium',
        isDraft: false,
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
        menuAlignment: 'left',
        nubbin: false
    }
};

const Template = (args) => ButtonMenuBase(args);
const TemplateIllustration = (args) => ButtonMenuIllustration(args);

export const Border = Template.bind({});

export const BorderWithLabel = Template.bind({});
BorderWithLabel.args = {
    label: 'Menu'
};

export const Bare = Template.bind({});
Bare.args = {
    variant: 'bare'
};

export const BareWithLabel = Template.bind({});
BareWithLabel.args = {
    variant: 'bare',
    label: 'Menu'
};

export const BareInverse = Template.bind({});
BareInverse.parameters = {
    backgrounds: {
        default: 'dark'
    }
};
BareInverse.args = {
    variant: 'bare-inverse'
};

export const BareInverseWithLabel = Template.bind({});
BareInverseWithLabel.parameters = {
    backgrounds: {
        default: 'dark'
    }
};
BareInverseWithLabel.args = {
    variant: 'bare-inverse',
    label: 'Menu'
};

export const BorderInverse = Template.bind({});
BorderInverse.parameters = {
    backgrounds: {
        default: 'dark'
    }
};
BorderInverse.args = {
    variant: 'border-inverse'
};

export const BorderInverseWithLabel = Template.bind({});
BorderInverseWithLabel.parameters = {
    backgrounds: {
        default: 'dark'
    }
};
BorderInverseWithLabel.args = {
    variant: 'border-inverse',
    label: 'Menu'
};

export const Brand = Template.bind({});
Brand.args = {
    variant: 'brand'
};

export const BrandWithLabel = Template.bind({});
BrandWithLabel.args = {
    variant: 'brand',
    label: 'Menu'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    variant: 'brand-outline'
};

export const BrandOutlineWithLabel = Template.bind({});
BrandOutlineWithLabel.args = {
    variant: 'brand-outline',
    label: 'Menu'
};

export const Container = Template.bind({});
Container.args = {
    variant: 'container'
};

export const ContainerWithLabel = Template.bind({});
ContainerWithLabel.args = {
    variant: 'container',
    label: 'Menu'
};

export const Destructive = Template.bind({});
Destructive.args = {
    variant: 'destructive'
};

export const DestructiveWithLabel = Template.bind({});
DestructiveWithLabel.args = {
    variant: 'destructive',
    label: 'Menu'
};

export const DestructiveText = Template.bind({});
DestructiveText.args = {
    variant: 'destructive-text'
};

export const DestructiveTextWithLabel = Template.bind({});
DestructiveTextWithLabel.args = {
    variant: 'destructive-text',
    label: 'Menu'
};

export const InverseXxSmall = Template.bind({});
InverseXxSmall.parameters = {
    backgrounds: {
        default: 'dark'
    }
};
InverseXxSmall.args = {
    variant: 'inverse'
};

export const InverseWithLabel = Template.bind({});
InverseWithLabel.parameters = {
    backgrounds: {
        default: 'dark'
    }
};
InverseWithLabel.args = {
    variant: 'inverse',
    label: 'Menu'
};

export const NeutralSmall = Template.bind({});
NeutralSmall.args = {
    iconSize: 'small',
    variant: 'neutral'
};

export const NeutralWithLabel = Template.bind({});
NeutralWithLabel.args = {
    variant: 'neutral',
    label: 'Menu'
};

export const SuccessLarge = Template.bind({});
SuccessLarge.args = {
    iconSize: 'large',
    variant: 'success'
};

export const SuccessWithLabel = Template.bind({});
SuccessWithLabel.args = {
    variant: 'success',
    label: 'Menu'
};
export const Illustration = TemplateIllustration.bind({});

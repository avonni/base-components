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

import { DynamicMenu } from '../__examples__/dynamicMenu';
import { DynamicMenuInGroup } from '../__examples__/dynamicMenuInGroup';

export default {
    title: 'Example/Dynamic Menu',
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
        buttonSize: {
            name: 'button-size',
            control: {
                type: 'radio'
            },
            options: ['auto', 'stretch'],
            description:
                'Size of the button. Available options include auto and stretch.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'auto' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the menu can be opened by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'The position of the icon if present with label. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the button-icon. Valid values include xx-small, x-small, medium, or large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menu is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description:
                'Fields: label, meta, value, avatar : {fallbackIconName, initials, src, alternativeText, size, variant}',
            table: {
                type: { summary: 'object[]' }
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
                'Message displayed while the menu is in the loading state.',
            table: {
                type: { summary: 'string' }
            }
        },
        menuAlignment: {
            name: 'menu-alignment',
            control: {
                type: 'select'
            },
            options: [
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
                defaultValue: { summary: 'false' }
            }
        },
        searchInputPlaceholder: {
            name: 'search-input-placeholder',
            control: {
                type: 'text'
            },
            description:
                'Text that is displayed when the field is empty, to prompt the user for a valid entry.',
            table: {
                defaultValue: { summary: 'Search…' },
                type: { summary: 'string' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'Displays tooltip text when the mouse moves over the button menu.',
            table: {
                type: { summary: 'string' }
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
                'container',
                'brand',
                'border',
                'border-filled',
                'bare-inverse',
                'border-inverse',
                'reset'
            ],
            description:
                'The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        },
        withSearch: {
            name: 'with-search',
            control: {
                type: 'boolean'
            },
            description: 'If present, display search box.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        buttonSize: 'auto',
        disabled: false,
        iconPosition: 'left',
        iconSize: 'medium',
        isLoading: false,
        menuAlignment: 'left',
        nubbin: false,
        searchInputPlaceholder: 'Search…',
        variant: 'border',
        withSearch: false
    }
};

const items = [
    {
        label: 'Acme',
        meta: ['Account', 'San Francisco'],
        value: 'acme',
        avatar: {
            fallbackIconName: 'standard:account',
            alternativeText: 'Account'
        }
    },
    {
        label: 'Remo',
        meta: ['Contact', 'San Francisco'],
        value: 'remo',
        avatar: {
            fallbackIconName: 'standard:contact',
            alternativeText: 'Contact'
        }
    },
    {
        label: 'Niko',
        meta: ['Lead', 'San Francisco'],
        value: 'niko',
        avatar: {
            fallbackIconName: 'standard:lead',
            alternativeText: 'Lead'
        }
    }
];

const Template = (args) => DynamicMenu(args);
const TemplateInGroup = (args) => DynamicMenuInGroup(args);

export const Base = Template.bind({});
Base.args = {
    items: items,
    iconName: 'utility:favorite',
    buttonSize: 'stretch'
};

export const BaseWithSearch = Template.bind({});
BaseWithSearch.args = {
    items: items,
    iconName: 'utility:favorite',
    withSearch: 'true'
};

export const Disabled = Template.bind({});
Disabled.args = {
    items: items,
    iconName: 'utility:favorite',
    disabled: 'true'
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    items: items,
    iconName: 'utility:favorite',
    isLoading: 'true'
};

export const BaseWithLabel = Template.bind({});
BaseWithLabel.args = {
    items: items,
    label: 'Menu',
    iconName: 'utility:favorite'
};

export const Stretched = Template.bind({});
Stretched.args = {
    items: items,
    label: 'Menu',
    iconName: 'utility:alert',
    buttonSize: 'stretch'
};

export const BorderFilled = Template.bind({});
BorderFilled.args = {
    items: items,
    iconName: 'utility:add',
    variant: 'border-filled'
};

export const Bare = Template.bind({});
Bare.args = {
    items: items,
    iconName: 'utility:add',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.args = {
    items: items,
    iconName: 'utility:favorite',
    variant: 'bare-inverse'
};

export const Container = Template.bind({});
Container.args = {
    items: items,
    alternativeText: 'Display Menu',
    iconName: 'utility:add',
    variant: 'container'
};

export const ListView = Template.bind({});
ListView.args = {
    items: items,
    label: 'Recently Viewed',
    iconName: 'utility:down',
    iconPosition: 'right',
    variant: 'reset'
};

export const InButtonGroup = TemplateInGroup.bind({});
InButtonGroup.args = {
    items: items,
    label: 'Dynamic menu'
};

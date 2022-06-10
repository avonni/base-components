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

import { Skeleton } from '../__examples__/skeleton';

export default {
    title: 'Example/Skeleton',
    argTypes: {
        animation: {
            name: 'animation',
            control: {
                type: 'select'
            },
            options: ['pulse', 'wave'],
            description:
                'The animation type changes the appearance of the skeleton.',
            table: {
                type: { summary: 'string' },
                category: 'Layout'
            }
        },
        height: {
            name: 'height',
            control: {
                type: 'text'
            },
            description: 'Height of the skeleton in px.',
            table: {
                type: { summary: 'string' },
                category: 'Layout'
            }
        },
        variantAttributes: {
            control: {
                name: 'variant-attributes',
                type: 'object'
            },
            description: 'Array of option objects.',
            table: {
                type: { summary: 'object' }
            }
        },
        variant: {
            name: 'variant',
            control: {
                type: 'select'
            },
            options: [
                'avatar',
                'badge',
                'breadcrumbs',
                'button',
                'button-icon',
                'chip',
                'combobox',
                'circular',
                'datatable',
                'input',
                'paragraph',
                'progress-indicator',
                'rectangular',
                'tabset',
                'text'
            ],
            description: 'The variant changes the appearance of the skeleton.',
            table: {
                type: { summary: 'string' },
                category: 'Layout'
            }
        },
        width: {
            name: 'width',
            control: {
                type: 'text'
            },
            description: 'Width of the skeleton in px.',
            table: {
                type: { summary: 'string' },
                category: 'Layout'
            }
        }
    },
    args: {
        variant: 'text'
    }
};

const Template = (args) => Skeleton(args);

export const Base = Template.bind({});

export const Avatar = Template.bind({});
Avatar.args = {
    variant: 'avatar',
    animation: 'pulse',
    variantAttributes: {
        variant: 'circle',
        size: 'medium'
    }
};

export const Chip = Template.bind({});
Chip.args = {
    variant: 'chip',
    animation: 'pulse',
    variantAttributes: {
        variant: 'brand',
        hasIcon: true,
        outline: false
    }
};

export const Badge = Template.bind({});
Badge.args = {
    variant: 'badge',
    animation: 'pulse',
    variantAttributes: {
        label: 'label',
        hasIcon: true
    }
};

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
    variant: 'breadcrumbs',
    animation: 'pulse',
    variantAttributes: {
        numBreadcrumbs: 3
    }
};

export const Button = Template.bind({});
Button.args = {
    variant: 'button',
    animation: 'pulse',
    variantAttributes: {
        variant: 'base',
        hasIcon: true,
        iconPosition: 'left'
    }
};

export const ButtonIcon = Template.bind({});
ButtonIcon.args = {
    variant: 'button-icon',
    animation: 'pulse',
    variantAttributes: {
        variant: 'base'
    }
};

export const Combobox = Template.bind({});
Combobox.args = {
    variant: 'combobox',
    animation: 'pulse',
    variantAttributes: {}
};

export const Datatable = Template.bind({});
Datatable.args = {
    variant: 'datatable',
    animation: 'pulse',
    variantAttributes: {
        hideCheckboxColumn: false,
        hideTableHeader: false
    }
};

export const Input = Template.bind({});
Input.args = {
    variant: 'input',
    animation: 'pulse',
    variantAttributes: {
        variant: '',
        required: true
    }
};

export const ProgressIndicator = Template.bind({});
ProgressIndicator.args = {
    variant: 'progress-indicator',
    animation: 'pulse',
    variantAttributes: {
        variant: 'path',
        steps: 3
    }
};

export const Paragraph = Template.bind({});
Paragraph.args = {
    variant: 'paragraph',
    animation: 'pulse',
    variantAttributes: {
        rows: 3
    }
};

export const Tabset = Template.bind({});
Tabset.args = {
    variant: 'tabset',
    animation: 'pulse',
    variantAttributes: {
        variant: '',
        tabs: 3
    }
};

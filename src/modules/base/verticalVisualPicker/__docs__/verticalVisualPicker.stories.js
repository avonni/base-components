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

import { VerticalVisualPicker } from '../__examples__/verticalVisualPicker';
import {
    baseItems,
    itemsWithIcons,
    itemsWithoutIcon,
    itemsWithImages,
    itemsWithImagesAndTags,
    itemsWithImagesRight
} from './data';

export default {
    title: 'Example/VerticalVisualPicker',
    argTypes: {
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, the visual picker is disabled.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validations'
            }
        },
        hideCheckMark: {
            name: 'hide-check-mark',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, hide the check mark.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description:
                'Array of items with attributes populating the visual picker.',
            table: {
                type: { summary: 'object' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label for the vertical visual picker',
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Optional message to be displayed when no checkbox is selected and the required attribute is set.',
            table: {
                type: { summary: 'string' },
                category: 'Validations'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'The name of the visual picker.',
            type: { required: true },
            table: {
                type: { summary: 'string' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, at least one item must be selected.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validations'
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'responsive'],
            defaultValue: 'medium',
            description:
                'It defines the width of the item. Valid values include small, medium, large and responsive.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['radio', 'checkbox'],
            defaultValue: 'radio',
            description: 'Valid values include radio and checkbox.',
            table: {
                defaultValue: { summary: 'radio' },
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description:
                'Value of the selected item. For the checkbox type, the value can be an array. Ex: [value1, value2]',
            table: {
                type: { summary: 'string | string[]' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['coverable', 'non-coverable'],
            defaultValue: 'non-coverable',
            description:
                'Changes the appearance of the vertical visual picker when selected. Valid values include coverable and non-coverable.',
            table: {
                defaultValue: { summary: 'non-coverable' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disabled: false,
        hideCheckMark: false,
        required: false
    }
};

const Template = (args) => VerticalVisualPicker(args);

export const Base = Template.bind({});
Base.args = {
    name: 'Vertical Visual Picker',
    label: 'Select an option',
    items: baseItems,
    value: 'item-3'
};

export const BaseWithIcons = Template.bind({});
BaseWithIcons.args = {
    name: 'Vertical Visual Picker',
    label: 'Base with icons',
    items: itemsWithIcons,
    value: 'lightning-professional'
};

export const BaseWithImages = Template.bind({});
BaseWithImages.args = {
    name: 'Vertical Visual Picker',
    label: 'Base with images',
    items: itemsWithImages
};

export const CoverableCheckbox = Template.bind({});
CoverableCheckbox.args = {
    name: 'Vertical Visual Picker',
    label: 'Coverable Checkbox',
    items: itemsWithoutIcon,
    variant: 'coverable',
    value: ['lightning-professional', 'lightning-unlimited'],
    type: 'checkbox',
    required: true
};

export const LargeWithImages = Template.bind({});
LargeWithImages.args = {
    name: 'Vertical Visual Picker',
    label: 'Large with images',
    items: itemsWithImagesRight,
    size: 'large',
    type: 'checkbox',
    value: ['sales-cloud', 'einstein-analytics']
};

export const ResponsiveWithImages = Template.bind({});
ResponsiveWithImages.args = {
    name: 'Vertical Visual Picker',
    label: 'Responsive with images',
    items: itemsWithImages,
    size: 'responsive'
};

export const ResponsiveWithImagesAndTags = Template.bind({});
ResponsiveWithImagesAndTags.args = {
    name: 'Vertical Visual Picker',
    label: 'Responsive with images and tags',
    items: itemsWithImagesAndTags,
    size: 'responsive',
    variant: 'coverable',
    hideCheckMark: true,
    value: 'sales-cloud'
};

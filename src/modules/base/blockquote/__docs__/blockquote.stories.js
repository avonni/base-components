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
import { Blockquote } from '../__examples__/blockquote';

export default {
    title: 'Example/Blockquote',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text and is displayed in the header.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description: 'Icon display next to the tile',
            table: {
                type: { summary: 'string' },
                category: 'Icon'
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['default', 'brand', 'warning', 'error', 'success'],
            defaultValue: 'default',
            description:
                'Valid values include default, brand, warning, error, success.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' }
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description:
                'Describes the position of the icon. Options include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Icon'
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            defaultValue: 'small',
            description:
                'Valid values include xx-small, x-small, small, medium, large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' },
                category: 'Icon'
            }
        }
    }
};

const Template = (args) => Blockquote(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Keep in mind'
};

export const Brand = Template.bind({});
Brand.args = {
    title: 'Keep in mind',
    variant: 'brand'
};

export const Warning = Template.bind({});
Warning.args = {
    title: 'Keep in mind',
    variant: 'warning'
};

export const Error = Template.bind({});
Error.args = {
    title: 'Keep in mind',
    variant: 'error'
};

export const Success = Template.bind({});
Success.args = {
    title: 'Keep in mind',
    variant: 'success'
};

export const BaseWithIcon = Template.bind({});
BaseWithIcon.args = {
    title: 'Keep in mind',
    iconName: 'utility:animal_and_nature'
};

export const BaseWithIconXxsmall = Template.bind({});
BaseWithIconXxsmall.args = {
    title: 'Keep in mind',
    iconName: 'utility:animal_and_nature',
    iconSize: 'xx-small'
};

export const BrandWithIcon = Template.bind({});
BrandWithIcon.args = {
    title: 'Keep in mind',
    iconName: 'utility:user',
    variant: 'brand'
};

export const WarningWithIconLarge = Template.bind({});
WarningWithIconLarge.args = {
    title: 'Warning',
    iconName: 'utility:warning',
    iconSize: 'large',
    variant: 'warning'
};

export const ErrorWithIconMedium = Template.bind({});
ErrorWithIconMedium.args = {
    title: 'Keep in mind',
    iconName: 'utility:error',
    iconSize: 'medium',
    variant: 'error'
};

export const SuccessWithIconRight = Template.bind({});
SuccessWithIconRight.args = {
    title: 'Keep in mind',
    iconName: 'utility:success',
    iconPosition: 'right',
    variant: 'success'
};

export const SuccessWithIconXsmall = Template.bind({});
SuccessWithIconXsmall.args = {
    title: 'Keep in mind',
    iconName: 'utility:success',
    iconSize: 'x-small',
    variant: 'success'
};

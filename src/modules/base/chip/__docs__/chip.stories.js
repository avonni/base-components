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

import { Chip } from '../__examples__/chip';

export default {
    title: 'Base/Chip',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Label display in the chip',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'brand',
                'inverse',
                'alt-inverse',
                'success',
                'info',
                'warning',
                'error',
                'offline'
            ],
            defaultValue: 'base',
            description:
                'The variant changes the appearance of the chip. Accepted variants include base, brand, inverse, alt-inverse, success, info, warning, error, offline.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        outline: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If true, display an outline style button.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        outline: false
    }
};

const Template = (args) => Chip(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Chip'
};

export const BaseOutline = Template.bind({});
BaseOutline.args = {
    label: 'Chip',
    outline: 'true'
};

export const Brand = Template.bind({});
Brand.args = {
    label: 'Chip',
    variant: 'brand'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    label: 'Chip',
    variant: 'brand',
    outline: 'true'
};

export const Inverse = Template.bind({});
Inverse.args = {
    label: 'Chip',
    variant: 'inverse'
};

export const InverseOutline = Template.bind({});
InverseOutline.args = {
    label: 'Chip',
    variant: 'inverse',
    outline: 'true'
};

export const AltInverse = Template.bind({});
AltInverse.args = {
    label: 'Chip',
    variant: 'alt-inverse'
};

export const AltInverseOutline = Template.bind({});
AltInverseOutline.args = {
    label: 'Chip',
    variant: 'alt-inverse',
    outline: 'true'
};

export const Success = Template.bind({});
Success.args = {
    label: 'Chip',
    variant: 'success'
};

export const SuccessOutline = Template.bind({});
SuccessOutline.args = {
    label: 'Chip',
    variant: 'success',
    outline: 'true'
};

export const Info = Template.bind({});
Info.args = {
    label: 'Chip',
    variant: 'info'
};

export const InfoOutline = Template.bind({});
InfoOutline.args = {
    label: 'Chip',
    variant: 'info',
    outline: 'true'
};

export const Warning = Template.bind({});
Warning.args = {
    label: 'Chip',
    variant: 'warning'
};

export const WarningOutline = Template.bind({});
WarningOutline.args = {
    label: 'Chip',
    variant: 'warning',
    outline: 'true'
};

export const Error = Template.bind({});
Error.args = {
    label: 'Chip',
    variant: 'error'
};

export const ErrorOutline = Template.bind({});
ErrorOutline.args = {
    label: 'Chip',
    variant: 'error',
    outline: 'true'
};

export const Offline = Template.bind({});
Offline.args = {
    label: 'Chip',
    variant: 'offline'
};

export const OfflineOutline = Template.bind({});
OfflineOutline.args = {
    label: 'Chip',
    variant: 'offline',
    outline: 'true'
};

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

import { Barcode } from '../__examples__/barcode';

export default {
    title: 'Example/Barcode',
    argTypes: {
        background: {
            control: 'color',
            description: 'Defines the background color of the barcode.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' },
                category: 'Color'
            }
        },
        color: {
            control: 'color',
            description: 'Defines the color of the barcode.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#000000' },
                category: 'Color'
            }
        },
        size: {
            control: {
                type: 'number'
            },
            description: 'Defines the width of the barcode.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 300 },
                category: 'Layout'
            }
        },
        hideValue: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the barcode value is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
                category: 'Layout'
            }
        },
        checksum: {
            control: {
                type: 'boolean'
            },
            description:
                'If set to true, the Barcode will display the checksum digit next to the value in the text area.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
                category: 'Layout'
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: [
                'EAN8',
                'EAN13',
                'UPCE',
                'UPCA',
                'Code11',
                'CODE39',
                'Code39Extended',
                'Code93',
                'Code93Extended',
                'CODE128',
                'CODE128A',
                'CODE128B',
                'CODE128C',
                'GS1-128',
                'MSI10',
                'MSImod11',
                'MSImod1010',
                'MSImod1110',
                'POSTNET'
            ],
            description: 'The type changes the encoding of the barcode value.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'CODE39' },
                category: 'Values'
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: 'Defines the value of the barcode.',
            table: {
                type: { summary: 'string' },
                category: 'Values'
            }
        }
    }
};

const Template = (args) => Barcode(args);

export const Base = Template.bind({});
Base.args = {
    background: '#ffffff',
    color: '#000000',
    size: 300,
    hideValue: false
};

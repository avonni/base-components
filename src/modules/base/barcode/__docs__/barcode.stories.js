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
                category: 'Color'
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
                category: 'Values'
            }
        },
        color: {
            control: 'color',
            description: 'Defines the color of the barcode.',
            table: {
                type: { summary: 'string' },
                category: 'Color'
            }
        },
        height: {
            control: {
                type: 'number'
            },
            description: 'Defines the max-height of the barcode.',
            table: {
                type: { summary: 'number' },
                category: 'Layout'
            }
        },
        hideValue: {
            name: 'hide-value',
            control: {
                type: 'boolean'
            },
            description: 'If present, the barcode value is hidden.',
            table: {
                type: { summary: 'boolean' },
                category: 'Values'
            }
        },
        textColor: {
            name: 'text-color',
            control: 'color',
            description: 'Defines the color of the text.',
            table: {
                type: { summary: 'string' },
                category: 'Color'
            }
        },
        textAlignment: {
            name: 'text-alignment',
            control: 'select',
            options: [
                'top-left',
                'top-center',
                'top-right',
                'top-justify',
                'center-left',
                'center-center',
                'center-right',
                'center-justify',
                'bottom-left',
                'bottom-center',
                'bottom-right',
                'bottom-justify'
            ],
            description: 'Defines the horizontal text alignment.',
            table: {
                type: { summary: 'string' },
                category: 'Layout'
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: [
                'auspost',
                'azteccode',
                'azteccodecompact',
                'aztecrune',
                'bc412',
                'channelcode',
                'codablockf',
                'code11',
                'code128',
                'code16k',
                'code2of5',
                'code32',
                'code39',
                'code39ext',
                'code49',
                'code93',
                'code93ext',
                'codeone',
                'coop2of5',
                'daft',
                'databarexpanded',
                'databarexpandedcomposite',
                'databarexpandedstacked',
                'databarexpandedstackedcomposite',
                'databarlimited',
                'databarlimitedcomposite',
                'databaromni',
                'databaromnicomposite',
                'databarstacked',
                'databarstackedcomposite',
                'databarstackedomni',
                'databarstackedomnicomposite',
                'databartruncated',
                'databartruncatedcomposite',
                'datalogic2of5',
                'datamatrix',
                'datamatrixrectangular',
                'datamatrixrectangularextension',
                'dotcode',
                'ean13',
                'ean13composite',
                'ean14',
                'ean2',
                'ean5',
                'ean8',
                'ean8composite',
                'flattermarken',
                'gs1-128',
                'gs1-128composite',
                'gs1-cc',
                'gs1datamatrix',
                'gs1datamatrixrectangular',
                'gs1dotcode',
                'gs1northamericancoupon',
                'gs1qrcode',
                'hanxin',
                'hibcazteccode',
                'hibccodablockf',
                'hibccode128',
                'hibccode39',
                'hibcdatamatrix',
                'hibcdatamatrixrectangular',
                'hibcmicropdf417',
                'hibcpdf417',
                'hibcqrcode',
                'iata2of5',
                'identcode',
                'industrial2of5',
                'interleaved2of5',
                'isbn',
                'ismn',
                'issn',
                'itf14',
                'japanpost',
                'kix',
                'leitcode',
                'matrix2of5',
                'maxicode',
                'micropdf417',
                'microqrcode',
                'msi',
                'onecode',
                'pdf417',
                'pdf417compact',
                'pharmacode',
                'pharmacode2',
                'planet',
                'plessey',
                'posicode',
                'postnet',
                'pzn',
                'qrcode',
                'rationalizedCodabar',
                'raw',
                'rectangularmicroqrcode',
                'royalmail',
                'sscc18',
                'symbol',
                'telepen',
                'telepennumeric',
                'ultracode',
                'upca',
                'upcacomposite',
                'upce',
                'upcecomposite'
            ],
            description: 'The type of encoding selected to create the barcode.',
            table: {
                type: { summary: 'string' },
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
        },
        width: {
            control: {
                type: 'number'
            },
            description: 'Defines the width of the barcode.',
            table: {
                type: { summary: 'number' },
                category: 'Layout'
            }
        }
    },
    args: {
        background: '#ffffff',
        checksum: true,
        color: '#000000',
        hideValue: false,
        textColor: '#000000',
        textAlignment: 'bottom-center',
    }
};

const Template = (args) => Barcode(args);

export const azteccode = Template.bind({});
azteccode.args = {
    value: '12000-311123',
    type: 'azteccode',
    height: 150
};

export const code11 = Template.bind({});
code11.args = {
    value: '12000-311123',
    type: 'code11',
    height: 150
};

export const datamatrix = Template.bind({});
datamatrix.args = {
    value: 'https://www.avonni.app',
    type: 'datamatrix',
    height: 150
};

export const upcecomposite = Template.bind({});
upcecomposite.args = {
    value: '00123457|(15)021231',
    type: 'upcecomposite',
    height: 150
};

export const qrcode = Template.bind({});
qrcode.args = {
    value: 'https://www.avonni.app',
    type: 'qrcode',
    height: 150
};

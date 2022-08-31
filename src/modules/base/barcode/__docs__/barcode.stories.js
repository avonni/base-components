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
                category: 'Layout'
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
            control: {
                type: 'boolean'
            },
            description: 'If present, the barcode value is hidden.',
            table: {
                type: { summary: 'boolean' },
                category: 'Layout'
            }
        },
        textColor: {
            control: 'color',
            description: 'Defines the color of the text.',
            table: {
                type: { summary: 'string' },
                category: 'Color'
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
                'mailmark',
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
                'upcecomposite'],
            description: 'The type changes the encoding of the barcode value.',
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
        checksum: false,
        color: '#000000',
        hideValue: false,
        textColor: '#000000'
    }
};

const Template = (args) => Barcode(args);

// export const Base = Template.bind({});
// Base.args = {
//     value: '1',
//     height: 150,
//     width: 200
// };

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

export const code39 = Template.bind({});
code39.args = {
    value: '12000-311123',
    type: 'code39',
    height: 150
};

export const databarexpanded = Template.bind({});
databarexpanded.args = {
    value: '(01)95012345678903(3103)000123',
    type: 'databarexpanded',
    height: 150
};

export const databarstackedcomposite = Template.bind({});
databarstackedcomposite.args = {
    value: '(01)03412345678900|(17)010200',
    type: 'databarstackedcomposite',
    height: 150
};

export const datamatrix = Template.bind({});
datamatrix.args = {
    value: 'https://www.avonni.app',
    type: 'datamatrix',
    height: 150
};

export const dotcode = Template.bind({});
dotcode.args = {
    value: 'Takes any input',
    type: 'dotcode',
    height: 150
};

export const ean13 = Template.bind({});
ean13.args = {
    value: '2112345678900',
    type: 'ean13',
    height: 150
};

export const gs1_128 = Template.bind({});
gs1_128.args = {
    value: '(01)95012345678903(3103)000123',
    type: 'gs1-128',
    height: 150
};

export const gs1northamericancoupon = Template.bind({});
gs1northamericancoupon.args = {
    value: '(8110)106141416543213500110000310123196000',
    type: 'gs1northamericancoupon',
    height: 150
};

export const gs1qrcode = Template.bind({});
gs1qrcode.args = {
    value: '(01)03453120000011(8200)https://www.avonni.app(10)ABCD1234(410)9501101020917',
    type: 'gs1qrcode',
    height: 150
};

export const hanxin = Template.bind({});
hanxin.args = {
    value: '12000-311123',
    type: 'hanxin',
    height: 150
};

export const isbn = Template.bind({});
isbn.args = {
    value: '978-3-16-148410-0', // add format to doc 
    type: 'isbn',
    height: 150
};

export const pdf417 = Template.bind({});
pdf417.args = {
    value: '12000-311123',
    type: 'pdf417',
    height: 150
};

export const plessey = Template.bind({});
plessey.args = {
    value: '01234ABCD',
    type: 'plessey',
    height: 150
};

export const postnet = Template.bind({});
postnet.args = {
    value: '12000',
    type: 'postnet',
    width: 200
};

export const qrcode = Template.bind({});
qrcode.args = {
    value: 'https://www.avonni.app',
    type: 'qrcode',
    width: 300
};

export const ultracode = Template.bind({});
ultracode.args = {
    value: 'https://www.avonni.app',
    type: 'ultracode',
    height: 150
};

export const upca = Template.bind({});
upca.args = {
    value: '1200034',
    type: 'upca',
    height: 150
};

export const upce = Template.bind({});
upce.args = {
    value: '1200034',
    type: 'upce',
    height: 150
};
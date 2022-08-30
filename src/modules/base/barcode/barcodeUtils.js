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

export const BWIPP_ENCODERS = [
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
'upcecomposite']

export const BARCODE_VALUE_FORMAT = new Map([
    ['auspost', 'Example: 5956439111ABA 9'],
    ['azteccode', 'Must be a sequence of at least one alphanumeric character'],
    ['azteccodecompact', 'Must be a sequence of at least one alphanumeric character'],
    ['aztecrune', 'Must be a number between 0 and 255'],
    ['bc412', 'Must contain only digits and capital letters except O'],
    ['channelcode', 'Must be 2 to 7 digits'],
    ['codablockf', ''],
    ['code11', 'Must contain only digits'],
    ['code128', 'any sequence of at least one alphanumeric character'],
    ['code16k', ''],
    ['code2of5', ''],
    ['code32', ''],
    ['code39', 'Must contain only digits'],
    ['code39ext', 'any sequence of at least one alphanumeric character'],
    ['code49', ''],
    ['code93', 'Must contain only digits'],
    ['code93ext', 'Must contain only digits'],
    ['codeone', ''],
    ['coop2of5', 'Must contain only digits'],
    ['daft', ''],
    ['databarexpanded', ''],
    ['databarexpandedcomposite', ''],
    ['databarexpandedstacked', ''],
    ['databarexpandedstackedcomposite', ''],
    ['databarlimited', ''],
    ['databarlimitedcomposite', ''],
    ['databaromni', ''],
    ['databaromnicomposite', ''],
    ['databarstacked', ''],
    ['databarstackedcomposite', ''],
    ['databarstackedomni', ''],
    ['databarstackedomnicomposite', ''],
    ['databartruncated', ''],
    ['databartruncatedcomposite', ''],
    ['datalogic2of5', ''],
    ['datamatrix', ''],
    ['datamatrixrectangular', ''],
    ['datamatrixrectangularextension', ''],
    ['dotcode', ''],
    ['ean13', 'Must be a 12 digits long number.'],
    ['ean13composite', 'Example: 2112345678900|(99)1234-abcd'],
    ['ean14', ''],
    ['ean2', ''],
    ['ean5', ''],
    ['ean8', '7 digits'],
    ['ean8composite', ''],
    ['flattermarken', ''],
    ['gs1-128', 'Must follow pattern (--)--------------(--)------(--)-------'],
    ['gs1-128composite', ''],
    ['gs1-cc', ''],
    ['gs1datamatrix', ''],
    ['gs1datamatrixrectangular', ''],
    ['gs1dotcode', ''],
    ['gs1northamericancoupon', ''],
    ['gs1qrcode', ''],
    ['hanxin', ''],
    ['hibcazteccode', ''],
    ['hibccodablockf', ''],
    ['hibccode128', ''],
    ['hibccode39', ''],
    ['hibcdatamatrix', ''],
    ['hibcdatamatrixrectangular', ''],
    ['hibcmicropdf417'],
    ['hibcpdf417', ''],
    ['hibcqrcode', ''],
    ['iata2of5', ''],
    ['identcode', ''],
    ['industrial2of5', ''],
    ['interleaved2of5', ''],
    ['isbn', 'Must start with 978 or 979 and follow hiphenatino pattern: 978-3-16-148410-0'],
    ['ismn', ''],
    ['issn', ''],
    ['itf14', ''],
    ['japanpost', ''],
    ['kix', ''],
    ['leitcode', ''],
    ['mailmark', ''],
    ['matrix2of5', ''],
    ['maxicode', ''],
    ['micropdf417', ''],
    ['microqrcode', ''],
    ['msi', ''],
    ['onecode', ''],
    ['pdf417', ''],
    ['pdf417compact', ''],
    ['pharmacode', ''],
    ['pharmacode2', ''],
    ['planet', ''],
    ['plessey', ''],
    ['posicode', ''],
    ['postnet', '5 digits'],
    ['pzn', ''],
    ['qrcode', ''],
    ['rationalizedCodabar', ''],
    ['raw', ''],
    ['rectangularmicroqrcode', ''],
    ['royalmail', ''],
    ['sscc18', ''],
    ['symbol', ''],
    ['telepen', ''],
    ['telepennumeric', ''],
    ['ultracode', ''],
    ['upca', '7 digits'],
    ['upcacomposite', ''],
    ['upce', '7 digits'],
    ['upcecomposite', '']
])

// DONOT COMMIT: TEMPORARY NOTES
// BWIPP Encoder	Barcode Description
// auspost	        AusPost 4 State Customer Code
// azteccode	    Aztec Code
// azteccodecompact	Compact Aztec Code
// aztecrune	    Aztec Runes
// bc412	        BC412
// channelcode	    Channel Code
// codablockf	    Codablock F
// code11	        Code 11
// code128	        Code 128
// code16k	        Code 16K
// code2of5	        Code 25
// code32	        Italian Pharmacode
// code39	        Code 39
// code39ext	    Code 39 Extended
// code49	        Code 49
// code93	        Code 93
// code93ext	    Code 93 Extended
// codeone	        Code One
// coop2of5	        COOP 2 of 5
// daft	            Custom 4 state symbology
// databarexpanded	                GS1 DataBar Expanded
// databarexpandedcomposite	        GS1 DataBar Expanded Composite
// databarexpandedstacked	        GS1 DataBar Expanded Stacked
// databarexpandedstackedcomposite	GS1 DataBar Expanded Stacked Composite
// databarlimited	                GS1 DataBar Limited
// databarlimitedcomposite	        GS1 DataBar Limited Composite
// databaromni	                    GS1 DataBar Omnidirectional
// databaromnicomposite	            GS1 DataBar Omnidirectional Composite
// databarstacked	                GS1 DataBar Stacked
// databarstackedcomposite	        GS1 DataBar Stacked Composite
// databarstackedomni	            GS1 DataBar Stacked Omnidirectional
// databarstackedomnicomposite	    GS1 DataBar Stacked Omnidirectional Composite
// databartruncated	                GS1 DataBar Truncated
// databartruncatedcomposite	    GS1 DataBar Truncated Composite
// datalogic2of5	                Datalogic 2 of 5
// datamatrix	                    Data Matrix
// datamatrixrectangular	        Data Matrix Rectangular
// datamatrixrectangularextension	Data Matrix Rectangular Extension
// dotcode	        DotCode
// ean13	        EAN-13
// ean13composite	EAN-13 Composite
// ean14	        GS1-14
// ean2	            EAN-2 (2 digit addon)
// ean5	            EAN-5 (5 digit addon)
// ean8	            EAN-8
// ean8composite	EAN-8 Composite
// flattermarken	Flattermarken
// gs1-128	        GS1-128
// gs1-128composite	GS1-128 Composite
// gs1-cc	        GS1 Composite 2D Component
// gs1datamatrix	GS1 Data Matrix
// gs1datamatrixrectangular	    GS1 Data Matrix Rectangular
// gs1dotcode	                GS1 DotCode
// gs1northamericancoupon	    GS1 North American Coupon
// gs1qrcode	                GS1 QR Code
// hanxin	            Han Xin Code
// hibcazteccode	    HIBC Aztec Code
// hibccodablockf	    HIBC Codablock F
// hibccode128	        HIBC Code 128
// hibccode39	        HIBC Code 39
// hibcdatamatrix	    HIBC Data Matrix
// hibcdatamatrixrectangular	HIBC Data Matrix Rectangular
// hibcmicropdf417	    HIBC MicroPDF417
// hibcpdf417	        HIBC PDF417
// hibcqrcode	        HIBC QR Code
// iata2of5	            IATA 2 of 5
// identcode	        Deutsche Post Identcode
// industrial2of5	    Industrial 2 of 5
// interleaved2of5	    Interleaved 2 of 5 (ITF)
// isbn	    ISBN
// ismn	    ISMN
// issn	    ISSN
// itf14	ITF-14
// japanpost	        Japan Post 4 State Customer Code
// kix	                Royal Dutch TPG Post KIX
// leitcode	            Deutsche Post Leitcode
// mailmark	            Royal Mail Mailmark
// matrix2of5	        Matrix 2 of 5
// maxicode	            MaxiCode
// micropdf417	        MicroPDF417
// microqrcode	        Micro QR Code
// msi	                MSI Modified Plessey
// onecode	            USPS Intelligent Mail
// pdf417	            PDF417
// pdf417compact	    Compact PDF417
// pharmacode	        Pharmaceutical Binary Code
// pharmacode2	        Two-track Pharmacode
// planet	            USPS PLANET
// plessey	            Plessey UK
// posicode	            PosiCode
// postnet	            USPS POSTNET
// pzn	                Pharmazentralnummer (PZN)
// qrcode	            QR Code
// rationalizedCodabar	Codabar
// raw	                Custom 1D symbology
// rectangularmicroqrcode	Rectangular Micro QR Code
// royalmail	        Royal Mail 4 State Customer Code
// sscc18	            SSCC-18
// symbol	            Miscellaneous symbols
// telepen	            Telepen
// telepennumeric	    Telepen Numeric
// ultracode	        Ultracode
// upca	            UPC-A
// upcacomposite	UPC-A Composite
// upce	            UPC-E
// upcecomposite	UPC-E Composite

// list of all BWIPP formats and their descriptions

// BWIPP Encoder	Barcode Description

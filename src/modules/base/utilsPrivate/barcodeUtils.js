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

export const LIBRARY_ENCODING_VALUE = new Map([
    ['EAN8', 'ean8'],
    ['EAN13', 'ean13'],
    ['UPCE', 'upce'],
    ['UPCA', 'upca'],
    ['Code11', 'code11'],
    ['CODE39', 'code39'],
    ['Code39Extended', 'code39ext'],
    ['Code93', 'code93'],
    ['Code93Extended', 'code93ext'],
    ['CODE128', 'CODE128'],
    ['CODE128A', 'CODE128'],
    ['CODE128B', 'CODE128'],
    ['CODE128C', 'CODE128'],
    ['GS1-128', 'gsi-128'],
    ['MSImod10', 'MSI10'],
    ['MSImod11', 'MSI11'],
    ['MSImod1010', 'MSI1010'],
    ['MSImod1110', 'MSI1110'],
    ['POSTNET', 'postnet']
]);

export const BARCODE_LIBRARY = new Map([
    ['EAN8', 'bwipjs'],
    ['EAN13', 'bwipjs'],
    ['UPCE', 'bwipjs'],
    ['UPCA', 'bwipjs'],
    ['Code11', 'bwipjs'],
    ['CODE39', 'bwipjs'],
    ['Code39Extended', 'bwipjs'],
    ['Code93', 'bwipjs'],
    ['Code93Extended', 'bwipjs'],
    ['CODE128', 'jsbarcode'],
    ['CODE128A', 'jsbarcode'],
    ['CODE128B', 'jsbarcode'],
    ['CODE128C', 'jsbarcode'],
    ['GS1-128', 'bwipjs'],
    ['MSImod10', 'jsbarcode'],
    ['MSImod11', 'jsbarcode'],
    ['MSImod1010', 'jsbarcode'],
    ['MSImod1110', 'jsbarcode'],
    ['POSTNET', 'bwipjs']
]);

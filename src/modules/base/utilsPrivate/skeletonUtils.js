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

export const CHIP_VARIANT_VALUES = new Map([
    [
        'success',
        {
            background: '#2e844a',
            backgroundAnimation: '#4eb571',
            labelColor: '#ffffff'
        }
    ],
    [
        'brand',
        {
            background: '#0070d1',
            backgroundAnimation: '#3292e6',
            labelColor: '#ffffff'
        }
    ],
    [
        'inverse',
        {
            background: '#001639',
            backgroundAnimation: '#244c8c',
            labelColor: '#ffffff'
        }
    ],
    [
        'alt-inverse',
        {
            background: '#032d60',
            backgroundAnimation: '#23538c',
            labelColor: '#ffffff'
        }
    ],
    [
        'info',
        {
            background: '#706e6b',
            backgroundAnimation: '#8c8c8b',
            labelColor: '#ffffff'
        }
    ],
    [
        'warning',
        {
            background: '#fe9339',
            backgroundAnimation: '#fcac68',
            labelColor: '#000000'
        }
    ],
    [
        'error',
        {
            background: '#ea001e',
            backgroundAnimation: '#ff6679',
            labelColor: '#ffffff'
        }
    ],
    [
        'offline',
        {
            background: '#444444',
            backgroundAnimation: '#7d7d7d',
            labelColor: '#ffffff'
        }
    ],
    [
        'base',
        {
            background: '#ecebea',
            backgroundAnimation: '#dedede',
            labelColor: '#c4c4c4'
        }
    ]
]);

export const BADGE_VARIANT_VALUES = new Map([
    [
        'inverse',
        {
            background: '#747474',
            backgroundAnimation: '#8c8c8c',
            labelColor: '#ffffff'
        }
    ],
    [
        'lightest',
        {
            background: '#ffffff',
            backgroundAnimation: '#e3e3e3',
            labelColor: '#ffffff'
        }
    ],
    [
        'success',
        {
            background: '#2e844a',
            backgroundAnimation: '#55a16e',
            labelColor: '#ffffff'
        }
    ],
    [
        'warning',
        {
            background: '#fe9339',
            backgroundAnimation: '#ffab63',
            labelColor: '#000000'
        }
    ],
    [
        'error',
        {
            background: '#ea001e',
            backgroundAnimation: '#f75c6f',
            labelColor: '#ffffff'
        }
    ],
    [
        'base',
        {
            background: '#ecebea',
            backgroundAnimation: '#dedede',
            labelColor: '#c4c4c4'
        }
    ]
]);

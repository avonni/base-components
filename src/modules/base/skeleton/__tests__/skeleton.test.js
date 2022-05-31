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

import { createElement } from 'lwc';
import Skeleton from '../skeleton';

let element;
describe('Skeleton', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-skeleton', {
            is: Skeleton
        });
        document.body.appendChild(element);
    });

    it('Skeleton: Default attributes', () => {
        expect(element.animation).toBeUndefined();
        expect(element.height).toBeUndefined();
        expect(element.variant).toBe('text');
        expect(element.width).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // skeleton-variant
    it('Skeleton: text variant', () => {
        element.variant = 'text';
        return Promise.resolve().then(() => {
            expect(element.variant).toBe('text');
        });
    });

    // skeleton-animation
    it('Skeleton: animation = pulse', () => {
        element.animation = 'pulse';
        return Promise.resolve().then(() => {
            expect(element.animation).toBe('pulse');
        });
    });

    // Skeleton-width
    it('Skeleton: width = 100px', () => {
        element.width = 100;
        return Promise.resolve().then(() => {
            expect(element.width).toBe(100);
        });
    });

    // Skeleton-height variant rectangular
    it('Skeleton: height = 100px with rectangular variant', () => {
        element.variant = 'rectangular';
        element.height = 100;
        return Promise.resolve().then(() => {
            expect(element.height).toBe(100);
        });
    });

    // Skeleton-height variant text
    it('Skeleton: switch case calls setTextSize on text variant with undefined width and height', () => {
        element.variant = 'text';
        return Promise.resolve().then(() => {
            expect(element.height).toBe('0.7em');
            expect(element.width).toBe('100%');
        });
    });

    // Skeleton-height variant rectangular
    it('Skeleton: switch case calls setRectangularCircularSize on rectangular variant with undefined width and height', () => {
        element.variant = 'rectangular';
        return Promise.resolve().then(() => {
            expect(element.height).toBe('1.2em');
            expect(element.width).toBe('100%');
        });
    });

    // Skeleton-height variant circular
    it('Skeleton: switch case calls setRectangularCircularSize on circular variant with undefined width and height', () => {
        element.variant = 'circular';
        return Promise.resolve().then(() => {
            expect(element.height).toBe('1.2em');
            expect(element.width).toBe('100%');
        });
    });

    it('Skeleton: switch case calls setTextSize on text variant without undefined width and height', () => {
        element.variant = 'text';
        element.height = '10px';
        element.width = '100%';
        return Promise.resolve().then(() => {
            expect(element.height).toBe('10px');
            expect(element.width).toBe('100%');
        });
    });

    // Skeleton-height variant rectangular
    it('Skeleton: switch case calls setRectangularCircularSize on rectangular variant without undefined width and height', () => {
        element.variant = 'rectangular';
        element.height = '50px';
        element.width = '100%';
        return Promise.resolve().then(() => {
            expect(element.height).toBe('50px');
            expect(element.width).toBe('100%');
        });
    });

    // Skeleton-height variant circular
    it('Skeleton: switch case calls setRectangularCircularSize on circular variant without undefined width and height', () => {
        element.variant = 'circular';
        element.height = '50px';
        element.width = '100%';
        return Promise.resolve().then(() => {
            expect(element.height).toBe('50px');
            expect(element.width).toBe('100%');
        });
    });
});

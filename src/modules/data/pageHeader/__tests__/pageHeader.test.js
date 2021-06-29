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
import DataPageHeader from '../pageHeader';

// not tested
// iconName, label, title, info, variant because already tested in pageHeader

describe('DataPageHeader', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('data-page-header', {
            is: DataPageHeader
        });

        expect(element.iconName).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.info).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.fields).toEqual([]);
    });

    // fields
    // Depends on variant
    it('fields with variant = record-home', () => {
        const element = createElement('data-page-header', {
            is: DataPageHeader
        });
        document.body.appendChild(element);
        const fields = [
            {
                label: 'Currency',
                value: 70,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'EUR',
                    currencyDisplayAs: 'name',
                    minimumIntegerDigits: 2
                }
            },
            {
                label: 'Email',
                value: 'Avonni@Avonni.com',
                type: 'email',
                typeAttributes: {
                    hideIcon: 'true'
                }
            }
        ];

        element.fields = fields;
        element.variant = 'record-home';

        return Promise.resolve().then(() => {
            const detailsSlot = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );
            const primitiveFields = element.shadowRoot.querySelectorAll(
                'c-output-data'
            );

            expect(detailsSlot).toBeFalsy();
            primitiveFields.forEach((field, index) => {
                const correspondingField = fields[index];
                expect(correspondingField).toBeTruthy();
                expect(field.typeAttributes).toMatchObject(
                    correspondingField.typeAttributes
                );
                expect(field.label).toBe(correspondingField.label);
                expect(field.value).toBe(correspondingField.value);
                expect(field.type).toBe(correspondingField.type);
            });
        });
    });

    it('fields with variant = record-home-vertical', () => {
        const element = createElement('data-page-header', {
            is: DataPageHeader
        });
        document.body.appendChild(element);
        const fields = [
            {
                label: 'Currency',
                value: 70,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'EUR',
                    currencyDisplayAs: 'name',
                    minimumIntegerDigits: 2
                }
            },
            {
                label: 'Email',
                value: 'Avonni@Avonni.com',
                type: 'email',
                typeAttributes: {
                    hideIcon: 'true'
                }
            }
        ];

        element.fields = fields;
        element.variant = 'record-home-vertical';

        return Promise.resolve().then(() => {
            const detailsSlot = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );
            const primitiveFields = element.shadowRoot.querySelectorAll(
                'c-output-data'
            );

            expect(detailsSlot).toBeFalsy();
            primitiveFields.forEach((field, index) => {
                const correspondingField = fields[index];
                expect(correspondingField).toBeTruthy();
                expect(field.typeAttributes).toMatchObject(
                    correspondingField.typeAttributes
                );
                expect(field.label).toBe(correspondingField.label);
                expect(field.value).toBe(correspondingField.value);
                expect(field.type).toBe(correspondingField.type);
            });
        });
    });
});

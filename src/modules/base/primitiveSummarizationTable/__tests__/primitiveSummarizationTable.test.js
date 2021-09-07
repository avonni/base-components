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
import PrimitiveSummarizationTable from 'c/primitiveSummarizationTable';
import { computedSummarizeArray } from './data';

let element = null;
describe('Primitive Summarization Table', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('c-primitive-summarization-table', {
            is: PrimitiveSummarizationTable
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.computedSummarizeArray).toMatchObject([]);
        expect(element.hideCheckboxColumn).toBeUndefined();
        expect(element.isDatatableEditable).toBeUndefined();
        expect(element.primitiveColumnsWidth).toMatchObject([]);
        expect(element.tableWidth).toBeUndefined();
    });

    it('Computed Summarize Array', () => {
        element.computedSummarizeArray = computedSummarizeArray;

        return Promise.resolve().then(() => {
            expect(element.computedSummarizeArray).toMatchObject(
                computedSummarizeArray
            );
        });
    });

    it('Hide checkbox column truthy', () => {
        element.computedSummarizeArray = computedSummarizeArray;
        element.hideCheckboxColumn = true;

        return Promise.resolve().then(() => {
            const rowNumberColumn = element.shadowRoot.querySelector(
                'td[data-role="checkbox"]'
            );
            expect(rowNumberColumn).toBeFalsy();
        });
    });

    it('Hide checkbox column falsy', () => {
        element.computedSummarizeArray = computedSummarizeArray;
        element.hideCheckboxColumn = false;

        return Promise.resolve().then(() => {
            const rowNumberColumn = element.shadowRoot.querySelector(
                'td[data-role="checkbox"]'
            );
            expect(rowNumberColumn).toBeTruthy();
        });
    });

    it('Is Datatable Editable truthy', () => {
        element.computedSummarizeArray = computedSummarizeArray;
        element.isDatatableEditable = true;

        return Promise.resolve().then(() => {
            const rowNumberColumn = element.shadowRoot.querySelector(
                'td[data-role="row-number"]'
            );
            expect(rowNumberColumn).toBeTruthy();
        });
    });

    it('Is Datatable Editable falsy', () => {
        element.computedSummarizeArray = computedSummarizeArray;
        element.isDatatableEditable = false;

        return Promise.resolve().then(() => {
            const rowNumberColumn = element.shadowRoot.querySelector(
                'td[data-role="row-number"]'
            );
            expect(rowNumberColumn).toBeFalsy();
        });
    });

    it('Primitive table width', () => {
        element.computedSummarizeArray = computedSummarizeArray;
        element.primitiveColumnsWidth = [52, 32, 219, 280, 130, 219, 219, 219];

        return Promise.resolve().then(() => {
            const gridCells = element.shadowRoot.querySelectorAll('td');
            gridCells.forEach((cell, index) => {
                expect(cell.style.maxWidth).toBe(
                    element.primitiveColumnsWidth[index] + 'px'
                );
                expect(cell.style.minWidth).toBe(
                    element.primitiveColumnsWidth[index] + 'px'
                );
            });
        });
    });

    it('Table Width', () => {
        element.computedSummarizeArray = computedSummarizeArray;
        element.tableWidth = 1000;

        return Promise.resolve().then(() => {
            const table = element.shadowRoot.querySelector('table');
            expect(table.style.width).toBe('1000px');
        });
    });
});

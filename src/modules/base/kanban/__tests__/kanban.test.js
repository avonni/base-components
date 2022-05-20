/* eslint-disable jest/no-focused-tests */
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
import Kanban from '../kanban';
import { ACTIONS, FIELDS, GROUP_VALUES, RECORDS } from './data';

let element;
describe('Kanban', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-kanban', {
            is: Kanban
        });
        document.body.appendChild(element);
    });

    it('Kanban : Default attributes', () => {
        expect(element.groupValues).toMatchObject([]);
        expect(element.fields).toMatchObject([]);
        expect(element.records).toMatchObject([]);
        expect(element.summarizeFieldName).toBeUndefined();
        expect(element.actions).toMatchObject([]);
        expect(element.readOnly).toBeFalsy();
        expect(element.groupFieldName).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // groupValues
    it('Kanban : groupValues', () => {
        element.groupValues = GROUP_VALUES;
        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                '[data-element-id="path-group"]'
            );
            expect(groups[0].textContent).toBe('Open');
            expect(groups[1].textContent).toBe('In Progress');
            expect(groups[2].textContent).toBe('Closed');
        });
    });

    // records
    it('Kanban : records', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'amount';
        element.actions = ACTIONS;
        return Promise.resolve().then(() => {
            const records = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__group"]'
            );
            expect(records.children.length).toBe(4);
        });
    });

    // fields
    it('Kanban : fields', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'amount';
        element.actions = ACTIONS;
        return Promise.resolve().then(() => {
            const fields = element.shadowRoot.querySelector(
                '[data-element-id="fields"]'
            );
            expect(fields.children.length).toBe(FIELDS.length + 2);
        });
    });

    // summarize
    it('Kanban : summarize', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'amount';
        element.actions = ACTIONS;
        return Promise.resolve().then(() => {
            const summarize = element.shadowRoot.querySelector(
                '[data-element-id="summarize"]'
            );
            expect(summarize.value).toBe(46770);
        });
    });

    // readOnly
    it('Kanban : readOnly true', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'amount';
        element.actions = ACTIONS;
        element.readOnly = true;
        return Promise.resolve().then(() => {
            const tile = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__tile"]'
            );
            tile.dispatchEvent(new MouseEvent('mousedown'));
            expect(tile.classList).not.toContain('avonni-kanban__dragged');
        });
    });

    // actions
    it('Kanban : actions', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'amount';
        element.actions = ACTIONS;
        return Promise.resolve().then(() => {
            const actions = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-kanban__action"]'
            );
            expect(actions[0].label).toBe('Action 1');
            expect(actions[0].value).toBe('Action 1');
            expect(actions[0].disabled).toBeFalsy();
            expect(actions[1].label).toBe('Action 2');
            expect(actions[1].value).toBe('Action 2');
            expect(actions[1].disabled).toBeFalsy();
            expect(actions[2].label).toBe('Action 3');
            expect(actions[2].value).toBe('Action 3');
            expect(actions[2].disabled).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // it('Kanban : tile drag', () => {
    //     element.groupValues = GROUP_VALUES;
    //     element.records = RECORDS;
    //     element.fields = FIELDS;
    //     element.groupFieldName = 'status';
    //     element.summarizeFieldName = 'amount';
    //     element.actions = ACTIONS;
    //     return Promise.resolve().then(() => {
    //         const tile = element.shadowRoot.querySelector(
    //             '[data-element-id="avonni-kanban__tile"]'
    //         );
    //         Object.setPrototypeOf(tile.parentElement, {
    //             offsetWidth: 100
    //         });
    //         tile.dispatchEvent(new MouseEvent('mousedown'), {
    //             clientX: 100,
    //             clientY: 100,

    //             currentTarget: tile,
    //             target: {
    //                 type: 'number'
    //             }
    //         });
    //         tile.dispatchEvent(new MouseEvent('mousemove'), {
    //             clientX: 100,
    //             clientY: 100,

    //             currentTarget: tile,
    //             target: {
    //                 type: 'number'
    //             }
    //         });
    //         expect(tile.classList).toContain('avonni-kanban__dragged');
    //     });
    // });
});

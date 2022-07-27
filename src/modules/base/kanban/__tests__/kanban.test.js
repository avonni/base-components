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
        expect(element.disableItemDragAndDrop).toBeFalsy();
        expect(element.disableColumnDragAndDrop).toBeFalsy();
        expect(element.groupFieldName).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.variant).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // groupValues
    it('Kanban : groupValues', () => {
        element.groupValues = GROUP_VALUES;
        element.variant = 'path';
        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                '[data-element-id="path-group"]'
            );
            expect(groups[0].textContent).toEqual(
                expect.stringContaining('Open')
            );
            expect(groups[1].textContent).toEqual(
                expect.stringContaining('In Progress')
            );
            expect(groups[2].textContent).toEqual(
                expect.stringContaining('Closed')
            );
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
            expect(records.children.length).toBe(3);
        });
    });

    // subgroups
    it('Kanban : subgroups', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'amount';
        element.subGroupFieldName = 'assignee';
        element.actions = ACTIONS;
        return Promise.resolve().then(() => {
            const records = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__group"]'
            );
            expect(records.children.length).toBe(1);
        });
    });

    // hideHeader
    it('Kanban : hideHeader', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'amount';
        element.hideHeader = true;
        element.actions = ACTIONS;
        return Promise.resolve().then(() => {
            const summarize = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__summarize_wrapper"]'
            );
            expect(summarize).toBeNull();
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
            expect(fields.children.length).toBe(FIELDS.length + 1);
        });
    });

    // summarize
    it('Kanban : summarize', () => {
        jest.useFakeTimers();
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'Amount';
        element.actions = ACTIONS;
        return Promise.resolve().then(() => {
            jest.runAllTimers();
            const summarize = element.shadowRoot.querySelector(
                '[data-element-id="summarize"]'
            );
            expect(summarize.value).toBe(46770);
        });
    });

    // drag and drop disabled
    it('Kanban : disableItemDragAndDrop true', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'Amount';
        element.actions = ACTIONS;
        element.disableItemDragAndDrop = true;
        return Promise.resolve().then(() => {
            const tile = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__tile"]'
            );
            tile.dispatchEvent(new MouseEvent('mousedown'));
            expect(tile.classList).not.toContain('avonni-kanban__dragged');
        });
    });

    it('Kanban : tile drag and drop', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'Amount';
        element.actions = ACTIONS;
        element.subGroupFieldName = 'Available';
        return Promise.resolve().then(() => {
            const tile = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__tile"]'
            );
            // To avoid division by 0
            Object.defineProperty(tile.parentElement, 'offsetWidth', {
                value: 1
            });
            // To avoid division by 0
            Object.defineProperty(tile, 'offsetHeight', {
                value: 1
            });
            tile.dispatchEvent(new MouseEvent('mousedown'));

            // mousemove is handled on the kanban, not the tile
            tile.parentElement.parentElement.dispatchEvent(
                new MouseEvent('mousemove')
            );
            expect(tile.classList).toContain('avonni-kanban__dragged');
            tile.dispatchEvent(new MouseEvent('mouseup'));
            expect(tile.classList).not.toContain('avonni-kanban__dragged');
        });
    });

    it('Kanban : group drag and drop', () => {
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
        element.fields = FIELDS;
        element.groupFieldName = 'status';
        element.summarizeFieldName = 'Amount';
        element.actions = ACTIONS;
        element.variant = 'base';
        return Promise.resolve().then(() => {
            const group = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__group_header"]'
            );

            group.dispatchEvent(new MouseEvent('mousedown'));

            // mousemove is handled on the kanban, not the group
            group.parentElement.parentElement.dispatchEvent(
                new MouseEvent('mousemove')
            );

            expect(group.parentElement.classList).toContain(
                'avonni-kanban__dragged_group'
            );
            group.dispatchEvent(new MouseEvent('mouseup'));
            expect(group.parentElement.classList).not.toContain(
                'avonni-kanban__dragged_group'
            );
        });
    });
});

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
import PrimitiveSchedulerEventOccurrence from '../primitiveSchedulerEventOccurrence';
import {
    CELL_DURATION,
    CELL_HEIGHT,
    CELL_WIDTH,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    FROM,
    OFFSET_SIDE,
    RESOURCE_KEY,
    RESOURCES,
    TO,
    HOUR_HEADER_CELLS
} from './defaults';

let element;
describe('Primitive Scheduler Event Occurrence: timeline variants', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-scheduler-event-occurrence', {
            is: PrimitiveSchedulerEventOccurrence
        });
        element.getBoundingClientRect = jest.fn(() => {
            return {
                height: ELEMENT_HEIGHT,
                width: ELEMENT_WIDTH
            };
        });
        document.body.appendChild(element);
        element.from = FROM;
        element.to = TO;
        element.cellDuration = CELL_DURATION;
        element.cellWidth = CELL_WIDTH;
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.color = 'rgb(3, 56, 7)';
        element.occurrence = {
            offsetSide: OFFSET_SIDE,
            numberOfEventsInThisTimeFrame: 2
        };
        element.theme = 'default';
    });

    // timeline-horizontal
    it('Scheduler event occurence as timeline-horizontal', () => {
        element.variant = 'timeline-horizontal';
        element.headerCells = { xAxis: HOUR_HEADER_CELLS };
        element.labels = { center: { fieldName: 'title' } };

        return Promise.resolve().then(() => {
            expect(element.classList).toContain(
                'avonni-scheduler__event_horizontal'
            );
            const y = RESOURCES[0].height + OFFSET_SIDE;
            const x = CELL_WIDTH * 2;
            const width = CELL_WIDTH * 2;
            expect(element.style.width).toBe(`${width}px`);
            expect(element.style.height).toBeFalsy();
            expect(element.style.transform).toBe(`translate(${x}px, ${y}px)`);
            expect(element.endPosition).toBe(x + ELEMENT_WIDTH);
            expect(element.startPosition).toBe(x);

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid slds-grid_vertical-align-center slds-p-vertical_xx-small'
            );
            expect(centerLabel.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center slds-p-horizontal_x-small'
            );
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-p-horizontal_x-small slds-text-color_inverse slds-current-color avonni-scheduler__event_default'
            );
            expect(eventContent.style.cssText).toBe(
                'background-color: rgb(3, 56, 7); --avonni-primitive-scheduler-event-occurrence-background-color: rgb(3, 56, 7);'
            );
        });
    });

    it('Scheduler event occurence as timeline-horizontal: disabled = true', () => {
        element.variant = 'timeline-horizontal';
        element.disabled = true;

        return Promise.resolve().then(() => {
            expect(element.style.width).toBeFalsy();
            expect(element.style.height).toBe(`${RESOURCES[1].height}px`);
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-theme_alert-texture avonni-scheduler__disabled-date slds-theme_shade slds-is-absolute'
            );
            expect(wrapper.style.cssText).toBeFalsy();
        });
    });

    it('Scheduler event occurence as timeline-horizontal: referenceLine = true', () => {
        element.variant = 'timeline-horizontal';
        element.referenceLine = true;
        element.headerCells = { xAxis: HOUR_HEADER_CELLS };

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(wrapper.className).toBe(
                'avonni-scheduler__reference-line slds-is-absolute'
            );
        });
    });

    // timeline-vertical
    it('Scheduler event occurence as timeline-vertical', () => {
        element.variant = 'timeline-vertical';
        element.headerCells = { yAxis: HOUR_HEADER_CELLS };
        element.cellHeight = CELL_HEIGHT;
        element.labels = { center: { fieldName: 'title' } };

        return Promise.resolve().then(() => {
            expect(element.className).toBeFalsy();
            expect(element.style.width).toBe(`${CELL_WIDTH / 2}px`);
            expect(element.style.height).toBe(`${CELL_HEIGHT * 2}px`);
            expect(element.style.transform).toBe(
                `translate(${CELL_WIDTH + OFFSET_SIDE}px, ${CELL_HEIGHT * 2}px)`
            );
            expect(element.endPosition).toBe(CELL_HEIGHT * 2 + ELEMENT_HEIGHT);
            expect(element.startPosition).toBe(CELL_HEIGHT * 2);

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-scheduler__event-wrapper_vertical'
            );
            expect(centerLabel.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center'
            );
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-p-horizontal_x-small slds-text-color_inverse slds-current-color avonni-scheduler__event_default avonni-scheduler__event_vertical'
            );
            expect(eventContent.style.cssText).toBe(
                'background-color: rgb(3, 56, 7); --avonni-primitive-scheduler-event-occurrence-background-color: rgb(3, 56, 7);'
            );
        });
    });

    it('Scheduler event occurence as timeline-vertical: disabled = true', () => {
        element.variant = 'timeline-vertical';
        element.disabled = true;

        return Promise.resolve().then(() => {
            expect(element.style.height).toBeFalsy();
            expect(element.style.width).toBe(`${CELL_WIDTH}px`);
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-theme_alert-texture avonni-scheduler__disabled-date slds-theme_shade slds-is-absolute'
            );
            expect(wrapper.style.cssText).toBeFalsy();
        });
    });

    it('Scheduler event occurence as timeline-vertical: referenceLine = true', () => {
        element.variant = 'timeline-vertical';
        element.referenceLine = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(wrapper.className).toBe(
                'avonni-scheduler__reference-line slds-is-absolute avonni-scheduler__reference-line_vertical'
            );
        });
    });
});

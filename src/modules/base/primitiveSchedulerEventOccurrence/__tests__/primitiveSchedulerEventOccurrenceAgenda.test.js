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
import { FROM, RESOURCE_KEY, RESOURCES, TO } from './defaults';

let element;
describe('Primitive Scheduler Event Occurrence: agenda variant', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-scheduler-event-occurrence', {
            is: PrimitiveSchedulerEventOccurrence
        });
        document.body.appendChild(element);
        element.variant = 'agenda';
        element.from = FROM;
        element.to = TO;
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.color = 'rgb(51, 51, 51)';
    });

    it('Scheduler event occurence as agenda', () => {
        element.title = 'Some title';
        element.labels = {
            center: { fieldName: 'title' },
            left: { fieldName: 'color' }
        };

        return Promise.resolve().then(() => {
            expect(element.classList).toContain(
                'avonni-scheduler__standalone-event'
            );
            expect(element.shadowRoot.host.style.width).toBeFalsy();
            expect(element.shadowRoot.host.style.height).toBeFalsy();
            expect(element.shadowRoot.host.style.transform).toBe(
                'translate(0px, 0px)'
            );

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            const leftLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-left-label-wrapper"]'
            );
            expect(leftLabel).toBeFalsy();
            expect(wrapper.className).toBe('slds-grid');
            expect(centerLabel.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center slds-grid_vertical-align-center'
            );
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-p-horizontal_x-small avonni-scheduler__event_display-as-dot'
            );
            expect(eventContent.style.cssText).toBeFalsy();
        });
    });

    it('Scheduler event occurence as agenda, spans on several days', () => {
        element.from = new Date(2022, 7, 23, 10);
        element.to = new Date(2022, 7, 25, 16, 30);
        element.occurrence = {
            startsInPreviousCell: true,
            endsInLaterCell: true
        };
        element.theme = 'default';
        element.labels = { center: { fieldName: 'title' } };

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.style.width).toBeFalsy();
            expect(element.shadowRoot.host.style.height).toBeFalsy();

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid slds-grid_vertical-align-center slds-p-bottom_xx-small'
            );
            expect(label.className).toBe(
                'slds-truncate slds-grid avonni-scheduler__event-label_center slds-p-horizontal_x-small'
            );
            expect(eventContent.className).toBe(
                'avonni-scheduler__event slds-grid slds-has-flexi-truncate slds-col slds-p-horizontal_x-small slds-text-color_inverse slds-current-color avonni-scheduler__event_standalone-multi-day-starts-in-previous-cell avonni-scheduler__event_standalone-multi-day-ends-in-later-cell avonni-scheduler__event_default'
            );
            expect(eventContent.style.cssText).toBe(
                'background-color: rgb(51, 51, 51); --avonni-primitive-scheduler-event-occurrence-background-color: rgb(51, 51, 51);'
            );
        });
    });

    it('Scheduler event occurence as agenda: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-theme_alert-texture avonni-scheduler__disabled-date avonni-scheduler__disabled-date_standalone slds-p-horizontal_x-small slds-m-bottom_xx-small slds-is-relative'
            );
            expect(wrapper.style.cssText).toBe(
                'background-color: rgba(51, 51, 51, 0.3); --avonni-primitive-scheduler-event-occurrence-background-color: rgba(51, 51, 51, 0.3);'
            );
        });
    });

    it('Scheduler event occurence as agenda: disabled = true, spans on several days', () => {
        element.from = new Date(2022, 7, 23, 10);
        element.to = new Date(2022, 7, 25, 16, 30);
        element.occurrence = {
            startsInPreviousCell: true,
            endsInLaterCell: true
        };
        element.disabled = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-theme_alert-texture avonni-scheduler__disabled-date avonni-scheduler__disabled-date_standalone slds-p-horizontal_x-small slds-m-bottom_xx-small slds-is-relative avonni-scheduler__event_month-multi-day-starts-in-previous-cell avonni-scheduler__event_month-multi-day-ends-in-later-cell'
            );
        });
    });

    it('Scheduler event occurence as agenda: referenceLine = true', () => {
        element.referenceLine = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(wrapper.className).toBe(
                'avonni-scheduler__reference-line slds-is-absolute avonni-scheduler__reference-line_standalone'
            );
        });
    });
});

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
import PrimitiveSchedulerEventOccurrence from 'c/primitiveSchedulerEventOccurrence';

// Not tested because depends on DOM measurements:
// leftLabelWidth
// rightLabelWidth
// rightPosition
// width

const CELL_WIDTH = 50;
const CELL_HEIGHT = 30;
const CELL_DURATION = 3599999;
const HEADER_CELLS = [
    {
        start: new Date(2021, 7, 30, 6).getTime(),
        end: new Date(2021, 7, 30, 7).getTime() - 1
    },
    {
        start: new Date(2021, 7, 30, 7).getTime(),
        end: new Date(2021, 7, 30, 8).getTime() - 1
    },
    {
        start: new Date(2021, 7, 30, 8).getTime(),
        end: new Date(2021, 7, 30, 9).getTime() - 1
    },
    {
        start: new Date(2021, 7, 30, 9).getTime(),
        end: new Date(2021, 7, 30, 10).getTime() - 1
    },
    {
        start: new Date(2021, 7, 30, 10).getTime(),
        end: new Date(2021, 7, 30, 11).getTime() - 1
    }
];
const FROM = new Date(2021, 7, 30, 8);
const TO = new Date(2021, 7, 30, 10);
const RESOURCE_KEY = '3';
const RESOURCES = [
    {
        name: '1',
        height: 30,
        color: 'rgb(0, 0, 0)',
        data: {
            customField: 'Some useless string',
            overwrittenField: 'Another useless string',
            height: 30,
            name: '1',
            color: 'rgb(0, 0, 0)'
        }
    },
    {
        name: '3',
        height: 50,
        color: 'rgb(51, 51, 51)',
        data: {
            customField: 'Row field',
            overwrittenField: 'This will not show',
            height: 50,
            name: '3',
            color: 'rgb(51, 51, 51)'
        }
    }
];

let element;
describe('PrimitiveSchedulerEventOccurrence', () => {
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
    });

    it('Scheduler event occurence: Default attributes', () => {
        expect(element.color).toBeUndefined();
        expect(element.cellDuration).toBe(0);
        expect(element.headerCells).toMatchObject([]);
        expect(element.cellWidth).toBe(0);
        expect(element.dateFormat).toBe('ff');
        expect(element.disabled).toBeFalsy();
        expect(element.eventData).toMatchObject({});
        expect(element.eventName).toBeUndefined();
        expect(element.from).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.labels).toMatchObject({});
        expect(element.startPosition).toBe(0);
        expect(element.occurrence).toMatchObject({});
        expect(element.occurrenceKey).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.referenceLine).toBeFalsy();
        expect(element.rightPosition).toBe(0);
        expect(element.resourceKey).toBeUndefined();
        expect(element.resources).toMatchObject([]);
        expect(element.scrollOffset).toBe(0);
        expect(element.theme).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.to).toBeUndefined();
        expect(element.variant).toBe('horizontal');
        expect(element.width).toBe(0);
        expect(element.x).toBe(0);
        expect(element.y).toBe(0);
        expect(element.zoomToFit).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */
    // NB: almost all attributes depends on from and to

    // color
    // Depends on theme, rows and rowKey
    it('Scheduler event occurence: color', () => {
        element.from = FROM;
        element.to = TO;
        element.color = 'tomato';
        element.theme = 'default';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event'
            );
            expect(event.style.backgroundColor).toBe('tomato');
        });
    });

    it('Scheduler event occurence: color defined by the row color', () => {
        element.from = FROM;
        element.to = TO;
        element.theme = 'default';
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event'
            );
            expect(event.style.backgroundColor).toBe('rgb(51, 51, 51)');
        });
    });

    // date-format
    // Depends on labels, rows and rowKey
    it('Scheduler event occurence: dateFormat', () => {
        element.from = FROM;
        element.to = TO;
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.labels = {
            center: {
                fieldName: 'from'
            }
        };
        element.dateFormat = 'dd/LL/yy';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"] span'
            );
            expect(label.textContent).toBe('30/08/21');
        });
    });

    // disabled
    // Depends on rows and rowKey
    it('Scheduler event occurence: disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const disabledEvent = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date'
            );
            expect(disabledEvent).toBeFalsy();
        });
    });

    it('Scheduler event occurence: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const disabledEvent = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date'
            );
            expect(disabledEvent).toBeTruthy();
        });
    });

    it('Scheduler event occurence: disabled occurrence height', () => {
        element.disabled = true;
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;

        return Promise.resolve().then(() => {
            expect(element.style.height).toBe('50px');
        });
    });

    // event-data
    // Depends on labels, rows and rowKey
    it('Scheduler event occurence: eventData', () => {
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.labels = {
            center: {
                fieldName: 'customField'
            }
        };
        element.eventData = {
            customField: 'Custom string'
        };

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"] span'
            );
            expect(label.textContent).toBe('Custom string');
        });
    });

    // icon-name
    // Depends on disabled
    it('Scheduler event occurence: iconName', () => {
        element.disabled = true;
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date-title lightning-icon'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // labels
    // Depends on title, eventData, rows and rowKey
    it('Scheduler event occurence: labels', () => {
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.title = 'Title of the event';
        element.labels = {
            top: {
                fieldName: 'title'
            },
            bottom: {
                value: 'Some string',
                iconName: 'utility:apps'
            },
            left: {
                fieldName: 'customField',
                iconName: 'utility:user'
            },
            right: {
                fieldName: 'overwrittenField'
            }
        };
        element.eventData = {
            overwrittenField: 'Event field',
            title: 'This will not show'
        };

        return Promise.resolve().then(() => {
            const leftLabel = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_left span'
            );
            const leftIcon = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_left lightning-icon'
            );
            expect(leftIcon.iconName).toBe('utility:user');
            expect(leftLabel.textContent).toBe('Row field');

            const rightLabel = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_right span'
            );
            const rightIcon = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_right lightning-icon'
            );
            expect(rightIcon).toBeFalsy();
            expect(rightLabel.textContent).toBe('Event field');

            const topLabel = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_top span'
            );
            const topIcon = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_top lightning-icon'
            );
            expect(topIcon).toBeFalsy();
            expect(topLabel.textContent).toBe('Title of the event');

            const bottomLabel = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_bottom span'
            );
            const bottomIcon = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_bottom lightning-icon'
            );
            expect(bottomIcon.iconName).toBe('utility:apps');
            expect(bottomLabel.textContent).toBe('Some string');
        });
    });

    it('Scheduler event occurence: only center label is displayed with vertical variant', () => {
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.variant = 'vertical';
        element.title = 'Title of the event';
        element.labels = {
            top: {
                fieldName: 'title'
            },
            bottom: {
                value: 'Some string',
                iconName: 'utility:apps'
            },
            center: {
                fieldName: 'customField',
                iconName: 'standard:account'
            },
            left: {
                fieldName: 'customField',
                iconName: 'utility:user'
            },
            right: {
                fieldName: 'overwrittenField'
            }
        };
        element.eventData = {
            overwrittenField: 'Event field',
            title: 'This will not show'
        };

        return Promise.resolve().then(() => {
            const leftLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-left-label-wrapper"]'
            );
            expect(leftLabel).toBeFalsy();

            const rightLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-right-label-wrapper"]'
            );
            expect(rightLabel).toBeFalsy();

            const topLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-top-label-wrapper"]'
            );
            expect(topLabel).toBeFalsy();

            const bottomLabel = element.shadowRoot.querySelector(
                '[data-element-id="div-bottom-label-wrapper"]'
            );
            expect(bottomLabel).toBeFalsy();

            const centerLabel = element.shadowRoot.querySelector(
                '[data-element-id="span-center-label"]'
            );
            expect(centerLabel.textContent).toBe('Row field');
            const centerIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-center-label"]'
            );
            expect(centerIcon.iconName).toBe('standard:account');
        });
    });

    // read-only
    // Depends on disabled and referenceLine
    it('Scheduler event occurence: read-only = false', () => {
        element.readOnly = false;
        const dblClickHandler = jest.fn();
        const mouseDownHandler = jest.fn();
        element.addEventListener('privatedblclick', dblClickHandler);
        element.addEventListener('privatemousedown', mouseDownHandler);

        return Promise.resolve().then(() => {
            const eventWrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            eventWrapper.dispatchEvent(new CustomEvent('dblclick'));
            const mouseDown = new CustomEvent('mousedown');
            mouseDown.button = 0;
            eventWrapper.dispatchEvent(mouseDown);

            expect(dblClickHandler).toHaveBeenCalled();
            expect(mouseDownHandler).toHaveBeenCalled();

            const resizeIcons = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__event-resize-icon'
            );
            expect(resizeIcons).toHaveLength(2);
        });
    });

    it('Scheduler event occurence: read-only = false, disabled occurrence', () => {
        element.readOnly = false;
        element.disabled = true;
        const disabledDblClickHandler = jest.fn();
        const mouseDownHandler = jest.fn();
        element.addEventListener(
            'privatedisableddblclick',
            disabledDblClickHandler
        );
        element.addEventListener('privatedisabledmousedown', mouseDownHandler);

        return Promise.resolve().then(() => {
            const eventWrapper = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date'
            );
            const mouseDown = new CustomEvent('mousedown');
            mouseDown.button = 0;
            eventWrapper.dispatchEvent(mouseDown);
            eventWrapper.dispatchEvent(new CustomEvent('dblclick'));

            expect(disabledDblClickHandler).toHaveBeenCalled();
            expect(mouseDownHandler).toHaveBeenCalled();
        });
    });

    it('Scheduler event occurence: read-only = false, reference line', () => {
        element.readOnly = false;
        element.referenceLine = true;
        const disabledDblClickHandler = jest.fn();
        const mouseDownHandler = jest.fn();
        element.addEventListener(
            'privatedisableddblclick',
            disabledDblClickHandler
        );
        element.addEventListener('privatedisabledmousedown', mouseDownHandler);

        return Promise.resolve().then(() => {
            const eventWrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            const mouseDown = new CustomEvent('mousedown');
            mouseDown.button = 0;
            eventWrapper.dispatchEvent(mouseDown);
            eventWrapper.dispatchEvent(new CustomEvent('dblclick'));

            expect(disabledDblClickHandler).toHaveBeenCalled();
            expect(mouseDownHandler).toHaveBeenCalled();
        });
    });

    it('Scheduler event occurence: read-only = true', () => {
        element.readOnly = true;
        const dblClickHandler = jest.fn();
        const mouseDownHandler = jest.fn();
        element.addEventListener('privatedblclick', dblClickHandler);
        element.addEventListener('privatemousedown', mouseDownHandler);

        return Promise.resolve().then(() => {
            const eventWrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            eventWrapper.dispatchEvent(new CustomEvent('dblclick'));
            const mouseDown = new CustomEvent('mousedown');
            mouseDown.button = 0;
            eventWrapper.dispatchEvent(mouseDown);

            expect(dblClickHandler).not.toHaveBeenCalled();
            expect(mouseDownHandler).not.toHaveBeenCalled();

            const resizeIcons = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__event-resize-icon'
            );
            expect(resizeIcons).toHaveLength(0);
        });
    });

    it('Scheduler event occurence: read-only = true, disabled occurrence', () => {
        element.readOnly = true;
        element.disabled = true;
        const disabledDblClickHandler = jest.fn();
        const mouseDownHandler = jest.fn();
        element.addEventListener(
            'privatedisableddblclick',
            disabledDblClickHandler
        );
        element.addEventListener('privatedisabledmousedown', mouseDownHandler);

        return Promise.resolve().then(() => {
            const eventWrapper = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date'
            );
            const mouseDown = new CustomEvent('mousedown');
            mouseDown.button = 0;
            eventWrapper.dispatchEvent(mouseDown);
            eventWrapper.dispatchEvent(new CustomEvent('dblclick'));

            expect(disabledDblClickHandler).not.toHaveBeenCalled();
            expect(mouseDownHandler).not.toHaveBeenCalled();
        });
    });

    it('Scheduler event occurence: read-only = true, reference line', () => {
        element.readOnly = true;
        element.referenceLine = true;
        const disabledDblClickHandler = jest.fn();
        const mouseDownHandler = jest.fn();
        element.addEventListener(
            'privatedisableddblclick',
            disabledDblClickHandler
        );
        element.addEventListener('privatedisabledmousedown', mouseDownHandler);

        return Promise.resolve().then(() => {
            const eventWrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            const mouseDown = new CustomEvent('mousedown');
            mouseDown.button = 0;
            eventWrapper.dispatchEvent(mouseDown);
            eventWrapper.dispatchEvent(new CustomEvent('dblclick'));

            expect(disabledDblClickHandler).not.toHaveBeenCalled();
            expect(mouseDownHandler).not.toHaveBeenCalled();
        });
    });

    // reference-line
    it('Scheduler event occurence: referenceLine = false', () => {
        element.referenceLine = false;

        return Promise.resolve().then(() => {
            const referenceLineEvent = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(referenceLineEvent).toBeFalsy();
        });
    });

    it('Scheduler event occurence: referenceLine = true', () => {
        element.referenceLine = true;

        return Promise.resolve().then(() => {
            const referenceLineEvent = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(referenceLineEvent).toBeTruthy();
            expect(referenceLineEvent.classList).not.toContain(
                'avonni-scheduler__reference-line_vertical'
            );
        });
    });

    it('Scheduler event occurence: referenceLine = true and variant = vertical', () => {
        element.referenceLine = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const referenceLineEvent = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(referenceLineEvent.classList).toContain(
                'avonni-scheduler__reference-line_vertical'
            );
        });
    });

    // scroll-left-offset
    // Depends on labels, rows, and rowKey
    it('Scheduler event occurence: scrollOffset', () => {
        element.scrollOffset = 30;
        element.from = FROM;
        element.to = TO;
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.labels = {
            center: {
                value: 'String value'
            }
        };

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            expect(label.style.left).toBe('30px');
        });
    });

    it('Scheduler event occurence: scrollOffset with vertical variant', () => {
        element.scrollOffset = 30;
        element.from = FROM;
        element.to = TO;
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.labels = {
            center: {
                value: 'String value'
            }
        };
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            expect(label.style.top).toBe('30px');
        });
    });

    // theme
    // Depends on color and referenceLine
    it('Scheduler event occurence: theme = default', () => {
        element.theme = 'default';
        element.color = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event_default'
            );
            expect(event).toBeTruthy();
            expect(event.style.backgroundColor).toBe('rgb(0, 0, 0)');
        });
    });

    it('Scheduler event occurence: theme = transparent', () => {
        element.theme = 'transparent';
        element.color = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event_transparent'
            );
            expect(event).toBeTruthy();
            expect(event.style.backgroundColor).toBe('rgba(0, 0, 0, 0.3)');
            expect(event.style.borderLeftColor).toBe('rgb(0, 0, 0)');
        });
    });

    it('Scheduler event occurence: theme = transparent, with hexadecimal color', () => {
        element.theme = 'transparent';
        element.color = '#000';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event_transparent'
            );
            expect(event).toBeTruthy();
            expect(event.style.backgroundColor).toMatch(
                /rgba\(0, 0, 0, 0\.3[0-9]*\)/
            );
            expect(event.style.borderLeftColor).toBe('#000');
        });
    });

    it('Scheduler event occurence: theme = line', () => {
        element.theme = 'line';
        element.color = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event_line'
            );
            expect(event).toBeTruthy();
            expect(event.style.borderColor).toBe('rgb(0, 0, 0)');
        });
    });

    it('Scheduler event occurence: theme = hollow', () => {
        element.theme = 'hollow';
        element.color = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event_hollow'
            );
            expect(event).toBeTruthy();
            expect(event.style.borderColor).toBe('rgb(0, 0, 0)');
        });
    });

    it('Scheduler event occurence: theme = rounded', () => {
        element.theme = 'rounded';
        element.color = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '.avonni-scheduler__event_rounded'
            );
            expect(event).toBeTruthy();
            expect(event.style.backgroundColor).toBe('rgb(0, 0, 0)');
        });
    });

    it('Scheduler event occurence: theme, referenceLine = true', () => {
        element.theme = 'inverse';
        element.referenceLine = true;

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(event.variant).toBe('inverse');
        });
    });

    // title
    // Depends on variant, referenceLine and disabled
    it('Scheduler event occurence: title, referenceLine = true', () => {
        element.title = 'Title string';
        element.referenceLine = true;

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-reference-line"]'
            );
            expect(event.label).toBe('Title string');
        });
    });

    it('Scheduler event occurence: title, disabled = true', () => {
        element.title = 'Title string';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const titleWrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-title-wrapper"]'
            );
            expect(titleWrapper.classList).not.toContain(
                'avonni-scheduler__disabled-date-title_vertical'
            );

            const title = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-title"]'
            );
            expect(title.textContent).toBe('Title string');
        });
    });

    it('Scheduler event occurence: title, disabled = true and variant = vertical', () => {
        element.title = 'Title string';
        element.disabled = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const titleWrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-disabled-title-wrapper"]'
            );
            expect(titleWrapper.classList).toContain(
                'avonni-scheduler__disabled-date-title_vertical'
            );
        });
    });

    // variant
    // Depends on x and y
    it('Scheduler event occurence: horizontal variant', () => {
        element.variant = 'horizontal';
        element.x = 10;
        element.y = 56;

        return Promise.resolve().then(() => {
            expect(element.classList).toContain(
                'avonni-scheduler__event_horizontal'
            );
            expect(element.endPosition).toBe(10);
            expect(element.startPosition).toBe(10);

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            expect(wrapper.classList).toContain(
                'slds-grid_vertical-align-center'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scheduler__event-wrapper_vertical'
            );

            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            expect(eventContent.classList).toContain(
                'slds-p-vertical_xx-small'
            );
        });
    });

    it('Scheduler event occurence: vertical variant', () => {
        element.variant = 'vertical';
        element.x = 10;
        element.y = 56;

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain(
                'avonni-scheduler__event_horizontal'
            );
            expect(element.endPosition).toBe(56);
            expect(element.startPosition).toBe(56);

            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-event-occurrence"]'
            );
            expect(wrapper.classList).not.toContain(
                'slds-grid_vertical-align-center'
            );
            expect(wrapper.classList).toContain(
                'avonni-scheduler__event-wrapper_vertical'
            );

            const eventContent = element.shadowRoot.querySelector(
                '[data-element-id="div-event-content"]'
            );
            expect(eventContent.classList).not.toContain(
                'slds-p-vertical_xx-small'
            );
        });
    });

    // x
    it('Scheduler event occurence: x', () => {
        element.x = 70;

        return Promise.resolve().then(() => {
            expect(element.style.transform).toBe('translate(70px, 0px)');
        });
    });

    // y
    it('Scheduler event occurence: y', () => {
        element.y = 70;

        return Promise.resolve().then(() => {
            expect(element.style.transform).toBe('translate(0px, 70px)');
        });
    });

    // zoom-to-fit
    it('Scheduler event occurence: zoomToFit = false', () => {
        element.zoomToFit = false;
        element.title = 'Some title';
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.labels = {
            center: {
                value: 'Some label'
            }
        };
        element.scrollOffset = 30;

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            expect(label.style.left).toBe('30px');
        });
    });

    it('Scheduler event occurence: zoomToFit = true', () => {
        element.zoomToFit = true;
        element.title = 'Some title';
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.labels = {
            center: {
                value: 'Some label'
            }
        };
        element.scrollOffset = 30;

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="div-center-label-wrapper"]'
            );
            expect(label.style.left).toBe('');
        });
    });

    /* ----- METHODS ----- */

    // focus
    it('Scheduler event occurence: focus method', () => {
        const handler = jest.fn();
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        wrapper.focus = handler;

        element.focus();
        expect(handler).toHaveBeenCalled();
    });

    // hideRightLabel
    // Depends on labels, rowKey and rows
    it('Scheduler event occurence: hideRightLabel method', () => {
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.labels = {
            right: {
                value: 'String value'
            }
        };

        return Promise.resolve().then(() => {
            const rightLabel = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_right'
            );
            expect(rightLabel.classList).not.toContain('slds-hide');
            element.hideRightLabel();
            expect(rightLabel.classList).toContain('slds-hide');
        });
    });

    // showRightLabel
    // Depends on hideRightLabel() labels, rowKey and rows
    it('Scheduler event occurence: showRightLabel method', () => {
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.labels = {
            right: {
                value: 'String value'
            }
        };

        return Promise.resolve().then(() => {
            const rightLabel = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-label_right'
            );
            element.hideRightLabel();
            expect(rightLabel.classList).toContain('slds-hide');
            element.showRightLabel();
            expect(rightLabel.classList).not.toContain('slds-hide');
        });
    });

    // updatePosition() and updateLength()
    // Depends on cellDuration, headerCells, cellWidth, from, startPosition, to, x and occurrence
    it('Scheduler event occurence: updateLength and updatePosition methods, event spans only on full cells', () => {
        element.from = FROM;
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.to = TO;
        element.cellWidth = CELL_WIDTH;
        element.cellHeight = CELL_HEIGHT;
        element.headerCells = HEADER_CELLS;
        element.cellDuration = CELL_DURATION;
        element.occurrence = {
            numberOfEventsInThisTimeFrame: 2
        };

        element.updateLength();
        element.updatePosition();

        expect(element.startPosition).toBe(100);
        expect(element.style.width).toBe('100px');
        expect(element.style.height).toBe('');
        expect(element.style.transform).toBe('translate(100px, 30px)');
    });

    it('Scheduler event occurence: updateLength and updatePosition methods, event spans only on full cells with vertical variant', () => {
        element.from = FROM;
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.to = TO;
        element.cellWidth = CELL_WIDTH;
        element.cellHeight = CELL_HEIGHT;
        element.headerCells = HEADER_CELLS;
        element.cellDuration = CELL_DURATION;
        element.variant = 'vertical';
        element.occurrence = {
            numberOfEventsInThisTimeFrame: 2
        };

        element.updateLength();
        element.updatePosition();

        expect(element.startPosition).toBe(60);
        expect(element.style.width).toBe('25px');
        expect(element.style.height).toBe('60px');
        expect(element.style.transform).toBe('translate(50px, 60px)');
    });

    it('Scheduler event occurence: updateLength and updatePosition methods, event spans on full and half cells', () => {
        element.resourceKey = '1';
        element.resources = RESOURCES;
        element.from = new Date(FROM.getTime()).setHours(7, 30);
        element.to = new Date(TO.getTime()).setHours(9, 30);
        element.cellWidth = CELL_WIDTH;
        element.headerCells = HEADER_CELLS;
        element.cellDuration = CELL_DURATION;

        element.updateLength();
        element.updatePosition();

        expect(Math.floor(element.startPosition)).toBe(75);
        expect(element.style.width).toBe('100px');
        expect(element.style.height).toBe('');
        expect(element.style.transform.startsWith('translate(75')).toBeTruthy();
        expect(element.style.transform.endsWith('0px)')).toBeTruthy();
    });

    it('Scheduler event occurence: updateLength and updatePosition methods, event spans on full and half cells with vertical variant', () => {
        element.resourceKey = '1';
        element.resources = RESOURCES;
        element.from = new Date(FROM.getTime()).setHours(7, 30);
        element.to = new Date(TO.getTime()).setHours(9, 30);
        element.cellWidth = CELL_WIDTH;
        element.cellHeight = CELL_HEIGHT;
        element.headerCells = HEADER_CELLS;
        element.cellDuration = CELL_DURATION;
        element.variant = 'vertical';

        element.updateLength();
        element.updatePosition();

        expect(Math.floor(element.startPosition)).toBe(45);
        expect(element.style.width).toBe('');
        expect(element.style.height).toBe('60px');
        expect(
            element.style.transform.startsWith('translate(0px, 45')
        ).toBeTruthy();
    });

    it('Scheduler event occurence: updateLength and updatePosition methods, event spans on only part of a cell', () => {
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.from = new Date(FROM.getTime()).setHours(8, 15);
        element.to = new Date(TO.getTime()).setHours(8, 45);
        element.cellWidth = CELL_WIDTH;
        element.cellHeight = CELL_HEIGHT;
        element.headerCells = HEADER_CELLS;
        element.cellDuration = CELL_DURATION;
        element.occurrence = {
            numberOfEventsInThisTimeFrame: 2,
            offsetSide: 10
        };

        element.updateLength();
        element.updatePosition();

        expect(Math.floor(element.startPosition)).toBe(112);
        expect(element.style.width).toMatch(/25\.?[0-9]*px/);
        expect(element.style.height).toBe('');
        expect(
            element.style.transform.startsWith('translate(112')
        ).toBeTruthy();
        expect(element.style.transform.endsWith('40px)')).toBeTruthy();
    });

    it('Scheduler event occurence: updateLength and updatePosition methods, event spans on only part of a cell with vertical variant', () => {
        element.variant = 'vertical';
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.from = new Date(FROM.getTime()).setHours(8, 15);
        element.to = new Date(TO.getTime()).setHours(8, 45);
        element.cellWidth = CELL_WIDTH;
        element.cellHeight = CELL_HEIGHT;
        element.headerCells = HEADER_CELLS;
        element.cellDuration = CELL_DURATION;
        element.occurrence = {
            numberOfEventsInThisTimeFrame: 2,
            offsetSide: 10
        };

        element.updateLength();
        element.updatePosition();

        expect(Math.floor(element.startPosition)).toBe(67);
        expect(element.style.width).toBe('25px');
        expect(element.style.height.startsWith('15')).toBeTruthy();
        expect(
            element.style.transform.startsWith('translate(60px, 67')
        ).toBeTruthy();
    });

    // updateThickness()
    it('Scheduler event occurence: updateThickness method', () => {
        element.resourceKey = RESOURCE_KEY;
        element.cellWidth = 30;
        element.resources = RESOURCES;
        element.disabled = true;

        element.updateThickness();
        expect(element.style.height).toBe('50px');
    });

    it('Scheduler event occurence: updateThickness method with vertical variant', () => {
        element.resourceKey = RESOURCE_KEY;
        element.resources = RESOURCES;
        element.cellWidth = 30;
        element.disabled = true;
        element.variant = 'vertical';

        element.updateThickness();
        expect(element.style.width).toBe('30px');
    });

    // Vertical position: updatePosition()
    // occurrence, y, headerCells, rows and rowKey
    it('Scheduler event occurence: updatePosition method, vertical position', () => {
        element.from = FROM;
        element.to = TO;
        element.resources = RESOURCES;
        element.resourceKey = RESOURCE_KEY;
        element.occurrence = {
            offsetSide: 12
        };
        element.headerCells = HEADER_CELLS;

        element.updatePosition();
        expect(element.y).toBe(42);
    });

    /* ----- EVENTS ----- */

    // privateblur
    // Depends on eventName and occurrenceKey
    it('Scheduler event occurence: privateblur event', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privateblur', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        eventElement.dispatchEvent(new CustomEvent('blur'));

        expect(handler).toHaveBeenCalled();
    });

    // privatecontextmenu
    // Depends on eventName and occurrenceKey
    it('Scheduler event occurence: privatecontextmenu event', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privatecontextmenu', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        const event = new CustomEvent('contextmenu');
        event.clientX = 10;
        event.clientY = 20;
        eventElement.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.eventName).toBe('event-name');
        expect(handler.mock.calls[0][0].detail.key).toBe('occurrence-key');
        expect(handler.mock.calls[0][0].detail.from).toBe(element.from);
        expect(handler.mock.calls[0][0].detail.to).toBe(element.to);
        expect(handler.mock.calls[0][0].detail.x).toBe(10);
        expect(handler.mock.calls[0][0].detail.y).toBe(20);
    });

    it('Scheduler event occurence: privatecontextmenu event, triggered by the keyboard', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privatecontextmenu', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        const event = new CustomEvent('keydown');
        event.clientX = 10;
        event.clientY = 20;
        event.key = 'Enter';
        eventElement.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.eventName).toBe('event-name');
        expect(handler.mock.calls[0][0].detail.key).toBe('occurrence-key');
        expect(handler.mock.calls[0][0].detail.from).toBe(element.from);
        expect(handler.mock.calls[0][0].detail.x).toBe(10);
        expect(handler.mock.calls[0][0].detail.y).toBe(20);
    });

    // privatedblclick
    // Depends on eventName and occurrenceKey
    it('Scheduler event occurence: privatedblclick event', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privatedblclick', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        const event = new CustomEvent('dblclick');
        event.clientX = 10;
        event.clientY = 20;
        eventElement.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.eventName).toBe('event-name');
        expect(handler.mock.calls[0][0].detail.key).toBe('occurrence-key');
        expect(handler.mock.calls[0][0].detail.from).toBe(element.from);
        expect(handler.mock.calls[0][0].detail.to).toBe(element.to);
        expect(handler.mock.calls[0][0].detail.x).toBe(10);
        expect(handler.mock.calls[0][0].detail.y).toBe(20);
    });

    // privatedisabledcontextmenu
    // Depends on disabled
    it('Scheduler event occurence: privatedisabledcontextmenu event', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const handler = jest.fn();
            element.addEventListener('privatedisabledcontextmenu', handler);

            const eventElement = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date'
            );
            const event = new CustomEvent('contextmenu');
            event.clientX = 10;
            event.clientY = 20;
            eventElement.dispatchEvent(event);

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.x).toBe(10);
            expect(handler.mock.calls[0][0].detail.y).toBe(20);
        });
    });

    // privatedisableddblclick
    // Depends on disabled
    it('Scheduler event occurence: privatedisableddblclick event', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const handler = jest.fn();
            element.addEventListener('privatedisableddblclick', handler);

            const eventElement = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date'
            );
            const event = new CustomEvent('dblclick');
            event.clientX = 10;
            event.clientY = 20;
            eventElement.dispatchEvent(event);

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.x).toBe(10);
            expect(handler.mock.calls[0][0].detail.y).toBe(20);
        });
    });

    // privatedisabledmousedown
    // Depends on disabled
    it('Scheduler event occurence: privatedisabledmousedown event', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const handler = jest.fn();
            element.addEventListener('privatedisabledmousedown', handler);

            const eventElement = element.shadowRoot.querySelector(
                '.avonni-scheduler__disabled-date'
            );
            const event = new CustomEvent('mousedown');
            event.clientX = 10;
            event.clientY = 20;
            event.button = 0;
            eventElement.dispatchEvent(event);

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.x).toBe(10);
            expect(handler.mock.calls[0][0].detail.y).toBe(20);
        });
    });

    // privatefocus
    // Depends on eventName and occurrenceKey
    it('Scheduler event occurence: privatefocus event', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privatefocus', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        const event = new CustomEvent('focus');
        event.clientX = 10;
        event.clientY = 20;
        eventElement.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.eventName).toBe('event-name');
        expect(handler.mock.calls[0][0].detail.key).toBe('occurrence-key');
        expect(handler.mock.calls[0][0].detail.from).toBe(element.from);
        expect(handler.mock.calls[0][0].detail.to).toBe(element.to);
        expect(handler.mock.calls[0][0].detail.x).toBe(10);
        expect(handler.mock.calls[0][0].detail.y).toBe(20);

        return Promise.resolve().then(() => {
            const focusedEvent = element.shadowRoot.querySelector(
                '.avonni-scheduler__event-wrapper_focused'
            );
            expect(focusedEvent).toBeTruthy();
        });
    });

    // privatemousedown
    // Depends on eventName and occurrenceKey
    it('Scheduler event occurence: privatemousedown event', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privatemousedown', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon-resize-start"]'
        );
        const event = new CustomEvent('mousedown', { bubbles: true });
        event.clientX = 10;
        event.clientY = 20;
        event.button = 0;
        eventElement.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.eventName).toBe('event-name');
        expect(handler.mock.calls[0][0].detail.key).toBe('occurrence-key');
        expect(handler.mock.calls[0][0].detail.from).toBe(element.from);
        expect(handler.mock.calls[0][0].detail.x).toBe(10);
        expect(handler.mock.calls[0][0].detail.y).toBe(20);
        expect(handler.mock.calls[0][0].detail.side).toBe('start');
    });

    // privatemouseenter
    // Depends on eventName and occurrenceKey
    it('Scheduler event occurence: privatemouseenter event', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privatemouseenter', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        const event = new CustomEvent('mouseenter');
        event.clientX = 10;
        event.clientY = 20;
        eventElement.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.eventName).toBe('event-name');
        expect(handler.mock.calls[0][0].detail.key).toBe('occurrence-key');
        expect(handler.mock.calls[0][0].detail.from).toBe(element.from);
        expect(handler.mock.calls[0][0].detail.x).toBe(10);
        expect(handler.mock.calls[0][0].detail.y).toBe(20);
    });

    // privatemouseleave
    // Depends on eventName and occurrenceKey
    it('Scheduler event occurence: privatemouseleave event', () => {
        element.eventName = 'event-name';
        element.occurrenceKey = 'occurrence-key';
        element.from = FROM;
        element.to = TO;

        const handler = jest.fn();
        element.addEventListener('privatemouseleave', handler);

        const eventElement = element.shadowRoot.querySelector(
            '[data-element-id="div-event-occurrence"]'
        );
        const event = new CustomEvent('mouseleave');
        event.clientX = 10;
        event.clientY = 20;
        eventElement.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.eventName).toBe('event-name');
        expect(handler.mock.calls[0][0].detail.key).toBe('occurrence-key');
        expect(handler.mock.calls[0][0].detail.from).toBe(element.from);
        expect(handler.mock.calls[0][0].detail.to).toBe(element.to);
        expect(handler.mock.calls[0][0].detail.x).toBe(10);
        expect(handler.mock.calls[0][0].detail.y).toBe(20);
    });
});

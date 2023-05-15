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

import SchedulerEvent from '../event';
import { DateTime } from 'c/luxon';

const RESOURCE_NAMES = ['1'];
const NAME = 'event-name';
const SMALLEST_HEADER = {
    unit: 'hour',
    span: '1'
};
const FROM = new Date(2021, 8, 1, 10);
const TO = new Date(2021, 8, 4, 15, 30);
const DEFAULTS = {
    resourceNames: RESOURCE_NAMES,
    name: NAME,
    smallestHeader: SMALLEST_HEADER,
    from: FROM,
    to: TO
};

describe('SchedulerEvent class', () => {
    it('Scheduler event: Default attributes', () => {
        const element = new SchedulerEvent({});

        expect(element.allDay).toBeFalsy();
        expect(element.availableDaysOfTheWeek).toMatchObject([
            0, 1, 2, 3, 4, 5, 6
        ]);
        expect(element.availableMonths).toMatchObject([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
        ]);
        expect(element.availableTimeFrames).toMatchObject(['00:00-23:59']);
        expect(element.color).toBeUndefined();
        expect(element.data).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.from).toBeFalsy();
        expect(element.iconName).toBeUndefined();
        expect(element.resourceNames).toMatchObject([]);
        expect(element.key).not.toBeUndefined();
        expect(element.labels).toMatchObject({
            center: { fieldName: 'title' }
        });
        expect(element.name).toBe('new-event');
        expect(element.recurrence).toBeUndefined();
        expect(element.recurrenceAttributes).toBeUndefined();
        expect(element.recurrenceCount).toBe(Infinity);
        expect(element.recurrenceEndDate).toBeFalsy();
        expect(element.referenceLine).toBeFalsy();
        expect(element.schedulerEnd).toBeFalsy();
        expect(element.schedulerStart).toBeFalsy();
        expect(element.selectedResources).toEqual([]);
        expect(element.smallestHeader).toBeUndefined();
        expect(element.theme).toBe('default');
        expect(element.timezone).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.to).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // allDay
    it('Scheduler event: allDay with undefined "to"', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: new Date(2021, 8, 1, 10),
            allDay: true
        };
        const element = new SchedulerEvent(options);
        expect(element.computedFrom.ts).toBe(new Date(2021, 8, 1).getTime());
        expect(element.computedTo.ts).toBe(new Date(2021, 8, 2).getTime() - 1);
    });

    it('Scheduler event: allDay set after event constructor', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: new Date(2021, 8, 1, 10),
            to: new Date(2021, 8, 1, 14)
        };
        const element = new SchedulerEvent(options);
        element.allDay = true;

        expect(element.computedFrom.ts).toBe(new Date(2021, 8, 1).getTime());
        expect(element.computedTo.ts).toBe(new Date(2021, 8, 2).getTime() - 1);
    });

    it('Scheduler event: allDay spanning on several days', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: new Date(2021, 8, 1, 10),
            to: new Date(2021, 8, 4, 15, 30),
            allDay: true
        };
        const element = new SchedulerEvent(options);
        expect(element.computedFrom.ts).toBe(new Date(2021, 8, 1).getTime());
        expect(element.computedTo.ts).toBe(new Date(2021, 8, 5).getTime() - 1);
    });

    // availableDaysOfTheWeek
    it('Scheduler event: availableDaysOfTheWeek, event contains available days', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: FROM,
            to: TO,
            availableDaysOfTheWeek: [1, 5]
        };
        const element = new SchedulerEvent(options);
        expect(element.occurrences.length).toBeTruthy();
    });

    it('Scheduler event: availableDaysOfTheWeek, event does not contain available days', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: FROM,
            to: TO,
            availableDaysOfTheWeek: [1]
        };
        const element = new SchedulerEvent(options);
        expect(element.occurrences.length).toBeFalsy();
    });

    // availableMonths
    it('Scheduler event: availableMonths, event contains available months', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: FROM,
            to: TO,
            availableMonths: [0, 2, 8]
        };
        const element = new SchedulerEvent(options);
        expect(element.occurrences.length).toBeTruthy();
    });

    it('Scheduler event: availableMonths, event does not contain available months', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: FROM,
            to: TO,
            availableMonths: [1]
        };
        const element = new SchedulerEvent(options);
        expect(element.occurrences.length).toBeFalsy();
    });

    // availableTimeFrames
    it('Scheduler event: availableTimeFrames, event contains available time frames', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: new Date(2021, 8, 1, 10),
            to: new Date(2021, 8, 1, 12),
            availableTimeFrames: ['08:00-16:00']
        };
        const element = new SchedulerEvent(options);
        expect(element.occurrences.length).toBeTruthy();
    });

    it('Scheduler event: availableTimeFrames, event does not contain available time frames', () => {
        const options = {
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: new Date(2021, 8, 1, 10),
            to: new Date(2021, 8, 1, 12),
            availableTimeFrames: ['13:00-16:00']
        };
        const element = new SchedulerEvent(options);
        expect(element.occurrences.length).toBeFalsy();
    });

    // color
    it('Scheduler event: color', () => {
        const element = new SchedulerEvent({ color: '#333' });
        expect(element.color).toBe('#333');
    });

    // data
    it('Scheduler event: data', () => {
        const data = {
            title: 'Something',
            customField: 'Something else'
        };
        const element = new SchedulerEvent({ data });
        expect(element.data).toBe(data);
    });

    // disabled
    it('Scheduler event: disabled', () => {
        const element = new SchedulerEvent({ disabled: true });
        expect(element.name).toBe('disabled');
    });

    // from
    it('Scheduler event: from', () => {
        const element = new SchedulerEvent({ ...DEFAULTS });
        const occurrence = element.occurrences[0];
        expect(occurrence.from).toBeInstanceOf(DateTime);
        expect(occurrence.from.ts).toBe(FROM.getTime());
        expect(element.computedFrom.ts).toBe(FROM.getTime());
    });

    // iconName
    it('Scheduler event: iconName', () => {
        const element = new SchedulerEvent({ iconName: 'utility:apps' });
        expect(element.iconName).toBe('utility:apps');
    });

    // resourceNames
    it('Scheduler event: resourceNames', () => {
        const resourceNames = ['1', '2', '3'];
        const element = new SchedulerEvent({
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: FROM,
            to: TO,
            resourceNames
        });
        expect(element.occurrences).toHaveLength(resourceNames.length);
        element.occurrences.forEach((occurrence, index) => {
            expect(occurrence.key).toContain(resourceNames[index]);
        });
    });

    // selectedResources
    it('Scheduler event: selectedResources', () => {
        const element = new SchedulerEvent({
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: FROM,
            to: TO,
            resourceNames: ['1', '2', '3'],
            selectedResources: ['1', '3']
        });
        expect(element.occurrences).toHaveLength(2);
        expect(element.occurrences[0].resourceName).toBe('1');
        expect(element.occurrences[1].resourceName).toBe('3');
    });

    // labels
    it('Scheduler event: labels', () => {
        const labels = {
            top: {
                fieldName: 'from'
            },
            bottom: {
                value: 'Something',
                iconName: 'utility:apps'
            }
        };
        const element = new SchedulerEvent({ labels });
        expect(element.labels).toBe(labels);
    });

    // name
    it('Scheduler event: name', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            name: 'some-name'
        });
        expect(element.name).toBe('some-name');
        expect(element.occurrences[0].key).toContain('some-name');
    });

    // recurrence
    // Depends on schedulerEnd
    it('Scheduler event: recurrence yearly', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2024, 0, 1),
            recurrence: 'yearly'
        });
        expect(element.occurrences).toHaveLength(3);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[0].to.ts).toBe(TO.getTime());
        expect(element.occurrences[1].from.ts).toBe(
            new Date(2022, 8, 1, 10).getTime()
        );
        expect(element.occurrences[1].to.ts).toBe(
            new Date(2022, 8, 4, 15, 30).getTime()
        );
        expect(element.occurrences[2].from.ts).toBe(
            new Date(2023, 8, 1, 10).getTime()
        );
        expect(element.occurrences[2].to.ts).toBe(
            new Date(2023, 8, 4, 15, 30).getTime()
        );
    });

    it('Scheduler event: recurrence monthly', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2022, 0, 10),
            recurrence: 'monthly'
        });
        expect(element.occurrences).toHaveLength(5);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[0].to.ts).toBe(TO.getTime());
        expect(element.occurrences[2].from.ts).toBe(
            new Date(2021, 10, 1, 10).getTime()
        );
        expect(element.occurrences[2].to.ts).toBe(
            new Date(2021, 10, 4, 15, 30).getTime()
        );
        expect(element.occurrences[4].from.ts).toBe(
            new Date(2022, 0, 1, 10).getTime()
        );
        expect(element.occurrences[4].to.ts).toBe(
            new Date(2022, 0, 4, 15, 30).getTime()
        );
    });

    it('Scheduler event: recurrence weekly', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 10, 10),
            recurrence: 'weekly'
        });
        expect(element.occurrences).toHaveLength(10);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[0].to.ts).toBe(TO.getTime());
        expect(element.occurrences[3].from.ts).toBe(
            new Date(2021, 8, 22, 10).getTime()
        );
        expect(element.occurrences[3].to.ts).toBe(
            new Date(2021, 8, 25, 15, 30).getTime()
        );
        expect(element.occurrences[9].from.ts).toBe(
            new Date(2021, 10, 3, 10).getTime()
        );
        expect(element.occurrences[9].to.ts).toBe(
            new Date(2021, 10, 6, 15, 30).getTime()
        );
    });

    it('Scheduler event: recurrence daily', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 8, 15),
            recurrence: 'daily'
        });
        expect(element.occurrences).toHaveLength(14);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[0].to.ts).toBe(
            new Date(2021, 8, 1, 15, 30).getTime()
        );
        expect(element.occurrences[7].from.ts).toBe(
            new Date(2021, 8, 8, 10).getTime()
        );
        expect(element.occurrences[7].to.ts).toBe(
            new Date(2021, 8, 8, 15, 30).getTime()
        );
        expect(element.occurrences[13].from.ts).toBe(
            new Date(2021, 8, 14, 10).getTime()
        );
        expect(element.occurrences[13].to.ts).toBe(
            new Date(2021, 8, 14, 15, 30).getTime()
        );
    });

    // recurrenceAttributes
    // Depends on recurrence and schedulerEnd
    it('Scheduler event: recurrenceAttributes, weekdays', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 8, 30),
            recurrence: 'weekly',
            recurrenceAttributes: {
                weekdays: [0, 2]
            }
        });
        expect(element.occurrences).toHaveLength(8);

        let isSunday = true;
        element.occurrences.forEach((occurrence) => {
            expect(occurrence.to.day).toBe(occurrence.from.day);

            if (isSunday) {
                expect(occurrence.from.weekday).toBe(7);
            } else {
                expect(occurrence.from.weekday).toBe(2);
            }
            isSunday = !isSunday;
        });
    });

    it('Scheduler event: recurrenceAttributes, weekdays, with first weekday before starting date', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 8, 8),
            recurrence: 'weekly',
            recurrenceAttributes: {
                weekdays: [1, 2]
            }
        });
        expect(element.occurrences).toHaveLength(2);
    });

    it('Scheduler event: recurrenceAttributes, sameDaySameWeek', () => {
        const element = new SchedulerEvent({
            resourceNames: RESOURCE_NAMES,
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: new Date(2021, 8, 15, 11),
            to: new Date(2021, 8, 17, 14, 20),
            schedulerEnd: new Date(2022, 0, 30),
            recurrence: 'monthly',
            recurrenceAttributes: {
                sameDaySameWeek: true
            }
        });
        expect(element.occurrences).toHaveLength(5);
        expect(element.occurrences[0].from.ts).toBe(
            new Date(2021, 8, 15, 11).getTime()
        );
        expect(element.occurrences[1].from.ts).toBe(
            new Date(2021, 9, 20, 11).getTime()
        );
        expect(element.occurrences[2].from.ts).toBe(
            new Date(2021, 10, 17, 11).getTime()
        );
        expect(element.occurrences[3].from.ts).toBe(
            new Date(2021, 11, 15, 11).getTime()
        );
        expect(element.occurrences[4].from.ts).toBe(
            new Date(2022, 0, 19, 11).getTime()
        );
    });

    it('Scheduler event: recurrenceAttributes, interval, daily recurrence', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 8, 10),
            recurrence: 'daily',
            recurrenceAttributes: {
                interval: 3
            }
        });
        expect(element.occurrences).toHaveLength(3);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[1].from.ts).toBe(
            new Date(2021, 8, 4, 10).getTime()
        );
        expect(element.occurrences[2].from.ts).toBe(
            new Date(2021, 8, 7, 10).getTime()
        );
    });

    it('Scheduler event: recurrenceAttributes, interval, weekly recurrence', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 8, 30),
            recurrence: 'weekly',
            recurrenceAttributes: {
                interval: 2
            }
        });
        expect(element.occurrences).toHaveLength(3);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[1].from.ts).toBe(
            new Date(2021, 8, 15, 10).getTime()
        );
        expect(element.occurrences[2].from.ts).toBe(
            new Date(2021, 8, 29, 10).getTime()
        );
    });

    it('Scheduler event: recurrenceAttributes, interval, monthly recurrence', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2022, 1, 15),
            recurrence: 'monthly',
            recurrenceAttributes: {
                interval: 2
            }
        });
        expect(element.occurrences).toHaveLength(3);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[1].from.ts).toBe(
            new Date(2021, 10, 1, 10).getTime()
        );
        expect(element.occurrences[2].from.ts).toBe(
            new Date(2022, 0, 1, 10).getTime()
        );
    });

    it('Scheduler event: recurrenceAttributes, interval, yearly recurrence', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2026, 1, 15),
            recurrence: 'yearly',
            recurrenceAttributes: {
                interval: 2
            }
        });
        expect(element.occurrences).toHaveLength(3);
        expect(element.occurrences[0].from.ts).toBe(FROM.getTime());
        expect(element.occurrences[1].from.ts).toBe(
            new Date(2023, 8, 1, 10).getTime()
        );
        expect(element.occurrences[2].from.ts).toBe(
            new Date(2025, 8, 1, 10).getTime()
        );
    });

    // recurrenceCount
    // Depends on recurrence and schedulerEnd
    it('Scheduler event: recurrenceCount', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2030, 0, 1),
            recurrenceCount: 4,
            recurrence: 'yearly'
        });
        expect(element.occurrences).toHaveLength(4);
    });

    // recurrenceEndDate
    // Depends on recurrence and schedulerEnd
    it('Scheduler event: recurrenceEndDate', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2030, 0, 1),
            recurrenceEndDate: new Date(2025, 0, 1),
            recurrence: 'yearly'
        });
        expect(element.occurrences).toHaveLength(4);
    });

    it('Scheduler event: If there are a recurrenceEndDate and a recurrenceCount, the earliest end will be used', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2030, 0, 1),
            recurrenceEndDate: new Date(2025, 0, 1),
            recurrenceCount: 2,
            recurrence: 'yearly'
        });
        expect(element.occurrences).toHaveLength(2);
    });

    // referenceLine
    // Depends on theme
    it('Scheduler event: referenceLine', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            referenceLine: true,
            theme: 'success'
        });
        expect(element.referenceLine).toBeTruthy();
        expect(element.theme).toBe('success');
    });

    // schedulerEnd
    // Depends on theme
    it('Scheduler event: schedulerEnd, before end of event', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 8, 2)
        });
        expect(element.occurrences[0].to.ts).toBe(element.schedulerEnd.ts);
    });

    it('Scheduler event: schedulerEnd, before beginning of event', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerEnd: new Date(2021, 7, 2)
        });
        expect(element.occurrences.length).toBeFalsy();
    });

    // schedulerStart
    // Depends on recurrence and schedulerEnd
    it('Scheduler event: schedulerStart, after end of event', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerStart: new Date(2021, 10, 2)
        });
        expect(element.occurrences.length).toBeFalsy();
    });

    it('Scheduler event: schedulerStart, some occurrences are before the start', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerStart: new Date(2021, 8, 5),
            recurrence: 'daily',
            schedulerEnd: new Date(2021, 8, 10)
        });
        expect(element.occurrences).toHaveLength(5);
    });

    it('Scheduler event: schedulerStart, after beginning of event', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            schedulerStart: new Date(2021, 8, 2)
        });
        expect(element.occurrences[0].from.ts).toBe(element.schedulerStart.ts);
    });

    // theme
    it('Scheduler event: theme', () => {
        const element = new SchedulerEvent({ theme: 'hollow' });
        expect(element.theme).toBe('hollow');
    });

    // timezone
    it('Scheduler event: timezone', () => {
        const element = new SchedulerEvent({
            name: NAME,
            smallestHeader: SMALLEST_HEADER,
            from: '2023-02-20T00:00:00.000Z',
            to: '2023-02-20T16:00:00.000Z',
            resourceNames: ['1', '2', '3'],
            timezone: 'Asia/Shanghai'
        });
        const computedFrom = element.computedFrom.toISO();
        expect(computedFrom).toBe('2023-02-20T08:00:00.000+08:00');
        const computedTo = element.computedTo.toISO();
        expect(computedTo).toBe('2023-02-21T00:00:00.000+08:00');
    });

    // title
    it('Scheduler event: title', () => {
        const element = new SchedulerEvent({
            ...DEFAULTS,
            title: 'someTitle',
            referenceLine: true
        });
        expect(element.occurrences).toHaveLength(1);
        expect(element.occurrences[0].title).toBe('someTitle');
        expect(element.occurrences[0].key).toBe('someTitle-0');
    });

    // to
    it('Scheduler event: to', () => {
        const element = new SchedulerEvent(DEFAULTS);
        const occurrence = element.occurrences[0];
        expect(occurrence.to).toBeInstanceOf(DateTime);
        expect(occurrence.to.ts).toBe(TO.getTime());
        expect(element.computedTo.ts).toBe(TO.getTime());
    });

    /* ----- METHODS ----- */

    // removeOccurrence
    it('Scheduler event: removeOccurrence', () => {
        const element = new SchedulerEvent(DEFAULTS);
        expect(element.occurrences).toHaveLength(1);
        element.removeOccurrence(element.occurrences[0].key);
        expect(element.occurrences.length).toBeFalsy();
    });
});

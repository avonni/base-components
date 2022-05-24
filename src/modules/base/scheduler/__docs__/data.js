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

const start = new Date(2021, 11, 13, 8);

const columns = [
    {
        label: 'Staff',
        fieldName: 'resourceAvatarSrc',
        type: 'avatar',
        typeAttributes: {
            alternativeText: 'Avatar',
            fallbackIconName: { fieldName: 'resourceAvatarFallbackIconName' },
            initials: { fieldName: 'resourceAvatarInitials' },
            primaryText: { fieldName: 'resourceName' }
        }
    },
    {
        label: 'Role',
        fieldName: 'role',
        hideDefaultActions: true
    }
];

const oneColumn = [
    {
        label: 'Employee',
        fieldName: 'name',
        initialWidth: 120
    }
];

const rows = [
    {
        id: '1',
        resourceAvatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        resourceAvatarFallbackIconName: 'standard:person_account',
        resourceAvatarInitials: 'NG',
        resourceName: 'Nina',
        role: 'Lead developer',
        sharedField: `This shouldn't show up`
    },
    {
        id: '2',
        resourceAvatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        resourceAvatarFallbackIconName: 'standard:person_account',
        resourceAvatarInitials: 'DM',
        resourceName: 'Dave',
        role: 'UX Specialist',
        customRowField: 'Label coming from a custom field in the row'
    },
    {
        id: '3',
        resourceAvatarFallbackIconName: 'standard:person_account',
        resourceAvatarInitials: 'JP',
        resourceName: 'Jung',
        role: 'Product Owner'
    },
    {
        id: '4',
        resourceAvatarFallbackIconName: 'standard:article',
        resourceAvatarInitials: 'LM',
        resourceName: 'Lily',
        role: 'Graphic Designer',
        customField: "This comes from the row's custom field"
    },
    {
        id: '5',
        resourceAvatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        resourceAvatarFallbackIconName: 'standard:person_account',
        resourceAvatarInitials: 'RM',
        resourceName: 'Reginald',
        role: 'Developer'
    }
];

const lotsOfRows = () => {
    const computedRows = [];
    for (let i = 1; i <= 20; i++) {
        computedRows.push({
            id: i.toString(),
            name: `Employee #${i}`
        });
    }
    return computedRows;
};

const headers = [
    {
        unit: 'week',
        span: 1,
        label: "'Sprint' W"
    },
    {
        unit: 'day',
        span: 1,
        label: 'ccc dd'
    },
    {
        unit: 'hour',
        span: 1,
        label: 'h a'
    },
    {
        unit: 'minute',
        span: 15,
        label: 'mm'
    }
];

const lotsOfEvents = () => {
    const computedEvents = [];
    const keyFields = [];
    for (let i = 1; i <= 20; i++) {
        keyFields.push(i.toString());
    }

    let startTime = start.getTime();
    let endTime = startTime + 7200000;

    for (let i = 1; i <= 1000; i++) {
        // The event will be on one to three rows
        const keyFieldsNumber = Math.floor(Math.random() * 3) + 1;
        const eventKeyFields = [];
        const computedKeyFields = [...keyFields];
        for (let j = 0; j < keyFieldsNumber; j++) {
            const keyFieldIndex = Math.floor(
                Math.random() * computedKeyFields.length
            );
            eventKeyFields.push(computedKeyFields[keyFieldIndex]);
            computedKeyFields.splice(keyFieldIndex, 1);
        }

        computedEvents.push({
            keyFields: eventKeyFields,
            name: `event-${i}`,
            title: `Event ${i}`,
            from: startTime,
            to: endTime
        });

        startTime += 3600000;
        endTime = startTime + 7200000;
    }

    return computedEvents;
};

const basicEvents = [
    {
        keyFields: ['3', '4', '5'],
        name: 'event-1',
        title: 'Event 1',
        from: 1639400400000,
        to: 1639407600000
    },
    {
        keyFields: ['5', '3', '4'],
        name: 'event-2',
        title: 'Event 2',
        from: 1639404000000,
        to: 1639411200000
    },
    {
        keyFields: ['3', '4', '2'],
        name: 'event-3',
        title: 'Event 3',
        from: 1639407600000,
        to: 1639414800000
    },
    {
        keyFields: ['1', '4'],
        name: 'event-4',
        title: 'Event 4',
        from: 1639411200000,
        to: 1639418400000
    },
    {
        keyFields: ['2', '1'],
        name: 'event-5',
        title: 'Event 5',
        from: 1639414800000,
        to: 1639422000000
    },
    {
        keyFields: ['1', '2', '3'],
        name: 'event-6',
        title: 'Event 6',
        from: 1639418400000,
        to: 1639425600000
    },
    {
        keyFields: ['1'],
        name: 'event-7',
        title: 'Event 7',
        from: 1639422000000,
        to: 1639429200000
    },
    {
        keyFields: ['3'],
        name: 'event-8',
        title: 'Event 8',
        from: 1639425600000,
        to: 1639432800000
    },
    {
        keyFields: ['1'],
        name: 'event-9',
        title: 'Event 9',
        from: 1639429200000,
        to: 1639436400000
    },
    {
        keyFields: ['2', '3', '4'],
        name: 'event-10',
        title: 'Event 10',
        from: 1639432800000,
        to: 1639440000000
    }
];

const events = [
    {
        keyFields: ['3'],
        name: 'research',
        title: 'Research',
        from: new Date(2021, 11, 13, 9),
        to: new Date(2021, 11, 14, 12)
    },
    {
        keyFields: ['1'],
        name: 'code-review',
        title: 'Code review',
        from: new Date(2021, 11, 13, 13),
        to: new Date(2021, 11, 13, 15),
        recurrence: 'daily'
    },
    {
        keyFields: ['3', '2'],
        name: 'seminar',
        title: 'Online seminar',
        from: new Date(2021, 11, 14, 8),
        to: new Date(2021, 11, 16)
    },
    {
        keyFields: ['1', '3'],
        name: 'write-spec',
        title: 'Write specifications',
        from: new Date(2021, 11, 15),
        allDay: true
    },
    {
        keyFields: ['2'],
        name: 'create-wireframe',
        title: 'Create wireframe',
        from: new Date(2021, 11, 13, 10, 15),
        to: new Date(2021, 11, 16, 12)
    },
    {
        keyFields: ['4'],
        name: 'create-mockup',
        title: 'Create mockup',
        from: new Date(2021, 11, 20, 7),
        to: new Date(2021, 11, 22, 10, 30)
    },
    {
        keyFields: ['2'],
        name: 'test-new-ui',
        title: 'Test new UI',
        from: new Date(2021, 11, 17, 15),
        to: new Date(2021, 11, 21)
    },
    {
        keyFields: ['5'],
        name: 'implement-feature',
        title: 'Implement feature',
        from: new Date(2021, 11, 13, 14),
        to: new Date(2021, 11, 15, 16)
    },
    {
        keyFields: ['1'],
        name: 'push-to-prod',
        title: 'Push to production',
        from: new Date(2021, 11, 16, 11),
        to: new Date(2021, 11, 16, 12)
    },
    {
        keyFields: ['1'],
        name: 'phone-meeting',
        title: 'Phone meeting',
        from: new Date(2021, 11, 21, 10),
        to: new Date(2021, 11, 21, 12)
    },
    {
        keyFields: ['3'],
        name: 'update-documentation',
        title: 'Update documentation',
        from: new Date(2021, 11, 17, 11),
        to: new Date(2021, 11, 17, 18)
    },
    {
        keyFields: ['3'],
        name: 'presentation',
        title: 'Presentation at the conference',
        from: new Date(2021, 11, 16, 11),
        to: new Date(2021, 11, 16, 18)
    },
    {
        keyFields: ['2', '4'],
        name: 'ux-ui-team-meeting',
        title: 'UI/UX team meeting',
        from: new Date(2021, 11, 17, 11),
        to: new Date(2021, 11, 17, 12),
        recurrence: 'weekly'
    },
    {
        keyFields: ['1', '2', '3', '4', '5'],
        name: 'office-party',
        title: 'Office party',
        from: new Date(2021, 11, 24, 12),
        to: new Date(2021, 11, 25)
    },
    {
        keyFields: ['1', '5'],
        name: 'standup',
        title: 'Stand-up meeting',
        from: new Date(2021, 11, 13, 9, 30),
        to: new Date(2021, 11, 14, 10),
        recurrence: 'weekly',
        recurrenceAttributes: {
            weekdays: [1, 3, 5]
        }
    }
];

const eventsWithLabels = [
    {
        keyFields: ['3'],
        name: 'research',
        title: 'Research',
        from: new Date(2021, 11, 13, 9),
        to: new Date(2021, 11, 14, 12),
        labels: {
            center: {
                value: 'Custom label and icon specific to this event',
                iconName: 'utility:key_dates'
            }
        }
    },
    {
        keyFields: ['1'],
        name: 'code-review',
        title: 'Code review',
        from: new Date(2021, 11, 13, 13),
        to: new Date(2021, 11, 13, 15),
        recurrence: 'daily'
    },
    {
        keyFields: ['3', '2'],
        name: 'seminar',
        title: 'Online seminar',
        from: new Date(2021, 11, 14, 8),
        to: new Date(2021, 11, 16)
    },
    {
        keyFields: ['1', '3'],
        name: 'write-spec',
        title: 'Write specifications',
        from: new Date(2021, 11, 15),
        allDay: true
    },
    {
        keyFields: ['2'],
        name: 'create-wireframe',
        title: 'Create wireframe',
        from: new Date(2021, 11, 13, 10, 15),
        to: new Date(2021, 11, 16, 12),
        customEventField: 'Label coming from a custom field in the event',
        labels: {
            center: {
                fieldName: 'customEventField'
            },
            top: {
                fieldName: 'customRowField'
            }
        }
    },
    {
        keyFields: ['5'],
        name: 'implement-feature',
        title: 'Implement feature',
        from: new Date(2021, 11, 13, 14),
        to: new Date(2021, 11, 15, 16)
    },
    {
        keyFields: ['1', '5'],
        name: 'standup',
        title: 'Stand-up meeting',
        from: new Date(2021, 11, 13, 9, 30),
        to: new Date(2021, 11, 14, 10),
        recurrence: 'weekly',
        recurrenceAttributes: {
            weekdays: [1, 3, 5]
        }
    }
];

const eventsThemed = [
    {
        keyFields: ['1', '5', '4'],
        name: 'event-1',
        title: 'Theme hollow',
        from: 1639400400000,
        to: 1639407600000,
        theme: 'hollow'
    },
    {
        keyFields: ['4'],
        name: 'event-2',
        title: 'Theme line',
        from: 1639404000000,
        to: 1639411200000,
        theme: 'line'
    },
    {
        keyFields: ['5', '3'],
        name: 'event-3',
        title: 'Custom color',
        from: 1639432800000,
        to: 1639440000000,
        color: 'tomato'
    },
    {
        keyFields: ['2', '4'],
        name: 'event-4',
        title: 'Theme transparent',
        from: 1639411200000,
        to: 1639418400000,
        theme: 'transparent'
    },
    {
        keyFields: ['2', '1'],
        name: 'event-5',
        title: 'Theme rounded',
        from: 1639414800000,
        to: 1639422000000,
        theme: 'rounded'
    },
    {
        keyFields: ['4', '1'],
        name: 'event-6',
        title: 'Default theme',
        from: 1639425600000,
        to: 1639432800000
    }
];

const disabledDatesTimes = [
    {
        keyFields: ['1', '2', '3', '4', '5'],
        title: 'Lunch',
        iconName: 'custom:custom51',
        from: new Date(2021, 0, 1, 12),
        to: new Date(2021, 0, 1, 14),
        recurrence: 'weekly',
        recurrenceAttributes: {
            weekdays: [1, 2, 3, 4, 5]
        }
    },
    {
        keyFields: ['4'],
        title: 'Vacation',
        from: new Date(2021, 11, 6),
        to: new Date(2021, 11, 20)
    },
    {
        keyFields: ['3'],
        title: 'Day off',
        from: new Date(2021, 11, 23),
        allDay: true
    }
];

const referenceLines = [
    {
        label: 'Now',
        variant: 'success'
    },
    {
        label: 'Deadline',
        variant: 'error',
        date: new Date(2021, 11, 17, 15)
    },
    {
        label: 'Coffee break',
        date: new Date(2021, 1, 1, 10),
        recurrence: 'daily'
    }
];

export {
    columns,
    disabledDatesTimes,
    rows,
    headers,
    basicEvents,
    events,
    eventsThemed,
    eventsWithLabels,
    lotsOfEvents,
    lotsOfRows,
    oneColumn,
    referenceLines,
    start
};

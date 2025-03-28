const start = new Date(2021, 11, 13, 8);

const columns = [
    {
        label: 'Staff',
        fieldName: 'avatarSrc',
        type: 'avatar',
        typeAttributes: {
            alternativeText: 'Avatar',
            fallbackIconName: { fieldName: 'avatarFallbackIconName' },
            initials: { fieldName: 'avatarInitials' },
            primaryText: { fieldName: 'label' }
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
        fieldName: 'name'
    }
];

const resources = [
    {
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'NG',
        name: 'Nina',
        label: 'Nina G.',
        role: 'Lead developer',
        sharedField: `This shouldn't show up`
    },
    {
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'DM',
        name: 'Dave',
        label: 'Dave M.',
        role: 'UX Specialist',
        customRowField: 'Label coming from a custom field in the row'
    },
    {
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'JP',
        name: 'Jung',
        label: 'Jung P.',
        role: 'Product Owner'
    },
    {
        avatarFallbackIconName: 'standard:article',
        avatarInitials: 'LM',
        name: 'Lily',
        label: 'Lily M.',
        role: 'Graphic Designer',
        customField: "This comes from the row's custom field"
    },
    {
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'RM',
        name: 'Reginald',
        label: 'Reginald M.',
        role: 'Developer'
    }
];

const lotsOfRows = () => {
    const computedRows = [];
    for (let i = 1; i <= 20; i++) {
        computedRows.push({
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
    const oneMonth = new Date(0, 1, 0).getTime() - new Date(0, 0, 0).getTime();
    const computedEvents = [];
    const resourceNames = [];
    for (let i = 1; i <= 20; i++) {
        resourceNames.push(`Employee #${i}`);
    }

    let startTime = start.getTime();
    let endTime = startTime + 7200000;

    for (let i = 1; i <= 3000; i++) {
        // The event will be on one to three rows
        const resourceNamesNumber = Math.floor(Math.random() * 3) + 1;
        const eventResourceNames = [];
        const computedResourceNames = [...resourceNames];
        for (let j = 0; j < resourceNamesNumber; j++) {
            const keyFieldIndex = Math.floor(
                Math.random() * computedResourceNames.length
            );
            eventResourceNames.push(computedResourceNames[keyFieldIndex]);
            computedResourceNames.splice(keyFieldIndex, 1);
        }

        computedEvents.push({
            resourceNames: eventResourceNames,
            name: `event-${i}`,
            title: `Event ${i}`,
            from: startTime,
            to: endTime
        });

        if (startTime > start.getTime() + oneMonth) {
            startTime = start.getTime();
        }

        startTime += 3600000;
        endTime = startTime + 7200000;
    }

    return computedEvents;
};

const basicEvents = [
    {
        resourceNames: ['Jung', 'Lily', 'Reginald'],
        name: 'event-1',
        title: 'Event 1',
        from: 1639400400000,
        to: 1639407600000
    },
    {
        resourceNames: ['Reginald', 'Jung', 'Lily'],
        name: 'event-2',
        title: 'Event 2',
        from: 1639404000000,
        to: 1639411200000
    },
    {
        resourceNames: ['Jung', 'Lily', 'Dave'],
        name: 'event-3',
        title: 'Event 3',
        from: 1639407600000,
        to: 1639414800000
    },
    {
        resourceNames: ['Nina', 'Lily'],
        name: 'event-4',
        title: 'Event 4',
        from: 1639411200000,
        to: 1639418400000
    },
    {
        resourceNames: ['Dave', 'Nina'],
        name: 'event-5',
        title: 'Event 5',
        from: 1639414800000,
        to: 1639422000000
    },
    {
        resourceNames: ['Nina', 'Dave', 'Jung'],
        name: 'event-6',
        title: 'Event 6',
        from: 1639418400000,
        to: 1639425600000
    },
    {
        resourceNames: ['Nina'],
        name: 'event-7',
        title: 'Event 7',
        from: 1639422000000,
        to: 1639429200000
    },
    {
        resourceNames: ['Jung'],
        name: 'event-8',
        title: 'Event 8',
        from: 1639425600000,
        to: 1639432800000
    },
    {
        resourceNames: ['Nina'],
        name: 'event-9',
        title: 'Event 9',
        from: 1639429200000,
        to: 1639436400000
    },
    {
        resourceNames: ['Dave', 'Jung', 'Lily'],
        name: 'event-10',
        title: 'Event 10',
        from: 1639432800000,
        to: 1639440000000
    }
];
const longEvents = [
    {
        resourceNames: ['Jung', 'Lily', 'Reginald'],
        name: 'event-1',
        title: 'Event 1',
        from: new Date(2021, 2, 1),
        to: new Date(2021, 3, 1)
    },
    {
        resourceNames: ['Reginald', 'Jung', 'Lily'],
        name: 'event-2',
        title: 'Event 2',
        from: new Date(2021, 1, 15),
        to: new Date(2021, 4, 1)
    },
    {
        resourceNames: ['Jung', 'Lily', 'Dave'],
        name: 'event-3',
        title: 'Event 3',
        from: new Date(2020, 11, 26),
        to: new Date(2021, 1, 1)
    },
    {
        resourceNames: ['Nina', 'Lily'],
        name: 'event-4',
        title: 'Event 4',
        from: new Date(2021, 3, 12),
        to: new Date(2021, 5, 1)
    },
    {
        resourceNames: ['Dave', 'Nina'],
        name: 'event-5',
        title: 'Event 5',
        from: new Date(2021, 7, 1),
        to: new Date(2021, 9, 1)
    },
    {
        resourceNames: ['Nina', 'Dave', 'Jung'],
        name: 'event-6',
        title: 'Event 6',
        from: new Date(2021, 5, 20),
        to: new Date(2021, 7, 1)
    },
    {
        resourceNames: ['Nina'],
        name: 'event-7',
        title: 'Event 7',
        from: new Date(2021, 6, 1),
        to: new Date(2021, 8, 1)
    },
    {
        resourceNames: ['Jung'],
        name: 'event-8',
        title: 'Event 8',
        from: new Date(2021, 9, 10),
        to: new Date(2021, 11, 1)
    },
    {
        resourceNames: ['Nina'],
        name: 'event-9',
        title: 'Event 9',
        from: new Date(2021, 9, 1),
        to: new Date(2022, 2, 3)
    },
    {
        resourceNames: ['Dave', 'Jung', 'Lily'],
        name: 'event-10',
        title: 'Event 10',
        from: new Date(2021, 10, 1),
        to: new Date(2022, 0, 1)
    }
];

const events = [
    {
        resourceNames: ['Jung'],
        name: 'research',
        title: 'Research',
        dateFormat: 'DD',
        from: new Date(2021, 11, 13, 9),
        to: new Date(2021, 11, 14, 12)
    },
    {
        resourceNames: ['Nina'],
        name: 'code-review',
        title: 'Code review',
        from: new Date(2021, 11, 13, 13),
        to: new Date(2021, 11, 13, 15),
        recurrence: 'daily'
    },
    {
        resourceNames: ['Jung'],
        name: 'seminar',
        title: 'Online seminar',
        from: new Date(2021, 11, 14, 8),
        to: new Date(2021, 11, 16)
    },
    {
        resourceNames: ['Nina', 'Jung'],
        name: 'write-spec',
        title: 'Write specifications',
        from: new Date(2021, 11, 15),
        allDay: true
    },
    {
        resourceNames: ['Dave'],
        name: 'create-wireframe',
        title: 'Create wireframe',
        from: new Date(2021, 11, 13, 10, 15),
        to: new Date(2021, 11, 16, 12)
    },
    {
        resourceNames: ['Lily'],
        name: 'create-mockup',
        title: 'Create mockup',
        from: new Date(2021, 11, 20, 7),
        to: new Date(2021, 11, 22, 10, 30)
    },
    {
        resourceNames: ['Dave'],
        name: 'test-new-ui',
        title: 'Test new UI',
        from: new Date(2021, 11, 17, 15),
        to: new Date(2021, 11, 21)
    },
    {
        resourceNames: ['Reginald'],
        name: 'implement-feature',
        title: 'Implement feature',
        from: new Date(2021, 11, 13, 14),
        to: new Date(2021, 11, 15, 16)
    },
    {
        resourceNames: ['Nina'],
        name: 'push-to-prod',
        title: 'Push to production',
        from: new Date(2021, 11, 16, 11),
        to: new Date(2021, 11, 16, 12)
    },
    {
        resourceNames: ['Nina'],
        name: 'phone-meeting',
        title: 'Phone meeting',
        from: new Date(2021, 11, 21, 10),
        to: new Date(2021, 11, 21, 12)
    },
    {
        resourceNames: ['Jung'],
        name: 'update-documentation',
        title: 'Update documentation',
        from: new Date(2021, 11, 17, 11),
        to: new Date(2021, 11, 17, 18)
    },
    {
        resourceNames: ['Jung'],
        name: 'presentation',
        title: 'Presentation at the conference',
        from: new Date(2021, 11, 16, 11),
        to: new Date(2021, 11, 16, 18)
    },
    {
        resourceNames: ['Dave', 'Lily'],
        name: 'ux-ui-team-meeting',
        title: 'UI/UX team meeting',
        from: new Date(2021, 11, 17, 11),
        to: new Date(2021, 11, 17, 12),
        recurrence: 'weekly'
    },
    {
        resourceNames: ['Nina', 'Dave', 'Jung', 'Lily', 'Reginald'],
        name: 'office-party',
        title: 'Office party',
        from: new Date(2021, 11, 24, 12),
        to: new Date(2021, 11, 25)
    },
    {
        resourceNames: ['Nina', 'Reginald'],
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

const eventsWithExtraKeys = [
    {
        resourceNames: ['Jung'],
        name: 'research',
        title: 'Research',
        dateFormat: 'DD',
        from: new Date(2021, 11, 13, 9),
        to: new Date(2021, 11, 14, 12),
        office: 'Montreal, QC',
        cost: 650
    },
    {
        resourceNames: ['Nina'],
        name: 'code-review',
        title: 'Code review',
        from: new Date(2021, 11, 13, 13),
        to: new Date(2021, 11, 13, 15),
        recurrence: 'daily',
        office: 'Montreal, QC'
    },
    {
        resourceNames: ['Jung'],
        name: 'seminar',
        title: 'Online seminar',
        from: new Date(2021, 11, 14, 8),
        to: new Date(2021, 11, 16),
        office: 'Montreal, QC',
        cost: 1304.5
    },
    {
        resourceNames: ['Nina', 'Jung'],
        name: 'write-spec',
        title: 'Write specifications',
        from: new Date(2021, 11, 15),
        allDay: true,
        office: 'Montreal, QC'
    },
    {
        resourceNames: ['Dave'],
        name: 'create-wireframe',
        title: 'Create wireframe',
        from: new Date(2021, 11, 13, 10, 15),
        to: new Date(2021, 11, 16, 12),
        office: 'Trois-Rivières, QC'
    },
    {
        resourceNames: ['Lily'],
        name: 'create-mockup',
        title: 'Create mockup',
        from: new Date(2021, 11, 20, 7),
        to: new Date(2021, 11, 22, 10, 30),
        office: 'Vancouver, BC'
    },
    {
        resourceNames: ['Dave'],
        name: 'test-new-ui',
        title: 'Test new UI',
        from: new Date(2021, 11, 17, 15),
        to: new Date(2021, 11, 21),
        office: 'Trois-Rivières, QC'
    },
    {
        resourceNames: ['Reginald'],
        name: 'implement-feature',
        title: 'Implement feature',
        from: new Date(2021, 11, 13, 14),
        to: new Date(2021, 11, 15, 16),
        office: 'Trois-Rivières, QC'
    },
    {
        resourceNames: ['Nina'],
        name: 'push-to-prod',
        title: 'Push to production',
        from: new Date(2021, 11, 16, 11),
        to: new Date(2021, 11, 16, 12),
        office: 'Montreal, QC'
    },
    {
        resourceNames: ['Nina'],
        name: 'phone-meeting',
        title: 'Phone meeting',
        from: new Date(2021, 11, 21, 10),
        to: new Date(2021, 11, 21, 12),
        office: 'Montreal, QC'
    },
    {
        resourceNames: ['Jung'],
        name: 'update-documentation',
        title: 'Update documentation',
        from: new Date(2021, 11, 17, 11),
        to: new Date(2021, 11, 17, 18),
        office: 'Montreal, QC'
    },
    {
        resourceNames: ['Jung'],
        name: 'presentation',
        title: 'Presentation at the conference',
        from: new Date(2021, 11, 16, 11),
        to: new Date(2021, 11, 16, 18),
        office: 'Montreal, QC',
        cost: 346.8
    },
    {
        resourceNames: ['Dave', 'Lily'],
        name: 'ux-ui-team-meeting',
        title: 'UI/UX team meeting',
        from: new Date(2021, 11, 17, 11),
        to: new Date(2021, 11, 17, 12),
        recurrence: 'weekly',
        office: 'Vancouver, BC'
    },
    {
        resourceNames: ['Nina', 'Dave', 'Jung', 'Lily', 'Reginald'],
        name: 'office-party',
        title: 'Office party',
        from: new Date(2021, 11, 24, 12),
        to: new Date(2021, 11, 25),
        office: 'Montreal, QC',
        cost: 5670.6
    },
    {
        resourceNames: ['Nina', 'Reginald'],
        name: 'standup',
        title: 'Stand-up meeting',
        from: new Date(2021, 11, 13, 9, 30),
        to: new Date(2021, 11, 14, 10),
        recurrence: 'weekly',
        recurrenceAttributes: {
            weekdays: [1, 3, 5]
        },
        office: 'Montreal, QC'
    }
];

const eventsWithLabels = [
    {
        resourceNames: ['Jung'],
        name: 'research',
        title: 'Research',
        dateFormat: 'DD',
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
        resourceNames: ['Nina'],
        name: 'code-review',
        title: 'Code review',
        from: new Date(2021, 11, 13, 13),
        to: new Date(2021, 11, 13, 15),
        recurrence: 'daily'
    },
    {
        resourceNames: ['Jung', 'Dave'],
        name: 'seminar',
        title: 'Online seminar',
        from: new Date(2021, 11, 14, 8),
        to: new Date(2021, 11, 16)
    },
    {
        resourceNames: ['Nina', 'Jung'],
        name: 'write-spec',
        title: 'Write specifications',
        from: new Date(2021, 11, 15),
        allDay: true
    },
    {
        resourceNames: ['Dave'],
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
        resourceNames: ['Reginald'],
        name: 'implement-feature',
        title: 'Implement feature',
        from: new Date(2021, 11, 13, 14),
        to: new Date(2021, 11, 15, 16)
    },
    {
        resourceNames: ['Nina', 'Reginald'],
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
        resourceNames: ['Nina', 'Reginald', 'Lily'],
        name: 'event-1',
        title: 'Theme hollow',
        from: 1639400400000,
        to: 1639407600000,
        theme: 'hollow'
    },
    {
        resourceNames: ['Lily'],
        name: 'event-2',
        title: 'Theme line',
        from: 1639404000000,
        to: 1639411200000,
        theme: 'line'
    },
    {
        resourceNames: ['Reginald', 'Jung'],
        name: 'event-3',
        title: 'Custom color',
        from: 1639432800000,
        to: 1639440000000,
        color: 'tomato'
    },
    {
        resourceNames: ['Dave', 'Lily'],
        name: 'event-4',
        title: 'Theme transparent',
        from: 1639411200000,
        to: 1639418400000,
        theme: 'transparent'
    },
    {
        resourceNames: ['Dave', 'Nina'],
        name: 'event-5',
        title: 'Theme rounded',
        from: 1639414800000,
        to: 1639422000000,
        theme: 'rounded'
    },
    {
        resourceNames: ['Lily', 'Nina'],
        name: 'event-6',
        title: 'Default theme',
        from: 1639425600000,
        to: 1639432800000
    }
];

const disabledDatesTimes = [
    {
        resourceNames: ['Nina', 'Dave'],
        title: 'Lunch',
        from: new Date(2021, 0, 1, 12),
        to: new Date(2021, 0, 1, 14),
        recurrence: 'weekly',
        recurrenceAttributes: {
            weekdays: [1, 2, 3, 4, 5]
        }
    },
    {
        resourceNames: ['Lily'],
        title: 'Vacation',
        from: new Date(2021, 11, 6),
        to: new Date(2021, 11, 20)
    },
    {
        resourceNames: ['Dave'],
        title: 'Day off',
        from: new Date(2021, 11, 18),
        allDay: true
    },
    {
        resourceNames: ['Jung'],
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
        date: new Date(2022, 1, 1, 10),
        recurrence: 'daily',
        recurrenceEndDate: new Date(2022, 1, 5)
    }
];

export {
    basicEvents,
    columns,
    disabledDatesTimes,
    events,
    eventsThemed,
    eventsWithExtraKeys,
    eventsWithLabels,
    headers,
    longEvents,
    lotsOfEvents,
    lotsOfRows,
    oneColumn,
    referenceLines,
    resources,
    start
};

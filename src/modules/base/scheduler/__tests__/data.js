

export const ACTIONS = [
    {
        label: 'Action 1',
        name: 'action1'
    },
    {
        label: 'Action 2',
        name: 'action2'
    }
];

export const COLUMNS = [
    {
        label: 'First column',
        fieldName: 'col1'
    },
    {
        label: 'Second column',
        fieldName: 'col2'
    },
    {
        label: 'Third column',
        fieldName: 'col3'
    }
];

export const RESOURCES = [
    {
        name: 'resource-1',
        label: 'Resource 1',
        avatarSrc: 'some fake avatar src',
        avatarFallbackIconName: 'utility:user',
        avatarInitials: 'R1',
        col1: 'Resource 1, column 1',
        col2: 'Resource 1, column 2',
        col3: 'Resource 1, column 3'
    },
    {
        name: 'resource-2',
        label: 'Resource 2',
        col1: 'Resource 2, column 1',
        col2: 'Resource 2, column 2',
        col3: 'Resource 2, column 3'
    },
    {
        name: 'resource-3',
        label: 'Resource 3',
        col1: 'Resource 3, column 1',
        col2: 'Resource 3, column 2',
        col3: 'Resource 3, column 3'
    }
];

export const EVENTS = [
    {
        resourceNames: ['resource-2', 'resource-1'],
        name: 'event-1',
        title: 'Event 1',
        from: new Date(2022, 9, 4, 10),
        to: new Date(2022, 9, 5, 11, 50),
        color: '#333'
    },
    {
        resourceNames: ['resource-3'],
        name: 'event-2',
        title: 'Event 2',
        from: new Date(2022, 9, 2),
        to: new Date(2022, 9, 4)
    },
    {
        resourceNames: ['resource-3'],
        name: 'event-3',
        title: 'Event 3',
        from: new Date(2022, 9, 3),
        to: new Date(2022, 9, 5)
    }
];

export const RECURRING_EVENT = {
    name: 'Recurrent event',
    from: new Date(2022, 9, 4, 10),
    to: new Date(2022, 9, 4, 11),
    recurrence: 'daily',
    recurrenceEndDate: new Date(2022, 9, 6, 10),
    resourceNames: [RESOURCES[0].name]
};

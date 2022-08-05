import { LightningElement } from 'lwc';

export default class KanbanSubGroups extends LightningElement {
    groupValues = [
        {
            label: 'Open',
            value: 'open',
            backgroundColor: '#fffff',
            headerActions: [
                { disabled: false, label: 'Action 1', name: 'Action 1' }
            ]
        },
        {
            label: 'In Progress',
            value: 'inProgress',
            backgroundColor: '#fffff',
            footerActions: [
                {
                    disabled: false,
                    label: 'Action 1',
                    name: 'Action 1',
                    iconName: 'utility:cart'
                }
            ],
            headerActions: [
                { disabled: false, label: 'Action 1', name: 'Action 1' },
                { disabled: false, label: 'Action 2', name: 'Action 2' }
            ]
        },
        {
            label: 'Closed',
            value: 'closed',
            backgroundColor: '#fffff',
            footerActions: [
                {
                    disabled: false,
                    label: 'Action 1',
                    name: 'Action 1',
                    iconName: 'utility:add'
                },
                { disabled: true, label: 'Action 2', name: 'Action 2' }
            ]
        }
    ];

    fields = [
        {
            label: 'Opportunity name',
            fieldName: 'opportunityName',
            type: 'text'
        },
        {
            label: 'Amount',
            fieldName: 'amount',
            type: 'currency',
            typeAttributes: { currencyCode: 'EUR' }
        },
        {
            label: 'Phone',
            fieldName: 'phone',
            type: 'phone'
        },
        {
            label: 'Created date',
            fieldName: 'date',
            type: 'date'
        },
        {
            label: 'Percent',
            fieldName: 'percent',
            type: 'percent'
        },
        {
            label: 'Available',
            fieldName: 'available',
            type: 'boolean'
        }
    ];

    records = [
        {
            id: '001',
            status: 'open',
            opportunityName: 'Opportunity 1',
            amount: 25000,
            warningIcon: 'utility:warning',
            phone: '+375292567896',
            date: '1547250828000',
            percent: 0.28,
            available: true,
            assignee: 'John Doe',
            coverImage:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
        },
        {
            id: '002',
            status: 'closed',
            opportunityName: 'Opportunity 2',
            amount: 13200,
            phone: '+375292567896',
            date: '1347250828000',
            percent: 0.77,
            assignee: 'John Doe',
            available: true
        },
        {
            id: '003',
            status: 'inProgress',
            opportunityName: 'Opportunity 3',
            amount: 5100,
            phone: '+37529888888',
            date: '1547250828000',
            percent: 0.83,
            assignee: 'Jane Doe',
            available: false
        },
        {
            id: '004',
            status: 'open',
            opportunityName: 'Opportunity 4',
            amount: 21570,
            phone: '+375292567896',
            date: '1647250828000',
            percent: 0.2,
            assignee: 'John Smith',
            available: false
        },
        {
            id: '005',
            status: 'open',
            opportunityName: 'Opportunity 5',
            amount: 200,
            phone: '+375299999999',
            date: '1347250828000',
            percent: 0.18,
            assignee: 'Jane Doe',
            available: true
        },
        {
            id: '006',
            status: 'closed',
            opportunityName: 'Opportunity 6',
            amount: 17500,
            assignee: 'John Doe',
            coverImage:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg'
        },
        {
            id: '007',
            status: 'inProgress',
            opportunityName: 'Opportunity 7',
            amount: 5100,
            phone: '+37529888888',
            date: '1547250828000',
            percent: 0.83,
            assignee: 'John Smith',
            available: false
        },
        {
            id: '008',
            status: 'inProgress',
            opportunityName: 'Opportunity 8',
            amount: 5100,
            phone: '+37529888888',
            date: '1547250828000',
            assignee: 'Jane Doe',
            available: false
        },
        {
            id: '009',
            status: 'inProgress',
            opportunityName: 'Opportunity 9',
            amount: 5100,
            phone: '+37529888888',
            assignee: 'John Doe',
            available: false
        },
        {
            id: '010',
            status: 'inProgress',
            opportunityName: 'Opportunity 10',
            amount: 5100,
            phone: '+37529888888',
            date: '1547250828000',
            assignee: 'John Smith',
            percent: 0.83,
            available: false
        }
    ];

    actions = [
        { disabled: false, label: 'Action 1', name: 'Action 1' },
        { disabled: false, label: 'Action 2', name: 'Action 2' },
        { disabled: true, label: 'Action 3', name: 'Action 3' }
    ];
}

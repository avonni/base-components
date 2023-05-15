import { LightningElement } from 'lwc';

export default class KanbanPath extends LightningElement {
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
            available: true
        },
        {
            id: '002',
            status: 'closed',
            opportunityName: 'Opportunity 2',
            amount: 13200,
            phone: '+375292567896',
            date: '1347250828000',
            percent: 0.77,
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
            available: true
        },
        {
            id: '006',
            status: 'closed',
            opportunityName: 'Opportunity 6',
            amount: 17500,
            phone: '+375292567896',
            date: '1547250828000',
            percent: 0.92,
            available: true
        }
    ];

    actions = [
        { disabled: false, label: 'Action 1', name: 'Action 1' },
        { disabled: false, label: 'Action 2', name: 'Action 2' },
        { disabled: true, label: 'Action 3', name: 'Action 3' }
    ];
}

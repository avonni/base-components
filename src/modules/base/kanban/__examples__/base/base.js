import { LightningElement } from 'lwc';

export default class KanbanBase extends LightningElement {
    groupValues = [
        { label: 'Open', value: 'open' },
        { label: 'In Progress', value: 'inProgress' },
        { label: 'Closed', value: 'closed' }
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
            status: 'Open',
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
            status: 'Closed',
            opportunityName: 'Opportunity 2',
            amount: 13200,
            phone: '+375292567896',
            date: '1347250828000',
            percent: 0.77,
            available: true
        },
        {
            id: '003',
            status: 'In Progress',
            opportunityName: 'Opportunity 3',
            amount: 5100,
            phone: '+37529888888',
            date: '1547250828000',
            percent: 0.83,
            available: false
        },
        {
            id: '004',
            status: 'Open',
            opportunityName: 'Opportunity 4',
            amount: 21570,
            phone: '+375292567896',
            date: '1647250828000',
            percent: 0.2,
            available: false
        },
        {
            id: '005',
            status: 'Open',
            opportunityName: 'Opportunity 5',
            amount: 200,
            phone: '+375299999999',
            date: '1347250828000',
            percent: 0.18,
            available: true
        },
        {
            id: '006',
            status: 'Closed',
            opportunityName: 'Opportunity 6',
            amount: 17500,
            phone: '+375292567896',
            date: '1547250828000',
            percent: 0.92,
            available: true
        }
    ];
}

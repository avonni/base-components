import { LightningElement } from 'lwc';

export default class KanbanBase extends LightningElement {
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

    cardAttributes = {
        coverImage: {
            fieldName: 'coverImage',
            label: 'Cover Image',
            type: 'text'
        },
        title: {
            fieldName: 'opportunityName',
            label: 'Opportunity Name',
            type: 'text'
        },
        description: {
            fieldName: 'description',
            label: 'Description',
            type: 'text'
        },
        startDate: {
            fieldName: 'startDate',
            label: 'Start Date',
            type: 'date'
        },
        dueDate: {
            fieldName: 'dueDate',
            label: 'Due Date',
            type: 'date'
        },
        customFields: [
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
                fieldName: 'createdDate',
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
        ],
        customFieldAttributes: {
            variant: 'label-hidden'
        }
    };

    records = [
        {
            id: '001',
            status: 'open',
            opportunityName: 'Opportunity 1',
            amount: 25000,
            warningIcon: 'utility:warning',
            phone: '+375292567896',
            createdDate: '1594133308000',
            startDate: '2020/07/07',
            dueDate: '1600354108000',
            percent: 0.28,
            available: true,
            coverImage:
                'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '002',
            status: 'closed',
            opportunityName: 'Opportunity 2',
            amount: 13200,
            phone: '+375292567896',
            createdDate: '2541422908000',
            startDate: '2541422908000',
            dueDate: '2541941308000',
            percent: 0.77,
            available: true,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '003',
            status: 'inProgress',
            opportunityName: 'Opportunity 3',
            amount: 5100,
            phone: '+37529888888',
            createdDate: '1547250828000',
            startDate: '1547250828000',
            dueDate: '1568731708000',
            percent: 0.83,
            available: false,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '004',
            status: 'open',
            opportunityName: 'Opportunity 4',
            amount: 21570,
            phone: '+375292567896',
            createdDate: Date.now(),
            startDate: Date.now(),
            percent: 0.2,
            available: false,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '005',
            status: 'open',
            opportunityName: 'Opportunity 5',
            amount: 200,
            phone: '+375299999999',
            createdDate: '1647250828000',
            startDate: '1647250828000',
            dueDate: '1647874108000',
            percent: 0.18,
            available: true,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '006',
            status: 'closed',
            opportunityName: 'Opportunity 6',
            amount: 17500,
            phone: '+375292567896',
            createdDate: '1547250828000',
            percent: 0.92,
            available: true,
            coverImage:
                'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
    ];

    actions = [
        { disabled: false, label: 'Action 1', name: 'Action 1' },
        { disabled: false, label: 'Action 2', name: 'Action 2' },
        { disabled: true, label: 'Action 3', name: 'Action 3' }
    ];

    summarizeAttributes = {
        label: 'Amount',
        fieldName: 'amount',
        type: 'currency',
        typeAttributes: { currencyCode: 'EUR' }
    };
}

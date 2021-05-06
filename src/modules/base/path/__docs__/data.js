const ACTIONS = [
    {
        name: 'action-edit',
        label: 'Edit',
        iconName: 'utility:edit'
    },
    {
        name: 'action-remove',
        label: 'Remove',
        iconName: 'utility:delete',
        disabled: true
    }
];

const STEPS = [
    {
        name: 'open',
        label: 'Open',
        tooltip: '1 day in Open',
        keyFields: [
            {
                label: 'Name',
                value: 'Mr. John Doe'
            },
            {
                label: 'Phone',
                value: '514-234-5678'
            },
            {
                label: 'Website',
                value: 'https://www.avonni.app/'
            }
        ],
        guidance:
            "Respond to lead within 5 minutes. Visit the lead's website to learn about their business.",
        actions: [
            {
                name: 'action-add-email',
                label: 'Add email',
                iconName: 'utility:email'
            }
        ]
    },
    {
        name: 'qualification',
        label: 'Qualification',
        tooltip: '3 days in Open',
        keyFields: [
            {
                label: 'Company',
                value: 'John Doe Inc.'
            },
            {
                label: 'Description',
                value: 'John Doe Inc. is the lead retailer of yarn in Canada.'
            },
            {
                label: 'Number of employees',
                value: '2300'
            }
        ],
        guidance:
            "Qualify the opportunity and confirm budget. What's their business? What problems are they trying to solve? How does solving these problems help them?"
    },
    {
        name: 'contacted',
        label: 'Contacted',
        tooltip: '5 days in Open',
        keyFields: [
            {
                label: 'Date of call',
                value: '2021/10/23'
            },
            {
                label: 'Notes',
                value:
                    'John Doe Inc. is the lead retailer of yarn in Canada. It has 2,300 employees.'
            }
        ],
        guidance:
            'Verify contact information and qualify your lead. Gather all the contact information you can. The better armed you are, the higher the likelihood of developing positive communications with your lead and improving your prospecting success.'
    },
    {
        name: 'closed',
        label: 'Closed',
        tooltip: 'Closed',
        keyFields: [
            {
                label: 'Close date',
                value: '2021/10/30'
            },
            {
                label: 'Budget Confirmed',
                value: '$300.000'
            }
        ],
        hideDefaultActions: true
    }
];

export { ACTIONS, STEPS };

import { LightningElement } from 'lwc';

export default class TreeGridBase extends LightningElement {
    columns = [
        {
            type: 'text',
            fieldName: 'accountName',
            label: 'Account Name',
            initialWidth: 300
        },
        {
            type: 'number',
            fieldName: 'employees',
            label: 'Employees'
        },
        {
            type: 'phone',
            fieldName: 'phone',
            label: 'Phone Number'
        },
        {
            type: 'url',
            fieldName: 'accountOwner',
            label: 'Account Owner',
            typeAttributes: {
                label: { fieldName: 'accountOwnerName' }
            }
        },
        {
            type: 'text',
            fieldName: 'billingCity',
            label: 'Billing City'
        }
    ];

    data = [
        {
            name: '123555',
            accountName: 'Rewis Inc',
            employees: 3100,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'Jane Doe',
            billingCity: 'Phoeniz, AZ'
        },

        {
            name: '123556',
            accountName: 'Acme Corporation',
            employees: 10000,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'John Doe',
            billingCity: 'San Francisco, CA',
            _children: [
                {
                    name: '123556-A',
                    accountName: 'Acme Corporation (Bay Area)',
                    employees: 3000,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'New York, NY',
                    _children: [
                        {
                            name: '123556-A-A',
                            accountName: 'Acme Corporation (Oakland)',
                            employees: 745,
                            phone: '837-555-0100',
                            accountOwner:
                                'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'John Doe',
                            billingCity: 'New York, NY'
                        },
                        {
                            name: '123556-A-B',
                            accountName: 'Acme Corporation (San Francisco)',
                            employees: 578,
                            phone: '837-555-0100',
                            accountOwner:
                                'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'Jane Doe',
                            billingCity: 'Los Angeles, CA'
                        }
                    ]
                },

                {
                    name: '123556-B',
                    accountName: 'Acme Corporation (East)',
                    employees: 430,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'San Francisco, CA',
                    _children: [
                        {
                            name: '123556-B-A',
                            accountName: 'Acme Corporation (NY)',
                            employees: 1210,
                            phone: '837-555-0100',
                            accountOwner:
                                'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'Jane Doe',
                            billingCity: 'New York, NY'
                        },
                        {
                            name: '123556-B-B',
                            accountName: 'Acme Corporation (VA)',
                            employees: 410,
                            phone: '837-555-0100',
                            accountOwner:
                                'http://salesforce.com/fake/url/jane-doe',
                            accountOwnerName: 'John Doe',
                            billingCity: 'New York, NY',
                            _children: [
                                {
                                    name: '123556-B-B-A',
                                    accountName: 'Allied Technologies',
                                    employees: 390,
                                    phone: '837-555-0100',
                                    accountOwner:
                                        'http://salesforce.com/fake/url/jane-doe',
                                    accountOwnerName: 'Jane Doe',
                                    billingCity: 'Los Angeles, CA',
                                    _children: [
                                        {
                                            name: '123556-B-B-A-A',
                                            accountName:
                                                'Allied Technologies (UV)',
                                            employees: 270,
                                            phone: '837-555-0100',
                                            accountOwner:
                                                'http://salesforce.com/fake/url/jane-doe',
                                            accountOwnerName: 'John Doe',
                                            billingCity: 'San Francisco, CA'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        {
            name: '123557',
            accountName: 'Rhode Enterprises',
            employees: 6000,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'John Doe',
            billingCity: 'New York, NY',
            _children: [
                {
                    name: '123557-A',
                    accountName: 'Rhode Enterprises (UCA)',
                    employees: 2540,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'New York, NY'
                }
            ]
        },

        {
            name: '123558',
            accountName: 'Tech Labs',
            employees: 1856,
            phone: '837-555-0100',
            accountOwner: 'http://salesforce.com/fake/url/jane-doe',
            accountOwnerName: 'John Doe',
            billingCity: 'New York, NY',
            _children: [
                {
                    name: '123558-A',
                    accountName: 'Opportunity Resources Inc',
                    employees: 1934,
                    phone: '837-555-0100',
                    accountOwner: 'http://salesforce.com/fake/url/jane-doe',
                    accountOwnerName: 'John Doe',
                    billingCity: 'Los Angeles, CA'
                }
            ]
        }
    ];
}

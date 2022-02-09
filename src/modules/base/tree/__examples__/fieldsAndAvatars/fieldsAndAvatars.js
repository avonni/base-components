import { LightningElement } from 'lwc';

export default class TreeFieldsAndAvatars extends LightningElement {
    items = [
        {
            label: 'Employee 1',
            name: 'employee1',
            avatar: {
                fallbackIconName: 'standard:account',
                size: 'small',
                initials: 'HK'
            }
        },
        {
            label: 'Employee 2',
            name: 'employee2',
            fields: [
                {
                    label: 'Status',
                    value: 40,
                    type: 'percent'
                }
            ],
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                size: 'small',
                variant: 'circle'
            },
            items: [
                {
                    label: 'Employee 2.1',
                    name: 'employee2-1',
                    avatar: {
                        src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                        size: 'small',
                        variant: 'circle'
                    },
                    fields: [
                        {
                            label: 'Product',
                            value: 'Super Software'
                        },
                        {
                            label: 'Start Date',
                            value: new Date(2022, 0, 28),
                            type: 'date'
                        }
                    ]
                },
                {
                    label: 'Employee 2.2',
                    name: 'employee2-2',
                    avatar: {
                        fallbackIconName: 'standard:account',
                        size: 'small',
                        variant: 'circle',
                        initials: 'JG'
                    }
                },
                {
                    label: 'Employee 2.3',
                    name: 'employee2-3',
                    avatar: {
                        size: 'small',
                        variant: 'circle',
                        fallbackIconName: 'standard:user',
                        presence: 'online',
                        presencePosition: 'top-right'
                    },
                    fields: [
                        {
                            label: 'Product',
                            value: 'Another Software'
                        },
                        {
                            label: 'Contact',
                            value: '+15145550000',
                            type: 'phone'
                        },
                        {
                            label: 'Start Date',
                            value: new Date(2021, 10, 10),
                            type: 'date'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Employee 3',
            name: 'employee3',
            metatext: 'Metatext is always visible',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                size: 'small',
                variant: 'circle'
            },
            fields: [
                {
                    label: 'Status',
                    value: 60,
                    type: 'percent'
                }
            ],
            items: [
                {
                    label: 'Employee 3.1',
                    name: 'employee3-1'
                },
                {
                    label: 'Employee 3.2',
                    name: 'employee3-2',
                    fields: [
                        {
                            label: 'Employees Assigned',
                            value: 56,
                            type: 'number'
                        },
                        {
                            label: 'Employees Available',
                            value: 32,
                            type: 'number'
                        }
                    ]
                }
            ]
        }
    ];

    handleSelect(event) {
        // Prevent the links from navigating
        event.preventDefault();
    }
}

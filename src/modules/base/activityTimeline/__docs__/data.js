export const items = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: '01/11/2022',
        href: 'salesforce.com',
        iconName: 'standard:task',
        icons: ['utility:refresh'],
        hasCheckbox: true,
        fields: [
            {
                label: 'Name',
                value: 'Charlie Gomez',
                type: 'url',
                typeAttributes: {
                    label: 'Charlie Gomez'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Need to finalize proposals and brand details before the meeting',
                type: 'text'
            }
        ]
    },
    {
        name: 'item2',
        title: 'Mobile conversation on Monday',
        description: 'You logged a call with Adam Chan',
        href: '#',
        datetimeValue: new Date(),
        iconName: 'standard:log_a_call',
        fields: [
            {
                label: 'Name',
                value: 'Adam Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Adam Chan'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Adam seemed interested in closing this deal quickly! Let’s move.',
                type: 'text'
            }
        ]
    },
    {
        name: 'item3',
        title: 'Re: Mobile conversation on Monday with the new global team',
        description: 'You emailed Lea Chan',
        datetimeValue: '02/20/2022 08:00',
        href: '#',
        iconName: 'standard:email',
        icons: ['utility:groups', 'utility:attach'],
        fields: [
            {
                label: 'Name',
                value: 'Jackie Dewar',
                type: 'url',
                typeAttributes: {
                    label: 'Jackie Dewar'
                }
            },
            {
                label: 'To Address',
                value: 'Lea Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Lea Chan'
                }
            },
            {
                label: 'Text Body',
                value: 'Hi everyone, Thanks for meeting with the team today and going through the proposals we saw. This goes on and wraps if needed.',
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item4',
        title: 'EBC Follow up call',
        description: 'You created an event with Aida Lee and 5 others',
        icons: ['utility:world'],
        datetimeValue: '04/21/2021 8:00',
        href: '#',
        iconName: 'standard:event',
        fields: [
            {
                label: 'Location',
                value: 'Westen St. Francis, San Francisco, CA, 94622',
                type: 'url',
                typeAttributes: {
                    label: 'Westen St. Francis, San Francisco, CA, 94622'
                }
            },
            {
                label: 'Attendees',
                value: 'Jason Dewar (Organizer) + 5 others',
                type: 'url',
                typeAttributes: {
                    label: 'Jason Dewar (Organizer) + 5 others'
                }
            },
            {
                label: 'When',
                value: 'March 26, 10:00 AM - 11:00 AM',
                type: 'url',
                typeAttributes: {
                    label: 'March 26, 10:00 AM - 11:00 AM'
                }
            },
            {
                label: 'Description',
                value: "Let's discuss the 2017 product roadmap and address any questions",
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world',
        closed: true
    },
    {
        name: 'item5',
        title: 'Create one task',
        description: 'Fields are loading',
        datetimeValue: '05/21/2022 10:00',
        href: '#',
        iconName: 'standard:dashboard',
        loadingStateAlternativeText: 'Is Loading',
        hasCheckbox: true,
        isLoading: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item6',
        title: 'Create another task',
        datetimeValue: '05/21/2022 11:30',
        href: '#',
        iconName: 'standard:case',
        hasCheckbox: true,
        hasError: true
    }
];

export const itemsWithoutIcons = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: '01/11/2022',
        href: 'salesforce.com',
        icons: ['utility:refresh'],
        hasCheckbox: true,
        fields: [
            {
                label: 'Name',
                value: 'Charlie Gomez',
                type: 'url',
                typeAttributes: {
                    label: 'Charlie Gomez'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Need to finalize proposals and brand details before the meeting',
                type: 'text'
            }
        ]
    },
    {
        name: 'item2',
        title: 'Mobile conversation on Monday',
        description: 'You logged a call with Adam Chan',
        href: '#',
        isActive: true,
        datetimeValue: new Date(),
        fields: [
            {
                label: 'Name',
                value: 'Adam Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Adam Chan'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Adam seemed interested in closing this deal quickly! Let’s move.',
                type: 'text'
            }
        ]
    },
    {
        name: 'item3',
        title: 'Re: Mobile conversation on Monday with the new global team',
        description: 'You emailed Lea Chan',
        datetimeValue: '02/20/2022 08:00',
        href: '#',
        iconName: 'standard:email',
        icons: ['utility:groups', 'utility:attach'],
        fields: [
            {
                label: 'Name',
                value: 'Jackie Dewar',
                type: 'url',
                typeAttributes: {
                    label: 'Jackie Dewar'
                }
            },
            {
                label: 'To Address',
                value: 'Lea Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Lea Chan'
                }
            },
            {
                label: 'Text Body',
                value: 'Hi everyone, Thanks for meeting with the team today and going through the proposals we saw. This goes on and wraps if needed.',
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item4',
        title: 'EBC Follow up call',
        description: 'You created an event with Aida Lee and 5 others',
        icons: ['utility:world'],
        datetimeValue: '04/21/2021 8:00',
        href: '#',
        fields: [
            {
                label: 'Location',
                value: 'Westen St. Francis, San Francisco, CA, 94622',
                type: 'url',
                typeAttributes: {
                    label: 'Westen St. Francis, San Francisco, CA, 94622'
                }
            },
            {
                label: 'Attendees',
                value: 'Jason Dewar (Organizer) + 5 others',
                type: 'url',
                typeAttributes: {
                    label: 'Jason Dewar (Organizer) + 5 others'
                }
            },
            {
                label: 'When',
                value: 'March 26, 10:00 AM - 11:00 AM',
                type: 'url',
                typeAttributes: {
                    label: 'March 26, 10:00 AM - 11:00 AM'
                }
            },
            {
                label: 'Description',
                value: "Let's discuss the 2017 product roadmap and address any questions",
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world',
        closed: true
    },
    {
        name: 'item5',
        title: 'Create one task',
        datetimeValue: '05/21/2022 10:00',
        href: '#',
        hasCheckbox: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item6',
        title: 'Create another task',
        datetimeValue: '05/21/2022 11:30',
        href: '#',
        hasCheckbox: true,
        hasError: true
    }
];

export const yearlyItems = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: '01/01/2022',
        href: 'salesforce.com',
        iconName: 'standard:task',
        icons: ['utility:refresh'],
        hasCheckbox: true,
        fields: [
            {
                label: 'Name',
                value: 'Charlie Gomez',
                type: 'url',
                typeAttributes: {
                    label: 'Charlie Gomez'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Need to finalize proposals and brand details before the meeting',
                type: 'text'
            }
        ]
    },
    {
        name: 'item2',
        title: 'Mobile conversation on Monday',
        description: 'You logged a call with Adam Chan',
        href: '#',
        datetimeValue: new Date(),
        iconName: 'standard:log_a_call',
        fields: [
            {
                label: 'Name',
                value: 'Adam Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Adam Chan'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Adam seemed interested in closing this deal quickly! Let’s move.',
                type: 'text'
            }
        ]
    },
    {
        name: 'item3',
        title: 'Re: Mobile conversation on Monday with the new global team',
        description: 'You emailed Lea Chan',
        datetimeValue: '02/20/2023 08:00',
        href: '#',
        iconName: 'standard:email',
        icons: ['utility:groups', 'utility:attach'],
        fields: [
            {
                label: 'Name',
                value: 'Jackie Dewar',
                type: 'url',
                typeAttributes: {
                    label: 'Jackie Dewar'
                }
            },
            {
                label: 'To Address',
                value: 'Lea Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Lea Chan'
                }
            },
            {
                label: 'Text Body',
                value: 'Hi everyone, Thanks for meeting with the team today and going through the proposals we saw. This goes on and wraps if needed.',
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item4',
        title: 'EBC Follow up call',
        description: 'You created an event with Aida Lee and 5 others',
        icons: ['utility:world'],
        datetimeValue: '04/21/2021 8:00',
        href: '#',
        iconName: 'standard:event',
        fields: [
            {
                label: 'Location',
                value: 'Westen St. Francis, San Francisco, CA, 94622',
                type: 'url',
                typeAttributes: {
                    label: 'Westen St. Francis, San Francisco, CA, 94622'
                }
            },
            {
                label: 'Attendees',
                value: 'Jason Dewar (Organizer) + 5 others',
                type: 'url',
                typeAttributes: {
                    label: 'Jason Dewar (Organizer) + 5 others'
                }
            },
            {
                label: 'When',
                value: 'March 26, 10:00 AM - 11:00 AM',
                type: 'url',
                typeAttributes: {
                    label: 'March 26, 10:00 AM - 11:00 AM'
                }
            },
            {
                label: 'Description',
                value: "Let's discuss the 2017 product roadmap and address any questions",
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world',
        closed: true
    },
    {
        name: 'item5',
        title: 'Create one task',
        description: 'Fields are loading',
        datetimeValue: '05/21/2021 10:00',
        href: '#',
        iconName: 'standard:dashboard',
        loadingStateAlternativeText: 'Is Loading',
        hasCheckbox: true,
        isLoading: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item6',
        title: 'Create another task',
        datetimeValue: '05/21/2022 11:30',
        href: '#',
        iconName: 'standard:case',
        hasCheckbox: true,
        hasError: true
    }
];

export const testItems = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: '01/01/2022 10:00',
        href: 'salesforce.com',
        iconName: 'standard:task',
        icons: ['utility:refresh'],
        hasCheckbox: true,
        fields: [
            {
                label: 'Name',
                value: 'Charlie Gomez',
                type: 'url',
                typeAttributes: {
                    label: 'Charlie Gomez'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Need to finalize proposals and brand details before the meeting',
                type: 'text'
            }
        ]
    },
    {
        name: 'item2',
        title: 'Mobile conversation on Monday',
        description: 'You logged a call with Adam Chan',
        href: '#',
        datetimeValue: '05/21/2021 10:00',
        iconName: 'standard:log_a_call',
        fields: [
            {
                label: 'Name',
                value: 'Adam Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Adam Chan'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Adam seemed interested in closing this deal quickly! Let’s move.',
                type: 'text'
            }
        ]
    },
    {
        name: 'item3',
        title: 'Create one task',
        description: 'Fields are loading',
        datetimeValue: '05/21/2055 10:00',
        href: '#',
        iconName: 'standard:dashboard',
        loadingStateAlternativeText: 'Is Loading',
        hasCheckbox: true,
        isLoading: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item4',
        title: 'Create another task',
        datetimeValue: '05/21/2038 11:30',
        href: '#',
        iconName: 'standard:case',
        hasCheckbox: true,
        hasError: true
    }
];

export const actions = [
    {
        label: 'Add item',
        name: 'add-item',
        iconName: 'utility:add'
    },
    {
        label: 'Edit item',
        name: 'edit-item',
        iconName: 'utility:edit'
    }
];

export const horizontalItems = [
    {
        name: 'item1',
        title: '(01/01/2022 7:45) Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: '01/01/2022 7:45',
        href: 'salesforce.com',
        iconName: 'standard:task',
        icons: ['utility:refresh'],
        hasCheckbox: true
    },
    {
        name: 'item2',
        title: 'Mobile conversation on Monday',
        description: 'You logged a call with Adam Chan',
        href: '#',
        datetimeValue: new Date(),
        iconName: 'standard:log_a_call'
    },
    {
        name: 'item3',
        title: '(02/20/2023 08:00) Re: Mobile conversation on Monday with the new global team',
        description: 'You emailed Lea Chan',
        datetimeValue: '02/20/2023 08:00',
        href: '#',
        iconName: 'standard:email',
        icons: ['utility:groups', 'utility:attach'],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item4',
        title: '(04/21/2021 8:00) EBC Follow up call',
        description: 'You created an event with Aida Lee and 5 others',
        icons: ['utility:world'],
        datetimeValue: '04/21/2021 8:00',
        href: '#',
        iconName: 'standard:event',
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:activity',
        closed: true
    },
    {
        name: 'item5',
        title: 'Create one task',
        description: '(02/14/2022 10:00) Fields are loading',
        datetimeValue: '02/14/2022 10:00',
        href: '#',
        iconName: 'standard:dashboard',
        loadingStateAlternativeText: 'Is Loading',
        hasCheckbox: true,
        isLoading: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:brush'
    },
    {
        name: 'item6',
        title: '(01/21/2022 11:30) Create another task',
        datetimeValue: '01/21/2022 11:30',
        href: '#',
        iconName: 'standard:skill',
        hasCheckbox: true,
        hasError: true
    },
    {
        name: 'item7',
        title: '(03/14/2022 8:30) Another item',
        datetimeValue: '03/14/2022 8:30',
        href: '#',
        iconName: 'custom:custom47',
        hasCheckbox: true,
        hasError: true
    },
    {
        name: 'item8',
        title: '(02/02/2022 3:30) Another item',
        datetimeValue: '02/02/2022 3:30',
        href: '#',
        iconName: 'standard:solution',
        hasCheckbox: false,
        hasError: true
    },
    {
        name: 'item88',
        title: '(02/02/2022 5:30) Another item with same date',
        datetimeValue: '02/02/2022 5:30',
        href: '#',
        iconName: 'standard:procedure_detail',
        hasCheckbox: false,
        hasError: true
    },
    {
        name: 'item9',
        title: '(01/30/2022 2:00) This is another item to display',
        datetimeValue: '01/30/2022 2:00',
        href: '#',
        iconName: 'standard:service_request_detail',
        hasCheckbox: false,
        hasError: true
    },
    {
        name: 'item99',
        title: '(01/31/2022 2:00) Item',
        datetimeValue: '01/31/2022 2:00',
        href: '#',
        iconName: 'action:log_event',
        hasCheckbox: false,
        hasError: true
    },
    {
        name: 'item10',
        title: '(01/04/2022 10:30) Another new item',
        datetimeValue: '01/04/2022 10:30',
        href: '#',
        iconName: 'utility:frozen',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item11',
        title: '(02/02/2022 00:00) Another new item',
        datetimeValue: '02/03/2022 00:00',
        href: '#',
        iconName: 'standard:bot',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item12',
        title: '(02/16/2022 00:00) Another new item',
        datetimeValue: '02/16/2022 00:00',
        href: '#',
        iconName: 'action:map',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item13',
        title: '(02/08/2022 08:00) Another item',
        datetimeValue: '02/08/2022 08:00',
        href: '#',
        iconName: 'standard:bot',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item14',
        title: '(02/02/2022 08:30) Another item',
        datetimeValue: '02/02/2022 08:30',
        href: '#',
        iconName: 'standard:education',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item15',
        title: '(02/02/2022 20:30) Another item',
        datetimeValue: '02/02/2022 20:30',
        href: '#',
        iconName: 'standard:lead',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item16',
        title: '(02/02/2022 10:45) Magic item',
        datetimeValue: '02/02/2022 10:45',
        href: '#',
        iconName: 'standard:thanks',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item17',
        title: '(02/03/2022 10:45) Item',
        datetimeValue: '02/03/2022 10:45',
        href: '#',
        iconName: 'custom:custom69',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item18',
        title: '(02/04/2022 10:45) Surprise!',
        datetimeValue: '02/04/2022 10:45',
        href: '#',
        iconName: 'standard:announcement',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item19',
        title: '(02/04/2022 10:45) Another surprise!',
        datetimeValue: '02/04/2022 10:45',
        href: '#',
        iconName: 'action:priority',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item20',
        title: '(02/02/2022 00:00) Event 20',
        datetimeValue: '02/02/2022 00:00',
        href: '#',
        iconName: 'utility:education',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item21',
        title: '(02/02/2022 08:30) Event 21',
        datetimeValue: '02/02/2022 08:30',
        href: '#',
        iconName: 'utility:animal_and_nature',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item22',
        title: '(02/02/2022 08:30) Long Title Item With More Than 30 Characters',
        datetimeValue: '02/02/2022 08:30',
        href: '#',
        iconName: 'standard:trailhead',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item23',
        title: '(02/09/2022 08:30) Really long title event with a lot of characters',
        datetimeValue: '02/09/2022 08:30',
        href: '#',
        iconName: 'utility:palette',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item24',
        title: '(02/09/2024 08:30) Really long title event with a lot of characters',
        datetimeValue: '02/09/2024 08:30',
        href: '#',
        iconName: 'utility:pin',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item25',
        title: '(02/02/2022 08:30) Mysterious item',
        datetimeValue: '02/02/2022 08:30',
        href: '#',
        iconName: 'standard:recipe',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item26',
        title: '(02/02/2022 09:30) Random event',
        datetimeValue: '02/02/2022 09:30',
        href: '#',
        iconName: 'standard:story',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item27',
        title: '(02/02/2022 22:30) Surprise event!',
        datetimeValue: '02/02/2022 22:30',
        href: '#',
        iconName: 'standard:topic',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item28',
        title: '(09/09/2022 22:30) Event',
        datetimeValue: '09/09/2022 22:30',
        href: '#',
        iconName: 'doctype:video',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item29',
        title: '(06/09/2022 10:30) Event',
        datetimeValue: '06/09/2022 10:30',
        href: '#',
        iconName: 'doctype:folder',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item30',
        title: '(07/09/2022 10:30) Default event',
        datetimeValue: '07/09/2022 10:30',
        href: '#',
        iconName: 'invalid:name',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item31',
        title: '(08/08/2022 11:11) Custom event',
        datetimeValue: '08/08/2022 11:11',
        href: '#',
        iconName: 'custom:custom74',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item32',
        title: '(01/01/2021 11:11) Event',
        datetimeValue: '01/01/2021 11:11',
        href: '#',
        iconName: 'custom:custom74',
        hasCheckbox: true,
        hasError: false
    },
    {
        name: 'item33',
        title: '(01/04/2022 8:27) Magic',
        datetimeValue: '01/04/2022 8:27',
        href: '#',
        iconName: 'custom:custom1',
        hasCheckbox: true,
        hasError: false
    }
];

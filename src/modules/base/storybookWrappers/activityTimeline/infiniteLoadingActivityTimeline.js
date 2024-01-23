import { LightningElement, api } from 'lwc';

const ITEMS = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: '01/11/2022',
        href: 'salesforce.com',
        avatar: 'standard:task',
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
        avatar: 'standard:log_a_call',
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
        avatar: 'standard:email',
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
        avatar: 'standard:event',
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
        avatar: 'standard:dashboard',
        hasCheckbox: true,
        checked: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item6',
        title: 'Create another task',
        datetimeValue: '05/21/2022 11:30',
        href: '#',
        avatar: 'standard:case',
        hasCheckbox: true,
        hasError: true
    }
];

export default class InfiniteLoadingActivityTimeline extends LightningElement {
    @api actions;
    @api buttonShowLessIconName;
    @api buttonShowLessIconPosition;
    @api buttonShowLessLabel;
    @api buttonShowMoreIconName;
    @api buttonShowMoreIconPosition;
    @api buttonShowMoreLabel;
    @api buttonVariant;
    @api closed;
    @api collapsible;
    @api groupBy;
    @api hideItemDate;
    @api iconName;
    @api iconSize;
    @api itemDateFormat;
    @api itemIconSize;
    @api loadMoreOffset;
    @api locale;
    @api maxVisibleItems;
    @api orientation;
    @api sortedDirection;
    @api timezone;
    @api title;

    enableInfiniteLoading = true;
    isLoading = false;
    items = [];
    loadedItems = [];
    _loadMoreTimeout;

    connectedCallback() {
        this.initItems();
    }

    getRandomDate(start, end, startHour, endHour) {
        const date = new Date(+start + Math.random() * (end - start));
        const hour = (startHour + Math.random() * (endHour - startHour)) | 0;
        date.setHours(hour);
        return date;
    }

    initItems() {
        let itemCount = 0;
        for (let i = 0; i < 50; i++) {
            if (!ITEMS[itemCount]) {
                itemCount = 0;
            }
            const item = { ...ITEMS[itemCount] };
            item.name = `item${i}`;
            item.datetimeValue = this.getRandomDate(
                new Date(2021, 3, 1),
                new Date(2024, 3, 30),
                0,
                23
            );
            this.items.push(item);
            itemCount += 1;
        }
    }

    handleLoadMore() {
        this.isLoading = true;

        clearTimeout(this._loadMoreTimeout);
        this._loadMoreTimeout = setTimeout(() => {
            this.loadedItems = this.items.slice(
                0,
                this.loadedItems.length + 10
            );
            this.isLoading = false;
            if (this.loadedItems.length === this.items.length) {
                this.enableInfiniteLoading = false;
            }
        }, 1000);
    }
}

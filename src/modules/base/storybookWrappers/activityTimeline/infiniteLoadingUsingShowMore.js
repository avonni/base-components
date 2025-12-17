import { LightningElement, api } from 'lwc';
import { generateUUID } from 'c/utils';

const ITEMS = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: new Date(2024, 0, 3, 12, 30),
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
        datetimeValue: new Date(2024, 0, 4, 15, 45),
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
        datetimeValue: new Date(2024, 0, 10, 9, 0),
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
        datetimeValue: new Date(2024, 0, 10, 10, 30),
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
        datetimeValue: new Date(2024, 0, 18, 17),
        href: '#',
        iconName: 'standard:dashboard',
        hasCheckbox: true,
        checked: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    }
];

export default class InfiniteLoadingUsingShowMoreActivityTimeline extends LightningElement {
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
    @api itemIconVariant;
    @api loadMoreOffset;
    @api locale;
    @api orientation;
    @api sortedDirection;
    @api timezone;
    @api title;

    _maxVisibleItems;

    _loadMoreTimeout;
    computedMaxVisibleItems;
    isLoading = false;
    items = ITEMS;

    @api
    get maxVisibleItems() {
        return this._maxVisibleItems;
    }
    set maxVisibleItems(value) {
        const number = parseInt(value, 10);
        if (isNaN(number) || number < 0) {
            return;
        }
        this._maxVisibleItems = number;
        this.computedMaxVisibleItems = this._maxVisibleItems;
    }

    generateItems() {
        let itemCount = 0;
        let datetimeValue = this.items[this.items.length - 1].datetimeValue;
        for (let i = 0; i < 5; i++) {
            if (!ITEMS[itemCount]) {
                itemCount = 0;
            }
            const item = { ...ITEMS[itemCount] };
            item.name = generateUUID();
            // Add 8 hours to the last item datetimeValue
            datetimeValue = new Date(
                datetimeValue.getTime() + 60 * 60 * 1000 * 8
            );
            item.datetimeValue = datetimeValue;
            this.items.push(item);
            itemCount += 1;
        }
        this.items = [...this.items];
    }

    handleItemsVisibilityToggle(event) {
        event.preventDefault();

        if (this.items.length < 20) {
            this.isLoading = true;

            clearTimeout(this._showMoreTimeout);
            this._showMoreTimeout = setTimeout(() => {
                this.isLoading = false;
                this.generateItems();
                this.computedMaxVisibleItems = this.items.length - 1;
            }, 1000);
        } else {
            this.computedMaxVisibleItems = Infinity;
        }
    }
}

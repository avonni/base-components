import { LightningElement } from 'lwc';

export default class ListWithInfiniteLoading extends LightningElement {
    _isLoading = false;

    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = value;
    }

    connectedCallback() {
        this._loadedItems = this.items;
    }

    items = [
        {
            label: 'Item 1',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            name: 'name-item-1'
        },
        {
            label: 'Item 2',
            href: '/path/to_somewhere',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            name: 'name-item-2'
        },
        {
            label: 'Item 3',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            name: 'name-item-3'
        },
        {
            label: 'Item 4',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            name: 'name-item-4'
        },
        {
            label: 'Item 5',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            name: 'name-item-5'
        }
    ];

    actions = [
        {
            label: 'Completed',
            name: 'completed-action',
            iconName: 'utility:check',
            disabled: false
        },
        {
            label: 'Pending',
            name: 'prending-action',
            iconName: 'utility:spinner',
            disabled: false
        },
        {
            label: 'Delete',
            name: 'delete-action',
            iconName: 'utility:delete',
            disabled: true
        }
    ];

    loadMoreData(event) {
        const target = event.target;
        this._isLoading = true;

        setTimeout(() => {
            const newItems = target.items.concat(this._loadedItems);

            if (newItems.length >= 20) {
                this._isLoading = false;
                target.enableInfiniteLoading = false;
            } else {
                this._isLoading = false;
                target.items = newItems;
            }
        }, 1000);
    }
}

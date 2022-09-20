import { LightningElement } from 'lwc';

export default class BaseWithInfiniteLoading extends LightningElement {

    isLoading = false;
    enableInfiniteLoading = true;
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
            name: 'pending-action',
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


    connectedCallback() {
        this.loadedItems = this.items;
    }

    loadMoreData() {
        this.isLoading = true;

        setTimeout(() => {
            const newItems = this.items.concat(this.loadedItems);

            if (newItems.length >= 30) {
                this.isLoading = false;
                this.enableInfiniteLoading = false;
            } else {
                this.isLoading = false;
                this.items = newItems;
            }
        }, 1000);
    }
}

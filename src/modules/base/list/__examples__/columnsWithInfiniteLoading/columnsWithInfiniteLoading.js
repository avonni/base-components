import { LightningElement } from 'lwc';

export default class ColumnWithInfiniteLoading extends LightningElement {
    isLoading = false;
    enableInfiniteLoading = true;
    imageAttributes = {
        position: 'top'
    };
    items = [
        {
            label: 'Item 1',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imageSrc:
                'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
            name: 'name-item-1'
        },
        {
            label: 'Item 2',
            href: '/path/to_somewhere',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imageSrc:
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDAyMjV8MHwxfGFsbHw1NHx8fHx8fDF8fDE2MjAyNTA3MjY&ixlib=rb-1.2.1&q=85',
            name: 'name-item-2'
        },
        {
            label: 'Item 3',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imageSrc:
                'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
            name: 'name-item-3'
        },
        {
            label: 'Item 4',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            infos: [{ label: 'info 1' }, { label: 'info 2', href: '#' }],
            icons: ['utility:share', 'utility:refresh'],
            imageSrc:
                'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            name: 'name-item-4'
        },
        {
            label: 'Item 5',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            infos: [
                { label: 'info 1', href: 'https://www.avonni.app/' },
                { label: 'info 2', href: 'https://www.avonni.app/' }
            ],
            icons: ['utility:share', 'utility:refresh'],
            name: 'name-item-5'
        }
    ];
    loadedItems = [];

    connectedCallback() {
        this.generateItems();
    }

    generateItems() {
        const newItems = this.items.map((item, index) => {
            return {
                ...item,
                name: `item-${this.loadedItems.length + index + 1}`,
                label: `Item #${this.loadedItems.length + index + 1}`
            };
        });
        this.loadedItems = this.loadedItems.concat(newItems);
    }

    loadMoreData() {
        if (this.loadedItems.length > 30) {
            this._isLoading = false;
            this._enableInfiniteLoading = false;
            return;
        }
        this._isLoading = true;

        setTimeout(() => {
            this.generateItems();
            this._isLoading = false;
        }, 1000);
    }
}

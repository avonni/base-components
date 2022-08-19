import { LightningElement } from 'lwc';

export default class SingleLineWithInfiniteLoading extends LightningElement {
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

    imageAttributes = {
        size: 'large'
    };

    itemsWithImages = [
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
            infos: [
                { label: 'info 1', href: '' },
                { label: 'info 2', href: '' }
            ],
            icons: ['utility:share', 'utility:refresh'],
            imageSrc:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            name: 'name-item-4'
        },
        {
            label: 'Item 5',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            infos: [
                { label: 'info 1', href: '' },
                { label: 'info 2', href: '' }
            ],
            icons: ['utility:share', 'utility:refresh'],
            imageSrc:
                'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300',
            name: 'name-item-5'
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

import { LightningElement } from 'lwc';

export default class ListSortableWithImagesAndAvatars extends LightningElement {
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

    items = [
        {
            label: 'Item 1',
            avatar: {
                fallbackIconName: 'custom:custom5',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            },
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imageSrc:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
        },
        {
            label: 'Item 2',
            avatar: {
                fallbackIconName: 'custom:custom9',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            },
            href: '/path/to_somewhere',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imageSrc:
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDAyMjV8MHwxfGFsbHw1NHx8fHx8fDF8fDE2MjAyNTA3MjY&ixlib=rb-1.2.1&q=85'
        },
        {
            label: 'Item 3',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imageSrc:
                'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg'
        },
        {
            label: 'Item 4',
            avatar: {
                fallbackIconName: 'custom:custom11',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            },
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            infos: [
                { label: 'info 1', href: '' },
                { label: 'info 2', href: '' }
            ],
            icons: ['utility:share', 'utility:refresh'],
            imageSrc:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
        },
        {
            label: 'Item 5',
            avatar: {
                fallbackIconName: 'custom:custom1',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
            },
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            infos: [{ label: 'info 1', href: '' }],
            icons: ['utility:share'],
            imageSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
        }
    ];
}

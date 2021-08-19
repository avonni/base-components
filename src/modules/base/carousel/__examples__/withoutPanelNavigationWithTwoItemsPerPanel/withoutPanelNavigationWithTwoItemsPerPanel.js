import { LightningElement } from 'lwc';

const menuActions = [
    {
        name: 'action-add',
        iconName: 'utility:add',
        label: 'Add'
    },
    {
        name: 'action-pin',
        iconName: 'utility:pin',
        label: 'Pin'
    },
    {
        name: 'action-priority',
        iconName: 'utility:priority',
        label: 'Prioritize'
    }
];

export default class AvonniCarouselWithoutPanelNavigationWithTwoItemsPerPanel extends LightningElement{

    menuItems = [
        {
            id: 1,
            title: 'Visit App Exchange',
            description: 'Extend Salesforce with the #1 business marketplace.',
            imageAssistiveText: 'Appy',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            actions: menuActions
        },
        {
            id: 2,
            title: 'Click to Customize',
            description:
                'Use the Object Manager to add fields, build layouts, and more.',
            imageAssistiveText: 'Apps',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
            actions: menuActions
        },
        {
            id: 3,
            title: 'Download Salesforce Apps',
            description: "Get the mobile app that's just for Salesforce admins.",
            imageAssistiveText: 'Salesforce Apps',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
            actions: menuActions
        },
        {
            id: 4,
            title: 'Carousel Item 4',
            description: 'Description for carousel item #4',
            imageAssistiveText: 'Apps',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
            actions: menuActions
        },
        {
            id: 5,
            title: 'Carousel Item 5',
            description: 'Description for carousel item #5',
            imageAssistiveText: 'Appy',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            actions: menuActions
        },
        {
            id: 6,
            title: 'Carousel Item 6',
            description: 'Description for carousel item #6',
            imageAssistiveText: 'Salesforce Apps',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
            actions: menuActions
        },
        {
            id: 7,
            title: 'Carousel Item 7',
            description: 'Description for carousel item #7',
            imageAssistiveText: 'Apps',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
            actions: menuActions
        }
    ];
}
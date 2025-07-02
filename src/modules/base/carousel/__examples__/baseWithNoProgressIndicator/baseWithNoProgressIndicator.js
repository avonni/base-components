import { LightningElement } from 'lwc';

const bareActions = [
    {
        name: 'action-add',
        iconName: 'utility:add'
    },
    {
        name: 'action-pin',
        iconName: 'utility:pin'
    },
    {
        name: 'action-priority',
        iconName: 'utility:priority'
    }
];

export default class AvonniCarouselBaseWithNoProgressIndicator extends LightningElement {
    assistiveText = {
        nextPanel: 'Next',
        previousPanel: 'Previous',
        autoplayButton: 'Start / Stop auto-play'
    };
    items = [
        {
            name: '1',
            title: 'Visit App Exchange',
            description: 'Extend Salesforce with the #1 business marketplace.',
            imageAssistiveText: 'Appy',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        },
        {
            name: '2',
            title: 'Click to Customize',
            description:
                'Use the Object Manager to add fields, build layouts, and more.',
            imageAssistiveText: 'Appy',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        },
        {
            name: '3',
            title: 'Download Salesforce Apps',
            description:
                "Get the mobile app that's just for Salesforce admins.",
            imageAssistiveText: 'Salesforce Apps',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        },
        {
            name: '4',
            title: 'Carousel Item 4',
            description: 'Description for carousel item #4',
            imageAssistiveText: 'Appy',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        },
        {
            name: '5',
            title: 'Carousel Item 5',
            description: 'Description for carousel item #5',
            imageAssistiveText: 'Appy',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        },
        {
            name: '6',
            title: 'Carousel Item 6',
            description: 'Description for carousel item #6',
            imageAssistiveText: 'Salesforce Apps',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        },
        {
            name: '7',
            title: 'Carousel Item 7',
            description: 'Description for carousel item #7',
            imageAssistiveText: 'Appy',
            src: 'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        }
    ];
}

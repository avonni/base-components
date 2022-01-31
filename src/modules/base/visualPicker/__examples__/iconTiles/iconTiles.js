import { LightningElement } from 'lwc';

export default class VisualPickerIconTiles extends LightningElement {
    items = [
        {
            value: 'lightning-email',
            title: 'Email',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:email',
                size: 'large'
            },
            avatarPosition: 'top'
        },
        {
            value: 'lightning-favorite',
            title: 'Favorite',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:favorite',
                size: 'large'
            },
            avatarPosition: 'top'
        },
        {
            value: 'lightning-bookmark',
            title: 'Bookmark',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:bookmark',
                size: 'large'
            },
            avatarPosition: 'top'
        },
        {
            value: 'lightning-call',
            title: 'Call',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:call',
                size: 'large'
            },
            avatarPosition: 'top'
        },
        {
            value: 'lightning-comments',
            title: 'Comment',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:comments',
                size: 'large'
            },
            avatarPosition: 'top'
        },
        {
            value: 'lightning-chat',
            title: 'Chat',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:chat',
                size: 'large'
            },
            avatarPosition: 'top'
        }
    ];
}

export const ITEMS = [
    {
        label: 'Item 1',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatar: {
            fallbackIconName: 'custom:custom5',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        imageSrc:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
    },
    {
        label: 'Item 2',
        avatar: {
            fallbackIconName: 'custom:custom9',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        imageSrc:
            'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg'
    },
    {
        label: 'Item 3',
        avatar: {
            fallbackIconName: 'custom:custom1',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
        },
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
    },
    {
        label: 'Item 4'
    },
    {
        label: 'Item 5',
        avatar: {
            fallbackIconName: 'custom:custom11',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        imageSrc:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
    }
];

export const ITEMS_WITHOUT_ICONS = [
    {
        label: 'Item 1'
    },
    {
        label: 'Item 2'
    },
    {
        label: 'Item 3'
    },
    {
        label: 'Item 4'
    }
];

export const ACTIONS = [
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

export const ACTION = [
    {
        label: 'Completed',
        name: 'completed-action',
        iconName: 'utility:check',
        disabled: false
    }
];

export const ACTION_NO_LABEL = [
    {
        name: 'event-action',
        iconName: 'utility:event',
        disabled: false
    }
];

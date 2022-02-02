import { LightningElement } from 'lwc';

export default class VisualPickerXSmallAvatarStory extends LightningElement {
    items = [
        {
            value: 'garret-jones',
            itemTitle: 'Garret Jones',
            itemDescription: 'VP, Human Resources',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/2.jpg',
                presence: 'online',
                size: 'large'
            }
        },
        {
            itemTitle: 'Heather Johnson',
            itemDescription: 'VP, Finance',
            avatar: {
                variant: 'circle',
                initials: 'HJ',
                iconName: 'standard:user',
                presence: 'online',
                size: 'large'
            },
            value: 'heather-johnson'
        },
        {
            itemTitle: 'Richard Matthews',
            itemDescription: 'Director of Sales Operations',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://i0.wp.com/www.commercialphotographynorthwestblog.co.uk/wp-content/uploads/2018/04/Linkedin-headshot-0005.jpg?resize=1024%2C1024&ssl=1',
                presence: 'offline',
                size: 'large'
            },
            value: 'richard-matthews'
        },
        {
            itemTitle: 'Michaela David',
            itemDescription: 'HR Services Lead',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://source.unsplash.com/nwdPxI1h4NQ/100x100',
                presence: 'away',
                size: 'large'
            },
            value: 'michaela-david'
        },
        {
            itemTitle: 'Roger Reese',
            itemDescription: 'Senior Vice President',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://linkedinriches.com/wp-content/uploads/2013/12/Nemo-Headshot-2.jpg',
                presence: 'online',
                size: 'large'
            },
            value: 'roger-reese'
        }
    ];
}

import { LightningElement } from 'lwc';

export default class VisualPickerAvatarStory extends LightningElement {
    items = [
        {
            value: 'garret-jones',
            title: 'Garret Jones',
            description: 'VP, Human Resources',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/2.jpg',
                presence: 'online'
            }
        },
        {
            value: 'heather-johnson',
            title: 'Heather Johnson',
            description: 'VP, Finance',
            avatar: {
                variant: 'circle',
                initials: 'HJ',
                iconName: 'standard:user',
                presence: 'online'
            }
        },
        {
            value: 'richard-matthews',
            title: 'Richard Matthews',
            description: 'Director of Sales Operations',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://i0.wp.com/www.commercialphotographynorthwestblog.co.uk/wp-content/uploads/2018/04/Linkedin-headshot-0005.jpg?resize=1024%2C1024&ssl=1',
                presence: 'offline'
            }
        },
        {
            value: 'michaela-david',
            title: 'Michaela David',
            description: 'HR Services Lead',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://source.unsplash.com/nwdPxI1h4NQ/100x100',
                presence: 'away'
            }
        },
        {
            value: 'roger-reese',
            title: 'Roger Reese',
            description: 'Senior Vice President',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://linkedinriches.com/wp-content/uploads/2013/12/Nemo-Headshot-2.jpg',
                presence: 'online'
            }
        }
    ];
}

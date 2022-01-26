import { LightningElement } from 'lwc';

export default class VisualPickerXSmallAvatarStory extends LightningElement {
    items = [
        {
            value: 'garret-jones',
            title: 'Garret Jones',
            description: 'VP, Human Resources',
            figure: {
                avatar: {
                    variant: 'circle',
                    imgSrc: 'https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/2.jpg',
                    presence: 'online',
                    size: 'large'
                }
            }
        },
        {
            title: 'Heather Johnson',
            description: 'VP, Finance',
            figure: {
                avatar: {
                    variant: 'circle',
                    initials: 'HJ',
                    iconName: 'standard:user',
                    presence: 'online',
                    size: 'large'
                }
            },
            value: 'heather-johnson'
        },
        {
            title: 'Richard Matthews',
            description: 'Director of Sales Operations',
            figure: {
                avatar: {
                    variant: 'circle',
                    imgSrc: 'https://i0.wp.com/www.commercialphotographynorthwestblog.co.uk/wp-content/uploads/2018/04/Linkedin-headshot-0005.jpg?resize=1024%2C1024&ssl=1',
                    presence: 'offline',
                    size: 'large'
                }
            },
            value: 'richard-matthews'
        },
        {
            title: 'Michaela David',
            description: 'HR Services Lead',
            figure: {
                avatar: {
                    variant: 'circle',
                    imgSrc: 'https://source.unsplash.com/nwdPxI1h4NQ/100x100',
                    presence: 'away',
                    size: 'large'
                }
            },
            value: 'michaela-david'
        },
        {
            title: 'Roger Reese',
            description: 'Senior Vice President',
            figure: {
                avatar: {
                    variant: 'circle',
                    imgSrc: 'https://linkedinriches.com/wp-content/uploads/2013/12/Nemo-Headshot-2.jpg',
                    presence: 'online',
                    size: 'large'
                }
            },
            value: 'roger-reese'
        }
    ];
}

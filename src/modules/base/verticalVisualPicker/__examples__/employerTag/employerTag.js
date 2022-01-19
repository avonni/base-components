import { LightningElement } from 'lwc';

export default class VerticalVisualPickerEmployerTag extends LightningElement {
    items = [
        {
            title: 'Garret Jones',
            description: 'VP, Human Resources',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://monteluke.com.au/wp-content/gallery/linkedin-profile-pictures/2.jpg',
                presence: 'online',
                size: 'x-large'
            },
            tags: [
                {
                    label: 'Attending',
                    variant: 'success'
                }
            ],
            value: 'garret-jones'
        },
        {
            title: 'Heather Johnson',
            description: 'VP, Finance',
            avatar: {
                variant: 'circle',
                initials: 'HJ',
                iconName: 'standard:user',
                presence: 'online',
                size: 'x-large'
            },
            tags: [
                {
                    label: 'Not Attending',
                    variant: 'error'
                }
            ],
            value: 'heather-johnson'
        },
        {
            title: 'Richard Matthews',
            description: 'Director of Sales Operations',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://i0.wp.com/www.commercialphotographynorthwestblog.co.uk/wp-content/uploads/2018/04/Linkedin-headshot-0005.jpg?resize=1024%2C1024&ssl=1',
                presence: 'offline',
                size: 'x-large'
            },
            tags: [
                {
                    label: 'Invited'
                }
            ],
            value: 'richard-matthews'
        },
        {
            title: 'Michaela Davidson',
            description: 'HR Services Lead',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://source.unsplash.com/nwdPxI1h4NQ/100x100',
                presence: 'away',
                size: 'x-large'
            },
            tags: [
                {
                    label: 'Attending',
                    variant: 'success'
                }
            ],
            value: 'michaela-davidson'
        },
        {
            title: 'Roger Reese',
            description: 'Senior Vice President',
            avatar: {
                variant: 'circle',
                imgSrc: 'https://linkedinriches.com/wp-content/uploads/2013/12/Nemo-Headshot-2.jpg',
                presence: 'online',
                size: 'x-large'
            },
            tags: [
                {
                    label: 'Attending',
                    variant: 'success'
                }
            ],
            value: 'roger-reese'
        }
    ];
}

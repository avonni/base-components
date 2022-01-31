import { LightningElement } from 'lwc';

export default class VisualPickerItemsWithPictures extends LightningElement {
    items = [
        {
            value: 'City',
            title: 'City',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:company'
            },
            imgSrc: 'https://media.architecturaldigest.com/photos/58f918044f42bd463db36a3f/16:9/w_1280,c_limit/1%20-%2010%20Greenest%20Cities%20in%20America%20in%202017.jpg',
            imgAlternativeText: 'City'
        },
        {
            value: 'Village',
            title: 'Village',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:home'
            },
            imgSrc: 'https://i.guim.co.uk/img/media/8eba2de427742ba2600eac3826faf1caa7fc773a/0_355_5608_3365/master/5608.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=c53c6491f4b95159d400070a6468ca5e',
            imgAlternativeText: 'Village'
        },
        {
            value: 'Mountain',
            title: 'Mountain',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:trailhead'
            },
            imgSrc: 'https://www.worldatlas.com/r/w1200/upload/56/fb/ee/alaska-mountain-range-csnafzger.jpg',
            imgAlternativeText: 'Mountain'
        },
        {
            value: 'Beach',
            title: 'Beach',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:world'
            },
            imgSrc: 'https://atlantis.nyc3.digitaloceanspaces.com/media/legacy/atlantis/Things_To_Do/Water_Park/Beaches/Hero/Experiences_Beach.jpg',
            imgAlternativeText: 'Beach'
        },
        {
            value: 'Forest',
            title: 'Forest',
            titlePosition: 'bottom',
            avatar: {
                iconName: 'utility:trail'
            },
            imgSrc: 'https://cdn2.wanderlust.co.uk/media/1037/forest-web.jpg?anchor=center&mode=crop&width=1200&height=0&rnd=132605629110000000',
            imgAlternativeText: 'Forest'
        }
    ];
}

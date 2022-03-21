import { LightningElement } from 'lwc';

export default class AvatarCircleWithActionAndPresence extends LightningElement {
    actions = [
        {
            label: 'Take a profile picture',
            name: 'take-profile-picture',
            iconName: 'utility:photo'
        }
    ];
}

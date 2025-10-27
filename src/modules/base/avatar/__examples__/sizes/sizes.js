import { api, LightningElement } from 'lwc';

export default class AvatarSizes extends LightningElement {
    @api variant;
    @api entityPosition;

    actions = [
        {
            name: 'action1',
            label: 'Action 1',
            iconName: 'standard:account'
        },
        {
            name: 'action2',
            label: 'Action 2',
            iconName: 'standard:avatar'
        }
    ];
}

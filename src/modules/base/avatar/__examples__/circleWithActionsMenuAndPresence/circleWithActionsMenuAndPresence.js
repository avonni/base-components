import { LightningElement } from 'lwc';

export default class AvatarCircleWithActionsMenuAndPresence extends LightningElement {
    actions = [
        {
            label: 'Edit item',
            name: 'edit-item',
            iconName: 'utility:edit'
        },
        {
            label: 'Action without an icon',
            name: 'action-name'
        }
    ];
}

import { LightningElement } from 'lwc';

export default class ButtonsWithRightIcons extends LightningElement {
    options = [
        {
            label: 'Left',
            value: 'left',
            iconName: 'utility:left_align_text',
            iconPosition: 'right'
        },
        {
            label: 'Center',
            value: 'center',
            iconName: 'utility:center_align_text',
            iconPosition: 'right'
        },
        {
            label: 'Right',
            value: 'right',
            iconName: 'utility:right_align_text',
            iconPosition: 'right'
        }
    ];

    value = ['center'];
}

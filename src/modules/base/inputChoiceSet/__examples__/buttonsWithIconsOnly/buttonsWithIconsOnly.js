import { LightningElement } from 'lwc';

export default class InputChoiceSetButtonsWithIconsOnly extends LightningElement {
    optionsWithIconOnly = [
        {
            value: 'left',
            iconName: 'utility:left_align_text',
            iconPosition: 'right'
        },
        {
            value: 'center',
            iconName: 'utility:center_align_text',
            iconPosition: 'right'
        },
        {
            value: 'right',
            iconName: 'utility:right_align_text',
            iconPosition: 'right'
        }
    ];
    alignmentValue = ['center'];
}

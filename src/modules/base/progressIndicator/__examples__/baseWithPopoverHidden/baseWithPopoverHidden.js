import { LightningElement } from 'lwc';

export default class ProgressIndicatorBaseWithPopoverHidden extends LightningElement {
    baseStepsWithPopoverHidden = [
        {
            value: '1',
            label: '1',
            labelPosition: 'bottom',
            assistiveText: '1',
            popoverDescription: 'This is step #1',
            popoverHidden: 'true'
        },
        {
            value: '2',
            label: '2',
            labelPosition: 'bottom',
            assistiveText: '2',
            popoverDescription: 'This is step #2',
            popoverHidden: 'true'
        },
        {
            value: '3',
            label: '3',
            labelPosition: 'bottom',
            assistiveText: '3',
            popoverDescription: 'This is step #3',
            popoverHidden: 'true'
        },
        {
            value: '4',
            label: '4',
            labelPosition: 'bottom',
            popoverDescription: 'This is step #4',
            popoverHidden: 'true'
        },
        {
            value: '5',
            label: '5',
            labelPosition: 'bottom',
            popoverDescription: 'This is step #5',
            popoverHidden: 'true'
        }
    ];

    errorSteps = ['1'];
    warningSteps = ['5'];
    completedSteps = ['2', '3'];
    disabledSteps = [];
}

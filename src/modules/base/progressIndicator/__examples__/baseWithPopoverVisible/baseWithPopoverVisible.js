import { LightningElement } from 'lwc';

export default class ProgressIndicatorBaseWithPopoverVisible extends LightningElement {
    BaseStepsWithPopoverVisible = [
        {
            value: '1',
            label: '1',
            labelPosition: 'bottom',
            assistiveText: '1',
            popoverDescription: 'This is step 1',
            popoverSize: 'large'
        },
        {
            value: '2',
            label: '2',
            labelPosition: 'bottom',
            assistiveText: '2',
            popoverDescription: 'This is step 2',
            popoverSize: 'large',
            popoverRatio: '4-by-3'
        },
        {
            value: '3',
            label: '3',
            labelPosition: 'bottom',
            assistiveText: '3',
            popoverDescription: 'This is step 3',
            popoverSize: 'large',
            popoverRatio: '16-by-9'
        },
        {
            value: '4',
            label: '4',
            labelPosition: 'bottom',
            popoverDescription: 'Step 4'
        },
        {
            value: '5',
            label: '5',
            labelPosition: 'bottom',
            popoverDescription: 'Step 5',
            popoverRatio: '4-by-3'
        },
        {
            value: '6',
            label: '6',
            labelPosition: 'bottom',
            popoverDescription: 'Step 6',
            popoverRatio: '16-by-9'
        },
        {
            value: '7',
            label: '7',
            labelPosition: 'bottom',
            popoverDescription: '7',
            popoverSize: 'small'
        },
        {
            value: '8',
            label: '8',
            labelPosition: 'bottom',
            popoverDescription: '8',
            popoverSize: 'small',
            popoverRatio: '4-by-3'
        },
        {
            value: '9',
            label: '9',
            labelPosition: 'bottom',
            popoverDescription: '9',
            popoverSize: 'small',
            popoverRatio: '16-by-9'
        }
    ];

    errorSteps = ['1'];
    warningSteps = ['5'];
    completedSteps = ['2', '3'];
    disabledSteps = [];
}

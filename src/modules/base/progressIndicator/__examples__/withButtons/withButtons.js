import { LightningElement } from 'lwc';

export default class ProgressIndicatorWithButtons extends LightningElement {
    stepsWithButtons = [
        {
            value: '1',
            label: '1',
            labelPosition: 'top',
            assistiveText: '1',
            description: 'This is step #1',
            buttonLabel: 'Error',
            buttonVariant: 'destructive'
        },
        {
            value: '2',
            label: '2',
            labelPosition: 'top',
            assistiveText: '2',
            description: 'This is step #2',
            buttonLabel: 'Completed',
            buttonVariant: 'success'
        },
        {
            value: '3',
            label: '3',
            labelPosition: 'top',
            assistiveText: '3',
            description: 'This is step #3',
            buttonLabel: 'Completed',
            buttonVariant: 'success'
        },
        {
            value: '4',
            label: '4',
            labelPosition: 'top',
            assistiveText: '4',
            description: 'This is step #4',
            buttonLabel: 'Current',
            buttonVariant: 'brand'
        },
        {
            value: '5',
            label: '5',
            labelPosition: 'top',
            assistiveText: '5',
            description: 'This is step #5',
            buttonLabel: 'Warning',
            buttonVariant: 'destructive-text'
        }
    ];

    errorSteps = ['1'];
    warningSteps = ['5'];
    completedSteps = ['2', '3'];
    disabledSteps = ['3'];
}

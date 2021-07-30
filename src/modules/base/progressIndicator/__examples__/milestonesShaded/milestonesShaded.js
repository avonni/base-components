import { LightningElement } from 'lwc';

export default class ProgressIndicatorMilestonesShaded extends LightningElement {
    milestonesSteps = [
        {
            value: '1',
            label: 'Merger & Acquisition',
            labelPosition: 'bottom',
            popoverIconName: 'utility:merge',
            popoverIconNameWhenHover: 'utility:add',
            popoverSize: 'small',
            popoverVariant: 'button'
        },
        {
            value: '2',
            label: 'Expansion',
            labelPosition: 'bottom',
            popoverIconName: 'utility:rules',
            popoverIconNameWhenHover: 'utility:add',
            popoverSize: 'small',
            popoverVariant: 'button'
        },
        {
            value: '3',
            label: 'Executive Change',
            labelPosition: 'bottom',
            popoverIconName: 'utility:block_visitor',
            popoverIconNameWhenHover: 'utility:add',
            popoverSize: 'small',
            popoverVariant: 'button'
        },
        {
            value: '4',
            label: 'Market Listing',
            labelPosition: 'bottom',
            popoverIconName: 'utility:priority',
            popoverIconNameWhenHover: 'utility:add',
            popoverSize: 'small',
            popoverVariant: 'button'
        },
        {
            value: '5',
            label: 'Bankruptcy',
            labelPosition: 'bottom',
            popoverIconName: 'utility:error',
            popoverIconNameWhenHover: 'utility:add',
            popoverSize: 'small',
            popoverVariant: 'button'
        },
        {
            value: '6',
            label: 'New Product Launch',
            labelPosition: 'bottom',
            popoverIconName: 'utility:cases',
            popoverIconNameWhenHover: 'utility:add',
            popoverSize: 'small',
            popoverVariant: 'button'
        },
        {
            value: '7',
            label: 'New Partnership',
            labelPosition: 'bottom',
            popoverIconName: 'utility:change_record_type',
            popoverIconNameWhenHover: 'utility:add',
            popoverSize: 'small',
            popoverVariant: 'button'
        }
    ];

    errorSteps = [];
    warningSteps = [];
    completedSteps = ['1'];
    disabledSteps = [];
}

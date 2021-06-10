import { classSet } from 'c/utils';

const POSITION_ICON = {
    TOP: 'top',
    BOTTOM: 'bottom',
    RIGHT: 'right',
    LEFT: 'left'
};

export default class InputChoiceOption {
    constructor(option, value, index) {
        this.label = option.label;
        this.value = option.value;
        this.id = `checkbox-${index}`;
        this.isChecked = value.indexOf(option.value) !== -1;
        this.iconName = option.iconName;
        this.iconPosition = option.iconPosition;
    }

    get isIconTopLeft() {
        return (this.iconPosition === POSITION_ICON.TOP) || (this.iconPosition === POSITION_ICON.LEFT) || (!this.iconPosition || !this.iconName);
    }

    get isIconBottomRight(){
        return (this.iconPosition === POSITION_ICON.BOTTOM) || (this.iconPosition === POSITION_ICON.RIGHT);
    }

    get computedIconButtonClass(){
        return classSet('').add({
            'slds-align_absolute-center slds-m-top_x-small': (this.iconPosition === POSITION_ICON.TOP),
            'slds-align_absolute-center slds-m-bottom_x-small': (this.iconPosition === POSITION_ICON.BOTTOM),
            'slds-m-left_x-small': (this.iconPosition === POSITION_ICON.RIGHT),
            'slds-m-right_x-small': (this.iconPosition === POSITION_ICON.LEFT) || (!this.iconPosition),
        }).toString();
    }

    get computedLabelButtonClass(){
        return classSet('slds-checkbox_faux').add({
            'slds-align_absolute-center': (this.iconPosition === POSITION_ICON.TOP || this.iconPosition === POSITION_ICON.BOTTOM),
        }).toString();
    
    }

    get computedVariantButton(){
        return this.isChecked ? "inverse" : "base";
    }
}
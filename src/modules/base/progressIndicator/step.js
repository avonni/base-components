import { normalizeArray, normalizeBoolean } from 'c/utils';

export default class ProgressIndicatorStep {
    constructor(props) {
        this.assistiveText = props.assistiveText;
        this.buttonDisabled = normalizeBoolean(props.buttonDisabled);
        this.buttonLabel = props.buttonLabel;
        this.buttonIconName = props.buttonIconName;
        this.buttonIconPosition = props.buttonIconPosition;
        this.buttonName = props.buttonName;
        this.buttonVariant = props.buttonVariant;
        this.completedSteps = normalizeArray(props.completedSteps);
        this.currentStep = props.currentStep;
        this.description = props.description;
        this.descriptionPosition = props.descriptionPosition;
        this.disabledSteps = normalizeArray(props.disabledSteps);
        this.errorSteps = normalizeArray(props.errorSteps);
        this.label = props.label;
        this.labelPosition = props.labelPosition;
        this.popoverDescription = props.popoverDescription;
        this.popoverHidden = normalizeBoolean(props.popoverHidden);
        this.popoverIconName = props.popoverIconName;
        this.popoverIconSrc = props.popoverIconSrc;
        this.popoverIconNameWhenHover = props.popoverIconNameWhenHover;
        this.popoverIconSrcWhenHover = props.popoverIconSrcWhenHover;
        this.popoverLabel = props.popoverLabel;
        this.popoverRatio = props.popoverRatio;
        this.popoverSize = props.popoverSize;
        this.popoverVariant = props.popoverVariant;
        this.warningSteps = normalizeArray(props.warningSteps);
        this.value = props.value;
    }

    get isCompleted() {
        return this.completedSteps.includes(this.value);
    }

    get isCurrent() {
        return this.value === this.currentStep;
    }

    get isDisabled() {
        return this.disabledSteps.includes(this.value);
    }

    get isError() {
        return this.errorSteps.includes(this.value);
    }

    get isWarning() {
        return this.warningSteps.includes(this.value);
    }
}

import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    assert,
    getRealDOMId,
    classListMutation
} from 'c/utilsPrivate';
import { classSet, formatLabel } from 'c/utils';
import { FieldConstraintApi, InteractingState } from 'c/inputUtils';
import { handleKeyDownOnOption } from './keyboard';

const DEFAULT_MIN = 0;
const DEFAULT_ADD_BUTTON_ICON_NAME = 'utility:right';
const DEFAULT_DOWN_BUTTON_ICON_NAME = 'utility:down';
const DEFAULT_REMOVE_BUTTON_ICON_NAME = 'utility:left';
const DEFAULT_UP_BUTTON_ICON_NAME = 'utility:up';

const VALID_VARIANTS = {
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked'],
    default: 'standard'
};

const VALID_BUTTON_VARIANTS = {
    valid: [
        'bare',
        'container',
        'brand',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};

const VALID_BUTTON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const i18n = {
    optionLockAssistiveText: 'Option Lock AssistiveText',
    required: 'Required',
    requiredError: 'Value required',
    loadingText: 'Loading'
};

export default class DualListbox extends LightningElement {
    @api sourceLabel = 'sourceLabel';
    @api selectedLabel = 'selectedLabel';
    @api selectedPlaceholder;
    @api label = 'label';
    @api min = DEFAULT_MIN;
    @api max;
    @api name;
    @api addButtonIconName = DEFAULT_ADD_BUTTON_ICON_NAME;
    @api downButtonIconName = DEFAULT_DOWN_BUTTON_ICON_NAME;
    @api removeButtonIconName = DEFAULT_REMOVE_BUTTON_ICON_NAME;
    @api upButtonIconName = DEFAULT_UP_BUTTON_ICON_NAME;
    @api addButtonLabel;
    @api removeButtonLabel;
    @api upButtonLabel;
    @api downButtonLabel;

    _requiredOptions = [];
    _options = [];
    _buttonSize = VALID_BUTTON_SIZES.default;
    _buttonVariant = VALID_BUTTON_VARIANTS.default;
    _isLoading = false;
    _showActivityIndicator = false;
    _searchEngine = false;
    _variant = VALID_VARIANTS.default;
    _disabled;
    _disableReordering = false;
    _required = false;
    _size;

    _selectedValues = [];
    highlightedOptions = [];
    errorMessage = '';
    focusableInSource;
    focusableInSelected;
    isFocusOnList = false;
    searchResult = [];
    searchTerm;
    _upButtonDisabled = false;
    _downButtonDisabled = false;
    _oldIndex;

    connectedCallback() {
        this.classList.add('slds-form-element');
        this.updateClassList();
        this.keyboardInterface = this.selectKeyboardInterface();

        this._connected = true;
        this.addRequiredOptionsToValue();

        // debounceInteraction since DualListbox has multiple focusable elements
        this.interactingState = new InteractingState({
            debounceInteraction: true
        });
        this.interactingState.onenter(() => {
            this.dispatchEvent(new CustomEvent('focus'));
        });
        this.interactingState.onleave(() => {
            this.showHelpMessageIfInvalid();
            this.dispatchEvent(new CustomEvent('blur'));

            // reset the optionToFocus otherwise dualListbox will steal the focus any time it's rerendered.
            this.optionToFocus = null;
        });
        this.hasAvatar();
    }

    renderedCallback() {
        this.assertRequiredAttributes();
        if (this.disabled) {
            this._upButtonDisabled = true;
            this._downButtonDisabled = true;
            return;
        }

        if (this.optionToFocus) {
            // value could have an apostrophe, which is why we need to escape it otherwise the queryselector will not work
            const option = this.template.querySelector(
                `div[data-value='${this.optionToFocus}']`
            );
            if (option) {
                this.isFocusOnList = true;
                option.focus();
            }
        }
        this.disabledButtons();
    }

    @api
    get options() {
        return this._options;
    }

    set options(value) {
        this._options = Array.isArray(value)
            ? JSON.parse(JSON.stringify(value))
            : [];
    }
    @api messageWhenValueMissing = i18n.requiredError;

    @api
    get messageWhenRangeOverflow() {
        return this._messageWhenRangeOverflow;
    }

    set messageWhenRangeOverflow(message) {
        this._messageWhenRangeOverflow = message;
    }

    @api
    get messageWhenRangeUnderflow() {
        return this._messageWhenRangeUnderflow;
    }

    set messageWhenRangeUnderflow(message) {
        this._messageWhenRangeUnderflow = message;
    }

    @api
    get disabled() {
        return this._disabled || false;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get isLoading() {
        return this._isLoading || false;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    @api
    get searchEngine() {
        return this._searchEngine;
    }

    set searchEngine(value) {
        this._searchEngine = normalizeBoolean(value);
    }

    @api
    get value() {
        return this._selectedValues;
    }

    set value(newValue) {
        this.updateHighlightedOptions(newValue);
        this._selectedValues = newValue || [];
        if (this._connected) {
            this.addRequiredOptionsToValue();
        }
    }

    @api
    get requiredOptions() {
        return this._requiredOptions;
    }

    set requiredOptions(newValue) {
        this._requiredOptions = Array.isArray(newValue)
            ? JSON.parse(JSON.stringify(newValue))
            : [];
        if (this._connected) {
            this.addRequiredOptionsToValue();
        }
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VALID_VARIANTS.default,
            validValues: VALID_VARIANTS.valid
        });
    }

    @api
    get buttonSize() {
        return this._buttonSize;
    }

    set buttonSize(size) {
        this._buttonSize = normalizeString(size, {
            fallbackValue: VALID_BUTTON_SIZES.default,
            validValues: VALID_BUTTON_SIZES.valid
        });
    }

    @api
    get buttonVariant() {
        return this._buttonVariant;
    }

    set buttonVariant(variant) {
        this._buttonVariant = normalizeString(variant, {
            fallbackValue: VALID_BUTTON_VARIANTS.default,
            validValues: VALID_BUTTON_VARIANTS.valid
        });
    }

    set size(value) {
        this._size = value;
    }

    @api
    get size() {
        return this._size;
    }

    @api fieldLevelHelp;

    set disableReordering(value) {
        this._disableReordering = normalizeBoolean(value);
    }

    @api
    get disableReordering() {
        return this._disableReordering;
    }

    @api
    get showActivityIndicator() {
        return this._showActivityIndicator;
    }

    set showActivityIndicator(value) {
        this._showActivityIndicator = normalizeBoolean(value);
    }

    @api
    focus() {
        const firstOption = this.template.querySelector(`div[data-index='0']`);
        if (firstOption) {
            firstOption.focus();
            this.updateSelectedOptions(firstOption, true, false);
        }
    }

    get validity() {
        return this._constraint.validity;
    }

    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.errorMessage = message;
        });
    }

    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    hasAvatar() {
        if (this._options) {
            this._options.forEach((option) => {
                if (option.iconName || option.src || option.initials) {
                    option.hasAvatar = true;
                } else option.hasAvatar = false;
            });
        }
    }

    updateClassList() {
        classListMutation(this.classList, {
            'slds-form-element_stacked': this.variant === 'label-stacked',
            'slds-form-element_horizontal': this.variant === 'label-inline'
        });
    }

    get computedUniqueId() {
        return this.uniqueId;
    }

    get computedSourceListId() {
        return getRealDOMId(this.template.querySelector('[data-source-list]'));
    }

    get computedSelectedListId() {
        return getRealDOMId(
            this.template.querySelector('[data-selected-list]')
        );
    }

    get ariaDisabled() {
        return String(this.disabled);
    }

    get computedSourceList() {
        let sourceListOptions = [];
        if (this.options) {
            const required = this.requiredOptions;
            const values = this.value;
            sourceListOptions = this.options.filter(
                (option) =>
                    values.indexOf(option.value) === -1 &&
                    required.indexOf(option.value) === -1
            );
        }

        return this.computeListOptions(
            sourceListOptions,
            this.focusableInSource
        );
    }

    get computedSelectedList() {
        const selectedListOptions = [];
        if (this.options) {
            const optionsMap = {};
            this.options.forEach((option) => {
                optionsMap[option.value] = { ...option };
            });
            this.value.forEach((optionValue) => {
                const option = optionsMap[optionValue];
                if (option) {
                    option.isSelected = true;
                }
            });
            this.requiredOptions.forEach((optionValue) => {
                const option = optionsMap[optionValue];
                if (option) {
                    option.isLocked = true;
                }
            });

            // add selected items in the given order
            this.value.forEach((optionValue) => {
                const option = optionsMap[optionValue];
                if (option) {
                    selectedListOptions.push(option);
                }
            });
        }

        return this.computeListOptions(
            selectedListOptions,
            this.focusableInSelected
        );
    }

    computeListOptions(options, focusableOptionValue) {
        if (options.length > 0) {
            const focusableOption = options.find((option) => {
                return option.value === focusableOptionValue;
            });

            const focusableValue = focusableOption
                ? focusableOption.value
                : options[0].value;
            return options.map((option) => {
                return this.computeOptionProperties(option, focusableValue);
            });
        }

        return [];
    }

    computeOptionProperties(option, focusableValue) {
        const isSelected = this.highlightedOptions.indexOf(option.value) > -1;
        const classList = classSet(
            'slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_center slds-media_inline'
        )
            .add({ 'slds-is-selected': isSelected })
            .toString();

        return {
            ...option,
            tabIndex: option.value === focusableValue ? '0' : '-1',
            selected: isSelected ? 'true' : 'false',
            classList
        };
    }

    get computedLeftColumnClass() {
        return classSet(
            'slds-dueling-list__column slds-dueling-list__column_responsive'
        )
            .add({
                'slds-is-relative': this.showActivityIndicator
            })
            .toString();
    }

    get computedColumnStyleSource() {
        if (this.isNumber(this.size)) {
            if (this.searchEngine) {
                const newHeight = parseInt(this.size, 10) * 2.75 + 1 - 3.5;
                return `height:${newHeight}rem`;
            }
            const newHeight = parseInt(this.size, 10) * 2.75 + 1;
            return `height:${newHeight}rem`;
        } else if (this.searchEngine) {
            return `height: 10.6rem`;
        }
        return 'height: 14rem';
    }

    get computedColumnStyle() {
        if (this.isNumber(this.size)) {
            const newHeight = parseInt(this.size, 10) * 2.75 + 1;
            return `height:${newHeight}rem`;
        }
        return 'height: 14rem';
    }

    get isLabelHidden() {
        return this.variant === 'label-hidden';
    }

    get isSelectedBoxEmpty() {
        return this._selectedValues.length === 0;
    }

    get computedGroupLabelClass() {
        return classSet('slds-form-element__label slds-form-element__legend')
            .add({ 'slds-assistive-text': this.isLabelHidden })
            .toString();
    }

    get computedListboxContainerClass() {
        return classSet(
            'slds-dueling-list__options avonni-dual-listbox-option-is-selected'
        )
            .add({ 'slds-is-disabled': this.disabled })
            .add({
                'slds-is-relative': this.isLoading
            })
            .toString();
    }

    get computedListboxSelectedContainerClass() {
        return classSet(
            'slds-dueling-list__options avonni-dual-listbox-option-is-selected'
        )
            .add({ 'slds-is-disabled': this.disabled })
            .add({
                'avonni-dual-listbox-selected-list-with-search': this
                    .searchEngine
            })
            .add({
                'avonni-dual-listbox-empty-column': this.isSelectedBoxEmpty
            })
            .toString();
    }

    get computedSearchEngineClass() {
        return classSet('slds-form-element slds-p-around_small')
            .add({
                'avonni-dual-listbox-search-engine-padding-around_x-small':
                    this.variant === 'label-inline' ||
                    this.variant === 'label-stacked'
            })
            .toString();
    }

    get computedLockAssistiveText() {
        return formatLabel(
            this.i18n.optionLockAssistiveText,
            this.selectedLabel
        );
    }

    get i18n() {
        return i18n;
    }

    get moveButtonsDisabled() {
        return this.disabled || this.showActivityIndicator;
    }

    handleOptionClick(event) {
        this.interactingState.interacting();
        if (this.disabled) {
            return;
        }
        const selectMultiple = event.metaKey || event.ctrlKey || event.shiftKey;
        const option = event.currentTarget;
        if (event.shiftKey) {
            this.selectAllFromLastSelectedToOption(option, false);
            return;
        }
        const selected =
            selectMultiple && option.getAttribute('aria-selected') === 'true';
        this.updateSelectedOptions(option, !selected, selectMultiple);
        this.shiftIndex = -1;
    }

    handleFocus(event) {
        this.interactingState.enter();

        // select the focused option if entering a listbox
        const element = event.target;
        if (element.role === 'option') {
            if (!this.isFocusOnList) {
                this.isFocusOnList = true;
                this.updateSelectedOptions(element, true, false);
            }
        }
    }

    handleBlur(event) {
        this.interactingState.leave();

        const element = event.target;
        if (element.role !== 'option') {
            this.isFocusOnList = false;
        }
    }

    handleRightButtonClick() {
        this.interactingState.interacting();
        this.moveOptionsBetweenLists(true, true);
        this.handleSearch();
    }

    handleLeftButtonClick() {
        this.interactingState.interacting();
        this.moveOptionsBetweenLists(false, true);
        this.handleSearch();
    }

    handleUpButtonClick() {
        this.interactingState.interacting();
        this.changeOrderOfOptionsInList(true);
    }

    handleDownButtonClick() {
        this.interactingState.interacting();
        this.changeOrderOfOptionsInList(false);
    }

    handleOptionKeyDown(event) {
        this.interactingState.interacting();
        if (this.disabled) {
            return;
        }
        handleKeyDownOnOption(event, this.keyboardInterface);
    }

    moveOptionsBetweenLists(addToSelect, retainFocus) {
        const isValidList = addToSelect
            ? this.selectedList === this.computedSourceListId
            : this.selectedList === this.computedSelectedListId;
        if (!isValidList) {
            return;
        }
        const toMove = this.highlightedOptions;
        const values = this.computedSelectedList.map((option) => option.value);
        const required = this.requiredOptions;
        let newValues = [];
        if (addToSelect) {
            newValues = values.concat(toMove);
        } else {
            newValues = values.filter(
                (value) =>
                    toMove.indexOf(value) === -1 || required.indexOf(value) > -1
            );
        }

        const oldSelectedValues = this._selectedValues;
        this._selectedValues = newValues;
        const invalidMove =
            this.validity.valueMissing ||
            (this.validity.rangeOverflow &&
                this.selectedList === this.computedSourceListId) ||
            (this.validity.rangeUnderflow &&
                this.selectedList === this.computedSelectedListId);

        if (invalidMove || toMove.length === 0) {
            this.showHelpMessageIfInvalid();
            this._selectedValues = oldSelectedValues;
            return;
        }

        if (retainFocus) {
            const listId = addToSelect
                ? this.computedSelectedListId
                : this.computedSourceListId;
            if (listId.includes('source')) {
                if (this.computedSelectedList.length > 0) {
                    this.updateFocusableOption(
                        this.computedSourceListId,
                        this.computedSelectedList[this._oldIndex].value
                    );
                } else this.updateFocusableOption(listId, toMove[0]);
            } else {
                if (this.computedSourceList.length > 0) {
                    this.updateFocusableOption(
                        this.computedSelectedListId,
                        this.computedSourceList[this._oldIndex].value
                    );
                } else this.updateFocusableOption(listId, toMove[0]);
            }
        } else {
            this.interactingState.leave();
            this.isFocusOnList = false;
            this.highlightedOptions = [];
            this.optionToFocus = null;
        }

        this.dispatchChangeEvent(newValues);
        this.highlightedOptions.find((option) => {
            return this._selectedValues.indexOf(option);
        });
    }

    oldIndexValue(option) {
        const options = this.template.querySelector(
            `div[data-value='${option}']`
        );
        const index = options.getAttribute('data-index');
        if (index === '0') {
            this._oldIndex = 0;
        } else this._oldIndex = index - 1;
    }

    changeOrderOfOptionsInList(moveUp) {
        const elementList = this.getElementsOfList(this.selectedList);
        const values = this.computedSelectedList.map((option) => option.value);
        const toMove = values.filter(
            (option) => this.highlightedOptions.indexOf(option) > -1
        );
        const validSelection =
            toMove.length === 0 ||
            this.selectedList !== this.computedSelectedListId;
        if (validSelection) {
            return;
        }
        let start = moveUp ? 0 : toMove.length - 1;
        let index = values.indexOf(toMove[start]);
        const validMove =
            (moveUp && index === 0) || (!moveUp && index === values.length - 1);
        if (validMove) {
            return;
        }

        if (moveUp) {
            while (start < toMove.length) {
                index = values.indexOf(toMove[start]);
                this.swapOptions(index, index - 1, values, elementList);
                start++;
                console.log(index);
            }
        } else {
            while (start > -1) {
                index = values.indexOf(toMove[start]);
                this.swapOptions(index, index + 1, values, elementList);
                start--;
            }
        }

        this._selectedValues = values;
        this.updateFocusableOption(this.selectedList, toMove[0]);
        this.optionToFocus = null;
        this.dispatchChangeEvent(values);
    }

    disabledButtons() {
        const selectedLength = this._selectedValues.length - 1;
        if (this.disabled) {
            this._upButtonDisabled = true;
            this._downButtonDisabled = true;
        }

        this._upButtonDisabled = this.highlightedOptions.find((option) => {
            return this._selectedValues.indexOf(option) === 0;
        });

        this._downButtonDisabled = this.highlightedOptions.find((option) => {
            return this._selectedValues.indexOf(option) === selectedLength;
        });
    }

    selectAllFromLastSelectedToOption(option, all) {
        const listId = option.getAttribute('data-type');
        this.updateCurrentSelectedList(listId, true);
        const options = this.getElementsOfList(listId);
        const end = all ? 0 : this.getOptionIndex(option);
        this.lastSelected = this.lastSelected < 0 ? end : this.lastSelected;
        const start = all ? options.length : this.lastSelected;
        let val, select;
        this.highlightedOptions = [];
        for (let i = 0; i < options.length; i++) {
            select = (i - start) * (i - end) <= 0;
            if (select) {
                val = options[i].getAttribute('data-value');
                this.highlightedOptions.push(val);
            }
        }
    }

    updateSelectedOptions(option, select, isMultiple) {
        const value = option.getAttribute('data-value');
        const listId = this.getListId(option);
        const optionIndex = this.getOptionIndex(option);
        this.updateCurrentSelectedList(listId, isMultiple);
        if (select) {
            if (this.highlightedOptions.indexOf(value) === -1) {
                this.highlightedOptions.push(value);
            }
        } else {
            this.highlightedOptions.splice(
                this.highlightedOptions.indexOf(value),
                1
            );
        }

        this.updateFocusableOption(listId, value);

        this.lastSelected = optionIndex;
        this.oldIndexValue(this.highlightedOptions);
    }

    addRequiredOptionsToValue() {
        if (
            !this.options ||
            !this.options.length ||
            !this._requiredOptions ||
            !this._requiredOptions.length
        ) {
            // no options/requiredOptions, just ignore
            return;
        }

        const numOfSelectedValues = this._selectedValues.length;
        const allValues = this.options.map((option) => option.value);

        const requiredValues = this._requiredOptions.filter((option) =>
            allValues.includes(option)
        );

        // add required options to the selected values as they are already displayed in the selected list
        this._selectedValues = [
            ...new Set([...requiredValues, ...this._selectedValues])
        ];

        if (numOfSelectedValues !== this._selectedValues.length) {
            // value was changed
            this.dispatchChangeEvent(this._selectedValues);
        }
    }

    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled &&
                    this.required &&
                    this.computedSelectedList.length < 1,
                rangeUnderflow: () =>
                    this.computedSelectedList.length < this.min,
                rangeOverflow: () => this.computedSelectedList.length > this.max
            });
        }
        return this._constraintApi;
    }

    updateCurrentSelectedList(currentList, isMultiple) {
        if (this.selectedList !== currentList || !isMultiple) {
            if (this.selectedList) {
                this.highlightedOptions = [];
                this.lastSelected = -1;
            }
            this.selectedList = currentList;
        }
    }

    dispatchChangeEvent(values) {
        // the change event needs to propagate to elements outside of the light-DOM, hence making it composed.
        this.dispatchEvent(
            new CustomEvent('change', {
                composed: true,
                bubbles: true,
                detail: { value: values }
            })
        );
    }

    assertRequiredAttributes() {
        assert(
            !!this.label,
            `<avonni-dual-listbox> Missing required "label" attribute.`
        );
        assert(
            !!this.sourceLabel,
            `<avonni-dual-listbox> Missing required "sourceLabel" attribute.`
        );
        assert(
            !!this.selectedLabel,
            `<avonni-dual-listbox> Missing required "selectedLabel" attribute.`
        );
        assert(
            !!this.options,
            `<avonni-dual-listbox> Missing required "options" attribute.`
        );
    }

    swapOptions(i, j, array) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    getElementsOfList(listId) {
        const elements = this.template.querySelectorAll(
            `div[data-type='${listId}']`
        );
        return elements ? elements : [];
    }

    selectKeyboardInterface() {
        const that = this;
        that.shiftIndex = -1;
        that.lastShift = null;
        return {
            getShiftIndex() {
                return that.shiftIndex;
            },
            setShiftIndex(value) {
                that.shiftIndex = value;
            },
            getLastShift() {
                return that.lastShift;
            },
            setLastShift(value) {
                that.lastShift = value;
            },
            getElementsOfList(listId) {
                return that.getElementsOfList(listId);
            },
            selectAllOptions(option) {
                that.selectAllFromLastSelectedToOption(option, true);
            },
            updateSelectedOptions(option, select, isMultiple) {
                that.updateSelectedOptions(option, select, isMultiple);
            },
            moveOptionsBetweenLists(addToSelect) {
                that.moveOptionsBetweenLists(addToSelect, true);
            }
        };
    }

    getOptionIndex(optionElement) {
        return parseInt(optionElement.getAttribute('data-index'), 10);
    }

    getListId(optionElement) {
        return getRealDOMId(optionElement.parentElement.parentElement);
    }

    updateFocusableOption(listId, value) {
        if (listId === this.computedSourceListId) {
            this.focusableInSource = value;
        } else if (listId === this.computedSelectedListId) {
            this.focusableInSelected = value;
        }
        this.optionToFocus = value;
    }

    isNumber(value) {
        return value !== '' && value !== null && isFinite(value);
    }

    updateHighlightedOptions(newValue) {
        let isSame = false;
        if (
            newValue &&
            newValue.length &&
            this._selectedValues &&
            this._selectedValues.length
        ) {
            isSame =
                newValue.length === this._selectedValues.length &&
                newValue.every((option) =>
                    this._selectedValues.includes(option)
                );
        }
        if (!isSame) {
            this.highlightedOptions = [];
        }
    }

    handleSearch() {
        window.clearTimeout(this.delayTimeout);
        this.searchTerm = this.template
            .querySelector('lightning-input')
            .value.toLowerCase();
        if (this.searchTerm !== '') {
            this._isLoading = true;
            this.delayTimeout = setTimeout(() => {
                this.searchResult = this.computedSourceList.filter((option) => {
                    return option.label.toLowerCase().includes(this.searchTerm);
                });
                this._isLoading = false;
            }, 300);
        } else this.searchResult = this.computedSourceList;
    }

    get hasResult() {
        if (this.searchResult.length >= 0 && this.searchTerm) {
            return this.searchResult;
        }
        return this.computedSourceList;
    }
}

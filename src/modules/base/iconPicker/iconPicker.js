import { AutoPosition, Direction } from 'c/positionLibrary';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { keyValues } from 'c/utilsPrivate';
import { LightningElement, api, track } from 'lwc';
import { ICON_TYPES } from './icons/salesforceIcons';

const DEFAULT_BAD_INPUT_MESSAGE = 'Please ensure the value is correct.';
const DEFAULT_CANCEL_BUTTON_LABEL = 'Cancel';
const DEFAULT_CLEAR_BUTTON_ALTERNATIVE_TEXT = 'Clear';
const DEFAULT_DONE_BUTTON_LABEL = 'Done';
const DEFAULT_REQUIRED_ALTERNATIVE_TEXT = 'Required';
const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Type icon name to search';

const MENU_ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const MENU_VARIANTS = {
    valid: [
        'bare',
        'container',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};
const NB_VISIBLE_TABS = 2;

const TABS = {
    valid: ['Standard', 'Custom', 'Utility', 'Doctype', 'Action'],
    default: 'Standard'
};

const VARIANTS = {
    valid: ['standard', 'label-inline', 'label-hidden', 'label-stacked'],
    default: 'standard'
};

/**
 * @class
 * @description Icon picker for Salesforce Lightning Design System's icons.
 * @descriptor avonni-icon-picker
 * @storyId example-icon-picker--standard
 * @public
 */
export default class IconPicker extends LightningElement {
    /**
     * Specifies a shortcut key to activate or focus an element.
     *
     * @type {string}
     * @public
     */
    @api accessKey;
    /**
     * Text label for the cancel button.
     *
     * @type {string}
     * @public
     * @default 'Cancel'
     */
    @api cancelButtonLabel = DEFAULT_CANCEL_BUTTON_LABEL;
    /**
     * Alternative text for the clear button.
     *
     * @type {string}
     * @public
     * @default 'Clear'
     */
    @api clearButtonAlternativeText = DEFAULT_CLEAR_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Text label for the done button.
     *
     * @type {string}
     * @public
     * @default 'Done'
     */
    @api doneButtonLabel = DEFAULT_DONE_BUTTON_LABEL;
    /**
     * Help text detailing the purpose and function of the input.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Text label for the input.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Optional text to be shown on the button.
     *
     * @type {string}
     * @public
     */
    @api menuLabel;
    /**
     * Specifies the name of an input element.
     *
     * @type {string}
     * @public
     */
    @api name;
    /**
     * Text that is displayed when the field is empty, to prompt the user for a valid entry.
     *
     * @type {string}
     * @public
     */
    @api placeholder;
    /**
     * The assistive text when the required attribute is set to true.
     *
     * @type {string}
     * @public
     * @default 'Required'
     */
    @api requiredAlternativeText = DEFAULT_REQUIRED_ALTERNATIVE_TEXT;
    /**
     * Text that is displayed in the search input when the input is empty.
     *
     * @type {string}
     * @public
     */
    @api searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;

    _disabled = false;
    _hiddenCategories = [];
    _hideClearIcon = false;
    _hideFooter = false;
    _hideInputText = false;
    _menuIconSize = MENU_ICON_SIZES.default;
    _menuVariant = MENU_VARIANTS.default;
    _messageWhenBadInput = DEFAULT_BAD_INPUT_MESSAGE;
    _readOnly = false;
    _required = false;
    _value;
    _variant = VARIANTS.default;

    iconMenuOpened = false;
    isInvalidInput = false;
    hideTabs = false;
    newValue;
    showError = false;
    _allowBlur = false;
    _autoPosition;
    _menuIsFocused = false;

    @track tabContent;
    currentTab = TABS.default;

    renderedCallback() {
        this.initIconInput();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the input field is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * The icon categories that will be hidden by default.
     *
     * @type {string[]}
     * @public
     */
    @api
    get hiddenCategories() {
        return this._hiddenCategories;
    }
    set hiddenCategories(value) {
        this._hiddenCategories = [];
        const categories = deepCopy(normalizeArray(value));
        for (const category of TABS.valid) {
            if (categories.includes(category)) {
                this._hiddenCategories.push(category);
            }
        }
        if (this._hiddenCategories.length === 5) {
            let index = this._hiddenCategories.indexOf(TABS.default);
            if (index !== -1) {
                this._hiddenCategories.splice(index, 1);
            }
        }
    }

    /**
     * If present, it is not possible to clear a selected option using the input clear icon.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideClearIcon() {
        return this._hideClearIcon;
    }
    set hideClearIcon(value) {
        this._hideClearIcon = normalizeBoolean(value);
    }

    /**
     * If present, the dropdown footer is hidden.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideFooter() {
        return this._hideFooter;
    }
    set hideFooter(value) {
        this._hideFooter = normalizeBoolean(value);
    }

    /**
     * If present, the input text next to the icon button is hidden.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideInputText() {
        return this._hideInputText;
    }
    set hideInputText(value) {
        this._hideInputText = normalizeBoolean(value);
    }

    /**
     * The size of the icon.
     * Options include xx-small, x-small, small, medium, or large.
     *
     * @type {string}
     * @default medium
     * @public
     */
    @api
    get menuIconSize() {
        return this._menuIconSize;
    }
    set menuIconSize(size) {
        this._menuIconSize = normalizeString(size, {
            fallbackValue: MENU_ICON_SIZES.default,
            validValues: MENU_ICON_SIZES.valid
        });
    }

    /**
     * The variant changes the look of the button.
     * Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse.
     * This value defaults to border.
     *
     * @type {string}
     * @default border
     * @public
     */
    @api
    get menuVariant() {
        return this._menuVariant;
    }
    set menuVariant(variant) {
        this._menuVariant = normalizeString(variant, {
            fallbackValue: MENU_VARIANTS.default,
            validValues: MENU_VARIANTS.valid
        });
    }

    /**
     * Error message to be displayed when a bad input is detected.
     *
     * @type {string}
     * @public
     */
    @api
    get messageWhenBadInput() {
        return this._messageWhenBadInput;
    }
    set messageWhenBadInput(value) {
        this._messageWhenBadInput =
            typeof value === 'string' ? value : DEFAULT_BAD_INPUT_MESSAGE;
    }

    /**
     * If present, the input field is read-only and cannot be edited by users.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * If present, the input field must be filled out before the form is submitted.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * The Lightning Design System name of the selected icon. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    /**
     * The variant changes the appearance of an input field.
     * Accepted variants include standard, label-inline, label-hidden, and label-stacked.
     * This value defaults to standard, which displays the label above the field.
     * Use label-hidden to hide the label but make it available to assistive technology.
     * Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.
     *
     * @type {string}
     * @default standard
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Whether the clear button in the input is visible.
     *
     * @type {boolean}
     */
    get allowClearInput() {
        return this.value && !this.disabled && !this.hideClearIcon;
    }

    /**
     * The tabs of the icon picker.
     * Hidden tabs are not displayed.
     *
     * @type {string[]}
     */
    get allTabs() {
        let orderedTabs = [];
        TABS.valid.forEach((tab) => {
            if (!this.hiddenCategories.includes(tab)) {
                orderedTabs.push(tab);
            }
        });
        return [...orderedTabs];
    }

    /**
     * Return a true string if the dropdown is visible and a false string if not.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return String(this.iconMenuOpened);
    }

    /**
     * Computed Aria Label for button.
     *
     * @type {string}
     */
    get computedAriaLabel() {
        return this.menuLabel || 'Choose an icon';
    }

    /**
     * Computed CSS class for the layout.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet()
            .add({
                'slds-form-element_stacked': this.variant === 'label-stacked',
                'slds-p-left_none': this.variant === 'label-stacked',
                'avonni-builder-icon-picker-label-inline':
                    this.variant === 'label-inline'
            })
            .toString();
    }

    /**
     * Computed CSS classes for the menu button.
     *
     * @type {string}
     */
    get computedButtonClass() {
        const isBare =
            this.menuVariant === 'bare' || this.menuVariant === 'bare-inverse';

        const classes = classSet('slds-button').add({
            // Over-writes button border-radius to an input border-radius.
            'slds-color-picker__summary-button': !this.hideInputText
        });

        const useMoreContainer =
            this.menuVariant === 'container' ||
            this.menuVariant === 'bare-inverse' ||
            this.menuVariant === 'border-inverse';

        if (this.menuLabel) {
            classes.add({
                'slds-p-horizontal_xx-small': true,
                'slds-button_neutral': this.menuVariant === 'border',
                'slds-button_inverse': this.menuVariant === 'border-inverse',
                'avonni-icon-picker__toggle-button_size-limit': true
            });
        } else {
            classes.add({
                'slds-button_icon': true,
                'slds-button_icon-bare': isBare,
                'slds-button_icon-more': !useMoreContainer,
                'slds-button_icon-container-more': useMoreContainer,
                'slds-button_icon-border-filled':
                    this.menuVariant === 'border-filled',
                'slds-button_icon-border-inverse':
                    this.menuVariant === 'border-inverse',
                'slds-button_icon-inverse': this.menuVariant === 'bare-inverse',
                'slds-button_icon-x-small':
                    this.menuIconSize === 'xx-small' && !isBare,
                'slds-button_icon-small':
                    (this.menuIconSize === 'x-small' ||
                        this.menuIconSize === 'small') &&
                    !isBare,
                'slds-button_icon-large':
                    this.menuIconSize === 'large' && !isBare
            });
        }

        if (this.readOnly) {
            classes.add('avonni-builder-icon-picker-read-only-cursor');
        }

        return classes.toString();
    }

    /**
     * Computed CSS classes for the selected icon in the menu button.
     *
     * @type {string}
     */
    get computedIconClass() {
        const classes = classSet();
        if (!this.value.split(':')[0] === 'action') {
            classes.add({
                'avonni-builder-icon-picker-x-small-icon-padding':
                    this.menuIconSize === 'x-small',
                'avonni-builder-icon-picker-small-icon-padding':
                    this.menuIconSize === 'small' ||
                    this.menuIconSize === 'large'
            });
        }

        return classes.toString();
    }

    /**
     * Computed CSS classes for the button icon container.
     * Adds a scaling class if icon is of type "action".
     *
     * @type {string}
     */
    get computedIconContainerClass() {
        const classes = classSet(
            'slds-icon_container avonni-icon-picker__icon'
        );
        if (this.value && this.value.split(':')[0] === 'action') {
            classes.add({
                'avonni-icon-picker__action-icon_small-scaling':
                    this.menuIconSize === 'xx-small',
                'avonni-icon-picker__action-icon_medium-scaling':
                    this.menuIconSize === 'x-small' ||
                    this.menuIconSize === 'small' ||
                    this.menuIconSize === 'medium',
                'avonni-icon-picker__action-icon_large-scaling':
                    this.menuIconSize === 'large'
            });
        }
        return classes.toString();
    }

    /**
     * Computed CSS class for the input wrapper.
     *
     * @type {string}
     */
    get computedInputClass() {
        return classSet('slds-form-element__control')
            .add({
                'slds-input-has-icon slds-input-has-icon_right':
                    !this.hideClearIcon && !this.disabled
            })
            .toString();
    }

    /**
     * Computed CSS classes for the label.
     *
     * @type {string}
     */
    get computedLegendClass() {
        return classSet(
            'slds-form-element__label avonni-icon-picker__label slds-no-flex'
        )
            .add({
                'slds-assistive-text': this.variant === 'label-hidden'
            })
            .toString();
    }

    /**
     * The value of the input field.
     *
     * @type {string}
     */
    get computedValue() {
        return typeof this.value === 'string' ? this.value : '';
    }

    /**
     * The tab displayed when opening the menu.
     * If an icon is already selected, the default tab will be the category of this icon.
     * Otherwise, the default tab will be the first visible tab.
     *
     * @type {string}
     */
    get defaultTab() {
        if (!this.value) return this.allTabs[0];

        const rawTab = this.value.split(':')[0];
        const tab = rawTab.charAt(0).toUpperCase() + rawTab.slice(1);
        return TABS.valid.includes(tab) ? tab : this.allTabs[0];
    }

    /**
     * The size of the empty icon in the menu button.
     *
     * @type {string}
     */
    get emptyIconSize() {
        switch (this.menuIconSize) {
            case MENU_ICON_SIZES.valid[0]:
                return '14px';
            case MENU_ICON_SIZES.valid[1]:
                return '14px';
            case MENU_ICON_SIZES.valid[2]:
                return '16px';
            case MENU_ICON_SIZES.valid[3]:
                return '20px';
            case MENU_ICON_SIZES.valid[4]:
                return '26px';
            default:
                return null;
        }
    }

    /**
     * The size of the selected icon in the menu button.
     *
     * @type {string}
     */
    get iconSize() {
        switch (this.menuIconSize) {
            case MENU_ICON_SIZES.valid[0]:
                return MENU_ICON_SIZES.valid[0];
            case MENU_ICON_SIZES.valid[1]:
                return MENU_ICON_SIZES.valid[0];
            case MENU_ICON_SIZES.valid[2]:
                return MENU_ICON_SIZES.valid[1];
            case MENU_ICON_SIZES.valid[3]:
                return MENU_ICON_SIZES.valid[2];
            case MENU_ICON_SIZES.valid[4]:
                return MENU_ICON_SIZES.valid[2];
            default:
                return null;
        }
    }

    /**
     * The number of hidden tabs
     *
     * @type {number}
     */
    get nbHiddenCategories() {
        return Math.max(
            0,
            TABS.valid.length - NB_VISIBLE_TABS - this.hiddenCategories.length
        );
    }

    /**
     * Whether the icon input is read only.
     *
     * @type {boolean}
     */
    get readOnlyInput() {
        return this.readOnly && !this.hideInputText;
    }

    /**
     * Whether the empty icon is visible.
     * The empty icon appears when no icon is selected.
     *
     * @type {boolean}
     */
    get showEmptyIcon() {
        return this.isInvalidInput || !this.value;
    }

    /**
     * Whether the icon input is visible.
     *
     * @type {boolean}
     */
    get showInputText() {
        return !this.hideInputText && !this.readOnly;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Remove focus from the input element.
     *
     * @public
     */
    @api
    blur() {
        const activeElement = this.template.activeElement;
        if (activeElement) activeElement.blur();
    }

    /**
     * Sets focus on the input element.
     *
     * @public
     */
    @api
    focus() {
        if (this.iconMenuOpened) {
            // Set the focus on the dropdown
            const searchInput = this.template.querySelector(
                '[data-element-id="lightning-input"]'
            );
            if (searchInput) {
                searchInput.focus();
            }
        } else {
            // Set the focus on the button menu
            const input = this.template.querySelector(
                '[data-element-id="input"]'
            );
            if (input) {
                input.focus();
            }
        }
    }

    /**
     * Display the error messages and return false if the input is invalid.
     * If the input is valid, reportValidity() clears displayed error messages and returns true.
     *
     * @type {boolean}
     * @public
     */
    @api
    reportValidity() {
        this.showError = this.value ? this.isInvalidInput : this.required;
        return !!this.showError;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Changes the visible icons according to the current tab.
     */
    changeTabContentTo(tabName) {
        this.tabContent.forEach((tab) => {
            tab.showIcons = tab.title === tabName;

            // Load the extended icons only after render
            if (tab.title === tabName) {
                requestAnimationFrame(() => {
                    tab.showIconsExtended = true;
                });
            } else {
                tab.showIconsExtended = false;
            }
        });
    }

    /**
     * Clears the current icon input.
     */
    clearIconInput() {
        this.template.querySelector('[data-element-id="input"]').value = null;
        this._value = null;
        this._dispatchChange(null);
        this.reportValidity();
    }

    /**
     * Hides all extended icons.
     */
    hideExtendedIcons() {
        this.tabContent.forEach((tab) => {
            tab.showIconsExtended = false;
        });
    }

    /**
     * Initializes the icon input.
     */
    initIconInput() {
        if (this.template.querySelector('[data-element-id="input"]')) {
            this.template.querySelector(
                '[data-element-id="input"]'
            ).defaultValue = this.value;
        }
    }

    /**
     * Initializes each category of icons.
     */
    initTabContent() {
        this.tabContent = [
            {
                title: 'Standard',
                icons: ICON_TYPES[0].icons,
                iconsExtended: ICON_TYPES[0].iconsExtended,
                showIcons: false,
                showIconsExtended: false,
                showLabel: false
            },
            {
                title: 'Custom',
                icons: ICON_TYPES[1].icons,
                iconsExtended: [],
                showIcons: false,
                showIconsExtended: false,
                showLabel: false
            },
            {
                title: 'Utility',
                icons: ICON_TYPES[2].icons,
                iconsExtended: ICON_TYPES[2].iconsExtended,
                showIcons: false,
                showIconsExtended: false,
                showLabel: false
            },
            {
                title: 'Doctype',
                icons: ICON_TYPES[3].icons,
                iconsExtended: [],
                showIcons: false,
                showIconsExtended: false,
                showLabel: false
            },
            {
                title: 'Action',
                icons: ICON_TYPES[4].icons,
                iconsExtended: [],
                showIcons: false,
                showIconsExtended: false,
                showLabel: false
            }
        ];
    }

    /**
     * Resets the icons of each category.
     * This is necessary after an icon search.
     */
    resetIcons() {
        this.tabContent[0].icons = ICON_TYPES[0].icons;
        this.tabContent[0].iconsExtended = ICON_TYPES[0].iconsExtended;
        this.tabContent[1].icons = ICON_TYPES[1].icons;
        this.tabContent[1].iconsExtended = [];
        this.tabContent[2].icons = ICON_TYPES[2].icons;
        this.tabContent[2].iconsExtended = ICON_TYPES[2].iconsExtended;
        this.tabContent[3].icons = ICON_TYPES[3].icons;
        this.tabContent[3].iconsExtended = [];
        this.tabContent[4].icons = ICON_TYPES[4].icons;
        this.tabContent[4].iconsExtended = [];
    }

    /**
     * Resets the icon menu to its default configuration.
     */
    resetMenuState() {
        this.newValue = null;
        this.hideTabs = false;

        this.resetIcons();
        this.hideExtendedIcons();
    }

    /**
     * Sets the current tab to the category corresponding to the selected icon.
     * If no icon is selected or the category is invalid, the current tab will go back to default.
     */
    restoreTabContent() {
        if (!this.tabContent) {
            this.initTabContent();
        }

        this.currentTab = this.defaultTab;
        this.tabContent.forEach((tab) => {
            tab.showIcons = tab.title === this.defaultTab;
            tab.showLabel = false;
        });
    }

    /**
     * Scrolls the icon menu back to the top.
     */
    scrollTopIconList() {
        this.template.querySelector(
            '[data-element-id="avonni-builder-icon-picker-icon-container"]'
        ).scrollTop = 0;
    }

    /**
     * Makes the extended icons visible after the template has rendered.
     * A category has icons marked as extended when it has a lot of icons.
     * Icons that are only visible when scrolling will be rendered after the ones that are visible when opening the menu.
     * Therefore, there will be no delay when opening the menu in order to render all the Salesforce icons.
     */
    showExtendedIcons() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.tabContent.forEach((tab) => {
                tab.showIconsExtended = tab.showIcons;
            });
        }, 300);
    }

    /**
     * Position the dropdown automatically in the available space.
     */
    startDropdownPositioning() {
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        const button = this.template.querySelector(
            '[data-element-id="button-toggle-menu"]'
        );
        const dropdown = this.template.querySelector(
            '[data-element-id="div-dropdown"]'
        );
        this._autoPosition.start({
            target: () => button,
            element: () => dropdown,
            align: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Left,
                vertical: Direction.Bottom
            },
            autoFlip: true,
            autoShrinkHeight: true,
            padTop: 4
        });
    }

    /**
     * Stop the dropdown positioning.
     */
    stopDropdownPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    /**
     * Stops the propagation of an event.
     *
     * @param {Event} event
     */
    stopPropagation(event) {
        event.stopPropagation();
    }

    /**
     * Toggles the visibility of the icon menu.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this.iconMenuOpened = !this.iconMenuOpened;
            this.template
                .querySelector('.slds-dropdown-trigger')
                .classList.toggle('slds-is-open');
            if (this.iconMenuOpened) {
                this.restoreTabContent();
                this.showExtendedIcons();
            } else {
                this.resetMenuState();
            }

            requestAnimationFrame(() => {
                if (this.iconMenuOpened) {
                    this.startDropdownPositioning();
                } else {
                    this.stopDropdownPositioning();
                }
                this.focus();
            });
        }
        this.reportValidity();
    }

    /**
     * Validates the input icon value.
     *
     * @param {string} inputIconValue
     * @returns {object}
     */
    validateInputIconValue(inputIconValue) {
        return ICON_TYPES.flatMap((group) => [
            ...group.icons,
            ...(group.iconsExtended || [])
        ]).find(({ value }) => inputIconValue.trim() === value);
    }

    /*
     * ------------------------------------------------------------
     *  EVENTS HANDLERS
     * -------------------------------------------------------------
     */

    handleBlur(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }
        this._dispatchBlur();
    }

    /**
     * Handles a click on the menu button.
     * It toggles the visibility of the menu.
     *
     * @param {Event} event
     */
    handleButtonClick() {
        if (!this.readOnly) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Handles a click on an 'Cancel' button from the icon menu.
     *
     * @param {Event} event
     */
    handleCancel(event) {
        event.stopPropagation();
        this.newValue = null;
        this.toggleMenuVisibility();
    }

    /**
     * Handles a click on an 'Done' button from the icon menu.
     *
     * @param {Event} event
     */
    handleDone(event) {
        event.stopPropagation();
        event.preventDefault();

        if (this.newValue) {
            this._value = this.newValue;
            this._dispatchChange(this.newValue);
            this.newValue = null;
            this.isInvalidInput = false;
        }

        this.toggleMenuVisibility();
    }

    handleFocus(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }
        this._dispatchFocus();
    }

    /**
     * Handles a change in input of the selected icon.
     * It will ensure that the name of the icon exists.
     * Otherwise, an error message will be displayed.
     *
     * @param {Event} event
     */
    handleInputIcon(event) {
        this._value = event.target.value;
        this._allowBlur = true;
        this.isInvalidInput = !this.validateInputIconValue(this._value);
    }

    /**
     * Handles a blur of the icon input.
     * If the value is invalid or empty, an event is dispatched.
     */
    handleInputIconBlur(event) {
        this.reportValidity();
        if (!this.showError && this._allowBlur) {
            this._allowBlur = false;
            this._dispatchChange(event.currentTarget.value || null);
        }
        this.handleBlur(event);
    }

    /**
     * Handle a click inside the drop down menu. Focus the search input.
     */
    handleMenuClick() {
        const searchInput = this.template.querySelector(
            '[data-element-id="lightning-input"]'
        );
        if (searchInput) {
            this._menuIsFocused = true;
            searchInput.focus();
        }
    }

    /**
     * Handle a focus inside the drop down menu. Make sure the drop down won't close.
     */
    handleMenuFocusIn() {
        this._menuIsFocused = true;
    }

    /**
     * Handles a focus outside of the drop down menu. Close the menu if the focus is completely lost.
     */
    handleMenuFocusOut() {
        this._menuIsFocused = false;

        requestAnimationFrame(() => {
            // Wait to see if another element is focused inside the menu
            if (!this._menuIsFocused && this.iconMenuOpened) {
                this.toggleMenuVisibility();
            }
        });
    }

    /**
     * Handles a keydown inside the popover.
     *
     * @param {Event} event
     */
    handleMenuKeydown(event) {
        if (event.key === keyValues.escape) {
            this.handleCancel(event);
        }
    }

    /**
     * Prevents the default behavior and stops the propagation of an event.
     *
     * @param {Event} event
     */
    handlePreventDefaultStopPropagation(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Handles a change in the search input.
     * All Salesforce icons containing the input will be visible.
     *
     * @param {Event} event
     */
    handleSearchInput(event) {
        event.stopPropagation();
        const input = event.detail.value;
        this.hideTabs = input;

        if (input) {
            this.hideExtendedIcons();
            this.tabContent.forEach((tab) => {
                tab.icons = [];
            });

            let i;
            for (i = 0; i < ICON_TYPES.length; i++) {
                for (const icon of ICON_TYPES[i].icons) {
                    if (
                        icon.title.toLowerCase().includes(input.toLowerCase())
                    ) {
                        this.tabContent[i].icons.push(icon);
                    }
                }
                if (i === 0 || i === 2) {
                    for (const icon of ICON_TYPES[i].iconsExtended) {
                        if (
                            icon.title
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        ) {
                            this.tabContent[i].icons.push(icon);
                        }
                    }
                }
            }

            this.tabContent.forEach((tab) => {
                tab.showIcons = tab.icons.length !== 0;
                tab.showLabel = tab.icons.length !== 0;
            });
        } else {
            this.tabContent.forEach((tab) => {
                tab.showLabel = false;
            });
            this.resetIcons();
            this.restoreTabContent();
            this.showExtendedIcons();
        }

        this.scrollTopIconList();
    }

    /**
     * Handles a click on an icon from the icon menu.
     *
     * @param {Event} event
     */
    handleSelectIcon(event) {
        this.newValue = event.currentTarget.dataset.icon;
        if (this.hideFooter) this.handleDone(event);
    }

    /**
     * Handles the selection of an icon from the icon menu using the Enter key.
     *
     * @param {Event} event
     */
    handleSelectIconFromKeyboard(event) {
        if (event.key === keyValues.enter) {
            this.newValue = event.currentTarget.dataset.icon;
            this.handleDone(event);
        }
    }

    /**
     * Handles a change of the icon category.
     *
     * @param {Event} event
     */
    handleTabSelect(event) {
        this.currentTab = event.detail.value;
        this.changeTabContentTo(event.detail.value);
        this.scrollTopIconList();

        requestAnimationFrame(() => {
            // Set the focus back on the tab bar after render
            const tabBar = this.template.querySelector(
                '[data-element-id="avonni-builder-tab-bar"]'
            );
            tabBar.focus();
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    _dispatchBlur() {
        /**
         * The event fired when the focus is removed from the icon picker.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Dispatches the new icon.
     *
     * @param {string} icon The name of the icon.
     */
    _dispatchChange(icon) {
        /**
         * The event fired when the icon changes.
         *
         * @event
         * @name change
         * @param {string} value Value of the selected icon.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: icon
                }
            })
        );
    }

    _dispatchFocus() {
        /**
         * The event fired when the focus is set on the icon picker.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }
}

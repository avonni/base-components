import AvonniAriaObserver from 'c/ariaObserver';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { buttonGroupOrderClass, isCSR, isIE11 } from 'c/utilsPrivate';
import { LightningElement, api, track } from 'lwc';

const BUTTON = 'button';
const ROLE = 'role';

const BUTTON_VARIANTS = {
    valid: [
        'bare',
        'bare-inverse',
        'base',
        'border',
        'border-filled',
        'border-inverse',
        'brand',
        'brand-outline',
        'container',
        'destructive',
        'destructive-text',
        'inverse',
        'neutral',
        'success'
    ],
    default: 'neutral'
};
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};
const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'x-small'
};
const TYPES = {
    valid: ['button', 'reset', 'submit'],
    default: 'button'
};

export default class PrimitiveButton extends LightningElement {
    /**
     * Specifies a shortcut key to activate or focus an element.
     *
     * @type {string}
     */
    @api accessKey;
    /**
     * Indicates the element that represents the current item within a container or set of related elements.
     * For example:
     *   - A page token used to indicate a link within a set of pagination links, where the link is visually styled to
     *   represent the currently-displayed page.
     *   - A step token used to indicate a link within a step indicator for a step-based process, where
     *   the link is visually styled to represent the current step.
     *   - A location token used to indicate the image that is visually highlighted as the current component
     *   of a flow chart.
     *   - A date token used to indicate the current date within a calendar.
     *   - A time token used to indicate the current time within a timetable.
     *
     * @type {string}
     * @default undefined
     */
    @api ariaCurrent;

    /**
     * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
     *
     * @type {string}
     * @default undefined
     */
    @api ariaKeyShortcuts;
    /**
     * Label describing the button to assistive technologies.
     *
     * @type {string}
     */
    @api ariaLabel;
    /**
     * Reserved for internal use only.
     * Describes the order of this element (first, middle or last) inside lightning-button-group.
     * @type {string}
     */
    @api groupOrder = '';
    /**
     * The Lightning Design System name of the icon.
     * Names are written in the format 'utility:down' where 'utility' is the category,
     * and 'down' is the specific icon to be displayed.
     *
     * @type {string}
     */
    @api iconName;

    /**
     * The text to be displayed inside the button.
     *
     * @type {string}
     */
    @api label;
    /**
     * Message displayed while the button is in the loading state.
     *
     * @type {string}
     * @default Loading...
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    /**
     * The name for the button element.
     * This value is optional and can be used to identify the button in a callback.
     *
     * @type {string}
     */
    @api name;
    /**
     * Reserved for internal use only.
     * Should be set to -1 if button should not
     * be focused during tab navigation and should
     * be set to 0 if button should be focused.
     *
     * @type {number}
     */
    @api tabIndex;
    /**
     * Displays tooltip text when the mouse cursor moves over the element.
     *
     * @type {string}
     */
    @api title;
    /**
     * The value for the button element.
     * This value is optional and can be used when submitting a form.
     *
     * @type {string}
     */
    @api value;
    _ariaAtomic;
    _ariaBusy;
    _ariaControls;
    _ariaDescribedBy;
    _ariaDetails;
    _ariaExpanded;
    _ariaFlowTo;
    _ariaHasPopup;
    _ariaHidden;
    _ariaLabelledBy;
    _ariaLive;
    _ariaOwns;
    _ariaPressed;
    _ariaRelevant;
    _disabled = false;
    _iconPosition = ICON_POSITIONS.default;
    _iconSize = ICON_SIZES.default;
    _iconSrc;
    _isButtonLoading = false;
    _stretch = false;
    _type = TYPES.default;
    _variant = BUTTON_VARIANTS.default;

    _connected = false;

    @track
    state = {
        ariaAtomic: null,
        ariaBusy: null,
        ariaControls: null,
        ariaDetails: null,
        ariaDescribedBy: null,
        ariaExpanded: null,
        ariaFlowTo: null,
        ariaHasPopup: null,
        ariaHidden: null,
        ariaLabelledBy: null,
        ariaLive: null,
        ariaOwns: null,
        ariaPressed: null,
        ariaRelevant: null,
        disabled: false
    };

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    constructor() {
        super();
        this.ariaObserver = new AvonniAriaObserver(this);
        // Workaround for an IE11 bug where click handlers on button ancestors
        // receive the click event even if the button element has the `disabled`
        // attribute set.
        if (isIE11 && isCSR) {
            this.template.addEventListener('click', (event) => {
                if (this.disabled) {
                    event.stopImmediatePropagation();
                }
            });
        }
    }

    connectedCallback() {
        if (!this.ariaObserver) {
            this.ariaObserver = new AvonniAriaObserver(this);
        }

        this._connected = true;
    }

    renderedCallback() {
        this.template.host.style.pointerEvents = this.computedDisabled
            ? 'none'
            : '';

        if (this._connected) {
            this.ariaObserver.sync();
        }
    }

    disconnectedCallback() {
        if (this.ariaObserver) {
            this.ariaObserver.disconnect();
            this.ariaObserver = undefined;
        }

        this._connected = false;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Indicates whether assistive technologies present all, or only parts of,
     * the changed region. Valid values are 'true' or 'false'.
     *
     * @type {string}
     */
    @api
    get ariaAtomic() {
        return this._ariaAtomic;
    }
    set ariaAtomic(value) {
        this._ariaAtomic = value;
        this.state.ariaAtomic = normalizeString(value, {
            fallbackValue: null,
            validValues: ['true', 'false']
        });
    }

    /**
     * Indicates an element is being modified and that assistive technologies MAY want to wait
     * until the modifications are complete before exposing them to the user.
     * Refer to W3C aria-busy for more
     *
     * @type {string}
     */
    @api
    get ariaBusy() {
        return this._ariaBusy;
    }
    set ariaBusy(value) {
        this._ariaBusy = value;
        this.state.ariaBusy = normalizeString(value, {
            fallbackValue: null,
            validValues: ['true', 'false']
        });
    }

    /**
     * A space-separated list of element IDs whose presence or content is controlled by this button.
     *
     * @type {string}
     */
    @api
    get ariaControls() {
        return this._ariaControls;
    }
    set ariaControls(value) {
        this._ariaControls = value;
        this.setAttribute('aria-controls', value);
        this.setHostRoleAttribute(BUTTON);
    }

    /**
     * A space-separated list of element IDs that provide descriptive labels for the button.
     *
     * @type {string}
     */
    @api
    get ariaDescribedBy() {
        return this._ariaDescribedBy;
    }
    set ariaDescribedBy(value) {
        this._ariaDescribedBy = value;
        this.ariaObserver.connect({
            targetSelector: 'button',
            attribute: 'aria-describedby',
            relatedNodeIds: value
        });
    }

    /**
     * A space-separated list of element IDs whose presence or content is controlled by this button.
     *
     * @type {string}
     */
    @api
    get ariaDetails() {
        return this._ariaDetails;
    }
    set ariaDetails(value) {
        this._ariaDetails = value;
        this.setAttribute('aria-details', value);
        this.setHostRoleAttribute(BUTTON);
    }

    /**
     * Indicates whether an element that the button controls is expanded or collapsed.
     * Valid values are 'true' or 'false'. The default value is undefined.
     *
     * @type {string}
     * @default undefined
     */
    @api
    get ariaExpanded() {
        return this._ariaExpanded;
    }
    set ariaExpanded(value) {
        this._ariaExpanded = value;
        this.state.ariaExpanded = normalizeString(value, {
            fallbackValue: null,
            validValues: ['true', 'false']
        });
    }

    /**
     * A space-separated list of element IDs whose presence or content is controlled by this button.
     *
     * @type {string}
     */
    @api
    get ariaFlowTo() {
        return this._ariaFlowTo;
    }
    set ariaFlowTo(value) {
        this._ariaFlowTo = value;
        this.setAttribute('aria-flowto', value);
        this.setHostRoleAttribute(BUTTON);
    }

    /**
     * Indicates that the button has an interactive popup element.
     * Valid values are 'true', 'dialog', 'menu', 'listbox', 'tree', and 'grid' based on ARIA 1.1 specifications.
     *
     * @type {string}
     * @default undefined
     */
    @api
    get ariaHasPopup() {
        return this._ariaHasPopup;
    }
    set ariaHasPopup(value) {
        this._ariaHasPopup = value;
        this.state.ariaHasPopup = normalizeString(value, {
            fallbackValue: null,
            validValues: ['true', 'dialog', 'menu', 'listbox', 'tree', 'grid']
        });
    }

    /**
     * Indicates whether an element that the button controls is expanded or collapsed.
     * Valid values are 'true' or 'false'. The default value is undefined.
     *
     * @type {string}
     * @default undefined
     */
    @api
    get ariaHidden() {
        return this._ariaHidden;
    }
    set ariaHidden(value) {
        this._ariaHidden = value;
        this.state.ariaHidden = normalizeString(value, {
            fallbackValue: null,
            validValues: ['true', 'false']
        });
    }

    /**
     * Specifies the ID or list of IDs of the element or elements that
     * contain visible descriptive text to describe the button.
     */
    @api
    get ariaLabelledBy() {
        return this._ariaLabelledBy;
    }
    set ariaLabelledBy(value) {
        this._ariaLabelledBy = value;
        this.ariaObserver.connect({
            targetSelector: 'button',
            attribute: 'aria-labelledby',
            relatedNodeIds: value
        });
    }

    /**
     * Indicates that the button can be updated when it doesn't have focus.
     * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
     * technologies to notify users of updates at a low priority, generally without interrupting.
     * The assertive value causes assistive technologies to notify users immediately,
     * potentially clearing queued speech updates.
     *
     * @type {string}
     */
    @api
    get ariaLive() {
        return this._ariaLive;
    }
    set ariaLive(value) {
        this._ariaLive = value;
        this.state.ariaLive = normalizeString(value, {
            fallbackValue: null,
            validValues: ['polite', 'assertive', 'off']
        });
    }

    /**
     * A space-separated list of element IDs whose presence or content is controlled by this button.
     *
     * @type {string}
     */
    @api
    get ariaOwns() {
        return this._ariaOwns;
    }
    set ariaOwns(value) {
        this._ariaOwns = value;
        this.setAttribute('aria-owns', value);
        this.setHostRoleAttribute(BUTTON);
    }

    /**
     * Indicates the current "pressed" state of toggle buttons.
     * Valid values are 'true' or 'false'. The default value is undefined.
     *
     * @type {string}
     * @default undefined
     */
    @api
    get ariaPressed() {
        return this._ariaPressed;
    }
    set ariaPressed(value) {
        this._ariaPressed = value;
        this.state.ariaPressed = normalizeString(value, {
            fallbackValue: null,
            validValues: ['true', 'false']
        });
    }

    /**
     * Indicates that the button has an interactive popup element.
     * Valid values are 'true', 'dialog', 'menu', 'listbox', 'tree', and 'grid' based on ARIA 1.1 specifications.
     * The default value is undefined.
     *
     * @type {string}
     * @default undefined
     */
    @api
    get ariaRelevant() {
        return this._ariaRelevant;
    }
    set ariaRelevant(value) {
        this._ariaRelevant = value;
        this.state.ariaRelevant = normalizeString(value, {
            fallbackValue: null,
            validValues: ['additions', 'removals', 'text', 'all']
        });
    }

    /**
     * If present, the button can't be clicked by users.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * Describes the position of the icon with respect to the button label. Options include left and right.
     *
     * @type {string}
     * @default left
     */
    @api
    get iconPosition() {
        return this._iconPosition;
    }
    set iconPosition(value) {
        this._iconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium or large.
     *
     * @type {string}
     * @default xx-small
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * URL to set for the image attribute.
     *
     * @public
     * @type {string}
     */
    @api
    get iconSrc() {
        return this._iconSrc;
    }
    set iconSrc(value) {
        this._iconSrc = value;
    }

    /**
     * If present, shows a loading spinner over the button.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isButtonLoading() {
        return this._isButtonLoading;
    }
    set isButtonLoading(value) {
        this._isButtonLoading = normalizeBoolean(value);
    }

    /**
     * Setting it to true allows the button to take up the entire available width.
     * This value defaults to false.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get stretch() {
        return this._stretch;
    }
    set stretch(value) {
        this._stretch = normalizeBoolean(value);
    }

    /**
     * Specifies the type of button.
     * Options include button, reset, and submit.
     *
     * @type {string}
     * @default button
     */
    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: TYPES.default,
            validValues: TYPES.valid
        });
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled, border-inverse, brand, brand-outline, container, destructive, destructive-text, neutral, inverse and success.
     *
     * @type {string}
     * @default neutral
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedAriaAtomic() {
        return this.state.ariaAtomic;
    }

    get computedAriaBusy() {
        return this.state.ariaBusy;
    }

    get computedAriaExpanded() {
        return this.state.ariaExpanded;
    }

    get computedAriaHasPopup() {
        return this.state.ariaHasPopup;
    }

    get computedAriaHidden() {
        return this.state.ariaHidden;
    }

    get computedAriaLive() {
        return this.state.ariaLive;
    }

    get computedAriaPressed() {
        return this.state.ariaPressed;
    }

    get computedAriaRelevant() {
        return this.state.ariaRelevant;
    }

    get computedButtonClass() {
        const classes = classSet('slds-button');
        classes.add(buttonGroupOrderClass(this.groupOrder));
        return classes.toString();
    }

    get computedDisabled() {
        return this.disabled || this.isButtonLoading;
    }

    get computedIconClass() {
        return classSet('slds-button__icon')
            .add(`slds-button__icon_${this.iconPosition}`)
            .toString();
    }

    /**
     * Computed variant returns the default variant depending on label.
     *
     * @type {string}
     */
    get computedVariant() {
        return this.variant && BUTTON_VARIANTS.valid.includes(this.variant)
            ? this.variant
            : this.label
            ? 'neutral'
            : 'border';
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Utility function to set aria roles on the host element.
     * This is used mainly for native-shadow use cases for aria attributes that
     * depenend on ID references.
     *
     * If the role attribute is present we will respect that, otherwise it will be set to
     * an specific role, in this case button.
     *
     * @type {string}
     * @default undefined
     */
    setHostRoleAttribute(value) {
        let ariaRoleValue = this.getAttribute(ROLE) || value;

        this.setAttribute(ROLE, ariaRoleValue);
    }
}

import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeArray,
    normalizeString,
    normalizeObject,
    deepCopy,
    dateTimeObjectFrom,
    getFormattedDate
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const BUTTON_ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };
const BUTTON_VARIANTS = {
    valid: [
        'neutral',
        'base',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};
const DEFAULT_LOADING_TEXT = 'Loading';

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

/**
 * @class
 * @descriptor c-primitive-activity-timeline-item
 */
export default class PrimitiveActivityTimelineItem extends LightningElement {
    /**
     * The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     *
     * @public
     * @type {string}
     */
    @api buttonIconName;
    /**
     * The name for the button element. This value is optional and can be used to identify the button in a callback.
     *
     * @public
     * @type {string}
     */
    @api buttonLabel;
    /**
     * The description can include text, and is displayed under the title.
     *
     * @public
     * @type {string}
     */
    @api description;
    /**
     * Field attributes: cols, smallContainerCols, mediumContainerCols, largeContainerCols and variant.
     *
     * @public
     * @type {object}
     */
    @api fieldAttributes = {};
    /**
     * URL for the title link.
     *
     * @public
     * @type {string}
     */
    @api href;
    /**
     * Icon or list of icons next to the title.
     *
     * @public
     * @type {string[]}
     */
    @api icons;
    /**
     * Message displayed while the detail section is in the loading state.
     *
     * @public
     * @type {string}
     * @default "Loading"
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_TEXT;
    /**
     * Unique name of the item.
     *
     * @type {string}
     * @required
     * @public
     */
    @api name;
    /**
     * The title can include text, and is displayed in the header.
     *
     * @public
     * @type {string}
     */
    @api title;
    /**
     * If true, this item gets a blue bullet incase it has no icon.
     *
     * @public
     * @type {boolean}
     */
    @api isActive;

    _actions = [];
    _avatar;
    _buttonDisabled = false;
    _buttonIconPosition = BUTTON_ICON_POSITIONS.default;
    _buttonVariant = BUTTON_VARIANTS.default;
    _checked = false;
    _closed = false;
    _dateFormat;
    _datetimeValue;
    _fields = [];
    _hasCheckbox = false;
    _hasError = false;
    _iconName;
    _iconSize = ICON_SIZES.default;
    _isLoading = false;
    _color;
    _timezone;

    formattedDate = '';
    _connected = false;

    connectedCallback() {
        this.formatDate();
        this._connected = true;
    }

    renderedCallback() {
        this.setLineColor();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects.
     *
     * @type {object[]}
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value, 'object');
    }

    /**
     * Avatar object.
     *
     * @public
     * @type {object}
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        const normalizedAvatar = normalizeObject(value);
        this._avatar = Object.keys(normalizedAvatar).length
            ? normalizedAvatar
            : undefined;
    }

    /**
     * If true, the button is disabled.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get buttonDisabled() {
        return this._buttonDisabled;
    }

    set buttonDisabled(value) {
        this._buttonDisabled = normalizeBoolean(value);
    }

    /**
     * Describes the position of the icon with respect to the button label. Options include left and right.
     *
     * @public
     * @type {string}
     * @default left
     */
    @api
    get buttonIconPosition() {
        return this._buttonIconPosition;
    }

    set buttonIconPosition(value) {
        this._buttonIconPosition = normalizeString(value, {
            fallbackValue: BUTTON_ICON_POSITIONS.default,
            validValues: BUTTON_ICON_POSITIONS.valid
        });
    }

    /**
     * The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.
     *
     * @public
     * @type {string}
     * @default neutral
     */
    @api
    get buttonVariant() {
        return this._buttonVariant;
    }

    set buttonVariant(value) {
        this._buttonVariant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /**
     * If present and `has-checkbox` is true, the checkbox will be checked.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = normalizeBoolean(value);
    }

    /**
     * If true, close the section.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    /**
     * The date format to use for each item. Valid values include 'STANDARD', 'RELATIVE', the name of the preset or the custom format string.
     * See Luxon's documentation for accepted [presets](https://moment.github.io/luxon/#/formatting?id=presets) and [custom format string tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
     * If you want to insert text in the label in a custom format string, you need to escape it using single quote.
     * For example, the format of "Jan 14 day shift" would be <code>"LLL dd 'day shift'"</code>.
     *
     * @type {string}
     * @public
     */
    @api
    get dateFormat() {
        return this._dateFormat;
    }

    set dateFormat(value) {
        this._dateFormat = typeof value === 'string' ? value : null;

        if (this._connected) {
            this.formatDate();
        }
    }

    /**
     * The value to be formatted, which can be a Date object, timestamp, or an ISO8601 formatted string. Use lightning-formatted-date-time.
     *
     * @public
     * @type {datetime}
     */
    @api
    get datetimeValue() {
        return this._datetimeValue;
    }
    set datetimeValue(value) {
        this._datetimeValue = value;

        if (this._connected) {
            this.formatDate();
        }
    }

    /**
     * Array of output data objects (see Output Data for valid keys). It is displayed in the details section.
     *
     * @public
     * @type {object[]}
     */
    @api
    get fields() {
        return this._fields;
    }

    set fields(value) {
        this._fields = normalizeArray(value);
    }

    /**
     * If true, a checkbox is present before the label.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hasCheckbox() {
        return this._hasCheckbox;
    }

    set hasCheckbox(value) {
        this._hasCheckbox = normalizeBoolean(value);
    }

    /**
     * if true, display an error message in the details section.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hasError() {
        return this._hasError;
    }

    set hasError(value) {
        this._hasError = normalizeBoolean(value);
    }

    /**
     * Deprecated. Use `avatar` instead.
     * The Lightning Design System name of the icon. Specify the name in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. The icon is displayed in the header before the title.
     * When omitted, a simplified timeline bullet replaces it.
     *
     * @public
     * @type {string}
     * @deprecated
     */
    @api
    get iconName() {
        return this._iconName;
    }
    set iconName(value) {
        this._iconName = value;

        console.warn(
            'The "icon-name" attribute is deprecated. Use "avatar" instead.'
        );

        if (this._connected) {
            this.supportDeprecatedAttributes();
        }
    }

    /**
     * The size of the item's icon. Valid values are x-small, small, medium and large.
     *
     * @public
     * @type {string}
     * @default small
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
     * If present, the detail section is in a loading state and shows a spinner.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * Time zone used, in a valid IANA format. If empty, the browser's time zone is used.
     *
     * @type {string}
     * @public
     */
    @api
    get timezone() {
        return this._timezone;
    }
    set timezone(value) {
        this._timezone = value;

        if (this._connected) {
            this.formatDate();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Toggle for item expansion.
     *
     * @type {string}
     */
    get activityTimelineItemOuterClass() {
        return classSet('slds-timeline__item_expandable')
            .add({
                'slds-is-open': !this.closed,
                'avonni-primitive-activity-timeline-item__icon_xx-small':
                    this.iconSize === 'xx-small',
                'avonni-primitive-activity-timeline-item__icon_x-small':
                    this.iconSize === 'x-small',
                'avonni-primitive-activity-timeline-item__icon_small':
                    this.iconSize === 'small',
                'avonni-primitive-activity-timeline-item__icon_medium':
                    this.iconSize === 'medium',
                'avonni-primitive-activity-timeline-item__icon_large':
                    this.iconSize === 'large'
            })
            .toString();
    }

    get avatarToDisplay() {
        return (
            this.avatar?.src ||
            this.avatar?.initials ||
            this.avatar?.fallbackIconName
        );
    }

    /**
     * Return styling for item background color.
     *
     * @type {string}
     */
    get backgroundColor() {
        return this._color ? `--line-color: ${this._color}` : '';
    }

    /**
     * Computed styling class for item without fields.
     *
     * @type {string}
     */
    get computedSldsMedia() {
        return classSet('slds-media')
            .add({
                'avonni-primitive-activity-timeline-item__no-fields_margin':
                    !this.hasFields
            })
            .toString();
    }

    /**
     * Check if fields is populated.
     *
     * @type {boolean}
     */
    get hasFields() {
        return this._fields.length > 0;
    }

    /**
     * Check if the type of the icon is action
     */
    get isActionIcon() {
        return (
            typeof this.avatarToDisplay === 'string' &&
            this.avatarToDisplay.split(':')[0] === 'action'
        );
    }

    /**
     * Classes for items bullet point.
     *
     * @type {string}
     * @public
     */
    get timelineItemBullet() {
        return classSet('slds-timeline__icon avonni-timeline-item__bullet')
            .add({
                'avonni-timeline-item__active-bullet': this.isActive,
                'avonni-primitive-activity-timeline-item__bullet-xx-small':
                    this.iconSize === 'xx-small',
                'avonni-primitive-activity-timeline-item__bullet-x-small':
                    this.iconSize === 'x-small',
                'avonni-primitive-activity-timeline-item__bullet-medium':
                    this.iconSize === 'medium',
                'avonni-primitive-activity-timeline-item__bullet-large':
                    this.iconSize === 'large'
            })
            .toString();
    }

    /**
     * Classes for timeline icons
     *
     * @type {string}
     */
    get timelineIconClass() {
        return classSet('slds-timeline__icon')
            .add({
                'avonni-primitive-activity-timeline-item__icon_xx-small':
                    !this.isActionIcon && this.iconSize === 'xx-small',
                'avonni-primitive-activity-timeline-item__icon_x-small':
                    !this.isActionIcon && this.iconSize === 'x-small',
                'avonni-primitive-activity-timeline-item__icon_small':
                    !this.isActionIcon && this.iconSize === 'small',
                'avonni-primitive-activity-timeline-item__icon_medium':
                    !this.isActionIcon && this.iconSize === 'medium',
                'avonni-primitive-activity-timeline-item__action-icon_xx-small':
                    this.isActionIcon && this.iconSize === 'xx-small',
                'avonni-primitive-activity-timeline-item__action-icon_x-small':
                    this.isActionIcon && this.iconSize === 'x-small',
                'avonni-primitive-activity-timeline-item__action-icon_small':
                    this.isActionIcon && this.iconSize === 'small',
                'avonni-primitive-activity-timeline-item__action-icon_medium':
                    this.isActionIcon && this.iconSize === 'medium',
                'avonni-primitive-activity-timeline-item__action-icon_large':
                    this.isActionIcon && this.iconSize === 'large'
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the formatted date.
     */
    formatDate() {
        const date = dateTimeObjectFrom(this.datetimeValue, {
            zone: this.timezone
        });
        if (!date || !this.dateFormat) {
            this.formattedDate = '';
            return;
        }
        this.formattedDate = getFormattedDate(
            this.datetimeValue,
            {
                zone: this.timezone
            },
            this.dateFormat
        );
    }

    /**
     * Takes computed style for icon color and sets it to the line color.
     *
     * @returns {string} line background color
     */
    setLineColor() {
        const icon = this.template.querySelector(
            '[data-element-id="item-marker"]'
        );
        if (icon === null) return;
        if (this.avatarToDisplay) {
            this._color = this.avatar?.fallbackIconName
                ? icon.getBackgroundColor()
                : '';
        } else {
            const style = getComputedStyle(icon);
            this._color = style.backgroundColor;
        }
    }

    /**
     * Make sure the deprecated item attributes are still supported.
     */
    supportDeprecatedAttributes() {
        if (this.iconName && this.avatar?.fallbackIconName === undefined) {
            this._avatar = {
                ...this.avatar,
                fallbackIconName: this.iconName
            };
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Toggle for closed/open section.
     */
    handleSectionStatus() {
        this._closed = !this._closed;
    }

    /**
     * Actionclick handler.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name Name of the action clicked
         * @param {object} fieldData For an item action, data of the fields.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: event.detail.value,
                    targetName: this.name,
                    fieldData: deepCopy(this.fields)
                },
                bubbles: true
            })
        );
    }

    /**
     * Prevent anchor tag from navigating when href leads to nothing.
     *
     * @param {Event} event
     */
    handleAnchorTagClick(event) {
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }

    /**
     * Buttonclick event handler.
     */
    handleButtonClick() {
        /**
         * The event fired when the button in the details section is clicked.
         * @event
         * @public
         * @name buttonclick
         */
        this.dispatchEvent(
            new CustomEvent('buttonclick', {
                detail: { name: this.name },
                bubbles: true
            })
        );
    }

    /**
     * Check event handler.
     *
     * @param {Event} event
     */
    handleCheck(event) {
        event.stopPropagation();
        this._checked = event.detail.checked;

        /**
         * The check event returns the following parameters.
         *
         * @event
         * @name check
         * @public
         * @param {boolean} checked True if the item is checked, false otherwise.
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('check', {
                detail: {
                    checked: this.checked,
                    name: this.name
                },
                bubbles: true
            })
        );
    }

    /**
     * Handle a click on the title. Dispatch the `itemclick` event.
     */
    handleTitleClick() {
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    name: this.name
                },
                bubbles: true
            })
        );
    }
}

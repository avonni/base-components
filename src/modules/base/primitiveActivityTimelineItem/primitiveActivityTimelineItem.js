import {
    DateTime,
    DEFAULT_DATE_FORMATS,
    getFormattedDate,
    isISODateOnly
} from 'c/dateTimeUtils';
import {
    classSet,
    convertHTMLToPlainText,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { api, LightningElement } from 'lwc';

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

const ICON_VARIANTS = {
    valid: ['circle', 'square'],
    default: 'square'
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
     * Label of the button displayed below the details.
     *
     * @public
     * @type {string}
     */
    @api buttonLabel;
    /**
     * Object that defines the layout of the fields. The object contains the following properties:
     * - cols: Number of columns on default screen size
     * - smallContainerCols: Number of columns on small container screens
     * - mediumContainerCols: Number of columns on medium container screens
     * - largeContainerCols: Number of columns on large container screens
     * - variant: Display variant of the fields. Valid values include standard and label-hidden
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
     * Target for the title link.
     *
     * @public
     * @type {string}
     */
    @api target;
    /**
     * The title can include text, and is displayed in the header.
     *
     * @public
     * @type {string}
     */
    @api title;

    _actions = [];
    _avatar;
    _buttonDisabled = false;
    _buttonIconPosition = BUTTON_ICON_POSITIONS.default;
    _buttonVariant = BUTTON_VARIANTS.default;
    _checked = false;
    _closed = false;
    _dateFormat;
    _datetimeValue;
    _description;
    _endDateValue;
    _fields = [];
    _hasCheckbox = false;
    _hasError = false;
    _hideVerticalBar = false;
    _iconName;
    _iconSize = ICON_SIZES.default;
    _iconVariant = ICON_VARIANTS.default;
    _isActive = false;
    _isLoading = false;
    _timezone;

    _connected = false;

    computedFields = [];
    descriptionTitle;
    formattedEndDate = '';
    formattedStartDate = '';

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.formatStartEndDates();
        this.formatFields();
        this._connected = true;
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
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.setLineColor();
            });
        });
    }

    /**
     * If presents, the button is disabled and cannot be used.
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
     * If present, the item is closed by default.
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
            this.formatStartEndDates();
            this.formatFields();
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
            this.formatStartEndDates();
        }
    }

    /**
     * The description can include text, and is displayed under the title.
     *
     * @public
     * @type {string}
     */
    @api
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
        this.descriptionTitle = convertHTMLToPlainText(value);
    }

    /**
     * The value to be formatted, which can be a Date object, timestamp, or an ISO8601 formatted string. Use lightning-formatted-date-time.
     *
     * @public
     * @type {datetime}
     */
    @api
    get endDateValue() {
        return this._endDateValue;
    }
    set endDateValue(value) {
        this._endDateValue = value;

        if (this._connected) {
            this.formatStartEndDates();
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

        if (this._connected) {
            this.formatFields();
        }
    }

    /**
     * If present, a checkbox is present before the label.
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
     * If present, display an error message in the details section.
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
     * If present, the vertical bar is not displayed to the left of the item.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideVerticalBar() {
        return this._hideVerticalBar;
    }
    set hideVerticalBar(value) {
        this._hideVerticalBar = normalizeBoolean(value);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.setLineColor();
            });
        });
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
     * The size of the item's icon. Valid values are xx-small, x-small, small, medium and large.
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
     * The shape of the item's icon. Valid values include circle and square.
     *
     * @public
     * @type {string}
     * @default square
     */
    @api
    get iconVariant() {
        return this._iconVariant;
    }
    set iconVariant(value) {
        this._iconVariant = normalizeString(value, {
            fallbackValue: ICON_VARIANTS.default,
            validValues: ICON_VARIANTS.valid
        });
    }

    /**
     * If present, this item gets a blue bullet incase it has no icon.
     *
     * @public
     * @type {boolean}
     */
    @api
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = normalizeBoolean(value);
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
            this.formatStartEndDates();
            this.formatFields();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Returns the avatar to display.
     *
     * @type {string}
     */
    get avatarToDisplay() {
        return (
            this.avatar?.src ||
            this.avatar?.initials ||
            this.avatar?.fallbackIconName
        );
    }

    /**
     * Returns the chevron icon name.
     *
     * @type {string}
     */
    get computedChevronIconName() {
        return this.closed ? 'utility:chevronright' : 'utility:chevrondown';
    }

    /**
     * Computed styling class for item without fields.
     *
     * @type {string}
     */
    get computedSldsMediaClass() {
        return classSet('slds-media')
            .add({
                'avonni-primitive-activity-timeline-item__no-fields_margin':
                    !this.hasFields
            })
            .toString();
    }

    /**
     * Toggles for item expansion.
     *
     * @type {string}
     */
    get computedTimelineItemOuterClass() {
        return classSet('slds-timeline__item_expandable')
            .add({
                'slds-is-open': !this.closed
            })
            .add(
                `avonni-primitive-activity-timeline-item__icon_${this.iconSize}`
            )
            .toString();
    }

    /**
     * Return the formatted date.
     *
     * @type {string}
     */
    get formattedDate() {
        if (this.formattedStartDate && this.formattedEndDate) {
            return `${this.formattedStartDate} - ${this.formattedEndDate}`;
        }
        return this.formattedStartDate || this.formattedEndDate || '';
    }

    /**
     * Check if fields is populated.
     *
     * @type {boolean}
     */
    get hasFields() {
        return this.computedFields.length > 0;
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
     * Returns the open state of the item.
     *
     * @type {boolean}
     */
    get isOpen() {
        return !this.closed;
    }

    /**
     * Classes for items bullet point.
     *
     * @type {string}
     * @public
     */
    get timelineItemBulletClass() {
        return classSet('slds-timeline__icon avonni-timeline-item__bullet')
            .add({
                'avonni-timeline-item__active-bullet': this.isActive
            })
            .add(
                `avonni-primitive-activity-timeline-item__bullet-${this.iconSize}`
            )
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
     * Sets the formatted date.
     */
    formatDate(value) {
        const date = new Date(value);
        return !value || isNaN(date) || !this.dateFormat
            ? ''
            : getFormattedDate({
                  date: value,
                  timeZone: this.timezone,
                  format: this.dateFormat
              });
    }

    formatFields() {
        if (!Array.isArray(this._fields)) {
            return;
        }
        const fields = this._fields.map((field) => {
            let typeAttributes = field.typeAttributes || {};
            let value = field.value;
            if (field.type === 'date') {
                const isDateOnly = isISODateOnly(value);
                const dateType = isDateOnly ? 'date' : 'dateTime';
                if (isDateOnly) {
                    const dateTime = new DateTime(value, this.timezone);
                    value = `${value}T00:00:00${dateTime.tzOffset}`;
                }
                typeAttributes = {
                    ...DEFAULT_DATE_FORMATS[dateType],
                    ...typeAttributes,
                    timeZone: this.timezone
                };
            }
            return {
                ...field,
                ...(Object.keys(typeAttributes).length > 0
                    ? { typeAttributes }
                    : {}),
                value
            };
        });
        this.computedFields = fields;
    }

    formatStartEndDates() {
        this.formattedStartDate = this.formatDate(this.datetimeValue);
        this.formattedEndDate = this.formatDate(this.endDateValue);
    }

    /**
     * Takes computed style for icon color and sets it to the line color.
     *
     * @returns {string} line background color
     */
    setLineColor() {
        const container = this.template.querySelector(
            '[data-element-id="avonni-timeline-item"]'
        );
        const icon = this.template.querySelector(
            '[data-element-id="item-marker"]'
        );
        if (!icon || !container) return;

        let color = '';
        if (this.hideVerticalBar) {
            color = 'transparent';
        } else if (this.avatarToDisplay) {
            color =
                this.avatar.fallbackIconName || this.avatar.initials
                    ? icon.getBackgroundColor()
                    : '';
            if (color === 'rgba(0, 0, 0, 0)') {
                color = '';
            }
        } else {
            const style = getComputedStyle(icon);
            color = style.backgroundColor;
        }
        container.style.setProperty('--line-color', `${color || ''}`);
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
     * Toggles the closed/open section.
     */
    handleSectionStatus() {
        this._closed = !this._closed;
    }

    /**
     * Handles the action click event.
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
     * Prevents the anchor tag from navigating when the href leads to nothing.
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
     * Handles the button click event.
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
     * Handles the check event.
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
     * Handles a click on the title. Dispatches the `itemclick` event.
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

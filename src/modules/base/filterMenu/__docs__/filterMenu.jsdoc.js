/**
 * @typedef {object} AvonniFilterMenuItem
 * @name items
 * @property {string} color CSS color value. If present, the option input is colored (vertical variant) or a color chip is displayed next to the option (horizontal variant).
 * @property {boolean} enableInfiniteLoading Only used by the list type with nested items. If true, this item will display a "load more" button at the end of its nested children.
 * @property {string} label Label of the item.
 * @property {string} value Value of the item.
 * @property {boolean} disabled If true, the item is disabled and users cannot interact with it.
 * @property {string} iconName Lightning Design System name of the icon displayed after the label. This attribute isn’t supported for the vertical variant.
 * @property {string} prefixIconName Lightning Design System name of the icon displayed before the label.
 */

/**
 * @typedef {object} AvonniFilterMenuTypeAttributes
 * @property {boolean} allowSearch Only used by the list type. If true, the filter menu allows searching.
 * @property {string} dropdownLength Only used by the list type. The length of the dropdown menu.
 * @property {string} dropdownWidth Only used by the list type.  The width of the dropdown menu.
 * @property {boolean} enableInfiniteLoading Only used by the list type. If true, the filter menu allows infinite loading.
 * @property {boolean} hasNestedItems Only used by the list type. If true, the filter menu has nested items.
 * @property {boolean} isMultiSelect Only used by the list type.  If true, the filter menu is a multi-select.
 * @property {AvonniFilterMenuItem[]} items Only used by the list type.  The items of the filter menu.
 * @property {string} noResultsMessage Only used by the list type.  The message to display when there are no results.
 * @property {string} searchInputPlaceholder Only used by the list type. The placeholder for the search input.
 * @property {number} totalCount Only used by the list type. The total number of items in the filter menu.
 * @property {string} dateStyle Only used by the date-range type. Valid values are short, medium and long.
 * @property {boolean} isExpanded Only used by the date-range type. If true, the date range is expanded.
 * @property {string} labelEndDate Only used by the date-range type. The label for the end date.
 * @property {string} labelEndTime Only used by the date-range type. The label for the end time.
 * @property {string} labelRangeOptions Only used by the date-range type. The label for the range options.
 * @property {string} labelStartDate Only used by the date-range type. The label for the start date.
 * @property {string} labelStartTime Only used by the date-range type. The label for the start time.
 * @property {boolean} showRangeOptions Only used by the date-range type. If true, the range options are shown.
 * @property {string} timeStyle Only used by the date-range type. Valid values are short, medium and long.
 * @property {string} timezone Only used by the date-range type. The timezone for the date range in a IANA Timezone format.
 * @property {string} type Only used by the date-range type. Valid values are date and datetime.
 * @property {number} hideMinMaxValues Only used by the range type. If true, the min and max values are hidden.
 * @property {number} max Only used by the range type. The maximum value of the range.
 * @property {number} min Only used by the range type. The minimum value of the range.
 * @property {boolean} showPin Only used by the range type. If true, the pin is shown.
 * @property {boolean} showTickMarks Only used by the range type. If true, the tick marks are shown.
 * @property {number} step Only used by the range type. The step value of the range.
 * @property {string} tickMarkStyle Only used by the range type. Valid values are inner-tick, tick and dot.
 * @property {string} unit Only used by the range type. Valid values are decimal, currency and percent.
 * @property {AvonniFilterMenuUnitAttributes} unitAttributes Only used by the range type. The attributes for the unit.
 * @property {string} labelEndTime Only used by the time-range type. The label for the end time.
 * @property {string} labelStartTime Only used by the time-range type. The label for the start time.
 * @property {string} timeStyle Only used by the time-range type. Valid values are short, medium and long.
 */

/**
 * @typedef {object} AvonniFilterMenuCustomLabels
 * @name customLabels
 * @property {string} label Label to be displayed as custom label.
 * @property {number} value Decimal value associated with custom label. Custom label will be displayed at the decimal equivalent of this value on the slider.
 */

/**
 * @typedef {object} AvonniFilterMenuUnitAttributes
 * @property {boolean} isFormatted Only used by the percent unit. If true, the unit is formatted.
 * @property {string} currencyCode Only used by the currency unit. Currency code used to format the unit.
 * @property {string} currencyDisplayAs Only used by the currency unit. Currency display as. Valid values are code, symbol and name.
 * * @property {AvonniFilterMenuCustomLabels[]} customLabels Only used by the percent unit. If true, the value will be formatted as a percentage.
 * @property {number} maximumFractionDigits Maximum fraction digits.
 * @property {number} maximumSignificantDigits Maximum significant digits.
 * @property {number} minimumFractionDigits Minimum fraction digits.
 * @property {number} minimumIntegerDigits Minimum integer digits.
 * @property {number} minimumSignificantDigits Minimum significant digits.
 */

/**
 * @namespace stylingHooks
 */

/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-horizontal-button-color-background-selected
 * @default #eef4ff
 * @type color
 */

/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-horizontal-button-count-background-color-selected
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-horizontal-button-count-text-color-selected
 * @type color
 */

/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-collapse-icon-color-foreground
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-color-background
 * @default #ffffff
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-color-background-active
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-color-background-hover
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-font-size
 * @default 0.8125rem
 * @type dimension
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-font-weight
 * @default 700
 * @type number
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-text-color
 * @default #181818
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-text-color-active
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-label-text-color-hover
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-load-more-button-text-color
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-load-more-button-text-color-active
 * @type color
 */
/**
 * @memberof stylingHooks
 * @name --avonni-filter-menu-vertical-load-more-button-text-color-hover
 * @type color
 */

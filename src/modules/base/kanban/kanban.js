import { LightningElement, api } from 'lwc';
import { AvonniResizeObserver } from 'c/resizeObserver';
import kanban from './kanban.html';
import kanbanSubGroups from './kanbanSubGroups.html';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import KanbanGroupsBuilder from './groupBuilder';

const KANBAN_VARIANTS = {
    valid: ['base', 'path'],
    default: 'base'
};

const SUMMARY_UPDATE_SPEED = 300;

const FIELD_VARIANTS = {
    default: 'label-hidden',
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked']
};

/**
 * @class
 * @storyId example-kanban--base
 * @descriptor avonni-kanban
 * @public
 */
export default class Kanban extends LightningElement {
    _actions = [];
    _cardAttributes = {};
    _disableColumnDragAndDrop = false;
    _disableItemDragAndDrop = false;
    _groupValues = [];
    _hideHeader = false;
    _isLoading = false;
    _records = [];
    _subGroupFieldName;
    _summarizeAttributes = {};

    _clickedGroupIndex = 0;
    _clickOffset = { x: 0, y: 0 };
    _computedGroups = [];
    _connected = false;
    _currentScrollTarget;
    _currentSubGroup = '';
    _currentSubGroupIndex = 0;
    _currentXScroll = 0;
    _draggedGroup;
    _draggedTile;
    _droppedTileHeight = 0;
    _fieldsDistance = [];
    _groupsHeight = [];
    _groupsLength = [];
    _groupsScrollTop = [];
    _groupWidth = 1;
    _hasSubGroups = false;
    _initialPos = { x: 0, y: 0 };
    _initialScrollHeight = 0;
    _initialScrollWidth = 0;
    _initialTileIndex = 0;
    _kanbanPos = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    _kanbanOffset = {
        x: 0,
        y: 0
    };
    _oldSummarizeValues = [];
    _releasedGroupIndex = 0;
    _releasedTileIndex = 0;
    _resizeObserver;
    _scrollingInterval;
    _scrollOffset = 0;
    _scrollWidth = 0;
    _subGroupsHeight = [];
    _summarizeValues = [];
    _summaryTimeoutsId = [];

    _variant = KANBAN_VARIANTS.default;
    kanbanGroup;

    connectedCallback() {
        this.updateTiles();
        this._connected = true;
    }

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }

        this.capContainerWidth();
        this.capFieldWidth();
        this.setContainerDimensions();
        this.capFieldHeight();
        this.cropSubGroupHeaders();
        this.computeGroupScrollTop();

        const { x, y } = this.getBoundingClientRect();
        this._kanbanOffset = { x, y };
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    /**
     * Render the kanban depending on its subgroups.
     *
     * @returns {File} kanban.html | kanbanSubgroup.html
     */
    render() {
        if (this.hasSubGroups()) {
            return kanbanSubGroups;
        }
        return kanban;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Object of attributes for the card.
     * Card attributes: coverImage, title, description, startDate, dueDate, customFields and customFieldAttributes
     *
     * @type {object}
     * @public
     */
    @api
    get cardAttributes() {
        return this._cardAttributes;
    }
    set cardAttributes(value) {
        this._cardAttributes = normalizeObject(value);

        const normalizedFieldAttributes = normalizeObject(
            this._cardAttributes.customFieldAttributes
        );
        const variant = normalizeString(normalizedFieldAttributes.variant, {
            fallbackValue: FIELD_VARIANTS.default,
            validValues: FIELD_VARIANTS.valid
        });
        this._cardAttributes = {
            ...this.cardAttributes,
            customFieldAttributes: {
                ...normalizedFieldAttributes,
                variant
            }
        };
        if (this._connected) {
            this.updateTiles();
        }
    }

    /**
     * Name of the data field containing the group label the data belongs to.
     *
     * @type {string}
     * @public
     * @required
     */
    @api groupFieldName;

    /**
     *
     * Name of a key of the records objects. This key needs to be present in all records objects. Its value needs to be unique to a record, as it will be used as the record identifier.
     * @type {string}
     * @public
     * @required
     */
    @api keyField;

    /**
     * Array of action objects. The actions are displayed on each card and refer to tasks you can perform, such as updating or deleting the card.
     *
     * @type {object[]}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(values) {
        this._actions = normalizeArray(values);
        if (this._connected) {
            this.updateTiles();
        }
    }

    /**
     *
     *
     * If present, the columns cannot be dragged by users.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disableColumnDragAndDrop() {
        return this._disableColumnDragAndDrop;
    }
    set disableColumnDragAndDrop(value) {
        this._disableColumnDragAndDrop = normalizeBoolean(value);
    }

    /**
     *
     *
     * If present, the tiles cannot be dragged by users.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disableItemDragAndDrop() {
        return this._disableItemDragAndDrop;
    }
    set disableItemDragAndDrop(value) {
        this._disableItemDragAndDrop = normalizeBoolean(value);
    }

    /**
     * Array of group objects. Each group represents one step of the path.
     *
     * @type {object[]}
     * @public
     */
    @api
    get groupValues() {
        return this._groupValues;
    }
    set groupValues(values) {
        this._groupValues = normalizeArray(values);
        if (this._connected) {
            this.updateTiles();
        }
    }

    /**
     * If present, the group headers are hidden.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideHeader() {
        return this._hideHeader;
    }
    set hideHeader(value) {
        this._hideHeader = normalizeBoolean(value);
    }

    /**
     *
     * If present, the Kanban is in a loading state and shows a spinner.
     *
     * @type {boolean}
     * @public
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
     * Array of data objects. Each object will be displayed as a data card in one of the steps.
     * The objects should have a key <code>id</code>, used as their unique identifier. A <code>warningIcon</code> key can also be used to display a warning icon at the bottom right of the tile.
     * The other keys should correspond to the available fields, and/or the summarize and group field names.
     *
     * @type {object[]}
     * @public
     */
    @api
    get records() {
        return this._records;
    }
    set records(values) {
        this._records = normalizeArray(values);
        if (this._connected) {
            this.updateTiles();
        }
    }

    /**
     *
     * Name of the data field containing the sub-group label the data belongs to.
     *
     * @type {string}
     * @public
     */
    @api
    get subGroupFieldName() {
        return this._subGroupFieldName;
    }
    set subGroupFieldName(value) {
        this._subGroupFieldName = value;
        if (this._connected) {
            this.updateTiles();
        }
    }

    /**
     *
     * The field containing the number to add to the group summarization, at the top of each column.
     *
     * @type {string}
     * @public
     */
    @api
    get summarizeAttributes() {
        return this._summarizeAttributes;
    }
    set summarizeAttributes(value) {
        this._summarizeAttributes = normalizeObject(value);
        if (this._connected) {
            this.updateTiles();
        }
    }

    /**
     * The variant changes the apparence of the kanban. Valid values include base and path. Default to base.
     * @type {string}
     * @default base
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: KANBAN_VARIANTS.default,
            validValues: KANBAN_VARIANTS.valid
        });
        if (this._connected) {
            this.capFieldWidth();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Gets the class of the group depending on the variant and the drag settings.
     *
     * @type {string}
     */
    get computedFieldClass() {
        return classSet(
            'avonni-kanban__field slds-grid slds-p-vertical_x-small slds-col slds-is-relative'
        ).add({
            'avonni-kanban__field_disabled_column_drag':
                this.disableColumnDragAndDrop,
            'slds-m-around_xx-small': this.variant === 'base',
            'slds-grid slds-col': this.variant === 'path'
        });
    }

    /**
     * Gets the class of the header depending of hideHeader.
     *
     * @type {string}
     */
    get computedFieldClassHeader() {
        return classSet(this.computedFieldClass).add({
            'avonni-kanban__field_header_hidden': this._hideHeader,
            'avonni-kanban__field_header': true
        });
    }

    /**
     * Returns the computed groups, without altering the summarize field values.
     *
     * @type {object[]}
     */
    get computedGroups() {
        return this._computedGroups;
    }

    /**
     * Returns the computedGroups with the subgroups filtered, for interpolation purposes.
     *
     * @type {object[]}
     */
    get computedSubGroups() {
        const computedGroups = deepCopy(this._computedGroups);
        this._computedGroups.forEach((group, i) => {
            computedGroups[i].subGroups =
                group.subGroups[this._currentSubGroupIndex];
            computedGroups[i].backgroundStyle = group.backgroundStyle;
        });
        this._currentSubGroupIndex++;
        return computedGroups;
    }

    /**
     * Gets the class of the tile depending on disableItemDragAndDrop
     *
     * @type {string}
     */
    get computedTileClass() {
        return classSet(
            'avonni-kanban__tile slds-item slds-is-relative slds-m-around_x-small'
        ).add({
            'avonni-kanban__tile_disabled_drag': this.disableItemDragAndDrop
        });
    }

    /**
     * Returns the object of attributes for the fields.
     *
     * @type {object}
     */
    get customFieldAttributes() {
        if (this.cardAttributes && this.cardAttributes.customFieldAttributes) {
            return this.cardAttributes.customFieldAttributes;
        }
        return {};
    }

    /**
     * Check if actions exist.
     *
     * @type {boolean}
     */
    get hasActions() {
        return this.actions && this.actions.length > 0;
    }

    /**
     * Check if the tile has a header.
     *
     * @type {boolean}
     */
    get hasTileHeader() {
        return this.cardAttributes.title || this.cardAttributes.description;
    }

    /**
     * Check if the variant is path.
     *
     * @type {boolean}
     */
    get isPath() {
        return this.variant === 'path';
    }

    /**
     * Returns the labels of all the subgroups.
     *
     * @type {object[]}
     */
    get subGroupsLabels() {
        return this._computedGroups[0].subGroups;
    }

    /**
     * Wrapper div class, depending on the variant value.
     * @type {string}
     */
    get variantClass() {
        return classSet(`avonni-kanban__variant_${this._variant}`)
            .add({
                'avonni-kanban__disabled_item_drag':
                    this.disableItemDragAndDrop,
                'avonni-kanban__disabled_column_drag':
                    this.disableColumnDragAndDrop,
                'avonni-kanban__header_hidden': this._hideHeader
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     *
     * Autoscrolls the tiles / groups when the dragged tile is on the edge of the container
     * @param {number} currentX Current x position of the dragged tile
     * @param {number} currentY Current y position of the dragged tile
     */
    autoScroll(currentX, currentY) {
        this._currentXScroll = currentX;
        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        const group = groups[this._releasedGroupIndex];

        // auto scroll when the user is dragging the tile out of the list
        const scrollStep = this.computeScrollStep(currentX, currentY);

        let toScroll = scrollStep.x ? fieldContainer : group;

        toScroll = this._hasSubGroups ? fieldContainer : toScroll;
        this._currentScrollTarget = toScroll;

        if (
            !this._scrollingInterval &&
            (this._draggedGroup || this._draggedTile)
        ) {
            this._scrollingInterval = window.setInterval(() => {
                this.handleAutoScrollInterval(
                    scrollStep,
                    fieldContainer,
                    groups
                );
            }, 20);
        }

        // Resets the timeouts to stop scrolling when the user is dragging the tile inside the list / container
        if (!scrollStep.x && !scrollStep.y) {
            this.clearScrollInterval();
        }
    }

    /**
     *
     * Updates the summary value gradually
     * @param {object} group Group containing the summary value to animate
     */
    animateSummary(group) {
        if (this.isLoading) return;
        this._groupsLength.push(group.tiles.length);
        const summarizeUpdate = this.truncateNumber(
            this._summarizeValues[group.index] -
                this._oldSummarizeValues[group.index]
        );
        if (summarizeUpdate !== 0) {
            for (let j = 0; j < SUMMARY_UPDATE_SPEED; j++) {
                this._summaryTimeoutsId[j] = window.setTimeout(() => {
                    const summary = this.template.querySelectorAll(
                        '[data-element-id="summarize"]'
                    )[group.index];

                    // Set the summary value to the old one to animate it gradually
                    if (
                        this.truncateNumber(summary.value) ===
                            this._summarizeValues[group.index] &&
                        j !== SUMMARY_UPDATE_SPEED - 1
                    ) {
                        summary.value = this._oldSummarizeValues[group.index];
                    }

                    if (
                        (summarizeUpdate < 0 &&
                            summary.value <=
                                this._summarizeValues[group.index]) ||
                        (summarizeUpdate > 0 &&
                            summary.value >= this._summarizeValues[group.index])
                    ) {
                        summary.value = this._summarizeValues[group.index];
                    } else {
                        summary.value += summarizeUpdate / SUMMARY_UPDATE_SPEED;
                    }
                }, 0.5 * j);
            }
        }
    }

    /**
     *
     * Translates down the tiles that are being hovered and updates the height of the groups
     * @param {HTMLElement[]} groups Groups containing the tiles to translate
     */
    animateTiles(groups) {
        if (!this._hasSubGroups) {
            this.capFieldHeight();
        }

        // translates the tiles down when the dragged tile hovers over them
        const releasedChilds = Array.from(
            groups[this._releasedGroupIndex].children
        ).filter(
            (child) =>
                child !== this._draggedTile &&
                (child.dataset.subgroup === this._currentSubGroup ||
                    !this._hasSubGroups)
        );
        for (let i = this._releasedTileIndex; i < releasedChilds.length; i++) {
            if (releasedChilds[i]) {
                releasedChilds[i].classList.add('avonni-kanban__tile_moved');
                releasedChilds[
                    i
                ].style.transform = `translateY(${this._draggedTile.offsetHeight}px)`;
            }
        }

        this.resetAnimations(groups);
    }

    /**
     *
     * Limits the width of the container to prevent overflow / to truncate it to fit content.
     *
     */
    capContainerWidth() {
        if (this.isLoading) return;

        const container = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );
        const groupHeader = this.template.querySelector(
            '[data-element-id="avonni-kanban__group_header"]'
        );
        const header = this.template.querySelector(
            '[data-element-id="avonni-kanban__header"]'
        );
        const path = this.template.querySelector('[data-element-id="path"]');
        const expandableContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__expandable_container"]'
        );
        if (this._hasSubGroups) {
            const headerWidth = header.scrollWidth;

            if (headerWidth <= container.clientWidth) {
                container.style.overflowX = 'hidden';

                const totalWidth =
                    groupHeader.offsetWidth * this._groupValues.length;

                const totalMargins = this._groupValues.length;

                const offset = this.variant === 'path' ? 2 : 0.75;

                container.style.width = `calc(${totalWidth}px + ${totalMargins}rem - ${offset}rem)`;
            } else {
                container.style.overflowX = 'auto';
                container.style.width = `100%`;
                if (this.variant === 'path') {
                    expandableContainer.style.width = `${path.clientWidth}px`;

                    header.style.width = `${path.clientWidth}px`;
                }
            }
        } else if (this.variant === 'path') {
            container.style.width = `${path.clientWidth}px`;
        }
    }

    /**
     *
     * Limits the height of the fields to prevent overflow
     */
    capFieldHeight() {
        if (this.isLoading) return;

        this._scrollWidth = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        ).scrollWidth;
        const fields = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__field"]'
        );
        const container = this.template.querySelector(
            '[data-element-id="avonni-kanban__field_container"]'
        );
        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );
        if (this._hasSubGroups) {
            const subGroupsHeight = [];
            this._subGroupsHeight.forEach(() => {
                subGroupsHeight.push([]);
            });
            groups.forEach((group, i) => {
                group.style.height = 'auto';
                subGroupsHeight[Math.floor(i / this.groupValues.length)][
                    i % this.groupValues.length
                ] = group.offsetHeight;
            });
            groups.forEach((group, i) => {
                group.style.height = `calc(${Math.max(
                    ...subGroupsHeight[Math.floor(i / this.groupValues.length)]
                )}px)`;
            });
        } else {
            fields.forEach((field) => {
                if (field.offsetHeight >= container.offsetHeight) {
                    field.classList.add('avonni-kanban__field_capped');
                } else {
                    field.classList.remove('avonni-kanban__field_capped');
                }
            });
        }
        this._droppedTileHeight = 0;
    }

    /**
     *
     * Limits the width of the fields to align columns for Path variant
     */
    capFieldWidth() {
        if (this.isLoading && this.variant !== 'path') return;

        const pathItems = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__path_item"]'
        );
        const fields = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__field"]'
        );
        const headers = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group_header_wrapper"]'
        );

        for (let i = 0; i < pathItems.length; i++) {
            const rect = pathItems[i].getBoundingClientRect();
            if (rect) {
                let width = rect.width || 0;
                let offset = 0;
                if (i !== 0) {
                    const pathStyle = getComputedStyle(pathItems[i]);
                    if (pathStyle) {
                        offset +=
                            parseInt(pathStyle.marginLeft.split('px')[0], 10) +
                            parseInt(pathStyle.marginRight.split('px')[0], 10);
                    }
                }
                width += offset;
                if (this._hasSubGroups && headers && headers[i]) {
                    headers[i].style.minWidth = `${width}px`;
                    headers[i].style.width = `${width}px`;
                    headers[i].style.maxWidth = `${width}px`;
                }
                if (fields && fields[i]) {
                    fields[i].style.minWidth = `${width}px`;
                    fields[i].style.width = `${width}px`;
                    fields[i].style.maxWidth = `${width}px`;
                }
            }
        }
    }

    /**
     *
     * Limits the position of the mouse to the kanban's boundaries
     * @param {Event} event
     *
     */
    capMousePos(event) {
        const kanbanContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__field_container"]'
        );

        this.computeKanbanBoundaries(
            this._hasSubGroups ? kanbanContainer : fieldContainer
        );

        const expandableContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__expandable_container"]'
        );

        const bottom = this._hasSubGroups
            ? this._initialScrollHeight
            : this._kanbanPos.bottom;

        if (!this._hasSubGroups) {
            kanbanContainer.style.overflowX =
                this._initialScrollWidth === kanbanContainer.offsetWidth
                    ? 'hidden'
                    : 'scroll';
        }

        // Calculates the position of the mouse depending on the kanban boundaries
        let currentY =
            event.clientY +
            (this._hasSubGroups ? expandableContainer.scrollTop : 0);

        let currentX = event.clientX + kanbanContainer.scrollLeft;
        if (currentY < this._kanbanPos.top && !this._draggedGroup) {
            currentY = this._kanbanPos.top;
        } else if (currentY > bottom && !this._draggedGroup) {
            currentY = bottom;
        }
        if (currentX < this._kanbanPos.left) {
            currentX = this._kanbanPos.left;
        } else if (currentX > this._scrollWidth + this._kanbanOffset.x) {
            currentX = this._scrollWidth + this._kanbanOffset.x;
        }

        return {
            x: currentX,
            y: currentY
        };
    }

    /**
     * Calculates the boundaries of the kanban to prevent from dragging outside of the container
     * @param {EventTarget} currentTarget
     *
     */
    computeKanbanBoundaries(currentTarget) {
        this._kanbanPos.top = currentTarget.getBoundingClientRect().top;
        this._kanbanPos.bottom =
            this._kanbanPos.top + currentTarget.offsetHeight;
        this._kanbanPos.scrollBottom =
            this._kanbanPos.top + currentTarget.scrollHeight;

        this._kanbanPos.left = currentTarget.getBoundingClientRect().left;
        this._kanbanPos.right =
            this._kanbanPos.left + currentTarget.scrollWidth;
    }

    /**
     * Clears the intervals related to autoscroll .
     *
     */
    clearScrollInterval() {
        window.clearInterval(this._scrollingInterval);
        this._scrollingInterval = null;
    }

    /**
     * Clears the timeouts to avoid summarize inconsistencies.
     *
     */
    clearSummarizeTimeouts() {
        if (this._summaryTimeoutsId.length > 0) {
            this._summaryTimeoutsId.forEach((timeout) => {
                window.clearTimeout(timeout);
            });

            setTimeout(() => {
                this.template
                    .querySelectorAll('[data-element-id="summarize"]')
                    .forEach((summarize, i) => {
                        summarize.value = this.truncateNumber(
                            this._summarizeValues[i]
                        );
                    });
            }, 0);

            this._summaryTimeoutsId = [];
        }
    }

    /**
     *
     * Computes the scroll step depending on the mouse position
     * @param {number} currentX Current x position of the dragged tile
     * @param {number} currentY Current y position of the dragged tile
     * @returns {object} scrollStep
     */
    computeScrollStep(currentX, currentY) {
        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        let scrollStep = {
            x: 0,
            y: 0
        };

        // Pixel tolerance proportional to the dimensions of the container
        const dx = Math.ceil(fieldContainer.clientWidth * 0.05);
        const dy = Math.ceil(fieldContainer.clientHeight * 0.05);
        const left =
            fieldContainer.getBoundingClientRect().left +
            fieldContainer.scrollLeft;
        const right = fieldContainer.clientWidth + left;

        const isCloseToBottom = currentY + dy > this._kanbanPos.bottom;
        const isCloseToTop = currentY - 2 * dy < this._kanbanPos.top;
        const isCloseToRight = currentX + dx > right;
        const isCloseToLeft = currentX - dx < left;

        if (isCloseToBottom) {
            scrollStep.y = 10;
        } else if (isCloseToTop) {
            scrollStep.y = -10;
        }

        if (isCloseToRight) {
            scrollStep.x = 10;
        } else if (isCloseToLeft) {
            scrollStep.x = -10;
        }

        scrollStep.y = this._draggedGroup ? 0 : scrollStep.y;

        return scrollStep;
    }

    /**
     * Creates space in the group for the dragged tile
     *
     */
    createTileSpace() {
        const currentGroupTiles = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        // Sets the right paddingBottom on the group to create space for the dragged tile
        currentGroupTiles.forEach((group, i) => {
            if (this._draggedTile && !this._hasSubGroups) {
                const paddingBottom =
                    this._releasedGroupIndex === i
                        ? this._draggedTile.offsetHeight
                        : 0;
                group.style.paddingBottom = `${paddingBottom}px`;
            }
        });
    }

    cropSubGroupHeaders() {
        if (this._hideHeader && this._hasSubGroups && !this.isLoading) {
            const subGroupHeaders = Array.from(
                this.template.querySelectorAll(
                    "[data-element-id='avonni-kanban__expandable_section_header']"
                )
            );
            subGroupHeaders.forEach((header) => {
                header.style.top = '0px';
            });
        }
    }

    /**
     *
     * Displays the dropzone of the tile, or the dropzone of the group
     * @param {number} offsetHeight Cumulated height of the tiles above the dropzone
     * @param {number} offsetCount Number of tiles above the dropzone
     */
    displayDropzone(offsetHeight, offsetCount) {
        this.template
            .querySelectorAll(
                '[data-element-id="avonni-kanban__tile_dropzone"]'
            )
            .forEach((zone) => {
                zone.style.height = `0px`;
                zone.style.width = `0px`;
            });
        const summarizeHeight =
            this.hideHeader || this._hasSubGroups
                ? 0
                : this.template.querySelectorAll(
                      '[data-element-id="avonni-kanban__summarize_wrapper"]'
                  )[this._releasedGroupIndex].offsetHeight;

        const groupSelector = this._hasSubGroups
            ? `[data-dropzone-subgroup="${this._currentSubGroup}"]`
            : '[data-element-id="avonni-kanban__tile_dropzone"]';

        const dropZone =
            this.template.querySelectorAll(groupSelector)[
                this._releasedGroupIndex
            ];

        const tilesContainer = this.template.querySelectorAll(
            this._hasSubGroups
                ? `[data-subgroup-name="${this._currentSubGroup}"]`
                : '[data-element-id="avonni-kanban__group"]'
        )[this._releasedGroupIndex];

        // Distance from the top of the field
        const offsetTop = `calc(${
            offsetHeight + summarizeHeight - tilesContainer.scrollTop
        }px + 0.25rem + ${0.5 * offsetCount}rem)`;
        dropZone.style.height = `${this._draggedTile.offsetHeight}px`;
        dropZone.style.width = `calc(${this._draggedTile.offsetWidth}px - 1rem)`;
        dropZone.style.top = offsetTop;

        const rem = parseFloat(getComputedStyle(this.template.host).fontSize);
        const topDistance =
            0.62 * rem * offsetCount +
            offsetHeight +
            summarizeHeight -
            tilesContainer.scrollTop +
            0.38 * rem;

        // clips the dropzone so that it doesnt overflow on the summarize field or on the footer actions
        dropZone.style.clipPath = `inset(0)`;
        if (topDistance < summarizeHeight) {
            dropZone.style.clipPath = `inset(${Math.abs(
                topDistance - summarizeHeight
            )}px 0 0 0)`;
        } else if (
            topDistance + this._draggedTile.offsetHeight >
            summarizeHeight + tilesContainer.offsetHeight
        ) {
            dropZone.style.clipPath = `inset(0 0 ${
                topDistance +
                this._draggedTile.offsetHeight -
                summarizeHeight -
                tilesContainer.offsetHeight
            }px 0)`;
        }
    }

    /**
     * Ends the drag and drop
     *
     */
    endDrag() {
        this.handleTileDrop();
        this._droppedTileHeight = this._draggedTile.offsetHeight;

        this._draggedTile.style.transform = '';
        this._draggedTile.style.width = 'calc(100% - 1rem)';
        this._draggedTile.classList.remove('avonni-kanban__dragged');
        this._draggedTile = null;
        this._currentSubGroup = '';
        this._scrollOffset = 0;

        window.clearInterval(this._scrollingInterval);
        this._scrollingInterval = null;

        // removes the translation on all tiles
        const groupElements = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        Array.from(groupElements).forEach((group) => {
            group.style.paddingBottom = '0px';
            Array.from(group.children).forEach((tile) => {
                tile.classList.remove('avonni-kanban__tile_moved');
                tile.style.transform = `translateY(0px)`;
            });
        });

        // Hides the dropzone
        this.template
            .querySelectorAll(
                '[data-element-id="avonni-kanban__tile_dropzone"]'
            )
            .forEach((zone) => {
                zone.style.height = `0px`;
                zone.style.width = `0px`;
            });
    }

    /**
     * Finds the tile element in the DOM corresponding to the record
     * @param {object} tile
     * @returns {HTMLElement}
     */
    findTileElement(tile) {
        const tiles = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__tile"]'
        );

        return tiles.find(
            (tileElement) => tileElement.dataset.recordIndex === tile.index
        );
    }

    /**
     * Actionclick handler.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        const recordAction = this._records.find((record) => {
            return record[this.keyField] === event.target.dataset.keyField;
        });

        const actionName =
            event.detail.value || event.currentTarget.dataset.name;
        const keyField = event.currentTarget.dataset.keyField;
        const group =
            event.currentTarget.dataset.group ||
            recordAction[this.groupFieldName];

        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} targetKeyField Unique data keyField value.
         * @param {string} groupValue Group value the action belongs to.
         * @param {string} name Unique name of the action.
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    targetKeyField: keyField,
                    groupValue: group
                },
                bubbles: true
            })
        );
    }

    /**
     * Scrolls the right item when autoscroll is needed
     * @param {object} scrollStep The coordinates to scrollBy
     * @param {HTMLElement} fieldContainer The field to scroll
     * @param {HTMLElement[]} groups The groups containing the tiles
     *
     */
    handleAutoScrollInterval(scrollStep, fieldContainer, groups) {
        // Prevents from scrolling outside of the kanban
        const tolerance = 5;
        const dy = scrollStep.y < 0 ? scrollStep.y : 0;
        const dx = scrollStep.x < 0 ? scrollStep.x : 0;
        const scrollHeight =
            fieldContainer.scrollTop + fieldContainer.clientHeight + dy;
        const scrollWidth =
            fieldContainer.scrollLeft + fieldContainer.clientWidth + dx;
        const overflowY = scrollHeight > this._initialScrollHeight + tolerance;
        const overflowX = scrollWidth > this._initialScrollWidth + tolerance;

        if (!overflowX && (!overflowY || !this._hasSubGroups)) {
            this._currentScrollTarget.scrollLeft += scrollStep.x;
            this._currentScrollTarget.scrollTop += scrollStep.y;
            scrollStep.x =
                this._currentScrollTarget.scrollLeft === 0 && scrollStep.x < 0
                    ? 0
                    : scrollStep.x;
            scrollStep.y =
                this._currentScrollTarget.scrollTop === 0 && scrollStep.y < 0
                    ? 0
                    : scrollStep.y;
            this.translateByDelta(scrollStep);
            this.handleDropZone({
                currentTarget: this._draggedTile,
                clientX: this._currentXScroll
            });
        }
        this.handleScrollTiles(groups, this._currentScrollTarget.scrollTop);
    }

    /**
     *
     *  Moves the tiles down when the dragged tile is hovering over
     *
     * @param {Event} event
     */
    handleDropZone(event) {
        if (event.currentTarget !== this._draggedTile) {
            return;
        }

        this.updateReleasedGroupIndex(event);

        const groupSelector = this._hasSubGroups
            ? `[data-subgroup-name="${this._currentSubGroup}"]`
            : '[data-element-id="avonni-kanban__group"]';
        const groupElements = this.template.querySelectorAll(groupSelector);

        if (isNaN(this._releasedGroupIndex) || !this._releasedGroupIndex) {
            this._releasedGroupIndex = 0;
        }

        if (this._draggedTile) {
            this.updateReleasedTileIndex(groupElements);
            this.animateTiles(groupElements);
        }
    }

    /**
     *
     *  Toggles the visibility of a subgroup
     *
     * @param {Event} event
     */
    handleExpandableSectionClick(event) {
        const expandableSection = event.target.closest(
            '[data-element-id="avonni-kanban__expandable_section"]'
        );

        if (!expandableSection) {
            return;
        }

        expandableSection.classList.toggle(
            'avonni-kanban__expandable_section_collapsed'
        );

        this.capFieldHeight();
    }

    /**
     *
     *  Starts the drag of a list
     *
     * @param {Event} event
     */
    handleGroupMouseDown(event) {
        if (
            this._variant !== 'base' ||
            this._disableColumnDragAndDrop ||
            event.button !== 0
        ) {
            return;
        }

        this.computeGroupScrollTop();

        const groupSelector = this._hasSubGroups
            ? 'avonni-kanban__group_header'
            : 'avonni-kanban__field';

        // this handles when the user dragged a group out of the kanban, and released his click.
        // a second click on the dragged group (impossible otherwise) behaves has a click release
        if (event.currentTarget.parentElement === this._draggedGroup) {
            this.handleGroupMouseUp();
            return;
        }

        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        this._groupWidth = event.currentTarget.offsetWidth;

        const expandableContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__expandable_container"]'
        );

        // Sets the offset of the mouse click depending of the group
        this._clickOffset.x =
            event.clientX - event.currentTarget.getBoundingClientRect().x;
        this._clickOffset.y =
            event.clientY - event.currentTarget.getBoundingClientRect().y;

        this._initialPos.x =
            event.currentTarget.getBoundingClientRect().x +
            fieldContainer.scrollLeft;
        this._initialPos.y =
            event.currentTarget.getBoundingClientRect().y +
            (this._hasSubGroups ? expandableContainer.scrollTop : 0);

        this._clickedGroupIndex = Array.from(
            this.template.querySelectorAll(
                `[data-element-id="${groupSelector}"]`
            )
        ).indexOf(
            this._hasSubGroups
                ? event.currentTarget
                : event.currentTarget.parentElement
        );

        this._releasedGroupIndex = this._clickedGroupIndex;
        this._draggedGroup = event.currentTarget.parentElement;
        this._draggedGroup.classList.add('avonni-kanban__dragged_group');
    }

    /**
     *
     *  Handles the drag of a list
     *
     * @param {Event} event
     */
    handleGroupMouseMove(event) {
        if (!this._draggedGroup) {
            return;
        }

        const groupSelector = this._hasSubGroups
            ? 'avonni-kanban__group_header'
            : 'avonni-kanban__field';

        this.updateReleasedGroupIndex(event);

        const groups = this.template.querySelectorAll(
            `[data-element-id="${groupSelector}"]`
        );

        groups.forEach((group, i) => {
            group = this._hasSubGroups ? group.parentElement : group;
            if (group !== this._draggedGroup) {
                group.classList.add('avonni-kanban__field_moved');
            }
            if (
                this._releasedGroupIndex <= i &&
                this._clickedGroupIndex > i &&
                group !== this._draggedGroup
            ) {
                group.classList.add('avonni-kanban__translate_right');
            } else if (
                this._releasedGroupIndex >= i &&
                this._clickedGroupIndex < i &&
                group !== this._draggedGroup
            ) {
                group.classList.add('avonni-kanban__translate_left');
            } else {
                group.classList.remove('avonni-kanban__translate_right');
                group.classList.remove('avonni-kanban__translate_left');
            }
        });

        const remToPx = parseFloat(
            getComputedStyle(this.template.host).fontSize
        );

        const dropZone = this.template.querySelector(
            '[data-element-id="avonni-kanban__group_dropzone"]'
        );
        const groupDropZone = this._hasSubGroups
            ? groups[this._clickedGroupIndex].parentElement
            : groups[this._clickedGroupIndex];
        dropZone.style.height = `${groupDropZone.offsetHeight}px`;
        dropZone.style.width = `${groupDropZone.offsetWidth}px`;
        dropZone.style.transform = `translateX(calc(${
            (groupDropZone.offsetWidth + 0.625 * remToPx) *
            this._releasedGroupIndex
        }px - 0.3125rem))`;
    }

    /**
     *
     *  Handles the end of the drag of a list
     *
     */
    handleGroupMouseUp() {
        if (!this._draggedGroup) {
            return;
        }
        this.swapGroups();
        this.clearScrollInterval();

        const groupSelector = this._hasSubGroups
            ? 'avonni-kanban__group_header'
            : 'avonni-kanban__field';

        const groups = this.template.querySelectorAll(
            `[data-element-id="avonni-kanban__group"]`
        );

        groups.forEach((group, i) => {
            group.scrollTop = this._groupsScrollTop[i];
        });

        this._draggedGroup.style.transform = '';
        this._draggedGroup.classList.remove('avonni-kanban__dragged_group');
        this._draggedGroup = null;
        this.template
            .querySelectorAll(`[data-element-id="${groupSelector}"]`)
            .forEach((group) => {
                group = this._hasSubGroups ? group.parentElement : group;
                group.classList.remove('avonni-kanban__translate_left');
                group.classList.remove('avonni-kanban__translate_right');
                group.classList.remove('avonni-kanban__field_moved');
            });

        const groupDropZone = this.template.querySelector(
            '[data-element-id="avonni-kanban__group_dropzone"]'
        );
        groupDropZone.style.height = `0px`;
        groupDropZone.style.width = `0px`;
    }

    /**
     *
     * Prevents dragging from a dropdown menu
     * @param {Event} event
     *
     */
    handleMenuClick(event) {
        event.stopPropagation();
    }

    /**
     * Prevent event default handler.
     *
     * @param {Event} event
     */
    handlePreventDefault(event) {
        event.preventDefault();
    }

    /**
     *
     * Animates the tiles when autoscrolling
     * @param {HTMLElement[]} groups Groups containing the tiles to translate
     * @param {number} scrollTop The scrollTop value
     *
     */
    handleScrollTiles(groups, scrollTop) {
        if (this._draggedTile && this._hasSubGroups) {
            this._scrollOffset = scrollTop - this._initialContainerScrollTop;
        } else {
            this._scrollOffset = 0;
        }
        if (this._draggedTile) {
            this.animateTiles(groups);
        }
    }

    /**
     *
     * Finds the index of initial and final position of the dragged tile
     *
     */
    handleTileDrop() {
        const beforeTile = this.tileRecordFinder(
            this._releasedTileIndex,
            this._releasedGroupIndex
        );

        const currentTile = this.tileRecordFinder(
            this._initialTileIndex,
            this._clickedGroupIndex,
            true
        );

        const currentIndex = this._records.indexOf(currentTile);
        const beforeIndex = this._records.indexOf(beforeTile) + 1;

        this._records = this.swapRecords(currentIndex, beforeIndex);
        this.updateTiles();
    }

    /**
     *
     *  Sets the position and the index of the initial position of the dragged tile.
     *  Starts drag.
     *
     * @param {Event} event
     */
    handleTileMouseDown(event) {
        event.preventDefault();
        // this handles when the user dragged a tile out of the kanban, and released his click.
        // a second click on the dragged tile (impossible otherwise) behaves has a click release
        if (event.currentTarget === this._draggedTile) {
            this.handleTileMouseUp(event);
            return;
        }

        this._initialContainerScrollTop = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        ).scrollTop;

        this._clickOffset.x =
            event.clientX - event.currentTarget.getBoundingClientRect().x;
        this._clickOffset.y =
            event.clientY - event.currentTarget.getBoundingClientRect().y;

        if (
            this.disableItemDragAndDrop ||
            event.target.classList.contains('slds-dropdown-trigger') ||
            event.button !== 0
        ) {
            return;
        }

        const rem = parseFloat(getComputedStyle(this.template.host).fontSize);

        this._groupWidth =
            event.currentTarget.parentElement.offsetWidth + 0.5 * rem;

        this._groupWidth =
            this._groupWidth && !isNaN(this._groupWidth)
                ? this._groupWidth
                : 10;

        this._clickedGroupIndex = event.currentTarget.dataset.groupIndex;

        const clickedGroup = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        )[this._clickedGroupIndex];
        const initialGroupScroll = clickedGroup.scrollTop;

        this._draggedTile = event.currentTarget;
        this._draggedTile.classList.add('avonni-kanban__dragged');
        this._draggedTile.style.width = `calc(${parseInt(
            this._groupWidth,
            10
        )}px - 1rem`;

        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        const expandableContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__expandable_container"]'
        );

        // Sets the initial pos of the tile to be dragged
        this._initialPos.x =
            event.currentTarget.getBoundingClientRect().x +
            fieldContainer.scrollLeft;
        this._initialPos.y =
            event.currentTarget.getBoundingClientRect().y +
            (this._hasSubGroups ? expandableContainer.scrollTop : 0);

        this._currentSubGroup = this._draggedTile.dataset.subgroup;

        const groupSelector = this._hasSubGroups
            ? `[data-subgroup-name="${this._currentSubGroup}"]`
            : '[data-element-id="avonni-kanban__group"]';

        const parentGroup =
            this.template.querySelectorAll(groupSelector)[
                this._clickedGroupIndex
            ];

        this._initialTileIndex = Array.from(parentGroup.children).indexOf(
            this._draggedTile
        );

        this._releasedGroupIndex = this._clickedGroupIndex;

        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );
        // Calculates the height of each group

        groups.forEach((group, i) => {
            this._groupsHeight[i] = group.offsetHeight;
        });

        this._draggedTile.style.transform = `rotate(3deg)`;

        this.handleTileMouseMove(event);

        this.createTileSpace();
        clickedGroup.scrollTop = initialGroupScroll;

        this.handleDropZone(event);
        this.handleTileMouseMove(event);
    }

    /**
     *
     * Drags the tile
     *
     * @param {Event} event
     */
    handleTileMouseMove(event) {
        if (!this._draggedTile && !this._draggedGroup) {
            return;
        }

        const mousePos = this.capMousePos(event);

        if (this._draggedGroup) {
            this.handleGroupMouseMove(event);
        }

        this.translateToPos(mousePos);

        this.createTileSpace();
        this.autoScroll(mousePos.x, mousePos.y);
    }

    /**
     *
     * Sets the dragged tile in the right position in the records array.
     * Ends drag.
     *
     * @param {Event} event
     */
    handleTileMouseUp(event) {
        if (
            this.disableItemDragAndDrop ||
            event.currentTarget !== this._draggedTile
        ) {
            return;
        }
        this.clearScrollInterval();
        this.endDrag();
    }

    /**
     * Returns whether the group has subgroups or not.
     *
     * @type {boolean}
     */
    hasSubGroups() {
        this._records.forEach((record) => {
            if (record[this.subGroupFieldName]) {
                this._hasSubGroups = true;
            }
        });
        return this._hasSubGroups;
    }

    /**
     * Updates the groups to separate tiles and calculate the summary values.
     */
    updateTiles() {
        if (!this.hideHeader) {
            this.clearSummarizeTimeouts();
        }
        const kanbanGroupsBuilder = new KanbanGroupsBuilder({
            groupValues: this._groupValues,
            records: this._records,
            groupFieldName: this.groupFieldName,
            summarizeAttributes: this.summarizeAttributes,
            subGroupFieldName: this.subGroupFieldName,
            keyField: this.keyField,
            cardAttributes: this.cardAttributes
        });
        if (this._computedGroups.length === 0) {
            this._groupValues.forEach((_, i) => {
                this._oldSummarizeValues[i] = 0;
            });
        } else {
            this._computedGroups.forEach((group, i) => {
                this._oldSummarizeValues[i] = group.summarize.value
                    ? group.summarize.value
                    : 0;
            });
        }

        this._computedGroups = kanbanGroupsBuilder.computeGroups();
        this._hasSubGroups = kanbanGroupsBuilder.hasSubGroups;
        this._currentSubGroupIndex = 0;

        this._computedGroups.forEach((group, i) => {
            this._summarizeValues[i] = group.summarize.value
                ? this.truncateNumber(group.summarize.value)
                : 0;
            if (!this.hideHeader) this.animateSummary(group);
        });
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        const container = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );
        if (!container) {
            return null;
        }

        return new AvonniResizeObserver(container, () => {
            this._scrollWidth = this.template.querySelector(
                '[data-element-id="avonni-kanban__container"]'
            ).scrollWidth;

            this.capFieldHeight();
            this.capFieldWidth();
            this.capContainerWidth();
            this.setContainerDimensions();

            const { x, y } = this.getBoundingClientRect();
            this._kanbanOffset = { x, y };
        });
    }

    /**
     *
     * Resets the translate animations on the tiles and limits the height of the groups
     *
     * @param {object[]} groups Groups containing the tiles
     */
    resetAnimations(groups) {
        let offsetHeight = 0;
        let offsetCount = 0;

        // resets animations
        Array.from(groups).forEach((group, i) => {
            // removes the translation on the other tiles
            Array.from(group.children)
                .filter((child) => child !== this._draggedTile)
                .forEach((tile, j) => {
                    if (
                        i !== this._releasedGroupIndex ||
                        j < this._releasedTileIndex
                    ) {
                        tile.classList.remove('avonni-kanban__tile_moved');
                        tile.style.transform = `translateY(0px)`;
                    }

                    if (
                        i === this._releasedGroupIndex &&
                        j < this._releasedTileIndex
                    ) {
                        offsetHeight += tile.offsetHeight;
                        offsetCount++;
                    }
                });
        });

        this.displayDropzone(offsetHeight, offsetCount);
    }

    /**
     *
     * Determines the scroll dimensions of the container for drag and drop translate calculations.
     *
     */
    setContainerDimensions() {
        if (this.isLoading) return;

        this.template
            .querySelectorAll(
                '[data-element-id="avonni-kanban__field_container"]'
            )
            .forEach((fieldContainer, i) => {
                this._subGroupsHeight[i] = fieldContainer.scrollHeight;
            });
        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__field_container"]'
        );
        this._initialScrollWidth = fieldContainer
            ? fieldContainer.scrollWidth
            : 0;
        if (this._hasSubGroups) {
            this._initialScrollHeight = this.template.querySelector(
                '[data-element-id="avonni-kanban__container"]'
            ).scrollHeight;
        }
    }

    /**
     *
     * computes the right scrollTop to the groups after a swap.
     *
     */
    computeGroupScrollTop() {
        const kanbanGroups = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        Array.from(kanbanGroups).forEach((group, i) => {
            this._groupsScrollTop[i] = group.scrollTop;
        });
    }

    /**
     *
     * Swaps the groups after a drag and drop, in all the group-related arrays
     */
    swapGroups() {
        const groups = JSON.parse(JSON.stringify(this._groupValues));
        const groupValue = groups[this._clickedGroupIndex].value;
        groups.splice(
            this._releasedGroupIndex,
            0,
            groups.splice(this._clickedGroupIndex, 1)[0]
        );
        this._groupValues = groups;

        const groupArrays = [
            this._oldSummarizeValues,
            this._summarizeValues,
            this._groupsHeight,
            this._groupsLength,
            this._fieldsDistance,
            this._computedGroups,
            this._groupsScrollTop
        ];

        // Swaps groups in every group-related array
        groupArrays.forEach((array) => {
            array.splice(
                this._releasedGroupIndex,
                0,
                array.splice(this._clickedGroupIndex, 1)[0]
            );
        });

        /**
         * The event fired when a column is moved from a position to another.
         *
         * @event
         * @name columnchange
         * @param {number} index Index of the final position of the column.
         * @param {string} name Value of the column.
         * @param {object[]} groupValues New group values of the Kanban.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('columnchange', {
                detail: {
                    index: this._releasedGroupIndex,
                    name: groupValue,
                    groupValues: this._groupValues
                }
            })
        );

        this.updateTiles();
    }

    /**
     *
     * Moves the dragged tile at the right index in the record array and updates the group field value.
     * @param {number} fromIndex Index of the initial position of the tile
     * @param {number} toIndex Index of the final position of the tile
     * @returns {object[]} The array with swapped records
     */
    swapRecords(fromIndex, toIndex) {
        if (toIndex < 0 || fromIndex < 0) {
            return this.records;
        }
        const arr = JSON.parse(JSON.stringify(this._records));
        arr[fromIndex][this.groupFieldName] =
            this._groupValues[this._releasedGroupIndex].value;
        this._groupsLength[this._clickedGroupIndex]--;
        this._groupsLength[this._releasedGroupIndex]++;

        arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);

        /**
         * The event fired when a card is moved from a step to another.
         *
         * @event
         * @name change
         * @param {string} keyField Value of the record’s key field.
         * @param {string} groupValue Value of the group the data card has been moved to.
         * @param {object[]} records New records of the Kanban.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    keyField: this._draggedTile.dataset.recordIndex,
                    groupValue:
                        this._groupValues[this._releasedGroupIndex].value,
                    records: arr
                }
            })
        );

        return arr;
    }

    /**
     *
     * Finds a tile in the record array depending of it's index and it's group
     * @param {number} tileIndex Index of the tile
     * @param {number} groupIndex Index of the group
     * @param {boolean} isCurrent Indicates if group is the current group. Defaults to false.
     */
    tileRecordFinder(tileIndex, groupIndex, isCurrent = false) {
        let tileCount = isCurrent ? -1 : 0;
        return this._records.find((record) => {
            if (
                record[this.groupFieldName] ===
                    this._groupValues[groupIndex].value &&
                record[this.subGroupFieldName] === this._currentSubGroup
            ) {
                tileCount++;
            }
            return (
                tileCount === tileIndex &&
                record[this.groupFieldName] ===
                    this._groupValues[groupIndex].value &&
                record[this.subGroupFieldName] === this._currentSubGroup
            );
        });
    }

    /**
     *
     * Translates the dragged item by the given amount.
     * @param {object} delta Amount of pixels to translate the dragged item
     */
    translateByDelta(delta) {
        const draggedItem = this._draggedTile
            ? this._draggedTile
            : this._draggedGroup;
        const style = window.getComputedStyle(draggedItem);
        const matrixValues = style.transform
            .match(/matrix.*\((.+)\)/)[1]
            .split(', ');
        const currentTranslate = {
            translateX: parseFloat(matrixValues[4]),
            translateY: parseFloat(matrixValues[5])
        };
        draggedItem.style.transform = `translateX(${
            currentTranslate.translateX + delta.x
        }px) translateY(${
            currentTranslate.translateY + (this._hasSubGroups ? delta.y : 0)
        }px) rotate(3deg)`;
    }

    /**
     *
     * Translates the dragged item to a new pos.
     * @param {object} delta Amount of pixels to translate the dragged item
     */
    translateToPos(pos) {
        if (this._draggedTile) {
            // Sets the position of the dragged tile
            this._draggedTile.style.transform = `translate(${
                pos.x - this._initialPos.x - this._clickOffset.x
            }px, ${
                pos.y -
                this._initialPos.y -
                this._clickOffset.y +
                this._scrollOffset
            }px) rotate(3deg)`;
        }
        if (this._draggedGroup) {
            // Sets the position of the dragged group
            this._draggedGroup.style.transform = `translate(${
                pos.x - this._initialPos.x - this._clickOffset.x
            }px, ${
                pos.y - this._initialPos.y - this._clickOffset.y
            }px) rotate(3deg)`;
        }
    }

    /**
     *
     * Truncates a number to handle floatting point errors (4.500000000000000003 for example)
     * @param {number} num Number to truncate
     */
    truncateNumber(num) {
        return Math.round(num * 1e6) / 1e6;
    }

    /**
     *
     *  Updates the released group index depending on the scroll position
     * @param {Event} event
     */
    updateReleasedGroupIndex(event) {
        const remToPx = parseFloat(
            getComputedStyle(this.template.host).fontSize
        );
        const scrolledWidth =
            this.template.querySelector(
                '[data-element-id="avonni-kanban__container"]'
            ).scrollLeft - this._kanbanOffset.x;

        const scrolledGroupsCount = scrolledWidth / this._groupWidth;

        const mouseHoveringGroup =
            (event.clientX + 0.5 * remToPx) / this._groupWidth;

        this._releasedGroupIndex = Math.min(
            Math.trunc(mouseHoveringGroup + scrolledGroupsCount),
            this.groupValues.length - 1
        );
    }

    /**
     *
     *  Updates the released tile index depending on the scroll position and tiles hovered
     * @param {HTMLElement[]} groupElements Groups containing the tiles
     */
    updateReleasedTileIndex(groupElements) {
        let offsetHeight = this._kanbanOffset.y;

        const currentGroupTiles = Array.from(
            groupElements[this._releasedGroupIndex].children
        );
        let scrolledHeight = 0;

        let isScrolled = false;

        // calculates the index of the drop, depending on the previous tiles heights
        for (let [i, tile] of currentGroupTiles.entries()) {
            // if the group is scrolled, the kanban's offset isn't influencing the index
            if (!isScrolled && scrolledHeight > 0) {
                offsetHeight -= this._kanbanOffset.y;
                isScrolled = true;
            }
            const tileIncrementMultiplier =
                this._releasedGroupIndex === this._clickedGroupIndex ? 1 : -1;

            const rem = parseFloat(
                getComputedStyle(this.template.host).fontSize
            );
            offsetHeight += tile.offsetHeight + rem;
            this._releasedTileIndex = i;
            if (
                groupElements[this._releasedGroupIndex].scrollTop > offsetHeight
            ) {
                scrolledHeight += tile.offsetHeight + rem;
            }

            // Doesn't count the dragged tile in the index
            if (this._clickedGroupIndex === this._releasedGroupIndex) {
                this._releasedTileIndex--;
            }
            if (
                this._draggedTile.getBoundingClientRect().y +
                    scrolledHeight +
                    tileIncrementMultiplier *
                        (this._draggedTile.offsetHeight / 2) <
                offsetHeight - tile.offsetHeight / 2
            ) {
                break;
            } else {
                this._releasedTileIndex++;
            }
        }
        if (this._releasedTileIndex < 0 || currentGroupTiles.length === 0) {
            this._releasedTileIndex = 0;
        }
    }
}

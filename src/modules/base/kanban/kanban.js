/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api } from 'lwc';
import { AvonniResizeObserver } from 'c/resizeObserver';

import { classSet } from 'c/utils';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import KanbanGroups from './group';

const KANBAN_VARIANTS = {
    valid: ['base', 'path'],
    default: 'base'
};

/**
 * @class
 * @storyId example-kanban--base
 * @descriptor avonni-kanban
 * @public
 */
export default class Kanban extends LightningElement {
    _actions = [];
    _fields = [];
    _groupValues = [];
    _groupFieldName;
    _isLoading = false;
    _disableItemDragAndDrop = false;
    _disableColumnDragAndDrop = false;
    _hideHeader = false;
    _records = [];
    _summarizeFieldName;

    _clickedGroupIndex = 0;
    _clickOffset = { x: 0, y: 0 };
    _draggedTile;
    _draggedGroup;
    _droppedTileHeight = 0;
    _fieldsDistance = [];
    _groupsHeight = [];
    _groupsLength = [];
    _groupWidth = 1;
    _initialPos = { x: 0, y: 0 };
    _initialScrollWidth = 0;
    _initialTileIndex = 0;
    _isDragged = false;
    _kanbanPos = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    _oldSummarizeValues = [];
    _releasedGroupIndex = 0;
    _releasedTileIndex = 0;
    _resizeObserver;
    _scrollingInterval;
    _scrollWidth = 0;
    _summaryTimeoutsId = [];
    _summarizeValues = [];

    SUMMARY_UPDATE_SPEED = 300;

    renderedCallback() {
        if (!this._resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

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
    }

    /**
     * Array of field objects, used to define the allowed data fields.
     *
     * @type {object[]}
     * @public
     */
    @api
    get fields() {
        return this._fields;
    }
    set fields(values) {
        this._fields = normalizeArray(values);
    }

    /**
     * Name of the data field containing the group label the data belongs to.
     *
     * @type {string}
     * @public
     */
    @api groupFieldName;

    /**
     * Name of the field containing the cover image of the tile.
     * @type {string}
     * @public
     */
    @api coverImageFieldName;

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
     * Array of data objects. Each object will be displayed as a data card in one of the steps.
     * The objects should have a key <code>id</code>, used as their unique identifier. The other keys should correspond to the available fields, and/or the summarize and group field names.
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
    }

    /**
     *
     * Name of the data field containing the number to add to the group summarization, at the top of each column.
     *
     * @type {string}
     * @public
     */
    @api summarizeFieldName;

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
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Inits the groups to separate tiles and calculate the summary values.
     *
     * @type {object[]}
     */
    get initGroups() {
        if (!this.hideHeader) this.clearSummarizeTimeouts();
        const kanbanGroup = new KanbanGroups({
            groupValues: this._groupValues,
            summarizeValues: this._summarizeValues,
            oldSummarizeValues: this._oldSummarizeValues,
            records: this._records,
            fields: this._fields,
            groupFieldName: this.groupFieldName,
            summarizeFieldName: this.summarizeFieldName,
            coverImageFieldName: this.coverImageFieldName
        });
        const computedGroups = kanbanGroup.computeGroups();

        this._summarizeValues = kanbanGroup._summarizeValues;
        this._oldSummarizeValues = kanbanGroup._oldSummarizeValues;

        computedGroups.forEach((group) => {
            if (!this.hideHeader) this.animateSummary(group);
            // Set the right background color on each group
            const defaultBackgroundColor =
                this.variant === 'path' ? '#ffffff' : '#fcfcfc';
            requestAnimationFrame(() => {
                if (
                    this.variant === 'path' &&
                    group.pathColor &&
                    !this.hideHeader
                ) {
                    /* eslint-disable no-unexpected-multiline */

                    this.template
                        .querySelectorAll(
                            '[data-element-id="avonni-kanban__path_item"]'
                        )
                        [group.index].setAttribute(
                            'style',
                            `background:${group.pathColor} !important`
                        );
                }
                this.template.querySelectorAll(
                    '[data-element-id="avonni-kanban__field"]'
                )[group.index].style.background = group.backgroundColor
                    ? group.backgroundColor
                    : defaultBackgroundColor;
            });
        });

        this.displayCoverImage(computedGroups);
        requestAnimationFrame(() => {
            this.capFieldHeight();
            this._initialScrollWidth = this.template.querySelector(
                '[data-element-id="avonni-kanban__field_container"]'
            ).scrollWidth;
        });

        return computedGroups;
    }

    /**
     * Gets the class of the group depending on readOnly
     *
     * @type {string}
     */
    get computedFieldClass() {
        return classSet(
            'avonni-kanban__field slds-p-vertical_x-small slds-col slds-is-relative'
        ).add({
            'avonni-kanban__field_disabled_column_drag':
                this.disableColumnDragAndDrop,
            'slds-m-around_xx-small': this.variant === 'base'
        });
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
     * Gets the name and the length of the groups
     *
     * @type {object[]}
     */
    get groupsHeader() {
        let computedGroups = JSON.parse(JSON.stringify(this._groupValues));

        computedGroups.forEach((group) => {
            group.tiles = [];
        });

        this._records.forEach((tile) => {
            const group = computedGroups.find(
                (computedGroup) =>
                    computedGroup.label === tile[this.groupFieldName]
            );
            if (group) {
                group.tiles.push(tile);
            }
        });

        return computedGroups;
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
     * Check if the variant is path.
     *
     * @type {boolean}
     */
    get isPath() {
        return this.variant === 'path' && !this.hideHeader;
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
                    this.disableColumnDragAndDrop
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
     * Translates down the tiles that are being hovered and updates the height of the groups
     * @param {HTMLElement[]} groups Groups containing the tiles to translate
     */
    animateTiles(groups) {
        this.capFieldHeight();

        // translates the tiles down when the dragged tile hovers over them
        const releasedChilds = Array.from(
            groups[this._releasedGroupIndex].children
        ).filter((child) => child !== this._draggedTile);
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
     * Displays the cover image if needed
     * @param {object} groups
     */
    displayCoverImage(groups) {
        groups.forEach((group) => {
            group.tiles.forEach((tile) => {
                if (tile.field.coverImage) {
                    requestAnimationFrame(() => {
                        const tileElement = this.findTileElement(tile);
                        tileElement.children[0].style.backgroundImage = `url(${tile.field.coverImage})`;
                        tileElement.children[0].style.height = `${
                            tileElement.offsetWidth * 0.75
                        }px`;
                    });
                }
            });
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

        let correspondingTile;

        tiles.forEach((tileElement) => {
            if (tileElement.dataset.recordIndex === tile.index) {
                correspondingTile = tileElement;
            }
        });

        return correspondingTile;
    }

    /**
     *
     * Updates the summary value gradually
     * @param {object} group Group containing the summary value to animate
     */
    animateSummary(group) {
        group.summarize.value = this.truncateNumber(
            this._summarizeValues[group.index]
        );
        this._groupsLength.push(group.tiles.length);
        const summarizeUpdate = this.truncateNumber(
            this._oldSummarizeValues[group.index] -
                this._summarizeValues[group.index]
        );
        if (summarizeUpdate !== 0) {
            for (let j = 0; j < this.SUMMARY_UPDATE_SPEED; j++) {
                this._summaryTimeoutsId[j] = window.setTimeout(() => {
                    const summary = this.template.querySelectorAll(
                        '[data-element-id="summarize"]'
                    )[group.index];

                    summary.value += this.truncateNumber(
                        summarizeUpdate / this.SUMMARY_UPDATE_SPEED
                    );

                    summary.value = this.truncateNumber(summary.value);
                }, 0.5 * j);
            }
        }
    }

    /**
     *
     * Autoscrolls the tiles / groups when the dragged tile is on the edge of the container
     * @param {number} currentX Current x position of the dragged tile
     * @param {number} currentY Current y position of the dragged tile
     */
    autoScroll(currentX, currentY) {
        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        const right = fieldContainer.offsetWidth + fieldContainer.scrollLeft;

        const left =
            fieldContainer.getBoundingClientRect().left +
            fieldContainer.scrollLeft;

        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        const group = groups[this._releasedGroupIndex];

        // auto scroll when the user is dragging the tile out of the list
        let scrollYStep = 0;
        if (currentY + 50 > this._kanbanPos.bottom) {
            scrollYStep = 10;
        } else if (currentY - 50 < this._kanbanPos.top) {
            scrollYStep = -10;
        }

        let scrollXStep = 0;
        if (currentX + 50 > right) {
            scrollXStep = 10;
        } else if (currentX - 50 < left) {
            scrollXStep = -10;
        }

        const toScroll = scrollXStep ? fieldContainer : group;
        scrollYStep = this._draggedGroup ? 0 : scrollYStep;
        if (
            !this._scrollingInterval &&
            (this._draggedGroup || this._draggedTile)
        ) {
            this._scrollingInterval = window.setInterval(() => {
                // Prevents from scrolling outside of the kanban
                if (
                    fieldContainer.scrollLeft + fieldContainer.offsetWidth <
                        this._initialScrollWidth ||
                    scrollYStep !== 0
                ) {
                    toScroll.scrollBy(scrollXStep, scrollYStep);
                }
                if (this._draggedTile) this.animateTiles(groups);
            }, 20);
        }

        // Resets the timeouts to stop scrolling when the user is dragging the tile inside the list / container
        if (!scrollXStep && !scrollYStep) {
            window.clearInterval(this._scrollingInterval);
            this._scrollingInterval = null;
        }
    }

    /**
     *
     * Limits the height of the fields to prevent overflow
     */
    capFieldHeight() {
        this._scrollWidth = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        ).scrollWidth;

        const fields = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__field"]'
        );
        const container = this.template.querySelector(
            '[data-element-id="avonni-kanban__field_container"]'
        );

        fields.forEach((field) => {
            if (field.offsetHeight >= container.offsetHeight) {
                field.classList.add('avonni-kanban__field_capped');
            } else {
                field.classList.remove('avonni-kanban__field_capped');
            }
        });

        this._droppedTileHeight = 0;
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
        this._kanbanPos.left = currentTarget.getBoundingClientRect().left;
        this._kanbanPos.right =
            this._kanbanPos.left + currentTarget.scrollWidth;
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
     * Creates space in the group for the dragged tile
     *
     */
    createTileSpace() {
        const currentGroupTiles = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        // Sets the right paddingBottom on the group to create space for the dragged tile
        currentGroupTiles.forEach((group, i) => {
            if (this._draggedTile) {
                const paddingBottom =
                    this._releasedGroupIndex === i
                        ? this._draggedTile.offsetHeight
                        : 0;
                group.style.paddingBottom = `${paddingBottom}px`;
            }
        });
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
        const summarizeHeight = this.hideHeader
            ? 0
            : this.template.querySelectorAll(
                  '[data-element-id="avonni-kanban__summarize_wrapper"]'
              )[this._releasedGroupIndex].offsetHeight;
        const dropZone = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__tile_dropzone"]'
        )[this._releasedGroupIndex];
        const tilesContainer = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
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

        const resizeObserver = new AvonniResizeObserver(() => {
            this._scrollWidth = this.template.querySelector(
                '[data-element-id="avonni-kanban__container"]'
            ).scrollWidth;

            this.capFieldHeight();
        });
        resizeObserver.observe(container);
        return resizeObserver;
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
         * @param {string} id Unique data id.
         * @param {string} action Unique name of the action.
         * @public
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    ...event.detail,
                    id: event.currentTarget.key,
                    action: event.currentTarget.label
                },
                composed: false,
                bubbles: true,
                cancelable: true
            })
        );
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

        this._releasedGroupIndex = Math.min(
            Math.floor(
                (event.clientX +
                    0.5 *
                        parseFloat(
                            getComputedStyle(this.template.host).fontSize
                        )) /
                    this._groupWidth +
                    this.template.querySelector(
                        '[data-element-id="avonni-kanban__container"]'
                    ).scrollLeft /
                        this._groupWidth
            ),
            this.groupValues.length - 1
        );

        const groupElements = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        this.updateReleasedTileIndex(groupElements);

        this.animateTiles(groupElements);
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

        // Sets the offset of the mouse click depending of the group
        this._clickOffset.x =
            event.clientX - event.currentTarget.getBoundingClientRect().x;
        this._clickOffset.y =
            event.clientY - event.currentTarget.getBoundingClientRect().y;

        this._initialPos.x =
            event.currentTarget.getBoundingClientRect().x +
            fieldContainer.scrollLeft;
        this._initialPos.y = event.currentTarget.getBoundingClientRect().y;

        this._clickedGroupIndex = Array.from(
            this.template.querySelectorAll(
                '[data-element-id="avonni-kanban__field"]'
            )
        ).indexOf(event.currentTarget.parentElement);
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
        this._releasedGroupIndex = Math.min(
            Math.floor(
                (event.clientX +
                    0.5 *
                        parseFloat(
                            getComputedStyle(this.template.host).fontSize
                        )) /
                    this._groupWidth +
                    event.currentTarget.parentElement.scrollLeft /
                        this._groupWidth
            ),
            this.groupValues.length - 1
        );

        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__field"]'
        );
        groups.forEach((group, i) => {
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

        const dropZone = this.template.querySelector(
            '[data-element-id="avonni-kanban__group_dropzone"]'
        );
        dropZone.style.height = `${
            groups[this._clickedGroupIndex].offsetHeight
        }px`;
        dropZone.style.width = `${
            groups[this._clickedGroupIndex].offsetWidth
        }px`;
        dropZone.style.transform = `translateX(calc(${
            (groups[this._clickedGroupIndex].offsetWidth +
                0.625 *
                    parseFloat(getComputedStyle(this.template.host).fontSize)) *
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

        this._draggedGroup.style.transform = '';
        this._draggedGroup.classList.remove('avonni-kanban__dragged_group');
        this._draggedGroup = null;
        this.template
            .querySelectorAll('[data-element-id="avonni-kanban__field"]')
            .forEach((group) => {
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
        this._groupWidth =
            event.currentTarget.parentElement.offsetWidth +
            0.5 * parseFloat(getComputedStyle(this.template.host).fontSize);

        this._groupWidth = this._groupWidth ? this._groupWidth : 10;

        this._draggedTile = event.currentTarget;
        this._draggedTile.classList.add('avonni-kanban__dragged');
        this._draggedTile.style.width = `calc(${parseInt(
            this._groupWidth,
            10
        )}px - 1rem`;

        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        // Sets the initial pos of the tile to be dragged
        this._initialPos.x =
            event.currentTarget.getBoundingClientRect().x +
            fieldContainer.scrollLeft;
        this._initialPos.y = event.currentTarget.getBoundingClientRect().y;
        this._clickedGroupIndex = Math.min(
            Math.floor(event.clientX / this._groupWidth),
            this.groupValues.length - 1
        );

        this._clickedGroupIndex += Math.floor(
            this.template.querySelector(
                '[data-element-id="avonni-kanban__container"]'
            ).scrollLeft / this._groupWidth
        );

        const parentGroup = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        )[this._clickedGroupIndex];

        this._initialTileIndex = Array.from(parentGroup.children).indexOf(
            this._draggedTile
        );
        this._releasedGroupIndex = this._clickedGroupIndex;

        // Calculates the height of each group
        this.template
            .querySelectorAll('[data-element-id="avonni-kanban__group"]')
            .forEach((group, i) => {
                this._groupsHeight[i] = group.offsetHeight;
            });

        this._draggedTile.style.transform = `rotate(3deg)`;

        this.createTileSpace();
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

        this.computeKanbanBoundaries(event.currentTarget);

        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

        // Prevents from dragging outside of the kanban
        if (this._initialScrollWidth === fieldContainer.offsetWidth) {
            fieldContainer.style.overflowX = 'hidden';
        } else {
            fieldContainer.style.overflowX = 'scroll';
        }

        // Calculates the position of the mouse depending on the kanban boundaries
        let currentY = event.clientY;
        let currentX = event.clientX + fieldContainer.scrollLeft;

        if (currentY < this._kanbanPos.top) {
            currentY = this._kanbanPos.top;
        } else if (currentY > this._kanbanPos.bottom) {
            currentY = this._kanbanPos.bottom;
        }
        if (currentX < this._kanbanPos.left) {
            currentX = this._kanbanPos.left;
        } else if (currentX > this._scrollWidth) {
            currentX = this._scrollWidth;
        }

        if (this._draggedTile) {
            // Sets the position of the dragged tile
            this._draggedTile.style.transform = `translate(${
                currentX - this._initialPos.x - this._clickOffset.x
            }px, ${
                currentY - this._initialPos.y - this._clickOffset.y
            }px) rotate(3deg)`;
        }
        if (this._draggedGroup) {
            // Sets the position of the dragged group
            this.handleGroupMouseMove(event);
            this._draggedGroup.style.transform = `translate(${
                currentX - this._initialPos.x - this._clickOffset.x
            }px, ${
                currentY - this._initialPos.y - this._clickOffset.y
            }px) rotate(3deg)`;
        }

        this.createTileSpace();
        this.autoScroll(currentX, currentY);
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
        this.endDrag();
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
     * Swaps the groups after a drag and drop, in all the group-related arrays
     */
    swapGroups() {
        const groups = JSON.parse(JSON.stringify(this._groupValues));
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
            this._fieldsDistance
        ];

        // Swaps groups in every group-related array
        groupArrays.forEach((array) => {
            array.splice(
                this._releasedGroupIndex,
                0,
                array.splice(this._clickedGroupIndex, 1)[0]
            );
        });
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
            this._groupValues[this._releasedGroupIndex].label;
        this._groupsLength[this._clickedGroupIndex]--;
        this._groupsLength[this._releasedGroupIndex]++;
        /**
         * The event fired when a card is moved from a step to another.
         *
         * @event
         * @name change
         * @param {string} id Unique data id.
         * @param {string} action Label of the group the data card has been moved to.
         * @param {object[]} records New records of the Kanban.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    id: arr[fromIndex].id,
                    action: arr[fromIndex][this.groupFieldName],
                    records: this.records
                }
            })
        );

        arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
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
                this._groupValues[groupIndex].label
            ) {
                tileCount++;
            }
            return (
                tileCount === tileIndex &&
                record[this.groupFieldName] ===
                    this._groupValues[groupIndex].label
            );
        });
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
     *  Updates the released tile index depending on the scroll position and tiles hovered
     * @param {HTMLElement[]} groupElements Groups containing the tiles
     */
    updateReleasedTileIndex(groupElements) {
        let offsetHeight = 0;
        this._releasedGroupIndex = this._releasedGroupIndex
            ? this._releasedGroupIndex
            : 0;
        const currentGroupTiles = Array.from(
            groupElements[this._releasedGroupIndex].children
        );
        let scrolledHeight = 0;

        // calculates the index of the drop, depending on the previous tiles heights
        for (let [i, tile] of currentGroupTiles.entries()) {
            const tileIncrementMultiplier =
                this._releasedGroupIndex === this._clickedGroupIndex ? 1 : -1;
            offsetHeight +=
                tile.offsetHeight +
                parseFloat(getComputedStyle(this.template.host).fontSize);
            this._releasedTileIndex = i;
            if (
                groupElements[this._releasedGroupIndex].scrollTop > offsetHeight
            ) {
                scrolledHeight +=
                    tile.offsetHeight +
                    parseFloat(getComputedStyle(this.template.host).fontSize);
            }
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
        if (this._releasedTileIndex < 0) this._releasedTileIndex = 0;
    }
}

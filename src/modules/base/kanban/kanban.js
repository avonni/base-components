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
    _clickedGroupIndex = 0;
    _clickOffset = { x: 0, y: 0 };
    _draggedTile;
    _draggedGroup;
    _droppedTileHeight = 0;
    _fields = [];
    _fieldsDistance = [];
    _groupFieldName;
    _groupValues = [];
    _groupsHeight = [];
    _groupsLength = [];
    _groupWidth = 1;
    _initialPos = { x: 0, y: 0 };
    _initialTileIndex = 0;
    _isDragged = false;
    _isLoading = false;
    _kanbanPos = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    _oldSummarizeValues = [];
    _readOnly = false;
    _records = [];
    _releasedGroupIndex = 0;
    _releasedTileIndex = 0;
    _resizeObserver;

    _scrollingY;
    _scrollingX;
    _scrollWidth = 0;
    _summarizeFieldName;
    _summaryTimeoutsId = [];
    _summarizeValues = [];

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
    @api
    get groupFieldName() {
        return this._groupFieldName;
    }
    set groupFieldName(values) {
        this._groupFieldName = normalizeString(values);
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
     * If present, the tiles are read-only and cannot be dragged by users.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
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
    @api
    get summarizeFieldName() {
        return this._summarizeFieldName;
    }
    set summarizeFieldName(value) {
        this._summarizeFieldName = normalizeString(value);
    }

    /**
     * The variant change the apparence of the kanban. Valid values include base and path. Default to base.
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

    /**
     * Wrapper div class, depending on the variant value.
     * @type {string}
     */
    get variantClass() {
        return classSet()
            .add(`avonni-kanban__variant_${this._variant}`)
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Filters the record array to remove unused fields and separates them in groups
     *
     * @type {object[]}
     */
    get computedGroups() {
        this.clearSummarizeTimeouts();

        let computedGroups = JSON.parse(JSON.stringify(this._groupValues));

        this._summarizeValues = JSON.parse(
            JSON.stringify(this._oldSummarizeValues)
        );

        // creates the group
        computedGroups.forEach((group, i) => {
            group.tiles = [];
            if (!this._summarizeValues[i]) this._summarizeValues[i] = 0;
            this._oldSummarizeValues[i] = 0;
            group.summarize = {
                value: 0,
                type: '',
                typeAttributes: {}
            };
            group.index = i;
        });
        let computedFields = [];
        // filters each record and adds it to the right group
        this._records.forEach((record, i) => {
            computedFields.push({
                index: record.id,
                group: record[this.groupFieldName],
                warningIcon: record.warningIcon,
                field: []
            });
            this._fields.forEach((field) => {
                if (JSON.stringify(record[field.fieldName])) {
                    computedFields[i].field.push({
                        label: field.label,
                        value: record[field.fieldName],
                        type: field.type,
                        typeAttributes: field.typeAttributes
                    });
                }
            });
        });

        // updates the summarize field if needed
        computedFields.forEach((tile) => {
            const group = computedGroups.find(
                (computedGroup) => computedGroup.label === tile.group
            );
            if (group) {
                group.tiles.push(tile);
                const toSummarize = tile.field.find(
                    (field) =>
                        normalizeString(field.label) ===
                        this._summarizeFieldName
                );
                if (toSummarize && typeof toSummarize.value === 'number') {
                    group.summarize.type = toSummarize.type;
                    group.summarize.typeAttributes = toSummarize.typeAttributes;
                    this._oldSummarizeValues[group.index] += toSummarize.value;
                }
            }
        });

        computedGroups.forEach((group) => {
            this.animateSummary(group);

            // Set the right background color on each group
            requestAnimationFrame(() => {
                this.template.querySelectorAll(
                    '[data-element-id="avonni-kanban__field"]'
                )[group.index].style.background = group.backgroundColor;
            });
        });

        requestAnimationFrame(() => {
            this.capFieldHeight();
        });

        return computedGroups;
    }

    /**
     * Gets the class of the group depending on readOnly
     *
     * @type {string}
     */
    get computedFieldClass() {
        return classSet('avonni-kanban__field').add({
            'avonni-kanban__field_read_only': this.readOnly
        });
    }

    /**
     * Gets the class of the tile depending on readOnly
     *
     * @type {string}
     */
    get computedTileClass() {
        return classSet('avonni-kanban__tile slds-item').add({
            'avonni-kanban__tile_read_only': this.readOnly
        });
    }

    /**
     * Check if actions exist.
     *
     * @type {boolean}
     */
    get hasActions() {
        return this.actions && this.actions.length > 0;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     *
     * Translates down the tiles that are being hovered
     * @param {HTMLElement[]} groups Groups containing the tiles to translate
     */
    animateTiles(groups) {
        const fields = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__field"]'
        );
        const container = this.template.querySelector(
            '[data-element-id="avonni-kanban__field_container"]'
        );

        fields.forEach((field, i) => {
            if (this.variant === 'base') field.style.height = 'fit-content';
            if (field.offsetHeight >= container.offsetHeight)
                field.style.height = `${container.offsetHeight}px`;

            this._fieldsDistance[i] =
                container.offsetHeight - field.offsetHeight;
        });

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
     *
     * Updates the summary value gradually
     * @param {object} group Group containing the summary value to animate
     */
    animateSummary(group) {
        const SUMMARY_UPDATE_SPEED = 300;
        group.summarize.value = this.truncateNumber(
            this._summarizeValues[group.index]
        );
        this._groupsLength.push(group.tiles.length);
        const summarizeUpdate = this.truncateNumber(
            this._oldSummarizeValues[group.index] -
                this._summarizeValues[group.index]
        );
        if (summarizeUpdate !== 0) {
            for (let j = 0; j < SUMMARY_UPDATE_SPEED; j++) {
                this._summaryTimeoutsId[j] = window.setTimeout(() => {
                    const summary = this.template.querySelectorAll(
                        '[data-element-id="summarize"]'
                    )[group.index];

                    summary.value += this.truncateNumber(
                        summarizeUpdate / SUMMARY_UPDATE_SPEED
                    );

                    summary.value = this.truncateNumber(summary.value);
                }, 0.5 * j);
            }
        }
    }

    /**
     *
     * Autoscrolls the tiles when the dragged tile is on the edge of the container
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
        if (currentY + 50 > this._kanbanPos.bottom) {
            if (!this._scrollingY && this._draggedTile)
                this._scrollingY = window.setInterval(() => {
                    group.scrollBy(0, 10);
                    this.animateTiles(groups);
                }, 20);
        } else if (currentY - 100 < this._kanbanPos.top) {
            if (!this._scrollingY && this._draggedTile)
                this._scrollingY = window.setInterval(() => {
                    group.scrollBy(0, -10);
                    this.animateTiles(groups);
                }, 20);
        } else if (currentX + 50 > right) {
            if (!this._scrollingX) {
                this._scrollingX = window.setInterval(() => {
                    if (
                        fieldContainer.scrollLeft <=
                        this._scrollWidth - fieldContainer.clientWidth
                    ) {
                        fieldContainer.scrollBy(10, 0);
                    }
                }, 15);
            }
        } else if (currentX - 50 < left) {
            if (!this._scrollingX)
                this._scrollingX = window.setInterval(() => {
                    if (fieldContainer.scrollLeft >= 0)
                        fieldContainer.scrollBy(-10, 0);
                }, 15);
        } else {
            window.clearInterval(this._scrollingY);
            this._scrollingY = null;
            window.clearInterval(this._scrollingX);
            this._scrollingX = null;
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

        const actionsContainer = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__footer_action"]'
        );

        const fields = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__field"]'
        );
        const container = this.template.querySelector(
            '[data-element-id="avonni-kanban__field_container"]'
        );

        const groupElements = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );
        const TILES_CONTAINER_OFFSET = this.variant === 'base' ? '- 75px' : '';
        Array.from(groupElements).forEach((group, i) => {
            group.style.height = 'fit-content';
            group.style.maxHeight = `calc(100% ${TILES_CONTAINER_OFFSET} - ${actionsContainer[i].offsetHeight}px)`;
        });
        fields.forEach((field, i) => {
            const hasScroll =
                groupElements[i].scrollHeight > groupElements[i].clientHeight;
            if (this.variant === 'base') field.style.height = 'fit-content';
            if (field.offsetHeight > container.offsetHeight || hasScroll)
                field.style.height = `${container.offsetHeight}px`;

            this._fieldsDistance[i] =
                container.offsetHeight - field.offsetHeight;
        });
        this._droppedTileHeight = 0;
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
                        summarize.value = this._summarizeValues[i];
                    });
            }, 0);

            this._summaryTimeoutsId = [];
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
        const increment =
            this._releasedGroupIndex === this._clickedGroupIndex &&
            this._initialTileIndex === 0
                ? 5
                : 0;
        const summarizeHeight = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__summarize_wrapper"]'
        )[this._releasedGroupIndex].offsetHeight;
        const dropZone = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__tile_dropzone"]'
        )[this._releasedGroupIndex];
        const tilesContainer = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        )[this._releasedGroupIndex];

        const offsetTop =
            8 * offsetCount +
            offsetHeight +
            summarizeHeight +
            increment -
            tilesContainer.scrollTop;

        dropZone.style.height = `${this._draggedTile.offsetHeight}px`;
        dropZone.style.width = `${this._draggedTile.offsetWidth - 5}px`;
        dropZone.style.top = `${offsetTop}px`;

        // clips the dropzone so that it doesnt overflow on the summarize field or on the footer actions
        dropZone.style.clipPath = `inset(0)`;
        if (offsetTop < summarizeHeight) {
            dropZone.style.clipPath = `inset(${Math.abs(
                offsetTop - summarizeHeight
            )}px 0 0 0)`;
        } else if (
            offsetTop + this._draggedTile.offsetHeight >
            summarizeHeight + tilesContainer.offsetHeight
        ) {
            dropZone.style.clipPath = `inset(0 0 ${
                offsetTop +
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
        this._draggedTile.style.width = 'calc(100% - 10px)';
        this._draggedTile.classList.remove('avonni-kanban__dragged');
        this._draggedTile = null;

        window.clearInterval(this._scrollingX);
        window.clearInterval(this._scrollingY);
        this._scrollingX = null;
        this._scrollingY = null;

        const actionsContainer = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__footer_action"]'
        );

        // removes the translation on all tiles
        const groupElements = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );
        const TILES_CONTAINER_OFFSET = this.variant === 'base' ? '- 75px' : '';

        Array.from(groupElements).forEach((group, i) => {
            group.style.maxHeight = `calc(100% ${TILES_CONTAINER_OFFSET} - ${actionsContainer[i].offsetHeight}px)`;

            Array.from(group.children).forEach((tile) => {
                tile.classList.remove('avonni-kanban__tile_moved');
                tile.style.transform = `translateY(0px)`;
                tile.style.marginBottom = '0px';
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
        if (!container) return null;

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
        if (event.currentTarget !== this._draggedTile) return;
        let distance =
            event.clientX -
            this._clickOffset.x +
            this._draggedTile.offsetWidth / 2;
        if (distance < 0) distance = 0;

        this._releasedGroupIndex = Math.min(
            Math.floor(distance / this._groupWidth),
            this.groupValues.length - 1
        );

        this._releasedGroupIndex += Math.floor(
            this.template.querySelector(
                '[data-element-id="avonni-kanban__container"]'
            ).scrollLeft / this._groupWidth
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
        if (this._variant !== 'base' || this._readOnly) return;
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
        if (!this._draggedGroup) return;
        this._releasedGroupIndex = Math.min(
            Math.floor((event.clientX + 10) / this._groupWidth),
            this.groupValues.length - 1
        );

        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__field"]'
        );
        groups.forEach((group, i) => {
            if (group !== this._draggedGroup)
                group.classList.add('avonni-kanban__field_moved');
            if (
                this._releasedGroupIndex <= i &&
                this._clickedGroupIndex > i &&
                group !== this._draggedGroup
            )
                group.classList.add('avonni-kanban__translate_right');
            else if (
                this._releasedGroupIndex >= i &&
                this._clickedGroupIndex < i &&
                group !== this._draggedGroup
            )
                group.classList.add('avonni-kanban__translate_left');
            else {
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
        dropZone.style.transform = `translateX(${
            (groups[this._clickedGroupIndex].offsetWidth + 10) *
            this._releasedGroupIndex
        }px)`;
    }

    /**
     *
     *  Handles the end of the drag of a list
     *
     */
    handleGroupMouseUp() {
        if (!this._draggedGroup) return;

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
            this.readOnly ||
            event.target.classList.contains('slds-dropdown-trigger')
        )
            return;
        this._groupWidth = event.currentTarget.parentElement.offsetWidth + 10;
        this._draggedTile = event.currentTarget;
        this._draggedTile.classList.add('avonni-kanban__dragged');
        this._draggedTile.style.width = `${
            parseInt(this._groupWidth, 10) - 20
        }px`;

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

        this.handleDropZone(event);
    }

    /**
     *
     * Drags the tile
     *
     * @param {Event} event
     */
    handleTileMouseMove(event) {
        if (!this._draggedTile && !this._draggedGroup) return;

        // Sets the boundaries of the kanban
        this._kanbanPos.top = event.currentTarget.getBoundingClientRect().top;
        this._kanbanPos.bottom =
            this._kanbanPos.top + event.currentTarget.offsetHeight;
        this._kanbanPos.left = event.currentTarget.getBoundingClientRect().left;
        this._kanbanPos.right =
            this._kanbanPos.left + event.currentTarget.scrollWidth;

        const fieldContainer = this.template.querySelector(
            '[data-element-id="avonni-kanban__container"]'
        );

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

        if (this._draggedTile)
            // Sets the position of the dragged tile
            this._draggedTile.style.transform = `translate(${
                currentX - this._initialPos.x - this._clickOffset.x
            }px, ${
                currentY - this._initialPos.y - this._clickOffset.y
            }px) rotate(3deg)`;
        if (this._draggedGroup) {
            // Sets the position of the dragged group
            this.handleGroupMouseMove(event);
            this._draggedGroup.style.transform = `translate(${
                currentX - this._initialPos.x - this._clickOffset.x
            }px, ${
                currentY - this._initialPos.y - this._clickOffset.y
            }px) rotate(3deg)`;
        }

        const currentGroupTiles = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__group"]'
        );

        // Sets the right marginBottom on the last tile depending on the hovered group
        currentGroupTiles.forEach((group, i) => {
            const marginBottom =
                i === this._releasedGroupIndex
                    ? this._draggedTile.offsetHeight
                    : 0;
            group.children[
                group.children.length - 1
            ].style.marginBottom = `${marginBottom}px`;
        });

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
        if (this.readOnly || event.currentTarget !== this._draggedTile) return;
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

        const actionsContainer = this.template.querySelectorAll(
            '[data-element-id="avonni-kanban__footer_action"]'
        );

        // resets animations
        Array.from(groups).forEach((group, i) => {
            if (group !== groups[this._releasedGroupIndex]) {
                group.style.maxHeight = `calc(100% - 75px - ${actionsContainer[i].offsetHeight}px)`;
                group.style.height = 'fit-content';
            } else {
                group.style.height = `${
                    this._groupsHeight[this._releasedGroupIndex] +
                    this._draggedTile.offsetHeight
                }px`;
            }

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
        if (toIndex < 0 || fromIndex < 0) return this.records;
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
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    id: arr[fromIndex].id,
                    action: arr[fromIndex][this._groupFieldName],
                    records: this.records
                },
                composed: false,
                bubbles: true,
                cancelable: true
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
            )
                tileCount++;
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
        return Math.round(num * 1e5) / 1e5;
    }

    /**
     *
     *  Updates the released tile index depending on the scroll position and tiles hovered
     * @param {HTMLElement[]} groupElements Groups containing the tiles
     */
    updateReleasedTileIndex(groupElements) {
        let offsetHeight = 0;

        const currentGroupTiles = Array.from(
            groupElements[this._releasedGroupIndex].children
        );
        let scrolledHeight = 0;

        // calculates the index of the drop, depending on the previous tiles heights
        for (let [i, tile] of currentGroupTiles.entries()) {
            const tileIncrementMultiplier =
                this._releasedGroupIndex === this._clickedGroupIndex ? 1 : -1;
            offsetHeight += tile.offsetHeight + 10;
            this._releasedTileIndex = i;
            if (
                groupElements[this._releasedGroupIndex].scrollTop > offsetHeight
            ) {
                scrolledHeight += tile.offsetHeight + 10;
            }
            if (this._clickedGroupIndex === this._releasedGroupIndex)
                this._releasedTileIndex--;
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

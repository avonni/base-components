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
import { normalizeArray, normalizeString } from '../utilsPrivate/normalize';

export default class Kanban extends LightningElement {
    _groupValues = [];
    _summarizeFieldName;
    _fields = [];
    _records = [];
    _kanbanPos = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    _initialPos = { x: 0, y: 0 };
    _releasedGroupIndex = 0;
    _clickedGroupIndex = 0;
    _actions = [];
    _draggedTile;
    _isDragged = false;

    /**
     * Name of the data field containing the group label the data belongs to.
     *
     * @type {string}
     * @public
     */
    @api groupFieldName;

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
     * If present, the Kanban is in a loading state and shows a spinner.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api isLoading;

    /**
     *
     *
     * If present, the cards are not draggable.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api notDraggable;

    // TODO: METHODS
    get computedGroups() {
        let computedGroups = JSON.parse(JSON.stringify(this._groupValues));
        computedGroups.forEach((group, i) => {
            group.tiles = [];
            group.summarize = {
                value: 0,
                type: '',
                typeAttributes: {}
            };
            group.index = i;
        });
        let computedFields = [];
        this._records.forEach((record, i) => {
            computedFields.push({
                index: record.id,
                group: record.status,
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
                    group.summarize.value += toSummarize.value;
                    // TODO: ANIMATION
                    // setTimeout(() => {
                    //     const summary = this.template.querySelectorAll(
                    //         '.avonni-kanban__summary'
                    //     )[group.index];
                    //     summary.style.setProperty(
                    //         '--num',
                    //         group.summarize.value.toString()
                    //     );
                    // }, 0);
                    // setTimeout(() => {
                    //     const summary = this.template.querySelectorAll(
                    //         '.avonni-kanban__summary'
                    //     )[group.index];
                    //     if (group.summarize.type === 'currency') {
                    //         summary.setAttribute(
                    //             'data-value',
                    //             group.summarize.value.toLocaleString('en-US', {
                    //                 style: 'currency',
                    //                 currency:
                    //                     group.summarize.typeAttributes
                    //                         .currencyCode
                    //             })
                    //         );
                    //     } else if (group.summarize.type === 'percent') {
                    //         summary.setAttribute(
                    //             'data-value',
                    //             `${parseInt(group.summarize.value * 100, 10)}%`
                    //         );
                    //     }
                    // }, 750);
                }
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
                    id: event.currentTarget.id,
                    action: event.currentTarget.action
                },
                composed: false,
                bubbles: true,
                cancelable: true
            })
        );
    }

    handleKanbanMouseDown(event) {
        const groupWidth =
            event.currentTarget.offsetWidth / this.groupValues.length;
        this._clickedGroupIndex = Math.floor(event.clientX / groupWidth);
        this._kanbanPos.top = event.currentTarget.getBoundingClientRect().top;
        this._kanbanPos.bottom =
            this._kanbanPos.top + event.currentTarget.offsetHeight;
        this._kanbanPos.left = event.currentTarget.getBoundingClientRect().left;
        this._kanbanPos.right =
            this._kanbanPos.left + event.currentTarget.offsetWidth;
        console.log(this._kanbanPos);
    }

    handleKanbanMouseUp(event) {
        const groupWidth =
            event.currentTarget.offsetWidth / this.groupValues.length;
        this._releasedGroupIndex = Math.floor(event.clientX / groupWidth);
    }

    handleTileMouseDown(event) {
        this._draggedTile = event.currentTarget;
        this._initialPos.x =
            event.target.getBoundingClientRect().x +
            event.target.offsetWidth / 2;
        this._initialPos.y =
            event.target.getBoundingClientRect().y +
            event.target.offsetHeight / 2;
    }

    handleTileMouseUp(event) {
        // TODO: CONDITION POUR SAVOIR SI DRAG VALIDE
        // if(true) {
        //     this._draggedTile.
        // }
        console.log(event);
        this._draggedTile = null;
    }

    handleTileMouseMove(event) {
        if (!this._draggedTile) return;
        const mouseY =
            event.type === 'touchmove'
                ? event.touches[0].clientY
                : event.clientY;
        const mouseX =
            event.type === 'touchmove'
                ? event.touches[0].clientX
                : event.clientX;
        let currentY = mouseY;
        let currentX = mouseX;
        if (mouseY < this._kanbanPos.top) {
            currentY = this._kanbanPos.top;
        } else if (mouseY > this._kanbanPos.bottom) {
            currentY = this._kanbanPos.bottom;
        }
        if (mouseX < this._kanbanPos.left) {
            currentX = this._kanbanPos.left;
        } else if (mouseX > this._kanbanPos.right) {
            currentX = this._kanbanPos.right;
        }
        this._draggedTile.style.transform = `translate(${
            currentX - this._initialPos.x
        }px, ${currentY - this._initialPos.y}px)`;
    }
}

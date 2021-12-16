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
import { normalizeBoolean } from 'c/utilsPrivate';

/**
* @class
* @descriptor avonni-kanban
* @storyId example-kanban--base
* @public
*/
export default class Kanban extends LightningElement {
    /**
    * Array of action objects. The actions are displayed on each card and refer to tasks you can perform, such as updating or deleting the card.
    *
    * @type {object[]}
    * @public
    */
    @api actions = [];

    /**
    * Lightning Design System name of the icon displayed at the bottom-right of the card. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
    * The name can also be retrieved from a field, with the format <code>{ fieldName: nameOfTheField }</code>.
    *
    * @type {(object|string)}
    * @public
    */
    @api iconName;

    _groupValues = [];
    _groupFieldName;
    _summarizeFieldName;
    _kanbanData = [];
    _fields = [];
    _isLoading = false;
    _notDraggable = false;
    currencyCode;
    cardId;

    @api internalUseGroupData = [];

    connectedCallback() {
        this.initFields();
        this.initData();
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
    set groupValues(value) {
        this._groupValues = value;
        this.internalUseGroupData = value;

        if (this.isConnected) this.initData();
    }

    /**
    * Name of the data field containing the group label the data belonds to.
    *
    * @type {string}
    * @public
    */
    @api
    get groupFieldName() {
        return this._groupFieldName;
    }
    set groupFieldName(value) {
        this._groupFieldName = value;
        if (this.isConnected) this.initData();
    }

    /**
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
        this._summarizeFieldName = value;

        if (this.isConnected) {
            this.initFields();
            this.initData();
        }
    }

    /**
    * Array of data objects. Each object will be displayed as a data card.
    * The objects should have a key <code>id</code>, used as their unique identifier. The other keys should correspond to the available fields, and/or the summarize and group field names.
    *
    * @type {object[]}
    * @public
    */
    @api
    get kanbanData() {
        return this._kanbanData;
    }
    set kanbanData(value) {
        this._kanbanData = value;
        if (this.isConnected) this.initData();
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
    set fields(value) {
        this._fields = JSON.parse(JSON.stringify(value));

        if (this.isConnected) {
            this.initFields();
            this.initData();
        }
    }

    /**
    * If present, the Kanban is in a loading state and shows a spinner.
    *
    * @type {boolean}
    * @public
    * @default false
    */
    @api get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
    * If present, the cards are not draggable.
    *
    * @type {boolean}
    * @public
    * @default false
    */
    @api get notDraggable() {
        return this._notDraggable;
    }
    set notDraggable(value) {
        this._notDraggable = normalizeBoolean(value);
    }

    /**
    * True if the cards are draggable.
    *
    * @type {boolean}
    */
    get isDraggable() {
        return !this.notDraggable;
    }

    /**
    * Computed card class.
    *
    * @type {string}
    */
    get computedDraggableClass() {
        return this.notDraggable ? '' : 'avonni-kanban__draggable';
    }

    /**
    * True if the actions should be visible.
    *
    * @type {boolean}
    */
    get showActions() {
        return this.actions.length > 0;
    }

    /**
    * Initialize the kanban data.
    */
    initData() {
        const groups = JSON.parse(JSON.stringify(this.internalUseGroupData));
        let amount = 0;

        groups.forEach(group => {
            const cards = [];
            this.kanbanData.forEach(data => {
                if (data[this.groupFieldName] === group.label) {
                    const card = JSON.parse(JSON.stringify(data));
                    if (this.summarizeFieldName) {
                        amount += card[this.summarizeFieldName];
                    }

                    const fields = [];
                    Object.entries(card).forEach(([key, value]) => {
                        const fieldDefinition = this.fields.find(field => field.fieldName === key);

                        if (fieldDefinition) {
                            fields.push({
                                fieldName: key,
                                label: fieldDefinition.label,
                                type: fieldDefinition.type,
                                typeAttributes: fieldDefinition.typeAttributes || {},
                                value
                            });
                        }
                    });
                    card.fields = fields;
                    cards.push(card);
                }
            });

            if (group.amountValue || group.amountValue === 0) {
                group.amountValue = group.amount;
            } else {
                group.amountValue = amount;
            }

            group.amount = amount;

            const diff = (group.amount - group.amountValue) / 100;
            const sign = Math.sign(diff);

            // eslint-disable-next-line @lwc/lwc/no-async-operation
            const interval = setInterval(
                function() {
                    if (sign === 1) {
                        if (group.amountValue < group.amount) {
                            let value = group.amountValue + diff;
                            group.amountValue =
                                value > group.amount
                                    ? Number(group.amount.toFixed(2))
                                    : Number((group.amountValue + diff).toFixed(2));
                            this.internalUseGroupData = this.internalUseGroupData;
                        } else {
                            clearInterval(interval);
                        }
                    } else {
                        if (group.amountValue > group.amount) {
                            let value = group.amountValue + diff;
                            group.amountValue =
                                value > group.amount
                                    ? Number((group.amountValue + diff).toFixed(2))
                                    : Number(group.amount.toFixed(2));
                            this.internalUseGroupData = this.internalUseGroupData;
                        } else {
                            clearInterval(interval);
                        }
                    }
                }.bind(this),
                1
            );

            group.cards = cards;
            group.size = cards.length;
            amount = 0;
        });

        this.internalUseGroupData = groups;
    }

    /**
    * Initialize the fields.
    */
    initFields() {
        this.fields.forEach(field => {
            if (!field.typeAttributes) {
                field.typeAttributes = {};
            }

            if (field.fieldName === this.summarizeFieldName) {
                this.currencyCode = field.typeAttributes.currencyCode;
            }
        });
    }

    /**
    * Start the card dragging process.
    * 
    * @param {Event} event
    */
    handleDragStart(event) {
        this.classList.add('avonni-kanban__drag-start');
        event.currentTarget.style.boxShadow = '0 0 5px rgb(0, 112, 210)';
        this.cardId = event.currentTarget.dataset.cardId;
        event.dataTransfer.effectAllowed = 'move';
    }

    /**
    * Handle the behavior of the Kanban when a card is being dragged over a group.
    * 
    * @param {Event} event
    * @returns {boolean} false
    */
    handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        event.dataTransfer.dropEffect = 'move';

        return false;
    }

    /**
    * Handle the release of a card over a group. Dispatch the change event.
    * 
    * @param {Event} event
    * @returns {boolean} false
    */
    handleDrop(event) {
        event.stopPropagation();

        const element = this.template.querySelector('.avonni-kanban__drop-target-before');

        if (element) {
            element.classList.remove('avonni-kanban__drop-target-before');
        }

        this.classList.remove('avonni-kanban__drag-start');

        const groupName = event.target.dataset.groupLabel;

        if (groupName !== undefined) {
            const hoverCardId = event.target.dataset.cardId;
            const cardList = JSON.parse(JSON.stringify(this.kanbanData));
            let item;
            let oldIndex;
            let newIndex;

            if (hoverCardId !== undefined) {
                cardList.forEach((data, index) => {
                    if (data.id === this.cardId) {
                        data.status = groupName;
                        item = JSON.parse(JSON.stringify(data));
                        oldIndex = index;
                    }
                    if (data.id === hoverCardId) {
                        newIndex = index;
                    }
                });

                cardList[oldIndex] = '';
                cardList.insert(newIndex, item);
            } else {
                cardList.forEach((data, index) => {
                    if (data.id === this.cardId) {
                        data.status = groupName;
                        item = JSON.parse(JSON.stringify(data));
                        oldIndex = index;
                    }
                });
                cardList[oldIndex] = '';
                cardList.push(item);
            }

            this.kanbanData = cardList.filter(arr => arr);

            /**
            * The event fired when a card is moved from a step to another.
            *
            * @event
            * @name change
            * @param {string} id Unique data id.
            * @param {string} action Label of the group the card has been moved to.
            * @param {object[]} kanbanData New data of the Kanban.
            * @public
            * @bubbles
            * @cancelable
            */
            this.dispatchEvent(
                new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        id: this.cardId,
                        action: groupName,
                        kanbanData: this.kanbanData
                    }
                })
            );
        }

        return false;
    }

    /**
    * Handle the entry of a dragged card over another card.
    * 
    * @param {Event} event
    */
    handleDropTargetEnter(event) {
        if (
            event.target.dataset.cardId !== this.cardId &&
            (!event.target.previousSibling ||
                (event.target.previousSibling &&
                    event.target.previousSibling.dataset.cardId !==
                        this.cardId))
        ) {
            event.target.classList.add('avonni-kanban__drop-target-before');
        }
    }

    /**
    * Handle the exit of a dragged card over another card.
    * 
    * @param {Event} event
    */
    handleDropTargetLeave(event) {
        event.target.classList.remove('avonni-kanban__drop-target-before');
    }

    /**
    * Handle the end of the card dragging process.
    */
    handleDragEnd() {
        const cards = this.template.querySelectorAll('.avonni-kanban__draggable');

        cards.forEach(card => {
            card.style.boxShadow = 'none';
        });
    }

    /**
    * Handle a click on an action. Dispatch the actionselect event.
    * 
    * @param {Event} event
    */
    handlePrivateselect(event) {
        /**
        * The event fired when a user clicks on an action.
        *
        * @event
        * @name actionselect
        * @param {string} id Unique data id.
        * @param {string} action Unique action name.
        * @public
        * @bubbles
        * @cancelable
        */
        this.dispatchEvent(
            new CustomEvent('actionselect', {
                bubbles: true,
                cancelable: true,
                detail: {
                    id: event.target.dataset.cardId,
                    action: event.detail.value
                }
            })
        );
    }
}

// eslint-disable-next-line no-extend-native
Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};

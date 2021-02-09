import { LightningElement, api, track } from 'lwc';
import { normalizeBoolean } from 'avonni/utilsPrivate';

export default class Kanban extends LightningElement {
    @api actions = [];
    @api iconName;

    @track _groupValues = [];
    @track _groupFieldName;
    @track _summarizeFieldName;
    @track _kanbanData = [];
    @track _fields = [];
    @track _isLoading = false;
    @track _notDraggable = false;
    @track currencyCode;
    @track cardId;

    @api internalUseGroupData = [];

    @api
    get groupValues() {
        return this._groupValues;
    }

    set groupValues(value) {
        this._groupValues = value;
        this.internalUseGroupData = value;
        this.generateData();
    }

    @api
    get groupFieldName() {
        return this._groupFieldName;
    }

    set groupFieldName(value) {
        this._groupFieldName = value;
        this.generateData();
    }

    @api
    get summarizeFieldName() {
        return this._summarizeFieldName;
    }

    set summarizeFieldName(value) {
        this._summarizeFieldName = value;
        this.generateData();
    }

    @api
    get kanbanData() {
        return this._kanbanData;
    }

    set kanbanData(value) {
        this._kanbanData = value;
        this.generateData();
    }

    @api
    get fields() {
        return this._fields;
    }

    set fields(value) {
        let fields = JSON.parse(JSON.stringify(value));

        fields.forEach(field => {
            if (!field.typeAttributes) {
                field.typeAttributes = {};
            }

            if (field.fieldName === this.summarizeFieldName) {
                this.currencyCode = field.typeAttributes.currencyCode;
            }
        });

        this._fields = fields;
    }

    @api get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    @api get notDraggable() {
        return this._notDraggable;
    }

    set notDraggable(value) {
        this._notDraggable = normalizeBoolean(value);
    }

    get isDraggable() {
        return !this.notDraggable;
    }

    get computedDraggableClass() {
        return this.notDraggable ? '' : 'draggable';
    }

    get showActions() {
        return this.actions.length > 0;
    }

    itemDragStart(event) {
        this.classList.add('avonni-drag-start');
        event.target.style.boxShadow = '0 0 5px rgb(0, 112, 210)';
        this.cardId = event.target.dataset.cardId;
        event.dataTransfer.effectAllowed = 'move';
    }

    handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        event.dataTransfer.dropEffect = 'move';

        return false;
    }

    handleDrop(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        let element = this.template.querySelector('.avonni-drop-target-before');

        if (element) {
            element.classList.remove('avonni-drop-target-before');
        }

        this.classList.remove('avonni-drag-start');

        let groupName = event.target.dataset.groupLabel;

        if (groupName !== undefined) {
            let hoverCardId = event.target.dataset.cardId;
            let cardList = JSON.parse(JSON.stringify(this.kanbanData));
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

    handleDropTargetEnter(event) {
        if (
            event.target.dataset.cardId !== this.cardId &&
            (!event.target.previousSibling ||
                (event.target.previousSibling &&
                    event.target.previousSibling.dataset.cardId !==
                        this.cardId))
        ) {
            event.target.classList.add('avonni-drop-target-before');
        }
    }

    handleDropTargetLeave(event) {
        event.target.classList.remove('avonni-drop-target-before');
    }

    generateData() {
        let groups = JSON.parse(JSON.stringify(this.internalUseGroupData));
        let amount = 0;

        groups.forEach(group => {
            let cards = [];
            this.kanbanData.forEach(data => {
                if (data[this.groupFieldName] === group.label) {
                    if (this.summarizeFieldName) {
                        amount += data[this.summarizeFieldName];
                    }
                    cards.push(data);
                }
            });

            if (group.amountValue || group.amountValue === 0) {
                group.amountValue = group.amount;
            } else {
                group.amountValue = amount;
            }

            group.amount = amount;

            let diff = (group.amount - group.amountValue) / 100;
            let sign = Math.sign(diff);

            // eslint-disable-next-line @lwc/lwc/no-async-operation
            let interval = setInterval(
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

    handleDragEnd() {
        let cards = this.template.querySelectorAll('.draggable');

        cards.forEach(card => {
            card.style.boxShadow = 'none';
        });
    }

    handlePrivateselect(event) {
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

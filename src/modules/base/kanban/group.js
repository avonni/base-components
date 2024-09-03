import { normalizeArray, normalizeBoolean, normalizeObject } from 'c/utils';

export default class KanbanGroup {
    constructor(props) {
        this._tiles = [];
        this._index = props.index;
        this._summarize = {
            value: 0,
            type: '',
            typeAttributes: {}
        };
        this._label = props.label;
        this._value = props.value;
        this._headerActions = normalizeArray(props.headerActions);
        this._footerActions = normalizeArray(props.footerActions);
        this._backgroundColor = props.backgroundColor || '';
        this._pathColor = props.pathColor || '';
        this._showItemCount = normalizeBoolean(props.showItemCount);
        this._avatar = normalizeObject(props.avatar);
        this._summarizeAttributes = normalizeObject(props.summarizeAttributes);
    }

    addTile(tile) {
        this._tiles.push(tile);
    }

    get avatar() {
        return this._avatar;
    }

    get index() {
        return this._index;
    }

    get label() {
        return this._label;
    }

    get value() {
        return this._value;
    }

    get tiles() {
        return this._tiles;
    }

    get summarize() {
        this.updateSummarize();
        return this._summarize;
    }

    get headerActions() {
        return this._headerActions;
    }

    get footerActions() {
        return this._footerActions;
    }

    get backgroundStyle() {
        return `background-color: ${this._backgroundColor};`;
    }

    get pathStyle() {
        return `background-color: ${this._pathColor} !important;`;
    }

    updateSummarize() {
        this._summarize.value = 0;
        this._summarize.type = '';
        this._summarize.typeAttributes = {};

        if (this._summarizeAttributes) {
            this._tiles.forEach((tile) => {
                if (typeof tile.summarizeValue === 'number') {
                    this._summarize.type = this._summarizeAttributes.type;
                    this._summarize.typeAttributes =
                        this._summarizeAttributes.typeAttributes;
                    this._summarize.value += tile.summarizeValue;
                }
            });
        }
    }
}

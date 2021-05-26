import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from 'c/utilsPrivate';

export default class SplitterPane extends LightningElement {
    _collapsed = false;
    _collapsedSize;
    _scrollable = false;
    _resizable = false;
    _collapsible = false;
    _max;
    _min;
    _size;

    startX;
    startY;
    startWidth;
    startHeight;

    connectedCallback() {
        if (this.max) {
            this.setAttribute('max', this.max);
        }

        if (this.min) {
            this.setAttribute('min', this.min);
        }

        if (this.size) {
            this.setAttribute('size', this.size);
        }

        if (this.collapsedSize) {
            this.setAttribute('collapsedSize', this.collapsedSize);
        }

        this.setAttribute('resizable', this._resizable);
        this.setAttribute('scrollable', this._scrollable);
        this.setAttribute('collapsed', this._collapsed);
        this.setAttribute('collapsible', this._collapsible);
    }

    renderedCallback() {
        let slotElements = this.template
            .querySelector('slot')
            .assignedElements();

        if (slotElements.length > 0) {
            slotElements.forEach((element) => {
                if (element.localName.indexOf('-splitter') > -1) {
                    element.classList.add('horizontal');
                } else {
                    element.classList.add('vertical');
                }
            });
        }
    }

    @api get collapsed() {
        return this._collapsed;
    }

    set collapsed(value) {
        this._collapsed = normalizeBoolean(value);
        this.setAttribute('collapsed', this._collapsed);
    }

    @api get collapsedSize() {
        return this._collapsedSize;
    }

    set collapsedSize(value) {
        this._collapsedSize = value;
        this.setAttribute('collapsedSize', this._collapsedSize);
    }

    @api get scrollable() {
        return this._scrollable;
    }

    set scrollable(value) {
        this._scrollable = normalizeBoolean(value);
        this.setAttribute('scrollable', this._scrollable);
    }

    @api get collapsible() {
        return this._collapsible;
    }

    set collapsible(value) {
        this._collapsible = normalizeBoolean(value);
        this.setAttribute('collapsible', this._collapsible);
    }

    @api get resizable() {
        return this._resizable;
    }

    set resizable(value) {
        this._resizable = normalizeBoolean(value);
        this.setAttribute('resizable', this._resizable);
    }

    @api get max() {
        return this._max;
    }

    set max(value) {
        this._max = value;
        this.setAttribute('max', this._max);
    }

    @api get min() {
        return this._min;
    }

    set min(value) {
        this._min = value;
        this.setAttribute('min', this._min);
    }

    @api get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
        this.setAttribute('size', this._size);
    }
}

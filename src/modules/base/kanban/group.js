import { normalizeArray, normalizeBoolean } from '../utilsPrivate/normalize';

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
        this._avatar = props.avatar;
        this._summarizeFieldName = props.summarizeFieldName;
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

        this._tiles.forEach((tile) => {
            const toSummarize = tile.field.find(
                (field) => field.label === this._summarizeFieldName
            );
            if (toSummarize && typeof toSummarize.value === 'number') {
                this._summarize.type = toSummarize.type;
                this._summarize.typeAttributes = toSummarize.typeAttributes;
                this._summarize.value += toSummarize.value;
            }
        });
    }
}

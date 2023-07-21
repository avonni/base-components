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

import { classSet } from 'c/utils';
import { dateTimeObjectFrom } from 'c/utilsPrivate';

export default class KanbanTile {
    constructor(props) {
        this._index = props.index;
        this._group = props.group;
        this._warningIcon = props.warningIcon;
        this._field = [];
        this._subGroup = props.subGroup;
        this._coverImage = null;
        this._title = props.title;
        this._description = props.description;
        this._startDate = props.startDate;
        this._dueDate = props.dueDate;
    }

    get coverImage() {
        return this._coverImage;
    }
    set coverImage(coverImage) {
        this._coverImage = coverImage;
    }

    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }

    get dueDate() {
        return this._dueDate;
    }
    set dueDate(dueDate) {
        let date = dueDate;
        if (!isNaN(Number(date))) {
            date = Number(date);
        }
        date = dateTimeObjectFrom(date);
        this._dueDate = !date || dueDate === null ? null : new Date(date.ts);
        if (this._dueDate) {
            const dateTZ = this.getDateWithTimeZone(this._dueDate);
            this._dueDate = new Date(dateTZ.ts);
        }
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        let date = startDate;
        if (!isNaN(Number(date))) {
            date = Number(date);
        }
        date = dateTimeObjectFrom(date);
        this._startDate =
            !date || startDate === null ? null : new Date(date.ts);
        if (this._startDate) {
            const dateTZ = this.getDateWithTimeZone(this._startDate);
            this._startDate = new Date(dateTZ.ts);
        }
    }

    get computedTileDatesClass() {
        return classSet(
            'avonni-kanban__tile_dates slds-grid slds-grid_vertical-align-center slds-p-around_xx-small'
        ).add({
            'avonni-kanban__tile_dates_due-date': this.dueDate,
            'avonni-kanban__tile_dates_overdue slds-p-vertical_xx-small slds-p-horizontal_x-small':
                this.isOverdue
        });
    }

    get computedTileFieldsBottomClass() {
        return classSet('').add({
            'slds-grid slds-grid_vertical-align-center slds-m-top_x-small':
                this.hasDates
        });
    }

    get coverImageStyle() {
        return `background-image: url(${this._coverImage}); height: 250px;`;
    }

    get field() {
        return this._field;
    }

    get group() {
        return this._group;
    }

    get hasDates() {
        return this.startDate && (!this.dueDate || this.dueDate);
    }

    get index() {
        return this._index;
    }

    get isOverdue() {
        const date = this.getDateWithTimeZone(this.dueDate);
        const dueDate = new Date(date.ts);
        return dueDate && Date.now() > dueDate;
    }

    get subGroup() {
        return this._subGroup;
    }

    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }

    get warningIcon() {
        return this._warningIcon;
    }

    get warningIconStyle() {
        return `position: absolute; right: 0.75rem; ${
            this.hasDates ? '' : 'bottom: 0.75rem;'
        }`;
    }

    addField(field) {
        this._field.push(field);
    }

    getDateWithTimeZone(date) {
        return dateTimeObjectFrom(date, {
            locale: 'en-US'
        });
    }
}

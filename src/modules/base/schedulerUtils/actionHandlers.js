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

import {
    dispatchEventContextMenu,
    dispatchEventSelect,
    dispatchEmptySpotContextMenu,
    dispatchHidePopovers,
    dispatchOpenEditDialog,
    dispatchEventMouseEnter
} from './dispatchers';

export function handleDoubleClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    this.newEvent(x, y, true);

    dispatchOpenEditDialog.call(this, this._eventData.selection);
}

export function handleEmptySpotContextMenu(event) {
    event.preventDefault();

    const x = event.clientX;
    const y = event.clientY;
    this.newEvent(x, y);

    dispatchEmptySpotContextMenu.call(this, this._eventData.selection);
}

export function handleEventContextMenu(event) {
    const target = event.currentTarget;
    if (target.disabled || target.referenceLine) {
        return;
    }

    dispatchEventContextMenu.call(this, event.detail);
}

export function handleEventDoubleClick(event) {
    this._eventData.cleanSelection(true);
    this.selectEvent(event.detail);
    dispatchHidePopovers.call(this);
    dispatchOpenEditDialog.call(this, this._eventData.selection);
}

export function handleEventFocus(event) {
    const detail = {
        name: event.detail.eventName
    };
    if (event.currentTarget.recurrence) {
        detail.recurrenceDates = {
            from: event.detail.from.toUTC().toISO(),
            to: event.detail.to.toUTC().toISO()
        };
    }

    dispatchEventSelect.call(this, event.detail);
    handleEventMouseEnter.call(this, event);
}

export function handleEventMouseEnter(event) {
    if (this._mouseIsDown) {
        return;
    }
    dispatchEventMouseEnter.call(this, event.detail);
}

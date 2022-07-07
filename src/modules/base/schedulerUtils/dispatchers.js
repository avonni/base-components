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

export function dispatchEmptySpotContextMenu(selection) {
    this.dispatchEvent(
        new CustomEvent('emptyspotcontextmenu', {
            detail: { selection }
        })
    );
}

export function dispatchEventChange(detail) {
    this.dispatchEvent(
        new CustomEvent('eventchange', {
            detail,
            bubbles: true
        })
    );
}

export function dispatchEventContextMenu(detail) {
    this.dispatchEvent(new CustomEvent('eventcontextmenu', { detail }));
}

export function dispatchEventCreate(event) {
    this.dispatchEvent(
        new CustomEvent('eventcreate', {
            detail: {
                event: {
                    from: event.from.toUTC().toISO(),
                    resourceNames: event.resourceNames,
                    name: event.name,
                    title: event.title,
                    to: event.to.toUTC().toISO()
                }
            },
            bubbles: true
        })
    );
}

export function dispatchEventMouseEnter(detail) {
    this.dispatchEvent(
        new CustomEvent('eventmouseenter', {
            detail
        })
    );
}

export function dispatchEventSelect(detail) {
    this.dispatchEvent(
        new CustomEvent('eventselect', {
            detail,
            bubbles: true
        })
    );
}

export function dispatchHidePopovers(list) {
    this.dispatchEvent(
        new CustomEvent('hidepopovers', {
            detail: { list }
        })
    );
}

export function dispatchOpenEditDialog(selection) {
    this.dispatchEvent(
        new CustomEvent('openeditdialog', {
            detail: {
                selection
            }
        })
    );
}

export function dispatchOpenRecurrenceDialog(selection) {
    this.dispatchEvent(
        new CustomEvent('openrecurrencedialog', {
            detail: {
                selection
            }
        })
    );
}

export function dispatchVisibleIntervalChange(start, visibleInterval) {
    this.dispatchEvent(
        new CustomEvent('visibleintervalchange', {
            detail: { start, visibleInterval }
        })
    );
}

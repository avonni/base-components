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

/**
 * Find the cell element at a given schedule position.
 *
 * @param {HTMLElement} column The column element the cell is in.
 * @param {number} position The position of the cell.
 * @returns {(HTMLElement|undefined)} The cell element or undefined.
 */
export function getCellFromPosition(column, position, isVertical) {
    const cellElements = Array.from(
        column.querySelectorAll('[data-element-id="div-cell"]')
    );

    return cellElements.find((cellElement, index) => {
        const cellPosition = cellElement.getBoundingClientRect();
        const start = isVertical ? cellPosition.top : cellPosition.left;
        const end = isVertical ? cellPosition.bottom : cellPosition.right;

        const isFirstCell = index === 0;
        const isLastCell = index === cellElements.length - 1;
        const isBeforeFirstCell = isFirstCell && start >= position;
        const isAfterLastCell = isLastCell && position > end;
        const isInCell = position >= start && position < end;
        return isBeforeFirstCell || isAfterLastCell || isInCell;
    });
}

export function getElementOnXAxis(parentElement, x, selector) {
    const elements = Array.from(parentElement.querySelectorAll(selector));
    return elements.find((div) => {
        const divPosition = div.getBoundingClientRect();
        const start = divPosition.left;
        const end = divPosition.right;

        return x >= start && x <= end;
    });
}

export function getElementOnYAxis(parentElement, y, selector) {
    const elements = Array.from(parentElement.querySelectorAll(selector));
    return elements.find((div) => {
        const divPosition = div.getBoundingClientRect();
        const start = divPosition.top;
        const end = divPosition.bottom;

        return y >= start && y <= end;
    });
}

export { PrimitiveScheduleBase } from './primitiveScheduleBase';
export {
    updateOccurrencesOffset,
    updateOccurrencesPosition
} from './eventPositionning';

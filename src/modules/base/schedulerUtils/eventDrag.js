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

import { getCellFromPosition } from './schedulerUtils';

export default class SchedulerEventDrag {
    draggedEvent;
    resizeSide;

    _boundaries;
    _isVertical = false;
    _initialState = {};
    _isNewEvent = false;
    resourceElement;

    constructor({
        event,
        isVertical,
        resourceElement,
        isNewEvent,
        boundaries
    }) {
        this._boundaries = boundaries;
        this._isVertical = isVertical;
        this._isNewEvent = isNewEvent;
        this.resourceElement = resourceElement;
        const mouseX = event.clientX || event.detail.x;
        const mouseY = event.clientY || event.detail.y;

        if (isNewEvent) {
            this._initialState = { mouseX, mouseY };
        } else {
            this.resizeSide = event.detail.side;
            this.setDraggedEvent(event.currentTarget, { mouseX, mouseY });
            this.draggedEvent.classList.add('avonni-scheduler__event-dragged');
        }
    }

    /**
     * Set the initial state of a dragged or resized event.
     *
     * @param {number} mouseX The position of the mouse on the horizontal axis.
     * @param {number} mouseY The position of the mouse on the vertical axis.
     */
    initDraggedEventState(mouseX, mouseY) {
        // Save the initial position values
        const eventPosition = this.draggedEvent.getBoundingClientRect();
        const { right, left, top, bottom } = this.getDraggingBoundaries(
            eventPosition,
            mouseX,
            mouseY
        );

        const eventStartPosition = this._isVertical
            ? eventPosition.top
            : eventPosition.left;

        const eventEndPosition = this._isVertical
            ? eventPosition.bottom
            : eventPosition.right;

        const eventSize = this._isVertical
            ? eventPosition.height
            : eventPosition.width;

        this._initialState = {
            mouseX,
            mouseY,
            initialX: this.draggedEvent.x,
            initialY: this.draggedEvent.y,
            eventStartPosition,
            eventEndPosition,
            eventSize,
            left,
            right,
            top,
            bottom
        };
    }

    /**
     * Clear the dragged class and empty the draggedEvent and resizeSide variables.
     */
    cleanDraggedElement() {
        if (this.draggedEvent) {
            this.draggedEvent.classList.remove(
                'avonni-scheduler__event-dragged'
            );
            this.draggedEvent = undefined;
        }
        this.resizeSide = undefined;
    }

    drag(currentX, currentY) {
        const { mouseX, mouseY, initialX, initialY } = this._initialState;
        const position = this.normalizeMousePosition(currentX, currentY);
        const x = position.x - mouseX;
        const y = position.y - mouseY;
        this.draggedEvent.x = x + initialX;
        this.draggedEvent.y = y + initialY;
    }

    resize(x, y, occurrence, resource) {
        const normalizedPosition = this.normalizeMousePosition(x, y);
        const position = this._isVertical
            ? normalizedPosition.y
            : normalizedPosition.x;

        const { mouseX, mouseY } = this._initialState;
        const distanceMoved = this._isVertical
            ? position - mouseY
            : position - mouseX;

        // If a new event is created through click and drag,
        // Set the direction the user is going to
        if (this._isNewEvent) {
            this.resizeSide = distanceMoved >= 0 ? 'end' : 'start';
        }
        const hoveredEventCell = this.getHoveredEventCell(
            position,
            occurrence,
            resource
        );
        if (hoveredEventCell) {
            return hoveredEventCell;
        }

        // If we are not passing above another event,
        // change the styling of the dragged event to follow the cursor
        this.updateDraggedEventStyleAfterResize(distanceMoved);
        return null;
    }

    /**
     * Get the boundaries of the dragging/resizing zone.
     *
     * @param {DOMRect} eventPosition The position and dimensions of the dragged event.
     * @param {number} mouseX The position of the mouse on the X axis.
     * @param {number} mouseY The position of the mouse on the Y axis.
     * @returns {object} The dragging zone coordinates.
     */
    getDraggingBoundaries(eventPosition, mouseX, mouseY) {
        const resizeEnd = this.resizeSide === 'end';
        const isDragged = !this.resizeSide;
        const boundaries = this._boundaries;

        let right, left, top, bottom;
        if (this._isVertical) {
            const topOfEvent = eventPosition.top + 24;
            const topOfSchedule = boundaries.top + (mouseY - eventPosition.top);
            top = resizeEnd ? topOfEvent : topOfSchedule;

            const bottomOfEvent = eventPosition.bottom - 24;
            const bottomOfSchedule =
                boundaries.bottom + (mouseY - eventPosition.bottom);
            bottom = resizeEnd || isDragged ? bottomOfSchedule : bottomOfEvent;

            left = boundaries.left + (mouseX - eventPosition.left);
            right = boundaries.right + (mouseX - eventPosition.right);
        } else {
            const leftOfEvent = eventPosition.left + 24;
            const leftOfSchedule =
                boundaries.left + (mouseX - eventPosition.left);
            left = resizeEnd ? leftOfEvent : leftOfSchedule;

            const rightOfEvent = eventPosition.right - 24;
            const rightOfSchedule =
                boundaries.right + (mouseX - eventPosition.right);
            right = resizeEnd || isDragged ? rightOfSchedule : rightOfEvent;

            top = boundaries.top + (mouseY - eventPosition.top);
            bottom = boundaries.bottom + (mouseY - eventPosition.bottom);
        }

        return { right, left, top, bottom };
    }

    getValueOnTheResourceAxis(x, y) {
        const { mouseX, mouseY, eventStartPosition, eventEndPosition } =
            this._initialState;
        const position = this.normalizeMousePosition(x, y);
        const startPosition = this._isVertical
            ? position.y - (mouseY - eventStartPosition)
            : position.x - (mouseX - eventStartPosition);

        const endPosition = this._isVertical
            ? position.y + (eventEndPosition - mouseY)
            : position.x + (eventEndPosition - mouseX);

        return this.resizeSide === 'end' ? endPosition : startPosition;
    }

    getValueOnTheHeadersAxis(x, y) {
        const position = this.normalizeMousePosition(x, y);
        return this._isVertical ? position.x : position.y;
    }

    /**
     * Normalize the mouse position so it will take the schedule borders as a value if the mouse is outside of the schedule.
     *
     * @param {number} mouseX The horizontal position of the mouse.
     * @param {number} mouseY The vertical position of the mouse.
     * @returns {object} Object with two keys: x and y
     */
    normalizeMousePosition(mouseX, mouseY) {
        const { top, bottom, left, right } = this._initialState;

        let x = mouseX;
        let y = mouseY;

        if (y < top) {
            y = top;
        } else if (y > bottom) {
            y = bottom;
        }

        if (x < left) {
            x = left;
        } else if (x > right) {
            x = right;
        }

        return { x, y };
    }

    /**
     * Make sure the currently resized event occurrence doesn't overlap another event. If it is, save the resizing to the event so the schedule rerenders. Else, visually resize it without saving the change in the event.
     *
     * @param {number} position New position of the occurrence.
     */
    getHoveredEventCell(position, occurrence, resource) {
        const labelWidth =
            this.resizeSide === 'start'
                ? this.draggedEvent.leftLabelWidth * -1
                : this.draggedEvent.rightLabelWidth;
        const computedPosition = position + labelWidth;

        // Get the events present in the cell crossed
        const hoveredCell = getCellFromPosition(
            this.resourceElement,
            computedPosition,
            this._isVertical
        );
        const computedCell = resource.getCellFromStart(
            Number(hoveredCell.dataset.start)
        );
        const cellEvents = computedCell.events;

        // Check if any event in the cell has the same offsetTop
        const eventIsHovered = cellEvents.some((cellEvent) => {
            const isDifferent = cellEvent.key !== occurrence.key;
            const overlaps = cellEvent.offsetSide === occurrence.offsetSide;
            return isDifferent && overlaps;
        });

        // If one of them do, the dragged event is overlapping it.
        // We have to rerender the scheduler so the resource height enlarges.
        if (eventIsHovered) {
            return hoveredCell;
        }
        return null;
    }

    setDraggedEvent(draggedEvent, { mouseX, mouseY } = this._initialState) {
        this.draggedEvent = draggedEvent;
        this.initDraggedEventState(mouseX, mouseY);
    }

    /**
     * Update the width of the resized event.
     */
    updateDraggedEventStyleAfterResize(distanceMoved) {
        const { eventSize, initialY, initialX } = this._initialState;
        const side = this.resizeSide;
        const event = this.draggedEvent;
        const multiplier = side === 'start' ? -1 : 1;

        const size = eventSize + distanceMoved * multiplier;
        if (this._isVertical) {
            event.style.height = `${size}px`;
        } else {
            event.style.width = `${size}px`;
        }

        if (side === 'start') {
            const initialPosition = this._isVertical ? initialY : initialX;
            const computedStart =
                side === 'start'
                    ? distanceMoved + initialPosition
                    : distanceMoved;

            if (this._isVertical) {
                event.y = computedStart;
            } else {
                event.x = computedStart;
            }
        }
    }
}

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
import { AutoPosition, Direction } from 'c/positionLibrary';

// TODO: Will need LeftBottom, LeftTop, RightBottom, and RightTop cases when they're supported.
const BubbleAlign = {
    Bottom: {
        align: { horizontal: Direction.Center, vertical: Direction.Top },
        targetAlign: {
            horizontal: Direction.Center,
            vertical: Direction.Bottom
        }
    },
    BottomLeft: {
        align: { horizontal: Direction.Left, vertical: Direction.Top },
        targetAlign: { horizontal: Direction.Left, vertical: Direction.Bottom }
    },
    BottomRight: {
        align: { horizontal: Direction.Right, vertical: Direction.Top },
        targetAlign: {
            horizontal: Direction.Right,
            vertical: Direction.Bottom
        }
    },
    Left: {
        align: { horizontal: Direction.Right, vertical: Direction.Center },
        targetAlign: { horizontal: Direction.Left, vertical: Direction.Center }
    },
    Right: {
        align: { horizontal: Direction.Left, vertical: Direction.Center },
        targetAlign: {
            horizontal: Direction.Right,
            vertical: Direction.Center
        }
    },
    Top: {
        align: { horizontal: Direction.Center, vertical: Direction.Bottom },
        targetAlign: { horizontal: Direction.Center, vertical: Direction.Top }
    },
    TopLeft: {
        align: { horizontal: Direction.Left, vertical: Direction.Bottom },
        targetAlign: { horizontal: Direction.Left, vertical: Direction.Top }
    },
    TopRight: {
        align: { horizontal: Direction.Right, vertical: Direction.Bottom },
        targetAlign: { horizontal: Direction.Right, vertical: Direction.Top }
    }
};

export default class PositionLibraryBounding extends LightningElement {
    @api align = 'Bottom';
    @api elementBound;

    _autoPosition = null;
    _current = null;
    _visible = false;

    changeAlign(e) {
        this.align = e.target.getAttribute('data-align');
    }

    toggleElementBound(e) {
        this.elementBound = e.target.checked;
    }

    toggle(e) {
        this.hide();
        const pos = e.target.getAttribute('data-pos');
        if (pos !== this._current) {
            this.show(pos);
        }
    }

    show(pos) {
        this._current = pos;
        this._visible = true;
        const target = () => this.template.querySelector(`[data-pos=${pos}`);
        const config = BubbleAlign[this.align];
        this.startPositioning(target, config);
    }

    hide() {
        this._current = null;
        this._visible = false;
        const bubble = this.template.querySelector(
            'lightning-primitive-bubble'
        );
        bubble.visible = this._visible;

        this.stopPositioning();
    }

    startPositioning(target, config) {
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition
            .start({
                target,
                element: () =>
                    this.template.querySelector('lightning-primitive-bubble'),
                autoFlip: true,
                align: config.align,
                targetAlign: config.targetAlign,
                padLeft: config.padLeft,
                padTop: config.padTop,
                leftAsBoundary: !!this.elementBound
            })
            .then((autoPositionUpdater) => {
                const bubble = this.template.querySelector(
                    'lightning-primitive-bubble'
                );
                bubble.align = autoPositionUpdater.config.align;
                bubble.visible = this._visible;
            });
    }

    stopPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }
}

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

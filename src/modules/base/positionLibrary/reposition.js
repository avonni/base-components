import { bakeOff } from './elementProxyCache';
import { getZIndexBaseline } from 'c/utilsPrivate';

class RepositionQueue {
    callbacks = [];
    repositionScheduled = false;
    _constraints = [];
    timeoutId = 0;
    lastIndex = getZIndexBaseline();

    eventsBound = false;

    get nextIndex() {
        return this.lastIndex++;
    }

    get constraints() {
        return this._constraints;
    }

    set constraints(value) {
        this._constraints = this._constraints.concat(value);
    }

    dispatchRepositionCallbacks() {
        while (this.callbacks.length > 0) {
            this.callbacks.shift()();
        }
    }

    add(callback) {
        if (typeof callback === 'function') {
            this.callbacks.push(callback);
            return true;
        }
        return false;
    }

    scheduleReposition(callback) {
        if (this.timeoutId === 0) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            this.timeoutId = setTimeout(() => {
                this.reposition(callback);
            }, 10);
        }
    }

    reposition(callback) {
        // all the callbacks will be called
        if (typeof callback === 'function') {
            this.callbacks.push(callback);
        }
        // this is for throttling
        clearTimeout(this.timeoutId);
        this.timeoutId = 0;

        // this semaphore is to make sure
        // if reposition is called twice within one frame
        // we only run this once
        if (!this.repositionScheduled) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            requestAnimationFrame(() => {
                this.repositionScheduled = false;
                // this must be executed in order or constraints
                // will behave oddly
                this._constraints = this._constraints.filter((constraint) => {
                    if (!constraint.destroyed) {
                        constraint.computeDisplacement().computePosition();
                        return true;
                    }
                    return false;
                });

                bakeOff();
                this.dispatchRepositionCallbacks();
            });
            this.repositionScheduled = true;
        }
    }

    get repositioning() {
        if (!this._reposition) {
            this._reposition = this.scheduleReposition.bind(this);
        }
        return this._reposition;
    }

    bindEvents() {
        if (!this.eventsBound) {
            window.addEventListener('resize', this.repositioning);
            window.addEventListener('scroll', this.repositioning);
            this.eventsBound = true;
        }
    }

    detachEvents() {
        window.removeEventListener('resize', this.repositioning);
        window.removeEventListener('scroll', this.repositioning);
        this.eventsBound = false;
    }

    rebase(index) {
        if (this.lastIndex <= index) {
            this.lastIndex = index + 1;
        }
    }
}

const positionQueue = new RepositionQueue();

export function scheduleReposition(callback) {
    positionQueue.scheduleReposition(callback);
}

export function bindEvents() {
    positionQueue.bindEvents();
}

export function addConstraints(list) {
    positionQueue.constraints = list;
}

export function reposition(callback) {
    positionQueue.reposition(callback);
}

export function nextIndex() {
    return positionQueue.nextIndex;
}

export function rebaseIndex(index) {
    return positionQueue.rebase(index);
}

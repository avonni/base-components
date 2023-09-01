

import { LightningElement, api } from 'lwc';

export default class Timer extends LightningElement {
    @api value;
    @api variant;
    @api type;
    @api duration;
    @api autoStart;
    @api repeat;
    @api iconName;
    @api iconPosition;
    @api format;

    get timer() {
        return this.template.querySelector('c-timer');
    }

    start() {
        this.timer.start();
    }

    pause() {
        this.timer.pause();
    }

    stopTimer() {
        this.timer.stop();
    }

    reset() {
        this.timer.reset();
    }
}

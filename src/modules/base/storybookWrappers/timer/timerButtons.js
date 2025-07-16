import { LightningElement, api } from 'lwc';

export default class Timer extends LightningElement {
    @api autoStart;
    @api duration;
    @api format;
    @api iconName;
    @api iconPosition;
    @api repeat;
    @api type;
    @api value;
    @api variant;

    get timer() {
        return this.template.querySelector('c-timer');
    }

    pause() {
        this.timer.pause();
    }

    reset() {
        this.timer.reset();
    }

    start() {
        this.timer.start();
    }

    stopTimer() {
        this.timer.stop();
    }
}

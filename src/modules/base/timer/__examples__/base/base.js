import { LightningElement } from 'lwc';

export default class TimerBase extends LightningElement {
    get timer() {
        return this.template.querySelector('avonni-timer');
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

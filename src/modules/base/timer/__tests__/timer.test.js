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

import { createElement } from 'lwc';
import Timer from 'c/timer';

// Not tested because of setInterval
// duration
// repeat
// type

describe('Timer', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    it('Default attributes', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        expect(element.autoStart).toBeFalsy();
        expect(element.duration).toBe(1);
        expect(element.format).toBe('hh:mm:ss');
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
        expect(element.repeat).toBeFalsy();
        expect(element.type).toBe('count-up');
        expect(element.value).toBe(0);
        expect(element.variant).toBe('neutral');
    });

    /* ----- ATTRIBUTES ----- */

    // auto-start
    it('autoStart = false', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.autoStart = false;

        return Promise.resolve().then(() => {
            expect(setInterval).not.toHaveBeenCalled();
        });
    });

    it('autoStart = true', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.autoStart = true;

        return Promise.resolve().then(() => {
            expect(setInterval).toHaveBeenCalled();
        });
    });

    // duration
    // Depends on start()
    // it('duration', () => {
    //     const element = createElement('base-timer', {
    //         is: Timer
    //     });

    //     document.body.appendChild(element);
    //     element.duration = 20000;
    //     element.start();

    //     return Promise.resolve().then(() => {
    //         jest.advanceTimersByTime(4000);
    //         expect(setInterval).toHaveBeenCalledTimes(2);
    //     });
    // });

    // format and value
    it('format = hh:mm:ss', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.format = 'hh:mm:ss';
        element.value = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('12:59:49');
        });
    });

    it('format = mm:ss', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.format = 'mm:ss';
        element.value = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('779:49');
        });
    });

    it('format = hh:mm', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.format = 'hh:mm';
        element.value = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('12:59');
        });
    });

    it('format = hh', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.format = 'hh';
        element.value = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('12');
        });
    });

    it('format = mm', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.format = 'mm';
        element.value = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('779');
        });
    });

    it('format = ss', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.format = 'ss';
        element.value = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe(46789);
        });
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // icon-position
    it('iconPosition', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconPosition).toBe('right');
        });
    });

    // repeat
    // Depends on value, duration and start()
    // it('repeat = true', () => {
    //     const element = createElement('base-timer', {
    //         is: Timer
    //     });

    //     document.body.appendChild(element);

    //     const handler = jest.fn();
    //     element.addEventListener('timereset', handler);
    //     element.value = 3000;
    //     element.duration = 2000;
    //     element.repeat = true;
    //     element.start();

    //     expect(handler).toHaveBeenCalled();
    // });

    // variant
    it('variant = neutral', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'neutral';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('neutral');
        });
    });

    it('variant = base', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('base');
        });
    });

    it('variant = brand', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('brand');
        });
    });

    it('variant = brand-outline', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'brand-outline';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('variant = destructive', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'destructive';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('destructive');
        });
    });

    it('variant = destructive-text', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'destructive-text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('variant = inverse', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('inverse');
        });
    });

    it('variant = success', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);
        element.variant = 'success';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('success');
        });
    });

    /* ----- METHODS AND EVENTS ----- */

    // start method and timerstart event
    it('start method and timerstart event', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('timerstart', handler);

        expect(setInterval).not.toHaveBeenCalled();
        element.start();
        expect(setInterval).toHaveBeenCalled();
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
        expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
        expect(handler.mock.calls[0][0].detail.hours).toBe(0);
        expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
        expect(handler.mock.calls[0][0].detail.duration).toBe(1);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // pause method and timerpause event
    it('pause method and timerpause event', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('timerpause', handler);

        element.pause();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
        expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
        expect(handler.mock.calls[0][0].detail.hours).toBe(0);
        expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
        expect(handler.mock.calls[0][0].detail.duration).toBe(1);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // stop method and timerstop event
    it('stop method and timerstop event', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('timerstop', handler);

        element.stop();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
        expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
        expect(handler.mock.calls[0][0].detail.hours).toBe(0);
        expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
        expect(handler.mock.calls[0][0].detail.duration).toBe(1);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // reset method and timerreset event
    it('reset method and timerreset event', () => {
        const element = createElement('base-timer', {
            is: Timer
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('timerreset', handler);

        element.reset();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
        expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
        expect(handler.mock.calls[0][0].detail.hours).toBe(0);
        expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
        expect(handler.mock.calls[0][0].detail.duration).toBe(1);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });
});

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
// repeat
// type

let element;
describe('Timer', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        jest.useFakeTimers();
        element = createElement('base-timer', {
            is: Timer
        });
        document.body.appendChild(element);
    });

    it('Timer: Default attributes', () => {
        expect(element.autoStart).toBeFalsy();
        expect(element.startTime).toBe(0);
        expect(element.duration).toBe(10000);
        expect(element.format).toBe('hh:mm:ss');
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
        expect(element.repeat).toBeFalsy();
        expect(element.type).toBe('count-up');
        expect(element.variant).toBe('neutral');
    });

    /* ----- ATTRIBUTES ----- */

    // auto-start
    it('Timer: autoStart = false', () => {
        element.autoStart = false;

        return Promise.resolve().then(() => {
            expect(setInterval).not.toHaveBeenCalled();
        });
    });

    it('Timer: autoStart = true', () => {
        element.autoStart = true;

        return Promise.resolve().then(() => {
            expect(setInterval).toHaveBeenCalled();
        });
    });

    // duration
    it('Timer: duration > 86400000', () => {
        element.duration = 86500000;

        return Promise.resolve().then(() => {
            expect(element.duration).toBe(86400000);
        });
    });

    it('Timer: duration = 86200000', () => {
        element.duration = 86200000;

        return Promise.resolve().then(() => {
            expect(element.duration).toBe(86200000);
        });
    });

    it('Timer: duration negative value', () => {
        element.duration = -86200000;

        return Promise.resolve().then(() => {
            expect(element.duration).toBe(10000);
        });
    });

    // type
    it('Timer: type', () => {
        element.type = 86400000;
        const DEFAULT_TYPE = 'count-up';

        return Promise.resolve().then(() => {
            expect(element.type).toBe(DEFAULT_TYPE);
        });
    });

    // repeat
    it('Timer: repeat false', () => {
        element.repeat = false;

        return Promise.resolve().then(() => {
            expect(element.repeat).toBeFalsy();
        });
    });

    it('Timer: repeat true', () => {
        element.repeat = true;

        return Promise.resolve().then(() => {
            expect(element.repeat).toBeTruthy();
        });
    });

    // format and value
    it('Timer: format = hh:mm:ss', () => {
        element.format = 'hh:mm:ss';
        element.startTime = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('12:59:49');
        });
    });

    it('Timer: format = mm:ss', () => {
        element.format = 'mm:ss';
        element.startTime = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('779:49');
        });
    });

    it('Timer: format = hh:mm', () => {
        element.format = 'hh:mm';
        element.startTime = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('12:59');
        });
    });

    it('Timer: format = hh', () => {
        element.format = 'hh';
        element.startTime = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('12');
        });
    });

    it('Timer: format = mm', () => {
        element.format = 'mm';
        element.startTime = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('779');
        });
    });

    it('Timer: format = ss', () => {
        element.format = 'ss';
        element.startTime = 46789000;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('46789');
        });
    });

    // icon-name
    it('Timer: iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // icon-position
    it('Timer: iconPosition', () => {
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.iconPosition).toBe('right');
        });
    });

    // repeat
    // Depends on value, duration and start()
    // it('Timer: repeat = true', () => {
    //     const handler = jest.fn();
    //     element.addEventListener('timereset', handler);
    //     element.startTime = 3000;
    //     element.duration = 2000;
    //     element.repeat = true;
    //     element.start();

    //     expect(handler).toHaveBeenCalled();
    // });

    // variant
    it('Timer: variant = neutral', () => {
        element.variant = 'neutral';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('neutral');
        });
    });

    it('Timer: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('base');
        });
    });

    it('Timer: variant = brand', () => {
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('brand');
        });
    });

    it('Timer: variant = brand-outline', () => {
        element.variant = 'brand-outline';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Timer: variant = destructive', () => {
        element.variant = 'destructive';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('destructive');
        });
    });

    it('Timer: variant = destructive-text', () => {
        element.variant = 'destructive-text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Timer: variant = inverse', () => {
        element.variant = 'inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('inverse');
        });
    });

    it('Timer: variant = success', () => {
        element.variant = 'success';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('success');
        });
    });

    /* ----- METHODS AND EVENTS ----- */

    // start method and timerstart event
    it('Timer: start method and timerstart event', () => {
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
        expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // pause method and timerpause event
    it('Timer: pause method and timerpause event', () => {
        const handler = jest.fn();
        element.addEventListener('timerpause', handler);

        element.pause();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
        expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
        expect(handler.mock.calls[0][0].detail.hours).toBe(0);
        expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
        expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // stop method and timerstop event
    it('Timer: stop method and timerstop event', () => {
        const handler = jest.fn();
        element.addEventListener('timerstop', handler);

        element.stop();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
        expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
        expect(handler.mock.calls[0][0].detail.hours).toBe(0);
        expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
        expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    // reset method and timerreset event
    it('Timer: reset method and timerreset event', () => {
        const handler = jest.fn();
        element.addEventListener('timerreset', handler);

        element.reset();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
        expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
        expect(handler.mock.calls[0][0].detail.hours).toBe(0);
        expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
        expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
        expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
        expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].composable).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });
});

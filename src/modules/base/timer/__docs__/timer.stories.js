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

import { Timer } from '../__examples__/timer';
import { html } from 'lit-html';

export default {
    title: 'Example/Timer',
    argTypes: {
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        timerValue: {
            name: 'timer-value',
            control: {
                type: 'number',
                min: 0
            },
            description: 'Default value of the timer.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        duration: {
            name: 'duration',
            control: {
                type: 'number',
                min: 1
            },
            description:
                'How long a timer runs in milliseconds. There is no maximum value.',
            table: {
                defaultValue: { summary: '1000' },
                type: { summary: 'number' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'neutral',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
                'success'
            ],
            description:
                'The variant changes the appearance of the timer. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success. This value defaults to neutral.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['count-up', 'count-down'],
            description:
                'Type of the timer. Valid values include count-up and count-down.',
            table: {
                defaultValue: { summary: 'count-up' },
                type: { summary: 'string' }
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body. Options include left and right. This value defaults to left.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' }
            }
        },
        format: {
            control: {
                type: 'select'
            },
            options: ['hh:mm:ss', 'mm:ss', 'hh:mm', 'hh', 'mm', 'ss'],
            description:
                'Format of the timer. Valid values include "hh:mm:ss", "mm:ss", "hh:mm", “hh”, “mm”, “ss”.',
            table: {
                defaultValue: { summary: 'hh:mm:ss' },
                type: { summary: 'string' }
            }
        },
        autoStart: {
            name: 'auto-start',
            control: {
                type: 'boolean'
            },
            description:
                'Whether the timer control automatically starts to play when the user navigates to the component.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        repeat: {
            control: {
                type: 'boolean'
            },
            description:
                'Whether a timer automatically restarts when it finishes running.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        autoStart: false,
        duration: 1000,
        format: 'hh:mm:ss',
        iconPosition: 'left',
        repeat: false,
        type: 'count-up',
        variant: 'neutral'
    }
};

const Template = (args) => {
    let component = Timer(args);

    const btnStart = document.createElement('ac-lightning-button');
    btnStart.onclick = () => component.start();
    btnStart.label = 'Start';

    const btnPause = document.createElement('ac-lightning-button');
    btnPause.onclick = () => component.pause();
    btnPause.label = 'Pause';

    const btnStop = document.createElement('ac-lightning-button');
    btnStop.onclick = () => component.stop();
    btnStop.label = 'Stop';

    const btnReset = document.createElement('ac-lightning-button');
    btnReset.onclick = () => component.reset();
    btnReset.label = 'Reset';

    return html`
        <div>${component}</div>
        <div class="slds-m-vertical_small">
            ${btnStart} ${btnPause} ${btnStop} ${btnReset}
        </div>
    `;
};

export const Base = Template.bind({});
Base.args = {
    duration: 10000
};

export const SuccessSeconds = Template.bind({});
SuccessSeconds.args = {
    duration: 10000,
    variant: 'success',
    format: 'mm:ss'
};

export const BrandIcon = Template.bind({});
BrandIcon.args = {
    iconName: 'utility:clock',
    duration: 10000,
    variant: 'brand'
};

export const DestructiveCountdown = Template.bind({});
DestructiveCountdown.args = {
    type: 'count-down',
    timerValue: 10,
    duration: 10000,
    format: 'mm:ss',
    variant: 'destructive',
    autoStart: true
};

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
import InputPen from 'c/inputPen';

let element;
const DATA_URL = 'data:image/png;base64,validValue';
let position = 0;

const MOUSEDOWN_EVENT = new MouseEvent('mousedown', {
    clientX: position,
    clientY: position
});

const MOUSEUP_EVENT = new MouseEvent('mouseup', {
    clientX: position + 5,
    clientY: position + 5
});

const MOUSEMOVE_EVENT = new MouseEvent('mousemove', {
    clientX: position,
    clientY: position
});

const MOCKED_CONTEXT = {
    clearRect: () => {},
    rect: () => {},
    fill: () => {},
    lineTo: () => {},
    bezierCurveTo: () => {},
    stroke: () => {},
    moveTo: () => {},
    arc: () => {},
    beginPath: () => {},
    drawImage: () => {}
};

// Mock for HTMLCanvasElement in tests.
HTMLCanvasElement.prototype.getContext = () => {
    return MOCKED_CONTEXT;
};

HTMLCanvasElement.prototype.toDataURL = () => {
    return undefined;
};

HTMLCanvasElement.prototype.getBoundingClientRect = () => {
    return { left: 0, top: 0 };
};

global.Image = class {
    constructor() {
        setTimeout(() => {
            this.onload();
        }, 100);
    }
};

function mockValueAssessment() {
    const spy = jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL');
    spy.mockReturnValue(DATA_URL)
        .mockReturnValueOnce(DATA_URL)
        .mockReturnValueOnce(DATA_URL)
        .mockReturnValueOnce('');
}

describe('Input pen', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        position = 0;
        jest.restoreAllMocks();
        jest.clearAllTimers();
    });

    beforeEach(() => {
        element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        jest.useFakeTimers();
    });

    it('Input pen Default attributes', () => {
        expect(element.color).toBe('#000');
        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.showSignaturePad).toBeFalsy();
        expect(element.variant).toBe('bottom-toolbar');
        expect(element.hideControls).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.disabledButtons).toMatchObject([]);
        expect(element.invalid).toBeFalsy();
        expect(element.size).toBe(10);
        expect(element.mode).toBe('draw');
    });

    /* ----- ATTRIBUTES ----- */

    // color
    it('color = valid', () => {
        element.color = '#ff0000';

        return Promise.resolve().then(() => {
            const cursor = element.shadowRoot.querySelector(
                '[data-element-id="cursor"]'
            );
            expect(cursor.style.getPropertyValue('--color')).toEqual('#ff0000');
        });
    });

    it('color = invalid', () => {
        element.color = 'invalid';

        return Promise.resolve().then(() => {
            const cursor = element.shadowRoot.querySelector(
                '[data-element-id="cursor"]'
            );
            expect(cursor.style.getPropertyValue('--color')).toEqual('#000');
        });
    });

    // disabled
    it('Input pen disabled', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const buttonIcons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttonIcons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
            const combobox =
                element.shadowRoot.querySelector('lightning-combobox');
            expect(combobox.disabled).toBeTruthy();
            const colorPicker =
                element.shadowRoot.querySelector('c-color-picker');
            expect(colorPicker.disabled).toBeTruthy();
            expect(element.classList).toContain('avonni-disabled');
        });
    });

    // label
    it('Input pen label', () => {
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            expect(label.textContent).toBe('This is a label');
        });
    });

    // field level help
    it('Input pen field level help', () => {
        element.fieldLevelHelp = 'This is a fieldLevelHelp text';

        return Promise.resolve().then(() => {
            const helpText =
                element.shadowRoot.querySelector('lightning-helptext');
            expect(helpText.content).toBe('This is a fieldLevelHelp text');
        });
    });

    // read only
    it('Input pen read only', () => {
        element.readOnly = true;

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-disabled');
        });
    });

    // required needs label
    it('Input pen required', () => {
        element.label = 'label';
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // variant
    it('Input pen variant bottom-toolbar', () => {
        element.variant = 'bottom-toolbar';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-reverse');
        });
    });

    it('Input pen variant top-toolbar', () => {
        element.variant = 'top-toolbar';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('avonni-reverse');
        });
    });

    // hide controls
    it('Input pen hide controls', () => {
        element.hideControls = true;

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '[data-element-id="toolbar"]'
            );
            expect(toolbar).toBeFalsy();
        });
    });

    // disabled buttons
    it('Input pen disabled buttons pen', () => {
        element.disabledButtons = 'pen';

        return Promise.resolve().then(() => {
            const draw = element.shadowRoot.querySelector(
                '[data-element-id="pen-tool"]'
            );
            expect(draw).toBeFalsy();
        });
    });

    it('Input pen disabled buttons eraser', () => {
        element.disabledButtons = 'eraser';

        return Promise.resolve().then(() => {
            const erase = element.shadowRoot.querySelector(
                '[data-element-id="eraser-tool"]'
            );
            expect(erase).toBeFalsy();
        });
    });

    it('Input pen disabled buttons ink', () => {
        element.disabledButtons = 'ink';

        return Promise.resolve().then(() => {
            const ink = element.shadowRoot.querySelector(
                '[data-element-id="ink-tool"]'
            );
            expect(ink).toBeFalsy();
        });
    });

    it('Input pen disabled buttons paint', () => {
        element.disabledButtons = 'paintbrush';

        return Promise.resolve().then(() => {
            const paint = element.shadowRoot.querySelector(
                '[data-element-id="paintbrush-tool"]'
            );
            expect(paint).toBeFalsy();
        });
    });

    it('Input pen disabled buttons clear', () => {
        element.disabledButtons = 'clear';

        return Promise.resolve().then(() => {
            const erase = element.shadowRoot.querySelector(
                '[data-element-id="clear-button"]'
            );
            expect(erase).toBeFalsy();
        });
    });

    it('Input pen disabled buttons size', () => {
        element.disabledButtons = 'size';

        return Promise.resolve().then(() => {
            const size = element.shadowRoot.querySelector(
                '[data-element-id="size-picker"]'
            );
            expect(size).toBeFalsy();
        });
    });

    it('Input pen disabled buttons color', () => {
        element.disabledButtons = 'color';

        return Promise.resolve().then(() => {
            const color = element.shadowRoot.querySelector(
                '[data-element-id="color-picker"]'
            );
            expect(color).toBeFalsy();
        });
    });

    it('Input pen disabled buttons background color', () => {
        element.disabledButtons = 'background';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '[data-element-id="background-color-picker"]'
            );
            expect(background).toBeFalsy();
        });
    });

    it('Input pen disabled buttons download', () => {
        element.disabledButtons = 'download';

        return Promise.resolve().then(() => {
            const download = element.shadowRoot.querySelector(
                '[data-element-id="download"]'
            );
            expect(download).toBeFalsy();
        });
    });

    it('Input pen disabled buttons undo', () => {
        element.disabledButtons = 'undo';

        return Promise.resolve().then(() => {
            const undo = element.shadowRoot.querySelector(
                '[data-element-id="undo"]'
            );
            expect(undo).toBeFalsy();
        });
    });

    it('Input pen disabled buttons redo', () => {
        element.disabledButtons = 'redo';

        return Promise.resolve().then(() => {
            const redo = element.shadowRoot.querySelector(
                '[data-element-id="redo"]'
            );
            expect(redo).toBeFalsy();
        });
    });

    it('All disabled buttons', () => {
        element.disabledButtons = [
            'pen',
            'paintbrush',
            'ink',
            'eraser',
            'size',
            'color',
            'background',
            'download',
            'undo',
            'redo',
            'clear'
        ];

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '[data-element-id="toolbar"]'
            );
            expect(toolbar).toBeFalsy();
        });
    });

    // showSignaturePad
    it('showSignaturePad = false', () => {
        element.invalid = false;

        return Promise.resolve().then(() => {
            expect(element.mode).toEqual('draw');
            expect(
                element.shadowRoot.querySelector('[data-element-id="x-field"]')
            ).toBeFalsy();
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="signature-underline"]'
                )
            ).toBeFalsy();
        });
    });

    it('showSignaturePad = true', () => {
        element.showSignaturePad = true;

        return Promise.resolve().then(() => {
            expect(element.mode).toEqual('ink');
            expect(
                element.shadowRoot.querySelector('[data-element-id="x-field"]')
            ).toBeTruthy();
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="signature-underline"]'
                )
            ).toBeTruthy();
        });
    });

    // size
    it('Size = 20', () => {
        element.size = 20;

        return Promise.resolve().then(() => {
            const cursor = element.shadowRoot.querySelector(
                '[data-element-id="cursor"]'
            );
            expect(element.size).toEqual(20);
            expect(cursor.style.getPropertyValue('--size')).toEqual('20');
        });
    });

    it('Size = invalid', () => {
        element.size = 'invalid';

        return Promise.resolve().then(() => {
            const cursor = element.shadowRoot.querySelector(
                '[data-element-id="cursor"]'
            );
            expect(element.size).toEqual(10);
            expect(cursor.style.getPropertyValue('--size')).toEqual('10');
        });
    });

    /* ------ TOOLS & BUTTONS ------ */

    it('pen tool', () => {
        element.mode = 'erase';
        return Promise.resolve().then(() => {
            const penButton = element.shadowRoot.querySelector(
                '[data-element-id="pen-tool"]'
            );
            penButton.click();
            expect(penButton).toBeTruthy();
            expect(element.mode).toEqual('draw');
        });
    });

    it('paintbrush tool', () => {
        return Promise.resolve().then(() => {
            const brushButton = element.shadowRoot.querySelector(
                '[data-element-id="paintbrush-tool"]'
            );
            brushButton.click();
            expect(brushButton).toBeTruthy();
            expect(element.mode).toEqual('paint');
        });
    });

    it('ink tool', () => {
        return Promise.resolve().then(() => {
            const inkButton = element.shadowRoot.querySelector(
                '[data-element-id="ink-tool"]'
            );
            inkButton.click();
            expect(inkButton).toBeTruthy();
            expect(element.mode).toEqual('ink');
        });
    });

    it('eraser tool', () => {
        return Promise.resolve().then(() => {
            const eraseButton = element.shadowRoot.querySelector(
                '[data-element-id="eraser-tool"]'
            );
            eraseButton.click();
            expect(eraseButton).toBeTruthy();
            expect(element.mode).toEqual('erase');
        });
    });

    it('size picker', () => {
        return Promise.resolve().then(() => {
            const sizePicker = element.shadowRoot.querySelector(
                '[data-element-id="size-picker"]'
            );
            sizePicker.dispatchEvent(
                CustomEvent('change', { detail: { value: 20 } })
            );
            expect(element.size).toEqual(20);
        });
    });

    it('color picker', () => {
        return Promise.resolve().then(() => {
            const colorPicker = element.shadowRoot.querySelector(
                '[data-element-id="color-picker"]'
            );
            colorPicker.dispatchEvent(
                CustomEvent('change', { detail: { hex: '#cc1913' } })
            );
            expect(element.color).toEqual('#cc1913');
        });
    });

    it('background color picker', () => {
        let ctxBackgroundColor;

        Object.defineProperty(MOCKED_CONTEXT, 'fillStyle', {
            set: jest.fn((value) => {
                ctxBackgroundColor = value;
            })
        });
        return Promise.resolve().then(() => {
            const backgroundColorPicker = element.shadowRoot.querySelector(
                '[data-element-id="background-color-picker"]'
            );
            backgroundColorPicker.dispatchEvent(
                CustomEvent('change', { detail: { hexa: '#cc1913ff' } })
            );
            expect(ctxBackgroundColor).toEqual('#cc1913ff');
        });
    });

    it('download button (with no content)', () => {
        let downloaded = false;
        let linkValue;
        const link = {
            click: () => {
                downloaded = true;
            }
        };
        Object.defineProperty(link, 'href', {
            set: jest.fn((value) => {
                linkValue = value;
            })
        });

        jest.spyOn(document, 'createElement').mockReturnValue(link);

        return Promise.resolve().then(() => {
            const downloadButton = element.shadowRoot.querySelector(
                '[data-element-id="download"]'
            );
            downloadButton.click();
            expect(downloaded).toBeTruthy();
            expect(linkValue).toEqual(
                'data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
            );
        });
    });

    it('undo (nothing to undo)', () => {
        const undoSpy = jest.spyOn(element, 'undo');

        return Promise.resolve().then(() => {
            const undoButton = element.shadowRoot.querySelector(
                '[data-element-id="undo"]'
            );
            undoButton.click();
            expect(undoSpy).not.toHaveBeenCalled();
        });
    });

    it('redo (nothing to redo)', () => {
        const redoSpy = jest.spyOn(element, 'redo');

        return Promise.resolve().then(() => {
            const redoButton = element.shadowRoot.querySelector(
                '[data-element-id="undo"]'
            );
            redoButton.click();
            expect(redoSpy).not.toHaveBeenCalled();
        });
    });

    it('reset button', () => {
        const clearSpy = jest.spyOn(MOCKED_CONTEXT, 'clearRect');

        return Promise.resolve().then(() => {
            const clearButton = element.shadowRoot.querySelector(
                '[data-element-id="clear-button"]'
            );
            clearButton.dispatchEvent(new CustomEvent('mousedown'));
            expect(clearSpy).toHaveBeenCalled();
        });
    });

    /* ------- VALIDITY ------- */

    //reportValidity
    it('reportValidity() should return true', () => {
        element.required = true;
        mockValueAssessment();
        element.value = DATA_URL;
        return Promise.resolve()
            .then(() => {
                jest.advanceTimersToNextTimer();
                expect(element.reportValidity()).toEqual(true);
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeFalsy();
            });
    });

    it('reportValidity() should return false', () => {
        element.required = true;
        return Promise.resolve()
            .then(() => {
                expect(element.reportValidity()).toEqual(false);
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeTruthy();
            });
    });

    //checkValidity
    it('checkValidity() should return true', () => {
        element.required = true;
        mockValueAssessment();
        element.value = DATA_URL;
        return Promise.resolve().then(() => {
            jest.advanceTimersToNextTimer();
            expect(element.checkValidity()).toEqual(true);
        });
    });

    it('checkValidity() should return false', () => {
        element.required = true;
        return Promise.resolve().then(() => {
            expect(element.checkValidity()).toEqual(false);
        });
    });

    //showHelpMessageIfInvalid
    it('showHelpMessageIfInvalid() should not show message', () => {
        element.required = true;
        mockValueAssessment();
        element.value = DATA_URL;
        return Promise.resolve()
            .then(() => {
                jest.advanceTimersToNextTimer();
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeFalsy();
            });
    });

    it('showHelpMessageIfInvalid() should show message', () => {
        element.required = true;
        return Promise.resolve()
            .then(() => {
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                const helpMessage = element.shadowRoot.querySelector(
                    '[data-element-id="help-message"]'
                );
                expect(helpMessage).toBeTruthy();
                expect(helpMessage.textContent).toEqual('Complete this field.');
            });
    });

    //setCustomValidity
    it('setCustomValidity() should set the display for custom message when invalid', () => {
        element.required = true;
        return Promise.resolve()
            .then(() => {
                element.setCustomValidity('custom help message');
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                const helpMessage = element.shadowRoot.querySelector(
                    '[data-element-id="help-message"]'
                );
                expect(helpMessage).toBeTruthy();
                expect(helpMessage.textContent).toEqual('custom help message');
            });
    });

    /* ------ SCENARIOS & EVENTS  ------ */

    it('drawing on canvas should clear message if invalid', () => {
        element.required = true;
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );

        return Promise.resolve()
            .then(() => {
                element.reportValidity();
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeTruthy();
            })
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
            })
            .then(() => {
                expect(
                    element.shadowRoot.querySelector(
                        '[data-element-id="help-message"]'
                    )
                ).toBeFalsy();
            });
    });

    it('drawing on canvas should add stroke (draw)', () => {
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
            })
            .then(() => {
                expect(strokeSpy).toHaveBeenCalled();
            });
    });

    it('drawing on canvas should add a stroke (paint)', () => {
        element.mode = 'paint';
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
            })
            .then(() => {
                expect(strokeSpy).toHaveBeenCalled();
            });
    });

    it('drawing on canvas should add stroke (ink)', () => {
        element.mode = 'ink';
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
            })
            .then(() => {
                expect(strokeSpy).toHaveBeenCalled();
            });
    });

    it('drawing on canvas should add stroke (erase)', () => {
        element.mode = 'erase';
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
            })
            .then(() => {
                expect(strokeSpy).toHaveBeenCalled();
            });
    });

    it('drawing on disabled canvas should not add stroke', () => {
        element.disabled = true;
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
            })
            .then(() => {
                expect(strokeSpy).not.toHaveBeenCalled();
            });
    });

    it('when mouse leaves or enters, its visibility is adjusted', () => {
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const cursor = element.shadowRoot.querySelector(
            '[data-element-id="cursor"]'
        );
        return Promise.resolve()
            .then(() => {
                drawArea.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                expect(cursor.style.opacity).toEqual('1');
            })
            .then(() => {
                drawArea.dispatchEvent(new CustomEvent('mouseleave'));
            })
            .then(() => {
                expect(cursor.style.opacity).toEqual('0');
            });
    });

    it('picking a color when tool is erase, makes it draw', () => {
        element.mode = 'erase';
        return Promise.resolve().then(() => {
            const colorPicker = element.shadowRoot.querySelector(
                '[data-element-id="color-picker"]'
            );
            colorPicker.dispatchEvent(
                CustomEvent('change', { detail: { hex: '#cc1913' } })
            );
            expect(element.color).toEqual('#cc1913');
            expect(element.mode).toEqual('draw');
        });
    });

    it('setting an invalid value clears the canvas', () => {
        const clearSpy = jest.spyOn(MOCKED_CONTEXT, 'clearRect');
        element.value = 'invalidValue';
        return Promise.resolve().then(() => {
            expect(clearSpy).toHaveBeenCalled();
        });
    });

    /* ------ OTHER PUBLIC METHODS  ------ */

    it('clear calls clearRect on canvas and resets value', () => {
        const clearSpy = jest.spyOn(MOCKED_CONTEXT, 'clearRect');
        return Promise.resolve()
            .then(() => {
                element.clear(true);
            })
            .then(() => {
                expect(clearSpy).toHaveBeenCalledTimes(2); //one for the background, the other for the foreground
                expect(element.value).toEqual(undefined);
            })
            .then(() => {
                element.clear();
            })
            .then(() => {
                expect(clearSpy).toHaveBeenCalledTimes(4);
                expect(element.value).toEqual(undefined);
            });
    });

    /* ------ UNDO / REDO  ------ */

    it('undo on 3 actions should redraw those 2 previous actions (strokes)', () => {
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
                expect(strokeSpy).toHaveBeenCalledTimes(1);
            })
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
                expect(strokeSpy).toHaveBeenCalledTimes(2);
            })
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
                expect(strokeSpy).toHaveBeenCalledTimes(3);
                // 3 actions drawn
            })
            .then(() => {
                const undoButton = element.shadowRoot.querySelector(
                    '[data-element-id="undo"]'
                );
                undoButton.click();
                expect(strokeSpy).toHaveBeenCalledTimes(5); // 2 more since last time
            });
    });

    it('redo after an undo should redraw the missing action (strokes)', () => {
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
                expect(strokeSpy).toHaveBeenCalledTimes(1);
            })
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
                expect(strokeSpy).toHaveBeenCalledTimes(2);
                // 2 actions drawn
            })
            .then(() => {
                const undoButton = element.shadowRoot.querySelector(
                    '[data-element-id="undo"]'
                );
                undoButton.click();
                expect(strokeSpy).toHaveBeenCalledTimes(3); // 1 more since last time
            })
            .then(() => {
                const redoButton = element.shadowRoot.querySelector(
                    '[data-element-id="redo"]'
                );
                redoButton.click();
                expect(strokeSpy).toHaveBeenCalledTimes(4); // 1 more since last time
            })
            .then(() => {
                const redoButton = element.shadowRoot.querySelector(
                    '[data-element-id="redo"]'
                );
                redoButton.click();
                expect(strokeSpy).toHaveBeenCalledTimes(4); // nothing more to redo
            });
    });

    it('redo and undo keyboard shortcuts', () => {
        const drawArea = element.shadowRoot.querySelector(
            '[data-element-id="draw-area"]'
        );
        const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
        return Promise.resolve()
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
                expect(strokeSpy).toHaveBeenCalledTimes(1);
            })
            .then(() => {
                mockValueAssessment();
                drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                window.dispatchEvent(MOUSEMOVE_EVENT);
                window.dispatchEvent(MOUSEUP_EVENT);
                expect(strokeSpy).toHaveBeenCalledTimes(2);
            })
            .then(() => {
                window.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 90 }) // ctrl-z
                );
                expect(strokeSpy).toHaveBeenCalledTimes(3);
            })
            .then(() => {
                window.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 89 }) // ctrl-y
                );
                expect(strokeSpy).toHaveBeenCalledTimes(4);
            });
    });

    it('redo and undo on background fill', () => {
        let ctxBackgroundColor;
        const fillRectSpy = jest.spyOn(MOCKED_CONTEXT, 'rect');
        Object.defineProperty(MOCKED_CONTEXT, 'fillStyle', {
            set: jest.fn((value) => {
                ctxBackgroundColor = value;
            })
        });
        return Promise.resolve()
            .then(() => {
                const backgroundColorPicker = element.shadowRoot.querySelector(
                    '[data-element-id="background-color-picker"]'
                );
                backgroundColorPicker.dispatchEvent(
                    CustomEvent('change', { detail: { hexa: '#cc1913ff' } })
                );
                expect(fillRectSpy).toHaveBeenCalledTimes(1);
                expect(ctxBackgroundColor).toEqual('#cc1913ff');
            })
            .then(() => {
                const backgroundColorPicker = element.shadowRoot.querySelector(
                    '[data-element-id="background-color-picker"]'
                );
                backgroundColorPicker.dispatchEvent(
                    CustomEvent('change', { detail: { hexa: '#1c298bff' } })
                );
                expect(fillRectSpy).toHaveBeenCalledTimes(2);
                expect(ctxBackgroundColor).toEqual('#1c298bff');
            })
            .then(() => {
                element.undo();
                expect(fillRectSpy).toHaveBeenCalledTimes(7);
                expect(ctxBackgroundColor).toEqual('#cc1913ff');
            })
            .then(() => {
                element.undo();
                expect(fillRectSpy).toHaveBeenCalledTimes(10);
                expect(ctxBackgroundColor).toEqual('#ffffff00');
            })
            .then(() => {
                element.redo();
                expect(fillRectSpy).toHaveBeenCalledTimes(13);
                expect(ctxBackgroundColor).toEqual('#cc1913ff');
            })
            .then(() => {
                element.redo();
                expect(fillRectSpy).toHaveBeenCalledTimes(16);
                expect(ctxBackgroundColor).toEqual('#1c298bff');
            });
    });

    it('redo and undo on clear', () => {
        const clearSpy = jest.spyOn(MOCKED_CONTEXT, 'clearRect');
        return Promise.resolve()
            .then(() => {
                element.clear();
            })
            .then(() => {
                expect(clearSpy).toHaveBeenCalledTimes(2);
            })
            .then(() => {
                element.clear();
            })
            .then(() => {
                expect(clearSpy).toHaveBeenCalledTimes(4);
            })
            .then(() => {
                element.undo();
                expect(clearSpy).toHaveBeenCalledTimes(11);
            })
            .then(() => {
                element.redo();
                expect(clearSpy).toHaveBeenCalledTimes(15);
            });
    });
});

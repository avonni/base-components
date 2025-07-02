import InputPen from 'c/inputPen';
import { createElement } from 'lwc';

let element;
const DATA_URL = 'data:image/png;base64,validValue';
let position = {
    x: 1,
    y: 1
};
const MOUSEDOWN_EVENT = new CustomEvent('mousedown');
const MOUSEUP_EVENT = new CustomEvent('mouseup');
const MOUSEMOVE_EVENT = new CustomEvent('mousemove');

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

function initMouseEvents() {
    MOUSEDOWN_EVENT.clientX = position.x;
    MOUSEDOWN_EVENT.clientY = position.y;

    MOUSEUP_EVENT.clientX = position.x;
    MOUSEUP_EVENT.clientY = position.y;

    MOUSEMOVE_EVENT.clientX = position.x;
    MOUSEMOVE_EVENT.clientY = position.y;
}

function nextMoveEvent(increase) {
    if (increase) {
        MOUSEMOVE_EVENT.clientX =
            MOUSEMOVE_EVENT.clientX + MOUSEMOVE_EVENT.clientX;
        MOUSEMOVE_EVENT.clientY =
            MOUSEMOVE_EVENT.clientY + MOUSEMOVE_EVENT.clientY;
    } else {
        MOUSEMOVE_EVENT.clientX =
            MOUSEMOVE_EVENT.clientX - MOUSEMOVE_EVENT.clientX / 2;
        MOUSEMOVE_EVENT.clientY =
            MOUSEMOVE_EVENT.clientY - MOUSEMOVE_EVENT.clientY / 2;
    }
}

// Not covered:
// default switch cases that are unreachable

describe('Input pen', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
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
        jest.spyOn(HTMLCanvasElement.prototype, 'width', 'get').mockReturnValue(
            100
        );
        jest.spyOn(
            HTMLCanvasElement.prototype,
            'height',
            'get'
        ).mockReturnValue(100);
        position._x = 1;
        position._y = 1;
        jest.useFakeTimers();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.backgroundColor).toBe('#ffffff00');
            expect(element.backgroundButtonAlternativeText).toBe(
                'Background color'
            );
            expect(element.clearButtonAlternativeText).toBe('Clear');
            expect(element.color).toBe('#000');
            expect(element.colorButtonAlternativeText).toBe('Pen color');
            expect(element.disabled).toBeFalsy();
            expect(element.disabledButtons).toMatchObject([]);
            expect(element.downloadButtonAlternativeText).toBe('Download PNG');
            expect(element.drawButtonAlternativeText).toBe('Draw');
            expect(element.eraseButtonAlternativeText).toBe('Erase');
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.hideControls).toBeFalsy();
            expect(element.inkButtonAlternativeText).toBe('Ink');
            expect(element.label).toBeUndefined();
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.mode).toBe('draw');
            expect(element.paintButtonAlternativeText).toBe('Paint');
            expect(element.readOnly).toBeFalsy();
            expect(element.redoButtonAlternativeText).toBe('Redo');
            expect(element.required).toBeFalsy();
            expect(element.showSignaturePad).toBeFalsy();
            expect(element.size).toBe(3);
            expect(element.sizeButtonAlternativeText).toBe('Size');
            expect(element.undoButtonAlternativeText).toBe('Undo');
            expect(element.validity).toBe(true);
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('bottom-toolbar');
        });

        describe('Alternative texts', () => {
            it('Background Alternative Text', () => {
                element.backgroundButtonAlternativeText = 'Arrière-plan';
                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="background-color-picker-li"]'
                    );
                    expect(background.title).toBe('Arrière-plan');
                });
            });

            it('Clear Alternative Text', () => {
                element.clearButtonAlternativeText = 'Effacer';
                return Promise.resolve().then(() => {
                    const clear = element.shadowRoot.querySelector(
                        '[data-element-id="clear-button"]'
                    );
                    expect(clear.alternativeText).toBe('Effacer');
                });
            });

            it('Color Alternative Text', () => {
                element.colorButtonAlternativeText = 'Couleur';

                return Promise.resolve().then(() => {
                    const color = element.shadowRoot.querySelector(
                        '[data-element-id="color-picker-li"]'
                    );
                    expect(color.title).toBe('Couleur');
                });
            });

            it('Download Alternative Text', () => {
                element.downloadButtonAlternativeText = 'Télécharger';

                return Promise.resolve().then(() => {
                    const download = element.shadowRoot.querySelector(
                        '[data-element-id="download-button"]'
                    );
                    expect(download.alternativeText).toBe('Télécharger');
                });
            });

            it('Draw Alternative Text', () => {
                element.drawButtonAlternativeText = 'Dessiner';

                return Promise.resolve().then(() => {
                    const draw = element.shadowRoot.querySelector(
                        '[data-element-id="draw-tool"]'
                    );
                    expect(draw.alternativeText).toBe('Dessiner');
                });
            });

            it('Erase Alternative Text', () => {
                element.eraseButtonAlternativeText = 'Effacer';

                return Promise.resolve().then(() => {
                    const erase = element.shadowRoot.querySelector(
                        '[data-element-id="erase-tool"]'
                    );
                    expect(erase.title).toBe('Effacer');
                });
            });

            it('Ink Alternative Text', () => {
                element.inkButtonAlternativeText = 'Ink';

                return Promise.resolve().then(() => {
                    const ink = element.shadowRoot.querySelector(
                        '[data-element-id="ink-tool"]'
                    );
                    expect(ink.title).toBe('Ink');
                });
            });

            it('Paint Alternative Text', () => {
                element.paintButtonAlternativeText = 'Peindre';
                return Promise.resolve().then(() => {
                    const paint = element.shadowRoot.querySelector(
                        '[data-element-id="paint-tool"]'
                    );
                    expect(paint.alternativeText).toBe('Peindre');
                });
            });

            it('Redo Alternative Text', () => {
                element.redoButtonAlternativeText = 'Refaire';

                return Promise.resolve().then(() => {
                    const redo = element.shadowRoot.querySelector(
                        '[data-element-id="redo-button"]'
                    );
                    expect(redo.alternativeText).toBe('Refaire');
                });
            });

            it('Size Alternative Text', () => {
                element.sizeButtonAlternativeText = 'Taille';

                return Promise.resolve().then(() => {
                    const size = element.shadowRoot.querySelector(
                        '[data-element-id="size-picker-li"]'
                    );
                    expect(size.title).toBe('Taille');
                });
            });

            it('Undo Alternative Text', () => {
                element.undoButtonAlternativeText = 'Annuler';

                return Promise.resolve().then(() => {
                    const undo = element.shadowRoot.querySelector(
                        '[data-element-id="undo-button"]'
                    );
                    expect(undo.alternativeText).toBe('Annuler');
                });
            });
        });

        describe('backgroundColor', () => {
            it('Passed to the component', () => {
                element.backgroundColor = '#00aa00';

                return Promise.resolve().then(() => {
                    const backgroundCtx = element.shadowRoot
                        .querySelector('[data-element-id="background-canvas"]')
                        .getContext('2d');
                    expect(backgroundCtx.fillStyle).toBe('#00aa00');
                });
            });
        });

        describe('color', () => {
            it('Passed to the component', () => {
                element.color = '#ff0000';

                return Promise.resolve().then(() => {
                    const cursor = element.shadowRoot.querySelector(
                        '[data-element-id="cursor"]'
                    );
                    expect(cursor.style.getPropertyValue('--color')).toEqual(
                        '#ff0000'
                    );
                });
            });

            it('Invalid color', () => {
                element.color = 'invalid';

                return Promise.resolve().then(() => {
                    const cursor = element.shadowRoot.querySelector(
                        '[data-element-id="cursor"]'
                    );
                    expect(cursor.style.getPropertyValue('--color')).toEqual(
                        '#000'
                    );
                });
            });
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-group-name="button"]'
                    );
                    buttons.forEach((button) => {
                        expect(button.disabled).toBeTruthy();
                    });
                    expect(element.classList).toContain('avonni-disabled');
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );
                    expect(label.textContent).toBe('This is a label');
                });
            });
        });

        describe('fieldLevelHelp', () => {
            it('Passed to the component', () => {
                element.fieldLevelHelp = 'This is a fieldLevelHelp text';

                return Promise.resolve().then(() => {
                    const helpText = element.shadowRoot.querySelector(
                        '[data-element-id="field-level-help"]'
                    );
                    expect(helpText.content).toBe(
                        'This is a fieldLevelHelp text'
                    );
                });
            });
        });

        describe('readOnly', () => {
            it('Passed to the component', () => {
                element.readOnly = true;

                return Promise.resolve().then(() => {
                    expect(element.classList).toContain('avonni-disabled');
                });
            });
        });

        describe('required', () => {
            it('Passed to the component', () => {
                element.label = 'label';
                element.required = true;

                return Promise.resolve().then(() => {
                    const required = element.shadowRoot.querySelector(
                        '[data-element-id="required-asterix"]'
                    );
                    expect(required).toBeTruthy();
                    expect(required.textContent).toBe('*');
                });
            });
        });

        describe('reset button', () => {
            it('mouseclick', () => {
                const clearSpy = jest.spyOn(MOCKED_CONTEXT, 'clearRect');

                return Promise.resolve().then(() => {
                    const clearButton = element.shadowRoot.querySelector(
                        '[data-element-id="clear-button"]'
                    );
                    clearButton.dispatchEvent(new CustomEvent('mousedown'));
                    expect(clearSpy).toHaveBeenCalled();
                });
            });

            it('keydown', () => {
                const clearSpy = jest.spyOn(MOCKED_CONTEXT, 'clearRect');

                return Promise.resolve().then(() => {
                    const clearButton = element.shadowRoot.querySelector(
                        '[data-element-id="clear-button"]'
                    );
                    clearButton.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'Enter',
                            bubbles: true
                        })
                    );
                    expect(clearSpy).toHaveBeenCalled();
                });
            });
        });

        describe('variant', () => {
            it('bottom-toolbar', () => {
                element.variant = 'bottom-toolbar';

                return Promise.resolve().then(() => {
                    expect(
                        element.shadowRoot.querySelector(
                            '[data-element-id="rich-text-editor"]'
                        ).classList
                    ).toContain('slds-grid_vertical-reverse');
                });
            });

            it('top-toolbar', () => {
                element.variant = 'top-toolbar';

                return Promise.resolve().then(() => {
                    expect(
                        element.shadowRoot.querySelector(
                            '[data-element-id="rich-text-editor"]'
                        ).classList
                    ).not.toContain('slds-grid_vertical-reverse');
                });
            });
        });

        describe('hideControls', () => {
            it('Passed to the component', () => {
                element.hideControls = true;

                return Promise.resolve().then(() => {
                    const toolbar = element.shadowRoot.querySelector(
                        '[data-element-id="toolbar"]'
                    );
                    expect(toolbar).toBeFalsy();
                });
            });
        });

        describe('disabledButtons', () => {
            it('All disabled buttons', () => {
                element.disabledButtons = [
                    'background',
                    'clear',
                    'color',
                    'download',
                    'eraser',
                    'ink',
                    'paintbrush',
                    'pen',
                    'redo',
                    'size',
                    'undo'
                ];

                return Promise.resolve().then(() => {
                    const toolbar = element.shadowRoot.querySelector(
                        '[data-element-id="toolbar"]'
                    );
                    expect(toolbar).toBeFalsy();
                });
            });

            it('background', () => {
                element.disabledButtons = 'background';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="background-color-picker"]'
                    );
                    expect(background).toBeFalsy();
                });
            });

            it('clear', () => {
                element.disabledButtons = 'clear';

                return Promise.resolve().then(() => {
                    const erase = element.shadowRoot.querySelector(
                        '[data-element-id="clear-button"]'
                    );
                    expect(erase).toBeFalsy();
                });
            });

            it('color', () => {
                element.disabledButtons = 'color';

                return Promise.resolve().then(() => {
                    const color = element.shadowRoot.querySelector(
                        '[data-element-id="color-picker"]'
                    );
                    expect(color).toBeFalsy();
                });
            });

            it('download', () => {
                element.disabledButtons = 'download';

                return Promise.resolve().then(() => {
                    const download = element.shadowRoot.querySelector(
                        '[data-element-id="download-button"]'
                    );
                    expect(download).toBeFalsy();
                });
            });

            it('eraser', () => {
                element.disabledButtons = 'eraser';

                return Promise.resolve().then(() => {
                    const erase = element.shadowRoot.querySelector(
                        '[data-element-id="erase-tool"]'
                    );
                    expect(erase).toBeFalsy();
                });
            });

            it('ink', () => {
                element.disabledButtons = 'ink';

                return Promise.resolve().then(() => {
                    const ink = element.shadowRoot.querySelector(
                        '[data-element-id="ink-tool"]'
                    );
                    expect(ink).toBeFalsy();
                });
            });

            it('paint', () => {
                element.disabledButtons = 'paintbrush';

                return Promise.resolve().then(() => {
                    const paint = element.shadowRoot.querySelector(
                        '[data-element-id="paint-tool"]'
                    );
                    expect(paint).toBeFalsy();
                });
            });

            it('pen', () => {
                element.disabledButtons = 'pen';

                return Promise.resolve().then(() => {
                    const draw = element.shadowRoot.querySelector(
                        '[data-element-id="draw-tool"]'
                    );
                    expect(draw).toBeFalsy();
                });
            });

            it('redo', () => {
                element.disabledButtons = 'redo';

                return Promise.resolve().then(() => {
                    const redo = element.shadowRoot.querySelector(
                        '[data-element-id="redo-button"]'
                    );
                    expect(redo).toBeFalsy();
                });
            });

            it('size', () => {
                element.disabledButtons = 'size';

                return Promise.resolve().then(() => {
                    const size = element.shadowRoot.querySelector(
                        '[data-element-id="size-picker"]'
                    );
                    expect(size).toBeFalsy();
                });
            });

            it('undo', () => {
                element.disabledButtons = 'undo';

                return Promise.resolve().then(() => {
                    const undo = element.shadowRoot.querySelector(
                        '[data-element-id="undo-button"]'
                    );
                    expect(undo).toBeFalsy();
                });
            });
        });

        describe('showSignaturePad', () => {
            it('false', () => {
                element.showSignaturePad = false;

                return Promise.resolve().then(() => {
                    expect(element.mode).toEqual('draw');
                    expect(
                        element.shadowRoot.querySelector(
                            '[data-element-id="x-field"]'
                        )
                    ).toBeFalsy();
                    expect(
                        element.shadowRoot.querySelector(
                            '[data-element-id="signature-underline"]'
                        )
                    ).toBeFalsy();
                });
            });

            it('true', () => {
                element.showSignaturePad = true;

                return Promise.resolve().then(() => {
                    expect(element.mode).toEqual('ink');
                    expect(
                        element.shadowRoot.querySelector(
                            '[data-element-id="x-field"]'
                        )
                    ).toBeTruthy();
                    expect(
                        element.shadowRoot.querySelector(
                            '[data-element-id="signature-underline"]'
                        )
                    ).toBeTruthy();
                });
            });
        });

        describe('size', () => {
            it('20', () => {
                element.size = 20;

                return Promise.resolve().then(() => {
                    const cursor = element.shadowRoot.querySelector(
                        '[data-element-id="cursor"]'
                    );
                    expect(element.size).toEqual(20);
                    expect(cursor.style.getPropertyValue('--size')).toEqual(
                        '20'
                    );
                });
            });

            it('invalid', () => {
                element.size = 'invalid';

                return Promise.resolve().then(() => {
                    const cursor = element.shadowRoot.querySelector(
                        '[data-element-id="cursor"]'
                    );
                    expect(element.size).toEqual(3);
                    expect(cursor.style.getPropertyValue('--size')).toEqual(
                        '3'
                    );
                });
            });
        });
    });

    describe('Tools & Buttons', () => {
        it('pen tool', () => {
            element.mode = 'erase';
            return Promise.resolve().then(() => {
                const penButton = element.shadowRoot.querySelector(
                    '[data-element-id="draw-tool"]'
                );
                penButton.click();
                expect(penButton).toBeTruthy();
                expect(element.mode).toEqual('draw');
            });
        });

        it('paintbrush tool', () => {
            return Promise.resolve().then(() => {
                const brushButton = element.shadowRoot.querySelector(
                    '[data-element-id="paint-tool"]'
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
                    '[data-element-id="erase-tool"]'
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
                    '[data-element-id="download-button"]'
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
                    '[data-element-id="undo-button"]'
                );
                undoButton.click();
                expect(undoSpy).not.toHaveBeenCalled();
            });
        });

        it('redo (nothing to redo)', () => {
            const redoSpy = jest.spyOn(element, 'redo');

            return Promise.resolve().then(() => {
                const redoButton = element.shadowRoot.querySelector(
                    '[data-element-id="redo-button"]'
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
    });

    describe('Validity', () => {
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
                    expect(helpMessage.textContent).toEqual(
                        'Complete this field.'
                    );
                });
        });

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
                    expect(helpMessage.textContent).toEqual(
                        'custom help message'
                    );
                });
        });
    });

    describe('Scenarios & Events', () => {
        it('background alpha is correct when value is hexa', () => {
            element.backgroundColor = '#00aa0080';
            return Promise.resolve().then(() => {
                const backgroundCtx = element.shadowRoot
                    .querySelector('[data-element-id="background-canvas"]')
                    .getContext('2d');
                expect(Math.round(backgroundCtx.globalAlpha * 100)).toBe(50);
            });
        });

        it('background alpha is correct when value is rgba', () => {
            element.backgroundColor = 'rgba(0, 170, 0, 0.5)';
            return Promise.resolve().then(() => {
                const backgroundCtx = element.shadowRoot
                    .querySelector('[data-element-id="background-canvas"]')
                    .getContext('2d');
                expect(backgroundCtx.globalAlpha).toBe(0.5);
            });
        });

        it('background alpha is correct when value is hsla', () => {
            element.backgroundColor = 'hsla(120, 100%, 25%, 0.5)';
            return Promise.resolve().then(() => {
                const backgroundCtx = element.shadowRoot
                    .querySelector('[data-element-id="background-canvas"]')
                    .getContext('2d');
                expect(backgroundCtx.globalAlpha).toBe(0.5);
            });
        });

        it('background alpha is correct when value is hex', () => {
            element.backgroundColor = '#00aa00';
            return Promise.resolve().then(() => {
                const backgroundCtx = element.shadowRoot
                    .querySelector('[data-element-id="background-canvas"]')
                    .getContext('2d');
                expect(backgroundCtx.globalAlpha).toBe(1);
            });
        });

        it('background alpha is correct when value is rgb', () => {
            element.backgroundColor = 'rgb(0, 170, 0)';
            return Promise.resolve().then(() => {
                const backgroundCtx = element.shadowRoot
                    .querySelector('[data-element-id="background-canvas"]')
                    .getContext('2d');
                expect(backgroundCtx.globalAlpha).toBe(1);
            });
        });

        it('background alpha is correct when value is hsl', () => {
            element.backgroundColor = 'hsl(120, 100%, 25%)';
            return Promise.resolve().then(() => {
                const backgroundCtx = element.shadowRoot
                    .querySelector('[data-element-id="background-canvas"]')
                    .getContext('2d');
                expect(backgroundCtx.globalAlpha).toBe(1);
            });
        });

        it('drawing on canvas should clear message if invalid', () => {
            element.required = true;
            const drawArea = element.shadowRoot.querySelector(
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
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
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
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
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
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
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEUP_EVENT);
                })
                .then(() => {
                    expect(strokeSpy).toHaveBeenCalled();
                });
        });

        it('drawing on canvas should add stroke (erase)', () => {
            element.mode = 'erase';
            const drawArea = element.shadowRoot.querySelector(
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(false);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEUP_EVENT);
                })
                .then(() => {
                    expect(strokeSpy).toHaveBeenCalled();
                });
        });

        it('drawing on disabled canvas should not add stroke', () => {
            element.disabled = true;
            const drawArea = element.shadowRoot.querySelector(
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    window.dispatchEvent(MOUSEUP_EVENT);
                })
                .then(() => {
                    expect(strokeSpy).not.toHaveBeenCalled();
                });
        });

        it('when mouse leaves or enters, its visibility is adjusted', () => {
            const drawArea = element.shadowRoot.querySelector(
                '[data-element-id="drawing-area"]'
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

        it('setting value should dispatch change', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);
            mockValueAssessment();
            element.value = DATA_URL;
            jest.advanceTimersToNextTimer();
            return Promise.resolve().then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                const details = handler.mock.calls[0][0].detail;
                expect(details).toEqual({ dataURL: DATA_URL });
                handler.mockClear();

                // Same value should not trigger change event.
                element.value = DATA_URL;
                jest.advanceTimersToNextTimer();
                expect(handler).not.toHaveBeenCalled();
            });
        });
    });

    describe('Other Public Methods', () => {
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

        it('undo on 3 actions should redraw those 2 previous actions (strokes)', () => {
            const drawArea = element.shadowRoot.querySelector(
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    window.dispatchEvent(MOUSEUP_EVENT);
                    expect(strokeSpy).toHaveBeenCalledTimes(1);
                })
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    window.dispatchEvent(MOUSEUP_EVENT);
                    expect(strokeSpy).toHaveBeenCalledTimes(2);
                })
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
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
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    window.dispatchEvent(MOUSEUP_EVENT);
                    expect(strokeSpy).toHaveBeenCalledTimes(1);
                })
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
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
                '[data-element-id="drawing-area"]'
            );
            initMouseEvents();
            const strokeSpy = jest.spyOn(MOCKED_CONTEXT, 'stroke');
            return Promise.resolve()
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    window.dispatchEvent(MOUSEUP_EVENT);
                    expect(strokeSpy).toHaveBeenCalledTimes(1);
                })
                .then(() => {
                    mockValueAssessment();
                    drawArea.dispatchEvent(MOUSEDOWN_EVENT);
                    nextMoveEvent(true);
                    window.dispatchEvent(MOUSEMOVE_EVENT);
                    window.dispatchEvent(MOUSEUP_EVENT);
                    expect(strokeSpy).toHaveBeenCalledTimes(2);
                })
                .then(() => {
                    window.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'z',
                            ctrlKey: true
                        }) // ctrl-z
                    );
                    expect(strokeSpy).toHaveBeenCalledTimes(3);
                })
                .then(() => {
                    window.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'y',
                            ctrlKey: true
                        }) // ctrl-y
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
                    const backgroundColorPicker =
                        element.shadowRoot.querySelector(
                            '[data-element-id="background-color-picker"]'
                        );
                    backgroundColorPicker.dispatchEvent(
                        CustomEvent('change', {
                            detail: { hexa: '#cc1913ff' }
                        })
                    );
                    expect(fillRectSpy).toHaveBeenCalledTimes(1);
                    expect(ctxBackgroundColor).toEqual('#cc1913ff');
                })
                .then(() => {
                    const backgroundColorPicker =
                        element.shadowRoot.querySelector(
                            '[data-element-id="background-color-picker"]'
                        );
                    backgroundColorPicker.dispatchEvent(
                        CustomEvent('change', {
                            detail: { hexa: '#1c298bff' }
                        })
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
});

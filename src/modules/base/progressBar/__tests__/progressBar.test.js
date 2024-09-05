import { createElement } from 'lwc';
import ProgressBar from 'c/progressBar';

const REFERENCE_LINES = [
    {
        label: 'Reference 1',
        value: 34,
        variant: 'lightest',
        borderStyle: 'dashed'
    },
    {
        label: 'Reference 2',
        value: 78,
        variant: 'inverse'
    },
    {
        label: 'Reference 3',
        value: 18
    }
];

const SIZES = ['x-small', 'small', 'medium', 'large', 'full'];

let element;
describe('ProgressBar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-progress-bar', {
            is: ProgressBar
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.isLoading).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.showPin).toBeFalsy();
            expect(element.showValue).toBeFalsy();
            expect(element.orientation).toBe('horizontal');
            expect(element.pinAttributes).toMatchObject({});
            expect(element.referenceLines).toMatchObject([]);
            expect(element.size).toBe('full');
            expect(element.textured).toBeFalsy();
            expect(element.theme).toBe('base');
            expect(element.thickness).toBe('medium');
            expect(element.value).toBe(0);
            expect(element.valuePrefix).toBeUndefined();
            expect(element.valueSuffix).toBeUndefined();
            expect(element.valuePosition).toBe('top-right');
            expect(element.variant).toBe('base');
        });

        describe('Is Loading', () => {
            it('false', () => {
                element.isLoading = false;

                return Promise.resolve()
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeFalsy();

                        element.orientation = 'vertical';
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeFalsy();
                    });
            });

            it('true', () => {
                element.isLoading = true;

                return Promise.resolve()
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeTruthy();

                        element.orientation = 'vertical';
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeTruthy();
                    });
            });
        });

        describe('Label', () => {
            it('label', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.avonni-progress-bar__label'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('Orientation', () => {
            // Depends on referenceLines
            it('horizontal', () => {
                element.orientation = 'horizontal';
                element.referenceLines = REFERENCE_LINES;

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    const primitives = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-reference-line"]'
                    );

                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_vertical'
                    );
                    expect(innerWrapper.style.clipPath).toBe(
                        `rect(0% 0% auto 0)`
                    );

                    primitives.forEach((primitive) => {
                        expect(primitive.orientation).toBe('horizontal');
                    });
                });
            });

            it('vertical', () => {
                element.orientation = 'vertical';
                element.referenceLines = REFERENCE_LINES;

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    const primitives = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-reference-line"]'
                    );

                    expect(outerWrapper.classList).toContain(
                        'slds-progress-bar_vertical'
                    );
                    expect(innerWrapper.style.clipPath).toBe(
                        `rect(100% 100% auto 0)`
                    );

                    primitives.forEach((primitive) => {
                        expect(primitive.orientation).toBe('vertical');
                    });
                });
            });
        });

        describe('Pin Attributes', () => {
            it('type = circle', () => {
                element.showValue = true;
                element.showPin = true;
                element.pinAttributes = {
                    type: 'circle'
                };

                return Promise.resolve().then(() => {
                    const pin = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-progress-bar-pin"]'
                    );

                    expect(pin).toBeTruthy();
                    expect(pin.classList).toContain(
                        'avonni-progress-bar__circle-pin'
                    );
                });
            });

            it('type = rectangle, position = left, with vertical orientation', () => {
                element.showValue = true;
                element.showPin = true;
                element.pinAttributes = {
                    type: 'rectangle',
                    position: 'left'
                };
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    const pin = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-progress-bar-pin"]'
                    );

                    expect(pin).toBeTruthy();
                    expect(pin.classList).toContain(
                        'avonni-progress-bar__rectangle-pin'
                    );
                    expect(pin.classList).toContain(
                        'avonni-progress-bar__pin-left'
                    );
                });
            });
        });

        describe('Reference Lines', () => {
            it('referenceLines', () => {
                element.referenceLines = REFERENCE_LINES;

                return Promise.resolve().then(() => {
                    const primitives = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-reference-line"]'
                    );

                    primitives.forEach((primitive, index) => {
                        expect(primitive.label).toBe(
                            REFERENCE_LINES[index].label
                        );
                        expect(primitive.value).toBe(
                            REFERENCE_LINES[index].value
                        );
                        expect(primitive.variant).toBe(
                            REFERENCE_LINES[index].variant || 'default'
                        );
                        expect(primitive.borderStyle).toBe(
                            REFERENCE_LINES[index].borderStyle || 'dotted'
                        );
                    });
                });
            });
        });

        describe('Show Pin', () => {
            it('false', () => {
                element.showPin = false;

                return Promise.resolve().then(() => {
                    const pin = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-progress-bar-pin"]'
                    );
                    expect(pin).toBeFalsy();
                });
            });

            it('showPin = true with showValue = false', () => {
                element.showPin = true;
                element.showValue = false;

                return Promise.resolve().then(() => {
                    const pin = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-progress-bar-pin"]'
                    );
                    expect(pin).toBeFalsy();
                });
            });

            it('showPin = true with showValue = true', () => {
                element.showPin = true;
                element.showValue = true;

                return Promise.resolve().then(() => {
                    const pin = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-progress-bar-pin"]'
                    );
                    expect(pin).toBeTruthy();
                });
            });
        });

        describe('Show Value', () => {
            it('false', () => {
                element.showValue = false;

                return Promise.resolve().then(() => {
                    const value = element.shadowRoot.querySelector(
                        '.avonni-progress-bar__value'
                    );
                    expect(value).toBeFalsy();
                });
            });

            it('true', () => {
                element.showValue = true;

                return Promise.resolve().then(() => {
                    const value = element.shadowRoot.querySelector(
                        '.avonni-progress-bar__value'
                    );
                    expect(value).toBeTruthy();
                });
            });
        });

        describe('Size', () => {
            // Depends on orientation
            it('full, with horizontal orientation', () => {
                element.size = 'full';
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size !== 'full') {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('full, with vertical orientation', () => {
                element.size = 'full';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'full') {
                            expect(wrapperVertical).toBeTruthy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('x-small, with horizontal orientation', () => {
                element.size = 'x-small';
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'x-small') {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeTruthy();
                            expect(innerWrapperVertical).toBeFalsy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('x-small, with vertical orientation', () => {
                element.size = 'x-small';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'x-small') {
                            expect(wrapperVertical).toBeTruthy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeTruthy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('small, with horizontal orientation', () => {
                element.size = 'small';
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'small') {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeTruthy();
                            expect(innerWrapperVertical).toBeFalsy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('small, with vertical orientation', () => {
                element.size = 'small';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'small') {
                            expect(wrapperVertical).toBeTruthy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeTruthy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('medium, with horizontal orientation', () => {
                element.size = 'medium';
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'medium') {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeTruthy();
                            expect(innerWrapperVertical).toBeFalsy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('medium, with vertical orientation', () => {
                element.size = 'medium';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'medium') {
                            expect(wrapperVertical).toBeTruthy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeTruthy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('large, with horizontal orientation', () => {
                element.size = 'large';
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'large') {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeTruthy();
                            expect(innerWrapperVertical).toBeFalsy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });

            it('large, with vertical orientation', () => {
                element.size = 'large';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    SIZES.forEach((size) => {
                        const wrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );
                        const wrapperHorizontal =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__horizontal_size-${size}`
                            );
                        const innerWrapperVertical =
                            element.shadowRoot.querySelector(
                                `.avonni-progress-bar__vertical_size-${size}`
                            );

                        if (size === 'large') {
                            expect(wrapperVertical).toBeTruthy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeTruthy();
                        } else {
                            expect(wrapperVertical).toBeFalsy();
                            expect(wrapperHorizontal).toBeFalsy();
                            expect(innerWrapperVertical).toBeFalsy();
                        }
                    });
                });
            });
        });

        describe('Textured', () => {
            it('false', () => {
                element.textured = false;

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'slds-theme_alert-texture'
                    );
                });
            });

            it('true', () => {
                element.textured = true;

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).toContain(
                        'slds-theme_alert-texture'
                    );
                });
            });
        });

        describe('Theme', () => {
            it('base', () => {
                element.theme = 'base';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-base'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });

            it('success', () => {
                element.theme = 'success';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });

            it('inverse', () => {
                element.theme = 'inverse';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });

            it('alt-inverse', () => {
                element.theme = 'alt-inverse';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });

            it('warning', () => {
                element.theme = 'warning';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });

            it('info', () => {
                element.theme = 'info';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });

            it('error', () => {
                element.theme = 'error';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });

            it('offline', () => {
                element.theme = 'offline';

                return Promise.resolve().then(() => {
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-success'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-alt-inverse'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-warning'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-info'
                    );
                    expect(innerWrapper.classList).not.toContain(
                        'avonni-progress-bar__bar_theme-error'
                    );
                    expect(innerWrapper.classList).toContain(
                        'avonni-progress-bar__bar_theme-offline'
                    );
                });
            });
        });

        describe('Thickness', () => {
            // Depends on referenceLines
            it('medium', () => {
                element.thickness = 'medium';
                element.referenceLines = REFERENCE_LINES;

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    const primitives = element.querySelectorAll(
                        '[data-element-id="avonni-primitive-reference-line"]-line'
                    );

                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_x-small'
                    );
                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_small'
                    );
                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_large'
                    );
                    primitives.forEach((primitive) => {
                        expect(primitive.thickness).toBe('medium');
                    });
                });
            });

            it('x-small', () => {
                element.thickness = 'x-small';
                element.referenceLines = REFERENCE_LINES;

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    const primitives = element.querySelectorAll(
                        '[data-element-id="avonni-primitive-reference-line"]-line'
                    );

                    expect(outerWrapper.classList).toContain(
                        'slds-progress-bar_x-small'
                    );
                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_small'
                    );
                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_large'
                    );
                    primitives.forEach((primitive) => {
                        expect(primitive.thickness).toBe('x-small');
                    });
                });
            });

            it('small', () => {
                element.thickness = 'small';
                element.referenceLines = REFERENCE_LINES;

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    const primitives = element.querySelectorAll(
                        '[data-element-id="avonni-primitive-reference-line"]-line'
                    );

                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_x-small'
                    );
                    expect(outerWrapper.classList).toContain(
                        'slds-progress-bar_small'
                    );
                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_large'
                    );
                    primitives.forEach((primitive) => {
                        expect(primitive.thickness).toBe('small');
                    });
                });
            });

            it('large', () => {
                element.thickness = 'large';
                element.referenceLines = REFERENCE_LINES;

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    const primitives = element.querySelectorAll(
                        '[data-element-id="avonni-primitive-reference-line"]-line'
                    );

                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_x-small'
                    );
                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_small'
                    );
                    expect(outerWrapper.classList).toContain(
                        'slds-progress-bar_large'
                    );
                    primitives.forEach((primitive) => {
                        expect(primitive.thickness).toBe('large');
                    });
                });
            });
        });

        describe('Value', () => {
            // Depends on showValue
            it('value', () => {
                element.value = 56;
                element.showValue = true;

                return Promise.resolve().then(() => {
                    const value = element.shadowRoot.querySelector(
                        '.avonni-progress-bar__value'
                    );
                    const assistiveText = element.shadowRoot.querySelector(
                        '.slds-assistive-text'
                    );
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );

                    expect(value.textContent.trim()).toBe('56%');
                    expect(assistiveText.textContent).toBe('Progress: 56%');
                    expect(innerWrapper.style.clipPath).toBe(
                        'rect(0% 56% auto 0)'
                    );
                });
            });

            it('value > 100', () => {
                element.value = 156;
                element.showValue = true;

                return Promise.resolve().then(() => {
                    const value = element.shadowRoot.querySelector(
                        '.avonni-progress-bar__value'
                    );
                    const assistiveText = element.shadowRoot.querySelector(
                        '.slds-assistive-text'
                    );
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );

                    expect(value.textContent.trim()).toBe('100%');
                    expect(assistiveText.textContent).toBe('Progress: 100%');
                    expect(innerWrapper.style.clipPath).toBe(
                        'rect(0% 100% auto 0)'
                    );
                });
            });

            it('value NaN', () => {
                element.value = 'a';
                element.showValue = true;

                return Promise.resolve().then(() => {
                    const value = element.shadowRoot.querySelector(
                        '.avonni-progress-bar__value'
                    );
                    const assistiveText = element.shadowRoot.querySelector(
                        '.slds-assistive-text'
                    );
                    const innerWrapper = element.shadowRoot.querySelector(
                        '.slds-progress-bar__value'
                    );

                    expect(value.textContent.trim()).toBe('0%');
                    expect(assistiveText.textContent).toBe('Progress: 0%');
                    expect(innerWrapper.style.clipPath).toBe(
                        'rect(0% 0% auto 0)'
                    );
                });
            });
        });

        describe('Value Labels', () => {
            // Depends on showValue
            it('valuePrefix, valueSuffix', () => {
                element.valuePrefix = 'Prefix';
                element.valueSuffix = 'Suffix';
                element.showValue = true;

                return Promise.resolve().then(() => {
                    const value = element.shadowRoot.querySelector(
                        '.avonni-progress-bar__value'
                    );
                    expect(value.textContent.trim()).toBe('Prefix 0% Suffix');
                });
            });
        });

        describe('Value Position', () => {
            // Depends on showValue
            it('top-right', () => {
                element.showValue = true;
                element.valuePosition = 'top-right';

                return Promise.resolve().then(() => {
                    const left = element.shadowRoot.querySelector(
                        '[data-position-left]'
                    );
                    const topLeft = element.shadowRoot.querySelector(
                        '[data-position-top-left]'
                    );
                    const topRight = element.shadowRoot.querySelector(
                        '[data-position-top-right]'
                    );
                    const bottomRight = element.shadowRoot.querySelector(
                        '[data-position-bottom-right]'
                    );
                    const bottomLeft = element.shadowRoot.querySelector(
                        '[data-position-bottom-left]'
                    );
                    const right = element.shadowRoot.querySelector(
                        '[data-position-right]'
                    );

                    expect(left).toBeFalsy();
                    expect(topLeft).toBeFalsy();
                    expect(topRight).toBeTruthy();
                    expect(bottomRight).toBeFalsy();
                    expect(bottomLeft).toBeFalsy();
                    expect(right).toBeFalsy();
                });
            });

            it('left', () => {
                element.showValue = true;
                element.valuePosition = 'left';

                return Promise.resolve().then(() => {
                    const left = element.shadowRoot.querySelector(
                        '[data-position-left]'
                    );
                    const topLeft = element.shadowRoot.querySelector(
                        '[data-position-top-left]'
                    );
                    const topRight = element.shadowRoot.querySelector(
                        '[data-position-top-right]'
                    );
                    const bottomRight = element.shadowRoot.querySelector(
                        '[data-position-bottom-right]'
                    );
                    const bottomLeft = element.shadowRoot.querySelector(
                        '[data-position-bottom-left]'
                    );
                    const right = element.shadowRoot.querySelector(
                        '[data-position-right]'
                    );

                    expect(left).toBeTruthy();
                    expect(topLeft).toBeFalsy();
                    expect(topRight).toBeFalsy();
                    expect(bottomRight).toBeFalsy();
                    expect(bottomLeft).toBeFalsy();
                    expect(right).toBeFalsy();
                });
            });

            it('top-left', () => {
                element.showValue = true;
                element.valuePosition = 'top-left';

                return Promise.resolve().then(() => {
                    const left = element.shadowRoot.querySelector(
                        '[data-position-left]'
                    );
                    const topLeft = element.shadowRoot.querySelector(
                        '[data-position-top-left]'
                    );
                    const topRight = element.shadowRoot.querySelector(
                        '[data-position-top-right]'
                    );
                    const bottomRight = element.shadowRoot.querySelector(
                        '[data-position-bottom-right]'
                    );
                    const bottomLeft = element.shadowRoot.querySelector(
                        '[data-position-bottom-left]'
                    );
                    const right = element.shadowRoot.querySelector(
                        '[data-position-right]'
                    );

                    expect(left).toBeFalsy();
                    expect(topLeft).toBeTruthy();
                    expect(topRight).toBeFalsy();
                    expect(bottomRight).toBeFalsy();
                    expect(bottomLeft).toBeFalsy();
                    expect(right).toBeFalsy();
                });
            });

            it('bottom-right', () => {
                element.showValue = true;
                element.valuePosition = 'bottom-right';

                return Promise.resolve().then(() => {
                    const left = element.shadowRoot.querySelector(
                        '[data-position-left]'
                    );
                    const topLeft = element.shadowRoot.querySelector(
                        '[data-position-top-left]'
                    );
                    const topRight = element.shadowRoot.querySelector(
                        '[data-position-top-right]'
                    );
                    const bottomRight = element.shadowRoot.querySelector(
                        '[data-position-bottom-right]'
                    );
                    const bottomLeft = element.shadowRoot.querySelector(
                        '[data-position-bottom-left]'
                    );
                    const right = element.shadowRoot.querySelector(
                        '[data-position-right]'
                    );

                    expect(left).toBeFalsy();
                    expect(topLeft).toBeFalsy();
                    expect(topRight).toBeFalsy();
                    expect(bottomRight).toBeTruthy();
                    expect(bottomLeft).toBeFalsy();
                    expect(right).toBeFalsy();
                });
            });

            it('bottom-left', () => {
                element.showValue = true;
                element.valuePosition = 'bottom-left';

                return Promise.resolve().then(() => {
                    const left = element.shadowRoot.querySelector(
                        '[data-position-left]'
                    );
                    const topLeft = element.shadowRoot.querySelector(
                        '[data-position-top-left]'
                    );
                    const topRight = element.shadowRoot.querySelector(
                        '[data-position-top-right]'
                    );
                    const bottomRight = element.shadowRoot.querySelector(
                        '[data-position-bottom-right]'
                    );
                    const bottomLeft = element.shadowRoot.querySelector(
                        '[data-position-bottom-left]'
                    );
                    const right = element.shadowRoot.querySelector(
                        '[data-position-right]'
                    );

                    expect(left).toBeFalsy();
                    expect(topLeft).toBeFalsy();
                    expect(topRight).toBeFalsy();
                    expect(bottomRight).toBeFalsy();
                    expect(bottomLeft).toBeTruthy();
                    expect(right).toBeFalsy();
                });
            });

            it('right', () => {
                element.showValue = true;
                element.valuePosition = 'right';

                return Promise.resolve().then(() => {
                    const left = element.shadowRoot.querySelector(
                        '[data-position-left]'
                    );
                    const topLeft = element.shadowRoot.querySelector(
                        '[data-position-top-left]'
                    );
                    const topRight = element.shadowRoot.querySelector(
                        '[data-position-top-right]'
                    );
                    const bottomRight = element.shadowRoot.querySelector(
                        '[data-position-bottom-right]'
                    );
                    const bottomLeft = element.shadowRoot.querySelector(
                        '[data-position-bottom-left]'
                    );
                    const right = element.shadowRoot.querySelector(
                        '[data-position-right]'
                    );

                    expect(left).toBeFalsy();
                    expect(topLeft).toBeFalsy();
                    expect(topRight).toBeFalsy();
                    expect(bottomRight).toBeFalsy();
                    expect(bottomLeft).toBeFalsy();
                    expect(right).toBeTruthy();
                });
            });
        });

        describe('Variant', () => {
            it('base', () => {
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    expect(outerWrapper.classList).not.toContain(
                        'slds-progress-bar_circular'
                    );
                });
            });

            it('circular', () => {
                element.variant = 'circular';

                return Promise.resolve().then(() => {
                    const outerWrapper =
                        element.shadowRoot.querySelector('.slds-progress-bar');
                    expect(outerWrapper.classList).toContain(
                        'slds-progress-bar_circular'
                    );
                });
            });
        });
    });
});

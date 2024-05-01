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

    it('Progress Bar: Default attributes', () => {
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

    /* ----- ATTRIBUTES ----- */

    // is-loading
    it('Progress Bar: isLoading = false', () => {
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

    it('Progress Bar: isLoading = true', () => {
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

    // label
    it('Progress Bar: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-bar__label_font'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // show-pin
    it('Progress Bar: showPin = false', () => {
        element.showPin = false;

        return Promise.resolve().then(() => {
            const pin = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar-pin"]'
            );
            expect(pin).toBeFalsy();
        });
    });

    it('Progress Bar: showPin = true with showValue = false', () => {
        element.showPin = true;
        element.showValue = false;

        return Promise.resolve().then(() => {
            const pin = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar-pin"]'
            );
            expect(pin).toBeFalsy();
        });
    });

    it('Progress Bar: showPin = true with showValue = true', () => {
        element.showPin = true;
        element.showValue = true;

        return Promise.resolve().then(() => {
            const pin = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar-pin"]'
            );
            expect(pin).toBeTruthy();
        });
    });

    // show-value
    it('Progress Bar: showValue = false', () => {
        element.showValue = false;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            expect(value).toBeFalsy();
        });
    });

    it('Progress Bar: showValue = true', () => {
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            expect(value).toBeTruthy();
        });
    });

    // orientation
    // Depends on referenceLines
    it('Progress Bar: orientation = horizontal', () => {
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
            expect(innerWrapper.style.clipPath).toBe(`rect(0% 0% auto 0)`);

            primitives.forEach((primitive) => {
                expect(primitive.orientation).toBe('horizontal');
            });
        });
    });

    it('Progress Bar: orientation = vertical', () => {
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
            expect(innerWrapper.style.clipPath).toBe(`rect(100% 100% auto 0)`);

            primitives.forEach((primitive) => {
                expect(primitive.orientation).toBe('vertical');
            });
        });
    });

    // pin-attributes
    it('Progress Bar: pinAttributes, type = circle', () => {
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
            expect(pin.classList).toContain('avonni-progress-bar__circle-pin');
        });
    });

    it('Progress Bar: pinAttributes, type = rectangle, position = left, with vertical orientation', () => {
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
            expect(pin.classList).toContain('avonni-progress-bar__pin-left');
        });
    });

    // reference-lines
    it('Progress Bar: referenceLines', () => {
        element.referenceLines = REFERENCE_LINES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-reference-line"]'
            );

            primitives.forEach((primitive, index) => {
                expect(primitive.label).toBe(REFERENCE_LINES[index].label);
                expect(primitive.value).toBe(REFERENCE_LINES[index].value);
                expect(primitive.variant).toBe(
                    REFERENCE_LINES[index].variant || 'default'
                );
                expect(primitive.borderStyle).toBe(
                    REFERENCE_LINES[index].borderStyle || 'dotted'
                );
            });
        });
    });

    // size
    // Depends on orientation
    it('Progress Bar: size = full, with horizontal orientation', () => {
        element.size = 'full';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );

                if (size !== 'full') {
                    expect(wrapperVertical).toBeFalsy();
                    expect(wrapperHorizontal).toBeFalsy();
                    expect(innerWrapperVertical).toBeFalsy();
                }
            });
        });
    });

    it('Progress Bar: size = full, with vertical orientation', () => {
        element.size = 'full';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = x-small, with horizontal orientation', () => {
        element.size = 'x-small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = x-small, with vertical orientation', () => {
        element.size = 'x-small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = small, with horizontal orientation', () => {
        element.size = 'small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = small, with vertical orientation', () => {
        element.size = 'small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = medium, with horizontal orientation', () => {
        element.size = 'medium';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = medium, with vertical orientation', () => {
        element.size = 'medium';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = large, with horizontal orientation', () => {
        element.size = 'large';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    it('Progress Bar: size = large, with vertical orientation', () => {
        element.size = 'large';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            SIZES.forEach((size) => {
                const wrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
                );
                const wrapperHorizontal = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__bar-horizontal_size-${size}`
                );
                const innerWrapperVertical = element.shadowRoot.querySelector(
                    `.avonni-progress-bar__vertical-bar_size-${size}`
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

    // textured
    it('Progress Bar: textured = false', () => {
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

    it('Progress Bar: textured = true', () => {
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

    // theme
    it('Progress Bar: theme = base', () => {
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

    it('Progress Bar: theme = success', () => {
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

    it('Progress Bar: theme = inverse', () => {
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

    it('Progress Bar: theme = alt-inverse', () => {
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

    it('Progress Bar: theme = warning', () => {
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

    it('Progress Bar: theme = info', () => {
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

    it('Progress Bar: theme = error', () => {
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

    it('Progress Bar: theme = offline', () => {
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

    // thickness
    // Depends on referenceLines
    it('Progress Bar: thickness = medium', () => {
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

    it('Progress Bar: thickness = x-small', () => {
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

    it('Progress Bar: thickness = small', () => {
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
            expect(outerWrapper.classList).toContain('slds-progress-bar_small');
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_large'
            );
            primitives.forEach((primitive) => {
                expect(primitive.thickness).toBe('small');
            });
        });
    });

    it('Progress Bar: thickness = large', () => {
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
            expect(outerWrapper.classList).toContain('slds-progress-bar_large');
            primitives.forEach((primitive) => {
                expect(primitive.thickness).toBe('large');
            });
        });
    });

    // value
    // Depends on showValue
    it('Progress Bar: value', () => {
        element.value = 56;
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar__value'
            );

            expect(value.textContent.trim()).toBe('56%');
            expect(assistiveText.textContent).toBe('Progress: 56%');
            expect(innerWrapper.style.clipPath).toBe('rect(0% 56% auto 0)');
        });
    });

    it('Progress Bar: value > 100', () => {
        element.value = 156;
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar__value'
            );

            expect(value.textContent.trim()).toBe('100%');
            expect(assistiveText.textContent).toBe('Progress: 100%');
            expect(innerWrapper.style.clipPath).toBe('rect(0% 100% auto 0)');
        });
    });

    it('Progress Bar: value NaN', () => {
        element.value = 'a';
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            const assistiveText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const innerWrapper = element.shadowRoot.querySelector(
                '.slds-progress-bar__value'
            );

            expect(value.textContent.trim()).toBe('0%');
            expect(assistiveText.textContent).toBe('Progress: 0%');
            expect(innerWrapper.style.clipPath).toBe('rect(0% 0% auto 0)');
        });
    });

    // value-label
    // Depends on showValue
    it('Progress Bar: value labels', () => {
        element.valuePrefix = 'Prefix';
        element.valueSuffix = 'Suffix';
        element.showValue = true;

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '.avonni-progress-bar__value_font'
            );
            expect(value.textContent.trim()).toBe('Prefix 0% Suffix');
        });
    });

    // value-position
    // Depends on showValue
    it('Progress Bar: valuePosition = top-right', () => {
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

    it('Progress Bar: valuePosition = left', () => {
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

    it('Progress Bar: valuePosition = top-left', () => {
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

    it('Progress Bar: valuePosition = bottom-right', () => {
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

    it('Progress Bar: valuePosition = bottom-left', () => {
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

    it('Progress Bar: valuePosition = right', () => {
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

    // variant
    it('Progress Bar: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const outerWrapper =
                element.shadowRoot.querySelector('.slds-progress-bar');
            expect(outerWrapper.classList).not.toContain(
                'slds-progress-bar_circular'
            );
        });
    });

    it('Progress Bar: variant = circular', () => {
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

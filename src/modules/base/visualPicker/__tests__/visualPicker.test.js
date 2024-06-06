import { createElement } from 'lwc';
import VisualPicker from 'c/visualPicker';
import { ITEMS, ITEMS_WITH_TAGS } from './data';

const longItems = [];
for (let i = 0; i < 100; i++) {
    const id = longItems.length + i;
    longItems.push({
        avatar: { iconName: `custom:custom${id}` },
        value: `item-${id}`,
        title: `Item ${id}`
    });
}

let element;
describe('Visual Picker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-visual-picker', {
            is: VisualPicker
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    /*
     * -------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.columnAttributes).toMatchObject({});
            expect(element.disabled).toBeFalsy();
            expect(element.fieldAttributes).toMatchObject({});
            expect(element.hideCheckMark).toBeFalsy();
            expect(element.imageAttributes).toMatchObject({});
            expect(element.items).toMatchObject([]);
            expect(element.label).toBeUndefined();
            expect(element.max).toBeUndefined();
            expect(element.min).toBe(0);
            expect(element.messageWhenRangeOverflow).toBeUndefined();
            expect(element.messageWhenRangeUnderflow).toBeUndefined();
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.name).not.toBeUndefined();
            expect(element.ratio).toBe('1-by-1');
            expect(element.required).toBeFalsy();
            expect(element.size).toBe('medium');
            expect(element.type).toBe('radio');
            expect(element.validity).toMatchObject({});
            expect(element.value).toMatchObject([]);
            expect(element.variant).toBe('non-coverable');
        });

        // column attributes
        describe('Column Attributes', () => {
            it('Default values', () => {
                element.columnAttributes = {};
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    expect(element.columnAttributes.cols).toBe(12);
                    expect(element.columnAttributes.smallContainerCols).toBe(
                        12
                    );
                    expect(element.columnAttributes.mediumContainerCols).toBe(
                        6
                    );
                    expect(element.columnAttributes.largeContainerCols).toBe(4);
                });
            });

            it('cols', () => {
                element.columnAttributes = {
                    cols: 1
                };
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    expect(element.columnAttributes.cols).toBe(12);
                    expect(element.columnAttributes.smallContainerCols).toBe(
                        12
                    );
                    expect(element.columnAttributes.mediumContainerCols).toBe(
                        12
                    );
                    expect(element.columnAttributes.largeContainerCols).toBe(
                        12
                    );
                });
            });

            it('smallContainerCols', () => {
                element.columnAttributes = {
                    smallContainerCols: 2
                };
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    expect(element.columnAttributes.cols).toBe(12);
                    expect(element.columnAttributes.smallContainerCols).toBe(6);
                    expect(element.columnAttributes.mediumContainerCols).toBe(
                        6
                    );
                    expect(element.columnAttributes.largeContainerCols).toBe(6);
                });
            });

            it('mediumContainerCols', () => {
                element.columnAttributes = {
                    mediumContainerCols: 3
                };
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    expect(element.columnAttributes.cols).toBe(12);
                    expect(element.columnAttributes.smallContainerCols).toBe(
                        12
                    );
                    expect(element.columnAttributes.mediumContainerCols).toBe(
                        4
                    );
                    expect(element.columnAttributes.largeContainerCols).toBe(4);
                });
            });

            it('largeContainerCols', () => {
                element.columnAttributes = {
                    largeContainerCols: 12
                };
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    expect(element.columnAttributes.cols).toBe(12);
                    expect(element.columnAttributes.smallContainerCols).toBe(
                        12
                    );
                    expect(element.columnAttributes.mediumContainerCols).toBe(
                        6
                    );
                    expect(element.columnAttributes.largeContainerCols).toBe(1);
                });
            });
        });

        // disabled
        describe('Disabled', () => {
            it('false', () => {
                element.disabled = false;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input, index) => {
                        expect(input.disabled).toBe(
                            ITEMS[index].disabled || false
                        );
                    });
                });
            });

            it('true', () => {
                element.disabled = true;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeTruthy();
                    });
                });
            });
        });

        // field attributes
        it('Field Attributes', () => {
            element.fieldAttributes = { variant: 'label-hidden', cols: 12 };

            return Promise.resolve().then(() => {
                expect(element.fieldAttributes.variant).toBe('label-hidden');
                expect(element.fieldAttributes.cols).toBe(1);
            });
        });

        // hide-check-mark
        describe('Hide Check Mark', () => {
            it('false', () => {
                element.hideCheckMark = false;
                element.items = ITEMS;
                element.variant = 'coverable';

                return Promise.resolve().then(() => {
                    const type = element.shadowRoot.querySelector(
                        '.slds-visual-picker__figure'
                    );
                    const notSelected = element.shadowRoot.querySelector(
                        '.slds-is-not-selected'
                    );

                    expect(notSelected).toBeTruthy();
                    expect(type.classList).not.toContain(
                        'avonni-hide-check-mark'
                    );
                });
            });

            it('true', () => {
                element.hideCheckMark = true;
                element.items = ITEMS;
                element.variant = 'coverable';

                return Promise.resolve().then(() => {
                    const type = element.shadowRoot.querySelector(
                        '.slds-visual-picker__figure'
                    );
                    const notSelected = element.shadowRoot.querySelector(
                        '.slds-is-not-selected'
                    );

                    expect(notSelected).toBeFalsy();
                    expect(type.classList).toContain('avonni-hide-check-mark');
                });
            });
        });

        // image attributes
        describe('Image Attributes', () => {
            it('Image Attributes', () => {
                const fallbackSrc =
                    'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                const cropFit = 'contain';
                element.imageAttributes = {
                    fallbackSrc,
                    cropFit,
                    height: 200
                };
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    expect(element.imageAttributes.fallbackSrc).toBe(
                        fallbackSrc
                    );
                    expect(element.imageAttributes.position).toBe('top');
                    expect(element.imageAttributes.size).toBe('large');
                    expect(element.imageAttributes.height).toBe(200);
                    expect(element.imageAttributes.cropFit).toBe(cropFit);
                });
            });

            it('cropFit', () => {
                const fallbackSrc =
                    'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                const cropFit = 'contain';
                element.imageAttributes = {
                    fallbackSrc,
                    cropFit
                };
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrappers = element.shadowRoot.querySelectorAll(
                        '.avonni-visual-picker__figure-image'
                    );
                    wrappers.forEach((wrapper) => {
                        expect(wrapper.classList).toContain(
                            `avonni-visual-picker__figure-image_object-fit-${cropFit}`
                        );
                    });
                });
            });

            describe('Position', () => {
                it('Top', () => {
                    const fallbackSrc =
                        'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                    element.imageAttributes = {
                        fallbackSrc,
                        position: 'top'
                    };
                    element.items = ITEMS;

                    return Promise.resolve().then(() => {
                        const images = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-visual-picker-img-top"]'
                        );
                        expect(images.length).toBe(ITEMS.length);
                    });
                });

                it('Bottom', () => {
                    const fallbackSrc =
                        'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                    element.imageAttributes = {
                        fallbackSrc,
                        position: 'bottom'
                    };
                    element.items = ITEMS;

                    return Promise.resolve().then(() => {
                        const images = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-visual-picker-img-bottom"]'
                        );
                        expect(images.length).toBe(ITEMS.length);
                    });
                });

                it('Left', () => {
                    const fallbackSrc =
                        'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                    element.imageAttributes = {
                        fallbackSrc,
                        position: 'left'
                    };
                    element.items = ITEMS;

                    return Promise.resolve().then(() => {
                        const images = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-visual-picker-img-horizontal"]'
                        );
                        expect(images.length).toBe(ITEMS.length);
                    });
                });

                it('Right', () => {
                    const fallbackSrc =
                        'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                    element.imageAttributes = {
                        fallbackSrc,
                        position: 'right'
                    };
                    element.items = ITEMS;

                    return Promise.resolve().then(() => {
                        const wrappers = element.shadowRoot.querySelectorAll(
                            '.avonni-visual-picker__figure-container-reverse'
                        );
                        wrappers.forEach((wrapper) => {
                            const image = wrapper.querySelector(
                                '[data-element-id="avonni-visual-picker-img-horizontal"]'
                            );
                            expect(image).toBeTruthy();
                        });
                        expect(wrappers.length).toBe(ITEMS.length);
                    });
                });

                it('Background/Overlay', () => {
                    const fallbackSrc =
                        'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                    element.imageAttributes = {
                        fallbackSrc,
                        position: 'background'
                    };
                    element.items = ITEMS;

                    return Promise.resolve().then(() => {
                        const images = element.shadowRoot.querySelectorAll(
                            '.avonni-visual-picker__figure-image-background'
                        );
                        expect(images.length).toBe(ITEMS.length);
                    });
                });
            });
        });

        describe('Items', () => {
            it('Tags', () => {
                element.items = ITEMS_WITH_TAGS;
                element.size = 'xx-large';

                return Promise.resolve().then(() => {
                    const tags = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-visual-picker-tags-container"]'
                    );
                    expect(tags.length).toBe(3);
                });
            });
        });

        // label
        it('Label', () => {
            element.label = 'A string label';

            return Promise.resolve().then(() => {
                const label = element.shadowRoot.querySelector(
                    '.slds-form-element__label'
                );
                expect(label.textContent).toBe('A string label');
            });
        });

        // message-when-range-overflow with max
        it('Message when range overflow and Max', () => {
            element.items = ITEMS;
            element.max = 2;
            element.messageWhenRangeOverflow = 'Maximum Capacity!';
            element.type = 'checkbox';
            element.value = [
                'lightning-professional',
                'lightning-enterprise',
                'lightning-enterprise-plus'
            ];

            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.blur();
                })
                .then(() => {
                    const message = element.shadowRoot.querySelector(
                        '[data-help-message]'
                    );
                    expect(message).toBeTruthy();
                    expect(message.textContent).toBe('Maximum Capacity!');
                });
        });

        // message-when-range-overflow with min
        it('Message when range underflow and Min', () => {
            element.items = ITEMS;
            element.min = 2;
            element.messageWhenRangeUnderflow = 'Minimum Capacity!';
            element.type = 'checkbox';
            element.value = ['lightning-professional'];

            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.blur();
                })
                .then(() => {
                    const message = element.shadowRoot.querySelector(
                        '[data-help-message]'
                    );
                    expect(message).toBeTruthy();
                    expect(message.textContent).toBe('Minimum Capacity!');
                });
        });

        // message-when-value-missing with required
        it('Message when value missing and Required', () => {
            element.items = ITEMS;
            element.required = true;
            element.messageWhenValueMissing = 'Value Missing!';
            element.type = 'checkbox';

            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.blur();
                })
                .then(() => {
                    const message = element.shadowRoot.querySelector(
                        '[data-help-message]'
                    );
                    expect(message).toBeTruthy();
                    expect(message.textContent).toBe('Value Missing!');
                });
        });

        // name
        it('name', () => {
            element.name = 'a-string-name';

            return Promise.resolve().then(() => {
                const inputs = element.shadowRoot.querySelectorAll(
                    '[data-element-id="input"]'
                );
                inputs.forEach((input) => {
                    expect(input.name).toBe('a-string-name');
                });
            });
        });

        // ratio
        describe('Ratio', () => {
            it('ratio = 1-by-1', () => {
                const ratios = [
                    '1-by-1',
                    '4-by-3',
                    '16-by-9',
                    '3-by-4',
                    '9-by-16'
                ];
                const pickedRatio = '1-by-1';

                element.ratio = pickedRatio;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrappers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    wrappers.forEach((wrapper) => {
                        expect(wrapper.classList).toContain(
                            `ratio-${pickedRatio}`
                        );
                        ratios
                            .filter((value) => value !== pickedRatio)
                            .forEach((ratio) => {
                                expect(wrapper.classList).not.toContain(
                                    `ratio-${ratio}`
                                );
                            });
                    });
                });
            });

            it('ratio = 4-by-3', () => {
                const ratios = [
                    '1-by-1',
                    '4-by-3',
                    '16-by-9',
                    '3-by-4',
                    '9-by-16'
                ];
                const pickedRatio = '4-by-3';

                element.ratio = pickedRatio;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrappers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    wrappers.forEach((wrapper) => {
                        expect(wrapper.classList).toContain(
                            `ratio-${pickedRatio}`
                        );
                        ratios
                            .filter((value) => value !== pickedRatio)
                            .forEach((ratio) => {
                                expect(wrapper.classList).not.toContain(
                                    `ratio-${ratio}`
                                );
                            });
                    });
                });
            });

            it('ratio = 16-by-9', () => {
                const ratios = [
                    '1-by-1',
                    '4-by-3',
                    '16-by-9',
                    '3-by-4',
                    '9-by-16'
                ];
                const pickedRatio = '16-by-9';

                element.ratio = pickedRatio;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrappers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    wrappers.forEach((wrapper) => {
                        expect(wrapper.classList).toContain(
                            `ratio-${pickedRatio}`
                        );
                        ratios
                            .filter((value) => value !== pickedRatio)
                            .forEach((ratio) => {
                                expect(wrapper.classList).not.toContain(
                                    `ratio-${ratio}`
                                );
                            });
                    });
                });
            });

            it('ratio = 3-by-4', () => {
                const ratios = [
                    '1-by-1',
                    '4-by-3',
                    '16-by-9',
                    '3-by-4',
                    '9-by-16'
                ];
                const pickedRatio = '3-by-4';

                element.ratio = pickedRatio;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrappers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    wrappers.forEach((wrapper) => {
                        expect(wrapper.classList).toContain(
                            `ratio-${pickedRatio}`
                        );
                        ratios
                            .filter((value) => value !== pickedRatio)
                            .forEach((ratio) => {
                                expect(wrapper.classList).not.toContain(
                                    `ratio-${ratio}`
                                );
                            });
                    });
                });
            });

            it('ratio = 9-by-16', () => {
                const ratios = [
                    '1-by-1',
                    '4-by-3',
                    '16-by-9',
                    '3-by-4',
                    '9-by-16'
                ];
                const pickedRatio = '9-by-16';

                element.ratio = pickedRatio;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const wrappers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    wrappers.forEach((wrapper) => {
                        expect(wrapper.classList).toContain(
                            `ratio-${pickedRatio}`
                        );
                        ratios
                            .filter((value) => value !== pickedRatio)
                            .forEach((ratio) => {
                                expect(wrapper.classList).not.toContain(
                                    `ratio-${ratio}`
                                );
                            });
                    });
                });
            });
        });

        // required
        describe('Required', () => {
            it('false', () => {
                element.required = false;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    const fieldset = element.shadowRoot.querySelector(
                        '[data-element-id="fieldset"]'
                    );

                    expect(abbr).toBeFalsy();
                    expect(fieldset.ariaRequired).toBe('false');
                });
            });

            it('true', () => {
                element.required = true;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    const fieldset = element.shadowRoot.querySelector(
                        '[data-element-id="fieldset"]'
                    );

                    expect(abbr).toBeTruthy();
                    expect(fieldset.ariaRequired).toBe('true');
                });
            });
        });

        // size
        // Depends on items
        describe('Size', () => {
            it('Xx-small', () => {
                element.size = 'xx-small';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });

            it('X-small', () => {
                element.size = 'x-small';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });

            it('Small', () => {
                element.size = 'small';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });

            it('Medium', () => {
                element.size = 'medium';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });

            it('Large', () => {
                element.size = 'large';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });

            it('X-large', () => {
                element.size = 'x-large';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });

            it('Xx-large', () => {
                element.size = 'xx-large';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });

            it('Responsive', () => {
                element.size = 'responsive';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const visualPickers = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker'
                    );
                    visualPickers.forEach((visualPicker) => {
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_small'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_medium'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_x-large'
                        );
                        expect(visualPicker.classList).not.toContain(
                            'avonni-visual-picker_xx-large'
                        );
                        expect(visualPicker.classList).toContain(
                            'avonni-visual-picker_responsive'
                        );
                    });
                });
            });
        });

        // type
        describe('Type', () => {
            it('Radio', () => {
                element.type = 'radio';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.type).toBe('radio');
                    });
                });
            });

            it('Checkbox', () => {
                element.type = 'checkbox';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.type).toBe('checkbox');
                    });
                });
            });
        });

        // value
        describe('Value', () => {
            it('Radio type', () => {
                element.value = 'lightning-professional';
                element.items = ITEMS;
                element.type = 'radio';

                return Promise.resolve().then(() => {
                    const checkedItem = element.shadowRoot.querySelector(
                        'input[value="lightning-professional"]'
                    );
                    expect(checkedItem.checked).toBeTruthy();
                });
            });

            it('Checkbox type', () => {
                element.value = [
                    'lightning-professional',
                    'lightning-enterprise-plus'
                ];
                element.items = ITEMS;
                element.type = 'checkbox';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    expect(inputs[0].checked).toBeTruthy();
                    expect(inputs[1].checked).toBeFalsy();
                    expect(inputs[2].checked).toBeTruthy();
                });
            });
        });

        // variant
        describe('Variant', () => {
            it('Non-coverable', () => {
                element.variant = 'non-coverable';
                element.items = ITEMS;
                element.value = 'lightning-professional';

                return Promise.resolve().then(() => {
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(selected).toBeFalsy();
                    const nonCoverableClass =
                        element.shadowRoot.querySelectorAll(
                            '.slds-visual-picker__text'
                        );
                    expect(nonCoverableClass).toHaveLength(4);
                    const coverableClass = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker__icon'
                    );
                    expect(coverableClass).toHaveLength(0);
                });
            });

            it('Coverable', () => {
                element.variant = 'coverable';
                element.items = ITEMS;
                element.value = 'lightning-professional';

                return Promise.resolve().then(() => {
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(selected).toBeTruthy();
                    const nonCoverableClass =
                        element.shadowRoot.querySelectorAll(
                            '.slds-visual-picker__text'
                        );
                    expect(nonCoverableClass).toHaveLength(0);
                    const coverableClass = element.shadowRoot.querySelectorAll(
                        '.slds-visual-picker__icon'
                    );
                    expect(coverableClass).toHaveLength(4);
                });
            });
        });
    });

    /*
     * -------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    describe('Methods', () => {
        it('Transfer focus and blur', () => {
            element.items = ITEMS;

            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.blur();
                })
                .then(() => {
                    expect(element.shadowRoot.activeElement).toBeNull();
                });
        });

        // reportValidity
        // Depends on required
        it('reportValidity method', () => {
            element.required = true;
            element.reportValidity();

            return Promise.resolve().then(() => {
                const help = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(help).toBeTruthy();
            });
        });

        // showHelpMessageIfInvalid
        // Depends on required
        it('showHelpMessageIfInvalid method', () => {
            element.required = true;
            element.showHelpMessageIfInvalid();

            return Promise.resolve().then(() => {
                const help = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(help).toBeTruthy();
            });
        });

        // checkValidity
        it('checkValidity method', () => {
            const spy = jest.spyOn(element, 'checkValidity');

            element.checkValidity();
            expect(spy).toHaveBeenCalled();
        });

        // setCustomValidity
        it('setCustomValidity method', () => {
            const spy = jest.spyOn(element, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });
    });

    /*
     * -------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    describe('Events', () => {
        // change
        describe('change', () => {
            it('Radio type', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                element.items = ITEMS;
                element.type = 'radio';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[0].click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe(
                        'lightning-professional'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('Checkbox type', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                element.items = ITEMS;
                element.type = 'checkbox';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[0].click();
                    inputs[1].click();

                    expect(handler).toHaveBeenCalledTimes(2);
                    expect(handler.mock.calls[1][0].detail.value).toMatchObject(
                        ['lightning-professional', 'lightning-enterprise']
                    );
                    expect(handler.mock.calls[1][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[1][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[1][0].composed).toBeFalsy();
                });
            });
        });

        describe('itemsvisibilitytoggle', () => {
            it('itemsvisibilitytoggle', () => {
                element.items = longItems;
                element.maxCount = 3;

                const handler = jest.fn();
                element.addEventListener('itemsvisibilitytoggle', handler);

                return Promise.resolve()
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(3);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeTruthy();
                        expect(call.composed).toBeFalsy();
                        expect(call.detail.show).toBeTruthy();
                    })
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(longItems.length);
                    });
            });

            it('itemsvisibilitytoggle, cancelled', () => {
                element.items = longItems;
                element.maxCount = 3;

                const handler = jest.fn((event) => {
                    event.preventDefault();
                });
                element.addEventListener('itemsvisibilitytoggle', handler);

                return Promise.resolve()
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(3);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const inputs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="input"]'
                        );
                        expect(inputs).toHaveLength(3);
                    });
            });
        });

        describe('loadmore', () => {
            it('Load more on first load if there are no items', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.enableInfiniteLoading = true;
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });

            it('Load more on scroll', () => {
                element.enableInfiniteLoading = true;
                element.loadMoreOffset = 40;
                element.items = longItems;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve().then(() => {
                    const itemsWrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-items-wrapper"]'
                    );
                    jest.spyOn(
                        itemsWrapper,
                        'scrollTop',
                        'get'
                    ).mockReturnValue(20);
                    jest.spyOn(
                        itemsWrapper,
                        'scrollHeight',
                        'get'
                    ).mockReturnValue(150);
                    jest.spyOn(
                        itemsWrapper,
                        'clientHeight',
                        'get'
                    ).mockReturnValue(100);

                    itemsWrapper.dispatchEvent(new CustomEvent('scroll'));
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('Scroll is ignored if enableInfiniteLoading is not true', () => {
                element.loadMoreOffset = 40;
                element.items = longItems;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve().then(() => {
                    const itemsWrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-items-wrapper"]'
                    );
                    jest.spyOn(
                        itemsWrapper,
                        'scrollTop',
                        'get'
                    ).mockReturnValue(20);
                    jest.spyOn(
                        itemsWrapper,
                        'scrollHeight',
                        'get'
                    ).mockReturnValue(150);
                    jest.spyOn(
                        itemsWrapper,
                        'clientHeight',
                        'get'
                    ).mockReturnValue(100);

                    itemsWrapper.dispatchEvent(new CustomEvent('scroll'));
                    expect(handler).not.toHaveBeenCalled();
                });
            });
        });
    });
});

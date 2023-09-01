

import { createElement } from 'lwc';
import VisualPicker from 'c/visualPicker';
import { ITEMS, ITEMS_WITH_TAGS } from './data';

let element;
describe('VisualPicker', () => {
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

    it('Visual Picker: Default attributes', () => {
        expect(element.columnAttributes).toMatchObject({});
        expect(element.disabled).toBeFalsy();
        expect(element.fieldAttributes).toMatchObject({});
        expect(element.hideCheckMark).toBeFalsy();
        expect(element.imageAttributes).toMatchObject({});
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
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

    /* ----- ATTRIBUTES ----- */

    // column attributes
    it('Visual Picker: Column Attributes - Default values', () => {
        element.columnAttributes = {};
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            expect(element.columnAttributes.cols).toBe(12);
            expect(element.columnAttributes.smallContainerCols).toBe(12);
            expect(element.columnAttributes.mediumContainerCols).toBe(6);
            expect(element.columnAttributes.largeContainerCols).toBe(4);
        });
    });

    it('Visual Picker: Column Attributes - cols', () => {
        element.columnAttributes = {
            cols: 1
        };
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            expect(element.columnAttributes.cols).toBe(12);
            expect(element.columnAttributes.smallContainerCols).toBe(12);
            expect(element.columnAttributes.mediumContainerCols).toBe(12);
            expect(element.columnAttributes.largeContainerCols).toBe(12);
        });
    });

    it('Visual Picker: Column Attributes - smallContainerCols', () => {
        element.columnAttributes = {
            smallContainerCols: 2
        };
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            expect(element.columnAttributes.cols).toBe(12);
            expect(element.columnAttributes.smallContainerCols).toBe(6);
            expect(element.columnAttributes.mediumContainerCols).toBe(6);
            expect(element.columnAttributes.largeContainerCols).toBe(6);
        });
    });

    it('Visual Picker: Column Attributes - mediumContainerCols', () => {
        element.columnAttributes = {
            mediumContainerCols: 3
        };
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            expect(element.columnAttributes.cols).toBe(12);
            expect(element.columnAttributes.smallContainerCols).toBe(12);
            expect(element.columnAttributes.mediumContainerCols).toBe(4);
            expect(element.columnAttributes.largeContainerCols).toBe(4);
        });
    });

    it('Visual Picker: Column Attributes - largeContainerCols', () => {
        element.columnAttributes = {
            largeContainerCols: 12
        };
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            expect(element.columnAttributes.cols).toBe(12);
            expect(element.columnAttributes.smallContainerCols).toBe(12);
            expect(element.columnAttributes.mediumContainerCols).toBe(6);
            expect(element.columnAttributes.largeContainerCols).toBe(1);
        });
    });

    // disabled
    // Depends on items
    it('Visual Picker: disabled = false', () => {
        element.disabled = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id="input"]'
            );
            inputs.forEach((input, index) => {
                expect(input.disabled).toBe(ITEMS[index].disabled || false);
            });
        });
    });

    it('Visual Picker: disabled = true', () => {
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

    // field attributes
    it('Visual Picker: Field Attributes', () => {
        element.fieldAttributes = { variant: 'label-hidden', cols: 12 };

        return Promise.resolve().then(() => {
            expect(element.fieldAttributes.variant).toBe('label-hidden');
            expect(element.fieldAttributes.cols).toBe(1);
        });
    });

    // hide-check-mark
    // Depends on variant, value and items
    it('Visual Picker: hideCheckMark = false', () => {
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
            expect(type.classList).not.toContain('avonni-hide-check-mark');
        });
    });

    it('Visual Picker: hideCheckMark = true', () => {
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

    // image attributes
    it('Visual Picker: Image Attributes', () => {
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
            expect(element.imageAttributes.fallbackSrc).toBe(fallbackSrc);
            expect(element.imageAttributes.position).toBe('top');
            expect(element.imageAttributes.size).toBe('large');
            expect(element.imageAttributes.height).toBe(200);
            expect(element.imageAttributes.cropFit).toBe(cropFit);
        });
    });

    it('Visual Picker: Image Attributes - cropFit', () => {
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

    it('Visual Picker: Image Attributes - position = top', () => {
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

    it('Visual Picker: Image Attributes - position = bottom', () => {
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

    it('Visual Picker: Image Attributes - position = left', () => {
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

    it('Visual Picker: Image Attributes - position = right', () => {
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

    it('Visual Picker: Image Attributes - position = background, position = overlay', () => {
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

    it('Visual Picker: Items - tags', () => {
        element.items = ITEMS_WITH_TAGS;
        element.size = 'xx-large';

        return Promise.resolve().then(() => {
            const tags = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-visual-picker-tags-container"]'
            );
            expect(tags.length).toBe(3);
        });
    });

    // label
    it('Visual Picker: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // name
    it('Visual Picker: name', () => {
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
    // Depends on items
    it('Visual Picker: ratio = 1-by-1', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '1-by-1';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            wrappers.forEach((wrapper) => {
                expect(wrapper.classList).toContain(`ratio-${pickedRatio}`);
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

    it('Visual Picker: ratio = 4-by-3', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '4-by-3';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            wrappers.forEach((wrapper) => {
                expect(wrapper.classList).toContain(`ratio-${pickedRatio}`);
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

    it('Visual Picker: ratio = 16-by-9', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '16-by-9';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            wrappers.forEach((wrapper) => {
                expect(wrapper.classList).toContain(`ratio-${pickedRatio}`);
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

    it('Visual Picker: ratio = 3-by-4', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '3-by-4';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            wrappers.forEach((wrapper) => {
                expect(wrapper.classList).toContain(`ratio-${pickedRatio}`);
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

    it('Visual Picker: ratio = 9-by-16', () => {
        const ratios = ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'];
        const pickedRatio = '9-by-16';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            wrappers.forEach((wrapper) => {
                expect(wrapper.classList).toContain(`ratio-${pickedRatio}`);
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

    // required
    it('Visual Picker: required = false', () => {
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

    it('Visual Picker: required = true', () => {
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

    // size
    // Depends on items
    it('Visual Picker: size = xx-small', () => {
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

    it('Visual Picker: size = x-small', () => {
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

    it('Visual Picker: size = small', () => {
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

    it('Visual Picker: size = medium', () => {
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

    it('Visual Picker: size = large', () => {
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

    it('Visual Picker: size = x-large', () => {
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

    it('Visual Picker: size = xx-large', () => {
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

    it('Visual Picker: size = responsive', () => {
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

    // type
    // Depends on items
    it('Visual Picker: type = radio', () => {
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

    it('Visual Picker: type = checkbox', () => {
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

    // value
    // Depends on items and type
    it('Visual Picker: value, with radio type', () => {
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

    it('Visual Picker: value, with checkbox type', () => {
        element.value = ['lightning-professional', 'lightning-enterprise-plus'];
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

    // variant
    // Depends on items
    it('Visual Picker: variant = non-coverable', () => {
        element.variant = 'non-coverable';
        element.items = ITEMS;
        element.value = 'lightning-professional';

        return Promise.resolve().then(() => {
            const selected =
                element.shadowRoot.querySelector('.slds-is-selected');
            expect(selected).toBeFalsy();
            const nonCoverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__text'
            );
            expect(nonCoverableClass).toHaveLength(4);
            const coverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__icon'
            );
            expect(coverableClass).toHaveLength(0);
        });
    });

    it('Visual Picker: variant = coverable', () => {
        element.variant = 'coverable';
        element.items = ITEMS;
        element.value = 'lightning-professional';

        return Promise.resolve().then(() => {
            const selected =
                element.shadowRoot.querySelector('.slds-is-selected');
            expect(selected).toBeTruthy();
            const nonCoverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__text'
            );
            expect(nonCoverableClass).toHaveLength(0);
            const coverableClass = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__icon'
            );
            expect(coverableClass).toHaveLength(4);
        });
    });

    /* ----- METHODS ----- */

    it('Visual Picker: Transfer focus and blur', () => {
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
    it('Visual Picker: reportValidity method', () => {
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
    it('Visual Picker: showHelpMessageIfInvalid method', () => {
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
    it('Visual Picker: checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('Visual Picker: setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on items and type
    it('Visual Picker: change event, with radio type', () => {
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

    it('Visual Picker: change event, with checkbox type', () => {
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
            expect(handler.mock.calls[1][0].detail.value).toMatchObject([
                'lightning-professional',
                'lightning-enterprise'
            ]);
            expect(handler.mock.calls[1][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[1][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[1][0].composed).toBeFalsy();
        });
    });
});

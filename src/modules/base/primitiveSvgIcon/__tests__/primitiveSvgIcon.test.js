import { createElement } from 'lwc';
import PrimitiveSvgIcon from '../primitiveSvgIcon';

let element;
describe('Primitive Svg Icon', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-svg-icon', {
            is: PrimitiveSvgIcon
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.name).toBe('eraser');
            expect(element.svgClass).toBeUndefined();
        });

        describe('name', () => {
            it('Passed to the component as eraser', () => {
                element.name = 'eraser';

                return Promise.resolve().then(() => {
                    const svg = element.shadowRoot.querySelector(
                        '[data-element-id="svg-eraser"]'
                    );
                    expect(svg).toBeTruthy();
                });
            });

            it('Passed to the component as inkPen', () => {
                element.name = 'inkPen';

                return Promise.resolve().then(() => {
                    const svg = element.shadowRoot.querySelector(
                        '[data-element-id="svg-ink-pen"]'
                    );
                    expect(svg).toBeTruthy();
                });
            });
        });

        describe('svgClass', () => {
            it('Passed to the component', () => {
                element.svgClass = 'slds-button__icon';

                return Promise.resolve().then(() => {
                    const svg = element.shadowRoot.querySelector(
                        '[data-element-id="svg-eraser"]'
                    );
                    expect(svg.classList).toContain('slds-button__icon');
                });
            });
        });
    });
});

import { createElement } from 'lwc';
import Image from 'c/image';

// not tested
// cannot test computed images based on layout ( e.g. static Images and certain image states that do not have assigned dimensions ). Jest does not provide a layout system.
// cannot test aspect-ratio//most crop-size output. Jest/JS-Dom does not recognize its attribute within dom element. The JS function goes through, however since aspect-ratio computes only with 1 dimension ( e.g. width or height ) - we can only test the input dimension to match the same output dimension which is pointless.

const src =
    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';

let element;
describe('Image', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.alternativeText).toBeUndefined();
            expect(element.compare).toBeFalsy();
            expect(element.compareAlternativeText).toBeUndefined();
            expect(element.compareAttributes.orientation).toBe('horizontal');
            expect(element.compareAttributes.moveOn).toBe('click');
            expect(element.compareAttributes.originalLabel).toBeUndefined();
            expect(element.compareAttributes.compareLabel).toBeUndefined();
            expect(element.compareAttributes.showLabelsOnHover).toBeFalsy();
            expect(element.compareSrc).toBeUndefined();
            expect(element.cropFit).toBe('cover');
            expect(element.cropPositionX).toBe('50');
            expect(element.cropPositionY).toBe('50');
            expect(element.cropSize).toBeUndefined();
            expect(element.fluid).toBeFalsy();
            expect(element.fluidGrow).toBeFalsy();
            expect(element.height).toBeUndefined();
            expect(element.lazyLoading).toBe('auto');
            expect(element.magnifierAttributes.position).toBe('auto');
            expect(element.magnifierAttributes.horizontalOffset).toBe(0);
            expect(element.magnifierAttributes.verticalOffset).toBe(0);
            expect(element.magnifierAttributes.smoothMove).toBeFalsy();
            expect(element.magnifierAttributes.zoomFactor).toBe(2);
            expect(element.magnifierAttributes.zoomRatioWidth).toBe('100px');
            expect(element.magnifierAttributes.zoomRatioHeight).toBe('100px');
            expect(element.magnifierType).toBeUndefined();
            expect(element.position).toBeUndefined();
            expect(element.sizes).toBeUndefined();
            expect(element.src).toBeUndefined();
            expect(element.srcset).toBeUndefined();
            expect(element.staticImages).toBeFalsy();
            expect(element.thumbnail).toBeFalsy();
            expect(element.width).toBeUndefined();
        });

        describe('alternativeText', () => {
            it('Passed to the component', () => {
                element.src = src;
                element.alternativeText = 'This is an Alternative text';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.alt).toBe('This is an Alternative text');
                });
            });
        });

        describe('Compare slider', () => {
            it('Compare slider - horizontal', () => {
                element.compareSrc = src;
                element.compareAttributes = { orientation: 'horizontal' };

                return Promise.resolve().then(() => {
                    const compareSlider = element.shadowRoot.querySelector(
                        '[data-element-id="compare-slider"]'
                    );
                    const compareImgContainer =
                        element.shadowRoot.querySelector(
                            '[data-element-id="compare-img-container"]'
                        );
                    const icon1 = compareSlider.children[0].children[0];
                    const icon2 = compareSlider.children[0].children[1];
                    expect(compareSlider.classList).toContain(
                        'avonni-image__compare-slider_horizontal'
                    );
                    expect(icon1.iconName).toBe('utility:left');
                    expect(icon2.iconName).toBe('utility:right');
                    expect(compareImgContainer.style.width).toBe('50%');
                });
            });

            it('Compare slider - vertical', () => {
                element.compareSrc = src;
                element.compareAttributes = { orientation: 'vertical' };

                return Promise.resolve().then(() => {
                    const compareSlider = element.shadowRoot.querySelector(
                        '[data-element-id="compare-slider"]'
                    );
                    const compareImgContainer =
                        element.shadowRoot.querySelector(
                            '[data-element-id="compare-img-container"]'
                        );
                    const compareSliderHandle =
                        element.shadowRoot.querySelector(
                            '[data-element-id="compare-slider-handle"]'
                        );
                    const icon1 = compareSlider.children[0].children[0];
                    const icon2 = compareSlider.children[0].children[1];
                    expect(compareSlider.classList).toContain(
                        'avonni-image__compare-slider_vertical'
                    );
                    expect(compareSliderHandle.classList).toContain(
                        'slds-grid_vertical'
                    );
                    expect(icon1.iconName).toBe('utility:up');
                    expect(icon2.iconName).toBe('utility:down');
                    expect(compareImgContainer.style.width).toBe('100%');
                    expect(compareImgContainer.style.height).toBe('50%');
                });
            });

            it('Compare slider - vertical - compare img size with height and static img', () => {
                element.compareSrc = src;
                element.compareAttributes = { orientation: 'vertical' };
                element.height = 300;
                element.staticImages = true;

                return Promise.resolve().then(() => {
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img"]'
                    );
                    expect(compareImg.style.maxHeight).toBe('300px');
                    expect(compareImg.style.width).toBe('inherit');
                    expect(compareImg.style.height).toBe('300px');
                });
            });

            it('Compare slider - vertical - compare img size with height and width', () => {
                element.compareSrc = src;
                element.compareAttributes = { orientation: 'vertical' };
                element.height = 300;
                element.width = 300;

                return Promise.resolve().then(() => {
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img"]'
                    );
                    expect(compareImg.style.width).toBe('300px');
                    expect(compareImg.style.height).toBe('300px');
                });
            });

            it('Compare slider - horizontal - compare img size with width', () => {
                element.compareSrc = src;
                element.compareAttributes = { orientation: 'horizontal' };
                element.width = 300;

                return Promise.resolve().then(() => {
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img"]'
                    );
                    expect(compareImg.style.width).toBe('300px');
                    expect(compareImg.style.height).toBe('inherit');
                });
            });

            it('Compare slider - show overlay on hover - horizontal', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'horizontal',
                    originalLabel: 'Before',
                    compareLabel: 'After',
                    showLabelsOnHover: true
                };

                return Promise.resolve().then(() => {
                    const compareContainer = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    const after = element.shadowRoot.querySelector(
                        '[data-element-id="compare-overlay-after"]'
                    );
                    const before = element.shadowRoot.querySelector(
                        '[data-element-id="compare-overlay-before"]'
                    );
                    compareContainer.dispatchEvent(new MouseEvent('mouseover'));
                    expect(compareContainer.classList).toContain(
                        'avonni-image__container_compare-labels-on-hover'
                    );
                    expect(after.classList).toContain(
                        'avonni-image__compare-overlay-after_horizontal'
                    );
                    expect(before.classList).toContain(
                        'avonni-image__compare-overlay-before_horizontal'
                    );
                });
            });

            it('Compare slider - show overlay on hover - vertical', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'vertical',
                    originalLabel: 'Before',
                    compareLabel: 'After',
                    showLabelsOnHover: true
                };

                return Promise.resolve().then(() => {
                    const compareContainer = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    const after = element.shadowRoot.querySelector(
                        '[data-element-id="compare-overlay-after"]'
                    );
                    const before = element.shadowRoot.querySelector(
                        '[data-element-id="compare-overlay-before"]'
                    );
                    compareContainer.dispatchEvent(new MouseEvent('mouseover'));
                    expect(compareContainer.classList).toContain(
                        'avonni-image__container_compare-labels-on-hover'
                    );
                    expect(after.classList).toContain(
                        'avonni-image__compare-overlay-after_vertical'
                    );
                    expect(before.classList).toContain(
                        'avonni-image__compare-overlay-before_vertical'
                    );
                });
            });

            it('Compare slider - show overlay', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    originalLabel: 'Before',
                    compareLabel: 'After',
                    showLabelsOnHover: false
                };

                return Promise.resolve().then(() => {
                    const compareContainer = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    expect(compareContainer.classList).not.toContain(
                        'avonni-image__container_compare-labels-on-hover'
                    );
                });
            });

            it('Compare slider - no overlay', () => {
                element.compareSrc = src;
                element.compareAttributes = {};

                return Promise.resolve().then(() => {
                    const originalLabel = element.shadowRoot.querySelector(
                        '[data-element-id="compare-overlay-before"]'
                    );
                    const compareLabel = element.shadowRoot.querySelector(
                        '[data-element-id="compare-overlay-after"]'
                    );
                    expect(originalLabel).toBeNull();
                    expect(compareLabel).toBeNull();
                });
            });

            it('Compare slider - moveOn hover - horizontal', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'horizontal',
                    moveOn: 'hover'
                };

                return Promise.resolve().then(() => {
                    const compareContainer = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img-container"]'
                    );
                    img.width = 200;
                    img.height = 200;
                    compareContainer.dispatchEvent(
                        new MouseEvent('mousemove', { clientX: 100 })
                    );
                    expect(compareImg.style.width).toBe('100px');
                    expect(container.style.cursor).toBe('grabbing');
                });
            });

            it('Compare slider - moveOn hover - vertical', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'vertical',
                    moveOn: 'hover'
                };

                return Promise.resolve().then(() => {
                    const compareContainer = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img-container"]'
                    );
                    img.width = 200;
                    img.height = 200;
                    compareContainer.dispatchEvent(
                        new MouseEvent('mousemove', { clientY: 100 })
                    );
                    expect(compareImg.style.height).toBe('100px');
                });
            });

            it('Compare slider - moveOn click - horizontal', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'horizontal',
                    moveOn: 'click'
                };

                return Promise.resolve().then(() => {
                    const compareContainer = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img-container"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 200;
                    img.height = 200;
                    compareContainer.dispatchEvent(
                        new MouseEvent('mousedown', { clientX: 100 })
                    );
                    expect(compareImg.style.width).toBe('100px');
                    compareContainer.dispatchEvent(
                        new MouseEvent('mousemove', { clientX: 125 })
                    );
                    expect(compareImg.style.width).toBe('125px');
                });
            });

            it('Compare slider - moveOn click - vertical', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'vertical',
                    moveOn: 'click'
                };

                return Promise.resolve().then(() => {
                    const compareContainer = element.shadowRoot.querySelector(
                        '[data-element-id="compare-container"]'
                    );
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img-container"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 200;
                    img.height = 200;
                    compareContainer.dispatchEvent(
                        new MouseEvent('mousedown', { clientY: 100 })
                    );
                    expect(compareImg.style.height).toBe('100px');
                    compareContainer.dispatchEvent(
                        new MouseEvent('mousemove', { clientY: 125 })
                    );
                    expect(compareImg.style.height).toBe('125px');
                });
            });

            it('Compare slider - move with keyboard - horizontal', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'horizontal'
                };

                return Promise.resolve().then(() => {
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img-container"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const handle = element.shadowRoot.querySelector(
                        '[data-element-id="compare-slider-handle"]'
                    );
                    const slider = element.shadowRoot.querySelector(
                        '[data-element-id="compare-slider"]'
                    );
                    img.width = 200;
                    img.height = 200;
                    compareImg.width = 100;
                    compareImg.height = 200;
                    slider.style.left = '100px';
                    // Start compare (Enter or Space)
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Enter' })
                    );
                    // Move handle right
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowRight' })
                    );
                    expect(compareImg.style.width).toBe('120px');
                    // Boundary right
                    compareImg.width = 199;
                    slider.style.left = '199px';
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowRight' })
                    );
                    expect(compareImg.style.width).toBe(`${img.width}px`);

                    // Move handle left
                    compareImg.width = 100;
                    slider.style.left = '100px';
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowLeft' })
                    );
                    expect(compareImg.style.width).toBe('80px');
                    // Boundary left
                    compareImg.width = 1;
                    slider.style.left = '1px';
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowLeft' })
                    );
                    expect(compareImg.style.width).toBe('0px');
                });
            });

            it('Compare slider - move with keyboard - vertical', () => {
                element.compareSrc = src;
                element.compareAttributes = {
                    orientation: 'vertical'
                };

                return Promise.resolve().then(() => {
                    const compareImg = element.shadowRoot.querySelector(
                        '[data-element-id="compare-img-container"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const handle = element.shadowRoot.querySelector(
                        '[data-element-id="compare-slider-handle"]'
                    );
                    const slider = element.shadowRoot.querySelector(
                        '[data-element-id="compare-slider"]'
                    );
                    img.width = 200;
                    img.height = 200;
                    compareImg.width = 200;
                    compareImg.height = 100;
                    slider.style.top = '100px';
                    // Start compare (Enter or Space)
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'Enter' })
                    );
                    // Move handle down
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowDown' })
                    );
                    expect(compareImg.style.height).toBe('120px');
                    // Boundary down
                    compareImg.height = 199;
                    slider.style.top = '199px';
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowDown' })
                    );
                    expect(compareImg.style.height).toBe(`${img.height}px`);

                    // Move handle up
                    compareImg.height = 100;
                    slider.style.top = '100px';
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowUp' })
                    );
                    expect(compareImg.style.height).toBe('80px');
                    // Boundary up
                    compareImg.height = 1;
                    slider.style.top = '1px';
                    handle.dispatchEvent(
                        new KeyboardEvent('keydown', { key: 'ArrowUp' })
                    );
                    expect(compareImg.style.height).toBe('0px');
                });
            });
        });

        describe('Cropping', () => {
            it('Crop Fit Cover', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.cropFit = 'cover';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.objectFit).toBe('cover');
                });
            });

            it('Crop Fit Contain', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.cropFit = 'contain';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.objectFit).toBe('contain');
                });
            });

            it('Crop Fit Fill', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.cropFit = 'fill';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.objectFit).toBe('fill');
                });
            });

            it('Crop Fit None', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.cropFit = 'none';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.objectFit).toBe('none');
                });
            });

            it('Crop Position', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.cropFit = 'none';
                element.cropPositionX = '25';
                element.cropPositionY = '75';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.objectPosition).toBe('25% 75%');
                });
            });

            it('Cropped Image Left', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.width = '300';
                element.position = 'left';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain('slds-float_left');
                });
            });

            it('Cropped Image Center', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.width = '300';
                element.position = 'center';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'slds-align_absolute-center',
                        'slds-show'
                    );
                });
            });

            it('Cropped Image - Right', () => {
                element.src = src;
                element.cropSize = '16x9';
                element.width = '300';
                element.position = 'right';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain('slds-float_right');
                });
            });

            it('No crop - Height Only', () => {
                element.src = src;
                element.height = '225';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.height).toBe('225px');
                });
            });
        });

        describe('fluid', () => {
            it('Passed to the component', () => {
                element.src = src;
                element.fluid = true;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain('avonni-image_fluid');
                });
            });
        });

        describe('fluidGrow', () => {
            it('Passed to the component', () => {
                element.src = src;
                element.fluidGrow = true;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-image_fluid',
                        'avonni-image_fluid-grow'
                    );
                });
            });
        });

        describe('height', () => {
            it('Passed to the component', () => {
                element.src = src;
                element.height = '50%';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.height).toBe('50%');
                });
            });
        });

        describe('magnifierAttributes', () => {
            it('Passed to the component', () => {
                element.src = src;
                element.magnifierType = 'standard';
                const attributes = {
                    position: 'top',
                    horizontalOffset: '10',
                    verticalOffset: '10',
                    smoothMove: true,
                    zoomFactor: '6',
                    zoomRatioWidth: '150px',
                    zoomRatioHeight: '150px'
                };
                element.magnifierAttributes = attributes;

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.width).toBe('150px');
                    expect(magnifier.style.height).toBe('150px');
                    expect(magnifiedImage.style.transition).toBe(
                        'transform 0.15s ease-out'
                    );
                });
            });

            it('Passed to the component - incorrect', () => {
                element.src = src;
                element.magnifierType = 'standard';
                const attributes = {
                    position: 'top',
                    horizontalOffset: '10px',
                    verticalOffset: '10px',
                    smoothMove: true,
                    zoomFactor: '6',
                    zoomRatioWidth: 150,
                    zoomRatioHeight: 150
                };
                element.magnifierAttributes = attributes;

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.width).toBe('150px');
                    expect(magnifier.style.height).toBe('150px');
                    expect(element.magnifierAttributes.horizontalOffset).toBe(
                        0
                    );
                    expect(element.magnifierAttributes.verticalOffset).toBe(0);
                });
            });
        });

        describe('Magnifier boundaries', () => {
            it('Magnifier boundaries - top', () => {
                element.src = src;
                element.magnifierType = 'standard';

                return Promise.resolve().then(() => {
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 400;
                    img.height = 300;
                    img.dispatchEvent(
                        new MouseEvent('mousemove', {
                            clientX: 10,
                            clientY: -5
                        })
                    );
                    expect(magnifiedImage.style.transform).toBe(
                        'translate(-20px, -0px)'
                    );
                });
            });

            it('Magnifier boundaries - bottom', () => {
                element.src = src;
                element.magnifierType = 'inner';

                return Promise.resolve().then(() => {
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 400;
                    img.height = 300;
                    img.dispatchEvent(
                        new MouseEvent('mousemove', {
                            clientX: 10,
                            clientY: img.height + 5
                        })
                    );
                    expect(magnifiedImage.style.transform).toBe(
                        `translate(-20px, -${
                            img.height * element.magnifierAttributes.zoomFactor
                        }px)`
                    );
                });
            });

            it('Magnifier boundaries - left', () => {
                element.src = src;
                element.magnifierType = 'follow';

                return Promise.resolve().then(() => {
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 400;
                    img.height = 300;
                    img.dispatchEvent(
                        new MouseEvent('mousemove', {
                            clientX: -5,
                            clientY: 10
                        })
                    );
                    expect(magnifiedImage.style.transform).toBe(
                        'translate(-0px, -20px)'
                    );
                });
            });

            it('Magnifier boundaries - right', () => {
                element.src = src;
                element.magnifierType = 'standard';

                return Promise.resolve().then(() => {
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 400;
                    img.height = 300;
                    img.dispatchEvent(
                        new MouseEvent('mousemove', {
                            clientX: img.width + 5,
                            clientY: 10
                        })
                    );
                    expect(magnifiedImage.style.transform).toBe(
                        `translate(-${
                            img.width * element.magnifierAttributes.zoomFactor
                        }px, -20px)`
                    );
                });
            });
        });

        describe('Magnifier types', () => {
            it('Standard magnifier mousemove', () => {
                element.src = src;
                element.magnifierType = 'standard';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    img.width = 400;
                    img.height = 300;
                    img.dispatchEvent(
                        new MouseEvent('mousemove', { clientX: 6, clientY: 8 })
                    );
                    expect(magnifiedImage.style.transform).toBe(
                        'translate(-12px, -16px)'
                    );
                });
            });

            it('Follow magnifier mousemove', () => {
                element.src = src;
                element.magnifierType = 'follow';

                return Promise.resolve().then(() => {
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 400;
                    img.height = 300;
                    img.dispatchEvent(
                        new MouseEvent('mousemove', {
                            clientX: 10,
                            clientY: 12
                        })
                    );
                    expect(magnifiedImage.style.transform).toBe(
                        'translate(-20px, -24px)'
                    );
                });
            });

            it('Inner magnifier mousemove', () => {
                element.src = src;
                element.magnifierType = 'inner';

                return Promise.resolve().then(() => {
                    const magnifiedImage = element.shadowRoot.querySelector(
                        '[data-element-id="magnified-img"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.width = 400;
                    img.height = 300;
                    img.dispatchEvent(
                        new MouseEvent('mousemove', { clientX: 4, clientY: 5 })
                    );
                    expect(magnifiedImage.style.transform).toBe(
                        'translate(-8px, -10px)'
                    );
                });
            });

            it('Magnifier mouseout', () => {
                element.src = src;
                element.magnifierType = 'standard';

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    img.dispatchEvent(new MouseEvent('mouseout'));
                    expect(magnifier.style.display).toBe('none');
                });
            });
        });

        describe('Position', () => {
            it('left', () => {
                element.src = src;
                element.position = 'left';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain('slds-float_left');
                });
            });

            it('right', () => {
                element.src = src;
                element.position = 'right';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain('slds-float_right');
                });
            });

            it('center', () => {
                element.src = src;
                element.position = 'center';

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'slds-align_absolute-center',
                        'slds-show'
                    );
                });
            });
        });

        describe('sizes', () => {
            it('Passed to the component', () => {
                element.srcset =
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg 320w';
                element.sizes =
                    '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.sizes).toBe(
                        '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
                    );
                });
            });
            it('Passed to the component as array', () => {
                element.srcset =
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg 320w';
                element.sizes = [
                    '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
                ];

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.sizes).toBe(
                        '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
                    );
                });
            });
        });

        describe('src', () => {
            it('Passed to the component', () => {
                element.src = src;

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toBe(
                        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
                    );
                });
            });
        });

        describe('srcset', () => {
            it('Passed to the component as string', () => {
                element.srcset =
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.srcset).toBe(
                        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
                    );
                });
            });

            it('Passed to the component as array', () => {
                element.srcset = [
                    'https://www.avonni.app/, https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
                ];

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.srcset).toBe(
                        'https://www.avonni.app/, https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
                    );
                });
            });
        });

        describe('Static image', () => {
            it('Static Image - No Crop - Width - No Height', () => {
                element.src = src;
                element.staticImages = true;
                element.width = '400';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.maxWidth).toBe('400px');
                    expect(img.style.height).toBeFalsy();
                });
            });
            it('Static Image - No Crop - No Width - Height', () => {
                element.src = src;
                element.staticImages = true;
                element.height = '400';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.maxHeight).toBe('400px');
                    expect(img.style.minHeight).toBe('400px');
                    expect(img.style.height).toBe('400px');
                });
            });

            it('Static Image - No Crop - No Width - No Height', () => {
                element.src = src;
                element.staticImages = true;
                element.width = 400;
                element.height = 300;
                document.body.appendChild(element);

                return Promise.resolve()
                    .then(() => {})
                    .then(() => {
                        const img = element.shadowRoot.querySelector(
                            '[data-element-id="img"]'
                        );
                        expect(img.style.minWidth).toBe('400px');
                        expect(img.style.minHeight).toBe('300px');
                        expect(img.style.maxWidth).toBe('400px');
                        expect(img.style.maxHeight).toBe('300px');
                    });
            });

            it('Static Image - No Crop - Width - Height', () => {
                element.src = src;
                element.staticImages = true;
                element.height = 400;
                element.width = 400;

                return Promise.resolve()
                    .then(() => {})
                    .then(() => {
                        const img = element.shadowRoot.querySelector(
                            '[data-element-id="img"]'
                        );
                        expect(img.style.minWidth).toBe('400px');
                        expect(img.style.minHeight).toBe('400px');
                        expect(img.style.maxWidth).toBe('400px');
                        expect(img.style.maxHeight).toBe('400px');
                    });
            });

            it('Static Image - Crop 1x1 - Width - No Height', () => {
                element.src = src;
                element.staticImages = true;
                element.width = '400';
                element.cropSize = '1x1';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.maxWidth).toBe('400px');
                    expect(img.style.minWidth).toBe('400px');
                });
            });
        });

        describe('thumbnail', () => {
            it('Passed to the component', () => {
                element.src = src;
                element.thumbnail = true;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-image_thumbnail'
                    );
                });
            });
        });

        describe('width', () => {
            it('Passed to the component', () => {
                element.src = src;
                element.width = '50%';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.style.width).toBe('50%');
                });
            });
        });

        describe('Standard magnifier auto position', () => {
            const attributes = {
                position: 'auto',
                horizontalOffset: 10,
                verticalOffset: 10
            };

            beforeEach(() => {
                element.src = src;
                element.magnifierType = 'standard';
                element.magnifierAttributes = attributes;
            });

            it('Standard magnifier auto position - image left', () => {
                element.position = 'left';

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const top = attributes.verticalOffset + 'px';
                    const left = img.width + attributes.horizontalOffset + 'px';
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.top).toBe(top);
                    expect(magnifier.style.left).toBe(left);
                });
            });

            it('Standard magnifier auto position - image center', () => {
                element.position = 'center';

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const top = attributes.verticalOffset + 'px';
                    const left = img.width + attributes.horizontalOffset + 'px';
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.top).toBe(top);
                    expect(magnifier.style.left).toBe(left);
                });
            });

            it('Standard magnifier auto position - image right', () => {
                element.position = 'right';

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const top = attributes.verticalOffset + 'px';
                    const left =
                        '-' +
                        magnifier.offsetWidth -
                        attributes.horizontalOffset +
                        'px';
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.top).toBe(top);
                    expect(magnifier.style.left).toBe(left);
                });
            });
        });

        describe('Standard magnifier manual position', () => {
            const attributes = {
                position: 'left',
                horizontalOffset: 10,
                verticalOffset: 10
            };

            beforeEach(() => {
                element.src = src;
                element.magnifierType = 'standard';
            });

            it('Standard magnifier manual position - left', () => {
                attributes.position = 'left';
                element.magnifierAttributes = attributes;

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const top = attributes.verticalOffset + 'px';
                    const left = '-' + attributes.horizontalOffset + 'px';
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.top).toBe(top);
                    expect(magnifier.style.left).toBe(left);
                });
            });

            it('Standard magnifier manual position - right', () => {
                attributes.position = 'right';
                element.magnifierAttributes = attributes;

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const top = attributes.verticalOffset + 'px';
                    const left = img.width + attributes.horizontalOffset + 'px';
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.top).toBe(top);
                    expect(magnifier.style.left).toBe(left);
                });
            });

            it('Standard magnifier manual position - top', () => {
                attributes.position = 'top';
                element.magnifierAttributes = attributes;

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const top =
                        '-' +
                        magnifier.offsetHeight -
                        attributes.verticalOffset +
                        'px';
                    const left = attributes.horizontalOffset + 'px';
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.top).toBe(top);
                    expect(magnifier.style.left).toBe(left);
                });
            });

            it('Standard magnifier manual position - bottom', () => {
                attributes.position = 'bottom';
                element.magnifierAttributes = attributes;

                return Promise.resolve().then(() => {
                    const magnifier = element.shadowRoot.querySelector(
                        '[data-element-id="magnifier"]'
                    );
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    const top = img.height + attributes.verticalOffset + 'px';
                    const left = attributes.horizontalOffset + 'px';
                    img.dispatchEvent(new MouseEvent('mousemove'));
                    expect(magnifier.style.top).toBe(top);
                    expect(magnifier.style.left).toBe(left);
                });
            });
        });
    });
});

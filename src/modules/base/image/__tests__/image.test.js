import { createElement } from 'lwc';
import Image from 'c/image';

// not tested
// blank and blankColor because of canvas

const src =
    'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg';

describe('Image', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Image Default attributes', () => {
        const element = createElement('base-image', {
            is: Image
        });

        expect(element.src).toBeUndefined();
        expect(element.srcset).toBeUndefined();
        expect(element.sizes).toBeUndefined();
        expect(element.alt).toBeUndefined();
        expect(element.width).toBeUndefined();
        expect(element.height).toBeUndefined();
        expect(element.block).toBeFalsy();
        expect(element.fluid).toBeFalsy();
        expect(element.fluidGrow).toBeFalsy();
        expect(element.rounded).toBeFalsy();
        expect(element.thumbnail).toBeFalsy();
        expect(element.left).toBeFalsy();
        expect(element.right).toBeFalsy();
        expect(element.center).toBeFalsy();
        expect(element.blank).toBeFalsy();
        expect(element.blankColor).toBe('transparent');
        expect(element.cropSize).toBeUndefined();
        expect(element.cropFit).toBe('cover');
        expect(element.cropPositionX).toBe('50');
        expect(element.cropPositionY).toBe('50');
    });

    /* ----- ATTRIBUTES ----- */

    // src
    it('Image src', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.src).toBe(
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
            );
        });
    });

    // srcset
    it('Image srcset string', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.srcset =
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.srcset).toBe(
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
            );
        });
    });

    it('Image srcset string[]', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.srcset = [
            'https://www.avonni.app/, https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
        ];

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.srcset).toBe(
                'https://www.avonni.app/, https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg'
            );
        });
    });

    // sizes
    it('Image sizes', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.srcset =
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg 320w';
        element.sizes =
            '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.sizes).toBe(
                '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
            );
        });
    });

    it('Image sizes[]', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.srcset =
            'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg 320w';
        element.sizes = [
            '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
        ];

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.sizes).toBe(
                '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'
            );
        });
    });

    // alt
    it('Image alt', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.alt = 'This is an alt text';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.alt).toBe('This is an alt text');
        });
    });

    // width & height
    it('Image width & height numbers', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.width = 120;
        element.height = 100;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.width).toBe(120);
            expect(img.height).toBe(100);
        });
    });

    it('Image width & height strings', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.width = '120';
        element.height = '100';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.width).toBe(120);
            expect(img.height).toBe(100);
        });
    });

    // block
    it('Image block', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.block = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-display-block'
            );
        });
    });

    // fluid
    it('Image fluid', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.fluid = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-img-fluid'
            );
        });
    });

    // fluid grow
    it('Image fluid grow', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.fluidGrow = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-img-fluid avonni-img-fluid-grow'
            );
        });
    });

    // rounded
    it('Image rounded', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.rounded = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-rounded'
            );
        });
    });

    it('Image rounded top', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.rounded = 'top';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-rounded-top'
            );
        });
    });

    it('Image rounded right', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.rounded = 'right';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-rounded-right'
            );
        });
    });

    it('Image rounded left', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.rounded = 'left';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-rounded-left'
            );
        });
    });

    it('Image rounded bottom', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.rounded = 'bottom';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-rounded-bottom'
            );
        });
    });

    it('Image rounded circle', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.rounded = 'circle';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-rounded-circle'
            );
        });
    });

    // thumbnail
    it('Image thumbnail', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.thumbnail = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-img-thumbnail'
            );
        });
    });

    // left
    it('Image left', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.left = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-float-left'
            );
        });
    });

    // right
    it('Image right', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.right = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-float-right'
            );
        });
    });

    // center
    it('Image center', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.center = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_no-crop_no-width avonni-margin-auto avonni-display-block'
            );
        });
    });

    // Image Crop
    it('Image Crop Size 1x1', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '1x1';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            const container = element.shadowRoot.querySelector(
                '.avonni-img-container'
            );
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped_no-width'
            );
            expect(container.style.paddingTop).toBe('100%');
        });
    });

    it('Image Crop Size 4x3', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '4x3';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            const container = element.shadowRoot.querySelector(
                '.avonni-img-container'
            );
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped_no-width'
            );
            expect(container.style.paddingTop).toBe('75%');
        });
    });

    it('Image Crop Size 16x9', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            const container = element.shadowRoot.querySelector(
                '.avonni-img-container'
            );
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped_no-width'
            );
            expect(container.style.paddingTop).toBe('56.25%');
        });
    });

    // Crop Fit
    it('Crop Fit Cover', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'cover';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.style.objectFit).toBe('cover');
        });
    });

    it('Crop Fit Contain', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'contain';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.style.objectFit).toBe('contain');
        });
    });

    it('Crop Fit Fill', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'fill';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.style.objectFit).toBe('fill');
        });
    });

    it('Crop Fit None', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'none';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.style.objectFit).toBe('none');
        });
    });

    // Crop Position
    it('Crop Position', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.cropFit = 'none';
        element.cropPositionX = '25';
        element.cropPositionY = '75';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.style.objectPosition).toBe('25% 75%');
        });
    });

    // Cropped Img Alignment - left, right, centre
    it('Cropped Image Left', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.width = '300';
        element.left = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped-left avonni-img_cropped_width'
            );
        });
    });

    it('Cropped Image Center', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.width = '300';
        element.center = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-display-block avonni-img_cropped avonni-img_cropped-centered avonni-img_cropped_width'
            );
        });
    });

    it('Cropped Image Right', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.width = '300';
        element.right = true;

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped-right avonni-img_cropped_width'
            );
        });
    });

    // Cropped Ratio with width
    it('Cropped Ratio with Width 1x1', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '1x1';
        element.width = '400';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped_width'
            );
            expect(img.style.width).toBe('400px');
            expect(img.style.height).toBe('400px');
        });
    });

    it('Cropped Ratio with Width 4x3', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '4x3';
        element.width = '400';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped_width'
            );
            expect(img.style.width).toBe('400px');
            expect(img.style.height).toBe('300px');
        });
    });

    it('Cropped Ratio with Width 16x9', () => {
        const element = createElement('base-image', {
            is: Image
        });
        document.body.appendChild(element);

        element.src = src;
        element.cropSize = '16x9';
        element.width = '400';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.className).toBe(
                'avonni-img_cropped avonni-img_cropped_width'
            );
            expect(img.style.width).toBe('400px');
            expect(img.style.height).toBe('225px');
        });
    });
});

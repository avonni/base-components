import { createElement } from 'lwc';
import Illustration from 'c/illustration';

let element;
describe('Illustration', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-illustration', {
            is: Illustration
        });
        document.body.appendChild(element);
    });

    it('Illustration: Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('text-only');
        expect(element.size).toBe('small');
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Illustration: title', () => {
        element.title = 'This is a title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="h3"]'
            );
            expect(title.textContent).toBe('This is a title');
        });
    });

    // size
    it('Illustration: size small', () => {
        return Promise.resolve().then(() => {
            const container =
                element.shadowRoot.querySelector('.slds-illustration');
            expect(container.className).toContain('slds-illustration_small');
            expect(container.className).not.toContain(
                'slds-illustration_large'
            );
        });
    });

    it('Illustration: size large', () => {
        element.size = 'large';

        return Promise.resolve().then(() => {
            const container =
                element.shadowRoot.querySelector('.slds-illustration');
            expect(container.className).not.toContain(
                'slds-illustration_small'
            );
            expect(container.className).toContain('slds-illustration_large');
        });
    });

    // variant
    it('Illustration: variant text-only', () => {
        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img).toBeFalsy();
        });
    });

    it('Illustration: variant going-camping', () => {
        element.variant = 'going-camping';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/going-camping.svg'
            );
        });
    });

    it('Illustration: variant maintenance', () => {
        element.variant = 'maintenance';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/maintenance.svg'
            );
        });
    });

    it('Illustration: variant desert', () => {
        element.variant = 'desert';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/desert.svg'
            );
        });
    });

    it('Illustration: variant open-road', () => {
        element.variant = 'open-road';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/open-road.svg'
            );
        });
    });

    it('Illustration: variant no-access', () => {
        element.variant = 'no-access';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/no-access.svg'
            );
        });
    });

    it('Illustration: variant no-connection', () => {
        element.variant = 'no-connection';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/no-connection.svg'
            );
        });
    });

    it('Illustration: variant not-available-in-lightning', () => {
        element.variant = 'not-available-in-lightning';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/not-available-in-lightning.svg'
            );
        });
    });

    it('Illustration: variant page-not-available', () => {
        element.variant = 'page-not-available';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/page-not-available.svg'
            );
        });
    });

    it('Illustration: variant walkthrough-not-available', () => {
        element.variant = 'walkthrough-not-available';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/walkthrough-not-available.svg'
            );
        });
    });

    it('Illustration: variant fishing-deals', () => {
        element.variant = 'fishing-deals';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/fishing-deals.svg'
            );
        });
    });

    it('Illustration: variant lake-mountain', () => {
        element.variant = 'lake-mountain';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/lake-mountain.svg'
            );
        });
    });

    it('Illustration: variant no-events', () => {
        element.variant = 'no-events';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/no-events.svg'
            );
        });
    });

    it('Illustration: variant no-task', () => {
        element.variant = 'no-task';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/no-task.svg'
            );
        });
    });

    it('Illustration: variant setup', () => {
        element.variant = 'setup';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/setup.svg'
            );
        });
    });

    it('Illustration: variant gone-fishing', () => {
        element.variant = 'gone-fishing';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/gone-fishing.svg'
            );
        });
    });

    it('Illustration: variant no-access-2', () => {
        element.variant = 'no-access-2';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/no-access-2.svg'
            );
        });
    });

    it('Illustration: variant no-content', () => {
        element.variant = 'no-content';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/no-content.svg'
            );
        });
    });

    it('Illustration: variant no-preview', () => {
        element.variant = 'no-preview';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/no-preview.svg'
            );
        });
    });

    it('Illustration: variant preview', () => {
        element.variant = 'preview';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/preview.svg'
            );
        });
    });

    it('Illustration: variant research', () => {
        element.variant = 'research';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(img.src).toContain(
                '/assets/canvas-elements/illustrationLibrary/research.svg'
            );
        });
    });
});

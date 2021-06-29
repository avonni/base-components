import { createElement } from 'lwc';
import HeroBanner from 'c/heroBanner';

// not tested
// src & linear gradient

describe('Hero Banner', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });

        expect(element.title).toBeUndefined();
        expect(element.caption).toBeUndefined();
        expect(element.subtitle).toBeUndefined();
        expect(element.src).toBeUndefined();
        expect(element.height).toBe(400);
        expect(element.maxWidth).toBe(960);
        expect(element.contentHorizontalAlignment).toBe('left');
        expect(element.contentVerticalAlignment).toBe('center');
        expect(element.contentWidth).toBe(100);
        expect(element.primaryButtonLabel).toBeUndefined();
        expect(element.secondaryButtonLabel).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Hero Banner title', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h2');
            expect(title.textContent).toBe('This is a title text');
        });
    });

    // caption
    it('Hero Banner caption', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h1');
            expect(caption.textContent).toBe('This is a caption text');
        });
    });

    // subtitle
    it('Hero Banner subtitle', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('p');
            expect(subtitle.textContent).toBe('This is a subtitle text');
        });
    });

    // height
    it('Hero Banner height', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        const height = '200px';
        element.height = 200;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner-background-class'
            );
            expect(background.style.height).toBe(height);
        });
    });

    // max width
    it('Hero Banner max width', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        const maxWidth = '50px';
        element.maxWidth = 50;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(background.style.width).toBe(maxWidth);
        });
    });

    // content horizontal alignment
    it('Hero Banner content horizontal alignment center', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-horizontal-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_right'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_left'
            );
        });
    });

    it('Hero Banner content horizontal alignment left', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'left';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_right'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-horizontal-alignment_left'
            );
        });
    });

    it('Hero Banner content horizontal alignment right', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentHorizontalAlignment = 'right';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-width-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_center'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-horizontal-alignment_right'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-horizontal-alignment_left'
            );
        });
    });

    // content vertical alignment
    it('Hero Banner content vertical alignment center', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content-container'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_top'
            );
        });
    });

    it('Hero Banner content vertical alignment top', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'top';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_bottom'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement_top'
            );
        });
    });

    it('Hero Banner content vertical alignment bottom', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'bottom';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content-container'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_center'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement_bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement_top'
            );
        });
    });

    // content width
    it('Hero Banner content width', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentWidth = 10;
        const contentWidth = '10%';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector(
                '.avonni-hero-banner-content'
            );
            expect(textContainer.style.width).toBe(contentWidth);
        });
    });

    // Primary button label
    it('Hero Banner primary button label', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.primaryButtonLabel = 'This is a primary button label';

        return Promise.resolve().then(() => {
            const primaryButton = element.shadowRoot.querySelector(
                '.avonni-hero-banner-primary-button'
            );
            expect(primaryButton.textContent).toBe(
                'This is a primary button label'
            );
        });
    });

    // Needs a primary button
    // Secondary button label
    it('Hero Banner secondary button label', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.primaryButtonLabel = 'This is a primary button label';
        element.secondaryButtonLabel = 'This is a secondary button label';

        return Promise.resolve().then(() => {
            const secondaryButton = element.shadowRoot.querySelector(
                '.avonni-hero-banner-secondary-button'
            );
            expect(secondaryButton.textContent).toBe(
                'This is a secondary button label'
            );
        });
    });
});

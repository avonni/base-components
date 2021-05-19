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
        expect(element.titleFontColor).toBe('#ffffff');
        expect(element.titleFontFamily).toBe(
            '"Salesforce Sans", Arial, sans-serif'
        );
        expect(element.titleFontSize).toBe('large');
        expect(element.titleFontWeight).toBe('bold');
        expect(element.description).toBeUndefined();
        expect(element.descriptionFontColor).toBe('#ffffff');
        expect(element.descriptionFontFamily).toBe(
            '"Salesforce Sans", Arial, sans-serif'
        );
        expect(element.descriptionFontSize).toBe('medium');
        expect(element.descriptionFontWeight).toBe('normal');
        expect(element.src).toBeUndefined();
        expect(element.linearGradient).toBe('rgba(0,0,0,0.4), rgba(0,0,0,0.4)');
        expect(element.height).toBe(400);
        expect(element.textHorizontalAlignment).toBe('left');
        expect(element.textVerticalAlignment).toBe('center');
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
            const title = element.shadowRoot.querySelector('h1');
            expect(title.textContent).toBe('This is a title text');
        });
    });

    // title font color
    it('Hero Banner title font color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontColor = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.style.color).toBe('rgb(0, 0, 0)');
        });
    });

    // title font family
    it('Hero Banner title font family', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontFamily = 'Arial';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.style.fontFamily).toBe('Arial');
        });
    });

    // title font size
    it('Hero Banner title font size small', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontSize = 'small';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain('slds-text-heading_small');
        });
    });

    it('Hero Banner title font size medium', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontSize = 'medium';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain('slds-text-heading_medium');
        });
    });

    it('Hero Banner title font size large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontSize = 'large';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain('slds-text-heading_large');
        });
    });

    it('Hero Banner title font size x-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontSize = 'x-large';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain(
                'avonni-hero-banner-text-x_large'
            );
        });
    });

    it('Hero Banner title font size xx-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontSize = 'xx-large';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain(
                'avonni-hero-banner-text-xx_large'
            );
        });
    });

    // title font weight
    it('Hero Banner title font weight light', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontWeight = 'light';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain(
                'avonni-hero-banner-font-weight_light'
            );
        });
    });

    it('Hero Banner title font weight normal', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontWeight = 'normal';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain(
                'avonni-hero-banner-font-weight_normal'
            );
        });
    });

    it('Hero Banner title font weight bold', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleFontWeight = 'bold';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.classList).toContain(
                'avonni-hero-banner-font-weight_bold'
            );
        });
    });

    // description
    it('Hero Banner description', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.textContent).toBe('This is a description text');
        });
    });

    // description font color
    it('Hero Banner description font color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontColor = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.style.color).toBe('rgb(0, 0, 0)');
        });
    });

    // description font family
    it('Hero Banner description font family', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontFamily = 'Arial';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.style.fontFamily).toBe('Arial');
        });
    });

    // description font size
    it('Hero Banner description font size small', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontSize = 'small';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain('slds-text-heading_small');
        });
    });

    it('Hero Banner description font size medium', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontSize = 'medium';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain('slds-text-heading_medium');
        });
    });

    it('Hero Banner description font size large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontSize = 'large';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain('slds-text-heading_large');
        });
    });

    it('Hero Banner description font size x-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontSize = 'x-large';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain(
                'avonni-hero-banner-text-x_large'
            );
        });
    });

    it('Hero Banner description font size xx-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontSize = 'xx-large';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain(
                'avonni-hero-banner-text-xx_large'
            );
        });
    });

    // description font weight
    it('Hero Banner description font weight light', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontWeight = 'light';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain(
                'avonni-hero-banner-font-weight_light'
            );
        });
    });

    it('Hero Banner description font weight normal', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontWeight = 'normal';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain(
                'avonni-hero-banner-font-weight_normal'
            );
        });
    });

    it('Hero Banner description font weight bold', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.description = 'This is a description text';
        element.descriptionFontWeight = 'bold';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector('h2');
            expect(description.classList).toContain(
                'avonni-hero-banner-font-weight_bold'
            );
        });
    });

    // height
    it('Hero Banner height', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.height = 200;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner-background-class'
            );
            expect(background.style.height).toBe('200px');
        });
    });

    // text horizontal alignment
    it('Hero Banner text horizontal alignment center', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.textHorizontalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).toContain('slds-text-align_center');
        });
    });

    it('Hero Banner text horizontal alignment left', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.textHorizontalAlignment = 'left';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).toContain('slds-text-align_left');
        });
    });

    it('Hero Banner text horizontal alignment right', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.textHorizontalAlignment = 'right';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).toContain('slds-text-align_right');
        });
    });

    // text vertical alignment
    it('Hero Banner text vertical alignment center', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.textVerticalAlignment = 'center';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement-center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement-bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-column-div'
            );
        });
    });

    it('Hero Banner text vertical alignment top', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.textVerticalAlignment = 'top';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement-center'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement-bottom'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-column-div'
            );
        });
    });

    it('Hero Banner text vertical alignment bottom', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.textVerticalAlignment = 'bottom';

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-vertical-alignement-center'
            );
            expect(textContainer.className).toContain(
                'avonni-hero-banner-vertical-alignement-bottom'
            );
            expect(textContainer.className).not.toContain(
                'avonni-hero-banner-column-div'
            );
        });
    });
});

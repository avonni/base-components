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
        expect(element.titleColor).toBe('#ffffff');
        expect(element.titleFontFamily).toBe(
            '"Salesforce Sans", Arial, sans-serif'
        );
        expect(element.titleFontSize).toBe('large');
        expect(element.titleFontWeight).toBe('bold');
        expect(element.titleShadowColor).toBe('1px 1px 0 rgb(0 0 0 / 50%)');
        expect(element.caption).toBeUndefined();
        expect(element.captionColor).toBe('#ffffff');
        expect(element.captionFontFamily).toBe(
            '"Salesforce Sans", Arial, sans-serif'
        );
        expect(element.captionFontSize).toBe('small');
        expect(element.captionFontWeight).toBe('light');
        expect(element.captionShadowColor).toBe('1px 1px 0 rgb(0 0 0 / 50%)');
        expect(element.subtitle).toBeUndefined();
        expect(element.subtitleColor).toBe('#ffffff');
        expect(element.subtitleFontFamily).toBe(
            '"Salesforce Sans", Arial, sans-serif'
        );
        expect(element.subtitleFontSize).toBe('medium');
        expect(element.subtitleFontWeight).toBe('normal');
        expect(element.subtitleShadowColor).toBe('1px 1px 0 rgb(0 0 0 / 50%)');
        expect(element.src).toBeUndefined();
        expect(element.backgroundColor).toBe('#ffffff');
        expect(element.linearGradient).toBe('rgba(0,0,0,0.4), rgba(0,0,0,0.4)');
        expect(element.height).toBe(400);
        expect(element.maxWidth).toBe(960);
        expect(element.contentHorizontalAlignment).toBe('left');
        expect(element.contentVerticalAlignment).toBe('center');
        expect(element.contentWidth).toBe(50);
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

    // title color
    it('Hero Banner title color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleColor = 'rgb(0, 0, 0)';

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

    // title Shadow color
    it('Hero Banner title Shadow color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.titleShadowColor = '5px 5px #558abb';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.style.textShadow).toBe('5px 5px #558abb');
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
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.textContent).toBe('This is a caption text');
        });
    });

    // caption color
    it('Hero Banner caption color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionColor = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.style.color).toBe('rgb(0, 0, 0)');
        });
    });

    // caption font family
    it('Hero Banner caption font family', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontFamily = 'Arial';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.style.fontFamily).toBe('Arial');
        });
    });

    // caption font size
    it('Hero Banner caption font size small', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontSize = 'small';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain('slds-text-heading_small');
        });
    });

    it('Hero Banner caption font size medium', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontSize = 'medium';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain('slds-text-heading_medium');
        });
    });

    it('Hero Banner caption font size large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontSize = 'large';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain('slds-text-heading_large');
        });
    });

    it('Hero Banner caption font size x-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontSize = 'x-large';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain(
                'avonni-hero-banner-text-x_large'
            );
        });
    });

    it('Hero Banner caption font size xx-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontSize = 'xx-large';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain(
                'avonni-hero-banner-text-xx_large'
            );
        });
    });

    // caption font weight
    it('Hero Banner caption font weight light', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontWeight = 'light';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain(
                'avonni-hero-banner-font-weight_light'
            );
        });
    });

    it('Hero Banner caption font weight normal', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontWeight = 'normal';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain(
                'avonni-hero-banner-font-weight_normal'
            );
        });
    });

    it('Hero Banner caption font weight bold', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionFontWeight = 'bold';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.classList).toContain(
                'avonni-hero-banner-font-weight_bold'
            );
        });
    });

    // caption Shadow color
    it('Hero Banner caption Shadow color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.caption = 'This is a caption text';
        element.captionShadowColor = '5px 5px #558abb';

        return Promise.resolve().then(() => {
            const caption = element.shadowRoot.querySelector('h3');
            expect(caption.style.textShadow).toBe('5px 5px #558abb');
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
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.textContent).toBe('This is a subtitle text');
        });
    });

    // subtitle color
    it('Hero Banner subtitle color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleColor = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.style.color).toBe('rgb(0, 0, 0)');
        });
    });

    // subtitle font family
    it('Hero Banner subtitle font family', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontFamily = 'Arial';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.style.fontFamily).toBe('Arial');
        });
    });

    // subtitle font size
    it('Hero Banner subtitle font size small', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontSize = 'small';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain('slds-text-heading_small');
        });
    });

    it('Hero Banner subtitle font size medium', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontSize = 'medium';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain('slds-text-heading_medium');
        });
    });

    it('Hero Banner subtitle font size large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontSize = 'large';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain('slds-text-heading_large');
        });
    });

    it('Hero Banner subtitle font size x-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontSize = 'x-large';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain(
                'avonni-hero-banner-text-x_large'
            );
        });
    });

    it('Hero Banner subtitle font size xx-large', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontSize = 'xx-large';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain(
                'avonni-hero-banner-text-xx_large'
            );
        });
    });

    // subtitle font weight
    it('Hero Banner subtitle font weight light', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontWeight = 'light';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain(
                'avonni-hero-banner-font-weight_light'
            );
        });
    });

    it('Hero Banner subtitle font weight normal', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontWeight = 'normal';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain(
                'avonni-hero-banner-font-weight_normal'
            );
        });
    });

    it('Hero Banner subtitle font weight bold', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleFontWeight = 'bold';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.classList).toContain(
                'avonni-hero-banner-font-weight_bold'
            );
        });
    });

    // subtitle Shadow color
    it('Hero Banner subtitle Shadow color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.subtitle = 'This is a subtitle text';
        element.subtitleShadowColor = '5px 5px #558abb';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector('h2');
            expect(subtitle.style.textShadow).toBe('5px 5px #558abb');
        });
    });

    // background color
    it('Hero Banner background color', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        const backgroundColor = 'rgb(0, 0, 0)';
        element.backgroundColor = 'rgb(0, 0, 0)';

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner-background-class'
            );
            expect(background.style.backgroundColor).toBe(backgroundColor);
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

        const maxWidth = '1000px';
        element.maxWidth = 1000;

        return Promise.resolve().then(() => {
            const background = element.shadowRoot.querySelector(
                '.avonni-hero-banner-background-class'
            );
            expect(background.style.maxWidth).toBe(maxWidth);
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
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).toContain('slds-text-align_center');
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
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).toContain('slds-text-align_left');
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
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.className).toContain('slds-text-align_right');
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

    it('Hero Banner content vertical alignment top', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'top';

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

    it('Hero Banner content vertical alignment bottom', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentVerticalAlignment = 'bottom';

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

    // content width
    it('Hero Banner content width', () => {
        const element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);

        element.title = 'This is a title text';
        element.contentWidth = 100;

        return Promise.resolve().then(() => {
            const textContainer = element.shadowRoot.querySelector('span');
            expect(textContainer.style.width).toBe('100%');
        });
    });
});

import { createElement } from 'lwc';
import MediaObject from 'c/mediaObject';

describe('MediaObject', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });

        expect(element.verticalAlign).toBe('start');
        expect(element.responsive).toBeFalsy();
        expect(element.inline).toBeFalsy();
        expect(element.size).toBe('medium');
    });

    // vertical-align
    it('verticalAlign = start', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.verticalAlign = 'start';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_center');
            expect(wrapper.classList).not.toContain(
                'avonni-media-object-alignement-end'
            );
        });
    });

    it('verticalAlign = center', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.verticalAlign = 'center';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_center');
            expect(wrapper.classList).not.toContain(
                'avonni-media-object-alignement-end'
            );
        });
    });

    it('verticalAlign = end', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.verticalAlign = 'end';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_center');
            expect(wrapper.classList).toContain(
                'avonni-media-object-alignement-end'
            );
        });
    });

    // responsive
    it('responsive = false', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.responsive = false;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_responsive');
        });
    });

    it('responsive = true', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.responsive = true;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_responsive');
        });
    });

    // inline
    it('inline = false', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.inline = false;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain(
                'avonni-media-object-display-inline'
            );
        });
    });

    it('inline = true', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.inline = true;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain(
                'avonni-media-object-display-inline'
            );
        });
    });

    // size
    it('size = medium', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.size = 'medium';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_small');
            expect(wrapper.classList).not.toContain('slds-media_large');
        });
    });

    it('size = small', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.size = 'small';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_small');
            expect(wrapper.classList).not.toContain('slds-media_large');
        });
    });

    it('size = large', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.size = 'large';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_small');
            expect(wrapper.classList).toContain('slds-media_large');
        });
    });
});

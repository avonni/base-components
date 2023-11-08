import { createElement } from 'lwc';
import MediaObject from 'c/mediaObject';

let element;
describe('MediaObject', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);
    });

    it('Media object: Default attributes', () => {
        expect(element.verticalAlign).toBe('start');
        expect(element.responsive).toBeFalsy();
        expect(element.inline).toBeFalsy();
        expect(element.size).toBe('medium');
    });

    // vertical-align
    it('Media object: VerticalAlign = start', () => {
        element.verticalAlign = 'start';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_center');
            expect(wrapper.classList).not.toContain(
                'avonni-media-object_alignment-end'
            );
        });
    });

    it('Media object: VerticalAlign = center', () => {
        element.verticalAlign = 'center';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_center');
            expect(wrapper.classList).not.toContain(
                'avonni-media-object_alignment-end'
            );
        });
    });

    it('Media object: VerticalAlign = end', () => {
        element.verticalAlign = 'end';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_center');
            expect(wrapper.classList).toContain(
                'avonni-media-object_alignment-end'
            );
        });
    });

    // responsive
    it('Media object: Responsive = false', () => {
        element.responsive = false;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_responsive');
        });
    });

    it('Media object: Responsive = true', () => {
        element.responsive = true;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_responsive');
        });
    });

    // inline
    it('Media object: Inline = false', () => {
        element.inline = false;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain(
                'avonni-media-object_display-inline'
            );
        });
    });

    it('Media object: Inline = true', () => {
        element.inline = true;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain(
                'avonni-media-object_display-inline'
            );
        });
    });

    // size
    it('Media object: Size = medium', () => {
        element.size = 'medium';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_small');
            expect(wrapper.classList).not.toContain('slds-media_large');
        });
    });

    it('Media object: Size = small', () => {
        element.size = 'small';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_small');
            expect(wrapper.classList).not.toContain('slds-media_large');
        });
    });

    it('Media object: Size = large', () => {
        element.size = 'large';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_small');
            expect(wrapper.classList).toContain('slds-media_large');
        });
    });
});

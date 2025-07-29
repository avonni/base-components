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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.verticalAlign).toBe('start');
            expect(element.responsive).toBeFalsy();
            expect(element.inline).toBeFalsy();
            expect(element.size).toBe('medium');
        });

        describe('Inline', () => {
            it('false', () => {
                element.inline = false;
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).not.toContain(
                        'avonni-media-object_display-inline'
                    );
                });
            });

            it('true', () => {
                element.inline = true;
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).toContain(
                        'avonni-media-object_display-inline'
                    );
                });
            });
        });

        describe('Responsive', () => {
            it('false', () => {
                element.responsive = false;
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).not.toContain(
                        'slds-media_responsive'
                    );
                });
            });

            it('true', () => {
                element.responsive = true;
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).toContain(
                        'slds-media_responsive'
                    );
                });
            });
        });

        describe('Size', () => {
            it('medium', () => {
                element.size = 'medium';
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).not.toContain('slds-media_small');
                    expect(wrapper.classList).not.toContain('slds-media_large');
                });
            });

            it('small', () => {
                element.size = 'small';
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).toContain('slds-media_small');
                    expect(wrapper.classList).not.toContain('slds-media_large');
                });
            });

            it('large', () => {
                element.size = 'large';
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).not.toContain('slds-media_small');
                    expect(wrapper.classList).toContain('slds-media_large');
                });
            });
        });
        describe('VerticalAlign', () => {
            it('start', () => {
                element.verticalAlign = 'start';
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).not.toContain(
                        'slds-media_center'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-media-object_alignment-end'
                    );
                });
            });

            it('center', () => {
                element.verticalAlign = 'center';
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).toContain('slds-media_center');
                    expect(wrapper.classList).not.toContain(
                        'avonni-media-object_alignment-end'
                    );
                });
            });

            it('end', () => {
                element.verticalAlign = 'end';
                const wrapper = element.shadowRoot.querySelector('.slds-media');

                return Promise.resolve().then(() => {
                    expect(wrapper.classList).not.toContain(
                        'slds-media_center'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-media-object_alignment-end'
                    );
                });
            });
        });
    });
});

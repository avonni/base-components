import { createElement } from 'lwc';
import Segment from 'c/segment';

// Not tested because depends on slot content
// disabled
// value

const VARIANTS = ['shade', 'success', 'warning', 'error'];

describe('Segment', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        expect(element.disabled).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('shade');
    });

    /* ----- ATTRIBUTES ----- */

    // variant
    it('variant = shade', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'shade';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'shade') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    it('variant = success', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'success';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'success') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    it('variant = warning', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'warning') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    it('variant = error', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        element.variant = 'error';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-segment-container'
            );

            VARIANTS.forEach((variant) => {
                if (variant === 'error') {
                    expect(wrapper.classList).toContain(
                        `avonni-segment-${variant}`
                    );
                } else {
                    expect(wrapper.classList).not.toContain(
                        `avonni-segment-${variant}`
                    );
                }
            });
        });
    });

    /* ----- EVENTS ----- */

    // change event
    it('change event', () => {
        const element = createElement('base-segment', {
            is: Segment
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-segment-container'
        );
        wrapper.dispatchEvent(
            new CustomEvent('click', {
                detail: {
                    value: 'a-string-value'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});

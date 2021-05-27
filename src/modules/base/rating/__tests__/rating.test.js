import { createElement } from 'lwc';
import Rating from 'c/rating';

describe('Rating', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconSize).toBe('large');
        expect(element.label).toBeUndefined();
        expect(element.max).toBe(5);
        expect(element.min).toBe(1);
        expect(element.readOnly).toBeFalsy();
        expect(element.selection).toBe('continuous');
        expect(element.value).toBeUndefined();
        expect(element.valueHidden).toBeFalsy();
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    // Depends on iconName
    it('disabled = false', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.disabled = false;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button) => {
                expect(button.disabled).toBeFalsy();
            });
        });
    });

    it('disabled = false, with icon', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.disabled = false;
        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button) => {
                expect(button.disabled).toBeFalsy();
            });
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
        });
    });

    it('disabled = true, with icon', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.disabled = true;
        element.iconName = 'standard:apps';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
        });
    });

    // field-level-help
    // Depends on label
    it('fieldLevelHelp', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.fieldLevelHelp = 'A string help';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                'lightning-helptext'
            );
            expect(helptext).toBeTruthy();
            expect(helptext.content).toBe('A string help');
        });
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.iconName = 'utility:location';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttons.forEach((button) => {
                expect(button.iconName).toBe('utility:location');
            });
        });
    });

    // icon-size
    // Depends on iconName
    it('iconSize', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.iconName = 'utility:location';
        element.iconSize = 'small';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttons.forEach((button) => {
                expect(button.size).toBe('small');
            });
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('label');
            expect(label).toBeTruthy();
            expect(label.textContent.trim()).toBe('A string label');
        });
    });

    // max
    it('max', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.max = 8;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            expect(buttons).toHaveLength(8);
            expect(buttons[0].textContent).toBe('8');
        });
    });

    // min
    it('min', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.min = 2;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            expect(buttons).toHaveLength(4);
            expect(buttons[buttons.length - 1].textContent).toBe('2');
        });
    });

    // read-only
    // Depends on value
    it('readOnly = false', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.readOnly = false;
        element.value = 3;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons[1].click();
            expect(element.value).toBe(4);
        });
    });

    it('readOnly = true', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.readOnly = true;
        element.value = 3;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons[1].click();
            expect(element.value).toBe(3);
        });
    });

    // selection
    // Depends on iconName
    it('selection = continuous', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.selection = 'continuous';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button) => {
                expect(button.classList).toContain('avonni-continuous');
            });
        });
    });

    it('selection = continuous, with icon', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.selection = 'continuous';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttons.forEach((button) => {
                expect(button.classList).toContain('avonni-continuous-star');
            });
        });
    });

    it('selection = single', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.selection = 'single';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button) => {
                expect(button.classList).not.toContain('avonni-continuous');
            });
        });
    });

    it('selection = single, with icon', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.selection = 'single';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttons.forEach((button) => {
                expect(button.classList).not.toContain(
                    'avonni-continuous-star'
                );
            });
        });
    });

    // value
    // Depends on iconName
    it('value', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.value = 3;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button, index) => {
                if (index < 2) {
                    expect(button.classList).toContain(
                        'slds-button_outline-brand'
                    );
                    expect(button.classList).not.toContain('slds-button_brand');
                } else {
                    expect(button.classList).not.toContain(
                        'slds-button_outline-brand'
                    );
                    expect(button.classList).toContain('slds-button_brand');
                }
            });
        });
    });

    it('value, with icon', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.value = 2;
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button, index) => {
                if (index < 1) {
                    expect(button.classList).toContain(
                        'slds-button_outline-brand'
                    );
                    expect(button.classList).not.toContain('slds-button_brand');
                } else {
                    expect(button.classList).not.toContain(
                        'slds-button_outline-brand'
                    );
                    expect(button.classList).toContain('slds-button_brand');
                }
            });
        });
    });

    // value-hidden
    // Depends on value
    it('valueHidden = false', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.valueHidden = false;
        element.value = 2;

        return Promise.resolve().then(() => {
            const rating = element.shadowRoot.querySelector('.rating');
            expect(rating).toBeTruthy();
            expect(rating.textContent).toBe('2/5');
        });
    });

    it('valueHidden = true', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.valueHidden = true;
        element.value = 2;

        return Promise.resolve().then(() => {
            const rating = element.shadowRoot.querySelector('.rating');
            expect(rating).toBeFalsy();
        });
    });

    // variant
    // Depends on label
    it('variant = standard', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.variant = 'standard';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            const label = element.shadowRoot.querySelector('label');

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(wrapper.classList).not.toContain('avonni-label-inline');
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('variant = label-inline', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.variant = 'label-inline';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            const label = element.shadowRoot.querySelector('label');

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(wrapper.classList).toContain('avonni-label-inline');
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('variant = label-hidden', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.variant = 'label-hidden';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            const label = element.shadowRoot.querySelector('label');

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(wrapper.classList).not.toContain('avonni-label-inline');
            expect(label.classList).toContain('slds-assistive-text');
        });
    });

    it('variant = label-stacked', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        element.variant = 'label-stacked';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            const label = element.shadowRoot.querySelector('label');

            expect(wrapper.classList).toContain('slds-form-element_stacked');
            expect(wrapper.classList).not.toContain('avonni-label-inline');
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on iconName
    it('change event', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons[2].click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(3);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('change event, with icon', () => {
        const element = createElement('base-rating', {
            is: Rating
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttons[2].click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(3);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});

import { createElement } from 'lwc';
import Rating from 'c/rating';

let element;
describe('Rating', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-rating', {
            is: Rating
        });
        document.body.appendChild(element);
    });

    it('Rating: Default attributes', () => {
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconSize).toBe('large');
        expect(element.label).toBeUndefined();
        expect(element.max).toBe(5);
        expect(element.min).toBe(1);
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.selection).toBe('continuous');
        expect(element.value).toBeUndefined();
        expect(element.valueHidden).toBeFalsy();
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    // Depends on iconName
    it('Rating: Disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeFalsy();
            });
        });
    });

    it('Rating: Disabled = false, with icon', () => {
        element.disabled = false;
        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeFalsy();
            });
        });
    });

    it('Rating: Disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
        });
    });

    it('Rating: Disabled = true, with icon', () => {
        element.disabled = true;
        element.iconName = 'standard:apps';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
        });
    });

    // field-level-help
    // Depends on label
    it('Rating: FieldLevelHelp', () => {
        element.fieldLevelHelp = 'A string help';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(helptext).toBeTruthy();
            expect(helptext.content).toBe('A string help');
        });
    });

    // icon-name
    it('Rating: IconName', () => {
        element.iconName = 'utility:location';

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-icon"]'
            );
            expect(icons).toHaveLength(5);
            icons.forEach((icon) => {
                expect(icon.iconName).toBe('utility:location');
            });
        });
    });

    // icon-size
    // Depends on iconName
    it('Rating: IconSize = x-small', () => {
        element.iconName = 'utility:location';
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-icon"]'
            );
            icons.forEach((icon) => {
                expect(icon.svgClass).toBe(
                    'slds-button__icon slds-button__icon_x-small'
                );
            });
        });
    });

    it('Rating: IconSize = small', () => {
        element.iconName = 'utility:location';
        element.iconSize = 'small';

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-icon"]'
            );
            icons.forEach((icon) => {
                expect(icon.svgClass).toBe(
                    'slds-button__icon slds-button__icon_small'
                );
            });
        });
    });

    it('Rating: IconSize = medium', () => {
        element.iconName = 'utility:location';
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-icon"]'
            );
            icons.forEach((icon) => {
                expect(icon.svgClass).toBe(
                    'slds-button__icon avonni-rating__icon_medium'
                );
            });
        });
    });

    it('Rating: IconSize = large', () => {
        element.iconName = 'utility:location';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-icon"]'
            );
            icons.forEach((icon) => {
                expect(icon.svgClass).toBe(
                    'slds-button__icon slds-button__icon_large'
                );
            });
        });
    });

    // label
    it('Rating: Label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            expect(label).toBeTruthy();
            expect(label.textContent.trim()).toBe('A string label');
        });
    });

    // max
    it('Rating: Max', () => {
        element.max = 8;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            expect(buttons).toHaveLength(8);
            expect(buttons[buttons.length - 1].textContent).toBe('8');
        });
    });

    // min
    it('Rating: Min', () => {
        element.min = 2;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            expect(buttons).toHaveLength(4);
            expect(buttons[0].textContent).toBe('2');
        });
    });

    // read-only
    // Depends on value
    it('Rating: ReadOnly = false', () => {
        element.readOnly = false;
        element.value = 3;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons[1].click();
            expect(element.value).toBe(2);
            buttons.forEach((button) => {
                expect(button.disabled).toBeFalsy();
            });
        });
    });

    it('Rating: ReadOnly = true', () => {
        element.readOnly = true;
        element.value = 3;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons[1].click();
            expect(element.value).toBe(3);
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
        });
    });

    // required
    it('Rating: required', () => {
        element.required = true;
        element.label = 'Label';

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector(
                '[data-element-id="required-indicator"]'
            );
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // selection
    // Depends on iconName
    it('Rating: Selection = continuous', () => {
        element.selection = 'continuous';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.classList).toContain('avonni-rating__continuous');
            });
        });
    });

    it('Rating: Selection = continuous, with icon', () => {
        element.selection = 'continuous';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.classList).toContain(
                    'avonni-rating__continuous-icon'
                );
            });
        });
    });

    it('Rating: Selection = single', () => {
        element.selection = 'single';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.classList).not.toContain(
                    'avonni-rating__continuous'
                );
            });
        });
    });

    it('Rating: Selection = single, with icon', () => {
        element.selection = 'single';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button) => {
                expect(button.classList).not.toContain(
                    'avonni-rating__continuous-icon'
                );
            });
        });
    });

    // value
    // Depends on iconName
    it('Rating: Value', () => {
        element.value = 3;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons.forEach((button, index) => {
                if (index > 2) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(button.classList).toContain(
                        'slds-button_outline-brand'
                    );
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(button.classList).not.toContain('slds-button_brand');
                } else {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(button.classList).not.toContain(
                        'slds-button_outline-brand'
                    );
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(button.classList).toContain('slds-button_brand');
                }
            });
        });
    });

    it('Rating: Value, with icon', () => {
        element.value = 2;
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            [0, 1].forEach((i) => {
                expect(buttons[i].classList).toContain(
                    'avonni-rating__icon_selected'
                );
            });
            [2, 3, 4].forEach((i) => {
                expect(buttons[i].classList).not.toContain(
                    'avonni-rating__icon_selected'
                );
            });
        });
    });

    // value-hidden
    // Depends on value
    it('Rating: ValueHidden = false', () => {
        element.valueHidden = false;
        element.value = 2;

        return Promise.resolve().then(() => {
            const rating = element.shadowRoot.querySelector(
                '[data-element-id="avonni-rating-value"]'
            );
            expect(rating).toBeTruthy();
            expect(rating.textContent).toBe('2/5');
        });
    });

    it('Rating: ValueHidden = true', () => {
        element.valueHidden = true;
        element.value = 2;

        return Promise.resolve().then(() => {
            const rating = element.shadowRoot.querySelector('.rating');
            expect(rating).toBeFalsy();
        });
    });

    // variant
    // Depends on label
    it('Rating: Variant = standard', () => {
        element.variant = 'standard';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('Rating: Variant = label-inline', () => {
        element.variant = 'label-inline';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    it('Rating: Variant = label-hidden', () => {
        element.variant = 'label-hidden';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(wrapper.classList).not.toContain(
                'slds-form-element_stacked'
            );
            expect(label.classList).toContain('slds-assistive-text');
        });
    });

    it('Rating: Variant = label-stacked', () => {
        element.variant = 'label-stacked';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            expect(wrapper.classList).toContain('slds-form-element_stacked');
            expect(label.classList).not.toContain('slds-assistive-text');
        });
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on iconName
    it('Rating: Change event', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons[2].click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(3);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('Rating: Change event, with icon', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            buttons[2].click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(3);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    /* ----- METHODS ----- */

    // reportValidity
    // Depends on required
    it('Rating: reportValidity method', () => {
        element.required = true;
        element.reportValidity();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '[data-element-id="form-element__help"]'
            );
            expect(help).toBeTruthy();
        });
    });

    // setCustomValidity
    it('Rating: setCustomValidity method', () => {
        element.required = true;

        element.setCustomValidity('Something');
        element.reportValidity();
        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '[data-element-id="form-element__help"]'
            );
            expect(help.textContent).toBe('Something');
        });
    });

    // showHelpMessageIfInvalid
    // Depends on required
    it('Rating: showHelpMessageIfInvalid method', () => {
        element.required = true;
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '[data-element-id="form-element__help"]'
            );
            expect(help).toBeTruthy();
        });
    });
});

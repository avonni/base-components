import { createElement } from 'lwc';
import PrimitiveDualListboxOption from 'c/primitiveDualListboxOption';

let element = null;
describe('Primitive Dual Listbox Option', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-dual-listbox-option', {
            is: PrimitiveDualListboxOption
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.avatar).toEqual({});
            expect(element.description).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.draggable).toBeFalsy();
            expect(element.groupLabel).toBeUndefined();
            expect(element.hideBottomDivider).toBeFalsy();
            expect(element.isFocused).toBeFalsy();
            expect(element.isLocked).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.lockAlternativeText).toBeUndefined();
            expect(element.selected).toBeFalsy();
            expect(element.showAvatar).toBeFalsy();
            expect(element.value).toBeUndefined();
        });

        describe('Avatar', () => {
            it('showAvatar = false', () => {
                element.showAvatar = false;
                element.avatar = { primaryText: 'some text' };

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatar).toBeFalsy();
                });
            });

            it('showAvatar = true', () => {
                element.showAvatar = true;
                element.avatar = { primaryText: 'some text' };

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatar).toBeTruthy();
                    expect(avatar.primaryText).toContain('some text');
                });
            });
        });

        describe('Description', () => {
            it('With description', () => {
                element.description = 'some text';

                return Promise.resolve().then(() => {
                    const option = element.shadowRoot.querySelector(
                        '[data-element-id="dual-listbox-option"]'
                    );
                    expect(option.classList).not.toContain('slds-media_small');
                });
            });

            it('Without description', () => {
                return Promise.resolve().then(() => {
                    const option = element.shadowRoot.querySelector(
                        '[data-element-id="dual-listbox-option"]'
                    );
                    expect(option.classList).toContain('slds-media_small');
                });
            });
        });

        it('Draggable', () => {
            element.draggable = true;

            return Promise.resolve().then(() => {
                const option = element.shadowRoot.querySelector(
                    '[data-element-id="dual-listbox-option"]'
                );
                expect(option.draggable).toBeTruthy();
            });
        });

        it('Group Label', () => {
            element.label = 'Option 1';
            element.groupLabel = 'Odd';

            return Promise.resolve().then(() => {
                const assistiveText = element.shadowRoot.querySelector(
                    '[data-element-id="div-assistive-text"]'
                );
                expect(assistiveText.textContent).toBe('Option 1 (Odd)');
            });
        });

        describe('Hide Bottom Divider', () => {
            it('True', () => {
                element.hideBottomDivider = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.classList).not.toContain(
                        'avonni-dual-listbox__option_border-bottom'
                    );
                });
            });

            it('False', () => {
                element.hideBottomDivider = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.classList).toContain(
                        'avonni-dual-listbox__option_border-bottom'
                    );
                });
            });
        });

        describe('Is Focused', () => {
            it('True', () => {
                element.isFocused = true;

                return Promise.resolve().then(() => {
                    const option = element.shadowRoot.querySelector(
                        '[data-element-id="dual-listbox-option"]'
                    );
                    expect(option.tabIndex).toBe(0);
                });
            });

            it('False', () => {
                element.isFocused = false;

                return Promise.resolve().then(() => {
                    const option = element.shadowRoot.querySelector(
                        '[data-element-id="dual-listbox-option"]'
                    );
                    expect(option.tabIndex).toBe(-1);
                });
            });
        });

        it('Is Locked', () => {
            element.isLocked = true;

            return Promise.resolve().then(() => {
                const icon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-lock-icon"]'
                );
                expect(icon).toBeTruthy();
            });
        });

        describe('Lock Alternative Text', () => {
            it('isLocked = false', () => {
                element.lockAlternativeText = 'some text';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-lock-icon"]'
                    );
                    expect(icon).toBeFalsy();
                });
            });

            it('isLocked = true', () => {
                element.isLocked = true;
                element.lockAlternativeText = 'some text';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-lock-icon"]'
                    );
                    expect(icon).toBeTruthy();
                    expect(icon.alternativeText).toBe('some text');
                });
            });
        });

        it('Selected', () => {
            element.selected = true;

            return Promise.resolve().then(() => {
                const option = element.shadowRoot.querySelector(
                    '[data-element-id="dual-listbox-option"]'
                );
                expect(option.ariaSelected).toBeTruthy();
                expect(option.classList).toContain(
                    'avonni-dual-listbox__list-item-selected',
                    'slds-is-selected'
                );
            });
        });
    });

    describe('Methods', () => {
        describe('Focus', () => {
            it('Focus', () => {
                const option = element.shadowRoot.querySelector(
                    '[data-element-id="dual-listbox-option"]'
                );
                const handler = jest.fn();
                option.addEventListener('focus', handler);

                return Promise.resolve().then(() => {
                    element.focus();
                    expect(handler).toHaveBeenCalledTimes(1);
                });
            });

            it('Disabled = true', () => {
                const option = element.shadowRoot.querySelector(
                    '[data-element-id="dual-listbox-option"]'
                );
                const handler = jest.fn();
                option.addEventListener('focus', handler);
                element.disabled = true;

                return Promise.resolve().then(() => {
                    element.focus();
                    expect(handler).not.toHaveBeenCalled();
                });
            });
        });
    });
});

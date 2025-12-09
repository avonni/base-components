import { createElement } from 'lwc';
import InputRichText from '../inputRichText';

let element;
describe('InputRichText', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-rich-text', {
            is: InputRichText
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.cancelButtonLabel).toBe('Cancel');
            expect(element.customButtons).toBeUndefined();
            expect(element.doneButtonLabel).toBe('Done');
            expect(element.disabled).toBeFalsy();
            expect(element.disabledCategories).toHaveLength(0);
            expect(element.formats).toHaveLength(0);
            expect(element.isPublisher).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.labelVisible).toBeFalsy();
            expect(element.messageWhenBadInput).toBeUndefined();
            expect(element.placeholder).toBeUndefined();
            expect(element.readOnly).toBeFalsy();
            expect(element.shareWithEntityId).toBeUndefined();
            expect(element.valid).toBeTruthy();
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('top-toolbar');
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;
                element.formats = ['color'];

                return Promise.resolve().then(() => {
                    const comboboxes = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-combobox"]'
                    );
                    comboboxes.forEach((combobox) => {
                        expect(combobox.disabled).toBeTruthy();
                    });

                    const colorPicker = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-colorpicker-button"]'
                    );
                    expect(colorPicker.disabled).toBeTruthy();
                    const buttons = element.shadowRoot.querySelectorAll(
                        '.slds-rich-text-editor__toolbar > ul li .slds-button, .overflow-menu > ul > li .slds-button'
                    );
                    buttons.forEach((button) => {
                        expect(button.disabled).toBeTruthy();
                    });
                });
            });

            it('false', () => {
                element.disabled = false;
                element.formats = ['color'];

                return Promise.resolve().then(() => {
                    const comboboxes = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-combobox"]'
                    );
                    comboboxes.forEach((combobox) => {
                        expect(combobox.disabled).toBeFalsy();
                    });

                    const colorPicker = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-colorpicker-button"]'
                    );
                    expect(colorPicker.disabled).toBeFalsy();

                    const buttons = element.shadowRoot.querySelectorAll(
                        '.slds-rich-text-editor__toolbar > ul li .slds-button, .overflow-menu > ul > li .slds-button'
                    );
                    [...buttons].forEach((b) => {
                        const shouldBeDisabled =
                            b.classList.contains('ql-link');
                        expect(b.disabled).toBe(shouldBeDisabled);
                    });
                });
            });
        });

        describe('disabledCategories', () => {
            it('Passed to the component', () => {
                element.disabledCategories = ['FORMAT_TEXT', 'ALIGN_TEXT'];

                return Promise.resolve().then(() => {
                    const formatText = element.shadowRoot.querySelector(
                        '[aria-label="Format text"]'
                    );
                    expect(formatText).toBeFalsy();

                    const alignText = element.shadowRoot.querySelector(
                        '[aria-label="Align text"]'
                    );
                    expect(alignText).toBeFalsy();

                    const formatBody = element.shadowRoot.querySelector(
                        '[aria-label="Format body"]'
                    );
                    expect(formatBody).toBeTruthy();
                });
            });
        });

        describe('formats', () => {
            it('Passed to the component', () => {
                element.formats = ['align', 'bold'];

                return Promise.resolve().then(() => {
                    const bold = element.shadowRoot.querySelector('.ql-bold');
                    expect(bold).toBeTruthy();

                    const italic =
                        element.shadowRoot.querySelector('.ql-italic');
                    expect(italic).toBeFalsy();

                    const align =
                        element.shadowRoot.querySelectorAll('.ql-align');
                    expect(align.length).toBe(3);
                });
            });
        });

        describe('isPublisher', () => {
            it('Passed to the component', () => {
                element.isPublisher = true;

                return Promise.resolve().then(() => {
                    const emoji = element.shadowRoot.querySelector('.ql-emoji');
                    expect(emoji).toBeTruthy();

                    const adduser =
                        element.shadowRoot.querySelector('.ql-adduser');
                    expect(adduser).toBeTruthy();
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('labelVisible', () => {
            it('Passed to the component', () => {
                element.labelVisible = true;

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    const assistiveText = element.shadowRoot.querySelector(
                        '.slds-form-element__label.slds-assistive-text'
                    );
                    expect(label).toBeTruthy();
                    expect(assistiveText).toBeFalsy();
                });
            });

            it('false', () => {
                element.label = 'A string label';
                element.labelVisible = false;

                return Promise.resolve().then(() => {
                    const assistiveText = element.shadowRoot.querySelector(
                        '.slds-form-element__label.slds-assistive-text'
                    );
                    expect(assistiveText.textContent).toBe('A string label');
                });
            });
        });

        describe('messageWhenBadInput', () => {
            it('Passed to the component', () => {
                element.messageWhenBadInput = 'A string error message';

                return Promise.resolve().then(() => {
                    const message = element.shadowRoot.querySelector(
                        '.slds-form-element__help'
                    );
                    expect(message.textContent).toBe('A string error message');
                });
            });
        });

        describe('placeholder', () => {
            it('Passed to the component', () => {
                element.placeholder = 'A string placeholder';

                return Promise.resolve().then(() => {
                    const placeholder = element.shadowRoot.querySelector(
                        '.input-rich-text-placeholder'
                    );
                    expect(placeholder.textContent).toBe(
                        'A string placeholder'
                    );
                });
            });
        });

        describe('readOnly', () => {
            it('Passed to the component', () => {
                element.readOnly = true;
                element.value = 'Some value';

                return Promise.resolve().then(() => {
                    const quillEditor =
                        element.shadowRoot.querySelector('.editor');
                    expect(quillEditor).toBeFalsy();

                    const fakeEditor = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-top-toolbar"]'
                    );
                    expect(fakeEditor).toBeTruthy();
                    expect(fakeEditor.value).toBe('Some value');
                });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                element.value = 'A string value';
                const textArea = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-formatted-rich-text-top-toolbar"]'
                );

                return Promise.resolve().then(() => {
                    expect(textArea.value).toBe('A string value');
                });
            });
        });

        describe('variant', () => {
            it('top-toolbar', () => {
                element.variant = 'top-toolbar';

                return Promise.resolve().then(() => {
                    const toolbar = element.shadowRoot.querySelector(
                        '.slds-rich-text-editor__toolbar + .slds-rich-text-editor__textarea'
                    );
                    expect(toolbar).toBeTruthy();
                });
            });

            it('bottom-toolbar', () => {
                element.variant = 'bottom-toolbar';

                return Promise.resolve().then(() => {
                    const toolbar = element.shadowRoot.querySelector(
                        '.slds-rich-text-editor__textarea + .slds-rich-text-editor__toolbar'
                    );
                    expect(toolbar).toBeTruthy();
                });
            });
        });
    });

    describe('Keyboard Accessibility', () => {
        describe('Focused button changes using arrow keys', () => {
            it('Arrow Right', () => {
                return Promise.resolve().then(() => {
                    const actions = element.shadowRoot.querySelectorAll(
                        '.slds-button-group-list .slds-button'
                    );
                    const currentAction = actions[0];
                    currentAction.focus();
                    const nextItem = actions[1];
                    const spy = jest.spyOn(nextItem, 'focus');
                    currentAction.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowRight',
                            bubbles: true
                        })
                    );
                    expect(spy).toHaveBeenCalled();
                });
            });

            it('Arrow Left', () => {
                return Promise.resolve().then(() => {
                    const actions = element.shadowRoot.querySelectorAll(
                        '.slds-button-group-list .slds-button'
                    );
                    const currentAction = actions[1];
                    currentAction.focus();
                    const previousItem = actions[0];
                    const spy = jest.spyOn(previousItem, 'focus');
                    currentAction.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowLeft',
                            bubbles: true
                        })
                    );
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });
});
